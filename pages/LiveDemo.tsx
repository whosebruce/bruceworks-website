import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Settings2, Smartphone, type LucideIcon } from 'lucide-react';
import { Display, GridBand, HazardStrip, OpTag, SectionHeader, useReveal } from '../components/brand';
import { DemoFrame } from '../components/DemoFrame';
import { ThemeRow } from '../components/ThemePicker';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { MODULE_ICON } from '../components/ModuleGrid';
import { useTheme } from '../theme/ThemeProvider';

// /live-demo/: the real Command Center in demo mode (built separately into /demo/; DemoFrame shows a placeholder until
// it's there), big, with the theme row above it, a short "try this" checklist, what's real and what's sample, and
// what to do next. On phones the frame is a button that opens the demo full screen.

type Mission = { id: string; text: string; icon: LucideIcon; theme?: 'midnight-plush' };
const MISSIONS: Mission[] = [
  { id: 'jot', text: 'Open Jot and look at the sticky board.', icon: MODULE_ICON.jot },
  { id: 'plush', text: 'Flip the theme to Midnight Plush.', icon: Palette, theme: 'midnight-plush' },
  { id: 'school', text: 'Open an assignment in School: what the class handed out on one side, the work folder on the other.', icon: MODULE_ICON.school },
  { id: 'pdf', text: 'Open a PDF in Office and fill in a field.', icon: MODULE_ICON.office },
  { id: 'approval', text: 'Answer a sample approval in Crew.', icon: MODULE_ICON.approvals },
  { id: 'script', text: 'Open a video project in Content and read the notes pinned to its script.', icon: MODULE_ICON.content },
  { id: 'switch', text: 'Switch a module off in Settings → Features and watch the sidebar change.', icon: Settings2 },
];
const KEY = 'bw.demo.missions';

const NEXT = [
  ['OP-01', 'What’s inside', 'Every module in depth, the agents and their brakes, updates, hardware and privacy.', '/command-center/', 'The Command Center'],
  ['OP-03', 'Your look', 'Every theme side by side, and how one gets built from your brand.', '/themes/', 'The themes'],
  ['Tiers', 'Pricing', 'From the audit to the full build, then care or hosting. Done for you, on hardware you own or hosted by me.', '/pricing/', 'See the tiers'],
];

const REAL = [
  'The same Command Center code I run my company on, in demo mode.',
  'Every editor works on screen: documents, spreadsheets, slide decks and PDFs.',
  'The theme engine and every feature switch.',
];
const SAMPLE = [
  'Every name, file, chat, project and number is made up.',
  'Nothing is saved or sent. Anything that would write says so and stops.',
  'The agents’ chats are samples; they don’t answer in the demo.',
  'Some private areas stay hidden, like the files on disk, the terminals and the streamed browser.',
];

