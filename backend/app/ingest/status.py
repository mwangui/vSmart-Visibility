"""In-memory ingest status tracker (Plan §11.4)."""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone

from app.ingest.store import IngestStore


class IngestStatus:
    def __init__(self) -> None:
        self._lock = asyncio.Lock()
        self._processing: set[str] = set()
        self._queued: set[str] = set()
        self._last_scan: str | None = None

    async def mark_queued(self, name: str) -> None:
        async with self._lock:
            self._queued.add(name)
            self._processing.discard(name)

    async def mark_processing(self, name: str) -> None:
        async with self._lock:
            self._processing.add(name)
            self._queued.discard(name)

    async def mark_done(self, name: str) -> None:
        async with self._lock:
            self._processing.discard(name)
            self._queued.discard(name)

    async def mark_scan(self) -> None:
        async with self._lock:
            self._last_scan = datetime.now(timezone.utc).isoformat()

    async def snapshot(self) -> dict:
        store = IngestStore()
        async with self._lock:
            return {
                "indexed": len(store.load_briefs()),
                "processing": sorted(self._processing),
                "queued": sorted(self._queued),
                "failed": store.load_failures(),
                "last_scan": self._last_scan,
            }
