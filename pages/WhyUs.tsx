import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { StoryNav } from '../components/story/StoryNav';
import { LoopPanel } from '../components/story/Art';
import { TIERS } from '../content/pricing';

// Three ways to get it done. Kinds of options, not named companies; the agency column says "often" because it varies.
const COLS = ['A pile of apps', 'A typical agency', 'Bruce Works'] as const;
const VERSUS: { row: string; cells: [string, string, string] }[] = [
  { row: 'Your files', cells: ['Copied into every app’s cloud', 'Wherever their stack puts them', 'On a machine you own, in one structure'] },
  { row: 'Accounts and logins', cells: ['One per app, each with its own bill', 'Often set up under their accounts', 'Yours. Client-owned by default'] },
  { row: 'What the AI knows', cells: ['Whatever you paste in', 'Depends on the build', 'Your documents, projects and calendar'] },
  { row: 'Agent actions', cells: ['Each app’s bot does its own thing', 'Hard to see from the outside', 'Anything risky waits for your OK'] },
  { row: 'When it’s done', cells: ['It’s never done. The bills keep coming', 'Often a retainer to keep it running', 'Documentation, training and a handoff guide'] },
  { row: 'What you pay', cells: ['A subscription per app, every month', 'Billed by the hour or the month', 'Scoped up front. Monthly care is optional'] },
];

const RULES = [
  ['Client-owned by default', 'Your accounts, files, subscriptions, credentials and hardware stay under your control wherever practical.'],
  ['Defined deliverables', 'Every engagement has a bounded scope, acceptance criteria, training and a handoff. You know what done looks like before we start.'],
  ['Documented in plain English', 'How it’s set up, where things live, what stays local and what goes to the cloud, and what each agent is allowed to do.'],
  ['Trained on your real work', 'You and your people learn it on the work you actually do, not on a demo.'],
  ['A real handoff', 'A handoff guide and a system you can run. No permanent dependence on a black box nobody can explain.'],
  ['Approvals for agents', 'Agents ask before they send, delete or run anything that matters. You approve or deny from the dashboard or your phone.'],
  ['Private by default', 'It runs on hardware you own, and keys go through the Vault instead of a chat. Bruce Works doesn’t host your agents or hold your data unless you scope and approve that first.'],
];

const HANDOFF = [
  'The machine, set up and documented',
  'Your files in one structure',
  'The modules you use switched on, the rest off',
  'Agents briefed, with approvals on anything risky',
  'Data boundaries written down: what stays local, what goes to the cloud',
  'A plain-English handoff guide and training on your real work',
];

