import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Check } from '../brand';
import { auditPrices } from './tiers';
import { AUDIT_BUILD_NOTE, AUDIT_DELIVERABLES, AUDIT_HELP, type DeliverableId } from '../../content/pricing';

// "Choose what you leave with": the audit's one included deliverable as cards you pick from, with "Help me choose", and
// a summary of the pick (an example, what to bring, what's in and what isn't, the price and terms, the next step). Used
// on /ai-leverage-audit/ and in the /pricing/ loadout when the audit is the starting point. The pick is a preference
// that rides to /book/?deliverable=… (and into the booking's notes); it's confirmed together during intake.

export type Pick = DeliverableId | 'help';
export const PICKS: Pick[] = ['assistant', 'workflow', 'template', 'plan', 'help'];
export const isPick = (v: unknown): v is Pick => typeof v === 'string' && (PICKS as string[]).includes(v);
export const pickName = (p: Pick) => (p === 'help' ? 'Help me choose' : AUDIT_DELIVERABLES.find((d) => d.id === p)!.name);
/** What goes into the booking's notes: a preference, never a promise of custom scope. */
export const bookingNote = (p: Pick) =>
  p === 'help' ? 'Included deliverable: not sure yet, help me choose during the audit.' : `Included deliverable I'm leaning toward: ${pickName(p)} (to confirm during intake).`;
export const bookHref = (p: Pick | null, where?: 'in-person') => {
  const q = new URLSearchParams();
  if (where) q.set('event', where);
  if (p) q.set('deliverable', p);
  const s = q.toString();
  return `/book/${s ? `?${s}` : ''}`;
};

export const DeliverablePicker: React.FC<{ value: Pick | null; onChange: (p: Pick) => void; compact?: boolean; name?: string }> = ({ value, onChange, compact = false, name = 'deliverable' }) => {
  const audit = auditPrices();
  const d = value && value !== 'help' ? AUDIT_DELIVERABLES.find((x) => x.id === value)! : null;
  return (
    <div className={compact ? 'space-y-3' : 'grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-start'}>
      <fieldset>
        <legend className="sr-only">Choose what you leave with</legend>
        <div className={`grid gap-2 sm:gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
          {AUDIT_DELIVERABLES.map((x, i) => {
            const on = value === x.id;
            return (
              <label key={x.id} className={`flex cursor-pointer gap-3 border-theme p-3 transition-colors rounded-theme sm:p-4 ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'} focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal`}>
                <input type="radio" name={name} value={x.id} checked={on} onChange={() => onChange(x.id)} className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
                <span className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`block font-semibold text-ink ${compact ? 'text-base' : 'text-lg'}`}>{x.name}</span>
                  <span className="mt-1 block text-sm text-ink-2">{x.what}</span>
                </span>
              </label>
            );
          })}
          <label className={`flex cursor-pointer gap-3 border-theme border-dashed p-3 transition-colors rounded-theme sm:col-span-2 sm:p-4 ${value === 'help' ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'} focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal`}>
            <input type="radio" name={name} value="help" checked={value === 'help'} onChange={() => onChange('help')} className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-semibold text-ink"><HelpCircle size={16} /> Help me choose</span>
              <span className="mt-1 block text-sm text-ink-2">Not sure yet? We pick it together during the audit, based on what saves you the most time.</span>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="panel p-4 sm:p-5" aria-live="polite">
        {!value && <p className="text-ink-2">Pick one to see an example, what to bring, and what’s included.</p>}
        {value === 'help' && (
          <>
            <p className="label">A quick guide</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              {AUDIT_HELP.map(([when, id]) => (
                <li key={id}>
                  <button type="button" onClick={() => onChange(id)} className="text-left text-ink-2 hover:text-ink">
                    {when} <span aria-hidden="true">→</span> <b className="text-ink underline underline-offset-2">{pickName(id)}</b>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-3">Or leave it open: we settle it on the call.</p>
          </>
        )}
        {d && (
          <>
            <p className="label">You leave with</p>
            <p className={`display mt-2 ${compact ? 'text-2xl' : 'text-3xl'}`}>{d.name}</p>
            <dl className="mt-3 space-y-2.5 text-[15px]">
              <div><dt className="label !text-ink-3">Example</dt><dd className="mt-0.5 text-ink">{d.example}</dd></div>
              <div><dt className="label !text-ink-3">You bring</dt><dd className="mt-0.5 text-ink">{d.bring}</dd></div>
              <div><dt className="label !text-ink-3">Not included</dt><dd className="mt-0.5 text-ink">{d.not}</dd></div>
            </dl>
          </>
        )}
        {value && (
          <>
            <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-ink">
              <Check>{audit.remote} remote, or {audit.inPerson} in person in San Diego</Check>
              <Check>Your map, ranked opportunities, 30-day plan, and this one item</Check>
              <Check>Delivered within 7 business days of complete intake</Check>
              <Check>The fee comes off a build or workflow buildout booked within 30 days</Check>
            </ul>
            <p className="mt-3 text-sm text-ink-3">{AUDIT_BUILD_NOTE}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link to={bookHref(value)} className="btn btn-primary">Book the audit <ArrowRight size={16} /></Link>
              <Link to="/book/?event=fit" className="btn btn-outline">Not sure? Free fit call</Link>
            </div>
            <p className="mt-3 text-xs text-ink-3">Your pick goes into the booking as a preference. We confirm it together during intake.</p>
          </>
        )}
      </div>
    </div>
  );
};
