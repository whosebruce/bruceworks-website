import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { addOn, auditPrices, BUILD_SPEC, dollars, money, tier } from './tiers';
import { CARE, HOSTING } from '../../content/pricing';
import { bookHref, DeliverablePicker, pickName, type Pick } from './DeliverablePicker';

// "Build your loadout": start with the audit (and pick the one thing you leave with) or pick a build, add what you
// need, choose how it's kept current (care on your own machine, or Command: hosted by Bruce), and see the one-time and
// monthly numbers move. Every price comes from content/pricing.ts. It's an estimate; the audit sets the real scope.

type Build = 'recon' | 'foundation' | 'operator';
type Monthly = 'none' | 'care' | 'hosted';
export type LoadoutState = { build: Build; agents: number; workflows: number; theme: boolean; moveIn: boolean; hardware: boolean; monthly: Monthly; deliverable: Pick | null };

const MAX_EXTRA = 6;
const A = { agent: addOn('agent'), workflow: addOn('workflow'), theme: addOn('theme'), moveIn: addOn('moveIn'), hardware: addOn('hardware') };
const MONTHLY_LABEL: Record<Exclude<Monthly, 'none'>, string> = { care: `${CARE.name}, on your own machine`, hosted: `${tier('command').name}, hosted by Bruce` };
const monthlyPrice = (m: Monthly) => (m === 'care' ? dollars(CARE.price) : m === 'hosted' ? dollars(tier('command').price) : 0);

/** Price a loadout. `agents` and `workflows` are extras beyond what the build includes. */
export function priceLoadout(s: LoadoutState) {
  const t = tier(s.build);
  if (s.build === 'recon') return { lines: [{ label: `${t.name} · ${t.sub}`, value: t.price, amount: dollars(t.price) }], oneTime: dollars(t.price), monthly: 0, from: false, hardware: false };
  const spec = BUILD_SPEC[s.build];
  const lines: { label: string; value: string; amount: number }[] = [{ label: `${t.name} · ${t.sub}`, value: t.price, amount: dollars(t.price) }];
  if (s.agents) lines.push({ label: `Extra AI agent × ${s.agents}`, value: money(s.agents * A.agent.amount), amount: s.agents * A.agent.amount });
  if (s.workflows) lines.push({ label: `Workflow buildout × ${s.workflows}`, value: `${A.workflow.from ? 'from ' : ''}${money(s.workflows * A.workflow.amount)}`, amount: s.workflows * A.workflow.amount });
  if (s.theme && !spec.theme) lines.push({ label: A.theme.name, value: A.theme.price, amount: A.theme.amount });
  if (s.moveIn && !spec.moveIn) lines.push({ label: A.moveIn.name, value: A.moveIn.price, amount: A.moveIn.amount });
  const hardware = s.hardware && s.monthly !== 'hosted'; // a hosted system needs no machine
  if (hardware) lines.push({ label: `${A.hardware.name}, sourced and set up`, value: A.hardware.price, amount: 0 });
  const oneTime = lines.reduce((n, l) => n + l.amount, 0);
  return { lines, oneTime, monthly: monthlyPrice(s.monthly), from: s.workflows > 0 && A.workflow.from, hardware };
}

/** The same needs, priced on Operator: what a Foundation buyer would pay if they moved up. */
function asOperator(s: LoadoutState): LoadoutState {
  const f = BUILD_SPEC.foundation, o = BUILD_SPEC.operator;
  return { ...s, build: 'operator', agents: Math.max(0, f.agents + s.agents - o.agents), workflows: Math.max(0, f.workflows + s.workflows - o.workflows) };
}

export function describeLoadout(s: LoadoutState) {
  const p = priceLoadout(s);
  if (s.build === 'recon') {
    const a = auditPrices();
    return `Audit from bruceworks.net/pricing: Recon, the AI Leverage Audit (${a.remote} remote, ${a.inPerson} in person). Included deliverable: ${s.deliverable ? pickName(s.deliverable) : 'not picked yet'}.`;
  }
  const parts = p.lines.map((l) => `${l.label} (${l.value})`);
  if (s.monthly !== 'none') parts.push(`${MONTHLY_LABEL[s.monthly]} (${money(p.monthly)}/month)`);
  return `Loadout estimate from bruceworks.net/pricing: ${parts.join(' + ')}. Estimated one-time: ${p.from ? 'from ' : ''}${money(p.oneTime)}${p.hardware ? ' plus hardware at cost' : ''}. Monthly: ${p.monthly ? `${money(p.monthly)}/month` : 'none'}.`;
}

