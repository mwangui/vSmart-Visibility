"""FastAPI entry point for vSmart Visibility AI Assistant."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth as auth_api
from app.api import chat as chat_api
from app.api import health as health_api
from app.api import ingest as ingest_api
from app.api import sources as sources_api
from app.config import settings
from app.db.session import init_db
from app.ingest.pipeline import IngestPipeline
from app.logging_setup import configure_logging, get_logger


configure_logging(settings.LOG_LEVEL)
log = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    log.info("db.init.done", url=settings.DATABASE_URL)

    pipeline = IngestPipeline()
    app.state.ingest = pipeline
    await pipeline.start()
    log.info(
        "ingest.start",
        rag_doc_dir=str(settings.rag_doc_path),
        rag_doc_exists=settings.rag_doc_path.exists(),
    )

    try:
        yield
    finally:
        await pipeline.stop()
        log.info("ingest.stop")


app = FastAPI(
    title="vSmart Visibility AI Assistant",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=86400,
)

app.include_router(health_api.router, prefix="/api")
app.include_router(auth_api.router, prefix="/api")
app.include_router(chat_api.router, prefix="/api")
app.include_router(ingest_api.router, prefix="/api")
app.include_router(sources_api.router, prefix="/api")
