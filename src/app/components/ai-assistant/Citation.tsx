import { sourceUrl } from './api';
import type { CitationRef } from './types';

export function CitationChip({ citation }: { citation: CitationRef }) {
  const href = sourceUrl(citation.file_id);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-800 hover:border-sky-500 transition"
      title={citation.label}
    >
      <span className="font-mono text-[10px] text-sky-400">{citation.id}</span>
      <span className="truncate max-w-[260px]">{citation.label}</span>
    </a>
  );
}
