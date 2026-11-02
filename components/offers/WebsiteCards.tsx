import React from 'react';
import { Check } from '../brand';
import { PRESENCE, WEBSITES } from '../../content/pricing';

// The local offer's price cards, shared by /pricing/#websites and /websites/, so both say the same thing word for word.

/** No website yet: the one-page website and the custom website, then the web address and "anything bigger" lines. */
export const WebsiteCards: React.FC = () => (
  <>
    {[WEBSITES.quick, WEBSITES.full].map((w, i) => (
      <div key={w.name} className={`p-5 md:p-6 ${i === 0 ? 'border-theme border-signal bg-ground rounded-theme-lg' : 'panel'}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="display text-3xl md:text-4xl">{w.name}</h3>
          <p className="display text-4xl tabular-nums md:text-5xl"><span className={i === 0 ? 'sig' : ''}>{w.price}</span> <span className="label align-middle">{w.per}</span></p>
        </div>
        <p className="mt-3 text-ink-2">{w.note}</p>
        <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[15px] leading-snug text-ink">
          {w.includes.map((x) => <Check key={x}>{x}</Check>)}
        </ul>
        <p className="mt-4 font-semibold text-ink">{w.terms}</p>
      </div>
    ))}
    <p className="text-sm text-ink-3">{WEBSITES.address} {WEBSITES.bigger}</p>
  </>
);

/** A website already: the free report, the Fix Sprint, then the "too far gone" line. */
export const PresenceCards: React.FC = () => (
  <>
    <div className="panel p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="display text-3xl md:text-4xl">{PRESENCE.first.name}</h3>
        <p className="display text-4xl md:text-5xl"><span className="sig">{PRESENCE.first.price}</span></p>
      </div>
      <p className="mt-3 text-ink-2">{PRESENCE.name}. {PRESENCE.what}</p>
      <ul className="mt-4 grid gap-1.5 border-t border-line pt-4 text-[15px] leading-snug text-ink sm:grid-cols-2">
        {PRESENCE.checks.map((x) => <Check key={x}>{x}</Check>)}
      </ul>
      <p className="mt-4 text-ink-2">{PRESENCE.first.note}</p>
    </div>
    <div className="panel p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="display text-3xl md:text-4xl">{PRESENCE.sprint.name}</h3>
        <p className="display text-4xl tabular-nums md:text-5xl">{PRESENCE.sprint.price} <span className="label align-middle">{PRESENCE.sprint.per}</span></p>
      </div>
      <p className="mt-3 text-ink-2">{PRESENCE.sprint.note}</p>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[15px] leading-snug text-ink">
        {PRESENCE.sprint.includes.map((x) => <Check key={x}>{x}</Check>)}
      </ul>
      <p className="mt-4 text-sm text-ink-3">{PRESENCE.sprint.access}</p>
    </div>
    <p className="text-sm text-ink-3">{PRESENCE.bigger}</p>
  </>
);
