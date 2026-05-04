/**
 * Composes Zone A (OMP usage), Zone B (Event chart), and Zone C
 * (filter bar + table) under a single OmpStateProvider so every interaction
 * shares one source of truth.
 *
 * This component is mounted from `App.tsx` in place of the original static
 * Chart / Chart2 / Table sections — the surrounding chrome (page header,
 * navigation, breadcrumbs, tabs) is left untouched.
 */

import { OmpStateProvider } from './state';
import { OmpUsageChart } from './OmpUsageChart';
import { EventBarChart } from './EventBarChart';
import { FilterBar } from './FilterBar';
import { EventTable } from './EventTable';

export function OmpStatistics() {
  return (
    <OmpStateProvider>
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
    </OmpStateProvider>
  );
}
