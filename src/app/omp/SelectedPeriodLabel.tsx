/**
 * Right-aligned status label that flips between
 *   "24-hour range: May 16, 2026 19:00 – May 17, 2026 18:00" (no bar selected)
 *   "Selected period: May 17, 2026 05:00 – 06:00"             (bar selected)
 *
 * Per design: secondary-text colour (#596069) at regular weight — visually
 * subordinate to the chart titles, non-interactive informational text. It
 * is NOT a link, NOT a chip, NOT a clickable filter; clearing the time
 * selection happens exclusively through the Refresh button.
 *
 * Date string MUST come from state.baseDate (today's local time) — the page
 * now operates on a rolling 24-hour window so the calendar date in the
 * label is derived from that anchor, never a hardcoded literal.
 */

import { useOmp } from './state';
import { format24HourRange, formatSelectedPeriod } from './utils';

export function SelectedPeriodLabel() {
  const { state } = useOmp();
  const isSelected = !!state.selectedHour;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 12,
        lineHeight: '18px',
        fontWeight: 400,
        color: 'var(--color-text-secondary)',
        cursor: 'default',
        userSelect: 'text',
      }}
      aria-live="polite"
    >
      {isSelected
        ? formatSelectedPeriod(state.baseDate, state.selectedHour as string)
        : format24HourRange(state.baseDate)}
    </span>
  );
}
