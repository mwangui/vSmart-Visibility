/**
 * Shared formatting + CSV helpers for OMP Statistics.
 * All date strings derive from `state.baseDate` — never the literal Feb 16, 2025.
 */

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }

/** "May 02, 2026" */
export function formatDateLabel(date: Date): string {
  return `${MONTH_SHORT[date.getMonth()]} ${pad2(date.getDate())}, ${date.getFullYear()}`;
}

/** "May 02, 05:00:00" — used in chart tooltip subtitle. */
export function formatTooltipSubtitle(date: Date, hour: string): string {
  return `${MONTH_SHORT[date.getMonth()]} ${pad2(date.getDate())}, ${hour}:00`;
}

/** "12-hour range: May 02, 2026 00:00 – 12:00" */
export function format12HourRange(date: Date): string {
  return `12-hour range: ${formatDateLabel(date)} 00:00 – 12:00`;
}

/**
 * "Selected period: May 02, 2026 05:00 – 06:00" — wraps an hour like '05:00'
 * and renders the closing hour `HH+1:00`.
 */
export function formatSelectedPeriod(date: Date, hour: string): string {
  const h = parseInt(hour.slice(0, 2), 10);
  const next = pad2((h + 1) % 24);
  return `Selected period: ${formatDateLabel(date)} ${hour} – ${next}:00`;
}

// -----------------------------------------------------------------------------
// CSV export
// -----------------------------------------------------------------------------

function csvEscape(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function rowsToCsv<T extends Record<string, unknown>>(
  headers: Array<{ key: keyof T; label: string }>,
  rows: T[],
): string {
  const head = headers.map(h => csvEscape(h.label)).join(',');
  const body = rows
    .map(r => headers.map(h => csvEscape(r[h.key])).join(','))
    .join('\n');
  return `${head}\n${body}\n`;
}

export function downloadCsv(filename: string, csv: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Allow the browser a tick to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