const START: LoadoutState = { build: 'recon', agents: 0, workflows: 0, theme: false, moveIn: false, hardware: false, monthly: 'none', deliverable: null };

export const Loadout: React.FC = () => {
  const [s, setS] = React.useState<LoadoutState>(START);
  const set = (patch: Partial<LoadoutState>) => setS((prev) => ({ ...prev, ...patch }));
  const recon = s.build === 'recon';
  const spec = s.build === 'recon' ? null : BUILD_SPEC[s.build];
  const p = priceLoadout(s);
  const up = s.build === 'foundation' ? priceLoadout(asOperator(s)) : null;
  const nudge = up && p.oneTime >= up.oneTime;
  const audit = auditPrices();
  const command = tier('command');
  const builds: Build[] = ['recon', 'foundation', 'operator'];
  const blurb = (id: Build) => {
    if (id === 'recon') return 'A plan, and one thing you keep';
    const b = BUILD_SPEC[id];
    return `${id === 'operator' ? 'Every module' : 'Up to 6 modules'} · ${b.agents} ${b.agents === 1 ? 'agent' : 'agents'}${b.theme ? ' · custom theme' : ''}`;
  };

  const totals = (
    <dl className="grid grid-cols-2 gap-x-4">
      <div>
        <dt className="label">One time{p.from && <span className="text-ink-2"> · from</span>}</dt>
        <dd className="display mt-1 text-4xl tabular-nums md:text-5xl lg:text-4xl xl:text-5xl"><span className="sig">{money(p.oneTime)}</span></dd>
      </div>
      <div>
        <dt className="label">Monthly</dt>
        <dd className="display mt-1 text-4xl tabular-nums md:text-5xl lg:text-4xl xl:text-5xl">{p.monthly ? money(p.monthly) : <span className="text-ink-3">$0</span>}</dd>
      </div>
    </dl>
  );
  const monthlyOptions: { id: Monthly; title: string; price: string; note: string }[] = [
    { id: 'none', title: 'Nothing monthly', price: '$0', note: 'It runs on your machine and it’s yours. Add care later if you want it.' },
    { id: 'care', title: `${CARE.name} · on your own machine`, price: `${CARE.price}/mo`, note: 'New features rolled in, health checks, backups verified, one small workflow a month. Cancel anytime.' },
    { id: 'hosted', title: `${command.name} · hosted by Bruce`, price: `${command.price}/mo`, note: `No machine at home: I run it on my servers, with everything care includes. Limited to ${HOSTING.slots} slots; we confirm it fits before you pay.` },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-3 sm:space-y-4">
        {/* 01 where to start */}
        <fieldset className="panel p-3.5 sm:p-5">
          <legend className="sr-only">Pick where to start</legend>
          <p aria-hidden="true" className="label mb-3"><span className="text-alert">01</span> // Pick where to start</p>
          <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
            {builds.map((id) => {
              const t = tier(id); const on = s.build === id;
              return (
                <label key={id} className={`flex cursor-pointer gap-2.5 border-theme p-3 transition-colors rounded-theme sm:gap-3 sm:p-4 ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'} focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal`}>
                  <input type="radio" name="loadout-build" value={id} checked={on} onChange={() => set({ build: id })} className="mt-1.5 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2"><span className="display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl">{t.name}</span><span className="font-mono text-sm font-semibold text-ink-2">{t.price}</span></span>
                    <span className="block text-sm text-ink-3">{id === 'recon' ? `${t.sub} · ${audit.inPerson} in person` : `${t.sub} · ${t.per}`}</span>
                    <span className="mt-2 hidden text-sm text-ink-2 sm:block">{blurb(id)}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {recon ? (
          /* 02 the audit's one deliverable */
          <div className="panel p-3.5 sm:p-5">
            <p className="label mb-3"><span className="text-alert">02</span> // Choose what you leave with</p>
            <DeliverablePicker value={s.deliverable} onChange={(deliverable) => set({ deliverable })} compact name="loadout-deliverable" />
          </div>
        ) : (
          <>
            {/* 02 add-ons */}
            <fieldset className="panel px-3.5 py-3 sm:p-5">
              <legend className="sr-only">Add what you need</legend>
              <p aria-hidden="true" className="label mb-1"><span className="text-alert">02</span> // Add what you need</p>
              <ul className="divide-y divide-line-2">
                <Stepper label={A.agent.name} note={`${spec!.agents} included · ${A.agent.price} each`} value={s.agents} onChange={(agents) => set({ agents })}
                  total={`${spec!.agents + s.agents} ${spec!.agents + s.agents === 1 ? 'agent' : 'agents'}`} />
                <Stepper label={A.workflow.name} note={`${spec!.workflows ? `${spec!.workflows} included · ` : ''}${A.workflow.price} each`} value={s.workflows} onChange={(workflows) => set({ workflows })}
                  total={`${spec!.workflows + s.workflows} ${spec!.workflows + s.workflows === 1 ? 'workflow' : 'workflows'}`} />
                <Toggle label={A.theme.name} price={A.theme.price} note="Your colors, type and corners." included={spec!.theme} checked={s.theme} onChange={(theme) => set({ theme })} />
                <Toggle label={A.moveIn.name} price={A.moveIn.price} note="Notes, docs and files brought over." included={spec!.moveIn} checked={s.moveIn} onChange={(moveIn) => set({ moveIn })} />
                {s.monthly !== 'hosted' && <Toggle label="Source the machine for me" price={A.hardware.price} note="A mini PC or Mac mini, bought at cost and set up." checked={s.hardware} onChange={(hardware) => set({ hardware })} />}
              </ul>
            </fieldset>

            {/* 03 monthly */}
            <fieldset className="panel p-3.5 sm:p-5">
              <legend className="sr-only">Keep it current</legend>
              <p aria-hidden="true" className="label mb-3"><span className="text-alert">03</span> // Keep it current</p>
              <div className="grid gap-2">
                {monthlyOptions.map((o) => {
                  const on = s.monthly === o.id;
                  return (
                    <label key={o.id} className={`flex cursor-pointer gap-3 border-theme p-3 transition-colors rounded-theme ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'} focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal`}>
                      <input type="radio" name="loadout-monthly" value={o.id} checked={on} onChange={() => set({ monthly: o.id })} className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3"><span className="font-semibold text-ink">{o.title}</span><span className="font-mono text-sm text-ink-2">{o.price}</span></span>
                        <span className="mt-0.5 hidden text-sm text-ink-3 sm:block">{o.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        {/* phones: the totals ride along at the bottom while the controls are on screen */}
        <div className="sticky bottom-0 z-10 -mx-1 border-theme border-line bg-ground-3 px-4 py-3 rounded-theme lg:hidden" aria-hidden="true">
          <div className="flex items-baseline justify-between gap-3 font-mono text-sm">
            <span className="text-ink-3">ONE TIME <b className="text-base text-ink">{p.from ? 'from ' : ''}{money(p.oneTime)}</b></span>
            <span className="text-ink-3">MONTHLY <b className="text-base text-ink">{money(p.monthly)}</b></span>
          </div>
        </div>
      </div>

      {/* the receipt */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="chamfer"><div className="chamfer-in p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="label !text-ink">{recon ? 'Your audit' : 'Your loadout'}</p>
            <span className="border border-alert/50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-alert rounded-theme">{recon ? 'Fixed price' : 'Estimate'}</span>
          </div>
          <ul className="mt-4 space-y-2 text-[15px]">
            {p.lines.map((l) => (
              <li key={l.label} className="flex items-baseline gap-2">
                <span className="text-ink-2">{l.label}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-line" />
                <span className="shrink-0 font-mono text-sm text-ink">{l.value}</span>
              </li>
            ))}
            {recon && (
              <li className="flex items-baseline gap-2">
                <span className="text-ink-2">You leave with: {s.deliverable ? pickName(s.deliverable) : 'pick one'}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-line" />
                <span className="shrink-0 font-mono text-sm text-signal-text">Included</span>
              </li>
            )}
            {recon && <li className="text-sm text-ink-3">Your workflow mapped, ranked opportunities and a 30-day plan, within 7 business days of complete intake.</li>}
            {s.build === 'operator' && <li className="text-sm text-ink-3">Includes {spec!.agents} agents, {spec!.workflows} workflows, a custom theme and the move-in.</li>}
            {!recon && s.monthly !== 'none' && (
              <li className="flex items-baseline gap-2">
                <span className="text-ink-2">{MONTHLY_LABEL[s.monthly]}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-line" />
                <span className="shrink-0 font-mono text-sm text-ink">{money(p.monthly)}/mo</span>
              </li>
            )}
          </ul>
          <div className="mt-4 border-t border-line pt-4 sm:mt-5 sm:pt-5" aria-live="polite">{totals}</div>
          <p className="mt-3 text-sm text-ink-2">
            {recon
              ? <>{audit.inPerson} in person in San Diego. The fee comes off a build booked within 30 days.</>
              : <>
                  {p.monthly ? <>Year one: <b className="text-ink">{p.from ? 'from ' : ''}{money(p.oneTime + p.monthly * 12)}</b>. </> : null}
                  {p.hardware && <>Plus the machine, at cost. </>}
                  {s.monthly === 'hosted' && <>Hosted on my servers: no machine needed. </>}
                  Your AI plan isn’t included; your agents run on the one you pay for.
                </>}
          </p>
          {nudge && up && (
            <div className="mt-4 border-theme border-signal/60 bg-signal/10 p-3 text-sm text-ink rounded-theme">
              Operator covers all of that for {up.from ? 'from ' : ''}<b>{money(up.oneTime)}</b>, with every module switched on.
              <button type="button" onClick={() => setS(asOperator(s))} className="ml-1 font-semibold text-signal-text underline underline-offset-2">Switch to Operator</button>
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
            {recon ? (
              <>
                <Link to={bookHref(s.deliverable)} className="btn btn-primary w-full">Book the audit <ArrowRight size={16} /></Link>
                <Link to="/book/?event=fit" className="btn btn-outline w-full">Not sure? Free fit call</Link>
              </>
            ) : (
              <>
                <Link to={`/contact/?topic=${s.monthly === 'hosted' ? 'command' : s.build}`} state={{ loadout: describeLoadout(s) }} className="btn btn-primary w-full">Send me this loadout</Link>
                <button type="button" onClick={() => set({ build: 'recon' })} className="btn btn-outline w-full">Start with the {audit.remote} audit</button>
              </>
            )}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-3">
            {recon
              ? <>A fixed price. Your pick goes into the booking as a preference; we confirm it during intake.</>
              : <>An estimate, not a quote. Your final scope and price are set in writing after the audit.<span className="hidden sm:inline"> The audit is {audit.remote} remote or {audit.inPerson} in person, and it comes off a build booked within 30 days.</span></>}
          </p>
        </div></div>
      </div>
    </div>
  );
};

const Stepper: React.FC<{ label: string; note: string; value: number; total: string; onChange: (n: number) => void }> = ({ label, note, value, total, onChange }) => {
  const id = React.useId();
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5 sm:py-3">
      <div className="min-w-0 flex-1">
        <p id={id} className="font-semibold text-ink">{label}</p>
        <p className="text-sm text-ink-3">{note}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-xs uppercase tracking-[0.12em] text-ink-3 sm:inline">{total}</span>
        <div role="group" aria-labelledby={id} className="flex items-center border-theme border-line rounded-theme">
          <button type="button" aria-label={`Fewer: ${label}`} disabled={value <= 0} onClick={() => onChange(Math.max(0, value - 1))}
            className="grid h-11 w-11 place-items-center text-ink hover:bg-ground-3 disabled:cursor-not-allowed disabled:text-ink-3 disabled:opacity-50"><Minus size={16} /></button>
          <output aria-live="polite" aria-label={`${label}: ${value} extra`} className="w-10 text-center font-mono text-base font-semibold tabular-nums text-ink">+{value}</output>
          <button type="button" aria-label={`More: ${label}`} disabled={value >= MAX_EXTRA} onClick={() => onChange(Math.min(MAX_EXTRA, value + 1))}
            className="grid h-11 w-11 place-items-center text-ink hover:bg-ground-3 disabled:cursor-not-allowed disabled:text-ink-3 disabled:opacity-50"><Plus size={16} /></button>
        </div>
      </div>
    </li>
  );
};

const Toggle: React.FC<{ label: string; price: string; note: string; checked: boolean; included?: boolean; onChange: (v: boolean) => void }> = ({ label, price, note, checked, included, onChange }) => (
  <li>
    <label className={`flex min-h-[44px] items-center gap-3 py-2.5 sm:items-start sm:py-3 ${included ? 'cursor-default' : 'cursor-pointer'}`}>
      <input type="checkbox" checked={included || checked} disabled={included} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 shrink-0 accent-[rgb(var(--c-signal))] sm:mt-1" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{label}</span>
        <span className="hidden text-sm text-ink-3 sm:block">{note}</span>
      </span>
      <span className={`shrink-0 font-mono text-sm ${included ? 'text-signal-text' : 'text-ink-2'}`}>{included ? 'Included' : price}</span>
    </label>
  </li>
);
