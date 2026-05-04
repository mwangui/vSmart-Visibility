import { useCallback, useRef, useState } from 'react';
import { streamChat } from './api';
import type { ChatMessage, CitationRef } from './types';

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `m-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const aborter = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    aborter.current?.abort();
    setMessages([]);
    setConversationId(null);
    setStreaming(false);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const userMsg: ChatMessage = { id: uuid(), role: 'user', content: trimmed };
      const assistantId = uuid();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        citations: [],
        pending: true,
      };

      const nextMessages = [...messages, userMsg, assistantMsg];
      setMessages(nextMessages);
      setStreaming(true);

      const turns = nextMessages
        .filter((m) => m.id !== assistantId) // omit the in-progress assistant
        .map((m) => ({ role: m.role, content: m.content }));

      const ac = new AbortController();
      aborter.current = ac;

      let convoIdLocal: string | null = conversationId;

      try {
        await streamChat({
          conversationId,
          messages: turns,
          signal: ac.signal,
          callbacks: {
            onText: (delta) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + delta, pending: true }
                    : m,
                ),
              );
            },
            onCitation: (citation: CitationRef) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, citations: [...(m.citations ?? []), citation] }
                    : m,
                ),
              );
            },
            onDone: (id) => {
              convoIdLocal = id || convoIdLocal;
            },
            onError: (msg) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content || msg, pending: false }
                    : m,
                ),
              );
            },
          },
        });
      } catch (e) {
        if ((e as DOMException).name === 'AbortError') return;
      } finally {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, pending: false } : m)),
        );
        if (convoIdLocal) setConversationId(convoIdLocal);
        setStreaming(false);
      }
    },
    [conversationId, messages, streaming],
  );

  const stop = useCallback(() => {
    aborter.current?.abort();
    setStreaming(false);
  }, []);

  return { messages, streaming, send, reset, stop, conversationId };
}
