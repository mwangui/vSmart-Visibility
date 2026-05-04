"""PDF parser (Plan §7.5) using PyMuPDF.

For each page we capture:
- direct extracted text
- a flag indicating whether this page should be sent to VLM
  (image-area > threshold OR text < threshold words)
- a rendered PNG (only for VLM-eligible pages) cached to vlm_cache_dir.
"""

from __future__ import annotations

import io
from dataclasses import dataclass, field
from pathlib import Path

import fitz  # type: ignore[import-untyped]
from PIL import Image

from app.config import settings


@dataclass
class PdfPage:
    page_num: int  # 1-indexed
    text: str
    word_count: int
    image_area_ratio: float
    needs_vlm: bool
    image_path: Path | None = None
    visual_description: str | None = None


@dataclass
class PdfResult:
    pages: list[PdfPage] = field(default_factory=list)


def parse_pdf(
    path: Path,
    *,
    file_id: str,
    image_area_threshold: float | None = None,
    text_word_threshold: int | None = None,
    render_dpi: int = 150,
) -> PdfResult:
    img_thresh = (
        image_area_threshold
        if image_area_threshold is not None
        else settings.VLM_IMAGE_AREA_THRESHOLD
    )
    text_thresh = (
        text_word_threshold
        if text_word_threshold is not None
        else settings.VLM_TEXT_WORD_THRESHOLD
    )

    pages: list[PdfPage] = []
    cache_dir = settings.vlm_cache_dir / file_id
    cache_dir.mkdir(parents=True, exist_ok=True)

    with fitz.open(str(path)) as doc:
        for idx, page in enumerate(doc, start=1):
            page_rect = page.rect
            page_area = max(page_rect.width * page_rect.height, 1.0)

            text = page.get_text("text") or ""
            word_count = len([w for w in text.split() if w.strip()])

            image_area = 0.0
            for img_info in page.get_image_info(xrefs=True) or []:
                bbox = img_info.get("bbox")
                if bbox:
                    w = max(bbox[2] - bbox[0], 0.0)
                    h = max(bbox[3] - bbox[1], 0.0)
                    image_area += w * h
            ratio = min(image_area / page_area, 1.0)

            needs_vlm = (ratio > img_thresh) or (word_count < text_thresh)

            image_path: Path | None = None
            if needs_vlm:
                image_path = cache_dir / f"page_{idx:04d}.png"
                if not image_path.exists():
                    pix = page.get_pixmap(dpi=render_dpi, alpha=False)
                    img = Image.open(io.BytesIO(pix.tobytes("png")))
                    img.thumbnail((1600, 1600))
                    img.save(image_path, format="PNG", optimize=True)

            pages.append(
                PdfPage(
                    page_num=idx,
                    text=text.strip(),
                    word_count=word_count,
                    image_area_ratio=ratio,
                    needs_vlm=needs_vlm,
                    image_path=image_path,
                )
            )

    return PdfResult(pages=pages)


def format_pdf_corpus(pages: list[PdfPage], filename: str) -> str:
    """Compose the on-disk corpus .txt with [PAGE n] / Direct / Visual sections."""
    lines: list[str] = [f"# {filename}", ""]
    for p in pages:
        lines.append(f"[PAGE {p.page_num}]")
        if p.text:
            lines.append("Direct text:")
            lines.append(p.text)
        if p.visual_description:
            lines.append("Visual description:")
            lines.append(p.visual_description)
        lines.append("")
    return "\n".join(lines).strip() + "\n"
