# vSmart Visibility AI Assistant — Backend

FastAPI service that powers the right-bottom AI Assistant panel:

- Auto-ingests `RAG-Doc/` (VTT + PDF; PDF chart/diagram pages go through a
  vision LM) into a multilingual embedding index.
- Brief-router first; chunk-RAG fallback when confidence is low.
- SSE streaming chat with inline citations.
- Single shared password (`demo`) — see plan `vSmart_AI_Assistant_施工計畫_v2.1.pdf`.

## Quick start

```bash
cd backend
cp .env.example .env
# 1) Fill in ANTHROPIC_API_KEY
# 2) Verify current model IDs at https://docs.claude.com/en/docs/about-claude/models
#    and paste them into ANTHROPIC_*_MODEL.
# 3) Optional: replace JWT_SECRET_KEY with a fresh random string:
python -c "import secrets; print(secrets.token_urlsafe(48))"

pip install -e .
# `WATCHFILES_FORCE_POLLING=true` is required on macOS in restricted
# sandboxes / corporate networks where FSEvents can't open a stream
# (the auto-reload silently no-ops without it).
WATCHFILES_FORCE_POLLING=true uvicorn app.main:app --reload --port 8000
```

Then run the frontend (`npm run dev` from the repo root) and visit
<http://localhost:5173>. Password defaults to `demo` (case-insensitive).

## Project layout

```
backend/
├── pyproject.toml
├── .env.example
└── app/
    ├── main.py             # FastAPI entry, lifespan starts ingest pipeline
    ├── config.py           # All env-driven settings (no hardcoded model IDs)
    ├── logging_setup.py
    ├── api/
    │   ├── auth.py         # POST /login, /logout, GET /me
    │   ├── chat.py         # POST /chat (SSE)
    │   ├── ingest.py       # GET /ingest/status, POST /ingest
    │   ├── sources.py      # GET /sources/{file_id}
    │   └── health.py
    ├── auth/
    │   ├── security.py     # constant-time pwd compare + JWT
    │   └── deps.py         # get_session() dependency
    ├── db/                 # SQLAlchemy 2 async + Conversation/Message
    ├── ingest/
    │   ├── pipeline.py     # orchestrator (workers + queue)
    │   ├── watcher.py      # watchdog FS observer (debounced)
    │   ├── worker.py       # per-file end-to-end pipeline
    │   ├── chunker.py      # ~600-token chunks, 1-turn overlap for VTT
    │   ├── brief.py        # structured per-file brief (with version field)
    │   ├── embed.py        # SentenceTransformer multilingual embedder
    │   ├── store.py        # JSON-backed briefs/hashes/failures
    │   ├── status.py       # /ingest/status snapshot
    │   └── parsers/
    │       ├── vtt.py
    │       ├── pdf.py      # PyMuPDF + image-area / text-sparse heuristic
    │       └── vlm.py      # Anthropic vision describer (concurrency-capped)
    ├── rag/
    │   ├── index.py        # FAISS flat-IP indexes for briefs and chunks
    │   ├── router.py       # Brief router with confidence & candidate slicing
    │   ├── retriever.py    # router → file-level / chunk-fallback retriever
    │   └── prompts.py
    └── llm/client.py       # Anthropic sync/async factories (model from env)
```

## Tests

```bash
pip install -e ".[dev]"
pytest -q
```

The bundled tests cover password verification (case-insensitive), JWT
roundtrips, path-traversal protection on `/sources`, chunker behaviour, and
brief version extraction.

## Security notes

- API key never reaches the browser bundle (frontend talks to `/api/chat`,
  backend signs requests to Anthropic).
- Source endpoint canonicalises paths and enforces containment in `RAG_DOC_DIR`.
- Cookies are `HttpOnly`, `SameSite=Lax`. Set `COOKIE_SECURE=true` behind HTTPS.
- Generic 401 on auth failures (no enumeration leakage), constant-time
  password compare via `hmac.compare_digest`.
- Logging redacts `password`, `api_key`, `cookie`, etc. via a structlog
  processor.
