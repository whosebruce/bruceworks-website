import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Display, GridBand, HazardStrip, OpTag, SectionHeader, useReveal } from '../components/brand';
import { DemoFrame } from '../components/DemoFrame';
import { ThemeRow } from '../components/ThemePicker';
import { StackCalculator } from '../components/StackCalculator';
import { ModuleGrid, MODULE_ICON } from '../components/ModuleGrid';
import { Swipe } from '../components/Swipe';
import { AuditBand } from '../components/AuditBand';
import { GovernmentTrustStrip } from '../components/GovernmentTrustStrip';
import { BuiltStrip } from '../components/cases/BuiltStrip';
import { useTheme } from '../theme/ThemeProvider';
import { USE_CASES } from '../content/usecases';
import { moduleById, LIVE_MODULES, type ModuleId } from '../content/modules';
import { TIERS } from '../content/pricing';

// Home is the short version: the pitch and the product, what it replaces, what's inside, who it's for, the tiers, then
// the audit. Everything deeper lives on its own page (Command Center, Themes, Pricing, Government).


const FEATURED: ModuleId[] = ['crew', 'jot', 'office', 'files', 'studio', 'content', 'school', 'approvals'];

export const Home: React.FC = () => {
  useReveal();
  const { theme } = useTheme();
  const [usecase, setUsecase] = React.useState(USE_CASES[0].id);
  const uc = USE_CASES.find((u) => u.id === usecase)!;

  return (
    <main>
      {/* ── the pitch, the theme switch, the real product ── */}
      <GridBand className="texture border-t-0" marks={false}>
        <div className="pb-10 pt-12 md:pb-14 md:pt-20">
          <div className="max-w-5xl">
            <OpTag op="OP-01">Private AI Command Center</OpTag>
            <Display as="h1" className="mt-6 text-[clamp(3rem,8.5vw,7.25rem)]">
              Stop paying for <span className="sig">twelve apps.</span><br />Run it all from one.
            </Display>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
              One dashboard for your files, your docs, your tasks and your AI agents, built to the way you live and work.
              The business, the homework, the skit, the content: one place, on a machine you own.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/live-demo/" className="btn btn-primary">Try the live demo <ArrowRight size={18} /></Link>
              <Link to="/ai-leverage-audit/" className="btn btn-outline">Book the $197 audit</Link>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center">
            <p className="label shrink-0">Try a theme <span className="opacity-60">→</span></p>
            <ThemeRow compact />
          </div>
          <DemoFrame className="mt-5" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">The same Command Center Bruce runs his company on, wearing {theme.name}. Sample data only.</p>
        </div>
      </GridBand>

      {/* ── credentials (from the government facts file) ── */}
      <GovernmentTrustStrip />

      {/* ── 01 the stack ── */}
      <GridBand id="stack">
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The stack" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-10">
            <Display className="reveal text-5xl md:text-6xl">You don't need more apps. <span className="sig">You need a system.</span></Display>
            <p className="reveal text-lg text-ink-2">Every app wants its own login, its own subscription and its own copy of your files. Want the notes from one, the PDFs from another and the AI from a third? Tick what you pay for now and see where each one goes.</p>
          </div>
          <div className="reveal mt-10"><StackCalculator /></div>
        </div>
      </GridBand>

      {/* ── 02 what's inside ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="What's inside" right={<Link to="/command-center/" className="label hover:!text-ink">All {LIVE_MODULES.length} modules →</Link>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">{LIVE_MODULES.length} tools. <span className="sig">One login.</span> Every one a switch.</Display>
            <p className="reveal text-lg text-ink-2">Turn on what you use. Leave the rest off and it's gone: out of the sidebar, out of the search, not running.</p>
          </div>
          <div className="reveal mt-10"><ModuleGrid ids={FEATURED} /></div>
          <Link to="/command-center/" className="btn btn-outline mt-8 w-full md:w-auto">See everything it does</Link>
        </div>
      </GridBand>

      {/* ── 03 built to your life ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="Built to your life" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Work, homework, skits, content. <span className="sig">Same dashboard.</span></Display>
          <div role="tablist" aria-label="Who it's for" className="reveal -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
            {USE_CASES.map((u) => (
              <button key={u.id} role="tab" aria-selected={u.id === usecase} onClick={() => setUsecase(u.id)}
                className={`chip shrink-0 border-theme px-4 py-2.5 text-base transition-colors ${u.id === usecase ? 'border-signal bg-signal text-signal-ink' : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink'}`} style={{ borderRadius: 'var(--radius)' }}>{u.who}</button>
            ))}
          </div>
          <div role="tabpanel" className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
            <div className="panel p-6">
              <p className="label">{uc.who}</p>
              <p className="display mt-3 text-3xl">{uc.line}</p>
            </div>
            <Swipe label={`A day for a ${uc.who.toLowerCase()}`} desktop="md:grid md:grid-cols-1 md:gap-0 md:panel md:divide-y md:divide-line-2" item="basis-[78%] sm:basis-[48%]" key={uc.id}>
              {uc.day.map((s) => { const m = moduleById(s.module); const I = MODULE_ICON[m.id]; return (
                <div key={s.time + s.what} className="panel flex h-full flex-col gap-3 p-4 md:grid md:grid-cols-[64px_1fr_150px] md:items-center md:border-0 md:bg-transparent">
                  <span className="font-mono text-sm font-semibold text-alert">{s.time}</span>
                  <span className="text-ink">{s.what}</span>
                  <span className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 md:mt-0 md:justify-end"><I size={14} className="text-signal-text" />{m.name}</span>
                </div>
              ); })}
            </Swipe>
          </div>
        </div>
      </GridBand>

      {/* ── brands we've built ── */}
      <GridBand tone="raised">
        <div className="py-14 md:py-20">
          <SectionHeader num="04" label="Proof" right={<Link to="/case-studies/" className="label hover:!text-ink">Case studies →</Link>} />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Brands we've built. <span className="sig">Wear any of them.</span></Display>
          <p className="reveal mt-5 max-w-2xl text-lg text-ink-2">Real clients, real sites. Tap a theme and this whole site re-skins in their brand: that's what your own Command Center can look like.</p>
          <BuiltStrip className="reveal mt-10" heading={false} />
        </div>
      </GridBand>

      {/* ── 05 your look (the full gallery is /themes/) ── */}
      <section className="border-t border-line bg-ground-2">
        <div className="container-x flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <SectionHeader num="05" label="Your look" />
            <Display className="reveal mt-6 text-4xl md:text-5xl">It wears <span className="sig">your brand.</span></Display>
            <p className="reveal mt-4 text-ink-2">Your colors, your type, your corners. This whole site runs on the same idea. Tap one.</p>
          </div>
          <div className="flex flex-col gap-4 lg:max-w-xl lg:items-end">
            <ThemeRow />
            <Link to="/themes/" className="label hover:!text-ink">Every theme, side by side →</Link>
          </div>
        </div>
      </section>

      {/* ── 06 tiers ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="06" label="Tiers" right={<Link to="/pricing/" className="label hover:!text-ink">Full pricing →</Link>} />
          <Display className="reveal mt-8 text-5xl md:text-6xl">Pick your <span className="sig">loadout.</span></Display>
          <Swipe label="Tiers" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" className="mt-10">
            {TIERS.filter((t) => t.id !== 'gov').map((t) => (
              <div key={t.id} className={`flex h-full flex-col p-6 ${t.featured ? 'border-theme border-signal bg-ground-2' : 'panel'}`} style={t.featured ? { borderRadius: 'var(--radius-lg)' } : undefined}>
                <p className="label">{t.op} {t.featured && <span className="sig">· Recommended</span>}</p>
                <p className="display mt-3 text-4xl">{t.name}</p>
                <p className="text-sm text-ink-3">{t.sub}</p>
                <p className="display mt-5 text-5xl"><span className={t.featured ? 'sig' : ''}>{t.price}</span></p>
                <p className="label">{t.per}</p>
                <p className="mt-4 text-ink-2">{t.forWho}</p>
                <Link to={t.cta.href} className={`btn mt-auto pt-0 ${t.featured ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: '1.5rem' }}>{t.cta.label}</Link>
              </div>
            ))}
          </Swipe>
          <p className="mt-6 text-sm text-ink-3">Agencies and primes: <Link to="/government-capabilities/" className="text-ink underline">government capabilities</Link>.</p>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
