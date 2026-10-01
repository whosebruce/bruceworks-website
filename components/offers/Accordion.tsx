import React from 'react';
import { Link } from 'react-router-dom';

// Question-and-answer rows on native <details>: keyboard and screen-reader friendly, works without JavaScript, and the
// browser's find-in-page opens the right one.
export type QA = { q: string; a: string; link?: { label: string; href: string } };

export const Accordion: React.FC<{ items: QA[]; className?: string; openFirst?: boolean }> = ({ items, className = '', openFirst }) => (
  <div className={`panel divide-y divide-line overflow-hidden ${className}`}>
    {items.map((it, i) => (
      <details key={it.q} className="group" open={openFirst && i === 0} data-faq-item>
        <summary className="flex min-h-[56px] cursor-pointer list-none items-start gap-4 px-5 py-4 text-left hover:bg-ground-3 md:px-6 [&::-webkit-details-marker]:hidden">
          <span className="flex-1 text-lg font-semibold leading-snug text-ink" data-faq-q>{it.q}</span>
          <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-theme border-line font-mono text-sm text-ink-2 rounded-theme group-open:border-signal group-open:bg-signal group-open:text-signal-ink">
            <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-5 pb-5 md:px-6">
          <p className="max-w-3xl leading-relaxed text-ink-2" data-faq-a>{it.a}</p>
          {it.link && <Link to={it.link.href} className="mt-3 inline-flex min-h-[44px] items-center font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-text hover:underline">{it.link.label} →</Link>}
        </div>
      </details>
    ))}
  </div>
);
