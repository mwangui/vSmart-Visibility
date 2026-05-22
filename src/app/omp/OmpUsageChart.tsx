/**
 * Zone A — OMP Process Usage line chart (§4 Flow A, §5.2, §8.1).
 *
 * Renders 2 metric lines (CPU usage / memory usage) + a dotted threshold
 * line over the selected time window. Short ranges use minute buckets at their
 * configured step; 24 hours remains hourly. On mousemove the cursor snaps to
 * the nearest bucket, paints a translucent vertical band, focuses the data
 * dots, and shows the OMP status tooltip — which
 * is the only place the CPU/memory averages now appear (inline beside the
 * usage values), per latest spec.
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
import type { OmpUsagePoint } from './data';
import { useOmp } from './state';
import { ChartTooltip, Markers, type TooltipRow } from './ChartTooltip';
import { format24HourRange, formatTooltipSubtitle } from './utils';
import { ChartCard, ChartHeader, Legend } from './ChartCard';

// `left` is wide enough to host the rotated Y-axis title ("CPU / memory (%)")
// to the left of the tick labels without overlap. Kept in sync with
// EventBarChart so the x-axis hour columns align between the two charts.
const PADDING = { top: 24, right: 24, bottom: 36, left: 60 };
const HEIGHT  = 260;
const Y_MIN   = 0;
const Y_MAX   = 100;

interface HoverInfo {
  hour: string;
  mouseX: number;
  mouseY: number;
}

export function OmpUsageChart() {
  const { state, hours, ompUsageByHour } = useOmp();
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
  const stepX  = hours.length > 1 ? innerW / (hours.length - 1) : innerW;
  const colW   = innerW / hours.length;

  const yFor = useCallback(
    (v: number) => PADDING.top + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * innerH,
    [innerH],
  );
  const xFor = useCallback(
    (i: number) => (
      hours.length === 1
        ? PADDING.left + innerW / 2
        : PADDING.left + i * stepX
    ),
    [hours.length, innerW, stepX],
  );

  const linePath = useCallback(
    (key: keyof OmpUsagePoint) =>
      ompUsageByHour
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key] as number)}`)
        .join(' '),
    [ompUsageByHour, xFor, yFor],
  );

  const handleMouseMove = (ev: ReactMouseEvent<HTMLDivElement>) => {
    const host = ref.current?.getBoundingClientRect();
    if (!host) return;
    const mouseX = ev.clientX - host.left;
    const mouseY = ev.clientY - host.top;

    // Snap to nearest hour by index.
    const rel = (mouseX - PADDING.left) / stepX;
    const idx = Math.max(0, Math.min(hours.length - 1, Math.round(rel)));
    setHover({ hour: hours[idx], mouseX, mouseY });
  };

  const handleMouseLeave = () => setHover(null);

  const hoverIdx = hover ? hours.indexOf(hover.hour) : -1;
  const hoverData = hoverIdx >= 0 ? ompUsageByHour[hoverIdx] : null;
  const isIndividualTenant = state.selectedTenant !== 'All';

  // Note: deliberately do NOT read state.selectedHour here. This chart is
  // independent from the Event bar chart's selection, per latest spec.

  const labelEvery =
    state.timeRangeHours === 1 ? 5
    : state.timeRangeHours === 3 ? 15
    : state.timeRangeHours === 6 ? 15
    : 2;

  // Averages no longer render as chart series or legend items; they are
  // surfaced inline in the tooltip values so the chart stays uncluttered
  // while still exposing the average context on hover.
  const tooltipRows: TooltipRow[] = hoverData
    ? [
        {
          marker: Markers.blueLineDot,
          label: 'OMP CPU usage',
          value: (
            <>
              {hoverData.cpuUsage}%
              {isIndividualTenant ? (
                <span
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontWeight: 400,
                    marginLeft: 6,
                  }}
                >
                  (average {hoverData.cpuAverage}%)
                </span>
              ) : null}
            </>
          ),
        },
        {
          marker: Markers.cyanLineTriangle,
          label: 'OMP memory usage',
          value: (
            <>
              {hoverData.memoryUsage}%
              {isIndividualTenant ? (
                <span
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontWeight: 400,
                    marginLeft: 6,
                  }}
                >
                  (average {hoverData.memoryAverage}%)
                </span>
              ) : null}
            </>
          ),
        },
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
   *      three series (CPU/memory usage + threshold).
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

    // Resolve CSS custom properties before serialising. The chart SVG uses
    // attributes like `stroke="var(--color-brand-blue)"`. When the SVG is
    // serialised to a Blob URL and rasterised through an <img>, it renders in
    // an isolated SVG-only document that has no access to the page's :root
    // variables → every var() resolves to empty → strokes/fills disappear and
    // the PDF ends up showing only the axis text. Inlining the *computed*
    // styles as concrete attributes makes the snapshot self-contained.
    const xml = serializeSvgWithInlineStyles(svgEl);
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
      pdf.text(format24HourRange(state.baseDate, state.timeRangeHours), margin, margin + 32);
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
      // dashed lines on the actual chart. Mirrors the in-app Legend below the
      // chart (CPU usage + memory usage + warning threshold); averages were
      // removed per the same spec change that dropped their on-chart lines.
      type LegendRow = {
        label: string;
        rgb: [number, number, number];
        dashed?: boolean;
      };
      const legend: LegendRow[] = [
        { label: 'OMP CPU usage',           rgb: [0x50, 0x5e, 0xd9] },
        { label: 'OMP memory usage',        rgb: [0x04, 0xa4, 0xb0] },
        ...(isIndividualTenant
          ? [{ label: 'Warning threshold (80%)', rgb: [0xcc, 0x86, 0x04] as [number, number, number], dashed: true }]
          : []),
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
          aria-label={`OMP process usage line chart over ${state.timeRangeHours} hours`}
          style={{ display: 'block' }}
        >
          {/* Y-axis title (rotated, vertically centred in the plot area). */}
          <text
            transform={`translate(14, ${PADDING.top + innerH / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-text-secondary)"
          >
            CPU / memory (%)
          </text>

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

          {isIndividualTenant ? (
            <line
              x1={PADDING.left} x2={PADDING.left + innerW}
              y1={yFor(80)} y2={yFor(80)}
              stroke="var(--color-brand-orange)"
              strokeWidth={2} strokeDasharray="3 3"
            />
          ) : null}

          {/* CPU usage (blue, solid) */}
          <path d={linePath('cpuUsage')} fill="none"
                stroke="var(--color-brand-blue)" strokeWidth={2} />

          {/* Memory usage (cyan, solid) */}
          <path d={linePath('memoryUsage')} fill="none"
                stroke="var(--color-brand-cyan)" strokeWidth={2} />

          {/* Data points — filled markers that match the legend swatches:
              filled blue circle for CPU usage, filled cyan ▼ triangle for
              memory usage. Hover state grows them slightly. */}
          {ompUsageByHour.map((d, i) => {
            const focused = i === hoverIdx;
            const r = focused ? 5 : 3.5;
            return (
              <g key={d.hour}>
                <circle cx={xFor(i)} cy={yFor(d.cpuUsage)} r={r}
                        fill="var(--color-brand-blue)" />
                <polygon
                  points={trianglePoints(xFor(i), yFor(d.memoryUsage), focused ? 6 : 4)}
                  fill="var(--color-brand-cyan)"
                />
              </g>
            );
          })}

          {/* X axis labels — show every other hour to keep the 24-point axis
              from overlapping at typical chart widths. The full 24-point
              data series is still rendered above. */}
          {hours.map((h, i) =>
            i % labelEvery === 0 ? (
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
            ) : null,
          )}
        </svg>

        {hover && hoverData ? (
          <ChartTooltip
            x={hover.mouseX}
            y={hover.mouseY}
            hostWidth={width}
            hostHeight={HEIGHT}
            title="OMP status"
            subtitle={formatTooltipSubtitle(state.baseDate, hover.hour)}
            rows={[
              ...tooltipRows,
              { divider: true },
              { label: 'Total CPU',    value: `${hoverData.totalCpu}%` },
              { label: 'Total memory', value: `${hoverData.totalMemory}%` },
            ]}
            minWidth={280}
          />
        ) : null}
      </div>

      <Legend
        items={[
          { marker: Markers.blueLineDot,       label: 'OMP CPU usage' },
          { marker: Markers.cyanLineTriangle,  label: 'OMP memory usage' },
          ...(isIndividualTenant
            ? [{ marker: thresholdSwatch, label: 'CPU & memory warning threshold' }]
            : []),
        ]}
      />
    </ChartCard>
  );
}

// Downward-pointing triangle (▼): horizontal edge on top, apex at the bottom.
// Matches the filled triangle marker in the legend (Markers.cyanLineTriangle).
function trianglePoints(cx: number, cy: number, size: number): string {
  const h = size * 1.1;
  return `${cx - size},${cy - h * 0.7} ${cx + size},${cy - h * 0.7} ${cx},${cy + h}`;
}

/**
 * Serialise an <svg> after copying each element's *computed* visual styles
 * back as concrete attributes. This is required for `<img src=blob:>`
 * rasterisation because that path renders the SVG in an isolated document
 * with no access to the parent page's CSS custom properties.
 *
 * We only mirror properties that affect what the rasteriser will paint — fill,
 * stroke, stroke-width, stroke-dasharray, opacity, font, text fill — so we
 * don't bloat the output with the entire computed stylesheet.
 */
function serializeSvgWithInlineStyles(srcSvg: SVGSVGElement): string {
  const clone = srcSvg.cloneNode(true) as SVGSVGElement;

  // Pair every live source element with its corresponding clone so we can
  // read getComputedStyle() from the live one and write attributes to the
  // clone. Both lists include the root <svg> first.
  const liveNodes:  Element[] = [srcSvg, ...Array.from(srcSvg.querySelectorAll('*'))];
  const cloneNodes: Element[] = [clone,  ...Array.from(clone.querySelectorAll('*'))];

  // Properties whose value the rasteriser will draw with. These are the only
  // ones that contain CSS variables in our chart markup; widening the list
  // here is harmless but unnecessary.
  const visualProps = [
    'fill',
    'stroke',
    'stroke-width',
    'stroke-dasharray',
    'stroke-opacity',
    'fill-opacity',
    'opacity',
    'font-size',
    'font-family',
    'font-weight',
  ] as const;

  for (let i = 0; i < liveNodes.length; i++) {
    const live = liveNodes[i];
    const dst = cloneNodes[i];
    if (!live || !dst) continue;
    const cs = window.getComputedStyle(live);
    for (const prop of visualProps) {
      const v = cs.getPropertyValue(prop).trim();
      // Skip empty / 'none' so we don't paint over things that were set to
      // none on purpose. 'rgba(0, 0, 0, 0)' (transparent) we DO write back —
      // some <text> nodes resolve to that for stroke and we want the
      // rasteriser to honour the resolved value.
      if (!v || v === 'none') continue;
      // Don't propagate CSS variables; they're useless in the standalone SVG.
      if (v.startsWith('var(')) continue;
      dst.setAttribute(prop, v);
    }
  }

  // Ensure the namespace is present on the cloned root so downstream parsers
  // recognise it as SVG even when read out of context.
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }
  if (!clone.getAttribute('xmlns:xlink')) {
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  }

  return new XMLSerializer().serializeToString(clone);
}

// Thicker dashed yellow line — visually aligns with the orange warning line
// drawn at y = 80% on the chart (stroke-dasharray="3 3" stroke-width="2").
const thresholdSwatch = (
  <svg width="20" height="4" viewBox="0 0 20 4" aria-hidden>
    <line x1="0" y1="2" x2="20" y2="2"
          stroke="var(--color-brand-orange)" strokeWidth="2"
          strokeDasharray="3 3" strokeLinecap="round" />
  </svg>
);
