"""Anthropic client factory.

Per Plan §9: NEVER hardcode model IDs. Callers pass model from settings.
We expose both sync and async clients so we can run vision/brief in batches and
SSE chat from the API layer.
"""

from __future__ import annotations

from functools import lru_cache

from anthropic import Anthropic, AsyncAnthropic

from app.config import settings


@lru_cache
def get_async_client() -> AsyncAnthropic | None:
    if not settings.ANTHROPIC_API_KEY:
        return None
    return AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)


@lru_cache
def get_sync_client() -> Anthropic | None:
    if not settings.ANTHROPIC_API_KEY:
        return None
    return Anthropic(api_key=settings.ANTHROPIC_API_KEY)
