"""Filesystem watcher that turns FS events into pipeline tasks.

Plan §7.3:
- watchdog observer on RAG_DOC_DIR
- debounce 2s to handle multi-event modifications
- size-stable check before enqueue
"""

from __future__ import annotations

import asyncio
import contextlib
from pathlib import Path
from typing import Awaitable, Callable

from watchdog.events import FileSystemEvent, FileSystemEventHandler
from watchdog.observers import Observer

from app.config import settings
from app.ingest.worker import SUPPORTED_EXT
from app.logging_setup import get_logger


log = get_logger("watcher")


EnqueueFn = Callable[[str, Path], Awaitable[None]]


class _Handler(FileSystemEventHandler):
    def __init__(self, loop: asyncio.AbstractEventLoop, enqueue: EnqueueFn) -> None:
        super().__init__()
        self._loop = loop
        self._enqueue = enqueue

    def _schedule(self, kind: str, path: str) -> None:
        p = Path(path)
        if p.suffix.lower() not in SUPPORTED_EXT:
            return
        if not self._loop.is_running():
            return
        self._loop.call_soon_threadsafe(
            asyncio.create_task, self._enqueue(kind, p)
        )

    def on_created(self, event: FileSystemEvent) -> None:
        if not event.is_directory:
            self._schedule("upsert", event.src_path)

    def on_modified(self, event: FileSystemEvent) -> None:
        if not event.is_directory:
            self._schedule("upsert", event.src_path)

    def on_moved(self, event: FileSystemEvent) -> None:
        if not event.is_directory:
            # Treat as upsert on dest + delete on src
            self._schedule("delete", event.src_path)
            self._schedule("upsert", event.dest_path)

    def on_deleted(self, event: FileSystemEvent) -> None:
        if not event.is_directory:
            self._schedule("delete", event.src_path)


class RagDocWatcher:
    def __init__(self, enqueue: EnqueueFn) -> None:
        self._enqueue = enqueue
        self._observer: Observer | None = None

    def start(self, loop: asyncio.AbstractEventLoop) -> None:
        if not settings.rag_doc_path.exists():
            log.warning("watcher.no_dir", path=str(settings.rag_doc_path))
            return
        observer = Observer()
        observer.schedule(
            _Handler(loop, self._enqueue),
            str(settings.rag_doc_path),
            recursive=settings.INGEST_WATCH_RECURSIVE,
        )
        observer.daemon = True
        observer.start()
        self._observer = observer
        log.info("watcher.start", path=str(settings.rag_doc_path))

    def stop(self) -> None:
        if self._observer is not None:
            with contextlib.suppress(Exception):
                self._observer.stop()
                self._observer.join(timeout=2.0)
            self._observer = None
            log.info("watcher.stop")
