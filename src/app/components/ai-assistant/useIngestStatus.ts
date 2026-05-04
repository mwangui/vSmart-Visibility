import { useEffect, useRef, useState } from 'react';
import { fetchIngestStatus } from './api';
import type { IngestStatusSnapshot } from './types';

export function useIngestStatus(open: boolean, intervalMs = 5000) {
  const [status, setStatus] = useState<IngestStatusSnapshot | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      if (timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
      return;
    }
    let cancelled = false;
    const ac = new AbortController();
    const tick = async () => {
      try {
        const s = await fetchIngestStatus(ac.signal);
        if (!cancelled) setStatus(s);
      } catch {
        // swallow — status footer is best-effort
      }
    };
    void tick();
    timer.current = window.setInterval(tick, intervalMs);
    return () => {
      cancelled = true;
      ac.abort();
      if (timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [open, intervalMs]);

  return status;
}
