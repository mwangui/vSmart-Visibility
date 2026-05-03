/**
 * OMP Statistics — Mock Database
 *
 * Single source of truth for the three data feeds described in
 * `OMP_Statistics_施工計畫_v0.2.pdf` §5:
 *   1. ompUsageByHour     — 12 hour points × 7 numeric fields
 *   2. eventSummaryByHour — 12 hour points × 3 event-type counts
 *   3. mockLogRows        — 200 seeded fake log rows
 *
 * No values may be hardcoded inside chart / handler / table code; everything
 * downstream reads from this module.
 */

export const HOURS = [
  '00:00', '01:00', '02:00', '03:00',
  '04:00', '05:00', '06:00', '07:00',
  '08:00', '09:00', '10:00', '11:00',
] as const;

export type Hour = typeof HOURS[number];

export const EVENT_TYPES = {
  CONTROL_CONNECTION: 'Control connection state change',
  POLICY_CHANGE: 'Policy change',
  OMP_PEER_STATE: 'OMP peer state change',
} as const;

export type EventTypeName = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

/**
 * Display order in dropdown: Control → Policy → OMP peer (per plan §4 Flow D).
 */
export const EVENT_TYPE_ORDER: EventTypeName[] = [
  EVENT_TYPES.CONTROL_CONNECTION,
  EVENT_TYPES.POLICY_CHANGE,
  EVENT_TYPES.OMP_PEER_STATE,
];

// -----------------------------------------------------------------------------
// 5.2 OMP Usage 12 hours
// -----------------------------------------------------------------------------

export interface OmpUsagePoint {
  hour: Hour;
  cpuUsage: number;
  memoryUsage: number;
  cpuAverage: number;
  memoryAverage: number;
  totalCpu: number;
  totalMemory: number;
  warningThreshold: number;
}

export const ompUsageByHour: OmpUsagePoint[] = [
  { hour: '00:00', cpuUsage: 54, memoryUsage: 34, cpuAverage: 49, memoryAverage: 28, totalCpu: 50, totalMemory: 82, warningThreshold: 80 },
  { hour: '01:00', cpuUsage: 33, memoryUsage: 44, cpuAverage: 47, memoryAverage: 27, totalCpu: 48, totalMemory: 80, warningThreshold: 80 },
  { hour: '02:00', cpuUsage: 71, memoryUsage: 29, cpuAverage: 51, memoryAverage: 35, totalCpu: 51, totalMemory: 81, warningThreshold: 80 },
  { hour: '03:00', cpuUsage: 27, memoryUsage: 56, cpuAverage: 45, memoryAverage: 34, totalCpu: 45, totalMemory: 83, warningThreshold: 80 },
  { hour: '04:00', cpuUsage: 32, memoryUsage: 45, cpuAverage: 47, memoryAverage: 25, totalCpu: 47, totalMemory: 82, warningThreshold: 80 },
  { hour: '05:00', cpuUsage: 83, memoryUsage: 52, cpuAverage: 43, memoryAverage: 26, totalCpu: 52, totalMemory: 86, warningThreshold: 80 },
  { hour: '06:00', cpuUsage: 55, memoryUsage: 36, cpuAverage: 44, memoryAverage: 31, totalCpu: 51, totalMemory: 84, warningThreshold: 80 },
  { hour: '07:00', cpuUsage: 46, memoryUsage: 55, cpuAverage: 41, memoryAverage: 40, totalCpu: 49, totalMemory: 82, warningThreshold: 80 },
  { hour: '08:00', cpuUsage: 64, memoryUsage: 42, cpuAverage: 54, memoryAverage: 35, totalCpu: 50, totalMemory: 83, warningThreshold: 80 },
  { hour: '09:00', cpuUsage: 35, memoryUsage: 56, cpuAverage: 48, memoryAverage: 29, totalCpu: 47, totalMemory: 81, warningThreshold: 80 },
  { hour: '10:00', cpuUsage: 33, memoryUsage: 46, cpuAverage: 54, memoryAverage: 37, totalCpu: 49, totalMemory: 80, warningThreshold: 80 },
  { hour: '11:00', cpuUsage: 39, memoryUsage: 52, cpuAverage: 45, memoryAverage: 32, totalCpu: 48, totalMemory: 82, warningThreshold: 80 },
];

// -----------------------------------------------------------------------------
// 5.3 Event Summary 12 hours
// -----------------------------------------------------------------------------

export interface EventSummaryPoint {
  hour: Hour;
  controlConnectionStateChange: number;
  ompPeerStateChange: number;
  policyChange: number;
}

