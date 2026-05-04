"""Embedding interface (Plan §10).

Designed to be swappable: the rest of the pipeline only depends on Embedder.
Default implementation uses sentence-transformers with a multilingual model.
"""

from __future__ import annotations

import asyncio
from abc import ABC, abstractmethod
from functools import lru_cache

import numpy as np

from app.config import settings
from app.logging_setup import get_logger


log = get_logger("embed")


class Embedder(ABC):
    @property
    @abstractmethod
    def dim(self) -> int: ...

    @abstractmethod
    def encode(self, texts: list[str]) -> np.ndarray: ...

    async def encode_async(self, texts: list[str]) -> np.ndarray:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.encode, texts)


class SentenceTransformerEmbedder(Embedder):
    """Lazy load to avoid penalising backend startup before first ingest."""

    def __init__(self, model_name: str | None = None, device: str | None = None) -> None:
        self.model_name = model_name or settings.EMBEDDING_MODEL
        self.device = device or settings.EMBEDDING_DEVICE
        self._model = None

    def _ensure_model(self):
        if self._model is None:
            from sentence_transformers import SentenceTransformer  # heavy import

            log.info("embed.load", model=self.model_name, device=self.device)
            self._model = SentenceTransformer(self.model_name, device=self.device)
        return self._model

    @property
    def dim(self) -> int:
        return int(self._ensure_model().get_sentence_embedding_dimension())

    def encode(self, texts: list[str]) -> np.ndarray:
        if not texts:
            return np.zeros((0, self.dim), dtype="float32")
        model = self._ensure_model()
        vecs = model.encode(
            texts,
            batch_size=16,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=False,
        )
        return np.asarray(vecs, dtype="float32")


@lru_cache
def get_embedder() -> Embedder:
    return SentenceTransformerEmbedder()
