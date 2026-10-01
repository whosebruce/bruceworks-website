import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HardDrive, Lock, ShieldCheck, Wifi } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, Loop, OpTag, PhotoPanel, SectionHeader, useReveal } from '../components/brand';
import { DemoFrame } from '../components/DemoFrame';
import { ThemeRow } from '../components/ThemePicker';
import { StackCalculator } from '../components/StackCalculator';
import { ModuleGrid, MODULE_ICON } from '../components/ModuleGrid';
import { ContactCTA } from '../components/ContactCTA';
import { THEMES } from '../theme/themes';
import { useTheme } from '../theme/ThemeProvider';
import { USE_CASES } from '../content/usecases';
import { moduleById } from '../content/modules';
import { TIERS } from '../content/pricing';
import { LOOPS, STILLS } from '../content/media';

const CREDENTIALS = [
  ['SDVOSB', 'SBA VetCert · Active'],
  ['VOSB', 'SBA VetCert · Active'],
  ['DVBE', 'California · Certified'],
  ['SAM.gov', 'Active · All awards'],
];

const SQUAD = [
  { id: 'mira', name: 'Mira', job: 'Command and data', line: 'Keeps the whole operation in view: what’s due, what changed, what needs you.' },
  { id: 'apollo', name: 'Apollo', job: 'Automations', line: 'Wires the repeat work: follow-ups, file sorting, the jobs that run at 2 a.m.' },
  { id: 'jade', name: 'Jade', job: 'Content', line: 'Scripts, captions, thumbnails and the content calendar.' },
  { id: 'otto', name: 'Otto', job: 'Ops', line: 'Checklists, maintenance and the boring stuff that keeps it all running.' },
] as const;

const STEPS = [
  ['01', 'Recon', 'A $197 audit maps how you work and names the first things worth fixing.'],
  ['02', 'Build', 'Your Command Center goes on a machine you own, with only the modules you use.'],
  ['03', 'Train', 'You and your people learn it on your real work, not a demo.'],
  ['04', 'Command', 'It keeps getting better: new features roll in, your theme stays yours.'],
];

