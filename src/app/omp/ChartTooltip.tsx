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
        // 2 px outer frame in the primary text token (#23282e). Applies to
        // both OMP usage and Event chart tooltips since they share this
        // component.
        border: '2px solid var(--color-text-primary)',
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
          // Rows without a marker (e.g. "Total CPU"/"Total memory" summary
          // rows below the divider) skip the marker spacer entirely so their
          // labels flush left, instead of indenting under the marker column.
          const hasMarker = row.marker != null;
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
              {hasMarker ? (
                <span
                  className="chart-tooltip__marker"
                  style={{
                    display: 'inline-flex',
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {row.marker}
                </span>
              ) : null}
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

// Each marker is a tiny SVG that mirrors the style of its corresponding line
// on the chart, so the legend / tooltip rows visually match what the user
// sees plotted: solid line + circle, solid line + triangle, dotted line, etc.
//
// Geometry: 20×10 viewBox keeps strokes crisp at the 16-px container width
// used by both <Legend> and <ChartTooltip>. CSS variables resolve at render
// time; for the PDF export pipeline they get inlined by serializeSvgWithInlineStyles.

export const Markers = {
  // Filled blue circle flanked by lighter blue dashed line segments on each side.
  blueLineDot: (
    <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden>
      <line x1="0" y1="5" x2="28" y2="5"
            stroke="var(--color-brand-blue)" strokeWidth="2.5"
            strokeOpacity="0.5"
            strokeDasharray="3 3" strokeLinecap="round" />
      <circle cx="14" cy="5" r="4" fill="var(--color-brand-blue)" />
    </svg>
  ),
  // Filled cyan downward-pointing triangle flanked by lighter dashed segments.
  cyanLineTriangle: (
    <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden>
      <line x1="0" y1="5" x2="28" y2="5"
            stroke="var(--color-brand-cyan)" strokeWidth="2.5"
            strokeOpacity="0.5"
            strokeDasharray="3 3" strokeLinecap="round" />
      <path d="M10 2 L18 2 L14 8.5 Z"
            fill="var(--color-brand-cyan)" strokeLinejoin="round" />
    </svg>
  ),
  // Purple dotted line — represents the CPU average series.
  purpleDottedLine: (
    <svg width="20" height="4" viewBox="0 0 20 4" aria-hidden>
      <line x1="0" y1="2" x2="20" y2="2"
            stroke="var(--color-brand-purple)" strokeWidth="2"
            strokeDasharray="2 2" strokeLinecap="round" />
    </svg>
  ),
  // Pink dotted line — represents the memory average series.
  pinkDottedLine: (
    <svg width="20" height="4" viewBox="0 0 20 4" aria-hidden>
      <line x1="0" y1="2" x2="20" y2="2"
            stroke="var(--color-brand-pink)" strokeWidth="2"
            strokeDasharray="2 2" strokeLinecap="round" />
    </svg>
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
