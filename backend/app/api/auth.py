"""Auth endpoints (v2.1 simplified): /login, /logout, /me.

Plan §11.2 / §15. Single shared password — no enumeration leaks here since
there is no user identifier; we only signal pass/fail.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from pydantic import BaseModel, Field

from app.auth.deps import SessionContext, get_session
from app.auth.security import cookie_kwargs, create_session_jwt, verify_password
from app.config import settings
from app.logging_setup import get_logger


router = APIRouter(prefix="/auth", tags=["auth"])
log = get_logger("auth")


class LoginRequest(BaseModel):
    password: str = Field(min_length=1, max_length=512)


class LoginResponse(BaseModel):
    ok: bool


class MeResponse(BaseModel):
    authed: bool
    session_id: str


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, response: Response) -> LoginResponse:
    if not verify_password(payload.password):
        # Generic, uniform error — no timing-cheap shortcut, no detail.
        log.info("auth.login.failure")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    token, claims = create_session_jwt()
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        **cookie_kwargs(),
    )
    log.info("auth.login.success", session_id=claims.session_id)
    return LoginResponse(ok=True)


@router.post("/logout")
async def logout(response: Response) -> dict[str, bool]:
    response.delete_cookie(
        key=settings.COOKIE_NAME,
        path="/",
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        httponly=True,
    )
    return {"ok": True}


@router.get("/me", response_model=MeResponse)
async def me(session: SessionContext = Depends(get_session)) -> MeResponse:
    return MeResponse(authed=True, session_id=session.session_id)
