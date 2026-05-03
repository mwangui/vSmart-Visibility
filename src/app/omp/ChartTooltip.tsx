/**
 * Reusable chart tooltip — used by both Zone A (OMP Usage) and Zone B (Event)
 * hover handlers. Implements §11 "Tooltip 規格":
 *   - white bg, 1px gray border, 6–8px radius, subtle shadow, ~16px padding
 *   - title bold; values right-aligned bold
 *   - z-index above chart
 *   - pointer-events: none (cannot block underlying mouse moves)
 *   - edge-flip when right side overflows the host container (§13 №16/17)
 *
 * The tooltip is rendered as an absolutely-positioned child of the host SVG
 * container; consumers pass the mouse position relative to that host.
 */

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

export interface TooltipRow {
  /** Marker swatch — `null` = no swatch (e.g. dotted average rows). */
  marker?: ReactNode | null;
  label: string;
  value: ReactNode;
}

export interface ChartTooltipProps {
  /** Mouse X relative to host container in px (for placement). */
  x: number;
  /** Mouse Y relative to host container in px (for placement). */
  y: number;
  /** Width of host container; used for edge-flip detection. */
  hostWidth: number;
  /** Height of host container; used for vertical clamp. */
  hostHeight: number;
  title: string;
  subtitle?: string;
  rows: Array<TooltipRow | { divider: true }>;
  /** Optional minWidth override; defaults to 200. */
  minWidth?: number;
}

const OFFSET = 12; // px gap between cursor and tooltip box

export function ChartTooltip({
  x, y, hostWidth, hostHeight,
  title, subtitle, rows, minWidth = 200,
}: ChartTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.width !== size.w || rect.height !== size.h) {
      setSize({ w: rect.width, h: rect.height });
    }
  });

  // Default placement: top-right of cursor. Flip horizontally if it'd overflow
  // host on the right; clamp vertically inside host.
  const wantsRight = x + OFFSET + size.w <= hostWidth;
  const left = wantsRight
    ? x + OFFSET
    : Math.max(0, x - OFFSET - size.w);

  const top = Math.min(
    Math.max(0, y - size.h - OFFSET),
    Math.max(0, hostHeight - size.h - 4),
  );

  return (
    <div
      ref={ref}
      role="tooltip"
      style={{
        position: 'absolute',
        left,
        top,
        minWidth,
        zIndex: 'var(--z-index-tooltip, 300)' as unknown as number,
        pointerEvents: 'none',
        background: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: 16,
        fontFamily: 'var(--font-family-primary)',
        color: 'var(--color-text-primary)',
      }}
      className="chart-tooltip"
    >
      <div
        className="chart-tooltip__title"
        style={{
          fontWeight: 700,
          fontSize: 14,
          lineHeight: '20px',
          color: 'var(--color-text-heading)',
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          className="chart-tooltip__subtitle"
          style={{
            fontSize: 12,
            lineHeight: '18px',
            color: 'var(--color-text-secondary)',
            marginTop: 2,
            marginBottom: 8,
          }}
        >
          {subtitle}
        </div>
      ) : (
        <div style={{ height: 8 }} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map((row, i) => {
          if ('divider' in row) {
            return (
              <div
                key={`d-${i}`}
                style={{
                  borderTop: '1px solid var(--color-border-primary)',
                  margin: '4px 0',
                }}
              />
            );
          }
          return (
            <div
              key={`r-${i}-${row.label}`}
              className="chart-tooltip__row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                lineHeight: '18px',
              }}
            >
              <span
                className="chart-tooltip__marker"
                style={{
                  display: 'inline-flex',
                  width: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {row.marker ?? null}
              </span>
              <span style={{ flex: '1 1 auto', color: 'var(--color-text-primary)' }}>
                {row.label}
              </span>
              <span
                className="chart-tooltip__value"
                style={{
                  fontWeight: 700,
                  color: 'var(--color-text-heading)',
                  marginLeft: 12,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Marker presets — shared by OMP usage tooltip rows.
// -----------------------------------------------------------------------------

export const Markers = {
  blueLineDot: (
    <span
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: 12,
        border: '2px solid var(--color-brand-blue)',
        background: 'var(--color-bg-primary)',
      }}
    />
  ),
  cyanLineTriangle: (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M6 1.5 L11 10.5 L1 10.5 Z"
            fill="var(--color-bg-primary)"
            stroke="var(--color-brand-cyan)" strokeWidth="2" />
    </svg>
  ),
  purpleDot: (
    <span
      style={{
        display: 'inline-block',
        width: 8, height: 8, borderRadius: 8,
        background: 'var(--color-brand-purple)',
      }}
    />
  ),
  pinkDot: (
    <span
      style={{
        display: 'inline-block',
        width: 8, height: 8, borderRadius: 8,
        background: 'var(--color-brand-pink)',
      }}
    />
  ),
  swatch: (color: string) => (
    <span
      style={{
        display: 'inline-block',
        width: 12, height: 12, borderRadius: 2,
        background: color,
      }}
    />
  ),
};
