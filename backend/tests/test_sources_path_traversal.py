"""Plan §11.6 / §17 — sources endpoint must reject path traversal."""

from __future__ import annotations

import pytest
from fastapi import HTTPException

from app.api.sources import _safe_resolve
from app.config import settings


def test_relative_inside_dir_ok(tmp_path, monkeypatch) -> None:
    rag = tmp_path / "rag"
    rag.mkdir()
    sample = rag / "ok.txt"
    sample.write_text("ok", encoding="utf-8")
    monkeypatch.setattr(settings, "RAG_DOC_DIR", str(rag))
    resolved = _safe_resolve("ok.txt")
    assert resolved == sample.resolve()


def test_traversal_rejected(tmp_path, monkeypatch) -> None:
    rag = tmp_path / "rag"
    rag.mkdir()
    monkeypatch.setattr(settings, "RAG_DOC_DIR", str(rag))
    with pytest.raises(HTTPException) as exc:
        _safe_resolve("../../etc/passwd")
    assert exc.value.status_code == 403


def test_absolute_outside_rejected(tmp_path, monkeypatch) -> None:
    rag = tmp_path / "rag"
    rag.mkdir()
    monkeypatch.setattr(settings, "RAG_DOC_DIR", str(rag))
    with pytest.raises(HTTPException) as exc:
        _safe_resolve("/etc/hosts")
    assert exc.value.status_code == 403
