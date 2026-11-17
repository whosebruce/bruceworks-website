import React from 'react';
import { Link } from 'react-router-dom';
import { AppWindow, ArrowDown, ArrowRight, ArrowUpRight, Bot, ClipboardList, LayoutGrid, Monitor, Smartphone, Workflow, type LucideIcon } from 'lucide-react';
import { Display, GridBand, HazardStrip, OpTag, SectionHeader, useReveal } from '../components/brand';
import { ThemeRow } from '../components/ThemePicker';
import { DoorPrice, DoorsBand } from '../components/Doors';
import { GovernmentTrustStrip } from '../components/GovernmentTrustStrip';
import { BbbSeal } from '../components/BbbSeal';
import { BuiltStrip } from '../components/cases/BuiltStrip';
import { FieldBriefBand } from '../components/FieldBrief';
import { useHashScroll } from '../components/offers/useHashScroll';
import { FIT_CALL } from '../content/pricing';
import { STACK, STACK_DEFAULT } from '../content/stack';
import { moduleById } from '../content/modules';
import { BUILT, BUILT_LEDE, HERO, JOBS, PUNCH, STEPS, WAYS, door, type Cost, type JobIcon } from '../content/home';

// Home, services first (Bruce, 2026-11-14): what Bruce Works does before what it sells. The hero names the job and
// keeps the theme row; a sample punch list shows the kinds of fixes; then how it goes, every job, how much help you
// want, what's already been built here, the client brands, the Field Brief, and the free call. The product itself
// (the live demo, the stack calculator, the modules) lives on /command-center/ and /live-demo/, under Products.
// The words are in content/home.ts; the only prices are the three doors (see the note there).

const ICON: Record<JobIcon, LucideIcon> = {
  site: Smartphone, app: AppWindow, computer: Monitor, agent: Bot, build: LayoutGrid, workflow: Workflow, audit: ClipboardList,
};

const CostLine: React.FC<{ cost: Cost }> = ({ cost }) => ('door' in cost ? <DoorPrice d={door(cost.door)} /> : <>{cost.text}</>);

/** A link that may stay on this page (#jobs), go to another page, or leave the site. */
const More: React.FC<{ href: string; external?: boolean; className?: string; children: React.ReactNode }> = ({ href, external, className = '', children }) =>
  external ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
    : href.startsWith('#') ? <a href={href} className={className}>{children}</a>
    : <Link to={href} className={className}>{children}</Link>;

const radius = { borderRadius: 'var(--radius)' } as React.CSSProperties;

