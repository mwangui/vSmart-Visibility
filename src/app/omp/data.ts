/**
 * OMP Statistics — Mock Database
 *
 * Single source of truth for the three data feeds described in
 * `OMP_Statistics_施工計畫_v0.2.pdf` §5, extended to a rolling 24-hour window:
 *   1. ompUsageByHour     — 24 hour points × 7 numeric fields
 *   2. eventSummaryByHour — 24 hour points × 3 event-type counts
 *   3. mockLogRows        — seeded fake log rows matching Event counts
 *
 * The time labels and row datetimes derive from a `baseDate`. Multi-hour
 * ranges use hourly buckets; shorter ranges use minute buckets.
 *
 * No values may be hardcoded inside chart / handler / table code; everything
 * downstream reads from this module.
 */

const PAD2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const ALL_HOURS_OF_DAY: readonly string[] = Array.from(
  { length: 24 },
  (_, h) => `${PAD2(h)}:00`,
);

/**
 * Time labels are runtime strings of the form "HH:mm". The 24-hour range uses
 * hourly buckets; shorter ranges use minute buckets at their configured step.
 */
export type Hour = string;

/**
 * Compute the rolling time-label list. Bucket rules:
 *   1 hour  -> every 2 minutes (30 points)
 *   3 hours -> every 1 minute  (180 points)
 *   6 hours -> every 2 minutes (180 points)
 *   24 hours -> every hour     (24 points)
 */
export function getHours(baseDate: Date, rangeHours = 24): readonly string[] {
  const minuteStep = getMinuteBucketStep(rangeHours);
  if (minuteStep) {
    const end = floorToHour(baseDate);
    const out: string[] = [];
    for (let hourOffset = rangeHours - 1; hourOffset >= 0; hourOffset--) {
      for (let minute = 0; minute < 60; minute += minuteStep) {
        const t = new Date(end);
        t.setHours(end.getHours() - hourOffset, minute, 0, 0);
        out.push(`${PAD2(t.getHours())}:${PAD2(t.getMinutes())}`);
      }
    }
    return out;
  }

  const end = floorToHour(baseDate);
  const out: string[] = [];
  for (let i = rangeHours - 1; i >= 0; i--) {
    const t = new Date(end.getTime() - i * 60 * 60 * 1000);
    out.push(`${PAD2(t.getHours())}:00`);
  }
  return out;
}

function getMinuteBucketStep(rangeHours: number): number | null {
  if (rangeHours === 1) return 2;
  if (rangeHours === 3) return 1;
  if (rangeHours === 6) return 2;
  return null;
}

/**
 * Resolve the actual Date a given rolling-window hour label maps to. Used by
 * both `generateMockLogRows` (to stamp `eventTime`) and the
 * tooltip/SelectedPeriod formatters (to show the correct calendar date for a
 * selected hour that may belong to the previous day).
 */
export function resolveHourDate(baseDate: Date, hour: string): Date {
  const h = parseInt(hour.slice(0, 2), 10);
  const minute = parseInt(hour.slice(3, 5), 10) || 0;
  const end = floorToHour(baseDate);
  const endHour = end.getHours();
  const isYesterday = h > endHour;
  const d = new Date(end);
  if (isYesterday) {
    d.setDate(d.getDate() - 1);
  }
  d.setHours(h, minute, 0, 0);
  return d;
}

function floorToHour(date: Date): Date {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}

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