export const eventSummaryByHour: EventSummaryPoint[] = [
  { hour: '00:00', controlConnectionStateChange: 18, ompPeerStateChange: 14, policyChange: 21 },
  { hour: '01:00', controlConnectionStateChange:  9, ompPeerStateChange: 16, policyChange:  5 },
  { hour: '02:00', controlConnectionStateChange: 21, ompPeerStateChange: 13, policyChange: 18 },
  { hour: '03:00', controlConnectionStateChange:  7, ompPeerStateChange: 10, policyChange: 24 },
  { hour: '04:00', controlConnectionStateChange: 19, ompPeerStateChange:  5, policyChange: 22 },
  { hour: '05:00', controlConnectionStateChange: 16, ompPeerStateChange: 25, policyChange: 27 }, // dramatic peak
  { hour: '06:00', controlConnectionStateChange: 22, ompPeerStateChange: 13, policyChange: 10 },
  { hour: '07:00', controlConnectionStateChange: 10, ompPeerStateChange:  6, policyChange:  5 },
  { hour: '08:00', controlConnectionStateChange:  5, ompPeerStateChange: 23, policyChange: 11 },
  { hour: '09:00', controlConnectionStateChange:  5, ompPeerStateChange:  6, policyChange: 26 },
  { hour: '10:00', controlConnectionStateChange: 21, ompPeerStateChange: 12, policyChange: 19 },
  { hour: '11:00', controlConnectionStateChange:  7, ompPeerStateChange:  8, policyChange:  5 },
];

// -----------------------------------------------------------------------------
// 5.4 Mock Database — 200 seeded fake rows
// -----------------------------------------------------------------------------

const SYSTEM_IP_POOL = [
  '1.1.1.45', '1.1.1.48', '1.1.1.50', '1.1.1.51',
  '1.1.1.52', '1.1.1.53', '1.1.1.56', '1.1.1.58',
  '1.1.1.59', '1.1.1.60', '1.1.1.61', '1.1.1.62',
];

const HOSTNAME_POOL = [
  'vSmart2', 'Branch-101', 'Branch-2001', 'Branch-301',
  'Branch-401', 'Branch-5001', 'Branch-601', 'Branch-701', 'Branch-801',
];

const SITE_NAME_POOL = ['San Jose', 'San Francisco', 'Mountain View'];

const ROUTES_SENT_POOL     = [53, 62, 70];
const ROUTES_RECEIVED_POOL = [36, 40, 41];
const PEERS_POOL           = [1, 2, 3];

/**
 * Total = 200, with 05:00 deliberately spiking to 29 (matches the figure 05
 * scenario where Selected period filters 316→29 results).
 */
export const TABLE_ROW_DISTRIBUTION_BY_HOUR: Record<Hour, number> = {
  '00:00': 18, '01:00': 14, '02:00': 18, '03:00': 13,
  '04:00': 16, '05:00': 29, '06:00': 16, '07:00': 10,
  '08:00': 18, '09:00': 15, '10:00': 20, '11:00': 13,
};

export interface MockLogRow {
  id: string;
  eventTime: Date;
  eventTimeLabel: string;
  hour: Hour;
  systemIp: string;
  hostname: string;
  siteName: string;
  eventName: EventTypeName;
  details: string;
  routesSent: number;
  routesReceived: number;
  peers: number;
}

/**
 * Seeded RNG so a given (baseDate) produces the same 200 rows each render —
 * critical for snapshot-style assertions and avoiding visual jitter.
 */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDetails(rowIndex: number, eventName: EventTypeName): string {
  if (eventName === EVENT_TYPES.CONTROL_CONNECTION) {
    return `peer-type=vedge;peer=1.1.2.${(rowIndex % 20) + 1};peer-new-state=control-connection-up`;
  }
  if (eventName === EVENT_TYPES.OMP_PEER_STATE) {
    return `peer-type=vedge;peer=1.1.2.${(rowIndex % 20) + 1};new-omp-state=up-in-gr`;
  }
  if (eventName === EVENT_TYPES.POLICY_CHANGE) {
    const policyTypes = ['control-policy', 'data-policy', 'app-route-policy'];
    return `policy-type:${policyTypes[rowIndex % policyTypes.length]}`;
  }
  return '';
}

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }

function formatRowTime(date: Date): string {
  // "May 02, 2026 05:18 AM"
  const m   = MONTH_SHORT[date.getMonth()];
  const d   = pad2(date.getDate());
  const y   = date.getFullYear();
  const h24 = date.getHours();
  const min = pad2(date.getMinutes());
  const ampm = h24 < 12 ? 'AM' : 'PM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${m} ${d}, ${y} ${pad2(h12)}:${min} ${ampm}`;
}

/**
 * Allocate the per-hour total into 3 event types proportional to that hour's
 * eventSummaryByHour, rounding down then redistributing the leftover by largest
 * fractional remainder. Guarantees the per-hour sum exactly equals `total`.
 */
