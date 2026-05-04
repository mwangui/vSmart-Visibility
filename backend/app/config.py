"""Centralised configuration loaded from .env.

Per construction plan v2.1 §9 / §14: model IDs and paths are NEVER hardcoded.
Everything goes through this Settings object.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT = BACKEND_DIR.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Auth ────────────────────────────────────────────────────────────────────
    APP_PASSWORD: str = "demo"
    APP_PASSWORD_CASE_INSENSITIVE: bool = True
    # When True, the password gate is bypassed: every incoming request is
    # auto-issued a session cookie if it doesn't already have one, and the
    # frontend skips the login screen. Conversation isolation per browser is
    # preserved (each first request gets a fresh session_id). Flip back to
    # False to restore the single-shared-password gate.
    DISABLE_AUTH: bool = True
    JWT_SECRET_KEY: str = Field(
        default="change-me-to-a-random-string-at-least-32-bytes",
        min_length=16,
    )
    JWT_EXPIRE_DAYS: int = 7
    JWT_ALGORITHM: str = "HS256"
    COOKIE_NAME: str = "vsmart_session"
    COOKIE_SECURE: bool = False
    COOKIE_SAMESITE: str = "lax"

    # Anthropic ───────────────────────────────────────────────────────────────
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_CHAT_MODEL: str = ""
    ANTHROPIC_ROUTER_MODEL: str = ""
    ANTHROPIC_VISION_MODEL: str = ""
    ANTHROPIC_BRIEF_MODEL: str = ""
    ANTHROPIC_MAX_TOKENS: int = 4096

    # RAG ─────────────────────────────────────────────────────────────────────
    RAG_DOC_DIR: str = "../RAG-Doc"
    ROUTER_CONFIDENCE_THRESHOLD: float = 0.5
    ROUTER_MAX_FILES: int = 5
    ROUTER_CANDIDATE_BRIEFS: int = 30
    CHUNK_FALLBACK_TOP_K: int = 12
    CONVERSATION_CONTEXT_TURNS: int = 6

    # Embeddings ──────────────────────────────────────────────────────────────
    EMBEDDING_MODEL: str = "BAAI/bge-m3"
    EMBEDDING_DEVICE: str = "cpu"

    # Ingest ──────────────────────────────────────────────────────────────────
    INGEST_CONCURRENCY: int = 2
    INGEST_DEBOUNCE_MS: int = 2000
    INGEST_RESCAN_INTERVAL_S: int = 300
    INGEST_WATCH_RECURSIVE: bool = False
    VLM_IMAGE_AREA_THRESHOLD: float = 0.30
    VLM_TEXT_WORD_THRESHOLD: int = 100
    VLM_CONCURRENCY: int = 2

    # DB ──────────────────────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite+aiosqlite:///./data/app.sqlite"

    # Server / CORS ───────────────────────────────────────────────────────────
    APP_HOST: str = "127.0.0.1"
    APP_PORT: int = 8000
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    LOG_LEVEL: str = "INFO"

    @field_validator("COOKIE_SAMESITE")
    @classmethod
    def _validate_samesite(cls, v: str) -> str:
        v = v.lower()
        if v not in {"lax", "strict", "none"}:
            raise ValueError("COOKIE_SAMESITE must be lax|strict|none")
        return v

    # ── Derived helpers ──────────────────────────────────────────────────────
    @property
    def rag_doc_path(self) -> Path:
        p = Path(self.RAG_DOC_DIR)
        if not p.is_absolute():
            p = (BACKEND_DIR / p).resolve()
        return p

    @property
    def data_dir(self) -> Path:
        return BACKEND_DIR / "data"

    @property
    def corpus_dir(self) -> Path:
        return self.data_dir / "corpus"

    @property
    def chunks_dir(self) -> Path:
        return self.data_dir / "chunks"

    @property
    def vector_dir(self) -> Path:
        return self.data_dir / "vector"

    @property
    def vlm_cache_dir(self) -> Path:
        return self.data_dir / "vlm_cache"

    @property
    def briefs_path(self) -> Path:
        return self.data_dir / "briefs.json"

    @property
    def file_hashes_path(self) -> Path:
        return self.data_dir / "file_hashes.json"

    @property
    def failures_path(self) -> Path:
        return self.data_dir / "failures.json"

    @property
    def brief_index_path(self) -> Path:
        return self.data_dir / "brief_index.faiss"

    @property
    def chunk_index_path(self) -> Path:
        return self.data_dir / "chunk_index.faiss"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    def ensure_dirs(self) -> None:
        for p in (
            self.data_dir,
            self.corpus_dir,
            self.chunks_dir,
            self.vector_dir,
            self.vlm_cache_dir,
        ):
            p.mkdir(parents=True, exist_ok=True)


@lru_cache
def get_settings() -> Settings:
    s = Settings()
    s.ensure_dirs()
    return s


settings = get_settings()
