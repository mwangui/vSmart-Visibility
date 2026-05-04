/**
 * Zone B — Event stacked bar chart (§4 Flow B+C, §5.3, §8.2-8.3).
 *
 * Stack order from top → bottom matches the static Figma export:
 *   purple = Policy change
 *   cyan   = OMP peer state change
 *   blue   = Control connection state change
 *
 * Behaviour:
 *   - Hover any bar → tooltip with all 3 event-type counts
 *   - Click bar → state.selectedHour = hour (toggle); table + Zone A highlight band react
 *   - Selected bar segments are darkened; selected x-axis label bolded
 */

import {
  useEffect, useRef, useState, useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { HOURS, eventSummaryByHour, type Hour } from './data';
import { useOmp } from './state';
import { ChartTooltip, Markers } from './ChartTooltip';
import { formatTooltipSubtitle } from './utils';
import { ChartCard, ChartHeader, Legend } from './ChartCard';

const PADDING = { top: 16, right: 24, bottom: 36, left: 44 };
const HEIGHT  = 220;

/** Stack rendering order from top of bar to bottom (visually). */
const STACK_ORDER = [
  { key: 'policyChange',                 label: 'Policy change',                  color: 'var(--color-brand-purple)' },
  { key: 'ompPeerStateChange',           label: 'OMP peer state change',          color: 'var(--color-brand-cyan)' },
  { key: 'controlConnectionStateChange', label: 'Control connection state change', color: 'var(--color-brand-blue)' },
] as const;

interface HoverInfo {
  hour: Hour;
  mouseX: number;
  mouseY: number;
}

export function EventBarChart() {
  const { state, dispatch } = useOmp();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1180);
  const [hover, setHover] = useState<HoverInfo | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const innerW = width - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;
  const slotW  = innerW / HOURS.length;
  const barW   = Math.max(12, slotW * 0.55);

  const yMax = Math.max(
    50,
    Math.ceil(
      Math.max(
        ...eventSummaryByHour.map(d =>
          d.controlConnectionStateChange + d.ompPeerStateChange + d.policyChange,
        ),
      ) / 10,
    ) * 10 + 10,
  );

  const yFor = useCallback(
    (v: number) => PADDING.top + (1 - v / yMax) * innerH,
    [innerH, yMax],
  );
  const slotCenterX = useCallback(
    (i: number) => PADDING.left + slotW * (i + 0.5),
    [slotW],
  );

  const handleMouseMove = (ev: ReactMouseEvent<HTMLDivElement>) => {
    const host = ref.current?.getBoundingClientRect();
    if (!host) return;
    const mouseX = ev.clientX - host.left;
    const mouseY = ev.clientY - host.top;

    const rel = (mouseX - PADDING.left) / slotW;
    const idx = Math.floor(rel);
    if (idx < 0 || idx >= HOURS.length) {
      setHover(null);
      return;
    }
    setHover({ hour: HOURS[idx], mouseX, mouseY });
  };

  const handleMouseLeave = () => setHover(null);

  const handleBarClick = (hour: Hour) => {
    dispatch({ type: 'TOGGLE_SELECTED_HOUR', hour });
  };

  const hoverIdx = hover ? HOURS.indexOf(hover.hour) : -1;
  const hoverData = hoverIdx >= 0 ? eventSummaryByHour[hoverIdx] : null;

  // Per latest design: the Event chart header has no Export button; the
  // single page-level Export action lives in the FilterBar above the table
  // and exports the filtered event-log rows. The OMP usage chart still has
  // its own Export for the time-series data.
  return (
    <ChartCard>
      <ChartHeader title="Event" />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', width: '100%', height: HEIGHT }}
      >
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label="Event stacked bar chart over 12 hours"
          style={{ display: 'block' }}
        >
          {/* Y axis grid */}
          {ticks(yMax).map(v => (
            <g key={v}>
              <line
                x1={PADDING.left} x2={PADDING.left + innerW}
                y1={yFor(v)} y2={yFor(v)}
                stroke="var(--color-border-primary)" strokeWidth={1}
              />
              <text
                x={PADDING.left - 8} y={yFor(v) + 4}
                fontSize={11} textAnchor="end"
                fill="var(--color-text-tertiary)"
              >
                {v}
              </text>
            </g>
          ))}

          {/* Bars */}
          {eventSummaryByHour.map((d, i) => {
            const isSelected = state.selectedHour === d.hour;
            const isHovered  = hover?.hour === d.hour && !isSelected;

            // Compute stacked rectangles in render order (top → bottom = STACK_ORDER).
            let runningTop = 0;
            const segments = STACK_ORDER.map(seg => {
              const value = d[seg.key as keyof typeof d] as number;
              const yTop = yFor(runningTop + value);
              const h    = yFor(runningTop) - yFor(runningTop + value);
              runningTop += value;
              return { ...seg, value, yTop, h };
            });

            return (
              <g key={d.hour}
                 onClick={() => handleBarClick(d.hour)}
                 style={{ cursor: 'pointer' }}>
                {/* Invisible hit area covering the slot for easy hover/click */}
                <rect
                  x={slotCenterX(i) - slotW / 2}
                  y={PADDING.top}
                  width={slotW}
                  height={innerH}
                  fill="transparent"
                />

                {segments.map(seg => (
                  <rect
                    key={seg.key}
                    x={slotCenterX(i) - barW / 2}
                    y={seg.yTop}
                    width={barW}
                    height={Math.max(0, seg.h)}
                    fill={seg.color}
                    opacity={isSelected ? 1 : (isHovered ? 0.92 : 0.85)}
                    stroke={isSelected ? 'var(--color-text-heading)' : 'transparent'}
                    strokeWidth={isSelected ? 1 : 0}
                    className={
                      isSelected ? 'event-bar event-bar--selected'
                      : isHovered ? 'event-bar event-bar--hovered'
                      : 'event-bar'
                    }
                  />
                ))}

                {/* Centered count labels per segment (drawn last to overlay) */}
                {segments.map(seg =>
                  seg.h >= 16 ? (
                    <text
                      key={`lbl-${seg.key}`}
                      x={slotCenterX(i)}
                      y={seg.yTop + seg.h / 2 + 4}
                      fontSize={11}
                      fontWeight={700}
                      textAnchor="middle"
                      fill="#ffffff"
                      pointerEvents="none"
                    >
                      {seg.value}
                    </text>
                  ) : null,
                )}
              </g>
            );
          })}

          {/* X axis labels */}
          {HOURS.map((h, i) => {
            const isSelected = state.selectedHour === h;
            return (
              <text
                key={h}
                x={slotCenterX(i)}
                y={HEIGHT - PADDING.bottom + 18}
                fontSize={11}
                textAnchor="middle"
                fontWeight={isSelected ? 700 : 400}
                fill={isSelected
                  ? 'var(--color-text-heading)'
                  : 'var(--color-text-secondary)'}
                className={isSelected ? 'event-axis-label--selected' : undefined}
              >
                {h}
              </text>
            );
          })}
        </svg>

        {hover && hoverData ? (
          <ChartTooltip
            x={hover.mouseX}
            y={hover.mouseY}
            hostWidth={width}
            hostHeight={HEIGHT}
            title="Events status"
            subtitle={formatTooltipSubtitle(state.baseDate, hover.hour) + ':00'}
            rows={[
              { marker: Markers.swatch('var(--color-brand-blue)'),
                label: 'Control connection state change',
                value: hoverData.controlConnectionStateChange },
              { marker: Markers.swatch('var(--color-brand-cyan)'),
                label: 'OMP peer state change',
                value: hoverData.ompPeerStateChange },
              { marker: Markers.swatch('var(--color-brand-purple)'),
                label: 'Policy change',
                value: hoverData.policyChange },
            ]}
            minWidth={260}
          />
        ) : null}
      </div>

      <Legend
        items={[
          { marker: Markers.swatch('var(--color-brand-blue)'),
            label: 'Control connection state change' },
          { marker: Markers.swatch('var(--color-brand-cyan)'),
            label: 'OMP peer state change' },
          { marker: Markers.swatch('var(--color-brand-purple)'),
            label: 'Policy change' },
        ]}
      />
    </ChartCard>
  );
}

function ticks(yMax: number): number[] {
  const step = yMax <= 50 ? 10 : yMax <= 100 ? 20 : 25;
  const out: number[] = [];
  for (let v = 0; v <= yMax; v += step) out.push(v);
  return out;
}