function splitEventTypes(
  total: number,
  summary: EventSummaryPoint,
): Record<EventTypeName, number> {
  const weights: Array<[EventTypeName, number]> = [
    [EVENT_TYPES.CONTROL_CONNECTION, summary.controlConnectionStateChange],
    [EVENT_TYPES.POLICY_CHANGE,      summary.policyChange],
    [EVENT_TYPES.OMP_PEER_STATE,     summary.ompPeerStateChange],
  ];
  const sum = weights.reduce((s, [, w]) => s + w, 0) || 1;

  const exact = weights.map(([name, w]) => ({
    name,
    raw: (total * w) / sum,
    floor: Math.floor((total * w) / sum),
  }));
  const allocated = exact.reduce((s, e) => s + e.floor, 0);
  let leftover = total - allocated;

  const sortedByRemainder = [...exact].sort(
    (a, b) => (b.raw - b.floor) - (a.raw - a.floor),
  );
  const out: Record<EventTypeName, number> = {
    [EVENT_TYPES.CONTROL_CONNECTION]: 0,
    [EVENT_TYPES.POLICY_CHANGE]:      0,
    [EVENT_TYPES.OMP_PEER_STATE]:     0,
  };
  for (const e of exact) out[e.name] = e.floor;
  let i = 0;
  while (leftover > 0) {
    out[sortedByRemainder[i % sortedByRemainder.length].name] += 1;
    leftover -= 1;
    i += 1;
  }
  return out;
}

export interface GenerateOptions {
  /** Total rows to generate. Defaults to 200. */
  totalRows?: number;
  /** RNG seed; defaults to deterministic 0xC1500. */
  seed?: number;
}

/**
 * Generate `totalRows` mock log rows whose hour distribution matches
 * `TABLE_ROW_DISTRIBUTION_BY_HOUR` and whose per-hour event-type breakdown is
 * proportional to `eventSummaryByHour`. Times are anchored to `baseDate` (day
 * portion only) — `Feb 16, 2025` is forbidden by §9.
 */
export function generateMockLogRows(
  baseDate: Date,
  { totalRows = 200, seed = 0xc1500 }: GenerateOptions = {},
): MockLogRow[] {
  const rand = mulberry32(seed);
  const rows: MockLogRow[] = [];
  let rowIndex = 0;

  const dayAnchor = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    0, 0, 0, 0,
  );

  for (const hour of HOURS) {
    const desired = TABLE_ROW_DISTRIBUTION_BY_HOUR[hour];
    const summary = eventSummaryByHour.find(s => s.hour === hour)!;
    const split   = splitEventTypes(desired, summary);

    const hourRows: MockLogRow[] = [];
    for (const eventName of EVENT_TYPE_ORDER) {
      const count = split[eventName];
      for (let i = 0; i < count; i++) {
        // Spread minutes across the hour deterministically but unevenly.
        const offsetMin = Math.floor(rand() * 60);
        const eventTime = new Date(dayAnchor);
        eventTime.setHours(parseInt(hour.slice(0, 2), 10), offsetMin, 0, 0);

        const systemIp  = SYSTEM_IP_POOL [Math.floor(rand() * SYSTEM_IP_POOL.length)];
        const hostname  = HOSTNAME_POOL [Math.floor(rand() * HOSTNAME_POOL.length)];
        const siteName  = SITE_NAME_POOL[Math.floor(rand() * SITE_NAME_POOL.length)];
        const routesS   = ROUTES_SENT_POOL    [Math.floor(rand() * ROUTES_SENT_POOL.length)];
        const routesR   = ROUTES_RECEIVED_POOL[Math.floor(rand() * ROUTES_RECEIVED_POOL.length)];
        const peersN    = PEERS_POOL          [Math.floor(rand() * PEERS_POOL.length)];

        rowIndex += 1;
        hourRows.push({
          id: `log-${String(rowIndex).padStart(4, '0')}`,
          eventTime,
          eventTimeLabel: formatRowTime(eventTime),
          hour,
          systemIp,
          hostname,
          siteName,
          eventName,
          details: buildDetails(rowIndex, eventName),
          routesSent: routesS,
          routesReceived: routesR,
          peers: peersN,
        });
      }
    }
    // Sort rows within hour by minute so the table reads chronologically.
    hourRows.sort((a, b) => a.eventTime.getTime() - b.eventTime.getTime());
    rows.push(...hourRows);
  }

  // Top up / trim to exactly `totalRows` (defensive — distribution above sums
  // to exactly totalRows by construction, but keep this as a safety net).
  if (rows.length > totalRows) rows.length = totalRows;
  return rows;
}

/**
 * Distinct-value helpers used by the System IP / Site name multi-select
 * dropdowns. These read from the rendered rows rather than the static pools so
 * the dropdown list always reflects what's actually in the table.
 */
export function distinctSystemIps(rows: MockLogRow[]): string[] {
  return Array.from(new Set(rows.map(r => r.systemIp))).sort();
}

export function distinctSiteNames(rows: MockLogRow[]): string[] {
  return Array.from(new Set(rows.map(r => r.siteName))).sort();
}
