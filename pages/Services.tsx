import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, FileCheck2, KeyRound } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, Loop, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { DoorList, DoorsBand } from '../components/Doors';
import { Swipe } from '../components/Swipe';
import { SlotArt } from '../components/offers/Art';
import { useHashScroll } from '../components/offers/useHashScroll';
import { auditPrices, priceText, tier } from '../components/offers/tiers';
import { CARE, FIT_CALL, PRESENCE, WEBSITES } from '../content/pricing';
import { USE_CASES } from '../content/usecases';
import { LOOPS } from '../content/media';
import { californiaCertifications, identifiers, samRegistration, sbaCertifications } from '../content/government';

// /services/: what Bruce Works sells and the boundaries around it. The anchors (#ai-audit, #command-center-foundation,
// #workflow-buildout, #local-ai-setup, #pricing) are the ones old links and the old footer used; keep them. Prices: only
// the three doors (content/pricing.ts DOORS) show here; every other price is on /pricing/ (Bruce, 2026-10-22).

export const Services: React.FC = () => {
  useReveal();
  useHashScroll();
  const audit = auditPrices();
  const foundation = tier('foundation');
  const operator = tier('operator');
  const command = tier('command');
  const creds = LOOPS.credentials;

  return (
    <main>
      <PageIntro
        op="OP-06" tag="Services"
        title={<>Done for you. <span className="sig">Built to your work.</span></>}
        sub={<p>Stop paying for a stack of apps that add friction. I build you one Command Center on a machine you own: your files organized, your agents briefed, your workflows wired. Then I train you on it and, if you want, keep it current.</p>}
        actions={<>
          <Link to={FIT_CALL} className="btn btn-primary">Book a free call <ArrowRight size={18} /></Link>
          <Link to="/pricing/" className="btn btn-outline">See pricing</Link>
        </>}
        aside={
          <Chamfer className="reveal" innerClassName="p-2">
            <p className="label px-4 pb-2 pt-3">Three ways in</p>
            <DoorList />
            <Link to="/pricing/" className="label flex min-h-[44px] items-center border-t border-line-2 px-4 pt-1 hover:!text-ink">Every price, add-on and monthly option →</Link>
          </Chamfer>
        }
      />

      {/* ── the boundaries every engagement keeps ── */}
      <section className="border-y border-line bg-ground-2">
        <ul className="container-x grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            [KeyRound, 'Yours, on your machine', 'Accounts, files, subscriptions, credentials and hardware stay under your control wherever practical. The Command Center’s code stays private; your data never becomes mine.'],
            [FileCheck2, 'Defined deliverables', 'Every engagement has a written scope, acceptance criteria, training and a handoff. You know what done looks like before I start.'],
            [Eye, 'No black box', 'I don’t host your agents or hold your data by default. They run on your machine, you can see what each one does, and anything risky waits for your OK.'],
          ].map(([Icon, t, d]: any) => (
            <li key={t} className="flex gap-4 py-6 md:px-6 md:first:pl-0 md:last:pr-0">
              <Icon size={22} className="mt-0.5 shrink-0 text-signal-text" />
              <span><b className="block text-lg font-semibold text-ink">{t}</b><span className="text-ink-2">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 01 who it's for ── */}
      <GridBand id="who">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <SectionHeader num="01" label="Who I build for" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Owner-led businesses first. <span className="sig">Anyone with a mission.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">The shop, the firm, the crew where the owner still runs the day: that’s who I build for first. The same system fits a creator’s pipeline, a student’s semester and a family’s files.</p>
            <Swipe label="Who it's for" desktop="md:grid md:grid-cols-2 md:gap-3" item="basis-[78%] sm:basis-[48%]" className="mt-8">
              {USE_CASES.map((u) => (
                <div key={u.id} className="panel h-full p-5">
                  <p className="label">{u.who}</p>
                  <p className="mt-2 text-lg font-semibold leading-snug text-ink">{u.line}</p>
                </div>
              ))}
            </Swipe>
          </div>
          <SlotArt slot="bruceBriefing" label="Bruce" placeholder="Briefing" tilt={2} className="reveal hidden aspect-[4/5] lg:block" />
        </div>
      </GridBand>

      {/* ── 02 websites ── */}
      <GridBand id="websites" tone="raised" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader num="02" label="Offer 01 // Websites" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">A website that <span className="sig">works on a phone.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">For local businesses. {WEBSITES.preview.note} Already have a website? The free {PRESENCE.name} shows what stops a new customer from calling you, and I fix it.</p>
            <p className="reveal mt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">From {WEBSITES.quick.price} <span className="text-ink-3">·</span> see it before you pay <span className="text-ink-3">·</span> live within a week</p>
            <Link to={FIT_CALL} className="reveal btn btn-primary mt-8">Book a free call <ArrowRight size={18} /></Link>
          </div>
          <Chamfer className="reveal hidden self-start md:block" innerClassName="p-6 md:p-8">
            <p className="label">What you can get</p>
            <ul className="mt-5 space-y-3 text-ink">
              <Check>No website yet: a free preview of your homepage</Check>
              <Check>A one-page website, built for your trade, paid when you’re happy with it</Check>
              <Check>A custom website, up to five pages, designed around your business</Check>
              <Check>Have a site: your free report, then the Fix Sprint</Check>
              <Check>Anything bigger, quoted in writing</Check>
            </ul>
            <Link to="/pricing/#websites" className="label mt-6 inline-block hover:!text-ink">Website prices →</Link>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 03 the audit ── */}
      <GridBand id="ai-audit" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader num="03" label="Offer 02 // AI Leverage Audit" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Find the leaks <span className="sig">before you buy anything.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">A paid diagnosis of how you work. I map the workflow, name where time and information get lost, and hand you a ranked 30-day plan with a clear call: build, optimize or do nothing.</p>
            <p className="reveal mt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">{audit.remote} remote <span className="text-ink-3">·</span> in person in San Diego too</p>
            <p className="reveal mt-2 text-ink-2">Pilot audits target delivery within 7 business days after intake and source material are complete. The fee is credited toward a build booked within 30 days.</p>
            <Link to={FIT_CALL} className="reveal btn btn-primary mt-8">Book a free call <ArrowRight size={18} /></Link>
          </div>
          {/* the full deliverables list is on /ai-leverage-audit/; phones get the short version above */}
          <Chamfer className="reveal hidden self-start md:block" innerClassName="p-6 md:p-8">
            <p className="label">What you leave with</p>
            <ul className="mt-5 space-y-3 text-ink">
              <Check>Your current workflow mapped, bottlenecks named</Check>
              <Check>The top opportunities, ranked by time saved</Check>
              <Check>What data stays private, and where it lives</Check>
              <Check>The tools and hardware you already own that can be reused</Check>
              <Check>A recommended setup you own</Check>
              <Check>A 30-day action plan you can run without me</Check>
            </ul>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 04 command center install ── */}
      <GridBand id="command-center-foundation" tone="raised" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="04" label="Offer 03 // Command Center install" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">One dashboard, <span className="sig">on your machine.</span></Display>
            <div className="reveal space-y-4 text-lg text-ink-2">
              <p>Your files, notes, docs, tasks and AI agents in one place, built to how you work. It isn’t a platform you rent seats on: it runs on hardware you own (or, in a few slots, on my servers), and your accounts stay yours.</p>
              <p className="text-base">A typical install targets completion within 30 days after scope, access and source material are complete. Final timing is confirmed in writing.</p>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">{priceText(foundation)}, {foundation.per} <span className="text-ink-3">·</span> scope and price in writing before work starts</p>
            </div>
          </div>
          <Swipe label="Command Center installs" desktop="md:grid md:grid-cols-2 md:gap-4" className="mt-10">
            {[foundation, operator].map((t) => (
              <div key={t.id} id={t.id === 'operator' ? 'command-center-operator' : undefined} className={`flex h-full flex-col p-6 md:p-8 ${t.featured ? 'border-theme border-signal bg-ground-2 rounded-theme-lg' : 'panel'}`}>
                <p className="label">{t.op}{t.featured && <span className="sig"> · Recommended</span>}</p>
                <h3 className="display mt-3 text-4xl">{t.name}</h3>
                <p className="mt-3 text-ink-2">{t.forWho}</p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5 text-[15px] text-ink">
                  {t.includes.map((x) => <Check key={x}>{x}</Check>)}
                </ul>
                <Link to={t.cta.href} className={`btn mt-6 w-full ${t.featured ? 'btn-primary' : 'btn-outline'}`}>{t.cta.label}</Link>
              </div>
            ))}
          </Swipe>
          <p className="mt-6 text-ink-2">Side by side, with prices, add-ons and an estimate: <Link to="/pricing/#compare" className="font-semibold text-ink underline underline-offset-4">compare the tiers</Link>.</p>
        </div>
      </GridBand>

      {/* ── 05 workflow buildouts ── */}
      <GridBand id="workflow-buildout" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader num="05" label="Offer 04 // Workflow buildouts" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">One workflow at a time, <span className="sig">built end to end.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Pick one bounded job with an owner, inputs, outputs, a review point and a definition of done. I build it inside your Command Center, or on its own in the tools you already use, then write it down, train the people who run it and hand it over.</p>
            <p className="reveal mt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">On its own after the audit <span className="text-ink-3">·</span> two included in {operator.name} <span className="text-ink-3">·</span> a small one every month with {command.name} or care</p>
            <p className="reveal label mt-8">Jobs that fit</p>
            <ul className="reveal mt-3 grid gap-2 text-ink sm:grid-cols-2">
              <Check>Lead intake and follow-up</Check>
              <Check>Document intake, OCR, indexing and filing</Check>
              <Check>Estimates and proposals</Check>
              <Check>Content production and approval</Check>
              <Check>Project, task and customer handoffs</Check>
              <Check>Finding what’s already in your own files</Check>
            </ul>
            <Link to="/contact/?topic=workflow" className="reveal btn btn-outline mt-8">Ask about a workflow</Link>
          </div>
          <Chamfer className="reveal hidden self-start md:block" innerClassName="p-0">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-3 px-5 py-3">
              <span className="label !text-ink">Workflow // lead follow-up</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Example</span>
            </div>
            <dl className="divide-y divide-line-2">
              {[
                ['Owner', 'You, or the person who answers leads'],
                ['Inputs', 'The website form and the shared inbox'],
                ['Agent', 'Drafts the reply and the estimate, in your voice'],
                ['Review', 'You approve or edit from the dashboard or your phone'],
                ['Output', 'The reply sent, the lead filed under its project'],
                ['Done when', 'Every new lead gets an answer the same day'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[96px_1fr] gap-3 px-5 py-3.5">
                  <dt className="pt-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 06 local AI and hardware ── */}
      <GridBand id="local-ai-setup" tone="raised" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader num="06" label="Offer 05 // Local AI and hardware" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Your hardware. <span className="sig">Your data at home.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">By default, your Command Center runs on a machine you own. I can work with one you already have, or source a mini PC or Mac mini at cost and set it up. Local AI models, offline storage and extra backups get added when the job earns them, not by default.</p>
            <Link to="/pricing/#hardware" className="reveal btn btn-outline mt-8">How hardware works</Link>
          </div>
          <Chamfer className="reveal hidden self-start md:block" innerClassName="p-6 md:p-8">
            <p className="label">What this covers</p>
            <ul className="mt-5 space-y-3 text-ink">
              <Check>A fit check on the hardware you already own</Check>
              <Check>Local-first storage and a backup plan</Check>
              <Check>Secure remote access, if you want it</Check>
              <Check>A dedicated mini PC or workstation, set up</Check>
              <Check>Local AI models when the machine and the job allow it</Check>
              <Check>Ownership and support boundaries, in writing</Check>
            </ul>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 07 training and managed care ── */}
      <GridBand id="training" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="07" label="Offer 06 // Training and care" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Learn it on real work. <span className="sig">Keep it current.</span></Display>
            <p className="reveal text-lg text-ink-2">Training comes with every build, on your own files and jobs. After that, monthly is optional: {command.name} hosts it for you and keeps it current, or {CARE.name.toLowerCase()} does the same on your own machine, for the same monthly price. Stop either anytime. <Link to="/pricing/#hosted" className="font-semibold text-ink underline underline-offset-4">Monthly prices</Link></p>
          </div>
          <Swipe label="Training and managed care" desktop="md:grid md:grid-cols-2 md:gap-4" className="mt-8 md:mt-10">
            <div className="panel h-full p-5 md:p-8">
              <p className="label">Training</p>
              <ul className="mt-5 space-y-3 text-ink">
                <Check>{foundation.name}: one 90-minute session and 14 days of support</Check>
                <Check>{operator.name}: two sessions and 30 days of support</Check>
                <Check>A plain-English guide to your system, written for your people</Check>
                <Check>Extra sessions for new hires or new workflows, scoped when you need them</Check>
              </ul>
            </div>
            <div className="h-full border-theme border-signal bg-ground p-5 rounded-theme-lg md:p-8">
              <p className="label">{command.name} · monthly, after a build</p>
              <ul className="mt-5 space-y-3 text-ink">
                {command.includes.map((x) => <Check key={x}>{x}</Check>)}
              </ul>
              <Link to={command.cta.href} className="btn btn-primary mt-6 w-full sm:w-auto">{command.cta.label}</Link>
              <p className="mt-4 text-sm text-ink-3">Keeping it on your own machine? {CARE.name} is the same care at the same price. <Link to="/contact/?topic=care" className="underline underline-offset-2 hover:text-ink">Ask about care</Link></p>
            </div>
          </Swipe>
        </div>
      </GridBand>

      {/* ── 08 government ── */}
      <GridBand id="government" tone="raised" className="scroll-mt-24">
        <div className={`grid gap-8 py-12 md:gap-10 md:py-24 ${creds ? 'lg:grid-cols-[1fr_1.1fr] lg:items-center' : ''}`}>
          <div>
            <SectionHeader num="08" label="Offer 07 // Government" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Certified. Registered. <span className="sig">Ready to team.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Document and data operations, workflow modernization and private AI systems for agencies and prime contractors, on-premises or offline when the work calls for it. Government work is scoped and priced from its real requirements.</p>
            <ul className="reveal mt-6 space-y-3 text-ink">
              <Check>{sbaCertifications.certifications.map((c) => c.code).join(' and ')}, {sbaCertifications.programShort}, {sbaCertifications.certifications[0].status.toLowerCase()}</Check>
              <Check>California {californiaCertifications.certifications.map((c) => c.code).join(' and ')}, ID {californiaCertifications.certificationId}</Check>
              <Check>SAM.gov {samRegistration.statusShort.toLowerCase()}, {samRegistration.purpose.toLowerCase()} · UEI {identifiers.uei} · CAGE {identifiers.cage}</Check>
            </ul>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/government-capabilities/" className="btn btn-primary">Government capabilities</Link>
              <Link to="/contact/?topic=government" className="btn btn-outline">Teaming inquiry</Link>
            </div>
          </div>
          {creds && <Chamfer className="reveal" innerClassName="overflow-hidden"><Loop src={creds.mp4} webm={creds.webm} poster={creds.poster} label={creds.label} className="block aspect-video w-full object-cover" /></Chamfer>}
        </div>
      </GridBand>

      {/* ── 09 pricing: every number lives on /pricing/ ── */}
      <GridBand id="pricing" className="scroll-mt-24">
        <div className="py-12 md:py-24">
          <SectionHeader num="09" label="Pricing" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
            <Display className="reveal text-5xl md:text-6xl">Start small. <span className="sig">Scope the big work honestly.</span></Display>
            <div className="reveal space-y-4 text-lg text-ink-2">
              <p>Every price, add-on and monthly option is on one page, and your exact price is in writing before work starts. The audit prices are pilot prices for small commercial engagements. Government requirements, prime-contractor workshare, travel, security requirements, volume and formal deliverables are priced from their actual scope.</p>
              <p className="hidden text-base md:block">A low-cost commercial pilot doesn’t set the price of an unrelated government or enterprise scope. Those buyers are paying for the stated labor, risk, volume, controls, reporting, travel, schedule and acceptance requirements.</p>
            </div>
          </div>
          <Link to="/pricing/" className="reveal btn btn-primary mt-8">Every price <ArrowRight size={18} /></Link>
        </div>
      </GridBand>

      <HazardStrip />
      <DoorsBand />
    </main>
  );
};
