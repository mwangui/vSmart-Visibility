"""Vision-LM page describer (Plan §7.5).

Only invoked for PDF pages flagged by parsers/pdf.py. Uses the Anthropic
vision-capable model named in ANTHROPIC_VISION_MODEL.
"""

from __future__ import annotations

import asyncio
import base64
from pathlib import Path

from app.config import settings
from app.llm.client import get_async_client
from app.logging_setup import get_logger


log = get_logger("vlm")


_VLM_PROMPT = (
    "You are extracting a precise, factual description of one page from a PDF "
    "for a retrieval index. Describe in plain text what is visible, including:\n"
    "- Title and section headings.\n"
    "- For charts: chart type, x-axis label and units, y-axis label and units, "
    "legend entries, approximate values at notable points, overall trend.\n"
    "- For diagrams/architecture: list each node and the relationships/arrows.\n"
    "- For tables: row count, column headers, and key values.\n"
    "- For UI screenshots: the screen name, primary regions, and visible labels.\n"
    "- Any callouts that imply design decisions.\n"
    "Do NOT invent information that is not visible. Be concise but complete."
)


async def describe_page(image_path: Path, *, page_num: int, filename: str) -> str | None:
    """Return a textual description of a single PDF page image, or None on failure."""
    if not settings.ANTHROPIC_API_KEY or not settings.ANTHROPIC_VISION_MODEL:
        return None

    try:
        b64 = base64.b64encode(image_path.read_bytes()).decode("ascii")
    except OSError as exc:
        log.warning("vlm.read_failed", path=str(image_path), error=str(exc))
        return None

    client = get_async_client()
    if client is None:
        return None

    try:
        message = await client.messages.create(
            model=settings.ANTHROPIC_VISION_MODEL,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/png",
                                "data": b64,
                            },
                        },
                        {
                            "type": "text",
                            "text": (
                                f"{_VLM_PROMPT}\n\nFile: {filename}\nPage: {page_num}"
                            ),
                        },
                    ],
                }
            ],
        )
    except Exception as exc:  # network / API errors are non-fatal per Plan §17
        log.warning("vlm.api_failed", file=filename, page=page_num, error=str(exc))
        return None

    parts = []
    for block in message.content or []:
        if getattr(block, "type", None) == "text":
            parts.append(block.text)
    return "\n".join(parts).strip() or None


async def describe_pages_concurrently(
    items: list[tuple[Path, int, str]],
    *,
    concurrency: int | None = None,
) -> list[str | None]:
    sem = asyncio.Semaphore(concurrency or settings.VLM_CONCURRENCY)

    async def _one(args):
        async with sem:
            return await describe_page(args[0], page_num=args[1], filename=args[2])

    return await asyncio.gather(*(_one(a) for a in items))
