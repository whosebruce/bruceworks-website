import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Display, OpTag, PhotoPanel } from './brand';
import { STILLS } from '../content/media';
import { DOORS, FIT_CALL, type Door } from '../content/pricing';

// The three doors (Bruce, 2026-10-22): websites, the audit and the Command Center, each with its starting price and one
// button. Home and the offer pages lead with them; the closing band at the bottom of most pages lists them again. Every
// other price lives on /pricing/.

/** "from $500", "$197 remote": the door's price, worded the same way everywhere. */
export const DoorPrice: React.FC<{ d: Door; big?: boolean }> = ({ d, big }) => (
  <>
    {d.from && <span className={big ? 'label mr-1.5 align-middle' : 'text-ink-3'}>from </span>}
    <span className="tabular-nums">{d.price}</span>
    {d.per && <span className={big ? 'label ml-1.5 align-middle' : 'text-ink-3'}> {d.per}</span>}
  </>
);

/** The three doors as cards. */
export const Doors: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <ol className="grid gap-4 md:grid-cols-3">
      {DOORS.map((d, i) => (
        <li key={d.id} className="panel flex h-full flex-col p-5 md:p-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display text-3xl md:text-4xl">{d.name}</h3>
          </div>
          <p className="display mt-3 text-5xl md:mt-4"><DoorPrice d={d} big /></p>
          <p className="mt-3 flex-1 text-ink-2 md:mt-4">{d.line}</p>
          <Link to={d.cta.href} className="btn btn-primary mt-5 md:mt-6">{d.cta.label} <ArrowRight size={18} /></Link>
          <Link to={d.more} className="label mt-4 self-start hover:!text-ink">What you get →</Link>
        </li>
      ))}
    </ol>
    <p className="mt-6 text-ink-2">Every price is on the <Link to="/pricing/" className="font-semibold text-ink underline underline-offset-4">pricing page</Link>. Scope and price in writing before work starts.</p>
  </div>
);

/** The three doors as a short list: one row each, name and price, linking to what you get. */
export const DoorList: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`divide-y divide-line-2 ${className}`}>
    {DOORS.map((d) => (
      <li key={d.id}>
        <Link to={d.more} className="group flex min-h-[52px] items-baseline justify-between gap-4 px-4 py-3 hover:bg-ground-3">
          <span className="font-semibold text-ink">{d.name}</span>
          <span className="shrink-0 font-mono text-sm text-ink group-hover:text-signal-text"><DoorPrice d={d} /></span>
        </Link>
      </li>
    ))}
  </ul>
);

/** The closing band at the bottom of most pages: one free call, the three doors, the phone. `list` off where the doors
 * are already on the page (Home). */
export const DoorsBand: React.FC<{ list?: boolean }> = ({ list = true }) => {
  const art = STILLS.bruceSalute;
  return (
    <section className="texture border-t border-line">
      <div className="container-x flex flex-col gap-8 py-14 md:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-2xl">
          <OpTag op="OP-00">Start here</OpTag>
          <Display className="mt-6 text-5xl md:text-6xl">Start with a <span className="sig">free call.</span></Display>
          <p className="mt-5 text-lg text-ink-2">Thirty minutes. Tell me what’s slowing you down and I’ll tell you which of these fits. Scope and price in writing before work starts.</p>
          {list && <DoorList className="panel mt-6 !p-0" />}
        </div>
        <div className="flex items-end gap-8">
          {art && <PhotoPanel tilt={3} className="hidden w-44 shrink-0 xl:block"><img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="block h-auto w-full" /></PhotoPanel>}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to={FIT_CALL} className="btn btn-primary">Book a free call <ArrowRight size={18} /></Link>
            <a href="tel:+18668296757" className="btn btn-outline"><Phone size={16} /> (866) 829-6757</a>
          </div>
        </div>
      </div>
    </section>
  );
};
