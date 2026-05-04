import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Sparkles, X, RefreshCw } from 'lucide-react';
import { MessageBubble } from './Message';
import { IngestStatusFooter } from './IngestStatusFooter';
import { useChat } from './useChat';
import { useIngestStatus } from './useIngestStatus';

const SUGGESTIONS = [
  'What was decided about OMP statistics?',
  'Summarize the latest meeting.',
  'What did the team say about routes and peers?',
];

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, streaming, send, reset, stop } = useChat();
  const status = useIngestStatus(true);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const submit = () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');
    void send(text);
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[640px] max-h-[calc(100vh-7rem)] rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur shadow-2xl flex flex-col text-slate-100"
      role="dialog"
      aria-label="vSmart AI Assistant"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
        <Sparkles className="w-4 h-4 text-sky-400" />
        <div className="flex-1">
          <div className="text-sm font-semibold">vSmart Assistant</div>
          <div className="text-[11px] text-slate-400">
            Internal demo · grounded on RAG-Doc
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
          title="New chat"
          aria-label="New chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
          title="Close (Esc)"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2">
        {messages.length === 0 ? (
          <EmptyState
            onPick={(q) => {
              setInput(q);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
          />
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={2}
            placeholder="Ask about meetings, vSmart, or RAG-Doc…"
            className="flex-1 resize-none rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40"
            maxLength={4000}
          />
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-md bg-rose-500 hover:bg-rose-400 px-3.5 py-2 text-sm font-medium text-white"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!input.trim()}
              className="rounded-md bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed px-3.5 py-2 text-sm font-medium text-white"
            >
              Send
            </button>
          )}
        </div>
      </div>

      <IngestStatusFooter status={status} />
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="px-2 py-6 text-sm">
      <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-4">
        <p className="text-slate-300">
          Ask questions about meetings, vSmart visibility, OMP statistics, or
          documents in <code className="text-sky-300">RAG-Doc</code>.
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="text-left rounded-md border border-slate-800 bg-slate-900/40 hover:bg-slate-900 px-3 py-2 text-slate-300 text-[13px]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