export const WhyUs: React.FC = () => {
  useReveal();
  const recon = TIERS.find((t) => t.id === 'recon')!;
  const route = [
    ['01', 'Start with the audit', `The ${recon.price} remote audit maps how you work, names the first things worth fixing, and hands you a 30-day plan you can run without me.`],
    ['02', 'Build what you’ll use', 'One Command Center with only the modules you need, and the first workflows built end to end.'],
    ['03', 'Train and hand off', 'Training on your real work, a handoff guide, and a system that’s yours to run.'],
    ['04', 'Improve over time', 'It gets more useful as your workflows, documents and support mature. Only if you want it.'],
  ];

  return (
    <main>
      <PageIntro
        op="OP-14"
        tag="The approach"
        title={<>Fewer apps. One system. <span className="sig">On your machine.</span></>}
        sub="A pile of subscriptions adds friction. A typical agency adds a dependency. Bruce Works builds one system around how you work, on hardware you own, with defined deliverables, documentation, training and a real handoff."
        actions={<>
          <Link to="/live-demo/" className="btn btn-primary">Try the live demo <ArrowRight size={18} /></Link>
          <Link to="/ai-leverage-audit/" className="btn btn-outline">Book the {recon.price} audit</Link>
        </>}
        aside={<LoopPanel slot="missionBrief" />}
      />

      {/* ── 01 versus: a table from md up, one swipe card per row on phones ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="Your options" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Three ways <span className="sig">to get it done.</span></Display>
            <p className="reveal text-lg text-ink-2">Keep stacking apps, hire someone to build on their stack, or have one system built around you. Here's how they compare where it counts.</p>
          </div>

          <div className="reveal mt-10 hidden border-theme border-line md:block" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">A pile of apps, a typical agency and Bruce Works, compared</caption>
              <thead>
                <tr className="bg-ground-3">
                  <th scope="col" className="w-[20%] px-5 py-4"><span className="label">Where it counts</span></th>
                  {COLS.map((c, i) => <th key={c} scope="col" className={`px-5 py-4 ${i === 2 ? 'bg-ground-2' : ''}`}><span className={`chip text-lg ${i === 2 ? 'text-ink' : 'text-ink-2'}`}>{c}</span></th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-2">
                {VERSUS.map(({ row, cells }) => (
                  <tr key={row}>
                    <th scope="row" className="px-5 py-4 align-top"><span className="label !text-ink-2">{row}</span></th>
                    {cells.map((c, i) => (
                      <td key={i} className={`px-5 py-4 align-top ${i === 2 ? 'bg-ground-2 font-semibold text-ink' : 'text-ink-3'}`}>
                        {i === 2 ? <span className="flex gap-2"><span aria-hidden="true" className="text-signal-text">☑</span>{c}</span> : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Swipe label="The three options compared" desktop="md:hidden" className="mt-10 md:hidden">
            {VERSUS.map(({ row, cells }) => (
              <div key={row} className="panel h-full p-5">
                <p className="label !text-ink-2">{row}</p>
                <dl className="mt-3 space-y-2.5">
                  {cells.map((c, i) => (
                    <div key={i} className={i === 2 ? 'border-t border-line-2 pt-2.5' : ''}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{COLS[i]}</dt>
                      <dd className={i === 2 ? 'flex gap-2 font-semibold text-ink' : 'text-ink-3'}>{i === 2 && <span aria-hidden="true" className="text-signal-text">☑</span>}{c}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 the rules ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="The approach" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Seven rules. <span className="sig">Every build.</span></Display>
          <Swipe label="Seven rules for every build" desktop="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4" className="mt-10">
            {[
              ...RULES.map(([t, d], i) => (
                <div key={t} className="panel h-full p-6">
                  <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display mt-4 text-3xl">{t}</h3>
                  <p className="mt-3 text-ink-2">{d}</p>
                </div>
              )),
              <Link key="demo" to="/live-demo/" className="panel group flex h-full min-h-[160px] flex-col justify-between gap-6 p-6 transition-colors hover:border-ink-3">
                <span className="label">See it run</span>
                <span className="flex items-end justify-between gap-3"><span className="display text-3xl">Try the live demo</span><ArrowRight size={22} className="shrink-0 text-ink-3 group-hover:text-ink" aria-hidden="true" /></span>
              </Link>,
            ]}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 03 how it runs, and what you walk away with ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="How it runs" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Start small. <span className="sig">Build what works.</span></Display>
          <Swipe label="How an engagement runs" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" className="mt-10">
            {route.map(([n, t, d]) => (
              <div key={n} className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                <p className="display mt-4 text-3xl">{t}</p>
                <p className="mt-3 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="reveal">
              <p className="display text-4xl">What you walk away with.</p>
              <p className="mt-4 text-lg text-ink-2">After a build, the system is yours to run. Nothing about it should only make sense to me.</p>
              <Link to="/pricing/" className="btn btn-outline mt-6">See pricing <ArrowRight size={18} /></Link>
            </div>
            <Chamfer className="reveal" innerClassName="p-6 md:p-8">
              <p className="label">Handoff checklist</p>
              <ul className="mt-5 grid gap-3 text-ink md:grid-cols-2 md:text-lg">{HANDOFF.map((h) => <Check key={h}>{h}</Check>)}</ul>
            </Chamfer>
          </div>
        </div>
      </GridBand>

      <StoryNav current="/why-us/" num="04" />
      <HazardStrip />
      <AuditBand />
    </main>
  );
};
