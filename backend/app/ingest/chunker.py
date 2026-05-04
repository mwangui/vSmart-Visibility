"""Chunking (Plan §7.4 / §8.1).

Strategies:
- VTT  → group consecutive speaker turns up to ~600 tokens, with 1-turn overlap.
- PDF  → per-page chunks; if a page is large, split by paragraphs to ~600 tokens.
- TXT/MD → ~600-token paragraphs with 1-paragraph overlap.

Token counts use tiktoken cl100k_base as a portable proxy when available. Token
counting is only used for chunk sizing — exact precision is not required, so when
tiktoken cannot fetch its BPE assets (offline / restricted egress) we fall back
to a heuristic estimator that handles CJK + Latin text reasonably.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from threading import Lock
from typing import Any, Callable

from app.ingest.parsers.pdf import PdfPage
from app.ingest.parsers.vtt import VttSegment


_TARGET_TOKENS = 600
_MIN_TOKENS = 80

_logger = logging.getLogger(__name__)
_enc_lock = Lock()
_count_fn: Callable[[str], int] | None = None


def _heuristic_count(text: str) -> int:
    """Conservative-ish token estimate that works for CJK + Latin scripts.

    For mixed corpora (Traditional Chinese + English), cl100k_base averages
    roughly 1 token per CJK char and ~0.75 tokens per Latin word. We approximate
    by treating every non-ASCII char as 1 token and Latin runs by word count.
    """
    if not text:
        return 0
    cjk = 0
    latin_chars: list[str] = []
    for ch in text:
        if ord(ch) > 0x7F:
            cjk += 1
        else:
            latin_chars.append(ch)
    latin_words = len("".join(latin_chars).split())
    # +1 keeps tiny strings from rounding to 0.
    return cjk + latin_words + 1


def _resolve_counter() -> Callable[[str], int]:
    """Lazily build the token counter; cache on first successful call."""
    global _count_fn
    if _count_fn is not None:
        return _count_fn
    with _enc_lock:
        if _count_fn is not None:
            return _count_fn
        try:
            import tiktoken  # noqa: WPS433 - intentional lazy import

            enc = tiktoken.get_encoding("cl100k_base")

            def _tt(text: str) -> int:
                return len(enc.encode(text or ""))

            _count_fn = _tt
            _logger.info("chunker: using tiktoken cl100k_base for token counting")
        except Exception as exc:  # network/proxy/missing wheel — degrade gracefully
            _logger.warning(
                "chunker: tiktoken unavailable (%s); falling back to heuristic counter",
                exc.__class__.__name__,
            )
            _count_fn = _heuristic_count
        return _count_fn


def _count_tokens(text: str) -> int:
    return _resolve_counter()(text or "")


@dataclass
class Chunk:
    chunk_id: str
    file_id: str
    text: str
    metadata: dict[str, Any] = field(default_factory=dict)


def _chunk_id(file_id: str, idx: int) -> str:
    return f"{file_id}::{idx:05d}"


# ── VTT ──────────────────────────────────────────────────────────────────────
def chunk_vtt(file_id: str, segments: list[VttSegment]) -> list[Chunk]:
    chunks: list[Chunk] = []
    if not segments:
        return chunks

    buf: list[VttSegment] = []
    buf_tokens = 0
    idx = 0

    for seg in segments:
        seg_tokens = _count_tokens(seg.text)
        if buf and (buf_tokens + seg_tokens) > _TARGET_TOKENS:
            chunks.append(_emit_vtt(file_id, idx, buf))
            idx += 1
            # 1-turn overlap
            buf = [buf[-1], seg]
            buf_tokens = _count_tokens(buf[0].text) + seg_tokens
        else:
            buf.append(seg)
            buf_tokens += seg_tokens

    if buf:
        chunks.append(_emit_vtt(file_id, idx, buf))
    return chunks


def _emit_vtt(file_id: str, idx: int, buf: list[VttSegment]) -> Chunk:
    text = "\n".join(f"{s.speaker}: {s.text}" for s in buf)
    speakers = sorted({s.speaker for s in buf})
    return Chunk(
        chunk_id=_chunk_id(file_id, idx),
        file_id=file_id,
        text=text,
        metadata={
            "type": "vtt",
            "speakers": speakers,
            "start_ts": buf[0].start_ts,
            "end_ts": buf[-1].end_ts,
        },
    )


# ── PDF ──────────────────────────────────────────────────────────────────────
def chunk_pdf(file_id: str, pages: list[PdfPage]) -> list[Chunk]:
    chunks: list[Chunk] = []
    idx = 0
    for page in pages:
        body_parts = []
        if page.text:
            body_parts.append(page.text)
        if page.visual_description:
            body_parts.append("Visual description:\n" + page.visual_description)
        body = "\n\n".join(body_parts).strip()
        if not body:
            continue
        for sub in _split_text(body, _TARGET_TOKENS):
            chunks.append(
                Chunk(
                    chunk_id=_chunk_id(file_id, idx),
                    file_id=file_id,
                    text=sub,
                    metadata={"type": "pdf", "page": page.page_num},
                )
            )
            idx += 1
    return chunks


# ── plain text / markdown ────────────────────────────────────────────────────
def chunk_text(file_id: str, text: str) -> list[Chunk]:
    chunks: list[Chunk] = []
    for idx, sub in enumerate(_split_text(text, _TARGET_TOKENS)):
        chunks.append(
            Chunk(
                chunk_id=_chunk_id(file_id, idx),
                file_id=file_id,
                text=sub,
                metadata={"type": "text"},
            )
        )
    return chunks


def _split_text(text: str, target: int) -> list[str]:
    if not text.strip():
        return []
    # Token-window split with paragraph respect.
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    out: list[str] = []
    buf: list[str] = []
    buf_tokens = 0
    for p in paragraphs:
        pt = _count_tokens(p)
        if buf and buf_tokens + pt > target:
            out.append("\n\n".join(buf))
            buf = [buf[-1], p] if buf_tokens > _MIN_TOKENS else [p]
            buf_tokens = sum(_count_tokens(x) for x in buf)
        else:
            buf.append(p)
            buf_tokens += pt
    if buf:
        out.append("\n\n".join(buf))
    return out
