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

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOmp, type SortableColumn } from './state';
import type { MockLogRow } from './data';
import { DeviceDetailsModal } from './DeviceDetailsModal';

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

  // ── Row-level action menu (kebab) state ──────────────────────────────────
  // `openMenuRowId` tracks which row's "⋯" popover is currently shown. The
  // matching kebab button uses this to render its blue active background.
  // `modalRow` tracks which row's full Device-details modal is open. Both are
  // null when the table is in its idle, default state.
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [modalRow, setModalRow] = useState<MockLogRow | null>(null);

  // Outside-click closes any open kebab popover. Listening on `mousedown`
  // (rather than `click`) keeps the close from racing against the kebab
  // button's own click handler when the user toggles the same kebab.
  useEffect(() => {
    if (openMenuRowId === null) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-row-action-menu]')) return;
      setOpenMenuRowId(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenuRowId]);

  // Escape closes the popover if it is open. The modal handles its own Esc
  // separately (see DeviceDetailsModal) so the two don't fight.
  useEffect(() => {
    if (openMenuRowId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenuRowId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openMenuRowId]);

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
                              verticalAlign: 'top',
                              position: 'relative',
                              overflow: 'visible',
                            }}
                          >
                            <RowActionMenu
                              row={row}
                              isOpen={openMenuRowId === row.id}
                              onToggle={() =>
                                setOpenMenuRowId(prev =>
                                  prev === row.id ? null : row.id,
                                )
                              }
                              onSelectDeviceDetails={() => {
                                setOpenMenuRowId(null);
                                setModalRow(row);
                              }}
                            />
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

      {modalRow ? (
        <DeviceDetailsModal
          row={modalRow}
          onClose={() => {
            // Closing the modal must also clear any leftover kebab-active
            // state per spec; openMenuRowId is already cleared when we open
            // the modal, but we re-clear here defensively.
            setModalRow(null);
            setOpenMenuRowId(null);
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * Per-row "⋯" kebab + popover that exposes the row-level Device-details
 * action. Active state (blue background on the kebab + visible popover) is
 * driven entirely by props so the parent table owns the open-row identity.
 */
interface RowActionMenuProps {
  row: MockLogRow;
  isOpen: boolean;
  onToggle: () => void;
  onSelectDeviceDetails: () => void;
}

function RowActionMenu({
  row,
  isOpen,
  onToggle,
  onSelectDeviceDetails,
}: RowActionMenuProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // popoverPos is null until we've measured the kebab. Re-measured when the
  // popover opens, on window resize, and on scroll (so it stays anchored as
  // the user scrolls the page or the table's horizontal scroll container).
  const [popoverPos, setPopoverPos] = useState<{ top: number; right: number } | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setPopoverPos(null);
      return;
    }
    const updatePos = () => {
      const el = buttonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    };
    updatePos();
    window.addEventListener('resize', updatePos);
    // capture-phase scroll listener catches scrolls from any ancestor
    // (including the table's overflow-x:auto wrapper).
    window.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isOpen]);

  // The wrapper + popover both carry the data attribute so the document-level
  // outside-click handler in EventTable can detect "click inside any kebab /
  // popover" without each instance needing a shared ref.
  return (
    <span
      data-row-action-menu
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Actions for row ${row.id}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        style={{
          width: 24,
          height: 24,
          padding: 0,
          border: 'none',
          // Active = subtle selected surface from design system tokens
          // (light-blue tint with mid-gray dots, per design spec).
          background: isOpen ? 'var(--color-bg-selected)' : 'transparent',
          borderRadius: 4,
          color: isOpen
            ? 'var(--color-icon-active)'
            : 'var(--color-icon-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 16,
          letterSpacing: 1,
          lineHeight: 1,
        }}
      >
        <span aria-hidden>⋯</span>
      </button>

      {isOpen && popoverPos
        ? createPortal(
            <div
              role="menu"
              data-row-action-menu
              style={{
                position: 'fixed',
                top: popoverPos.top,
                right: popoverPos.right,
                minWidth: 140,
                background: 'var(--color-bg-primary)',
                // Stronger 1px outline (#889099) per design spec — matches
                // the existing --color-border-secondary token.
                border: '1px solid var(--color-border-secondary)',
                borderRadius: 4,
                boxShadow: '0 4px 10px rgba(0,0,0,0.10)',
                zIndex: 200, // matches --z-index-popover
                padding: '4px 0',
                fontFamily: 'var(--font-family-primary)',
              }}
            >
              <button
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDeviceDetails();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'var(--color-bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: 13,
                  fontFamily: 'var(--font-family-primary)',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Device details
              </button>
            </div>,
            document.body,
          )
        : null}
    </span>
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
