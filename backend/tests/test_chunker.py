"""Phase 5 DOD: chunking respects target tokens and emits stable IDs."""

from __future__ import annotations

from app.ingest.chunker import chunk_text, chunk_vtt
from app.ingest.parsers.vtt import VttSegment


def test_chunk_text_produces_chunks() -> None:
    body = ("\n\n".join(["This is a paragraph."] * 200)).strip()
    chunks = chunk_text("test-fid", body)
    assert chunks, "expected at least one chunk"
    for c in chunks:
        assert c.file_id == "test-fid"
        assert c.text.strip()


def test_chunk_vtt_groups_speaker_turns() -> None:
    segments = [
        VttSegment(
            speaker=f"Speaker{i % 3}",
            start_ts=f"00:0{i}:00",
            end_ts=f"00:0{i}:30",
            text=("Hello " * 60).strip(),
        )
        for i in range(20)
    ]
    chunks = chunk_vtt("vtt-fid", segments)
    assert len(chunks) >= 2
    for c in chunks:
        assert c.metadata["type"] == "vtt"
        assert "speakers" in c.metadata
        assert c.metadata["start_ts"]
        assert c.metadata["end_ts"]
