import type { CitationRef, IngestStatusSnapshot } from './types';

export interface ChatStreamCallbacks {
  onText: (delta: string) => void;
  onCitation: (citation: CitationRef) => void;
  onDone: (conversationId: string) => void;
  onError: (message: string) => void;
}

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * POST /api/chat with credentials. Reads SSE manually so we can keep the
 * cookie-authed fetch client (EventSource doesn't support credentials in the
 * same way and adds CORS quirks).
 */
export async function streamChat(args: {
  conversationId: string | null;
  messages: ChatTurn[];
  signal: AbortSignal;
  callbacks: ChatStreamCallbacks;
}): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({
      conversation_id: args.conversationId,
      messages: args.messages,
    }),
    signal: args.signal,
  });

  if (!res.ok || !res.body) {
    args.callbacks.onError(`Chat failed (${res.status})`);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\n\n/);
    buffer = events.pop() ?? '';
    for (const evt of events) {
      const dataLine = evt.split('\n').find((l) => l.startsWith('data:'));
      if (!dataLine) continue;
      const json = dataLine.slice(5).trim();
      if (!json) continue;
      try {
        const parsed = JSON.parse(json);
        switch (parsed.type) {
          case 'text':
            args.callbacks.onText(parsed.content ?? '');
            break;
          case 'citation':
            args.callbacks.onCitation(parsed.citation as CitationRef);
            break;
          case 'done':
            args.callbacks.onDone(parsed.conversation_id ?? '');
            break;
          case 'error':
            args.callbacks.onError(parsed.message ?? 'error');
            break;
        }
      } catch {
        // ignore malformed event
      }
    }
  }
}

export async function fetchIngestStatus(signal?: AbortSignal): Promise<IngestStatusSnapshot> {
  const res = await fetch('/api/ingest/status', {
    method: 'GET',
    credentials: 'include',
    signal,
  });
  if (!res.ok) throw new Error(`ingest/status failed (${res.status})`);
  return (await res.json()) as IngestStatusSnapshot;
}

export function sourceUrl(fileId: string): string {
  return `/api/sources/${encodeURIComponent(fileId)}`;
}
