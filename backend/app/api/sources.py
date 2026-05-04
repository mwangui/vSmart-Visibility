"""Source-file streaming endpoint (Plan §11.6).

Security:
- Auth required.
- file_id is a stable hash; never accept raw paths from clients.
- Resolve via ingest store; ensure final path is inside RAG_DOC_DIR.
"""

from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse

from app.auth.deps import SessionContext, get_session
from app.config import settings
from app.ingest.store import IngestStore


router = APIRouter(prefix="/sources", tags=["sources"])


def _safe_resolve(rel_or_abs: str) -> Path:
    base = settings.rag_doc_path.resolve()
    p = Path(rel_or_abs)
    if not p.is_absolute():
        p = base / p
    p = p.resolve()
    # Containment check: must live inside RAG_DOC_DIR.
    try:
        p.relative_to(base)
    except ValueError as exc:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Path outside RAG-Doc") from exc
    return p


@router.get("/{file_id}")
async def get_source(
    file_id: str,
    _session: SessionContext = Depends(get_session),
):
    store = IngestStore()
    brief = store.get_brief(file_id)
    if brief is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Source not found")
    target = _safe_resolve(brief.get("path", ""))
    if not target.is_file():
        raise HTTPException(status.HTTP_404_NOT_FOUND, "File missing on disk")
    return FileResponse(
        path=str(target),
        filename=brief.get("filename") or target.name,
    )
