"""VTT (WebVTT) parser (Plan §7.4).

Outputs:
- Full extracted text (Speaker: text format with timestamps)
- A list of segments (turns) with start_ts / end_ts / speaker / text

Speaker turns are inferred from "Name: text" prefix where present, falling
back to a synthetic "Speaker" when absent.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import webvtt


_SPEAKER_LINE = re.compile(r"^(?P<speaker>[^:\n]{1,64}):\s*(?P<text>.*)$", re.DOTALL)


@dataclass
class VttSegment:
    speaker: str
    start_ts: str
    end_ts: str
    text: str


def parse_vtt(path: Path) -> tuple[str, list[VttSegment]]:
    segments: list[VttSegment] = []
    last_speaker = "Speaker"

    for caption in webvtt.read(str(path)):
        body = (caption.text or "").strip().replace("\n", " ")
        if not body:
            continue
        m = _SPEAKER_LINE.match(body)
        if m:
            speaker = m.group("speaker").strip()
            text = m.group("text").strip()
            if 0 < len(speaker) <= 64 and speaker:
                last_speaker = speaker
        else:
            text = body
        segments.append(
            VttSegment(
                speaker=last_speaker,
                start_ts=caption.start,
                end_ts=caption.end,
                text=text,
            )
        )

    full_lines = [
        f"[{s.start_ts}–{s.end_ts}] {s.speaker}: {s.text}" for s in segments
    ]
    return "\n".join(full_lines), segments
