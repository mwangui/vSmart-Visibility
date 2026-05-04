"""FastAPI dependencies for the v2.1 single-password gate.

Authentication mode is controlled by ``DISABLE_AUTH`` in ``.env`` (default
``true`` for the current build per user request: "先 Disable 登入需要密碼的那
一個 Login 直接讓不需要密碼就可以看").

When ``DISABLE_AUTH=true``:
  - Any request without (or with an invalid) session cookie still gets a
    valid ``SessionContext``. We mint a fresh per-browser session_id and set
    the HttpOnly cookie inline so subsequent requests stay on the same
    conversation thread.
  - The ``/api/auth/login`` endpoint still works (returning 200 + cookie),
    but the frontend ``AuthGate`` skips the login screen entirely so users
    never have to use it.

When ``DISABLE_AUTH=false``: original strict behaviour — missing / invalid
cookie raises a generic 401, preserving the case-insensitive password gate.
"""

from __future__ import annotations

from dataclasses import dataclass

import jwt
from fastapi import Depends, HTTPException, Request, Response, status

from app.auth.security import (
    SessionClaims,
    cookie_kwargs,
    create_session_jwt,
    decode_session_jwt,
)
from app.config import settings
from app.logging_setup import get_logger


log = get_logger("auth.deps")


@dataclass(frozen=True)
class SessionContext:
    session_id: str
    exp: int


def _read_cookie(request: Request) -> str | None:
    return request.cookies.get(settings.COOKIE_NAME)


def _issue_anonymous_session(response: Response) -> SessionContext:
    """Mint a fresh session JWT and attach it to the outgoing response.

    Used only when ``DISABLE_AUTH`` is on and the incoming request lacks a
    valid cookie. Each browser still gets its own ``session_id`` so chat
    history isolation is preserved.
    """
    token, claims = create_session_jwt()
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        **cookie_kwargs(),
    )
    log.info("auth.anon_session_issued", session_id=claims.session_id)
    return SessionContext(session_id=claims.session_id, exp=claims.exp)


async def get_session(request: Request, response: Response) -> SessionContext:
    """Resolve the caller's session.

    Behaviour depends on the ``DISABLE_AUTH`` setting:
      * disabled (default for this build): always returns a valid session,
        auto-issuing a cookie if needed.
      * enabled: classic strict gate — generic 401 on missing / invalid /
        expired cookie. Generic message keeps us from leaking *why* the
        token failed.
    """
    token = _read_cookie(request)
    if token:
        try:
            claims: SessionClaims = decode_session_jwt(token)
            return SessionContext(session_id=claims.session_id, exp=claims.exp)
        except jwt.PyJWTError:
            if not settings.DISABLE_AUTH:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required",
                ) from None
            # Auth disabled → fall through to mint a fresh session.

    if settings.DISABLE_AUTH:
        return _issue_anonymous_session(response)

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required",
    )


SessionDep = Depends(get_session)
