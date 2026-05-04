"""On-disk JSON-backed key/value store for briefs, hashes, and failures.

This is intentionally simple to keep Phase 6 DOD achievable. v2 may move to DB.
"""

from __future__ import annotations

import json
import threading
from pathlib import Path
from typing import Any

from app.config import settings


_lock = threading.RLock()


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        with path.open("r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, json.JSONDecodeError):
        return default


def _write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2, sort_keys=True)
    tmp.replace(path)


class IngestStore:
    """Briefs, file hashes, failures.

    Briefs are keyed by `file_id` (sha256 of path). Hashes are keyed by absolute
    path string. Failures are list-shaped.
    """

    def __init__(self) -> None:
        self.briefs_path = settings.briefs_path
        self.hashes_path = settings.file_hashes_path
        self.failures_path = settings.failures_path

    # ── briefs ───────────────────────────────────────────────────────────────
    def load_briefs(self) -> dict[str, dict[str, Any]]:
        with _lock:
            return _read_json(self.briefs_path, {})

    def save_briefs(self, briefs: dict[str, dict[str, Any]]) -> None:
        with _lock:
            _write_json(self.briefs_path, briefs)

    def get_brief(self, file_id: str) -> dict[str, Any] | None:
        return self.load_briefs().get(file_id)

    def upsert_brief(self, brief: dict[str, Any]) -> None:
        with _lock:
            briefs = self.load_briefs()
            briefs[brief["file_id"]] = brief
            self.save_briefs(briefs)

    def delete_brief(self, file_id: str) -> None:
        with _lock:
            briefs = self.load_briefs()
            if file_id in briefs:
                briefs.pop(file_id)
                self.save_briefs(briefs)

    # ── file hashes ──────────────────────────────────────────────────────────
    def load_hashes(self) -> dict[str, dict[str, Any]]:
        with _lock:
            return _read_json(self.hashes_path, {})

    def save_hashes(self, hashes: dict[str, dict[str, Any]]) -> None:
        with _lock:
            _write_json(self.hashes_path, hashes)

    def get_hash(self, abs_path: str) -> dict[str, Any] | None:
        return self.load_hashes().get(abs_path)

    def upsert_hash(self, abs_path: str, file_id: str, sha256: str) -> None:
        with _lock:
            data = self.load_hashes()
            data[abs_path] = {"file_id": file_id, "sha256": sha256}
            self.save_hashes(data)

    def remove_hash(self, abs_path: str) -> None:
        with _lock:
            data = self.load_hashes()
            if abs_path in data:
                data.pop(abs_path)
                self.save_hashes(data)

    # ── failures ─────────────────────────────────────────────────────────────
    def load_failures(self) -> list[dict[str, Any]]:
        with _lock:
            return _read_json(self.failures_path, [])

    def record_failure(self, file: str, reason: str, attempts: int = 1) -> None:
        with _lock:
            failures = self.load_failures()
            existing = next((f for f in failures if f["file"] == file), None)
            if existing:
                existing["reason"] = reason
                existing["attempts"] = attempts
            else:
                failures.append({"file": file, "reason": reason, "attempts": attempts})
            _write_json(self.failures_path, failures)

    def clear_failure(self, file: str) -> None:
        with _lock:
            failures = [f for f in self.load_failures() if f["file"] != file]
            _write_json(self.failures_path, failures)
