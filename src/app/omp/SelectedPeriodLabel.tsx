/**
 * Right-aligned status label that flips between
 *   "12-hour range: May 02, 2026 00:00 – 12:00"   (no bar selected)
 *   "Selected period: May 02, 2026 05:00 – 06:00" (bar selected)
 *
 * Per design: this is plain black, non-interactive informational text. It
 * is NOT a link, NOT a chip, NOT a clickable filter; clearing the time
 * selection happens exclusively through the Refresh button.
 *
 * Date string MUST come from state.baseDate (today's date), never the
 * forbidden Feb 16, 2025 literal.
 */

import { useOmp } from './state';
import { format12HourRange, formatSelectedPeriod } from './utils';

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
        fontWeight: 600,
        color: 'var(--color-text-primary, #111827)',
        cursor: 'default',
        userSelect: 'text',
      }}
      aria-live="polite"
    >
      {isSelected
        ? formatSelectedPeriod(state.baseDate, state.selectedHour as string)
        : format12HourRange(state.baseDate)}
    </span>
  );
}
