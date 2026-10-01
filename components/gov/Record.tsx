import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

// The pieces of a verified record on /government-capabilities/: a record card (one certification or registration),
// the verify panel (links to the official system, the downloads, and the search steps folded into a disclosure) and
// its small print. Every value comes in from the page, which reads content/government.ts; nothing here holds a fact.

export type RecordRow = [string, string];

/** One certification or registration: who issued it, the code, the name, its status and its dates. */
export const RecordCard: React.FC<{
  issuer: string;
  code?: string;
  name: string;
  status?: string;
  rows: RecordRow[];
  /** larger mono values under their labels, for identifiers people copy (UEI, CAGE) */
  big?: boolean;
}> = ({ issuer, code, name, status, rows, big }) => (
  <article className="panel flex h-full flex-col p-5 md:p-6">
    <div className="flex items-start justify-between gap-3">
      <p className="label pt-1">{issuer}</p>
      {status && <StatusTag>{status}</StatusTag>}
    </div>
    {code && <p className="display mt-4 text-5xl">{code}</p>}
    <h3 className={`text-lg font-semibold leading-snug text-ink ${code ? 'mt-2' : 'mt-4'}`}>{name}</h3>
    <dl className="mt-5 flex-1 divide-y divide-line-2 border-t border-line">
      {rows.map(([term, value]) => (
        <div key={term} className={`grid items-baseline py-2.5 ${big ? 'gap-1' : 'grid-cols-[7.5rem_1fr] gap-3'}`}>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-3">{term}</dt>
          <dd className={`font-mono text-ink ${big ? 'text-2xl font-semibold tracking-[0.04em]' : 'text-[15px]'}`}>{value}</dd>
        </div>
      ))}
    </dl>
  </article>
);

/** "☑ Active" in the theme's label face; the box is the only accent. */
export const StatusTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="chip inline-flex shrink-0 items-center gap-1.5 border-theme border-line px-2.5 py-0.5 text-[13px] text-ink" style={{ borderRadius: 'var(--radius)' }}>
    <span aria-hidden="true" className="text-signal-text">☑</span>{children}
  </span>
);

/** The ways to check a record: link rows, then the official search steps (plus any extra guidance) folded into a
 *  disclosure. */
export const VerifyPanel: React.FC<{ children: React.ReactNode; steps?: string; more?: React.ReactNode; className?: string }> = ({ children, steps, more, className = '' }) => (
  <div className={`panel divide-y divide-line-2 overflow-hidden ${className}`}>
    {children}
    {steps && (
      <details className="group">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center gap-3 px-4 py-2.5 hover:bg-ground-3 md:min-h-[52px] md:px-5 md:py-3 [&::-webkit-details-marker]:hidden">
          <span className="flex-1 font-semibold text-ink">Official search instructions</span>
          <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center border-theme border-line font-mono text-sm text-ink-2 rounded-theme group-open:border-signal group-open:bg-signal group-open:text-signal-ink">
            <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <p className="px-4 pb-4 text-[15px] leading-relaxed text-ink-2 first-letter:uppercase md:px-5">{steps}</p>
        {more && <p className="-mt-1 px-4 pb-4 text-[15px] leading-relaxed text-ink-2 md:px-5">{more}</p>}
      </details>
    )}
  </div>
);

/** One row in a VerifyPanel: an official search, a profile, or one of the PDFs (view or download). */
export const VerifyLink: React.FC<{ href: string; children: React.ReactNode; download?: boolean }> = ({ href, children, download }) => {
  const Icon = download ? Download : ExternalLink;
  return (
    <a href={href} {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
      className="group flex min-h-[48px] items-center gap-3 px-4 py-2.5 font-semibold text-ink hover:bg-ground-3 md:min-h-[52px] md:px-5 md:py-3">
      <span className="flex-1">{children}</span>
      <Icon size={17} aria-hidden="true" className="shrink-0 text-ink-3 group-hover:text-signal-text" />
    </a>
  );
};

/** Small print inside a verify panel: what a downloadable summary is and isn't. */
export const RecordNote: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <p className={`text-[13px] leading-relaxed text-ink-2 ${className}`}>
    <strong className="font-semibold text-ink">{title}</strong> {children}
  </p>
);
