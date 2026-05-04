# Re-pointing this RAG infrastructure at another domain

The same pipeline (auto-ingest → brief → router → retrieve → cite) is the
intended starting point for a future *Design Reasoning Agent* over a corpus of
~50 design projects. To re-target the system you only need to change four
things; nothing in the API layer or the React shell needs to move.

## 1. `RAG_DOC_DIR`

Set `RAG_DOC_DIR` in `backend/.env` to the new corpus root. The watcher,
startup scan, and periodic rescan all key off this path.

## 2. Brief schema / prompt (`app/ingest/brief.py`)

Replace `_BRIEF_USER_TMPL` and the `_empty_brief` schema with the fields you
want to surface for the new domain. For Design Reasoning the natural fields are:

```json
{
  "file_id": "...",
  "filename": "...",
  "project_name": "...",
  "client": "...",
  "year": "...",
  "design_problem": "...",
  "principles": ["..."],
  "decisions": ["..."],
  "trade_offs": ["..."],
  "outcomes": ["..."]
}
```

The router (`app/rag/router.py`) imports brief fields generically — it doesn’t
care which keys exist as long as `file_id` is present.

## 3. Router prompt (`app/rag/prompts.py::ROUTER_SYSTEM_PROMPT`)

For Design Reasoning, switch from “find the meeting / spec” to “find the most
relevant prior design judgement”. The JSON schema for output stays identical so
the parser doesn’t need to change.

## 4. Answer prompt (`app/rag/prompts.py::ANSWER_SYSTEM_PROMPT`)

Update the persona. Today’s prompt is a strict, factual citation-following
assistant. For Design Reasoning, swap to a senior UX designer voice that
**reasons** from the cited projects rather than just quoting them.

## What you do **not** need to change

- Auth, session, DB, ingest pipeline, watcher, debounce, hash cache, FAISS
  indexing, embedding interface, citation rendering, SSE streaming, FAB UX.
- The `Embedder` is an interface — drop in `OpenAIEmbedder` / a remote
  embedding service by implementing `Embedder.encode()`.
- The `LLM` client is wrapped — you can swap to another provider by replacing
  `app/llm/client.py` and changing `Settings`.

## Pre-flight checklist

- [ ] New `.env` with `RAG_DOC_DIR`, model IDs, embedding model, password.
- [ ] Updated `_BRIEF_USER_TMPL` and brief skeleton.
- [ ] Updated router and answer prompts in `app/rag/prompts.py`.
- [ ] Wipe `data/` (FAISS, briefs, hashes) so the corpus is rebuilt on first run.
