"""Auth primitives — single shared password + JWT session cookie.

Construction plan v2.1 §15 / §1.2: password compare + JWT only, no User table.
- Constant-time password compare to prevent timing oracles.
- JWT contains { authed: true, session_id, exp } (7-day rolling).
"""

from __future__ import annotations

import hmac
import secrets
import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

import jwt

from app.config import settings


@dataclass(frozen=True)
class SessionClaims:
    authed: bool
    session_id: str
    exp: int


def verify_password(input_password: str) -> bool:
    """Constant-time comparison; case-insensitive when configured."""
    if input_password is None:
        return False
    expected = settings.APP_PASSWORD or ""
    if settings.APP_PASSWORD_CASE_INSENSITIVE:
        a = input_password.casefold().encode("utf-8")
        b = expected.casefold().encode("utf-8")
    else:
        a = input_password.encode("utf-8")
        b = expected.encode("utf-8")
    return hmac.compare_digest(a, b)


def create_session_jwt(session_id: str | None = None) -> tuple[str, SessionClaims]:
    sid = session_id or str(uuid.uuid4())
    exp_at = datetime.now(tz=timezone.utc) + timedelta(days=settings.JWT_EXPIRE_DAYS)
    payload = {
        "authed": True,
        "session_id": sid,
        "exp": int(exp_at.timestamp()),
        # jti rotates on every login so an old leaked token can be denylisted later
        "jti": secrets.token_urlsafe(8),
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return token, SessionClaims(authed=True, session_id=sid, exp=payload["exp"])


def decode_session_jwt(token: str) -> SessionClaims:
    """Raises jwt.PyJWTError subclasses on failure."""
    payload = jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
        options={"require": ["exp", "session_id", "authed"]},
    )
    if not payload.get("authed"):
        raise jwt.InvalidTokenError("not authed")
    return SessionClaims(
        authed=True,
        session_id=str(payload["session_id"]),
        exp=int(payload["exp"]),
    )


def cookie_kwargs() -> dict:
    """Common cookie settings used by login endpoint."""
    return {
        "httponly": True,
        "secure": settings.COOKIE_SECURE,
        "samesite": settings.COOKIE_SAMESITE,
        "path": "/",
        "max_age": settings.JWT_EXPIRE_DAYS * 24 * 3600,
    }
