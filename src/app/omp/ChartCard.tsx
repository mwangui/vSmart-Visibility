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
        <ExportLinkButton onClick={onExport} ariaLabel={`Export ${title}`} />
      ) : null}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Shared link-style action buttons (Export / Refresh)
//
// Per latest design: borderless, blue text, icon-left. Used by ChartHeader
// (top-right of OMP usage + Event charts) and by FilterBar (Refresh + Export
// next to the period label).
// ──────────────────────────────────────────────────────────────────────────

const linkButtonBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 6px',
  border: 'none',
  background: 'transparent',
  color: 'var(--color-text-link)',
  fontSize: 12,
  fontWeight: 700,
  lineHeight: '18px',
  cursor: 'pointer',
  borderRadius: 4,
} as const;

const linkButtonHoverClass = 'omp-link-btn';

interface ExportLinkButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export function ExportLinkButton({ onClick, ariaLabel }: ExportLinkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? 'Export'}
      className={linkButtonHoverClass}
      style={linkButtonBase}
    >
      <ExportIcon />
      Export
    </button>
  );
}

interface RefreshLinkButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

/**
 * Per design spec: the Refresh button is *always* enabled. It clears any
 * Event-chart time selection, returning the table to its default state, and
 * provides the user with a manual "reload" affordance. There is intentionally
 * no `disabled` prop — adding one would violate the design contract.
 */
export function RefreshLinkButton({ onClick, ariaLabel }: RefreshLinkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? 'Refresh'}
      className={linkButtonHoverClass}
      style={linkButtonBase}
    >
      <RefreshIcon />
      Refresh
    </button>
  );
}

function ExportIcon() {
  // Upload icon: vertical arrow pointing UP, open-top U-shaped tray
  // beneath. Matches the Export-button comp.
  //   M7 8V2          → shaft (7,8) to (7,2)
  //   M3 5L7 2 11 5   → V-shaped arrowhead at the top, opening downward
  //   M2 10v2h10v-2   → tray: down 2, right 10, up 2 (open-top "[_]")
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M7 8V2M3 5L7 2 11 5M2 10v2h10v-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  // Refresh icon — two clockwise arcs that are visibly SEPARATE
  // (clear gap on both the left and the right side, matching the
  // design comp). Each arc ends in a chevron arrowhead.
  //
  //  Top arc :  (3,5) ──┐ via top ┌── (11,5)   ← arrowhead
  //                                                 ↓ gap (4px)
  //  Bottom  : ◄─ (3,9) ┘ via bot └── (11,9)
  //               ↑ arrowhead
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      {/* Top arc: upper-left to upper-right via the top (clockwise) */}
      <path
        d="M3 5 A 5 5 0 0 1 11 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top chevron — tip at (11,5), points down-right */}
      <path
        d="M9 3 L 11 5 L 11 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom arc: lower-right to lower-left via the bottom (clockwise) */}
      <path
        d="M11 9 A 5 5 0 0 1 3 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom chevron — tip at (3,9), points up-left */}
      <path
        d="M5 11 L 3 9 L 3 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
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
