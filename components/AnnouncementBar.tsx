import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ANNOUNCEMENT } from '../content/announcement';

const KEY = 'bw.announcement.closed';

/** A thin bar above the header (it scrolls away; the header stays sticky), in the theme's own colors turned around so
 * it reads on every theme. The close button remembers the announcement's id in this browser. */
export const AnnouncementBar: React.FC = () => {
  const a = ANNOUNCEMENT;
  const [closed, setClosed] = React.useState(() => {
    try { return localStorage.getItem(KEY) === a.id; } catch { return false; }
  });
  if (!a.on || closed) return null;
  const close = () => {
    setClosed(true);
    try { localStorage.setItem(KEY, a.id); } catch { /* storage blocked: it stays closed until the next visit */ }
  };
  return (
    <aside aria-label="Announcement" className="bg-ink text-ground">
      <div className="container-x flex min-h-[44px] items-center gap-3 py-2">
        <p className="min-w-0 flex-1 text-sm leading-snug">
          <span className="mr-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] opacity-70">{a.tag}</span>
          {a.lead}
          {a.more && <span className="hidden sm:inline"> {a.more}</span>}{' '}
          <a href={a.link.href} target="_blank" rel="noopener"
            className="inline-flex items-center gap-0.5 whitespace-nowrap font-semibold underline decoration-1 underline-offset-[3px] hover:decoration-2">
            {a.link.label}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <button type="button" onClick={close} aria-label="Close this announcement"
          className="-mr-2 grid h-10 w-10 shrink-0 place-items-center opacity-70 transition-opacity hover:opacity-100">
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
