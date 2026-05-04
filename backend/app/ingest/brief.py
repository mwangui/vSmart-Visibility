"""Brief generation (Plan §8.2).

Builds a structured per-file brief that captures: title, date, version,
participants, topics, gist_one_liner, summary. We use an LLM call when an
ANTHROPIC_BRIEF_MODEL is configured; otherwise fall back to a deterministic
heuristic so ingestion works offline (e.g. during dev).

Brief schema is JSON-serialisable.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from app.config import settings
from app.llm.client import get_async_client
from app.logging_setup import get_logger


log = get_logger("brief")

_BRIEF_SYSTEM = (
    "You generate structured briefs for a retrieval index over Cisco Catalyst "
    "SD-WAN vSmart Visibility documents (meeting transcripts, specs, design plans). "
    "Return ONLY a single JSON object with the schema requested — no prose, no "
    "code fences."
)

_BRIEF_USER_TMPL = """File: {filename}
Type: {file_type}

Produce a JSON object with these keys:
- title: short human-readable title.
- date: ISO date if discernible from filename or text (YYYY-MM-DD); empty string if unknown.
- version: version string if present (e.g. "v0.2"); empty string if none.
- participants: array of participant names found in the text (people who spoke). Empty array if none.
- topics: array of 3-8 short topic phrases.
- gist_one_liner: ONE sentence summary (<= 200 chars).
- summary: concise structured summary (<= 1500 chars).

Strict JSON only.

Document text (may be truncated):
---
{body}
---
"""


async def generate_brief(
    *,
    file_id: str,
    path: Path,
    file_type: str,
    body_text: str,
    sha256: str,
) -> dict[str, Any]:
    filename = path.name
    base = _empty_brief(file_id=file_id, path=path, file_type=file_type, sha256=sha256)

    # Heuristic title / date / version even if LLM is unavailable.
    base["title"] = _guess_title(filename)
    base["date"] = _guess_date(filename, body_text)
    base["version"] = _guess_version(filename, body_text)

    client = get_async_client()
    if client is None or not settings.ANTHROPIC_BRIEF_MODEL:
        log.info("brief.llm_skipped", file=filename)
        # Deterministic fallback summary.
        base["gist_one_liner"] = _first_sentence(body_text) or filename
        base["summary"] = body_text[:1400]
        base["topics"] = _guess_topics(filename, body_text)
        return base

    truncated = body_text[:18000]
    try:
        msg = await client.messages.create(
            model=settings.ANTHROPIC_BRIEF_MODEL,
            max_tokens=1024,
            system=_BRIEF_SYSTEM,
            messages=[
                {
                    "role": "user",
                    "content": _BRIEF_USER_TMPL.format(
                        filename=filename, file_type=file_type, body=truncated
                    ),
                }
            ],
        )
    except Exception as exc:
        log.warning("brief.llm_failed", file=filename, error=str(exc))
        base["gist_one_liner"] = _first_sentence(body_text) or filename
        base["summary"] = body_text[:1400]
        base["topics"] = _guess_topics(filename, body_text)
        return base

    raw = "".join(
        getattr(b, "text", "") for b in (msg.content or []) if getattr(b, "type", None) == "text"
    ).strip()
    parsed = _safe_json(raw)
    if parsed:
        for k in ("title", "date", "version", "gist_one_liner", "summary"):
            v = parsed.get(k)
            if isinstance(v, str) and v.strip():
                base[k] = v.strip()
        for k in ("participants", "topics"):
            v = parsed.get(k)
            if isinstance(v, list):
                base[k] = [str(x).strip() for x in v if str(x).strip()][:32]
    else:
        log.warning("brief.parse_failed", file=filename)
        base["gist_one_liner"] = _first_sentence(body_text) or filename
        base["summary"] = body_text[:1400]
        base["topics"] = _guess_topics(filename, body_text)

    return base


# ── helpers ──────────────────────────────────────────────────────────────────
def _empty_brief(
    *, file_id: str, path: Path, file_type: str, sha256: str
) -> dict[str, Any]:
    rel = _relative_to_rag(path)
    now = datetime.now(timezone.utc).isoformat()
    return {
        "file_id": file_id,
        "filename": path.name,
        "path": rel,
        "type": file_type,
        "hash": sha256,
        "title": path.stem,
        "date": "",
        "version": "",
        "participants": [],
        "topics": [],
        "gist_one_liner": "",
        "summary": "",
        "created_at": now,
        "updated_at": now,
    }


def _relative_to_rag(path: Path) -> str:
    base = settings.rag_doc_path.resolve()
    try:
        return str(path.resolve().relative_to(base))
    except ValueError:
        return path.name


def _guess_title(filename: str) -> str:
    stem = Path(filename).stem
    stem = re.sub(r"[-_]\d{6,}.*$", "", stem)
    stem = stem.replace("_", " ").strip()
    return stem or filename


_DATE_RE = re.compile(r"(20\d{6})")


def _guess_date(filename: str, body: str) -> str:
    m = _DATE_RE.search(filename) or _DATE_RE.search(body[:2000])
    if not m:
        return ""
    raw = m.group(1)
    try:
        return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]}"
    except IndexError:
        return ""


_VER_RE = re.compile(r"\bv\d+(?:\.\d+)+\b", re.IGNORECASE)


def _guess_version(filename: str, body: str) -> str:
    m = _VER_RE.search(filename) or _VER_RE.search(body[:2000])
    return m.group(0) if m else ""


def _first_sentence(text: str) -> str:
    text = (text or "").strip()
    if not text:
        return ""
    for delim in (". ", "。", "\n"):
        if delim in text:
            return text.split(delim, 1)[0][:200].strip()
    return text[:200].strip()


def _guess_topics(filename: str, body: str) -> list[str]:
    keywords = [
        "OMP",
        "vSmart",
        "vManage",
        "PRD",
        "EC review",
        "UX review",
        "kickoff",
        "routes",
        "peers",
        "statistics",
    ]
    found: list[str] = []
    blob = (filename + "\n" + body[:4000]).lower()
    for k in keywords:
        if k.lower() in blob:
            found.append(k)
    return found[:8]


def _safe_json(text: str) -> dict[str, Any] | None:
    text = (text or "").strip()
    if not text:
        return None
    # Tolerate accidental code fences.
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?", "", text).rstrip("`").strip()
    try:
        obj = json.loads(text)
    except json.JSONDecodeError:
        # Try to recover the first JSON object substring.
        m = re.search(r"\{[\s\S]*\}", text)
        if not m:
            return None
        try:
            obj = json.loads(m.group(0))
        except json.JSONDecodeError:
            return None
    return obj if isinstance(obj, dict) else None
