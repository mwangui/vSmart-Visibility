/**
 * Shared formatting + CSV helpers for OMP Statistics.
 * All date strings derive from `state.baseDate` — never a hardcoded literal.
 *
 * The page operates on a rolling 24-hour window ending at `baseDate`'s
 * floored hour, so date formatters that take an `hour` string consult
 * `resolveHourDate` to figure out whether that label belongs to today or
 * yesterday (e.g. when baseDate is 18:30 the label '19:00' is yesterday).
 */

import { resolveHourDate } from './data';

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }

/** "May 02, 2026" */
export function formatDateLabel(date: Date): string {
  return `${MONTH_SHORT[date.getMonth()]} ${pad2(date.getDate())}, ${date.getFullYear()}`;
}

/** "May 02, 05:00" — used in chart tooltip subtitle. */
export function formatTooltipSubtitle(baseDate: Date, hour: string): string {
  const d = resolveHourDate(baseDate, hour);
  return `${MONTH_SHORT[d.getMonth()]} ${pad2(d.getDate())}, ${hour}`;
}

/**
 * "24-hour range: May 16, 2026 19:00 – May 17, 2026 18:00" — rolling window
 * ending at `baseDate`'s floored hour. Collapses to a same-day form when the
 * window does not cross midnight: "24-hour range: May 17, 2026 00:00 – 23:00".
 */
export function format24HourRange(baseDate: Date, rangeHours = 24): string {
  const end = floorToHour(baseDate);
  const minuteStep = getMinuteBucketStep(rangeHours);
  if (minuteStep) {
    const start = new Date(end);
    start.setHours(end.getHours() - (rangeHours - 1), 0, 0, 0);
    const endBucket = new Date(end);
    endBucket.setMinutes(60 - minuteStep, 0, 0);
    const startLabel = `${pad2(start.getHours())}:00`;
    const endLabel = `${pad2(endBucket.getHours())}:${pad2(endBucket.getMinutes())}`;
    const rangeLabel = `${rangeHours}-hour range`;
    const sameDay =
      start.getFullYear() === endBucket.getFullYear() &&
      start.getMonth()    === endBucket.getMonth() &&
      start.getDate()     === endBucket.getDate();
    if (sameDay) {
      return `${rangeLabel}: ${formatDateLabel(start)} ${startLabel} – ${endLabel}`;
    }
    return `${rangeLabel}: ${formatDateLabel(start)} ${startLabel} – ${formatDateLabel(endBucket)} ${endLabel}`;
  }

  const start = new Date(end.getTime() - (rangeHours - 1) * 60 * 60 * 1000);
  const startLabel = `${pad2(start.getHours())}:00`;
  const endLabel   = `${pad2(end.getHours())}:00`;
  const rangeLabel = `${rangeHours}-hour range`;
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth()    === end.getMonth() &&
    start.getDate()     === end.getDate();
  if (sameDay) {
    return `${rangeLabel}: ${formatDateLabel(start)} ${startLabel} – ${endLabel}`;
  }
  return `${rangeLabel}: ${formatDateLabel(start)} ${startLabel} – ${formatDateLabel(end)} ${endLabel}`;
}

/**
 * "Selected period: May 02, 2026 05:00 – 06:00" — wraps an hour like '05:00'
 * and renders the closing hour `HH+1:00`. The calendar date is resolved
 * against the rolling 24h window so labels belonging to yesterday show the
 * correct date.
 */
export function formatSelectedPeriod(baseDate: Date, hour: string, rangeHours = 24): string {
  const d = resolveHourDate(baseDate, hour);
  const h = parseInt(hour.slice(0, 2), 10);
  const m = parseInt(hour.slice(3, 5), 10) || 0;

  const minuteStep = getMinuteBucketStep(rangeHours);
  if (minuteStep) {
    const end = new Date(d.getTime() + minuteStep * 60 * 1000);
    return `Selected period: ${formatDateLabel(d)} ${hour} – ${pad2(end.getHours())}:${pad2(end.getMinutes())}`;
  }

  const next = pad2((h + 1) % 24);
  return `Selected period: ${formatDateLabel(d)} ${pad2(h)}:${pad2(m)} – ${next}:00`;
}

function floorToHour(date: Date): Date {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}

function getMinuteBucketStep(rangeHours: number): number | null {
  if (rangeHours === 1) return 2;
  if (rangeHours === 3) return 1;
  if (rangeHours === 6) return 2;
  return null;
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
