/**
 * Visual chrome shared by Zone A (OMP usage) and Zone B (Event) charts.
 * Keeps the per-chart files focused on data + interaction logic.
 */

import type { ReactNode } from 'react';

interface ChartCardProps { children: ReactNode; }

export function ChartCard({ children }: ChartCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

interface ChartHeaderProps {
  title: string;
  /** Optional right-aligned status label (e.g. "Selected period: …"). */
  rightLabel?: ReactNode;
  onExport?: () => void;
}

export function ChartHeader({ title, rightLabel, onExport }: ChartHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '1 1 auto' }}>
        <h3
          style={{
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 700,
            fontSize: 18,
            lineHeight: '24px',
            margin: 0,
            color: 'var(--color-text-heading)',
          }}
        >
          {title}
        </h3>
      </div>

      {rightLabel ? (
        <div
          style={{
            fontSize: 12,
            lineHeight: '18px',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}
        >
          {rightLabel}
        </div>
      ) : null}

      {onExport ? (
        <button
          type="button"
          onClick={onExport}
          aria-label={`Export ${title}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 6,
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-link)',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: '18px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M7 1v8m0 0L4 6m3 3 3-3M2 11h10v2H2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
      ) : null}
    </div>
  );
}

interface LegendItem { marker: ReactNode; label: string; }

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 16px',
        width: '100%',
      }}
    >
      {items.map(item => (
        <div
          key={item.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'var(--color-text-primary)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              width: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.marker}
          </span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
