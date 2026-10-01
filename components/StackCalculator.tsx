import React from 'react';
import { Link } from 'react-router-dom';
import { STACK, STACK_DEFAULT } from '../content/stack';
import { moduleById } from '../content/modules';
import { TIERS } from '../content/pricing';

// "What does your app stack cost you?" Tick what you pay for, fix any price to what you really pay, and see the year's
// total next to the module that covers each one. Nothing leaves the page.
const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const priceOf = (id: string) => Number((TIERS.find((t) => t.id === id)?.price ?? '').replace(/[^0-9]/g, '')) || 0;

export const StackCalculator: React.FC = () => {
  const [on, setOn] = React.useState<Set<string>>(() => new Set(STACK_DEFAULT));
  const [all, setAll] = React.useState(false); // phones show the first eight until asked
  const [cost, setCost] = React.useState<Record<string, number>>(() => Object.fromEntries(STACK.map((s) => [s.id, s.monthly])));
  const picked = STACK.filter((s) => on.has(s.id));
  const monthly = picked.reduce((n, s) => n + (cost[s.id] || 0), 0);
  const yearly = monthly * 12;
  const foundation = priceOf('foundation');
  const payback = monthly > 0 && foundation ? Math.ceil(foundation / monthly) : null;
  const covered = [...new Set(picked.flatMap((s) => s.by))].map(moduleById);
  const toggle = (id: string) => setOn((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="panel p-2 sm:p-3">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <p className="label">Tick what you pay for · fix any price</p>
          <button type="button" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink" onClick={() => setOn(new Set(on.size ? [] : STACK.map((s) => s.id)))}>{on.size ? 'Clear' : 'All'}</button>
        </div>
        <ul className="grid gap-1 sm:grid-cols-2">
          {STACK.map((s, i) => {
            const checked = on.has(s.id);
            return (
              <li key={s.id} className={i >= 8 && !all ? 'hidden sm:block' : ''}>
                <label className={`flex cursor-pointer items-center gap-3 border-theme px-3 py-2.5 transition-colors ${checked ? 'border-signal/60 bg-signal/10' : 'border-transparent hover:bg-ground-3'}`} style={{ borderRadius: 'var(--radius)' }}>
                  <input type="checkbox" className="h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" checked={checked} onChange={() => toggle(s.id)} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-tight text-ink">{s.kind}</span>
                    <span className="block truncate text-xs text-ink-3">like {s.examples}</span>
                  </span>
                  <span className="flex items-center font-mono text-sm text-ink-2" onClick={(e) => e.preventDefault()}>
                    $<input aria-label={`${s.kind}, dollars per month`} inputMode="numeric" value={cost[s.id]} onChange={(e) => setCost({ ...cost, [s.id]: Math.max(0, Math.min(999, Number(e.target.value.replace(/[^0-9]/g, '')) || 0)) })}
                      className="w-9 bg-transparent text-right text-ink outline-none focus:text-signal-text" /><span className="text-ink-3">/mo</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
        {!all && <button type="button" onClick={() => setAll(true)} className="btn btn-outline mt-2 w-full sm:hidden">Show all {STACK.length} kinds of apps</button>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="chamfer"><div className="chamfer-in p-6">
          <p className="label">Your stack</p>
          <p className="display mt-2 text-6xl tabular-nums md:text-7xl"><span className="sig">{money(yearly)}</span></p>
          <p className="mt-1 text-ink-2">a year, for {picked.length} {picked.length === 1 ? 'app' : 'apps'} at {money(monthly)} a month.</p>
          {payback != null && (
            <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">
              A Foundation install is {money(foundation)}, once. At your stack, that's <b className="text-ink">{payback} {payback === 1 ? 'month' : 'months'}</b> of subscriptions.
            </p>
          )}
        </div></div>
        <div className="panel flex-1 p-5">
          <p className="label mb-3">All of it lives here instead</p>
          {covered.length ? (
            <ul className="flex flex-wrap gap-2">
              {covered.map((m) => <li key={m.id} className="chip border-theme border-line bg-ground px-2.5 py-1 text-sm text-ink" style={{ borderRadius: 'var(--radius)' }}>{m.name}{m.status === 'coming' ? ' (coming)' : ''}</li>)}
            </ul>
          ) : <p className="text-sm text-ink-3">Tick a few apps to see what replaces them.</p>}
          <ul className="mt-4 space-y-1.5 text-xs text-ink-3">
            {picked.filter((s) => s.note).map((s) => <li key={s.id}><b className="font-semibold text-ink-2">{s.kind}:</b> {s.note}</li>)}
          </ul>
          <p className="mt-4 text-xs text-ink-3">Prices are typical single-person plans; change them to yours. Your AI plan and the machine it runs on aren't counted.</p>
          <Link to="/pricing/" className="btn btn-outline mt-5 w-full">See the tiers</Link>
        </div>
      </div>
    </div>
  );
};
