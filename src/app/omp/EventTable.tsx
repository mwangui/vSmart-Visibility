/**
 * Zone C — Event log table (§10).
 *
 * Columns: Event time / System IP / Hostname / Site name / Event name /
 *          Details / Routes sent / Routes received / Peers / Actions
 *
 * - All non-Actions columns are sortable (click header → asc, again → desc).
 * - Actions column shows a trailing "…" icon as a visual placeholder (Q6).
 * - Empty state shows when `filteredRows.length === 0` (Q4).
 * - Footer: rows-per-page select + "X-Y of N" + page navigation.
 */

import { useOmp, type SortableColumn } from './state';
import type { MockLogRow } from './data';

interface ColumnDef {
  key: SortableColumn | 'actions';
  label: string;
  sortable: boolean;
  align?: 'right' | 'center';
  width?: number;
  /** When true, the cell content stays on a single line (no wrapping). */
  nowrap?: boolean;
  render?: (row: MockLogRow) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

// Column widths reclaimed (per latest spec): the Event-time column now keeps
// the full "May 04, 2026 12:31 AM" string on a single line, and the wide
// numeric / details columns trade away surplus padding so the overall table
// width stays aligned with the chart row above it.
const COLUMNS: ColumnDef[] = [
  { key: 'eventTime',      label: 'Event time',      sortable: true, width: 200,
    nowrap: true,
    render: r => r.eventTimeLabel },
  { key: 'systemIp',       label: 'System IP',       sortable: true, width: 100 },
  { key: 'hostname',       label: 'Hostname',        sortable: true, width: 110 },
  { key: 'siteName',       label: 'Site name',       sortable: true, width: 130 },
  { key: 'eventName',      label: 'Event name',      sortable: true, width: 220 },
  { key: 'details',        label: 'Details',         sortable: true, width: 300 },
  { key: 'routesSent',     label: 'Routes sent',     sortable: true, align: 'right', width: 90 },
  { key: 'routesReceived', label: 'Routes received', sortable: true, align: 'right', width: 105 },
  { key: 'peers',          label: 'Peers',           sortable: true, align: 'right', width: 64 },
  // Last column hosts the per-row "⋯" menu trigger and (in the header) the
  // table-level settings gear, per spec: "settings icon in the last column
  // header, above the row-level kebab".
  { key: 'actions',        label: '',                sortable: false, align: 'center',
    width: 48,
    renderHeader: () => <SettingsGear /> },
];

export function EventTable() {
  const { state, dispatch, pageRows, totalCount } = useOmp();
  const { currentPage, rowsPerPage, sortBy, sortDirection } = state;

  const start = totalCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end   = Math.min(totalCount, currentPage * rowsPerPage);
  const maxPage = Math.max(1, Math.ceil(totalCount / rowsPerPage));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          width: '100%',
          border: '1px solid var(--color-border-primary)',
          borderRadius: 8,
          overflow: 'hidden',
          background: 'var(--color-bg-primary)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 12,
              minWidth: 1180,
            }}
          >
            <thead>
              <tr style={{ background: 'var(--color-bg-tertiary)' }}>
                {COLUMNS.map(col => {
                  const isSorted = col.sortable && sortBy === col.key;
                  return (
                    <th
                      key={col.key}
                      style={{
                        textAlign: col.align ?? 'left',
                        padding: '10px 12px',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        borderBottom: '1px solid var(--color-border-primary)',
                        whiteSpace: 'nowrap',
                        width: col.width,
                        cursor: col.sortable
                          ? 'pointer'
                          : col.renderHeader ? 'default' : 'default',
                        userSelect: 'none',
                      }}
                      onClick={() => {
                        if (!col.sortable) return;
                        dispatch({ type: 'SET_SORT', column: col.key as SortableColumn });
                      }}
                      aria-sort={
                        isSorted
                          ? sortDirection === 'asc' ? 'ascending' : 'descending'
                          : 'none'
                      }
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: col.align === 'center'
                            ? 'center'
                            : col.align === 'right' ? 'flex-end' : 'flex-start',
                          gap: 4,
                          width: '100%',
                        }}
                      >
                        {col.renderHeader ? col.renderHeader() : col.label}
                        {col.sortable ? (
                          <SortIcon
                            direction={isSorted ? sortDirection : null}
                          />
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    style={{
                      padding: '40px 16px',
                      textAlign: 'center',
                      color: 'var(--color-text-secondary)',
                      fontSize: 14,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <strong style={{ color: 'var(--color-text-heading)' }}>
                        No results found
                      </strong>
                      <span>Try adjusting your filters or search query.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                pageRows.map(row => (
                  <tr
                    key={row.id}
                    style={{
                      borderTop: '1px solid var(--color-border-primary)',
                    }}
                  >
                    {COLUMNS.map(col => {
                      if (col.key === 'actions') {
                        return (
                          <td
                            key={col.key}
                            style={{
                              padding: '8px 12px',
                              textAlign: 'right',
                              color: 'var(--color-icon-primary)',
                            }}
                          >
                            <span aria-hidden style={{ fontSize: 16, letterSpacing: 1 }}>
                              ⋯
                            </span>
                          </td>
                        );
                      }
                      const value = col.render
                        ? col.render(row)
                        : (row[col.key as keyof MockLogRow] as React.ReactNode);
                      return (
                        <td
                          key={col.key}
                          style={{
                            padding: '8px 12px',
                            textAlign: col.align ?? 'left',
                            color: 'var(--color-text-primary)',
                            verticalAlign: 'top',
                            wordBreak: col.key === 'details' ? 'break-word' : 'normal',
                            whiteSpace: col.nowrap ? 'nowrap' : 'normal',
                          }}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={e =>
              dispatch({ type: 'SET_ROWS_PER_PAGE', value: parseInt(e.target.value, 10) })
            }
            style={{
              height: 28,
              padding: '0 6px',
              border: '1px solid var(--color-border-primary)',
              borderRadius: 4,
              fontSize: 12,
              fontFamily: 'var(--font-family-primary)',
              color: 'var(--color-text-primary)',
              background: 'var(--color-bg-primary)',
            }}
          >
            {[10, 25, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
          {start}-{end} of {totalCount}
        </span>

        <PageNav
          currentPage={currentPage}
          maxPage={maxPage}
          onChange={page => dispatch({ type: 'SET_PAGE', page })}
        />
      </div>
    </div>
  );
}

/**
 * Column-customisation gear, rendered inside the last `<th>` (above the
 * row-level "⋯" kebab). Wired as a button so keyboard/AX users can reach it;
 * actual flyout is out of scope for this iteration.
 */
function SettingsGear() {
  return (
    <button
      type="button"
      aria-label="Customize columns"
      title="Customize columns"
      onClick={(e) => {
        e.stopPropagation(); // don't trigger column sort
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 0,
        border: 'none',
        background: 'transparent',
        color: 'var(--color-icon-primary)',
        cursor: 'pointer',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1l1 2 2 .5-.5 2L13 7l-2.5 1.5.5 2-2 .5L8 13l-1-2-2-.5.5-2L3 7l2.5-1.5L5 3.5l2-.5L8 1z"
          fill="none" stroke="currentColor" strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
      <path
        d="M5 1l3 4H2z"
        fill={direction === 'asc' ? 'var(--color-text-heading)' : 'var(--color-icon-tertiary)'}
      />
      <path
        d="M5 11l-3-4h6z"
        fill={direction === 'desc' ? 'var(--color-text-heading)' : 'var(--color-icon-tertiary)'}
      />
    </svg>
  );
}

interface PageNavProps {
  currentPage: number;
  maxPage: number;
  onChange: (page: number) => void;
}

function PageNav({ currentPage, maxPage, onChange }: PageNavProps) {
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= maxPage;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <PageButton
        disabled={prevDisabled}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path d="M6.5 1.5L3 5l3.5 3.5" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>

      <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
        Page {currentPage} / {maxPage}
      </span>

      <PageButton
        disabled={nextDisabled}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Next page"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path d="M3.5 1.5L7 5l-3.5 3.5" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>
    </div>
  );
}

interface PageButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
}

function PageButton({ disabled, onClick, children, ...rest }: PageButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      {...rest}
      style={{
        width: 28, height: 28,
        border: '1px solid var(--color-border-primary)',
        borderRadius: 4,
        background: 'var(--color-bg-primary)',
        color: disabled
          ? 'var(--color-icon-disabled)'
          : 'var(--color-text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}