export const Home: React.FC = () => {
  useReveal();
  const { theme } = useTheme();
  const [usecase, setUsecase] = React.useState(USE_CASES[0].id);
  const uc = USE_CASES.find((u) => u.id === usecase)!;

  return (
    <main>
      {/* ── hero: the pitch, the theme switch and the real product ── */}
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

      {/* ── credentials ── */}
      <section className="border-y border-line bg-ground-2">
        <div className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {CREDENTIALS.map(([k, v]) => (
            <Link key={k} to="/government-capabilities/" className="group px-4 py-5 md:px-6">
              <p className="display text-2xl md:text-3xl">{k}</p>
              <p className="label mt-1 group-hover:!text-ink">{v}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 01 the stack ── */}
      <GridBand id="stack">
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The stack" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">You don't need more apps. <span className="sig">You need a system.</span></Display>
            <p className="reveal text-lg text-ink-2">Every app wants its own login, its own subscription and its own copy of your files. Want the notes from one, the PDFs from another and the AI from a third? Tick what you pay for now and see where each one goes.</p>
          </div>
          <div className="reveal mt-10"><StackCalculator /></div>
        </div>
      </GridBand>

      {/* ── 02 one dashboard ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="One dashboard" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Sixteen tools. <span className="sig">One login.</span> Every one a switch.</Display>
            <p className="reveal text-lg text-ink-2">Turn on what you use. Leave the rest off and it's gone: out of the sidebar, out of the search, not running. Flip a few and watch the sidebar change.</p>
          </div>
          <div className="reveal mt-10"><ModuleGrid /></div>
        </div>
      </GridBand>

      {/* ── 03 one place for every mission ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="Built to your life" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Work, homework, skits, content. <span className="sig">Same dashboard.</span></Display>
          <div role="tablist" aria-label="Who it's for" className="reveal mt-10 flex flex-wrap gap-2">
            {USE_CASES.map((u) => (
              <button key={u.id} role="tab" aria-selected={u.id === usecase} onClick={() => setUsecase(u.id)}
                className={`chip border-theme px-4 py-2.5 text-base transition-colors ${u.id === usecase ? 'border-signal bg-signal text-signal-ink' : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink'}`} style={{ borderRadius: 'var(--radius)' }}>{u.who}</button>
            ))}
          </div>
          <div role="tabpanel" className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="panel p-6">
              <p className="label">{uc.who}</p>
              <p className="display mt-3 text-3xl">{uc.line}</p>
            </div>
            <ol className="panel divide-y divide-line-2">
              {uc.day.map((s) => { const m = moduleById(s.module); const I = MODULE_ICON[m.id]; return (
                <li key={s.time + s.what} className="grid grid-cols-[56px_1fr] gap-3 p-4 sm:grid-cols-[64px_1fr_140px] sm:items-center">
                  <span className="font-mono text-sm font-semibold text-alert">{s.time}</span>
                  <span className="text-ink">{s.what}</span>
                  <span className="col-start-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 sm:col-start-3 sm:justify-end"><I size={14} className="text-signal-text" />{m.name}</span>
                </li>
              ); })}
            </ol>
          </div>
        </div>
      </GridBand>

      {/* ── 04 your brand ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="04" label="Your look" right={<Link to="/themes/" className="label hover:!text-ink">All themes →</Link>} />
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Display className="reveal text-5xl md:text-6xl">It wears <span className="sig">your brand.</span></Display>
              <p className="reveal mt-6 text-lg text-ink-2">Colors, type, corners, your logo. A law office gets calm navy, a bakery gets warm and round, a garage gets Field Manual. Same engine underneath, and new features roll in without touching your look.</p>
              <p className="reveal mt-4 text-ink-2">This whole site runs on the same idea. Pick one:</p>
              <ul className="reveal mt-5 grid gap-2 sm:grid-cols-2">
                {THEMES.map((t) => <ThemeCard key={t.id} id={t.id} />)}
              </ul>
            </div>
            <div className="reveal">
              {LOOPS.themeMorph ? (
                <Chamfer><Loop src={LOOPS.themeMorph.mp4} webm={LOOPS.themeMorph.webm} poster={LOOPS.themeMorph.poster} label={LOOPS.themeMorph.label} className="block w-full" /></Chamfer>
              ) : <ThemeMock />}
            </div>
          </div>
        </div>
      </GridBand>

      {/* ── 05 agent native ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="05" label="Agent native" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">A squad that works <span className="sig">where your files are.</span></Display>
            <p className="reveal text-lg text-ink-2">Your agents live inside the Command Center, next to your documents and your calendar, so they work with real context instead of whatever you paste in. Anything risky waits for your OK.</p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SQUAD.map((b, i) => { const art = STILLS[b.id]; return (
              <li key={b.id} className="reveal">
                <PhotoPanel tilt={i % 2 ? 2 : -2} className="aspect-square" label={b.name}>
                  {art ? <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="h-full w-full object-cover" /> : <ArtPlaceholder name={b.name} />}
                </PhotoPanel>
                <p className="display mt-5 text-3xl">{b.name}</p>
                <p className="label mt-1">{b.job}</p>
                <p className="mt-2 text-ink-2">{b.line}</p>
              </li>
            ); })}
          </ul>
        </div>
      </GridBand>

      {/* ── 06 your data stays home ── */}
      <GridBand tone="raised">
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <SectionHeader num="06" label="Privacy" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Your data <span className="sig">stays home.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">The Command Center runs on hardware you own: a Mac mini, a mini PC or a server in the closet. Your files never sit in somebody else's app.</p>
          </div>
          <ul className="reveal grid content-start gap-3 text-lg text-ink">
            {[
              [HardDrive, 'On your machine', 'Files, notes and history live on storage you own and can unplug.'],
              [Lock, 'Keys stay out of chats', 'The Vault hands an agent a password without it ever landing in a message.'],
              [ShieldCheck, 'You approve the risky stuff', 'Agents ask before they send, delete or run anything that matters.'],
              [Wifi, 'Reachable when you want it', 'From any device on your network, or remotely if you set it up that way.'],
            ].map(([Icon, t, d]: any) => (
              <li key={t} className="panel flex gap-4 p-5"><Icon size={22} className="mt-0.5 shrink-0 text-signal-text" /><span><b className="block font-semibold">{t}</b><span className="text-base text-ink-2">{d}</span></span></li>
            ))}
          </ul>
        </div>
      </GridBand>

      {/* ── 07 how it works ── */}
      <GridBand id="how-it-works">
        <div className="py-16 md:py-24">
          <SectionHeader num="07" label="How it works" />
          <Display className="reveal mt-8 text-5xl md:text-6xl">Here's the mission. Here's the gear. <span className="sig">Execute.</span></Display>
          <ol className="mt-10 grid gap-px border-theme border-line bg-line md:grid-cols-4" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="reveal bg-ground p-6">
                <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                <p className="display mt-4 text-4xl">{t}</p>
                <p className="mt-3 text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </GridBand>

      {/* ── 08 tiers ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="08" label="Tiers" right={<Link to="/pricing/" className="label hover:!text-ink">Full pricing →</Link>} />
          <Display className="reveal mt-8 text-5xl md:text-6xl">Pick your <span className="sig">loadout.</span></Display>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TIERS.filter((t) => t.id !== 'gov').map((t) => (
              <li key={t.id} className={`reveal flex flex-col p-6 ${t.featured ? 'border-theme border-signal bg-ground' : 'panel'}`} style={t.featured ? { borderRadius: 'var(--radius-lg)' } : undefined}>
                <p className="label">{t.op} {t.featured && <span className="sig">· Most picked</span>}</p>
                <p className="display mt-3 text-4xl">{t.name}</p>
                <p className="text-sm text-ink-3">{t.sub}</p>
                <p className="display mt-5 text-5xl"><span className={t.featured ? 'sig' : ''}>{t.price}</span></p>
                <p className="label">{t.per}</p>
                <p className="mt-4 text-ink-2">{t.forWho}</p>
                <Link to={t.cta.href} className={`btn mt-6 ${t.featured ? 'btn-primary' : 'btn-outline'}`}>{t.cta.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </GridBand>

      {/* ── 09 government ── */}
      <GridBand>
        <div className="grid gap-8 py-16 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHeader num="09" label="Government and primes" />
            <Display className="reveal mt-8 text-5xl">Service-disabled veteran-owned. <span className="sig">Certified.</span></Display>
            <p className="reveal mt-5 text-lg text-ink-2">SBA VetCert SDVOSB and VOSB, California DVBE, and active in SAM.gov for all awards. Document and data operations, workflow modernization and private AI systems for agencies and prime contractors.</p>
          </div>
          <Chamfer className="reveal" innerClassName="p-6">
            <ul className="space-y-3 text-ink">
              <Check>SDVOSB and VOSB, SBA VetCert, active · renewal 09/30/2029</Check>
              <Check>California DVBE and Small Business (Micro), ID 2053352</Check>
              <Check>SAM.gov active, all awards · UEI N7YPC6B6YNC5 · CAGE 246J3</Check>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/government-capabilities/" className="btn btn-primary">Capabilities</Link>
              <Link to="/contact/?topic=government" className="btn btn-outline">Teaming inquiry</Link>
            </div>
          </Chamfer>
        </div>
      </GridBand>

      <HazardStrip />
      <ContactCTA />
    </main>
  );
};

const ThemeCard: React.FC<{ id: string }> = ({ id }) => {
  const { theme, setTheme } = useTheme();
  const t = THEMES.find((x) => x.id === id)!;
  const on = theme.id === t.id;
  return (
    <li>
      <button type="button" onClick={() => setTheme(t.id)} aria-pressed={on}
        className={`flex w-full items-center gap-3 border-theme p-3 text-left transition-colors ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}>
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 grid-cols-2 overflow-hidden border border-black/20" style={{ borderRadius: 'var(--radius)' }}>
          {t.swatch.map((c, i) => <span key={i} style={{ background: c }} />)}
        </span>
        <span className="min-w-0"><span className="block font-semibold text-ink">{t.name}</span><span className="block truncate text-xs text-ink-3">{t.tagline}</span></span>
      </button>
    </li>
  );
};

/** Until the theme-morph loop exists: a small live mock that re-skins with the site. */
const ThemeMock: React.FC = () => (
  <Chamfer innerClassName="p-0">
    <div className="flex h-9 items-center gap-2 border-b border-line bg-ground-3 px-3"><span className="label">Command // today</span></div>
    <div className="grid grid-cols-[52px_1fr]">
      <div className="space-y-3 border-r border-line bg-ground p-3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={`h-6 w-6 ${i === 1 ? 'bg-signal' : 'bg-ground-3'}`} style={{ borderRadius: 'var(--radius)' }} />)}</div>
      <div className="space-y-4 p-5">
        <p className="display text-4xl">Morning, Alex.</p>
        <div className="grid grid-cols-2 gap-3">
          {['Due today · 3', 'Agents working · 2'].map((x) => <div key={x} className="panel p-3"><p className="label">{x.split(' · ')[0]}</p><p className="display text-3xl">{x.split(' · ')[1]}</p></div>)}
        </div>
        <ul className="panel divide-y divide-line-2 text-sm">{['Send the Hernandez estimate', 'Chapter 5 quiz', 'Edit the skit intro'].map((x, i) => <li key={x} className="flex items-center gap-3 px-3 py-2.5 text-ink"><span className="sig">{i === 2 ? '☐' : '☑'}</span>{x}</li>)}</ul>
        <span className="btn btn-primary !min-h-[40px]">New task</span>
      </div>
    </div>
  </Chamfer>
);

const ArtPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="grid h-full w-full place-items-center bg-paper text-paper-ink"><span className="display text-6xl opacity-15">{name}</span></div>
);