export const LiveDemo: React.FC = () => {
  useReveal();
  const { theme, setTheme } = useTheme();
  const [done, setDone] = React.useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return new Set(); }
  });
  const mark = (id: string, value?: boolean) => setDone((p) => {
    const n = new Set(p); (value ?? !n.has(id)) ? n.add(id) : n.delete(id);
    try { localStorage.setItem(KEY, JSON.stringify([...n])); } catch { /* private window: the ticks last this visit */ }
    return n;
  });

  return (
    <main>
      <GridBand className="texture border-t-0" marks={false}>
        <div className="pb-10 pt-10 md:pb-14 md:pt-14">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <OpTag op="OP-02">Live demo</OpTag>
              <Display as="h1" className="mt-5 text-[clamp(2.75rem,6.5vw,5.5rem)]">Click around. <span className="sig">Break nothing.</span></Display>
            </div>
            <p className="text-lg leading-relaxed text-ink-2">This is the real Command Center, running on sample data. Open anything, flip any switch, try any theme. Nothing you do here touches real files or reaches anyone.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            <p className="label shrink-0">Wear a theme <span className="opacity-60">→</span></p>
            <ThemeRow compact />
          </div>
          <DemoFrame className="mt-5" height="h-[460px] md:h-[min(86vh,940px)]" autoLoad />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Wearing {theme.name}. Sample data only.</p>
            <a href="#try" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink">What to try ↓</a>
          </div>
          <div className="panel mt-5 flex gap-4 p-5 md:hidden">
            <Smartphone size={22} className="mt-0.5 shrink-0 text-signal-text" />
            <p className="text-ink-2"><b className="block font-semibold text-ink">On a phone, it opens full screen.</b>It’s a whole desktop-class app, and a tiny frame inside a web page is no way to try it, so on a phone the demo gets the whole screen. Your back button brings you here. It’s at its best on a laptop or a tablet.</p>
          </div>
        </div>
      </GridBand>

      {/* ── 01 try this ── */}
      <GridBand id="try" className="scroll-mt-28">
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeader num="01" label="Try this" right={<span className="label">{done.size} / {MISSIONS.length}</span>} />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Seven things. <span className="sig">Ten minutes.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">A quick tour of what makes it one app instead of twelve. Tick them off as you go; this page remembers.</p>
            {done.size === MISSIONS.length && (
              <div className="reveal in mt-6 border-theme border-signal bg-ground-2 p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
                <p className="display text-3xl">Mission complete.</p>
                <p className="mt-2 text-ink-2">That’s the tour. The next step is yours: find out what yours would look like.</p>
                <Link to="/book/" className="btn btn-primary mt-4">Book the $197 audit</Link>
              </div>
            )}
          </div>
          <ol className="reveal panel divide-y divide-line-2" aria-label="Things to try">
            {MISSIONS.map((m, i) => { const I = m.icon; const on = done.has(m.id); const wearing = m.theme && theme.id === m.theme; return (
              <li key={m.id} className="flex items-start gap-3 p-4 sm:gap-4">
                <span className="w-7 shrink-0 pt-1 font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={on} onChange={() => mark(m.id)} className="mt-1.5 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
                  <span className={`min-w-0 ${on ? 'text-ink-3 line-through decoration-line' : 'text-ink'}`}>{m.text}</span>
                </label>
                {m.theme ? (
                  <button type="button" disabled={!!wearing} onClick={() => { setTheme(m.theme!); mark(m.id, true); }}
                    className="chip shrink-0 border-theme border-line px-2.5 py-1.5 text-sm text-ink-2 hover:border-ink-3 hover:text-ink disabled:opacity-50" style={{ borderRadius: 'var(--radius)' }}>
                    {wearing ? 'On' : 'Do it'}
                  </button>
                ) : <I size={18} className="mt-1 shrink-0 text-signal-text" aria-hidden="true" />}
              </li>
            ); })}
          </ol>
        </div>
      </GridBand>

      {/* ── 02 real vs sample ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="What’s real" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Real software. <span className="sig">Made-up data.</span></Display>
          <div className="reveal mt-10 grid gap-4 md:grid-cols-2">
            <div className="border-theme border-signal bg-ground p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
              <p className="label !text-ink">Real</p>
              <ul className="mt-4 space-y-3 text-ink">{REAL.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-signal-text">☑</span><span>{x}</span></li>)}</ul>
            </div>
            <div className="panel p-6">
              <p className="label">Sample</p>
              <ul className="mt-4 space-y-3 text-ink-2">{SAMPLE.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-ink-3">▸</span><span>{x}</span></li>)}</ul>
            </div>
          </div>
          <p className="reveal mt-6 max-w-3xl text-ink-2">Your build is the same software with your files, your agents and your theme, on a machine you own. And only the modules you use are switched on.</p>
        </div>
      </GridBand>

      {/* ── 03 next ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="What’s next" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Keep looking. <span className="sig">Or start yours.</span></Display>
          <p className="reveal mt-6 max-w-2xl text-lg text-ink-2">When you’re ready, the $197 audit below maps how you work, counts your stack and names what to build first. Until then:</p>
          <Swipe label="Keep looking" desktop="md:grid md:grid-cols-3 md:gap-4" className="reveal mt-10">
            {NEXT.map(([op, title, line, href, cta]) => (
              <Link key={href} to={href} className="panel group flex h-full flex-col p-6">
                <p className="label">{op}</p>
                <p className="display mt-4 text-4xl">{title}</p>
                <p className="mt-2 text-ink-2">{line}</p>
                <span className="mt-auto pt-6 font-semibold text-ink group-hover:underline">{cta} →</span>
              </Link>
            ))}
          </Swipe>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
