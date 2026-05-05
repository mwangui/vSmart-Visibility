/**
 * Device sidebar — 4 collapsible sections that replace the figma-generated
 * `LeftColumn1` block.
 *
 * - Each section is independently expand/collapsable via the chevron on its
 *   right-hand side. Default state: all open.
 * - Field labels & values mirror the latest design comp; values are mock
 *   strings until we wire a real /api/devices endpoint.
 * - We deliberately avoid Tailwind utility classes here so this component
 *   stays consistent with the rest of `src/app/omp/*` (CSS variables only).
 */

import { useState, type ReactNode } from 'react';

interface FieldRow {
  label: string;
  /** Right side. Strings render as plain text; ReactNode allows links/badges. */
  value: ReactNode;
  /** Optional inline info icon next to the label. */
  hint?: string;
}

interface SectionDef {
  id: string;
  title: string;
  fields: FieldRow[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'information',
    title: 'Information',
    fields: [
      { label: 'Hostname',          value: 'Pood03-Controller01' },
      { label: 'Version',           value: '17.13.01.0.1247' },
      { label: 'Site ID',           value: '1' },
      { label: 'System IP',         value: '1.1.1.113' },
      { label: 'Up since',          value: 'Nov 30, 2024 04:02:00 GMT' },
      { label: 'Timezone',          value: 'CST -0500' },
      {
        label: 'Location',
        value: (
          <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span>Lat 37.866664</span>
            <span>Long −122.777023</span>
          </span>
        ),
      },
      { label: 'Health',            value: 'Requires setup', hint: 'Initial onboarding incomplete' },
      { label: 'Chassis number/ID', value: 'Not reported' },
      { label: 'Chassis model',     value: 'Not reported' },
      { label: 'Serial number',     value: 'Not reported' },
      { label: 'Connected vManage', value: 'Not reported' },
      { label: 'Tags',              value: 'None set' },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    fields: [
      { label: 'Reboot (last 90 days)', value: 'Not reported' },
      { label: 'Crash',                 value: 'Not reported' },
      { label: 'CPU load',              value: '30% average' },
      { label: 'Memory utilization',    value: '75% average' },
      { label: 'Module',                value: 'Controller' },
    ],
  },
  {
    id: 'control',
    title: 'Control',
    fields: [
      { label: 'Control connections',         value: 'Not reported' },
      {
        label: 'Reachability',
        value: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Reachable
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden
              style={{ display: 'inline-block', flexShrink: 0 }}
            >
              <circle cx="8" cy="8" r="8" fill="var(--color-brand-green, #5a9c3a)" />
              <path
                d="M4.5 8.25 L 7 10.5 L 11.5 5.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ),
      },
      { label: 'Control',                     value: '1/1' },
      { label: 'Controller control connection', value: '1/1', hint: 'Active controller-to-controller link' },
      { label: 'BFD',                         value: '0/0' },
      { label: 'TLOC',                        value: '0/1' },
    ],
  },
  {
    id: 'realtime',
    title: 'Real time',
    fields: [
      { label: 'Device groups', value: 'Not reported' },
      { label: 'Domain ID',     value: '1' },
      { label: 'Last Updated',  value: '29 Apr 2026 4:05:09 AM EDT' },
      { label: 'Latitude',      value: '37.866664' },
      { label: 'Longitude',     value: '−122.777023' },
    ],
  },
];

export function DeviceSidebarSections() {
  // All sections start expanded — matches design comp screen.
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS.map((s) => [s.id, true])),
  );

  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 383,
      }}
    >
      {SECTIONS.map((section) => (
        <Section
          key={section.id}
          section={section}
          open={!!open[section.id]}
          onToggle={() => toggle(section.id)}
        />
      ))}
    </div>
  );
}

interface SectionProps {
  section: SectionDef;
  open: boolean;
  onToggle: () => void;
}

function Section({ section, open, onToggle }: SectionProps) {
  const bodyId = `sidebar-section-${section.id}`;
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-text-muted)',
        // Last section shouldn't double-up borders against the card edge.
        borderBottom: '1px solid var(--color-text-muted)',
        marginBottom: -1,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-primary)',
          fontWeight: 600,
          fontSize: 14,
          lineHeight: '20px',
          color: 'var(--color-text-primary)',
        }}
      >
        <span>{section.title}</span>
        <Chevron open={open} />
      </button>

      {open ? (
        <div
          id={bodyId}
          style={{
            padding: '4px 24px 16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {section.fields.map((f) => (
            <FieldLine key={f.label} field={f} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FieldLine({ field }: { field: FieldRow }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        fontSize: 12,
        lineHeight: '18px',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}
      >
        {field.label}
        {field.hint ? <InfoDot title={field.hint} /> : null}
      </span>
      <span
        style={{
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          textAlign: 'right',
          minWidth: 0,
        }}
      >
        {field.value}
      </span>
    </div>
  );
}

function InfoDot({ title }: { title: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 12,
        height: 12,
        border: '1px solid var(--color-icon-tertiary)',
        borderRadius: '50%',
        fontSize: 9,
        fontWeight: 700,
        color: 'var(--color-icon-tertiary)',
        cursor: 'help',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      i
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      style={{
        transition: 'transform 150ms ease',
        transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
        color: 'var(--color-icon-primary)',
        flexShrink: 0,
      }}
    >
      <path
        d="M2.5 7.5 L6 4 L9.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
