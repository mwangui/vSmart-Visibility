/**
 * Single source-of-truth state container for the OMP Statistics page (§6).
 *
 * One context, one reducer, one filter pipeline. Every chart/table/dropdown
 * reads and dispatches against this — no per-component state allowed.
 */
import {
  createContext, useContext, useMemo, useReducer, useEffect,
  type Dispatch, type ReactNode,
} from 'react';
import {
  EVENT_TYPE_ORDER,
  type EventTypeName,
  type EventSummaryPoint,
  type Hour,
  type MockLogRow,
  type OmpUsagePoint,
  generateMockLogRows,
  getEventSummaryByHour,
  getHours,
  getOmpUsageByHour,
} from './data';

export type SortableColumn =
  | 'eventTime'
  | 'systemIp'
  | 'hostname'
  | 'siteName'
  | 'eventName'
  | 'details'
  | 'routesSent'
  | 'routesReceived'
  | 'peers';

export type SortDirection = 'asc' | 'desc';

export interface OmpState {
  baseDate: Date;
  selectedHour: Hour | null;          // null = full 24-hour range
  searchKeyword: string;
  selectedSystemIps: Set<string>;
  selectedSiteNames: Set<string>;
  selectedEventTypes: Set<EventTypeName>;
  currentPage: number;
  rowsPerPage: number;
  sortBy: SortableColumn;
  sortDirection: SortDirection;
}

export type OmpAction =
  | { type: 'SET_SELECTED_HOUR'; hour: Hour | null }
  | { type: 'TOGGLE_SELECTED_HOUR'; hour: Hour }
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'TOGGLE_SYSTEM_IP'; value: string }
  | { type: 'CLEAR_SYSTEM_IPS' }
  | { type: 'TOGGLE_SITE_NAME'; value: string }
  | { type: 'CLEAR_SITE_NAMES' }
  | { type: 'TOGGLE_EVENT_TYPE'; value: EventTypeName }
  | { type: 'CLEAR_EVENT_TYPES' }
  | { type: 'CLEAR_ALL_FILTERS' }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SET_ROWS_PER_PAGE'; value: number }
  | { type: 'SET_SORT'; column: SortableColumn };

function initialState(baseDate: Date): OmpState {
  return {
    baseDate,
    selectedHour: null,
    searchKeyword: '',
    selectedSystemIps: new Set<string>(),
    selectedSiteNames: new Set<string>(),
    selectedEventTypes: new Set<EventTypeName>(),
    currentPage: 1,
    rowsPerPage: 10,
    sortBy: 'eventTime',
    sortDirection: 'asc',
  };
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function reducer(state: OmpState, action: OmpAction): OmpState {
  switch (action.type) {
    case 'SET_SELECTED_HOUR':
      return { ...state, selectedHour: action.hour, currentPage: 1 };

    case 'TOGGLE_SELECTED_HOUR':
      return {
        ...state,
        selectedHour: state.selectedHour === action.hour ? null : action.hour,
        currentPage: 1,
      };

    case 'SET_SEARCH':
      return { ...state, searchKeyword: action.value, currentPage: 1 };

    case 'TOGGLE_SYSTEM_IP':
      return {
        ...state,
        selectedSystemIps: toggleInSet(state.selectedSystemIps, action.value),
        currentPage: 1,
      };
    case 'CLEAR_SYSTEM_IPS':
      return { ...state, selectedSystemIps: new Set(), currentPage: 1 };

    case 'TOGGLE_SITE_NAME':
      return {
        ...state,
        selectedSiteNames: toggleInSet(state.selectedSiteNames, action.value),
        currentPage: 1,
      };
    case 'CLEAR_SITE_NAMES':
      return { ...state, selectedSiteNames: new Set(), currentPage: 1 };

    case 'TOGGLE_EVENT_TYPE':
      return {
        ...state,
        selectedEventTypes: toggleInSet(state.selectedEventTypes, action.value),
        currentPage: 1,
      };
    case 'CLEAR_EVENT_TYPES':
      return { ...state, selectedEventTypes: new Set(), currentPage: 1 };

    case 'CLEAR_ALL_FILTERS':
      return {
        ...state,
        searchKeyword: '',
        selectedSystemIps: new Set(),
        selectedSiteNames: new Set(),
        selectedEventTypes: new Set(),
        selectedHour: null,
        currentPage: 1,
      };

    case 'SET_PAGE':
      return { ...state, currentPage: Math.max(1, action.page) };

    case 'SET_ROWS_PER_PAGE':
      return { ...state, rowsPerPage: action.value, currentPage: 1 };

    case 'SET_SORT': {
      if (state.sortBy === action.column) {
        return {
          ...state,
          sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
        };
      }
      return { ...state, sortBy: action.column, sortDirection: 'asc' };
    }

    default:
      return state;
  }
}

interface OmpContextValue {
  state: OmpState;
  dispatch: Dispatch<OmpAction>;
  /** Rolling 24h hour-label list (chronological, oldest first). */
  hours: readonly string[];
  /** OMP usage series materialised for the rolling 24h window. */
  ompUsageByHour: OmpUsagePoint[];
  /** Event summary series materialised for the rolling 24h window. */
  eventSummaryByHour: EventSummaryPoint[];
  /** All 200 mock rows; stable across renders for a given baseDate. */
  allRows: MockLogRow[];
  /** Pipeline result: filtered + sorted rows (pre-pagination). */
  filteredRows: MockLogRow[];
  /** Page slice of filteredRows. */
  pageRows: MockLogRow[];
  /** Total count after filters (drives "X of N" footer + pagination). */
  totalCount: number;
}

const OmpContext = createContext<OmpContextValue | null>(null);

interface OmpStateProviderProps {
  children: ReactNode;
  baseDate?: Date;
}

export function OmpStateProvider({ children, baseDate }: OmpStateProviderProps) {
  const anchor = useMemo(() => baseDate ?? new Date(), [baseDate]);
  const [state, dispatch] = useReducer(reducer, anchor, initialState);

  // Rolling 24h derived data — computed once per anchor and shared via
  // context so the chart, table, label, and PDF export all read from one
  // materialised list rather than re-deriving from `getHours(anchor)` on
  // every render.
  const hours = useMemo(() => getHours(anchor), [anchor]);
  const ompUsageByHour = useMemo(() => getOmpUsageByHour(anchor), [anchor]);
  const eventSummaryByHour = useMemo(
    () => getEventSummaryByHour(anchor),
    [anchor],
  );

  const allRows = useMemo(
    () => generateMockLogRows(anchor),
    [anchor],
  );

  const filteredRows = useMemo(
    () => runFilterPipeline(allRows, state),
    [allRows, state],
  );

  const totalCount = filteredRows.length;

  // Auto-correct page if filter shrinks the result set below current page.
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(totalCount / state.rowsPerPage));
    if (state.currentPage > maxPage) {
      dispatch({ type: 'SET_PAGE', page: maxPage });
    }
  }, [totalCount, state.rowsPerPage, state.currentPage]);

  const pageRows = useMemo(() => {
    const start = (state.currentPage - 1) * state.rowsPerPage;
    return filteredRows.slice(start, start + state.rowsPerPage);
  }, [filteredRows, state.currentPage, state.rowsPerPage]);

  const value: OmpContextValue = {
    state,
    dispatch,
    hours,
    ompUsageByHour,
    eventSummaryByHour,
    allRows,
    filteredRows,
    pageRows,
    totalCount,
  };

  return <OmpContext.Provider value={value}>{children}</OmpContext.Provider>;
}

