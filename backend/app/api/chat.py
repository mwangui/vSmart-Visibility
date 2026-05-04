"""Chat endpoint (Plan §11.3, §16) with SSE streaming."""

from __future__ import annotations

import asyncio
import json
import uuid
from dataclasses import asdict
from typing import AsyncIterator

import anthropic
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.deps import SessionContext, get_session
from app.config import settings
from app.db.models import Conversation, Message
from app.db.session import get_db
from app.llm.client import get_async_client
from app.logging_setup import get_logger
from app.rag.prompts import ANSWER_SYSTEM_PROMPT
from app.rag.retriever import RetrievalContext, retrieve


router = APIRouter(prefix="/chat", tags=["chat"])
log = get_logger("chat")


class ChatTurn(BaseModel):
    role: str = Field(pattern=r"^(user|assistant)$")
    content: str = Field(min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    conversation_id: str | None = None
    messages: list[ChatTurn] = Field(min_length=1, max_length=64)


def _sse(event_obj: dict) -> bytes:
    return f"data: {json.dumps(event_obj, ensure_ascii=False)}\n\n".encode("utf-8")


def _classify_chat_error(exc: BaseException) -> str:
    """Translate raw exceptions into a short, user-safe diagnostic.

    The point is to give the operator/user a meaningful next step (network,
    auth, model, rate-limit) without leaking secrets, stack frames, or full
    proxy URLs into the SSE channel.
    """
    # ── Anthropic SDK exception hierarchy — most specific first ─────────────
    if isinstance(exc, anthropic.AuthenticationError):
        return "AI service rejected the API key. Verify ANTHROPIC_API_KEY."
    if isinstance(exc, anthropic.PermissionDeniedError):
        return "AI service denied access to this model. Verify your account permissions."
    if isinstance(exc, anthropic.NotFoundError):
        return "Configured AI model was not found. Verify ANTHROPIC_CHAT_MODEL."
    if isinstance(exc, anthropic.RateLimitError):
        return "AI service rate limit reached. Please retry in a moment."
    if isinstance(exc, anthropic.BadRequestError):
        return "AI request was rejected. The conversation may be too long."
    if isinstance(exc, anthropic.APITimeoutError):
        return "AI service timed out. Please retry."
    if isinstance(exc, anthropic.APIConnectionError):
        return (
            "Cannot reach AI service. Outbound HTTPS to api.anthropic.com is "
            "blocked. Configure HTTPS_PROXY or unblock the host."
        )
    if isinstance(exc, anthropic.APIStatusError):
        status = getattr(exc, "status_code", None)
        if status:
            return f"AI service returned an error (HTTP {status})."
        return "AI service returned an error."

    # ── Non-Anthropic network errors that surface from the embedder /
    # huggingface model fetch / requests-based clients ──────────────────────
    msg = str(exc)
    cls = exc.__class__.__name__

    # `requests.exceptions.ProxyError` (raised by sentence-transformers'
    # huggingface model download when the corporate proxy returns 403/407).
    if "ProxyError" in cls or ("proxy" in msg.lower() and "403" in msg):
        return (
            "Network proxy blocked the request. "
            "Whitelist huggingface.co (embedding model download) and "
            "api.anthropic.com (chat), or set HTTPS_PROXY appropriately."
        )

    # Generic connection / DNS failures (`ConnectionError`,
    # `requests.exceptions.ConnectionError`, etc.).
    if "ConnectionError" in cls or "MaxRetryError" in cls or "DNS" in msg.upper():
        return (
            "Network unreachable. Could not contact embedding model host or "
            "AI service. Check internet / VPN / proxy."
        )

    # HuggingFace / model-loading specific (sentence-transformers raises
    # `OSError` with HF-style messages when offline + cache miss).
    if "huggingface" in msg.lower() or "OSError" in cls:
        return (
            "Embedding model is not available offline and could not be "
            "downloaded. Verify network access to huggingface.co or "
            "pre-cache the BAAI/bge-m3 model."
        )

    # ── Last-resort fallback: include the exception class so logs and the
    # UI converge on the same hint without leaking message bodies. ─────────
    return f"AI request failed ({cls}). Check backend logs for details."


def _format_context(ctx: RetrievalContext) -> tuple[str, list[dict]]:
    """Render context blocks for the answer model and produce citation metadata."""
    if not ctx.blocks:
        return "", []
    parts: list[str] = []
    citations_meta: list[dict] = []
    for i, b in enumerate(ctx.blocks, start=1):
        cite_id = f"^{i}"
        cit = b.citation
        meta = {
            "id": cite_id,
            "file_id": cit.file_id,
            "file": cit.filename,
            "page": cit.page,
            "timestamp": cit.timestamp,
            "speakers": cit.speakers,
            "label": cit.label,
            "score": b.score,
        }
        citations_meta.append(meta)
        header = f"[{cite_id}] {cit.label}"
        parts.append(f"{header}\n{b.body.strip()}")
    return "\n\n---\n\n".join(parts), citations_meta


@router.post("")
async def chat(
    payload: ChatRequest,
    session: SessionContext = Depends(get_session),
    db: AsyncSession = Depends(get_db),
) -> StreamingResponse:
    if not settings.ANTHROPIC_API_KEY or not settings.ANTHROPIC_CHAT_MODEL:
        raise HTTPException(503, "Chat model not configured")

    user_turn = next((m for m in reversed(payload.messages) if m.role == "user"), None)
    if user_turn is None:
        raise HTTPException(400, "No user message in payload")

    convo = await _get_or_create_conversation(db, session, payload.conversation_id)

    history = [{"role": t.role, "content": t.content} for t in payload.messages][:-1]
    user_text = user_turn.content

    await _append_message(db, convo.id, role="user", content=user_text)

    async def event_stream() -> AsyncIterator[bytes]:
        try:
            ctx = await retrieve(user_text, history=history)
            context_text, citations_meta = _format_context(ctx)

            for cit in citations_meta:
                yield _sse({"type": "citation", "citation": cit})

            client = get_async_client()
            assert client is not None  # checked above

            user_block = (
                "User question:\n"
                f"{user_text}\n\n"
                "Retrieved context:\n"
                f"{context_text or '(no relevant context found)'}\n\n"
                "Answer the question using the context above. Use [^N] inline markers to cite."
            )

            full_text_parts: list[str] = []
            async with client.messages.stream(
                model=settings.ANTHROPIC_CHAT_MODEL,
                max_tokens=settings.ANTHROPIC_MAX_TOKENS,
                system=ANSWER_SYSTEM_PROMPT,
                messages=[*history, {"role": "user", "content": user_block}],
            ) as stream:
                async for text in stream.text_stream:
                    if text:
                        full_text_parts.append(text)
                        yield _sse({"type": "text", "content": text})

            assistant_text = "".join(full_text_parts).strip()
            await _append_message(
                db,
                convo.id,
                role="assistant",
                content=assistant_text,
                citations_json=json.dumps(citations_meta, ensure_ascii=False),
            )
            yield _sse({"type": "done", "conversation_id": convo.id})
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            # Surface a diagnostic message so the user can act, instead of the
            # opaque "Streaming failed". We log the full exception for ops, but
            # only return a short, user-safe summary to the client.
            user_message = _classify_chat_error(exc)
            log.warning(
                "chat.stream_failed",
                error_class=exc.__class__.__name__,
                error=str(exc),
                user_message=user_message,
            )
            yield _sse({"type": "error", "message": user_message})
        finally:
            try:
                await db.commit()
            except Exception:
                await db.rollback()

    headers = {
        "Cache-Control": "no-store",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
    }
    return StreamingResponse(event_stream(), media_type="text/event-stream", headers=headers)


async def _get_or_create_conversation(
    db: AsyncSession, session: SessionContext, conversation_id: str | None
) -> Conversation:
    if conversation_id:
        stmt = select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.session_id == session.session_id,
        )
        existing = (await db.execute(stmt)).scalar_one_or_none()
        if existing is not None:
            return existing
    convo = Conversation(
        id=str(uuid.uuid4()),
        session_id=session.session_id,
        title=None,
    )
    db.add(convo)
    await db.flush()
    return convo


async def _append_message(
    db: AsyncSession,
    conversation_id: str,
    *,
    role: str,
    content: str,
    citations_json: str | None = None,
) -> None:
    msg = Message(
        id=str(uuid.uuid4()),
        conversation_id=conversation_id,
        role=role,
        content=content,
        citations_json=citations_json,
    )
    db.add(msg)
    await db.flush()


# Avoid unused import in production wheel
_ = asdict
