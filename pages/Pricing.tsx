import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, HardDrive, MonitorSmartphone } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, Loop, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { Accordion } from '../components/offers/Accordion';
import { Loadout } from '../components/offers/Loadout';
import { useHashScroll } from '../components/offers/useHashScroll';
import { COMPARE_ROWS, COMPARE_TIERS, auditPrices, tier } from '../components/offers/tiers';
import { ADD_ONS, TIERS, type Tier, HOSTING, HOSTING_LITE } from '../content/pricing';
import { faqGroup } from '../content/faq';
import { LOOPS } from '../content/media';

// /pricing/: how an engagement runs, the tiers, what each includes side by side, the loadout estimator, add-ons, how
// hardware works and the pricing questions. Every number comes from content/pricing.ts (approved by Bruce).

export const Pricing: React.FC = () => {
  useReveal();
  useHashScroll({ compare: 'tiers', 'add-ons': 'loadout' });
  const audit = auditPrices();
  const gov = tier('gov'), command = tier('command');
  const ladder = TIERS.filter((t) => t.id !== 'gov');
  const brief = LOOPS.missionBrief;
  const steps = [
    ['01', 'Recon', `The ${audit.remote} audit maps how you work and names the first things worth fixing.`],
    ['02', 'Build', 'Your Command Center goes on a machine you own, with only the modules you use.'],
    ['03', 'Train', 'You and your people learn it on your real work, not a demo.'],
    ['04', 'Command', 'I host it and keep it current, or care for it on your machine. New features roll in; your theme stays yours.'],
  ];

  return (
    <main>
      <PageIntro
        op="OP-05" tag="Pricing"
        title={<>Pay once. <span className="sig">Own the system.</span></>}
        sub={<p>Start with a clear plan. Add a build when it makes sense. The audit is a plan and one thing you keep. Foundation and Operator are builds: I install the software on a machine you own, paid once. After that, monthly is optional: Command, where I host it for you, or care on your own machine. Stop either anytime.</p>}
        actions={<>
          <a href="#loadout" className="btn btn-primary">Build your loadout <ArrowRight size={18} /></a>
          <Link to="/book/" className="btn btn-outline">Book the {audit.remote} audit</Link>
        </>}
        aside={
          <Chamfer className="reveal hidden md:block" innerClassName="p-6 md:p-8">
            <p className="label">Every tier, every time</p>
            <ul className="mt-5 space-y-3 text-lg text-ink">
              <Check>Done for you, start to finish</Check>
              <Check>On a machine you own, or hosted by me</Check>
              <Check>Your files and accounts stay yours</Check>
              <Check>Scope and price in writing before work starts</Check>
              <Check>Training on your real work, not a demo</Check>
            </ul>
          </Chamfer>
        }
      />

      {/* ── 01 how it works ── */}
      <GridBand id="how-it-works" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="01" label="How it works" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Here’s the mission. Here’s the gear. <span className="sig">Execute.</span></Display>
          <div className={`mt-10 grid gap-6 ${brief ? 'lg:grid-cols-[1.4fr_1fr] lg:items-center' : ''}`}>
            {brief && <Chamfer className="reveal" innerClassName="overflow-hidden"><Loop src={brief.mp4} webm={brief.webm} poster={brief.poster} label={brief.label} className="block aspect-video w-full object-cover" /></Chamfer>}
            {brief && <ol className="sr-only md:hidden">{steps.map(([n, t, d]) => <li key={n}>{t}: {d}</li>)}</ol>}
            <Swipe label="How it works" className={brief ? 'hidden md:block' : ''} desktop={brief ? 'md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-1' : 'md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4'}>
              {steps.map(([n, t, d]) => (
                <div key={n} className={`panel h-full p-6 ${brief ? 'lg:flex lg:items-baseline lg:gap-4 lg:p-4' : ''}`}>
                  <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                  <div>
                    <p className={`display mt-4 text-4xl ${brief ? 'lg:mt-0 lg:text-3xl' : ''}`}>{t}</p>
                    <p className={`mt-3 text-ink-2 ${brief ? 'lg:mt-1' : ''}`}>{d}</p>
                  </div>
                </div>
              ))}
            </Swipe>
          </div>
        </div>
      </GridBand>

      {/* ── 02 tiers ── */}
      <GridBand id="tiers" tone="raised" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="02" label="Tiers" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Pick a tier. <span className="sig">Same standard.</span></Display>
            <p className="reveal hidden text-lg text-ink-2 md:block">The audit tells you what’s worth building. Foundation gets you one dashboard and an agent. Operator is the whole system in your brand. Command: I host it and keep it current.</p>
          </div>
          <Swipe label="Tiers" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" className="mt-8 md:mt-10">
            {ladder.map((t) => <TierCard key={t.id} t={t} />)}
          </Swipe>
          <div className="reveal panel mt-6 grid gap-4 p-5 md:mt-4 md:gap-6 md:p-6 lg:grid-cols-[0.9fr_1.6fr_auto] lg:items-center">
            <div>
              <p className="label">{gov.op}</p>
              <p className="display mt-2 text-3xl">{gov.name}</p>
              <p className="mt-1 text-sm text-ink-3">{gov.sub}</p>
              <p className="display mt-2 text-3xl md:mt-3">{gov.price} <span className="label align-middle">{gov.per}</span></p>
            </div>
            <div>
              <p className="text-ink-2">{gov.forWho}<span className="hidden md:inline"> A low-cost commercial pilot doesn’t set the price of a government or enterprise scope.</span></p>
              <ul className="mt-4 hidden gap-2 text-[15px] text-ink sm:grid sm:grid-cols-2">
                {gov.includes.map((x) => <Check key={x}>{x}</Check>)}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to={gov.cta.href} className="btn btn-outline">{gov.cta.label}</Link>
              <Link to="/contact/?topic=government" className="btn btn-outline hidden sm:inline-flex">Teaming inquiry</Link>
            </div>
          </div>

          {/* side by side from tablets up; on phones the tier cards above already list the same things */}
          <div id="compare" className="hidden scroll-mt-24 pt-16 md:block md:pt-20">
            <Display as="h3" className="reveal text-4xl md:text-5xl">What’s in <span className="sig">each tier.</span></Display>
            <CompareTable />
            <div className="mt-10 lg:hidden">
              <Swipe label="Compare the tiers" desktop="md:grid md:grid-cols-2 md:gap-4">
                {COMPARE_TIERS.map((id) => <CompareCard key={id} id={id} />)}
              </Swipe>
            </div>
          </div>
        </div>
      </GridBand>

      {/* ── 04 loadout ── */}
      <GridBand id="loadout" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="03" label="Build your loadout" right={<span className="label">Estimate</span>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Build your <span className="sig">loadout.</span></Display>
            <p className="reveal hidden text-lg text-ink-2 md:block">Start with the audit and choose what you leave with, or pick a build, add what you need and choose how it’s kept current. The numbers move as you go. A build is an estimate: the audit sets the real scope, in writing.</p>
          </div>
          <div className="mt-8 md:mt-10"><Loadout /></div>

          {/* the add-on price list from tablets up; on phones the estimator above lists every add-on with its price */}
          <div id="add-ons" className="hidden scroll-mt-24 pt-16 md:block md:pt-20">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <Display as="h3" className="reveal text-4xl md:text-5xl">Add what <span className="sig">the job needs.</span></Display>
              <p className="reveal text-lg text-ink-2">Book them with the install or later. A workflow buildout also works on its own, after the audit. Operator already includes the custom theme and the move-in.</p>
            </div>
            <Swipe label="Add-ons" desktop="md:grid md:grid-cols-3 md:gap-4 xl:grid-cols-5" item="basis-[70%] sm:basis-[45%]" className="mt-10">
              {ADD_ONS.map((a) => (
                <div key={a.name} className="panel flex h-full flex-col p-5">
                  <p className="text-lg font-semibold leading-snug text-ink">{a.name}</p>
                  <p className="mt-2 flex-1 text-[15px] text-ink-2">{a.note}</p>
                  <p className="display mt-5 text-4xl">{a.price}</p>
                </div>
              ))}
            </Swipe>
          </div>
        </div>
      </GridBand>

      {/* ── 06 hardware ── */}
      <GridBand id="hardware" tone="raised" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader num="04" label="Hardware" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">It runs on <span className="sig">a machine you own.</span></Display>
            <p className="reveal mt-6 hidden text-lg text-ink-2 md:block">Not a seat in somebody else’s app. The Command Center runs on hardware you control: a machine at your place, or a cloud server in your name. Your files sit on storage you can see and back up.</p>
            <ul className="reveal mt-6 space-y-2.5 text-ink md:space-y-3">
              <Check>Hardware is at cost. You pay what the machine costs, and I set it up.</Check>
              <Check>Reachable from your devices on your network, and remotely if you want it that way.</Check>
              <Check>With Command, I run the health checks and verify your backups.</Check>
              <Check>Local AI models are an option when the machine and the job allow it.</Check>
            </ul>
          </div>
          <Swipe label="Hardware options" desktop="md:grid md:grid-cols-1 md:content-start md:gap-3" item="basis-[80%] sm:basis-[55%]">
            {[
              [HardDrive, 'A machine you already have', 'A spare Mac, a workstation or a server in the closet. The audit checks whether it’s up to the job.'],
              [Cpu, 'A mini PC', 'Small, quiet and always on. I source it at cost and set it up.'],
              [MonitorSmartphone, 'A Mac mini', 'The same idea on Apple hardware. Sourced at cost and set up.'],
            ].map(([Icon, t, d]: any) => (
              <div key={t} className="panel flex h-full gap-4 p-5"><Icon size={22} className="mt-0.5 shrink-0 text-signal-text" /><span><b className="block text-lg font-semibold text-ink">{t}</b><span className="text-ink-2">{d}</span></span></div>
            ))}
          </Swipe>
        </div>
        <div id="hosted" className="reveal scroll-mt-24 pb-12 md:pb-24">
          <div className="border-theme border-dashed border-line p-6 md:p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip border-theme border-signal bg-signal px-2.5 py-1 text-sm text-signal-ink" style={{ borderRadius: 'var(--radius)' }}>{command.name} · {command.price}/mo</span>
              <span className="label">Limited to {HOSTING.slots} slots · we confirm it fits before you pay</span>
            </div>
            <Display className="mt-5 text-4xl md:text-5xl">No machine at home? <span className="sig">I'll host it.</span></Display>
            <p className="mt-4 max-w-3xl text-lg text-ink-2">Your own private Command Center on my servers, kept separate from other clients, with backups, health checks and new features rolled in. That’s Command: {command.price} a month after a Foundation or Operator build. You can take your data and move it onto your own machine whenever you want.</p>
            <p className="label mt-6">Self-hosted services that come with it, tied into your business</p>
            <ul className="mt-3 grid auto-rows-fr grid-cols-2 gap-2 lg:grid-cols-4">
              {HOSTING.services.map(([what, app]) => (
                <li key={app} className="panel px-3 py-2.5"><b className="block text-sm font-semibold text-ink">{what}</b><span className="text-xs text-ink-3">{app}</span></li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-3">No local AI models on hosted slots for now; your agents use the AI plan you already have.</p>
            <Link to={command.cta.href} className="btn btn-outline mt-6">{command.cta.label}</Link>
            <p className="mt-6 border-t border-line pt-4 text-ink-2">{HOSTING_LITE} <Link to="/book/?event=fit" className="font-semibold text-ink underline underline-offset-2">Ask on a free fit call</Link></p>
          </div>
        </div>
      </GridBand>

      {/* ── 07 questions ── */}
      <GridBand id="faq" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="05" label="Pricing questions" right={<Link to="/faq/" className="label hover:!text-ink">All questions →</Link>} />
          <div className="mt-8 grid gap-8 md:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Display className="reveal text-5xl md:text-6xl">Straight <span className="sig">answers.</span></Display>
              <p className="reveal mt-6 hidden text-lg text-ink-2 md:block">Something else on your mind? Call the intake line at <a href="tel:+18668296757" className="whitespace-nowrap font-semibold text-ink underline underline-offset-4">(866) 829-6757</a> or <Link to="/contact/" className="font-semibold text-ink underline underline-offset-4">send a message</Link>.</p>
            </div>
            <Accordion className="reveal" items={faqGroup('pricing').items} />
          </div>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};

const TierCard: React.FC<{ t: Tier }> = ({ t }) => (
  <div className={`flex h-full flex-col p-5 md:p-6 ${t.featured ? 'border-theme border-signal bg-ground rounded-theme-lg' : 'panel'}`}>
    <p className="label">{t.op}{t.featured && <span className="sig"> · Recommended</span>}</p>
    <h3 className="display mt-3 text-4xl">{t.name}</h3>
    <p className="text-sm text-ink-3">{t.sub}</p>
    <p className="display mt-5 text-5xl tabular-nums"><span className={t.featured ? 'sig' : ''}>{t.price}</span></p>
    <p className="label">{t.per}</p>
    <p className="mt-3 text-[15px] text-ink-2 md:mt-4 md:text-base">{t.forWho}</p>
    <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[14px] leading-snug text-ink md:mt-5 md:space-y-2 md:pt-5 md:text-[15px]">
      {t.includes.map((x) => <Check key={x}>{x}</Check>)}
    </ul>
    <div className="mt-auto pt-5 md:pt-6">
      <Link to={t.cta.href} className={`btn w-full ${t.featured ? 'btn-primary' : 'btn-outline'}`}>{t.cta.label}</Link>
    </div>
  </div>
);

const Cell: React.FC<{ v: string | null }> = ({ v }) => v ? <>{v}</> : <><span aria-hidden="true" className="text-ink-3">—</span><span className="sr-only">Not part of this tier</span></>;

/** Desktop: one table, tiers across the top. */
const CompareTable: React.FC = () => (
  <div className="reveal mt-10 hidden border-theme border-line bg-ground-2 rounded-theme-lg lg:block" style={{ overflow: 'hidden' }}>
    <table className="w-full table-fixed border-collapse text-left">
      <caption className="sr-only">What each tier includes</caption>
      <colgroup><col className="w-[15%]" />{COMPARE_TIERS.map((id) => <col key={id} />)}</colgroup>
      <thead>
        <tr className="border-b border-line">
          <th scope="col" className="p-4 align-bottom xl:p-5"><span className="label">Tier</span></th>
          {COMPARE_TIERS.map((id) => { const t = tier(id); return (
            <th key={id} scope="col" className={`p-4 align-top xl:p-5 ${t.featured ? 'bg-signal/10' : ''}`}>
              <span className="label block">{t.op}{t.featured && <span className="sig"> · Recommended</span>}</span>
              <span className="display mt-2 block text-2xl xl:text-3xl">{t.name}</span>
              <span className="mt-1 block font-mono text-base font-semibold text-ink">{t.price}</span>
              <span className="block font-mono text-xs font-normal text-ink-3">{t.per}</span>
            </th>
          ); })}
        </tr>
      </thead>
      <tbody>
        {COMPARE_ROWS.map((r) => (
          <tr key={r.label} className="border-b border-line-2 last:border-b-0">
            <th scope="row" className="p-4 align-top font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-3 xl:p-5">{r.label}</th>
            {COMPARE_TIERS.map((id) => <td key={id} className={`p-4 align-top text-[15px] leading-snug text-ink xl:p-5 ${tier(id).featured ? 'bg-signal/10' : ''}`}><Cell v={r.cells[id]} /></td>)}
          </tr>
        ))}
        <tr>
          <td className="p-4 xl:p-5" />
          {COMPARE_TIERS.map((id) => { const t = tier(id); return (
            <td key={id} className={`p-4 xl:p-5 ${t.featured ? 'bg-signal/10' : ''}`}><Link to={t.cta.href} className={`btn w-full !whitespace-normal !px-3 text-center !text-[14px] ${t.featured ? 'btn-primary' : 'btn-outline'}`}>{t.cta.label}</Link></td>
          ); })}
        </tr>
      </tbody>
    </table>
  </div>
);

/** Phones and tablets: the same rows, one card per tier (a swipe row on phones). */
const CompareCard: React.FC<{ id: (typeof COMPARE_TIERS)[number] }> = ({ id }) => {
  const t = tier(id);
  return (
    <div className={`flex h-full flex-col p-5 ${t.featured ? 'border-theme border-signal bg-ground rounded-theme-lg' : 'panel'}`}>
      <p className="label">{t.op}{t.featured && <span className="sig"> · Recommended</span>}</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="display text-3xl">{t.name}</h3>
        <p className="font-mono text-sm font-semibold text-ink">{t.price} <span className="font-normal text-ink-3">{t.per}</span></p>
      </div>
      <dl className="mt-4 flex-1 divide-y divide-line-2 border-t border-line">
        {COMPARE_ROWS.filter((r) => r.cells[id]).map((r) => (
          <div key={r.label} className="grid grid-cols-[96px_1fr] gap-3 py-2.5">
            <dt className="pt-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-3">{r.label}</dt>
            <dd className="text-[15px] leading-snug text-ink">{r.cells[id]}</dd>
          </div>
        ))}
      </dl>
      <Link to={t.cta.href} className={`btn mt-5 w-full ${t.featured ? 'btn-primary' : 'btn-outline'}`}>{t.cta.label}</Link>
    </div>
  );
};
