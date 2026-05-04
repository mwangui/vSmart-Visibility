"""Phase 4 DOD: brief contains version field for OMP and friends."""

from __future__ import annotations

import asyncio
from pathlib import Path

from app.ingest.brief import generate_brief


def test_brief_extracts_version_and_date(tmp_path: Path) -> None:
    f = tmp_path / "OMP_Statistics_施工計畫_v0.2.pdf"
    f.write_bytes(b"")
    brief = asyncio.run(
        generate_brief(
            file_id="abc",
            path=f,
            file_type="pdf",
            body_text=(
                "Brief about OMP statistics work plan. Decisions about routes, "
                "vSmart visibility and PRD review."
            ),
            sha256="0" * 64,
        )
    )
    assert brief["file_id"] == "abc"
    assert brief["filename"] == f.name
    assert brief["version"] == "v0.2"
    assert brief["type"] == "pdf"
    assert "OMP" in brief["topics"]
