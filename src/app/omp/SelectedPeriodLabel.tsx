/**
 * Right-aligned status label that flips between
 *   "12-hour range: May 02, 2026 00:00 – 12:00"   (no bar selected)
 *   "Selected period: May 02, 2026 05:00 – 06:00" (bar selected)
 *
 * Date string MUST come from state.baseDate (today's date), never the
 * forbidden Feb 16, 2025 literal.
 */

import { useOmp } from './state';
import { format12HourRange, formatSelectedPeriod } from './utils';

export function SelectedPeriodLabel() {
  const { state, dispatch } = useOmp();
  const isSelected = !!state.selectedHour;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        lineHeight: '18px',
        fontWeight: 600,
        color: isSelected
          ? 'var(--color-text-link)'
          : 'var(--color-text-secondary)',
      }}
      aria-live="polite"
    >
      {isSelected
        ? formatSelectedPeriod(state.baseDate, state.selectedHour as string)
        : format12HourRange(state.baseDate)}

      {isSelected ? (
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_SELECTED_HOUR', hour: null })}
          aria-label="Clear selected period"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16, height: 16,
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-link)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
