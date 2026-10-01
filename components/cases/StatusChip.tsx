import React from 'react';
import type { CaseStatus } from '../../content/case-studies';

// Where a case stands, in the theme's label face. "Live" gets a filled dot; the others an outline.
const LABEL: Record<CaseStatus, string> = { live: 'Live', 'in progress': 'In progress', delivered: 'Delivered' };

export const StatusChip: React.FC<{ status: CaseStatus; className?: string }> = ({ status, className = '' }) => (
  <span className={`chip inline-flex items-center gap-2 border-theme border-line px-2.5 py-1 text-[13px] text-ink-2 ${className}`} style={{ borderRadius: 'var(--radius)' }}>
    <span aria-hidden="true" className={`inline-block h-2 w-2 ${status === 'live' ? 'bg-signal' : 'border border-ink-3'}`} style={{ borderRadius: 'var(--radius)' }} />
    {LABEL[status]}
  </span>
);