// the "before" in 01 is the stack calculator's opening example (content/stack.ts), so the two always agree
const before = STACK.filter((s) => STACK_DEFAULT.includes(s.id));
const beforeMonthly = before.reduce((n, s) => n + s.monthly, 0);
const after = [...new Set(before.flatMap((s) => s.by))].map(moduleById);
const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export const Home: React.FC = () => {
  useReveal();
  useHashScroll();

  return (
    <main>
      {/* ── the job, the theme switch, the punch list ── */}
      {/* no background texture behind the hero: its diagonal stripes read as static or a broken screen (Rod, 2026-11-05;
          Bruce, 2026-11-06). The texture stays on the other pages' bands */}
      <GridBand className="border-t-0" marks={false}>
        <div className="pb-12 pt-12 md:pb-16 md:pt-20">
          <div className="max-w-5xl">
            {/* local owners go straight to their own page (Bruce, 2026-11-01) */}
            <Link to="/websites/" className="mb-6 flex min-h-[44px] w-fit items-center gap-2 border-theme border-signal bg-signal/10 px-3 py-2 font-semibold leading-snug text-ink hover:bg-signal/20" style={radius}>
              Run a local business? See your homepage before you pay. <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
            </Link>
            <OpTag op="OP-01">{HERO.tag}</OpTag>
            <Display as="h1" className="mt-6 text-[clamp(2.75rem,7.2vw,6.25rem)]">
              {HERO.headline[0]}<span className="sig">{HERO.headline[1]}</span>{HERO.headline[2]}
            </Display>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">{HERO.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={FIT_CALL} className="btn btn-primary">Book a free call <ArrowRight size={18} /></Link>
              <a href="#jobs" className="btn btn-outline">See what gets fixed <ArrowDown size={18} /></a>
            </div>
            <p className="mt-3 text-sm text-ink-3">{HERO.fine}</p>
          </div>

          <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center">
            <p className="label shrink-0">Try a theme <span className="opacity-60">→</span></p>
            <ThemeRow compact />
          </div>

          <div className="panel mt-6 overflow-hidden" aria-label="Sample punch list" role="group">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
              <p className="label !text-ink-2">Punch list <span className="opacity-50">//</span> what owners call about</p>
              <span className="label">Sample</span>
            </div>
            <ul className="divide-y divide-line-2">
              {PUNCH.map((p) => (
                <li key={p.what} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-4 py-3.5 md:grid-cols-[28px_minmax(0,0.9fr)_minmax(0,1.6fr)_150px] md:items-center md:px-6">
                  <span aria-hidden="true" className={`mt-0.5 grid h-5 w-5 place-items-center border-theme md:mt-0 ${p.done ? 'border-signal bg-signal text-signal-ink' : 'border-line'}`} style={radius}>
                    {p.done && <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 7.5l3.5 3.5L12 3.5" /></svg>}
                  </span>
                  <span className="font-semibold text-ink">{p.what}<span className="sr-only">{p.done ? ' (fixed)' : ' (still open)'}</span></span>
                  <span className="col-start-2 row-start-2 text-ink-2 md:col-start-3 md:row-start-1">{p.fix}</span>
                  <span className="col-start-3 row-start-1 text-right font-mono text-sm text-ink md:col-start-4"><CostLine cost={p.cost} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GridBand>

      {/* ── credentials (from the government facts file) ── */}
      <GovernmentTrustStrip />
      {/* BBB under the government credentials, on its own row with its own label: a private accreditation, not a
          government certification. The badge (components/BbbSeal.tsx) says accredited and since when. */}
      <section aria-labelledby="bbb-trust-heading" className="border-b border-line bg-ground-2">
        <div data-bbb className="container-x flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="bbb-trust-heading" className="label">Business trust <span className="opacity-50">//</span> Better Business Bureau</h2>
          <BbbSeal className="shrink-0" />
        </div>
      </section>

      {/* ── 01 how it goes ── */}
      <GridBand id="how" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="How it goes" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Twelve logins, and you still do it by hand. <span className="sig">Now it’s one system you own.</span></Display>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <ol className="reveal space-y-6">
              {STEPS.map(([h, p], i) => (
                <li key={h} className="flex gap-4">
                  <span className="display grid h-12 w-12 shrink-0 place-items-center border-theme border-line text-2xl" style={radius}>{i + 1}</span>
                  <div><h3 className="text-xl font-semibold text-ink">{h}</h3><p className="mt-1 text-ink-2">{p}</p></div>
                </li>
              ))}
            </ol>
            {/* an estimate, not an offer price: the route check leaves [data-estimate] out of its price rule */}
            <div className="reveal grid gap-4 sm:grid-cols-2" data-estimate>
              <div className="panel p-5">
                <p className="label">Before</p>
                <p className="display mt-2 text-4xl">{before.length} apps</p>
                <p className="text-ink-2">{money(beforeMonthly)} a month</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {before.map((s) => <li key={s.id} className="border-theme border-line px-2 py-0.5 text-xs text-ink-3" style={radius}>{s.kind}</li>)}
                </ul>
              </div>
              <div className="panel border-signal p-5">
                <p className="label !text-signal-text">After</p>
                <p className="display mt-2 text-4xl">One Command Center</p>
                <p className="text-ink-2"><DoorPrice d={door('command-center')} />, once</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {after.map((m) => <li key={m.id} className="chip border-theme border-line bg-ground px-2 py-0.5 text-xs text-ink" style={radius}>{m.name}</li>)}
                </ul>
              </div>
              <p className="text-sm text-ink-3 sm:col-span-2">
                That stack runs about {money(beforeMonthly * 12)} a year on typical plans. Yours is different: <Link to="/command-center/#math" className="font-semibold text-ink underline underline-offset-4">run your own numbers</Link>.
              </p>
            </div>
          </div>
        </div>
      </GridBand>

      {/* ── 02 every job ── */}
      <GridBand id="jobs" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="What gets done" right={<Link to="/pricing/" className="label hover:!text-ink">Every price →</Link>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">One shop for <span className="sig">every digital job.</span></Display>
            <p className="reveal text-lg text-ink-2">Pick the job. Each one is done for you, start to finish.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {JOBS.map((j, i) => {
              const I = ICON[j.icon];
              // on wide screens: the two lead jobs share the first row, four jobs fill the next, and a `full` job takes
              // a row of its own, so no row is left half empty
              const span = j.full ? 'md:col-span-2 lg:col-span-4' : j.lead ? 'lg:col-span-2' : '';
              return (
                <article key={j.title} className={`panel reveal flex h-full flex-col p-5 md:p-6 ${span} ${j.star ? '!border-signal' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="label">Job {String(i + 1).padStart(2, '0')}{j.tag && <span className="text-signal-text"> · {j.tag}</span>}</span>
                    <I size={j.lead ? 34 : 28} strokeWidth={1.75} aria-hidden="true" className="text-signal-text" />
                  </div>
                  <h3 className={`display mt-4 ${j.lead ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{j.title}</h3>
                  <p className={`mt-3 flex-1 text-ink-2 ${j.full ? 'max-w-2xl' : ''}`}>{j.body}</p>
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-line-2 pt-4">
                    <span className="font-mono text-sm text-ink">{'door' in j ? <DoorPrice d={door(j.door)} /> : j.note}</span>
                    <More href={j.more.href} className="label inline-flex min-h-[44px] items-center hover:!text-ink">{j.more.label} →</More>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </GridBand>

      {/* ── 03 how much help ── */}
      <GridBand id="ways" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="How much help do you want" />
          <Display className="reveal mt-8 text-5xl md:text-6xl">Learn it, plan it, <span className="sig">or hand it off.</span></Display>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {WAYS.map((w) => (
              <article key={w.title} className={`panel reveal flex h-full flex-col p-5 md:p-6 ${w.pick ? '!border-signal' : ''}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-3xl">{w.title}</h3>
                  <span className="shrink-0 font-mono text-sm text-ink"><CostLine cost={w.cost} /></span>
                </div>
                <p className="mt-3 flex-1 text-ink-2">{w.body}</p>
                <More href={w.more.href} className={w.pick ? 'btn btn-primary mt-5' : 'label mt-5 inline-flex min-h-[44px] items-center hover:!text-ink'}>{w.more.label}{w.pick ? <ArrowRight size={18} /> : ' →'}</More>
              </article>
            ))}
          </div>
        </div>
      </GridBand>

      {/* ── 04 built in this shop: the custom software pitch, with real things to point at ── */}
      <GridBand id="built" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="04" label="Built in this shop" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Need an app that doesn’t exist? <span className="sig">We build those.</span></Display>
          <p className="reveal mt-5 max-w-2xl text-lg text-ink-2">{BUILT_LEDE}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {BUILT.map((p) => (
              <article key={p.name} className="panel reveal flex h-full flex-col p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  {/* each product's own app icon, with app-icon corners in every theme */}
                  <img src={p.logo} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 rounded-[22%] shadow-[0_6px_16px_-8px_rgb(var(--c-ink)/0.5)]" />
                  <span className={`chip border-theme px-2.5 py-1 text-xs ${p.live ? 'border-signal bg-signal/10 text-ink' : 'border-line text-ink-3'}`} style={radius}>{p.chip}</span>
                </div>
                <h3 className="display mt-5 text-3xl">{p.name}</h3>
                <p className="mt-3 flex-1 text-ink-2">{p.body}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 border-t border-line-2 pt-3">
                  {p.links.map((l) => (
                    <More key={l.href} href={l.href} external={l.external} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:underline">
                      {l.label} {l.external ? <ArrowUpRight size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
                    </More>
                  ))}
                  {p.note && <span className="label inline-flex min-h-[44px] items-center">{p.note}</span>}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to={FIT_CALL} className="btn btn-primary">Tell me what you need built <ArrowRight size={18} /></Link>
            <p className="text-sm text-ink-3">Scoped on a free call. Price in writing before work starts.</p>
          </div>
        </div>
      </GridBand>

      {/* ── 05 proof: client brands, and the site wears any of them ── */}
      <GridBand id="proof" className="scroll-mt-28">
        <div className="py-14 md:py-20">
          <SectionHeader num="05" label="Proof" right={<Link to="/case-studies/" className="label hover:!text-ink">Case studies →</Link>} />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Brands we've built. <span className="sig">Wear any of them.</span></Display>
          <p className="reveal mt-5 max-w-2xl text-lg text-ink-2">Real clients, real sites. Tap “Wear their theme” and this whole site re-skins in their brand. <Link to="/themes/" className="font-semibold text-ink underline underline-offset-4">Every theme, side by side</Link>.</p>
          <BuiltStrip className="reveal mt-10" heading={false} />
        </div>
      </GridBand>

      {/* ── 06 the Field Brief: the free kit for anyone just starting out ── */}
      <FieldBriefBand />

      <HazardStrip />
      <DoorsBand />
    </main>
  );
};
