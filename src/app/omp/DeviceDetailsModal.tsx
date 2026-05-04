/**
 * DeviceDetailsModal — modal opened from a row's kebab menu → "Device details".
 *
 * Behaviour spec:
 *  - Centred dialog with dark backdrop.
 *  - Closes via Close button (bottom-right) or Escape key.
 *  - Backdrop clicks intentionally do NOT close, per design spec which only
 *    names the Close button as the dismissal control.
 *
 * Styling stays inside the existing design-token system (see
 * `src/styles/design-tokens.css`); no new colours or radii are introduced.
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { MockLogRow } from './data';

export interface DeviceDetailsModalProps {
  row: MockLogRow;
  onClose: () => void;
}

export function DeviceDetailsModal({ row, onClose }: DeviceDetailsModalProps) {
  // Escape closes the modal — standard a11y affordance even though the spec
  // only requires the Close button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const fields = buildDeviceDetailFields(row);

  // Render through a Portal anchored at <body> so:
  //   1. The fixed-position backdrop covers the FULL viewport (header, left
  //      sidebar, main content) — not just the EventTable's local stacking
  //      context, which would leave header/sidebar uncovered.
  //   2. Centring with `inset: 0 + flex` is relative to the viewport, not the
  //      table's parent, so the dialog visually sits at the screen centre
  //      regardless of sidebar width.
  return createPortal(
    <div
      role="presentation"
      // Backdrop intentionally non-dismissable; keep this as a visual layer
      // only so users have a clear focus on the dialog content.
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(35, 40, 46, 0.45)',
        zIndex: 1000, // above any in-app stacking; --z-index-modal (100) is
                     // not high enough because some app shells use their own
                     // higher z-indices for header/sidebar.
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="device-details-title"
        style={{
          width: 460,
          maxWidth: '100%',
          background: 'var(--color-bg-primary)',
          border: '1px solid var(--color-border-primary)',
          borderRadius: 8,
          boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
          fontFamily: 'var(--font-family-primary)',
          color: 'var(--color-text-primary)',
        }}
        // Stop propagation so the implicit document-level kebab outside-click
        // handler in EventTable cannot fire while the dialog is open.
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          // No bottom divider per design spec — title sits directly above
          // the field list with whitespace as the only separator.
          style={{
            padding: '20px 24px 12px',
          }}
        >
          <h2
            id="device-details-title"
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--color-text-heading)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Device details
          </h2>
        </div>

        <div
          style={{
            padding: '12px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            fontSize: 14,
            lineHeight: 'var(--line-height-md)',
          }}
        >
          {fields.map(([label, value]) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                padding: '4px 0',
                gap: 12,
              }}
            >
              <span
                style={{
                  flex: '0 0 180px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  flex: '1 1 auto',
                  color: 'var(--color-text-primary)',
                  wordBreak: 'break-all',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '12px 24px 20px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            autoFocus
            style={{
              background: 'var(--color-text-link)',
              color: 'var(--color-text-inverse)',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-family-primary)',
              cursor: 'pointer',
              minWidth: 80,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// -----------------------------------------------------------------------------
// Per-row deterministic detail synthesis
// -----------------------------------------------------------------------------

/**
 * Stable 32-bit hash of the row id; same id always yields the same number, so
 * subsequent re-opens of the modal show identical numbers (no UI jitter).
 */
function hashId(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) {
    h = ((h * 33) ^ id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

const SRC_COLOR_POOL = [
  'mpls', 'biz-internet', 'public-internet', 'default',
  'lte', '3g', 'private1', 'private2', 'custom1',
];

const REMOTE_COLOR_POOL = [
  'Default', 'mpls', 'biz-internet', 'public-internet', 'lte',
];

/**
 * Derive a plausible Device-details payload from a single MockLogRow.
 * Hostname / event details that already exist in the row are kept verbatim;
 * everything else is hashed off the row id so each row reads differently but
 * deterministically.
 */
export function buildDeviceDetailFields(
  row: MockLogRow,
): Array<[string, string]> {
  const seed = hashId(row.id);

  const personality = row.hostname.toLowerCase().startsWith('vsmart')
    ? 'vsmart'
    : 'vedge';

  // The Plan-§5 details column already encodes peer-type for two of the three
  // event names; fall back to the personality if the string lacks the marker.
  const peerType = row.details.includes('peer-type=vsmart')
    ? 'vsmart'
    : row.details.includes('peer-type=vedge')
      ? 'vedge'
      : personality === 'vsmart'
        ? 'vsmart'
        : 'vedge';

  const ipFourth = parseInt(row.systemIp.split('.')[3] ?? '1', 10);
  const peerVmanageIp = `10.10.${(seed >> 4) % 256}.${(ipFourth + (seed & 0xff)) % 256}`;

  // Public IP: first octet biased away from RFC1918 ranges so it reads as a
  // realistic edge address; '0.0.0.0' is the convention when peer is behind
  // NAT and address discovery hasn't completed.
  const publicIp = (seed & 0xf) === 0
    ? '0.0.0.0'
    : `${64 + (seed % 192)}.${(seed >> 8) % 256}.${(seed >> 16) % 256}.${(seed >> 24) % 256}`;

  const publicPort = 10000 + (seed % 55000);

  const srcColor = SRC_COLOR_POOL[seed % SRC_COLOR_POOL.length];
  const remoteColor = REMOTE_COLOR_POOL[(seed >> 5) % REMOTE_COLOR_POOL.length];

  // Uptime varies from "0:00:00:00" (just-came-up) to ~31 days.
  const upDays = seed % 32;
  const upH = (seed >> 5) % 24;
  const upM = (seed >> 10) % 60;
  const upS = (seed >> 16) % 60;
  const uptime = `${upDays}:${pad2(upH)}:${pad2(upM)}:${pad2(upS)}`;

  // Convert the row's event semantics into "Up" / "Down" so the modal stays
  // consistent with the row that opened it.
  const newState = /down|gr-down|reject|fail/i.test(row.details)
    ? 'Down'
    : 'Up';

  return [
    ['Host name', row.hostname],
    ['Personality', personality],
    ['Peer type', peerType],
    ['Peer vmanage-system-ip', peerVmanageIp],
    ['Public IP', publicIp],
    ['Public port', String(publicPort)],
    ['Src color', srcColor],
    ['Remote color', remoteColor],
    ['Uptime', uptime],
    ['New state', newState],
  ];
}
