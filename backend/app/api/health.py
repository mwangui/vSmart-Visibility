"""Health check (Plan §11.1)."""

from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter

from app.config import settings


router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict:
    return {
        "status": "ok",
        "rag_doc_dir_exists": Path(settings.rag_doc_path).exists(),
        "models_configured": all(
            [
                settings.ANTHROPIC_API_KEY,
                settings.ANTHROPIC_CHAT_MODEL,
                settings.ANTHROPIC_ROUTER_MODEL,
                settings.ANTHROPIC_VISION_MODEL,
                settings.ANTHROPIC_BRIEF_MODEL,
            ]
        ),
    }
