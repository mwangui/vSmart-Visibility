"""Ingest endpoints (Plan §11.4 / §11.5)."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Request

from app.auth.deps import SessionContext, get_session


router = APIRouter(prefix="/ingest", tags=["ingest"])


@router.get("/status")
async def status(request: Request, _session: SessionContext = Depends(get_session)) -> dict:
    pipeline = request.app.state.ingest
    return await pipeline.status.snapshot()


@router.post("")
async def manual_ingest(
    request: Request,
    force: bool = False,
    _session: SessionContext = Depends(get_session),
) -> dict:
    pipeline = request.app.state.ingest
    return await pipeline.scan_now(reason="manual", force=force)
