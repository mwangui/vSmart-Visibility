import { CitationChip } from './Citation';
import type { ChatMessage } from './types';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}
      data-role={message.role}
    >
      <div
        className={
          isUser
            ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-sky-500 text-white px-3.5 py-2 text-sm whitespace-pre-wrap'
            : 'max-w-[88%] rounded-2xl rounded-bl-sm bg-slate-800 text-slate-100 px-3.5 py-2 text-sm whitespace-pre-wrap border border-slate-700'
        }
      >
        {message.content || (message.pending ? <TypingDots /> : '')}
        {!isUser && message.citations && message.citations.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.citations.map((c) => (
              <CitationChip key={c.id + c.file_id} citation={c} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center" aria-label="loading">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:120ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:240ms]" />
    </span>
  );
}