export function useOmp(): OmpContextValue {
  const ctx = useContext(OmpContext);
  if (!ctx) throw new Error('useOmp must be used inside <OmpStateProvider>');
  return ctx;
}

// -----------------------------------------------------------------------------
// 7. Filter pipeline (single source of truth)
// -----------------------------------------------------------------------------

function compareBy(a: MockLogRow, b: MockLogRow, by: SortableColumn): number {
  switch (by) {
    case 'eventTime':
      return a.eventTime.getTime() - b.eventTime.getTime();
    case 'routesSent':
    case 'routesReceived':
    case 'peers':
      return (a[by] as number) - (b[by] as number);
    default:
      return String(a[by]).localeCompare(String(b[by]));
  }
}

export function runFilterPipeline(
  rows: MockLogRow[],
  state: OmpState,
): MockLogRow[] {
  let out = rows;

  if (state.selectedHour) {
    out = out.filter(r => r.hour === state.selectedHour);
  }

  const kw = state.searchKeyword.trim().toLowerCase();
  if (kw) {
    out = out.filter(r => {
      const haystack = [
        r.eventTimeLabel, r.systemIp, r.hostname, r.siteName,
        r.eventName, r.details,
        String(r.routesSent), String(r.routesReceived), String(r.peers),
      ];
      return haystack.some(v => v.toLowerCase().includes(kw));
    });
  }

  if (state.selectedSystemIps.size > 0) {
    out = out.filter(r => state.selectedSystemIps.has(r.systemIp));
  }
  if (state.selectedSiteNames.size > 0) {
    out = out.filter(r => state.selectedSiteNames.has(r.siteName));
  }
  if (state.selectedEventTypes.size > 0) {
    out = out.filter(r => state.selectedEventTypes.has(r.eventName));
  }

  const dir = state.sortDirection === 'asc' ? 1 : -1;
  // Use a stable copy + tie-break on id so sort is deterministic.
  out = [...out].sort((a, b) => {
    const primary = compareBy(a, b, state.sortBy);
    if (primary !== 0) return dir * primary;
    return a.id.localeCompare(b.id);
  });

  return out;
}

// Re-export for callers that want to render the dropdown order.
export { EVENT_TYPE_ORDER };
