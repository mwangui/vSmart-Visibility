"""Retrieval composer (Plan §8.5).

- If router confidence >= threshold → use file-level answer (top 3 files' full text).
- Else → chunk-RAG fallback with top_k chunks across the corpus.

Returns a structured Context the chat layer can format and stream.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from app.config import settings
from app.ingest.embed import get_embedder
from app.ingest.store import IngestStore
from app.logging_setup import get_logger
from app.rag.index import ChunkIndex
from app.rag.router import RouterDecision, route


log = get_logger("retriever")


@dataclass
class CitationRef:
    file_id: str
    filename: str
    page: int | None = None
    timestamp: str | None = None
    speakers: list[str] | None = None
    label: str = ""


@dataclass
class ContextBlock:
    body: str
    citation: CitationRef
    score: float = 0.0


@dataclass
class RetrievalContext:
    mode: str  # "file" | "chunk" | "empty"
    blocks: list[ContextBlock]
    decision: RouterDecision | None = None


def _make_label(brief: dict[str, Any], page: int | None, timestamp: str | None) -> str:
    name = brief.get("filename", "?")
    if page is not None:
        return f"{name} · page {page}"
    if timestamp:
        return f"{name} · {timestamp}"
    return name


async def retrieve(
    question: str,
    history: list[dict[str, str]] | None = None,
) -> RetrievalContext:
    """Build a retrieval context for the chat layer.

    This function is intentionally resilient: a failure in the router or in
    chunk-level retrieval (e.g. the embedding model can't be downloaded
    because the corporate proxy blocks huggingface.co) MUST NOT stop the
    chat layer from running. We log the failure and return an empty context
    so the LLM is still given a chance to answer — and if the LLM is also
    unreachable, the chat error classifier will surface a precise
    network/proxy diagnostic rather than the generic "AI request failed".
    """
    store = IngestStore()
    briefs = store.load_briefs()
    if not briefs:
        return RetrievalContext(mode="empty", blocks=[], decision=None)

    try:
        decision = await route(question, history=history)
    except Exception as exc:  # noqa: BLE001 — router self-degrades; this is belt+braces
        log.warning("retrieve.router_failed", error=str(exc), error_class=exc.__class__.__name__)
        decision = None

    if (
        decision is not None
        and decision.matches
        and decision.best_confidence >= settings.ROUTER_CONFIDENCE_THRESHOLD
    ):
        blocks = _file_level_blocks(decision, briefs)
        return RetrievalContext(mode="file", blocks=blocks, decision=decision)

    # Chunk-level fallback: depends on the embedding model being available.
    # If the embedder can't be loaded (huggingface blocked, disk full, etc.)
    # we degrade to empty context rather than 500 the entire chat request.
    try:
        blocks = await _chunk_level_blocks(question)
    except Exception as exc:  # noqa: BLE001 — broad on purpose; we want to keep chatting
        log.warning(
            "retrieve.chunk_failed_degrade_to_empty",
            error=str(exc),
            error_class=exc.__class__.__name__,
        )
        return RetrievalContext(mode="empty", blocks=[], decision=decision)

    return RetrievalContext(mode="chunk", blocks=blocks, decision=decision)


def _file_level_blocks(decision: RouterDecision, briefs: dict[str, Any]) -> list[ContextBlock]:
    out: list[ContextBlock] = []
    for m in decision.matches[: settings.ROUTER_MAX_FILES]:
        brief = briefs.get(m.file_id)
        if brief is None:
            continue
        corpus_path = settings.corpus_dir / f"{m.file_id}.txt"
        if not corpus_path.exists():
            continue
        body = corpus_path.read_text(encoding="utf-8", errors="replace")
        citation = CitationRef(
            file_id=m.file_id,
            filename=brief.get("filename", ""),
            label=brief.get("filename", ""),
        )
        out.append(ContextBlock(body=body, citation=citation, score=m.confidence))
    return out


async def _chunk_level_blocks(question: str) -> list[ContextBlock]:
    embedder = get_embedder()
    qvec = (await embedder.encode_async([question]))[0]
    hits = ChunkIndex().search(qvec, top_k=settings.CHUNK_FALLBACK_TOP_K)
    if not hits:
        return []

    store = IngestStore()
    briefs = store.load_briefs()

    out: list[ContextBlock] = []
    for hit in hits:
        fid = hit.get("file_id")
        cid = hit.get("chunk_id")
        brief = briefs.get(fid) if fid else None
        if brief is None or not cid:
            continue
        text = _read_chunk_text(fid, cid)
        if not text:
            continue
        kind = (hit.get("type") or "").lower()
        page = hit.get("page") if kind == "pdf" else None
        timestamp = None
        speakers = None
        if kind == "vtt":
            ts1 = hit.get("start_ts")
            ts2 = hit.get("end_ts")
            timestamp = f"{ts1}–{ts2}" if ts1 and ts2 else (ts1 or ts2)
            speakers = hit.get("speakers")
        citation = CitationRef(
            file_id=fid,
            filename=brief.get("filename", ""),
            page=page,
            timestamp=timestamp,
            speakers=speakers,
            label=_make_label(brief, page, timestamp),
        )
        out.append(ContextBlock(body=text, citation=citation, score=float(hit.get("score", 0.0))))
    return out


def _read_chunk_text(file_id: str, chunk_id: str) -> str | None:
    path: Path = settings.chunks_dir / f"{file_id}.jsonl"
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as fh:
        for line in fh:
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            if obj.get("chunk_id") == chunk_id:
                return obj.get("text") or ""
    return None
