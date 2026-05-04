import type { IngestStatusSnapshot } from './types';

export function IngestStatusFooter({ status }: { status: IngestStatusSnapshot | null }) {
  if (!status) {
    return (
      <div className="px-3 py-2 text-[11px] text-slate-500 border-t border-slate-800">
        Loading status…
      </div>
    );
  }
  const indexing = status.processing.length + status.queued.length;
  const failed = status.failed.length;
  const showWarn = indexing > 0;
  return (
    <div className="px-3 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex items-center gap-3">
      <span>
        <strong className="text-slate-200">{status.indexed}</strong> docs indexed
      </span>
      {indexing > 0 ? (
        <span className="text-amber-400">{indexing} indexing…</span>
      ) : null}
      {failed > 0 ? (
        <span className="text-rose-400" title={status.failed.map((f) => `${f.file}: ${f.reason}`).join('\n')}>
          {failed} failed
        </span>
      ) : null}
      {showWarn ? (
        <span className="text-slate-500 ml-auto truncate">
          Some docs are still indexing — answers may not include them yet.
        </span>
      ) : null}
    </div>
  );
}
