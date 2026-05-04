/**
 * Zone A — OMP Process Usage line chart (§4 Flow A, §5.2, §8.1).
 *
 * Renders 4 metric lines (CPU usage / memory usage / CPU avg / memory avg) +
 * a dotted threshold line over 12 hour points. On mousemove the cursor snaps
 * to the nearest integer hour, paints a translucent vertical band over that
 * hour column, focuses the data dots, and shows the OMP status tooltip.
 *
 * Important: this chart is intentionally inert with respect to Event-chart
 * selection. Per latest spec (replaces §15.2 Q3 cross-zone highlight): clicks
 * on the Event bar chart MUST NOT alter this chart's appearance — no
 * background tint, no highlighted axis label, no data swap. Only its own
 * hover state is allowed to change the visual.
 */

import {
  useEffect, useRef, useState, useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { HOURS, ompUsageByHour, type Hour } from './data';
import { useOmp } from './state';
import { ChartTooltip, Markers, type TooltipRow } from './ChartTooltip';
import { format12HourRange, formatTooltipSubtitle } from './utils';
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

  // Note: deliberately do NOT read state.selectedHour here. This chart is
  // independent from the Event bar chart's selection, per latest spec.

  const tooltipRows: TooltipRow[] = hoverData
    ? [
        { marker: Markers.blueLineDot,      label: 'OMP CPU usage',      value: `${hoverData.cpuUsage}%` },
        { marker: Markers.cyanLineTriangle, label: 'OMP memory usage',   value: `${hoverData.memoryUsage}%` },
        { marker: Markers.purpleDot,        label: 'OMP CPU average',    value: `${hoverData.cpuAverage}%` },
        { marker: Markers.pinkDot,          label: 'OMP memory average', value: `${hoverData.memoryAverage}%` },
      ]
    : [];

  /**
   * Export the visible OMP chart as a PDF (per spec: "Download PDF 當前
   * 使用者看見的 OMP process usage chart (時間跟訊息)"). We:
   *   1. Clear any hover tooltip so it doesn't leak into the snapshot.
   *   2. Serialize the live <svg> and rasterize it at 2x via a Blob URL +
   *      <Image> + <canvas>.drawImage round-trip — this avoids an
   *      html2canvas dependency.
   *   3. Build an A4-landscape PDF with title, time range, generated-at
   *      timestamp, the chart bitmap, and a manual legend that matches the
   *      five series (CPU/memory usage + CPU/memory average + threshold).
   */
  const handleExport = async () => {
    setHover(null);
    // Wait two animation frames to make sure the cleared hover state has
    // committed before we snapshot the SVG.
    await new Promise<void>(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );

    const svgEl = ref.current?.querySelector('svg');
    if (!svgEl) return;

    const xml = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    try {
      const rect = svgEl.getBoundingClientRect();
      const scale = 2;

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to rasterize chart SVG'));
        img.src = svgUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(rect.width  * scale);
      canvas.height = Math.round(rect.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngDataUrl = canvas.toDataURL('image/png');

      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 36;

      // Title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(20);
      pdf.text('OMP process usage', margin, margin + 16);

      // Subtitle row: time range (left) + generated-at (right)
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(format12HourRange(state.baseDate), margin, margin + 32);
      pdf.text(
        `Generated ${new Date().toLocaleString()}`,
        pageW - margin,
        margin + 32,
        { align: 'right' },
      );
      pdf.setTextColor(20);

      // Chart image — fit within remaining space, centred horizontally,
      // leave a band at the bottom for the legend.
      const headerH = 56;
      const legendH = 48;
      const availW  = pageW - margin * 2;
      const availH  = pageH - margin * 2 - headerH - legendH;

      const aspect = canvas.width / canvas.height;
      let drawW = availW;
      let drawH = drawW / aspect;
      if (drawH > availH) {
        drawH = availH;
        drawW = drawH * aspect;
      }
      const imgX = margin + (availW - drawW) / 2;
      const imgY = margin + headerH;
      pdf.addImage(pngDataUrl, 'PNG', imgX, imgY, drawW, drawH);

      // Legend — colours match design-tokens.css, dashed strokes match the
      // dashed lines on the actual chart.
      type LegendRow = {
        label: string;
        rgb: [number, number, number];
        dashed?: boolean;
      };
      const legend: LegendRow[] = [
        { label: 'OMP CPU usage',           rgb: [0x50, 0x5e, 0xd9] },
        { label: 'OMP memory usage',        rgb: [0x04, 0xa4, 0xb0] },
        { label: 'OMP CPU average',         rgb: [0xa9, 0x74, 0xf7], dashed: true },
        { label: 'OMP memory average',      rgb: [0xc2, 0x30, 0x6f], dashed: true },
        { label: 'Warning threshold (80%)', rgb: [0xcc, 0x86, 0x04], dashed: true },
      ];
      pdf.setFontSize(10);
      const legendY = imgY + drawH + 24;
      let legendX = margin;
      for (const item of legend) {
        pdf.setDrawColor(item.rgb[0], item.rgb[1], item.rgb[2]);
        pdf.setLineWidth(2);
        pdf.setLineDashPattern(item.dashed ? [3, 2] : [], 0);
        pdf.line(legendX, legendY - 3, legendX + 16, legendY - 3);
        pdf.setLineDashPattern([], 0);

        pdf.setTextColor(20);
        pdf.text(item.label, legendX + 22, legendY);
        legendX += 22 + pdf.getTextWidth(item.label) + 16;
      }

      pdf.save('omp-process-usage.pdf');
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
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

          {/* Threshold line (dotted) — labelled in the legend below the chart. */}
          <line
            x1={PADDING.left} x2={PADDING.left + innerW}
            y1={yFor(80)} y2={yFor(80)}
            stroke="var(--color-brand-orange)"
            strokeWidth={2} strokeDasharray="3 3"
          />

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

          {/* X axis labels — uniform styling, no event-selection feedback */}
          {HOURS.map((h, i) => (
            <text
              key={h}
              x={xFor(i)} y={HEIGHT - PADDING.bottom + 18}
              fontSize={11}
              textAnchor="middle"
              fontWeight={400}
              fill="var(--color-text-secondary)"
            >
              {h}
            </text>
          ))}
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
