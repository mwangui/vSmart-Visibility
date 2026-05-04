"""Brief router (Plan §8.3 / §8.4).

Strategy:
- If brief count <= 50, send all briefs to the router.
- If 50 < count <= 200, embed-search top ROUTER_CANDIDATE_BRIEFS first, then route.
- If > 200, same as above (never let prompt grow unbounded).
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import Any

from app.config import settings
from app.ingest.embed import get_embedder
from app.ingest.store import IngestStore
from app.llm.client import get_async_client
from app.logging_setup import get_logger
from app.rag.index import BriefIndex
from app.rag.prompts import ROUTER_SYSTEM_PROMPT


log = get_logger("router")


@dataclass
class RouterMatch:
    file_id: str
    confidence: float
    reason: str


@dataclass
class RouterDecision:
    matches: list[RouterMatch]
    candidate_file_ids: list[str]
    reason: str  # short audit string

    @property
    def best_confidence(self) -> float:
        return max((m.confidence for m in self.matches), default=0.0)


async def route(question: str, history: list[dict[str, str]] | None = None) -> RouterDecision:
    store = IngestStore()
    briefs = store.load_briefs()
    if not briefs:
        return RouterDecision(matches=[], candidate_file_ids=[], reason="empty_corpus")

    candidate_ids = await _select_candidates(question, briefs)
    candidates = [briefs[fid] for fid in candidate_ids if fid in briefs]

    client = get_async_client()
    if client is None or not settings.ANTHROPIC_ROUTER_MODEL:
        log.info("router.fallback_no_llm")
        return RouterDecision(
            matches=[],
            candidate_file_ids=candidate_ids,
            reason="no_router_model",
        )

    prompt = _build_router_user_prompt(question, history or [], candidates)
    try:
        msg = await client.messages.create(
            model=settings.ANTHROPIC_ROUTER_MODEL,
            max_tokens=512,
            system=ROUTER_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as exc:
        log.warning("router.api_failed", error=str(exc))
        return RouterDecision(
            matches=[],
            candidate_file_ids=candidate_ids,
            reason="router_api_error",
        )

    raw = "".join(
        getattr(b, "text", "") for b in (msg.content or []) if getattr(b, "type", None) == "text"
    ).strip()
    parsed = _safe_json(raw) or {}
    matches: list[RouterMatch] = []
    for m in parsed.get("matches", [])[: settings.ROUTER_MAX_FILES]:
        try:
            fid = str(m["file_id"])
            conf = float(m.get("confidence", 0.0))
            reason = str(m.get("reason", ""))[:280]
            if fid in briefs:
                matches.append(
                    RouterMatch(file_id=fid, confidence=max(0.0, min(1.0, conf)), reason=reason)
                )
        except (KeyError, TypeError, ValueError):
            continue
    return RouterDecision(
        matches=matches,
        candidate_file_ids=candidate_ids,
        reason="ok" if matches else "no_match",
    )


async def _select_candidates(question: str, briefs: dict[str, Any]) -> list[str]:
    if len(briefs) <= 50:
        return list(briefs.keys())
    embedder = get_embedder()
    qvec = (await embedder.encode_async([question]))[0]
    hits = BriefIndex().search(qvec, top_k=settings.ROUTER_CANDIDATE_BRIEFS)
    return [fid for fid, _ in hits]


def _build_router_user_prompt(
    question: str, history: list[dict[str, str]], candidates: list[dict[str, Any]]
) -> str:
    lines: list[str] = []
    if history:
        lines.append("Recent conversation:")
        for turn in history[-settings.CONVERSATION_CONTEXT_TURNS :]:
            lines.append(f"- {turn.get('role', 'user')}: {turn.get('content', '')[:400]}")
        lines.append("")
    lines.append(f"Current question: {question}")
    lines.append("")
    lines.append("Candidate files (file_id followed by brief):")
    for c in candidates:
        lines.append(
            f"- file_id={c.get('file_id')} | filename={c.get('filename')} "
            f"| version={c.get('version','')} | date={c.get('date','')}\n"
            f"  topics: {', '.join(c.get('topics', []) or [])}\n"
            f"  gist: {c.get('gist_one_liner','')}\n"
            f"  summary: {c.get('summary','')[:400]}"
        )
    return "\n".join(lines)


def _safe_json(text: str) -> dict | None:
    text = (text or "").strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?", "", text).rstrip("`").strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{[\s\S]*\}", text)
        if not m:
            return None
        try:
            return json.loads(m.group(0))
        except json.JSONDecodeError:
            return None
