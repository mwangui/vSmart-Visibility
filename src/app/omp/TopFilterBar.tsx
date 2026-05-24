import type { ReactNode } from 'react';
import {
  TENANT_OPTIONS,
  useOmp,
  type TenantOption,
} from './state';

export function TopFilterBar() {
  const { state, dispatch } = useOmp();

  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Filter bar">
      <StaticTopField
        ariaLabel="Time range"
        icon={<ClockIcon />}
        value="24 hours"
      />

      <TopSelect
        ariaLabel="Tenant"
        value={state.selectedTenant}
        onChange={value => dispatch({ type: 'SET_TENANT', value: value as TenantOption })}
        options={TENANT_OPTIONS.map(tenant => ({
          value: tenant,
          label: tenant,
        }))}
      />
    </div>
  );
}

interface StaticTopFieldProps {
  ariaLabel: string;
  value: string;
  icon?: ReactNode;
}

function StaticTopField({ ariaLabel, value, icon }: StaticTopFieldProps) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative rounded-[6px] shrink-0">
      <div
        aria-label={ariaLabel}
        role="text"
        style={{
          position: 'relative',
          width: 140,
          height: 34,
          borderRadius: 6,
          background: 'var(--color-bg-primary)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: icon ? 36 : 10,
          paddingRight: 30,
          fontFamily: 'var(--font-family-primary)',
          fontSize: 14,
          lineHeight: '20px',
          color: 'var(--color-text-primary)',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid var(--color-text-muted)',
            borderRadius: 6,
            pointerEvents: 'none',
          }}
        />
        {icon ? (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 10,
              top: 7,
              width: 20,
              height: 20,
              color: 'var(--color-icon-primary)',
              pointerEvents: 'none',
            }}
          >
            {icon}
          </span>
        ) : null}
        {value}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 10,
            top: 7,
            width: 20,
            height: 20,
            color: 'var(--color-icon-primary)',
            pointerEvents: 'none',
          }}
        >
          <CaretIcon />
        </span>
      </div>
    </div>
  );
}

interface TopSelectOption {
  value: string;
  label: string;
}

interface TopSelectProps {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: TopSelectOption[];
  icon?: ReactNode;
}

function TopSelect({ ariaLabel, value, onChange, options, icon }: TopSelectProps) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative rounded-[6px] shrink-0">
      <div
        style={{
          position: 'relative',
          width: 140,
          height: 34,
          borderRadius: 6,
          background: 'var(--color-bg-primary)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid var(--color-text-muted)',
            borderRadius: 6,
            pointerEvents: 'none',
          }}
        />
        {icon ? (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 10,
              top: 7,
              width: 20,
              height: 20,
              color: 'var(--color-icon-primary)',
              pointerEvents: 'none',
            }}
          >
            {icon}
          </span>
        ) : null}
        <select
          aria-label={ariaLabel}
          value={value}
          onChange={event => onChange(event.target.value)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'transparent',
            paddingLeft: icon ? 36 : 10,
            paddingRight: 30,
            fontFamily: 'var(--font-family-primary)',
            fontSize: 14,
            lineHeight: '20px',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 10,
            top: 7,
            width: 20,
            height: 20,
            color: 'var(--color-icon-primary)',
            pointerEvents: 'none',
          }}
        >
          <CaretIcon />
        </span>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5V10l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CaretIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
