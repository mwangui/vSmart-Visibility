/**
 * Zone A — OMP Process Usage line chart (§4 Flow A, §5.2, §8.1).
 *
 * Renders 4 metric lines (CPU usage / memory usage / CPU avg / memory avg) +
 * a dotted threshold line over 12 hour points. On mousemove the cursor snaps
 * to the nearest integer hour, paints a translucent vertical band over that
 * hour column, focuses the data dots, and shows the OMP status tooltip.
 *
 * Per §15.2 Q3 (resolved by EC Review 04/01): when an Event bar is in the
 * selected state, the same hour column on this chart also shows a persistent
 * highlight band — i.e. selection spans Zone A + Zone B.
 */

import {
  useEffect, useRef, useState, useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { HOURS, ompUsageByHour, type Hour } from './data';
import { useOmp } from './state';
import { ChartTooltip, Markers, type TooltipRow } from './ChartTooltip';
import { downloadCsv, formatTooltipSubtitle, rowsToCsv } from './utils';
import { ChartCard, ChartHeader, Legend } from './ChartCard';

const PADDING = { top: 24, right: 24, bottom: 36, left: 44 };
const HEIGHT  = 260;
const Y_MIN   = 0;
const Y_MAX   = 100;

interface HoverInfo {
  hour: Hour;
  mouseX: number;
  mouseY: number;
}

export function OmpUsageChart() {
  const { state } = useOmp();
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
  const stepX  = innerW / (HOURS.length - 1);
  const colW   = innerW / HOURS.length;

  const yFor = useCallback(
    (v: number) => PADDING.top + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * innerH,
    [innerH],
  );
  const xFor = useCallback(
    (i: number) => PADDING.left + i * stepX,
    [stepX],
  );

  const linePath = useCallback(
    (key: keyof typeof ompUsageByHour[number]) =>
      ompUsageByHour
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key] as number)}`)
        .join(' '),
    [xFor, yFor],
  );

  const handleMouseMove = (ev: ReactMouseEvent<HTMLDivElement>) => {
    const host = ref.current?.getBoundingClientRect();
    if (!host) return;
    const mouseX = ev.clientX - host.left;
    const mouseY = ev.clientY - host.top;

    // Snap to nearest hour by index.
    const rel = (mouseX - PADDING.left) / stepX;
    const idx = Math.max(0, Math.min(HOURS.length - 1, Math.round(rel)));
    setHover({ hour: HOURS[idx], mouseX, mouseY });
  };

  const handleMouseLeave = () => setHover(null);

  const hoverIdx = hover ? HOURS.indexOf(hover.hour) : -1;
  const hoverData = hoverIdx >= 0 ? ompUsageByHour[hoverIdx] : null;

  const selectedIdx = state.selectedHour ? HOURS.indexOf(state.selectedHour) : -1;

  const tooltipRows: TooltipRow[] = hoverData
    ? [
        { marker: Markers.blueLineDot,      label: 'OMP CPU usage',      value: `${hoverData.cpuUsage}%` },
        { marker: Markers.cyanLineTriangle, label: 'OMP memory usage',   value: `${hoverData.memoryUsage}%` },
        { marker: Markers.purpleDot,        label: 'OMP CPU average',    value: `${hoverData.cpuAverage}%` },
        { marker: Markers.pinkDot,          label: 'OMP memory average', value: `${hoverData.memoryAverage}%` },
      ]
    : [];

  const handleExport = () => {
    const headers = [
      { key: 'hour' as const,             label: 'Hour' },
      { key: 'cpuUsage' as const,         label: 'OMP CPU usage (%)' },
      { key: 'memoryUsage' as const,      label: 'OMP memory usage (%)' },
      { key: 'cpuAverage' as const,       label: 'OMP CPU average (%)' },
      { key: 'memoryAverage' as const,    label: 'OMP memory average (%)' },
      { key: 'totalCpu' as const,         label: 'Total CPU (%)' },
      { key: 'totalMemory' as const,      label: 'Total memory (%)' },
      { key: 'warningThreshold' as const, label: 'Warning threshold (%)' },
    ];
    downloadCsv('omp-process-usage.csv', rowsToCsv(headers, ompUsageByHour));
  };

  return (
    <ChartCard>
      <ChartHeader title="OMP process usage" onExport={handleExport} />

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
          aria-label="OMP process usage line chart over 12 hours"
          style={{ display: 'block' }}
        >
          {/* Y axis grid */}
          {[0, 25, 50, 75, 100].map(v => (
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
                {v}%
              </text>
            </g>
          ))}

          {/* Selected (Q3: cross Zone A+B highlight) — drawn under hover band */}
          {selectedIdx >= 0 ? (
            <rect
              x={xFor(selectedIdx) - colW * 0.4}
              y={PADDING.top}
              width={colW * 0.8}
              height={innerH}
              fill="var(--color-brand-blue-light)"
              opacity={0.10}
              className="chart-hover-band chart-hover-band--selected"
              pointerEvents="none"
            />
          ) : null}

          {/* Hover vertical band */}
          {hoverIdx >= 0 ? (
            <rect
              x={xFor(hoverIdx) - colW * 0.4}
              y={PADDING.top}
              width={colW * 0.8}
              height={innerH}
              fill="var(--color-text-muted)"
              opacity={0.12}
              className="chart-hover-band"
              pointerEvents="none"
            />
          ) : null}

          {/* Threshold line (dotted) */}
          <line
            x1={PADDING.left} x2={PADDING.left + innerW}
            y1={yFor(80)} y2={yFor(80)}
            stroke="var(--color-brand-orange)"
            strokeWidth={2} strokeDasharray="3 3"
          />
          <text
            x={PADDING.left + 6} y={yFor(80) - 4}
            fontSize={10} fill="var(--color-brand-orange)"
            fontWeight={600}
          >
            Warning threshold (80%)
          </text>

          {/* Average lines (dotted) */}
          <path d={linePath('cpuAverage')}    fill="none"
                stroke="var(--color-brand-purple)"
                strokeWidth={1.5} strokeDasharray="2 2" />
          <path d={linePath('memoryAverage')} fill="none"
                stroke="var(--color-brand-pink)"
                strokeWidth={1.5} strokeDasharray="2 2" />

          {/* CPU usage (blue, solid) */}
          <path d={linePath('cpuUsage')} fill="none"
                stroke="var(--color-brand-blue)" strokeWidth={2} />

          {/* Memory usage (cyan, solid) */}
          <path d={linePath('memoryUsage')} fill="none"
                stroke="var(--color-brand-cyan)" strokeWidth={2} />

          {/* Data dots, with focus state for hovered hour */}
          {ompUsageByHour.map((d, i) => {
            const focused = i === hoverIdx;
            const r = focused ? 5 : 3.5;
            return (
              <g key={d.hour}>
                <circle cx={xFor(i)} cy={yFor(d.cpuUsage)} r={r}
                        fill="var(--color-bg-primary)"
                        stroke="var(--color-brand-blue)"
                        strokeWidth={2} />
                <polygon
                  points={trianglePoints(xFor(i), yFor(d.memoryUsage), focused ? 6 : 4)}
                  fill="var(--color-bg-primary)"
                  stroke="var(--color-brand-cyan)"
                  strokeWidth={2}
                />
              </g>
            );
          })}

          {/* X axis labels */}
          {HOURS.map((h, i) => {
            const isSelected = i === selectedIdx;
            return (
              <text
                key={h}
                x={xFor(i)} y={HEIGHT - PADDING.bottom + 18}
                fontSize={11}
                textAnchor="middle"
                fontWeight={isSelected ? 700 : 400}
                fill={isSelected
                  ? 'var(--color-text-heading)'
                  : 'var(--color-text-secondary)'}
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
            title="OMP status"
            subtitle={formatTooltipSubtitle(state.baseDate, hover.hour) + ':00'}
            rows={[
              ...tooltipRows,
              { divider: true },
              { label: 'Total CPU',    value: `${hoverData.totalCpu}%` },
              { label: 'Total memory', value: `${hoverData.totalMemory}%` },
            ]}
            minWidth={240}
          />
        ) : null}
      </div>

      <Legend
        items={[
          { marker: Markers.blueLineDot,      label: 'OMP CPU usage' },
          { marker: Markers.cyanLineTriangle, label: 'OMP memory usage' },
          { marker: Markers.purpleDot,        label: 'OMP CPU average' },
          { marker: Markers.pinkDot,          label: 'OMP memory average' },
          { marker: thresholdSwatch,          label: 'Warning threshold' },
        ]}
      />
    </ChartCard>
  );
}

function trianglePoints(cx: number, cy: number, size: number): string {
  const h = size * 1.1;
  return `${cx},${cy - h} ${cx + size},${cy + h * 0.7} ${cx - size},${cy + h * 0.7}`;
}

const thresholdSwatch = (
  <span
    style={{
      display: 'inline-block',
      width: 14, height: 0,
      borderTop: '2px dashed var(--color-brand-orange)',
    }}
  />
);
