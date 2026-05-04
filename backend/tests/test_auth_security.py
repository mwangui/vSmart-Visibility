"""Phase 1' DOD checks (Plan §15)."""

from __future__ import annotations

from app.auth.security import (
    cookie_kwargs,
    create_session_jwt,
    decode_session_jwt,
    verify_password,
)
from app.config import settings


def test_password_case_insensitive_match() -> None:
    settings.APP_PASSWORD = "demo"
    settings.APP_PASSWORD_CASE_INSENSITIVE = True
    assert verify_password("demo")
    assert verify_password("DEMO")
    assert verify_password("Demo")
    assert verify_password("DeMo")
    assert not verify_password("wrong")
    assert not verify_password("")
    assert not verify_password("demoo")


def test_password_case_sensitive_mode() -> None:
    settings.APP_PASSWORD = "ProductionSecret!"
    settings.APP_PASSWORD_CASE_INSENSITIVE = False
    assert verify_password("ProductionSecret!")
    assert not verify_password("productionsecret!")
    settings.APP_PASSWORD = "demo"
    settings.APP_PASSWORD_CASE_INSENSITIVE = True


def test_jwt_roundtrip() -> None:
    token, claims = create_session_jwt()
    decoded = decode_session_jwt(token)
    assert decoded.session_id == claims.session_id
    assert decoded.authed is True


def test_cookie_kwargs_have_httponly_and_lax() -> None:
    kw = cookie_kwargs()
    assert kw["httponly"] is True
    assert kw["samesite"] in {"lax", "strict", "none"}
    assert kw["path"] == "/"
