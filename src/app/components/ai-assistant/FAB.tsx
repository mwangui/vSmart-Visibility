import { Sparkles } from 'lucide-react';

export function FAB({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open AI Assistant"
      title="Ask AI · Cmd+/"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center justify-center rounded-full w-14 h-14 bg-sky-500 hover:bg-sky-400 shadow-2xl shadow-sky-500/30 ring-1 ring-sky-300/50 text-white transition active:scale-95"
    >
      <Sparkles className="w-6 h-6" />
    </button>
  );
}