function tenantIndex(tenant = 'All'): number {
  const match = /^Tenant ([1-5])$/.exec(tenant);
  return match ? Number(match[1]) : 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function hourNumber(hour: string): number {
  return parseInt(hour.slice(0, 2), 10);
}

function minuteNumber(hour: string): number {
  return parseInt(hour.slice(3, 5), 10) || 0;
}

function hourKey(hour: string): string {
  return `${hour.slice(0, 2)}:00`;
}

function seededUnit(...parts: Array<string | number>): number {
  let hash = 2166136261;
  const input = parts.join('|');
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function seededRange(min: number, max: number, ...parts: Array<string | number>): number {
  return min + seededUnit(...parts) * (max - min);
}

// -----------------------------------------------------------------------------
// 5.2 OMP Usage — hourly or minute buckets keyed by time label
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

type UsageValues = Omit<OmpUsagePoint, 'hour'>;

const INDIVIDUAL_TENANTS = [
  'Tenant 1',
  'Tenant 2',
  'Tenant 3',
  'Tenant 4',
  'Tenant 5',
] as const;

/**
 * Per-hour-of-day usage values. Hours 00-11 retain the original spec values
 * (preserved for visual continuity with prior screenshots); hours 12-23 model
 * a typical business-hours workload curve that peaks mid-afternoon and cools
 * down overnight without breaching the 80% warning threshold too often.
 */
const USAGE_BY_HOUR_OF_DAY: Record<string, UsageValues> = {
  '00:00': { cpuUsage: 54, memoryUsage: 34, cpuAverage: 49, memoryAverage: 28, totalCpu: 50, totalMemory: 82, warningThreshold: 80 },
  '01:00': { cpuUsage: 33, memoryUsage: 44, cpuAverage: 47, memoryAverage: 27, totalCpu: 48, totalMemory: 80, warningThreshold: 80 },
  '02:00': { cpuUsage: 71, memoryUsage: 29, cpuAverage: 51, memoryAverage: 35, totalCpu: 51, totalMemory: 81, warningThreshold: 80 },
  '03:00': { cpuUsage: 27, memoryUsage: 56, cpuAverage: 45, memoryAverage: 34, totalCpu: 45, totalMemory: 83, warningThreshold: 80 },
  '04:00': { cpuUsage: 32, memoryUsage: 45, cpuAverage: 47, memoryAverage: 25, totalCpu: 47, totalMemory: 82, warningThreshold: 80 },
  '05:00': { cpuUsage: 83, memoryUsage: 52, cpuAverage: 43, memoryAverage: 26, totalCpu: 52, totalMemory: 86, warningThreshold: 80 },
  '06:00': { cpuUsage: 55, memoryUsage: 36, cpuAverage: 44, memoryAverage: 31, totalCpu: 51, totalMemory: 84, warningThreshold: 80 },
  '07:00': { cpuUsage: 46, memoryUsage: 55, cpuAverage: 41, memoryAverage: 40, totalCpu: 49, totalMemory: 82, warningThreshold: 80 },
  '08:00': { cpuUsage: 64, memoryUsage: 42, cpuAverage: 54, memoryAverage: 35, totalCpu: 50, totalMemory: 83, warningThreshold: 80 },
  '09:00': { cpuUsage: 35, memoryUsage: 56, cpuAverage: 48, memoryAverage: 29, totalCpu: 47, totalMemory: 81, warningThreshold: 80 },
  '10:00': { cpuUsage: 33, memoryUsage: 46, cpuAverage: 54, memoryAverage: 37, totalCpu: 49, totalMemory: 80, warningThreshold: 80 },
  '11:00': { cpuUsage: 39, memoryUsage: 52, cpuAverage: 45, memoryAverage: 32, totalCpu: 48, totalMemory: 82, warningThreshold: 80 },
  '12:00': { cpuUsage: 67, memoryUsage: 49, cpuAverage: 50, memoryAverage: 38, totalCpu: 53, totalMemory: 84, warningThreshold: 80 },
  '13:00': { cpuUsage: 72, memoryUsage: 58, cpuAverage: 55, memoryAverage: 41, totalCpu: 56, totalMemory: 85, warningThreshold: 80 },
  '14:00': { cpuUsage: 78, memoryUsage: 61, cpuAverage: 57, memoryAverage: 44, totalCpu: 58, totalMemory: 86, warningThreshold: 80 },
  '15:00': { cpuUsage: 81, memoryUsage: 54, cpuAverage: 59, memoryAverage: 42, totalCpu: 57, totalMemory: 85, warningThreshold: 80 },
  '16:00': { cpuUsage: 69, memoryUsage: 50, cpuAverage: 56, memoryAverage: 39, totalCpu: 55, totalMemory: 83, warningThreshold: 80 },
  '17:00': { cpuUsage: 58, memoryUsage: 47, cpuAverage: 52, memoryAverage: 38, totalCpu: 52, totalMemory: 82, warningThreshold: 80 },
  '18:00': { cpuUsage: 49, memoryUsage: 41, cpuAverage: 48, memoryAverage: 36, totalCpu: 50, totalMemory: 81, warningThreshold: 80 },
  '19:00': { cpuUsage: 44, memoryUsage: 38, cpuAverage: 46, memoryAverage: 34, totalCpu: 48, totalMemory: 80, warningThreshold: 80 },
  '20:00': { cpuUsage: 41, memoryUsage: 36, cpuAverage: 45, memoryAverage: 33, totalCpu: 47, totalMemory: 80, warningThreshold: 80 },
  '21:00': { cpuUsage: 38, memoryUsage: 33, cpuAverage: 44, memoryAverage: 31, totalCpu: 46, totalMemory: 80, warningThreshold: 80 },
  '22:00': { cpuUsage: 36, memoryUsage: 31, cpuAverage: 43, memoryAverage: 30, totalCpu: 45, totalMemory: 79, warningThreshold: 80 },
  '23:00': { cpuUsage: 41, memoryUsage: 35, cpuAverage: 44, memoryAverage: 30, totalCpu: 47, totalMemory: 80, warningThreshold: 80 },
};

/**
 * Materialise the OMP usage series for a rolling 24h window ending at
 * `baseDate`. The returned list is ordered chronologically (oldest first).
 */
export function getOmpUsageByHour(
  baseDate: Date,
  rangeHours = 24,
  tenant = 'All',
): OmpUsagePoint[] {
  return getHours(baseDate, rangeHours).map(hour => ({
    hour,
    ...getTenantUsageValues(hour, tenant),
  }));
}

export interface TenantUsageRank {
  tenant: string;
  cpuUsage: number;
  memoryUsage: number;
}

export interface TopTenantUsage {
  cpu: TenantUsageRank[];
  memory: TenantUsageRank[];
}

export function getTopTenantUsageByHour(
  hour: Hour,
  limit = 5,
): TopTenantUsage {
  const usageByTenant = INDIVIDUAL_TENANTS.map(tenant => {
    const usage = getTenantUsageValues(hour, tenant);
    return {
      tenant,
      cpuUsage: usage.cpuUsage,
      memoryUsage: usage.memoryUsage,
    };
  });

  return {
    cpu: [...usageByTenant]
      .sort((a, b) => b.cpuUsage - a.cpuUsage || a.tenant.localeCompare(b.tenant))
      .slice(0, limit),
    memory: [...usageByTenant]
      .sort((a, b) => b.memoryUsage - a.memoryUsage || a.tenant.localeCompare(b.tenant))
      .slice(0, limit),
  };
}

function getTenantUsageValues(hour: string, tenant: string): UsageValues {
  const base = USAGE_BY_HOUR_OF_DAY[hourKey(hour)];
  const idx = tenantIndex(tenant);
  const h = hourNumber(hour);
  const m = minuteNumber(hour);
  const phase = seededRange(0, Math.PI * 2, tenant, h, 'phase');
  const minuteWave = Math.sin((m / 59) * Math.PI * 3 + phase) * 7
    + Math.sin((m / 59) * Math.PI * 9 + phase / 2) * 3
    + seededRange(-5, 5, tenant, h, m, 'cpu-noise');
  const minuteMemoryWave = Math.cos((m / 59) * Math.PI * 2.5 + phase) * 6
    + Math.sin((m / 59) * Math.PI * 7 + phase) * 2
    + seededRange(-4, 4, tenant, h, m, 'mem-noise');
  const spike = seededUnit(tenant, h, m, 'usage-spike') > 0.92
    ? seededRange(6, 14, tenant, h, m, 'usage-spike-size')
    : 0;
  const dip = seededUnit(tenant, h, m, 'usage-dip') > 0.94
    ? seededRange(5, 12, tenant, h, m, 'usage-dip-size')
    : 0;

  if (idx === 0) {
    return {
      ...base,
      cpuUsage: clamp(Math.round(base.cpuUsage + minuteWave + spike - dip), 12, 94),
      memoryUsage: clamp(Math.round(base.memoryUsage + minuteMemoryWave + spike / 2 - dip / 2), 10, 90),
    };
  }

  const cpuWave = seededRange(-7, 7, tenant, h, m, 'tenant-cpu')
    + Math.sin((h + m / 60 + idx) * 1.7) * 5;
  const memoryWave = seededRange(-6, 6, tenant, h, m, 'tenant-memory')
    + Math.cos((h + m / 60 + idx) * 1.3) * 4;
  const cpuUsage = clamp(
    Math.round(base.cpuUsage * (0.76 + idx * 0.07) + cpuWave + idx * 2 + spike - dip),
    12,
    94,
  );
  const memoryUsage = clamp(
    Math.round(base.memoryUsage * (0.80 + idx * 0.05) + memoryWave + idx * 2 + spike / 2 - dip / 2),
    10,
    90,
  );

  return {
    cpuUsage,
    memoryUsage,
    cpuAverage: clamp(Math.round(cpuUsage * (0.70 + idx * 0.03)), 10, 88),
    memoryAverage: clamp(Math.round(memoryUsage * (0.66 + idx * 0.035)), 10, 86),
    totalCpu: clamp(Math.round(base.totalCpu * (0.88 + idx * 0.035) + cpuWave / 2), 20, 95),
    totalMemory: clamp(Math.round(base.totalMemory * (0.86 + idx * 0.025) + memoryWave / 2), 30, 96),
    warningThreshold: 80,
  };
}

// -----------------------------------------------------------------------------
// 5.3 Event Summary — hourly or minute buckets keyed by time label
// -----------------------------------------------------------------------------

export interface EventSummaryPoint {
  hour: Hour;
  controlConnectionStateChange: number;
  ompPeerStateChange: number;
  policyChange: number;
}

type EventCounts = Omit<EventSummaryPoint, 'hour'>;

const ALL_TENANTS_EVENT_SUMMARY_BY_HOUR_OF_DAY: Record<string, EventCounts> = {
  '00:00': { controlConnectionStateChange:  610, ompPeerStateChange:  670, policyChange:  700 },
  '01:00': { controlConnectionStateChange:  240, ompPeerStateChange:  260, policyChange:  260 },
  '02:00': { controlConnectionStateChange:  480, ompPeerStateChange:  510, policyChange:  490 },
  '03:00': { controlConnectionStateChange:  160, ompPeerStateChange:  180, policyChange:  180 },
  '04:00': { controlConnectionStateChange:  760, ompPeerStateChange:  800, policyChange:  820 },
  '05:00': { controlConnectionStateChange: 1120, ompPeerStateChange: 1160, policyChange: 1140 },
  '06:00': { controlConnectionStateChange:  410, ompPeerStateChange:  430, policyChange:  440 },
  '07:00': { controlConnectionStateChange:  100, ompPeerStateChange:  110, policyChange:  110 },
  '08:00': { controlConnectionStateChange:  270, ompPeerStateChange:  300, policyChange:  310 },
  '09:00': { controlConnectionStateChange:  190, ompPeerStateChange:  220, policyChange:  230 },
  '10:00': { controlConnectionStateChange:  540, ompPeerStateChange:  580, policyChange:  600 },
  '11:00': { controlConnectionStateChange:   55, ompPeerStateChange:   60, policyChange:   65 },
  '12:00': { controlConnectionStateChange:  190, ompPeerStateChange:  210, policyChange:  220 },
  '13:00': { controlConnectionStateChange:  360, ompPeerStateChange:  390, policyChange:  410 },
  '14:00': { controlConnectionStateChange:  900, ompPeerStateChange:  960, policyChange:  980 },
  '15:00': { controlConnectionStateChange:  680, ompPeerStateChange:  720, policyChange:  740 },
  '16:00': { controlConnectionStateChange: 1160, ompPeerStateChange: 1190, policyChange: 1210 },
  '17:00': { controlConnectionStateChange:  130, ompPeerStateChange:  140, policyChange:  150 },
  '18:00': { controlConnectionStateChange:  290, ompPeerStateChange:  320, policyChange:  320 },
  '19:00': { controlConnectionStateChange:  850, ompPeerStateChange:  900, policyChange:  930 },
  '20:00': { controlConnectionStateChange:  370, ompPeerStateChange:  390, policyChange:  420 },
  '21:00': { controlConnectionStateChange:   80, ompPeerStateChange:   90, policyChange:   90 },
  '22:00': { controlConnectionStateChange:  160, ompPeerStateChange:  175, policyChange:  185 },
  '23:00': { controlConnectionStateChange:  420, ompPeerStateChange:  450, policyChange:  470 },
};

const TENANT_1_EVENT_SUMMARY_BY_HOUR_OF_DAY: Record<string, EventCounts> = {
  '00:00': { controlConnectionStateChange: 190, ompPeerStateChange: 210, policyChange: 220 },
  '01:00': { controlConnectionStateChange:  70, ompPeerStateChange:  80, policyChange:  90 },
  '02:00': { controlConnectionStateChange: 160, ompPeerStateChange: 170, policyChange: 180 },
  '03:00': { controlConnectionStateChange:  55, ompPeerStateChange:  60, policyChange:  65 },
  '04:00': { controlConnectionStateChange: 270, ompPeerStateChange: 280, policyChange: 290 },
  '05:00': { controlConnectionStateChange: 310, ompPeerStateChange: 320, policyChange: 330 },
  '06:00': { controlConnectionStateChange: 140, ompPeerStateChange: 155, policyChange: 165 },
  '07:00': { controlConnectionStateChange:  35, ompPeerStateChange:  40, policyChange:  45 },
  '08:00': { controlConnectionStateChange: 105, ompPeerStateChange: 120, policyChange: 125 },
  '09:00': { controlConnectionStateChange:  85, ompPeerStateChange:  95, policyChange: 100 },
  '10:00': { controlConnectionStateChange: 220, ompPeerStateChange: 240, policyChange: 250 },
  '11:00': { controlConnectionStateChange:  28, ompPeerStateChange:  32, policyChange:  35 },
  '12:00': { controlConnectionStateChange:  90, ompPeerStateChange: 100, policyChange: 110 },
  '13:00': { controlConnectionStateChange: 130, ompPeerStateChange: 145, policyChange: 155 },
  '14:00': { controlConnectionStateChange: 240, ompPeerStateChange: 255, policyChange: 265 },
  '15:00': { controlConnectionStateChange: 210, ompPeerStateChange: 230, policyChange: 240 },
  '16:00': { controlConnectionStateChange: 295, ompPeerStateChange: 305, policyChange: 320 },
  '17:00': { controlConnectionStateChange:  65, ompPeerStateChange:  70, policyChange:  75 },
  '18:00': { controlConnectionStateChange: 120, ompPeerStateChange: 130, policyChange: 140 },
  '19:00': { controlConnectionStateChange: 260, ompPeerStateChange: 275, policyChange: 285 },
  '20:00': { controlConnectionStateChange: 170, ompPeerStateChange: 190, policyChange: 200 },
  '21:00': { controlConnectionStateChange:  42, ompPeerStateChange:  48, policyChange:  50 },
  '22:00': { controlConnectionStateChange:  78, ompPeerStateChange:  88, policyChange:  94 },
  '23:00': { controlConnectionStateChange: 145, ompPeerStateChange: 155, policyChange: 170 },
};

const INDIVIDUAL_TENANT_BASE_EVENT_SUMMARY_BY_HOUR_OF_DAY: Record<string, EventCounts> = {
  '00:00': { controlConnectionStateChange: 18, ompPeerStateChange: 14, policyChange: 21 },
  '01:00': { controlConnectionStateChange:  9, ompPeerStateChange: 16, policyChange:  5 },
  '02:00': { controlConnectionStateChange: 21, ompPeerStateChange: 13, policyChange: 18 },
  '03:00': { controlConnectionStateChange:  7, ompPeerStateChange: 10, policyChange: 24 },
  '04:00': { controlConnectionStateChange: 19, ompPeerStateChange:  5, policyChange: 22 },
  '05:00': { controlConnectionStateChange: 16, ompPeerStateChange: 25, policyChange: 27 }, // dramatic peak
  '06:00': { controlConnectionStateChange: 22, ompPeerStateChange: 13, policyChange: 10 },
  '07:00': { controlConnectionStateChange: 10, ompPeerStateChange:  6, policyChange:  5 },
  '08:00': { controlConnectionStateChange:  5, ompPeerStateChange: 23, policyChange: 11 },
  '09:00': { controlConnectionStateChange:  5, ompPeerStateChange:  6, policyChange: 26 },
  '10:00': { controlConnectionStateChange: 21, ompPeerStateChange: 12, policyChange: 19 },
  '11:00': { controlConnectionStateChange:  7, ompPeerStateChange:  8, policyChange:  5 },
  '12:00': { controlConnectionStateChange: 14, ompPeerStateChange: 11, policyChange: 16 },
  '13:00': { controlConnectionStateChange: 17, ompPeerStateChange: 19, policyChange: 22 },
  '14:00': { controlConnectionStateChange: 11, ompPeerStateChange: 14, policyChange: 18 },
  '15:00': { controlConnectionStateChange: 24, ompPeerStateChange: 16, policyChange: 13 },
  '16:00': { controlConnectionStateChange: 19, ompPeerStateChange: 21, policyChange: 25 },
  '17:00': { controlConnectionStateChange:  9, ompPeerStateChange: 12, policyChange:  7 },
  '18:00': { controlConnectionStateChange:  6, ompPeerStateChange:  8, policyChange: 11 },
  '19:00': { controlConnectionStateChange: 13, ompPeerStateChange:  5, policyChange: 17 },
  '20:00': { controlConnectionStateChange:  8, ompPeerStateChange:  7, policyChange:  6 },
  '21:00': { controlConnectionStateChange:  5, ompPeerStateChange:  9, policyChange:  4 },
  '22:00': { controlConnectionStateChange: 11, ompPeerStateChange:  6, policyChange:  8 },
  '23:00': { controlConnectionStateChange: 15, ompPeerStateChange: 10, policyChange: 12 },
};

export function getEventSummaryByHour(
  baseDate: Date,
  rangeHours = 24,
  tenant = 'All',
): EventSummaryPoint[] {
  return getHours(baseDate, rangeHours).map(hour => ({
    hour,
    ...getTenantEventCounts(hour, tenant, getMinuteBucketStep(rangeHours) !== null),
  }));
}

function getTenantEventCounts(hour: string, tenant: string, minuteGranularity = false): EventCounts {
  const idx = tenantIndex(tenant);
  const base = eventProfileForTenant(hour, idx);
  const h = hourNumber(hour);
  const m = minuteNumber(hour);

  if (minuteGranularity) {
    return getMinuteEventCounts(base, h, m, idx);
  }

  if (idx === 0 || idx === 1) return base;

  const variant = TENANT_EVENT_VARIANTS[idx - 1];
  return {
    controlConnectionStateChange: tenantCount(
      base.controlConnectionStateChange,
      variant.control,
      h,
      idx,
      1,
    ),
    ompPeerStateChange: tenantCount(
      base.ompPeerStateChange,
      variant.omp,
      h,
      idx,
      2,
    ),
    policyChange: tenantCount(
      base.policyChange,
      variant.policy,
      h,
      idx,
      3,
    ),
  };
}

function eventProfileForTenant(hour: string, tenant: number): EventCounts {
  if (tenant === 0) return ALL_TENANTS_EVENT_SUMMARY_BY_HOUR_OF_DAY[hourKey(hour)];
  if (tenant === 1) return TENANT_1_EVENT_SUMMARY_BY_HOUR_OF_DAY[hourKey(hour)];
  return INDIVIDUAL_TENANT_BASE_EVENT_SUMMARY_BY_HOUR_OF_DAY[hourKey(hour)];
}

function getMinuteEventCounts(base: EventCounts, hour: number, minute: number, tenant: number): EventCounts {
  const scale = tenant === 0 ? 1 : 0.7 + tenant * 0.12;
  return {
    controlConnectionStateChange: minuteCount(base.controlConnectionStateChange, hour, minute, tenant, 1, scale),
    ompPeerStateChange: minuteCount(base.ompPeerStateChange, hour, minute, tenant, 2, scale),
    policyChange: minuteCount(base.policyChange, hour, minute, tenant, 3, scale),
  };
}

const TENANT_EVENT_VARIANTS = [
  { control: 0.42, omp: 0.28, policy: 0.35 },
  { control: 0.30, omp: 0.50, policy: 0.26 },
  { control: 0.55, omp: 0.24, policy: 0.31 },
  { control: 0.26, omp: 0.34, policy: 0.58 },
  { control: 0.38, omp: 0.44, policy: 0.43 },
] as const;

function tenantCount(base: number, factor: number, hour: number, tenant: number, salt: number): number {
  const wave = Math.sin((hour + tenant * 2 + salt) * 1.35) * 3
    + seededRange(-4, 4, tenant, hour, salt, 'event-hour');
  const spike = seededUnit(tenant, hour, salt, 'event-hour-spike') > 0.82
    ? seededRange(4, 10, tenant, hour, salt, 'event-hour-spike-size')
    : 0;
  return Math.max(1, Math.round(base * factor + wave + spike));
}

function minuteCount(
  base: number,
  hour: number,
  minute: number,
  tenant: number,
  salt: number,
  scale: number,
): number {
  const trend = Math.sin((minute / 59) * Math.PI * (2 + salt) + tenant + salt) * 2.4;
  const jitter = seededRange(-2.2, 2.8, tenant, hour, minute, salt, 'minute-event');
  const spike = seededUnit(tenant, hour, minute, salt, 'minute-event-spike') > 0.88
    ? seededRange(3, 8, tenant, hour, minute, salt, 'minute-event-spike-size')
    : 0;
  const valley = seededUnit(tenant, hour, minute, salt, 'minute-event-valley') > 0.90
    ? seededRange(1, 3, tenant, hour, minute, salt, 'minute-event-valley-size')
    : 0;
  return Math.max(1, Math.round((base / 10) * scale + trend + jitter + spike - valley));
}

// -----------------------------------------------------------------------------
// 5.4 Mock Database — seeded fake rows matching Event chart counts
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

export interface GenerateOptions {
  /** Number of trailing hours to materialise. Defaults to 24. */
  rangeHours?: number;
  /** Selected tenant. "All" preserves the aggregate data view. */
  tenant?: string;
  /** RNG seed; defaults to deterministic 0xC1500. */
  seed?: number;
}

/**
 * Generate mock log rows whose per-hour event-type counts exactly match the
 * Event chart for the selected tenant and rolling window. Times are stamped on
 * the actual calendar date the rolling-window hour belongs to (today or
 * yesterday), so rows in the early labels carry yesterday's date when the
 * window crosses midnight.
 */
export function generateMockLogRows(
  baseDate: Date,
  { rangeHours = 24, tenant = 'All', seed = 0xc1500 }: GenerateOptions = {},
): MockLogRow[] {
  const idx = tenantIndex(tenant);
  const rand = mulberry32(seed + idx * 0x1000 + rangeHours);
  const rows: MockLogRow[] = [];
  let rowIndex = 0;

  for (const hour of getHours(baseDate, rangeHours)) {
    const minuteStep = getMinuteBucketStep(rangeHours);
    const summary = getTenantEventCounts(hour, tenant, minuteStep !== null);
    const split: Record<EventTypeName, number> = {
      [EVENT_TYPES.CONTROL_CONNECTION]: summary.controlConnectionStateChange,
      [EVENT_TYPES.POLICY_CHANGE]: summary.policyChange,
      [EVENT_TYPES.OMP_PEER_STATE]: summary.ompPeerStateChange,
    };
    const hourAnchor = resolveHourDate(baseDate, hour);

    const hourRows: MockLogRow[] = [];
    for (const eventName of EVENT_TYPE_ORDER) {
      const count = split[eventName];
      for (let i = 0; i < count; i++) {
        // Hourly buckets spread rows across the hour. Minute buckets keep rows
        // inside that exact minute so table filtering matches the chart bucket.
        const offsetMin = minuteStep ? minuteNumber(hour) : Math.floor(rand() * 60);
        const eventTime = new Date(hourAnchor);
        eventTime.setMinutes(offsetMin, 0, 0);

        const systemIp  = SYSTEM_IP_POOL [Math.floor(rand() * SYSTEM_IP_POOL.length)];
        const hostname  = HOSTNAME_POOL [Math.floor(rand() * HOSTNAME_POOL.length)];
        const siteName  = SITE_NAME_POOL[Math.floor(rand() * SITE_NAME_POOL.length)];
        const routesS   = ROUTES_SENT_POOL    [Math.floor(rand() * ROUTES_SENT_POOL.length)];
        const routesR   = ROUTES_RECEIVED_POOL[Math.floor(rand() * ROUTES_RECEIVED_POOL.length)];
        const peersN    = PEERS_POOL          [Math.floor(rand() * PEERS_POOL.length)];

        rowIndex += 1;
        hourRows.push({
          id: `log-t${idx}-${String(rowIndex).padStart(4, '0')}`,
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

// Re-export the static hour-of-day list for callers that need the full
// vocabulary (e.g. validation or test fixtures) independent of a baseDate.
export { ALL_HOURS_OF_DAY };
