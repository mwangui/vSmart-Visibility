/**
 * Zone B — Event stacked bar chart (§4 Flow B+C, §5.3, §8.2-8.3).
 *
 * Renders stacked bars over the selected time window. Short ranges use minute
 * buckets at their configured step; 24 hours remains hourly. Stack order from
 * top → bottom matches the static Figma export:
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
import { useOmp } from './state';
import { ChartTooltip, Markers } from './ChartTooltip';
import { formatTooltipSubtitle } from './utils';
import { ChartCard, ChartHeader, Legend } from './ChartCard';

// `left` is wide enough to host the rotated Y-axis title ("Number of events")
// to the left of the tick labels without overlap. Kept in sync with
// OmpUsageChart so the x-axis hour columns align between the two charts.
const PADDING = { top: 16, right: 24, bottom: 36, left: 60 };
const HEIGHT  = 220;

/** Stack rendering order from top of bar to bottom (visually). */
const STACK_ORDER = [
  { key: 'policyChange',                 label: 'Policy change',                  color: 'var(--color-brand-purple)' },
  { key: 'ompPeerStateChange',           label: 'OMP peer state change',          color: 'var(--color-brand-cyan)' },
  { key: 'controlConnectionStateChange', label: 'Control connection state change', color: 'var(--color-brand-blue)' },
] as const;

interface HoverInfo {
  hour: string;
  mouseX: number;
  mouseY: number;
}

export function EventBarChart() {
  const { state, dispatch, hours, eventSummaryByHour } = useOmp();
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
  const slotW  = innerW / hours.length;
  // Bars must stay readable when the x-axis doubles from 12 to 24 columns;
  // the 8px floor prevents zero-width segments at narrow viewports.
  const barW   = Math.max(8, slotW * 0.55);

  const maxEventTotal = Math.max(
    0,
    ...eventSummaryByHour.map(d =>
      d.controlConnectionStateChange + d.ompPeerStateChange + d.policyChange,
    ),
  );
  const yAxis = getYAxisScale(maxEventTotal);
  const yMax = yAxis.max;

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
    if (idx < 0 || idx >= hours.length) {
      setHover(null);
      return;
    }
    setHover({ hour: hours[idx], mouseX, mouseY });
  };

  const handleMouseLeave = () => setHover(null);

  const handleBarClick = (hour: string) => {
    dispatch({ type: 'TOGGLE_SELECTED_HOUR', hour });
  };

  const hoverIdx = hover ? hours.indexOf(hover.hour) : -1;
  const hoverData = hoverIdx >= 0 ? eventSummaryByHour[hoverIdx] : null;
  const labelEvery =
    state.timeRangeHours === 1 ? 5
    : state.timeRangeHours === 3 ? 15
    : state.timeRangeHours === 6 ? 15
    : 2;

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
          aria-label={`Event stacked bar chart over ${state.timeRangeHours} hours`}
          style={{ display: 'block' }}
        >
          {/* Y-axis title (rotated, vertically centred in the plot area). */}
          <text
            transform={`translate(14, ${PADDING.top + innerH / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-text-secondary)"
          >
            Number of events
          </text>

          {/* Y axis grid */}
          {yAxis.ticks.map(v => (
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
                {formatAxisCount(v)}
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
                      {formatBarCount(seg.value)}
                    </text>
                  ) : null,
                )}
              </g>
            );
          })}

          {/* X axis labels — reduce density for 60-minute views. Selected
              buckets are always shown so the bolded label confirms selection. */}
          {hours.map((h, i) => {
            const isSelected = state.selectedHour === h;
            if (i % labelEvery !== 0 && !isSelected) return null;
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
            subtitle={formatTooltipSubtitle(state.baseDate, hover.hour)}
            rows={[
              { marker: Markers.swatch('var(--color-brand-blue)'),
                label: 'Control connection state change',
                value: hoverData.controlConnectionStateChange.toLocaleString('en-US') },
              { marker: Markers.swatch('var(--color-brand-cyan)'),
                label: 'OMP peer state change',
                value: hoverData.ompPeerStateChange.toLocaleString('en-US') },
              { marker: Markers.swatch('var(--color-brand-purple)'),
                label: 'Policy change',
                value: hoverData.policyChange.toLocaleString('en-US') },
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

interface YAxisScale {
  max: number;
  ticks: number[];
}

function getYAxisScale(maxValue: number): YAxisScale {
  if (maxValue <= 100) return buildYAxisScale(100, 20);
  if (maxValue <= 500) return buildYAxisScale(500, 100);
  if (maxValue <= 1000) return buildYAxisScale(1000, 200);
  if (maxValue <= 5000) return buildYAxisScale(Math.ceil(maxValue / 1000) * 1000, 1000);
  if (maxValue <= 10000) return buildYAxisScale(Math.ceil(maxValue / 2000) * 2000, 2000);

  const step = maxValue <= 50000 ? 5000 : 10000;
  return buildYAxisScale(Math.ceil(maxValue / step) * step, step);
}

function buildYAxisScale(max: number, step: number): YAxisScale {
  const out: number[] = [];
  for (let v = 0; v <= max; v += step) out.push(v);
  return { max, ticks: out };
}

function formatAxisCount(value: number): string {
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return value.toLocaleString('en-US');
}

function formatBarCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return value.toLocaleString('en-US');
}
