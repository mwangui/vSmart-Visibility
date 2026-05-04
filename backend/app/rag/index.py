"""FAISS-backed dense indexes for briefs and chunks (Plan §8.1).

We persist:
- brief_index.faiss + briefs_meta.json     (one entry per file_id)
- chunk_index.faiss + chunks_meta.json     (one entry per chunk_id, with file_id and metadata)

Indexes are flat IP indexes over normalised vectors → cosine similarity.
"""

from __future__ import annotations

import json
import threading
from pathlib import Path
from typing import Any

import faiss
import numpy as np

from app.config import settings
from app.logging_setup import get_logger


log = get_logger("index")


_brief_lock = threading.RLock()
_chunk_lock = threading.RLock()


def _meta_path(index_path: Path) -> Path:
    return index_path.with_suffix(".meta.json")


def _load_index(path: Path, dim: int) -> faiss.Index:
    if path.exists():
        return faiss.read_index(str(path))
    return faiss.IndexFlatIP(dim)


def _save_index(index: faiss.Index, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    faiss.write_index(index, str(tmp))
    tmp.replace(path)


def _load_meta(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return []


def _save_meta(meta: list[dict[str, Any]], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(meta, ensure_ascii=False), encoding="utf-8")
    tmp.replace(path)


# ── Brief index ──────────────────────────────────────────────────────────────
class BriefIndex:
    """In-memory + on-disk index keyed by file_id.

    Re-built fully on every save (briefs are small, file count <= a few hundred).
    """

    def __init__(self) -> None:
        self.path = settings.brief_index_path

    def rebuild(self, file_ids: list[str], vectors: np.ndarray) -> None:
        with _brief_lock:
            assert vectors.ndim == 2
            dim = vectors.shape[1] if vectors.size else 1
            index = faiss.IndexFlatIP(dim)
            if vectors.size:
                index.add(vectors.astype("float32"))
            _save_index(index, self.path)
            _save_meta([{"file_id": fid, "row": i} for i, fid in enumerate(file_ids)], _meta_path(self.path))
            log.info("brief_index.rebuild", count=len(file_ids), dim=dim)

    def search(self, query_vec: np.ndarray, top_k: int) -> list[tuple[str, float]]:
        with _brief_lock:
            if not self.path.exists():
                return []
            index = faiss.read_index(str(self.path))
            meta = _load_meta(_meta_path(self.path))
            if index.ntotal == 0 or not meta:
                return []
            q = query_vec.astype("float32").reshape(1, -1)
            distances, indices = index.search(q, min(top_k, index.ntotal))
            out: list[tuple[str, float]] = []
            for score, idx in zip(distances[0], indices[0]):
                if idx == -1 or idx >= len(meta):
                    continue
                out.append((meta[idx]["file_id"], float(score)))
            return out


# ── Chunk index ──────────────────────────────────────────────────────────────
class ChunkIndex:
    """Append/replace per-file. Each chunk row carries metadata."""

    def __init__(self) -> None:
        self.path = settings.chunk_index_path

    def replace_for_file(
        self,
        *,
        file_id: str,
        chunk_ids: list[str],
        vectors: np.ndarray,
        chunk_meta: list[dict[str, Any]],
    ) -> None:
        with _chunk_lock:
            existing_meta = _load_meta(_meta_path(self.path))
            existing_index = _load_index(self.path, vectors.shape[1] if vectors.size else 1)

            # Drop rows for this file_id
            keep_mask = [m.get("file_id") != file_id for m in existing_meta]
            kept_meta = [m for m, k in zip(existing_meta, keep_mask) if k]

            kept_vectors = np.zeros((0, 1), dtype="float32")
            if existing_index.ntotal > 0 and any(keep_mask):
                rows = [m["row"] for m in kept_meta]
                # Reconstruct kept vectors
                full = existing_index.reconstruct_n(0, existing_index.ntotal)
                kept_vectors = full[rows].astype("float32")

            # New rows
            new_meta_records: list[dict[str, Any]] = []
            for i, (cid, cmeta) in enumerate(zip(chunk_ids, chunk_meta)):
                rec = {"chunk_id": cid, "file_id": file_id, **cmeta}
                new_meta_records.append(rec)

            # Stack vectors
            if kept_vectors.size and vectors.size:
                stacked = np.vstack([kept_vectors, vectors.astype("float32")])
            elif kept_vectors.size:
                stacked = kept_vectors
            else:
                stacked = vectors.astype("float32") if vectors.size else np.zeros((0, 1), dtype="float32")

            dim = stacked.shape[1] if stacked.size else 1
            index = faiss.IndexFlatIP(dim)
            if stacked.size:
                index.add(stacked)
            _save_index(index, self.path)

            # Renumber rows so meta matches the new index order
            combined_meta: list[dict[str, Any]] = []
            row_idx = 0
            for m in kept_meta:
                combined_meta.append({**m, "row": row_idx})
                row_idx += 1
            for rec in new_meta_records:
                combined_meta.append({**rec, "row": row_idx})
                row_idx += 1
            _save_meta(combined_meta, _meta_path(self.path))
            log.info(
                "chunk_index.replace_for_file",
                file_id=file_id,
                added=len(chunk_ids),
                total=index.ntotal,
            )

    def remove_for_file(self, file_id: str) -> None:
        # Empty replace == drop file
        self.replace_for_file(
            file_id=file_id,
            chunk_ids=[],
            vectors=np.zeros((0, 1), dtype="float32"),
            chunk_meta=[],
        )

    def search(self, query_vec: np.ndarray, top_k: int) -> list[dict[str, Any]]:
        with _chunk_lock:
            if not self.path.exists():
                return []
            index = faiss.read_index(str(self.path))
            meta = _load_meta(_meta_path(self.path))
            if index.ntotal == 0 or not meta:
                return []
            q = query_vec.astype("float32").reshape(1, -1)
            distances, indices = index.search(q, min(top_k, index.ntotal))
            out: list[dict[str, Any]] = []
            row_to_meta = {m["row"]: m for m in meta}
            for score, idx in zip(distances[0], indices[0]):
                if idx == -1:
                    continue
                m = row_to_meta.get(int(idx))
                if not m:
                    continue
                out.append({**m, "score": float(score)})
            return out
