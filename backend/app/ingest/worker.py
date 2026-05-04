"""Per-file ingest worker.

Given an absolute path inside RAG_DOC_DIR, runs the end-to-end pipeline:
1) hash + skip-if-unchanged
2) parse (vtt / pdf / txt|md)
3) generate corpus .txt
4) generate brief
5) chunk + embed
6) update brief + chunk indexes
7) persist hash record
"""

from __future__ import annotations

import asyncio
import hashlib
import json
from pathlib import Path
from typing import Any

import numpy as np

from app.config import settings
from app.ingest import chunker as chunker_mod
from app.ingest.brief import generate_brief
from app.ingest.embed import get_embedder
from app.ingest.parsers.pdf import PdfPage, format_pdf_corpus, parse_pdf
from app.ingest.parsers.vlm import describe_pages_concurrently
from app.ingest.parsers.vtt import parse_vtt
from app.ingest.store import IngestStore
from app.logging_setup import get_logger
from app.rag.index import BriefIndex, ChunkIndex


log = get_logger("ingest.worker")


SUPPORTED_EXT = {".vtt", ".pdf", ".txt", ".md"}


def file_id_for(abs_path: Path) -> str:
    """Stable id derived from path so renames/dedupe work without re-embedding."""
    return hashlib.sha256(str(abs_path.resolve()).encode("utf-8")).hexdigest()[:24]


def _sha256_of_file(path: Path, chunk: int = 1 << 20) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        while True:
            data = fh.read(chunk)
            if not data:
                break
            h.update(data)
    return h.hexdigest()


def _file_type(path: Path) -> str:
    return path.suffix.lower().lstrip(".")


async def ingest_file(abs_path: Path) -> dict[str, Any] | None:
    """Run the full pipeline for one file. Returns the brief dict on success."""
    if not abs_path.exists() or not abs_path.is_file():
        return None
    suffix = abs_path.suffix.lower()
    if suffix not in SUPPORTED_EXT:
        return None

    store = IngestStore()
    try:
        sha = _sha256_of_file(abs_path)
    except OSError as exc:
        store.record_failure(abs_path.name, f"hash failed: {exc}")
        log.warning("ingest.hash_failed", file=str(abs_path), error=str(exc))
        return None

    fid = file_id_for(abs_path)
    cached = store.get_hash(str(abs_path))
    if cached and cached.get("sha256") == sha and store.get_brief(fid):
        log.info("ingest.skip_unchanged", file=abs_path.name)
        return store.get_brief(fid)

    try:
        body_text, chunks = await _parse_and_chunk(abs_path, fid)
    except Exception as exc:  # parser failure → record but don't crash watcher
        store.record_failure(abs_path.name, f"parse failed: {exc}")
        log.warning("ingest.parse_failed", file=str(abs_path), error=str(exc))
        return None

    # Persist corpus .txt
    corpus_path = settings.corpus_dir / f"{fid}.txt"
    corpus_path.write_text(body_text, encoding="utf-8")

    # Generate brief
    brief = await generate_brief(
        file_id=fid,
        path=abs_path,
        file_type=_file_type(abs_path),
        body_text=body_text,
        sha256=sha,
    )
    store.upsert_brief(brief)

    # Embed chunks + update chunk index
    embedder = get_embedder()
    chunk_texts = [c.text for c in chunks]
    chunk_ids = [c.chunk_id for c in chunks]
    chunk_meta = [c.metadata for c in chunks]
    if chunk_texts:
        chunk_vecs = await embedder.encode_async(chunk_texts)
    else:
        chunk_vecs = np.zeros((0, embedder.dim), dtype="float32")
    ChunkIndex().replace_for_file(
        file_id=fid,
        chunk_ids=chunk_ids,
        vectors=chunk_vecs,
        chunk_meta=chunk_meta,
    )

    # Persist chunks (parquet not required v1 — JSONL is enough for debug + ChunkRetriever)
    chunks_path = settings.chunks_dir / f"{fid}.jsonl"
    with chunks_path.open("w", encoding="utf-8") as fh:
        for c in chunks:
            fh.write(
                json.dumps(
                    {"chunk_id": c.chunk_id, "text": c.text, "metadata": c.metadata},
                    ensure_ascii=False,
                )
                + "\n"
            )

    # Rebuild brief index (small, all-in-one)
    await rebuild_brief_index()

    store.upsert_hash(str(abs_path), file_id=fid, sha256=sha)
    store.clear_failure(abs_path.name)
    log.info("ingest.done", file=abs_path.name, chunks=len(chunks))
    return brief


async def _parse_and_chunk(abs_path: Path, fid: str):
    suffix = abs_path.suffix.lower()
    if suffix == ".vtt":
        body, segments = parse_vtt(abs_path)
        chunks = chunker_mod.chunk_vtt(fid, segments)
        return body, chunks

    if suffix == ".pdf":
        result = parse_pdf(abs_path, file_id=fid)
        # VLM pass for image-heavy / text-sparse pages.
        targets: list[tuple[Path, int, str]] = []
        for p in result.pages:
            if p.needs_vlm and p.image_path is not None:
                targets.append((p.image_path, p.page_num, abs_path.name))
        if targets:
            descriptions = await describe_pages_concurrently(targets)
            iter_idx = iter(descriptions)
            for p in result.pages:
                if p.needs_vlm:
                    p.visual_description = next(iter_idx, None)
        body = format_pdf_corpus(result.pages, abs_path.name)
        chunks = chunker_mod.chunk_pdf(fid, result.pages)
        return body, chunks

    if suffix in {".txt", ".md"}:
        body = abs_path.read_text(encoding="utf-8", errors="replace")
        chunks = chunker_mod.chunk_text(fid, body)
        return body, chunks

    raise ValueError(f"Unsupported extension: {suffix}")


async def rebuild_brief_index() -> None:
    """Cheap because brief count is small (per Plan §8.3 step 1)."""
    store = IngestStore()
    briefs = store.load_briefs()
    if not briefs:
        BriefIndex().rebuild(file_ids=[], vectors=np.zeros((0, 1), dtype="float32"))
        return
    embedder = get_embedder()
    file_ids = list(briefs.keys())
    payloads = [_brief_payload(briefs[fid]) for fid in file_ids]
    vecs = await embedder.encode_async(payloads)
    BriefIndex().rebuild(file_ids=file_ids, vectors=vecs)


def _brief_payload(brief: dict[str, Any]) -> str:
    parts = [
        brief.get("title", ""),
        brief.get("filename", ""),
        brief.get("date", ""),
        brief.get("version", ""),
        " ".join(brief.get("topics", []) or []),
        " ".join(brief.get("participants", []) or []),
        brief.get("gist_one_liner", ""),
        brief.get("summary", ""),
    ]
    return "\n".join(p for p in parts if p)


async def remove_file(abs_path: Path) -> None:
    """Drop a deleted file from corpus / chunks / indexes / hashes."""
    store = IngestStore()
    cached = store.get_hash(str(abs_path))
    if not cached:
        return
    fid = cached["file_id"]
    # Corpus + chunks
    (settings.corpus_dir / f"{fid}.txt").unlink(missing_ok=True)
    (settings.chunks_dir / f"{fid}.jsonl").unlink(missing_ok=True)
    # Briefs + indexes
    store.delete_brief(fid)
    ChunkIndex().remove_for_file(fid)
    await rebuild_brief_index()
    store.remove_hash(str(abs_path))
    log.info("ingest.removed", file=abs_path.name, file_id=fid)


# Type-only helper for mypy / IDE
PdfPage  # noqa: B018
