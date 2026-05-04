"""Ingest pipeline orchestrator.

Plan §7.3 — four ingest triggers:
1) startup scan
2) watchdog FS events
3) periodic safety scan every INGEST_RESCAN_INTERVAL_S
4) manual `POST /api/ingest`

Concurrency: bounded queue with INGEST_CONCURRENCY workers. Debounce upsert
events with INGEST_DEBOUNCE_MS and require file-size stability before running
the worker (avoids ingesting a file that's still being copied).
"""

from __future__ import annotations

import asyncio
import contextlib
from collections.abc import Iterable
from dataclasses import dataclass
from pathlib import Path

from app.config import settings
from app.ingest.status import IngestStatus
from app.ingest.store import IngestStore
from app.ingest.watcher import RagDocWatcher
from app.ingest.worker import SUPPORTED_EXT, ingest_file, remove_file
from app.logging_setup import get_logger


log = get_logger("ingest.pipeline")


@dataclass
class _Task:
    kind: str  # "upsert" | "delete"
    path: Path


class IngestPipeline:
    def __init__(self) -> None:
        self.status = IngestStatus()
        self._queue: asyncio.Queue[_Task] = asyncio.Queue()
        self._workers: list[asyncio.Task] = []
        self._scan_task: asyncio.Task | None = None
        self._watcher = RagDocWatcher(self._enqueue_event)
        self._debounce_tasks: dict[str, asyncio.Task] = {}
        self._stopping = False

    # ── lifecycle ────────────────────────────────────────────────────────────
    async def start(self) -> None:
        # Workers
        for i in range(max(1, settings.INGEST_CONCURRENCY)):
            self._workers.append(asyncio.create_task(self._worker_loop(i)))

        # Watcher (kicks tasks back via the running loop)
        self._watcher.start(asyncio.get_running_loop())

        # Initial scan
        await self.scan_now(reason="startup")

        # Periodic safety scan
        self._scan_task = asyncio.create_task(self._periodic_rescan())

    async def stop(self) -> None:
        self._stopping = True
        self._watcher.stop()
        if self._scan_task:
            self._scan_task.cancel()
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await self._scan_task
        for w in self._workers:
            w.cancel()
        for w in self._workers:
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await w
        for t in self._debounce_tasks.values():
            t.cancel()

    # ── manual / external triggers ───────────────────────────────────────────
    async def scan_now(self, *, reason: str = "manual", force: bool = False) -> dict:
        await self.status.mark_scan()
        log.info("ingest.scan", reason=reason, force=force)
        store = IngestStore()
        seen_paths: set[str] = set()
        rag_dir = settings.rag_doc_path

        if rag_dir.exists():
            for path in self._iter_files(rag_dir):
                seen_paths.add(str(path))
                if force:
                    await self._enqueue("upsert", path)
                    continue
                cached = store.get_hash(str(path))
                if cached is None:
                    await self._enqueue("upsert", path)

        # Detect deletions
        for known in list(store.load_hashes().keys()):
            if known not in seen_paths:
                await self._enqueue("delete", Path(known))

        return {"queued": self._queue.qsize()}

    @staticmethod
    def _iter_files(root: Path) -> Iterable[Path]:
        for entry in root.iterdir() if not settings.INGEST_WATCH_RECURSIVE else root.rglob("*"):
            if entry.is_file() and entry.suffix.lower() in SUPPORTED_EXT:
                yield entry.resolve()

    # ── enqueue path ─────────────────────────────────────────────────────────
    async def _enqueue_event(self, kind: str, path: Path) -> None:
        """Public callback used by the watcher; debounces upserts."""
        if kind == "delete":
            await self._enqueue("delete", path)
            return
        # Debounce: cancel any pending upsert for this path and start a new timer.
        key = str(path)
        existing = self._debounce_tasks.get(key)
        if existing is not None:
            existing.cancel()
        self._debounce_tasks[key] = asyncio.create_task(self._debounce_then_enqueue(path))

    async def _debounce_then_enqueue(self, path: Path) -> None:
        try:
            await asyncio.sleep(settings.INGEST_DEBOUNCE_MS / 1000.0)
            if not await self._is_size_stable(path):
                return
            await self._enqueue("upsert", path)
        except asyncio.CancelledError:
            return
        finally:
            self._debounce_tasks.pop(str(path), None)

    @staticmethod
    async def _is_size_stable(path: Path, dwell: float = 0.6) -> bool:
        try:
            s1 = path.stat().st_size
        except OSError:
            return False
        await asyncio.sleep(dwell)
        try:
            s2 = path.stat().st_size
        except OSError:
            return False
        return s1 == s2

    async def _enqueue(self, kind: str, path: Path) -> None:
        if kind == "upsert" and path.suffix.lower() not in SUPPORTED_EXT:
            return
        await self.status.mark_queued(path.name)
        await self._queue.put(_Task(kind=kind, path=path))

    # ── workers ──────────────────────────────────────────────────────────────
    async def _worker_loop(self, idx: int) -> None:
        log.info("worker.start", idx=idx)
        try:
            while not self._stopping:
                task = await self._queue.get()
                try:
                    await self.status.mark_processing(task.path.name)
                    if task.kind == "upsert":
                        await ingest_file(task.path)
                    elif task.kind == "delete":
                        await remove_file(task.path)
                except Exception as exc:
                    log.warning(
                        "worker.task_failed",
                        idx=idx,
                        path=str(task.path),
                        kind=task.kind,
                        error=str(exc),
                    )
                finally:
                    await self.status.mark_done(task.path.name)
                    self._queue.task_done()
        except asyncio.CancelledError:
            return

    async def _periodic_rescan(self) -> None:
        try:
            while not self._stopping:
                await asyncio.sleep(settings.INGEST_RESCAN_INTERVAL_S)
                await self.scan_now(reason="periodic")
        except asyncio.CancelledError:
            return
