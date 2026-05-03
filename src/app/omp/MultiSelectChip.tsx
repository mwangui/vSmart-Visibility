/**
 * Reusable multi-select dropdown chip used by:
 *   - Event type filter (3 options)
 *   - System IP filter (distinct from rows)
 *   - Site name filter (distinct from rows)
 *
 * Behaviour (§4 Flow D, §8.4):
 *   - Click chip → toggle dropdown open/close
 *   - Check / uncheck → fires onToggle, dropdown stays open
 *   - Click outside / Esc → closes; checkbox state preserved
 *   - Selected count > 0 → chip shows "N {label}" + clear (×) icon
 *   - Clear icon → fires onClear, dropdown stays whatever state
 */

import { useEffect, useRef, useState } from 'react';

export interface MultiSelectChipProps {
  label: string;
  /** All selectable options in their preferred display order. */
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
  /** When non-empty, dropdown shows a search box (omitted for tiny lists). */
  searchable?: boolean;
}

export function MultiSelectChip({
  label, options, selected, onToggle, onClear, searchable,
}: MultiSelectChipProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on click outside / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (ev: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(ev.target as Node)) setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const count = selected.size;
  const chipLabel = count === 0 ? label : `${count} ${label}`;

  const filteredOptions = query.trim()
    ? options.filter(o => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`filter-chip ${count > 0 ? 'filter-chip--active' : ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          height: 34,
          background: 'var(--color-bg-primary)',
          border: `1px solid ${count > 0
            ? 'var(--color-border-active)'
            : 'var(--color-text-muted)'}`,
          borderRadius: 6,
          fontSize: 12,
          lineHeight: '18px',
          fontWeight: count > 0 ? 700 : 400,
          color: count > 0
            ? 'var(--color-text-link)'
            : 'var(--color-text-primary)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span className="filter-chip__count">{chipLabel}</span>
        {count > 0 ? (
          <span
            role="button"
            tabIndex={0}
            aria-label={`Clear ${label}`}
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                onClear();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 14, height: 14,
              borderRadius: 999,
              color: 'var(--color-text-link)',
              cursor: 'pointer',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        ) : (
          <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
            <path d="M1 1l4 4 4-4" stroke="var(--color-icon-primary)" strokeWidth="1.5"
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          role="listbox"
          aria-multiselectable
          className="filter-dropdown filter-dropdown--open"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            minWidth: 240,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 6,
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            zIndex: 'var(--z-index-popover, 200)' as unknown as number,
            padding: 4,
          }}
        >
          {searchable ? (
            <div style={{ padding: '6px 8px' }}>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                style={{
                  width: '100%',
                  height: 28,
                  padding: '4px 8px',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: 'var(--font-family-primary)',
                  outline: 'none',
                }}
              />
            </div>
          ) : null}

          {filteredOptions.length === 0 ? (
            <div
              style={{
                padding: '8px 12px',
                fontSize: 12,
                color: 'var(--color-text-secondary)',
              }}
            >
              No options
            </div>
          ) : (
            filteredOptions.map(opt => {
              const isOn = selected.has(opt);
              return (
                <label
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    fontSize: 12,
                    cursor: 'pointer',
                    borderRadius: 4,
                    color: 'var(--color-text-primary)',
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => onToggle(opt)}
                    style={{
                      width: 14, height: 14,
                      accentColor: 'var(--color-brand-blue-light)',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ flex: '1 1 auto' }}>{opt}</span>
                </label>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
