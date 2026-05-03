/**
 * Zone C — top filter bar (Search + System IP + Site name + Event type).
 * Wires every interaction to the shared OMP state via dispatch.
 */

import { MultiSelectChip } from './MultiSelectChip';
import { useOmp, EVENT_TYPE_ORDER } from './state';
import { distinctSiteNames, distinctSystemIps } from './data';

export function FilterBar() {
  const { state, dispatch, allRows } = useOmp();

  const systemIps = distinctSystemIps(allRows);
  const siteNames = distinctSiteNames(allRows);

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <SearchInput
        value={state.searchKeyword}
        onChange={v => dispatch({ type: 'SET_SEARCH', value: v })}
      />

      <MultiSelectChip
        label="System IP"
        options={systemIps}
        selected={state.selectedSystemIps}
        onToggle={v => dispatch({ type: 'TOGGLE_SYSTEM_IP', value: v })}
        onClear={() => dispatch({ type: 'CLEAR_SYSTEM_IPS' })}
        searchable
      />

      <MultiSelectChip
        label="Site name"
        options={siteNames}
        selected={state.selectedSiteNames}
        onToggle={v => dispatch({ type: 'TOGGLE_SITE_NAME', value: v })}
        onClear={() => dispatch({ type: 'CLEAR_SITE_NAMES' })}
      />

      <MultiSelectChip
        label="Event type"
        options={[...EVENT_TYPE_ORDER]}
        selected={state.selectedEventTypes as Set<string>}
        onToggle={v =>
          dispatch({
            type: 'TOGGLE_EVENT_TYPE',
            value: v as (typeof EVENT_TYPE_ORDER)[number],
          })
        }
        onClear={() => dispatch({ type: 'CLEAR_EVENT_TYPES' })}
      />

      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {hasAnyFilter(state) ? (
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLEAR_ALL_FILTERS' })}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-text-link)',
              cursor: 'pointer',
            }}
          >
            Clear all
          </button>
        ) : null}
      </div>
    </div>
  );
}

function hasAnyFilter(s: ReturnType<typeof useOmp>['state']): boolean {
  return (
    !!s.searchKeyword ||
    s.selectedSystemIps.size > 0 ||
    s.selectedSiteNames.size > 0 ||
    s.selectedEventTypes.size > 0 ||
    s.selectedHour !== null
  );
}

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 240,
        height: 34,
        background: 'var(--color-bg-primary)',
        border: '1px solid var(--color-text-muted)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden style={{ flexShrink: 0 }}>
        <circle cx="6" cy="6" r="4.5" fill="none"
                stroke="var(--color-icon-primary)" strokeWidth="1.5" />
        <path d="M9.5 9.5l3 3" stroke="var(--color-icon-primary)"
              strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search"
        style={{
          flex: '1 1 auto',
          minWidth: 0,
          marginLeft: 6,
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 12,
          fontFamily: 'var(--font-family-primary)',
          color: 'var(--color-text-primary)',
        }}
        aria-label="Search events"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: 'var(--color-icon-primary)',
            cursor: 'pointer',
            display: 'inline-flex',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
