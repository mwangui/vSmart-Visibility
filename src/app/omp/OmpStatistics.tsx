/**
 * Composes Zone A (OMP usage), Zone B (Event chart), and Zone C
 * (filter bar + table). The surrounding page provides the shared OMP state so
 * the top time/tenant selects and these zones read from one source of truth.
 *
 * This component is mounted from `App.tsx` in place of the original static
 * Chart / Chart2 / Table sections — the surrounding chrome (page header,
 * navigation, breadcrumbs, tabs) is left untouched.
 */

import { OmpUsageChart } from './OmpUsageChart';
import { EventBarChart } from './EventBarChart';
import { FilterBar } from './FilterBar';
import { EventTable } from './EventTable';

export function OmpStatistics() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: '100%',
      }}
    >
      <OmpUsageChart />

      <div
        aria-hidden
        style={{
          height: 1,
          width: '100%',
          background: 'var(--color-border-primary)',
        }}
      />

      <EventBarChart />

      <div
        aria-hidden
        style={{
          height: 1,
          width: '100%',
          background: 'var(--color-border-primary)',
        }}
      />

      <FilterBar />
      <EventTable />
    </div>
  );
}
