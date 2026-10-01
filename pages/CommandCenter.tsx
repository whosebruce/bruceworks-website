import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, Database, HardDrive, Lock, MonitorPlay, Router, Server, ShieldCheck, Wifi } from 'lucide-react';
import { Chamfer, Check, Display, GridBand, HazardStrip, Loop, PhotoPanel, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { ThemeRow } from '../components/ThemePicker';
import { StackCalculator } from '../components/StackCalculator';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { MODULE_ICON } from '../components/ModuleGrid';
import { ModuleExplorer } from '../components/product/ModuleExplorer';
import { ApprovalDrill } from '../components/product/ApprovalDrill';
import { StackCompare } from '../components/product/StackCompare';
import { useHashScroll } from '../components/product/useHashScroll';
import { LIVE_MODULES, MODULES } from '../content/modules';
import { LOOPS, STILLS } from '../content/media';
import { useTheme } from '../theme/ThemeProvider';

// /command-center/: the product. The pitch, every module in depth, agent native (the squad, a sample approval and the
// rules), your look and how updates keep it, privacy and hardware, the stack next to one Command Center, then the way in.
// Phones get the same substance in less height: card groups are swipe rows, and the deepest detail (each module's field
// notes, the full stack calculator, which Home also carries) sits behind a tap.

const COMING = MODULES.filter((m) => m.status === 'coming').length;

const JUMP = [
  ['pitch', 'The pitch'], ['modules', 'Modules'], ['agents', 'Agents'], ['look', 'Look & updates'],
  ['privacy', 'Privacy'], ['stack', 'The stack'],
] as const;

const SPEC: [string, string][] = [
  ['Modules', `${LIVE_MODULES.length} live · ${COMING} coming`],
  ['Agents', 'Next to your files'],
  ['Brakes', 'Your OK before anything risky'],
  ['Runs on', 'A machine you own'],
  ['Look', 'Your theme, your logo'],
  ['Updates', 'Roll in. Your look stays.'],
  ['Code', 'Private. Done for you.'],
];

const TRIAD = [
  ['Situation', 'Notes in one app, PDFs in another, the AI in a third. Every one has its own login, its own bill and its own copy of your files, and you’re the glue between them.'],
  ['The brief', 'One dashboard, built to how you actually work. Every tool you use is a module inside it, every module is a switch, and your agents work in there too, right next to your files.'],
  ['Outcome', 'You open one thing in the morning and the work is there: what’s due, what changed, what’s waiting on you. Everything you don’t use stays off and out of the way.'],
];

// The squad (moved here from Home): the agents Bruce runs his own company with.
const SQUAD = [
  { id: 'mira', name: 'Mira', job: 'Command and agents', line: 'Runs the crew: hands out the work, keeps the whole operation in view and tells you what needs you.' },
  { id: 'apollo', name: 'Apollo', job: 'Content', line: 'Scripts, captions, thumbnails and the content calendar.' },
  { id: 'jade', name: 'Jade', job: 'Research', line: 'Digs in before anything gets built: the sources, the facts and the numbers, with links.' },
  { id: 'otto', name: 'Otto', job: 'Ops', line: 'Checklists, maintenance and the boring stuff that keeps it all running.' },
  { id: 'vulcan', name: 'Vulcan', job: 'Builder', line: 'Builds the things: sites, tools, automations and the code behind your workflows.' },
] as const;

const CAN = [
  'Read the project they’re working in: its brief, its folder, its files.',
  'File a task or a reminder into Jot, delivered to you on time.',
  'Propose a script draft you accept or dismiss.',
  'Save what they make to the Library, with the prompt beside it.',
  'Read an assignment’s instructions and quiz you on it.',
];
const CANT = [
  'Approve anything, their own requests included.',
  'Publish or post for you.',
  'Delete or move your projects.',
  'Submit schoolwork or change School’s settings.',
  'Read your notes, or see a key in a chat.',
];

// "Your data stays home" (moved here from Home), word for word.
const PRIVACY = [
  [HardDrive, 'On your machine', 'Files, notes and history live on storage you own and can unplug.'],
  [Lock, 'Keys stay out of chats', 'The Vault hands an agent a password without it ever landing in a message.'],
  [ShieldCheck, 'You approve the risky stuff', 'Agents ask before they send, delete or run anything that matters.'],
  [Wifi, 'Reachable when you want it', 'From any device on your network, or remotely if you set it up that way.'],
] as const;

const HARDWARE = [
  [Server, 'A machine that stays on', 'A mini PC, a Mac mini or a server you already have. Don’t have one? I can source it and set it up.'],
  [Database, 'Storage you own', 'A NAS is ideal; a drive in the machine works. Your library, projects and documents live there.'],
  [Router, 'Your network', 'Phones, laptops and tablets on your network reach it at its own address, behind a login. Secure HTTPS on your network turns on phone alerts and the mic.'],
] as const;

const UPDATE_STEPS = [
  ['Pull', 'The new version of the core comes down.'],
  ['Build', 'It’s built beside the one you’re running, which keeps running.'],
  ['Swap', 'Only a clean build replaces it. A failed one changes nothing.'],
  ['Switch', 'New features show up in Settings → Features. Keep them, or flip them off.'],
];

// shared sizes: tighter on phones, the same as before from md up
const PAD = 'py-10 md:py-24';
const H2 = 'text-4xl sm:text-5xl md:text-6xl';

export const CommandCenter: React.FC = () => {
  useReveal();
  useHashScroll();
  const { theme } = useTheme();
  const { hash } = useLocation();
  const math = React.useRef<HTMLDetailsElement>(null);
  React.useEffect(() => { if (hash === '#math' && math.current) math.current.open = true; }, [hash]);

  return (
    <main>
      <PageIntro op="OP-01" tag="Private AI Command Center"
        title={<>One super app. <span className="sig">Built to your life.</span></>}
        sub={<p>Stop paying for a stack of apps that add friction. Want this feature from one app and that one from another? It’s all in one dashboard: files organized, agents right next to them, and the business, the homework, the skit and the content done from one place. Done for you, on a machine you own, in your brand.</p>}
        actions={<>
          <Link to="/live-demo/" className="btn btn-primary">Try the live demo <ArrowRight size={18} /></Link>
          <Link to="/ai-leverage-audit/" className="btn btn-outline">Book the $197 audit</Link>
        </>}
        aside={<OpIntro />}
      />

      {/* jump list: one sideways row on phones */}
      <nav aria-label="On this page" className="border-t border-line-2 bg-ground-2">
        <ul className="container-x flex gap-x-1 overflow-x-auto py-1.5 [scrollbar-width:none] md:flex-wrap md:py-2 [&::-webkit-scrollbar]:hidden">
          {JUMP.map(([id, label], i) => (
            <li key={id} className="shrink-0"><a href={`#${id}`} className="flex min-h-[44px] items-center gap-2 whitespace-nowrap px-2.5 text-ink-3 hover:text-ink">
              <span className="font-mono text-[11px] font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span><span className="chip text-[15px]">{label}</span>
            </a></li>
          ))}
          {/* phones: the demo is one tap away here (the "See it run" block is desktop only) */}
          <li className="shrink-0 md:hidden"><Link to="/live-demo/" className="flex min-h-[44px] items-center gap-1.5 whitespace-nowrap px-2.5 text-signal-text">
            <MonitorPlay size={15} /><span className="chip text-[15px]">Live demo</span>
          </Link></li>
        </ul>
      </nav>

      {/* ── 01 the pitch ── */}
      <GridBand id="pitch" className="scroll-mt-28">
        <div className={PAD}>
          <SectionHeader num="01" label="The pitch" />
          <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-10">
            <div>
              <Display className={`reveal ${H2}`}>Twelve apps. Twelve logins. <span className="sig">One of you.</span></Display>
              <p className="reveal mt-6 hidden text-lg text-ink-2 md:block">Every app showed up to fix one problem, and now you spend the day moving files between them and re-explaining yourself to every AI. A Command Center turns that around: one place that holds the files, the tools and the agents, so the work comes to you.</p>
            </div>
            <div className="reveal hidden sm:block"><SpecSheet /></div>
          </div>
          <Swipe label="Situation, brief, outcome" desktop="md:grid md:grid-cols-3 md:gap-4" className="reveal mt-8 md:mt-10">
            {TRIAD.map(([k, v], i) => (
              <div key={k} className={`flex h-full flex-col p-5 md:p-6 ${i === 2 ? 'border-theme border-signal bg-ground' : 'panel'}`} style={i === 2 ? { borderRadius: 'var(--radius-lg)' } : undefined}>
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <p className="display mt-3 text-3xl md:text-4xl">{k}</p>
                <p className="mt-3 text-ink-2">{v}</p>
              </div>
            ))}
          </Swipe>
          <p className="reveal mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-3">
            Not an app you download <span className="opacity-60">//</span> not somebody else’s cloud <span className="opacity-60">//</span> not a chatbot in a tab <span className="opacity-60">//</span> <span className="text-ink">done for you, start to finish</span>
          </p>
        </div>
      </GridBand>

      {/* ── 02 modules ── */}
      <GridBand id="modules" tone="raised" className="scroll-mt-28">
        <div className={PAD}>
          <SectionHeader num="02" label="The modules" right={<span className="label hidden sm:inline">{LIVE_MODULES.length} live · {COMING} coming</span>} />
          <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-2 lg:items-end lg:gap-6">
            <Display className={`reveal ${H2}`}>Pick a module. <span className="sig">See what it replaces.</span></Display>
            <p className="reveal text-lg text-ink-2">Grouped the way the Command Center groups them. Every one is a switch: off means gone from the sidebar and not running, and its data stays put for the day you flip it back.</p>
          </div>
          <div className="reveal mt-8 md:mt-10"><ModuleExplorer /></div>
        </div>
      </GridBand>

      {/* ── 03 agent native (the squad moved here from Home) ── */}
      <GridBand id="agents" className="scroll-mt-28">
        <div className={PAD}>
          <SectionHeader num="03" label="Agent native" />
          <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-2 lg:items-end lg:gap-6">
            <Display className={`reveal ${H2}`}>A squad that works <span className="sig">where your files are.</span></Display>
            <p className="reveal text-lg text-ink-2">Your agents live inside the Command Center, next to your documents and your calendar, so they work with real context instead of whatever you paste in. Anything risky waits for your OK.</p>
          </div>
          <Swipe label="The squad" desktop="md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-5" item="basis-[56%] sm:basis-[42%]" className="reveal mt-8 md:mt-10">
            {SQUAD.map((b, i) => { const art = STILLS[b.id]; const loop = LOOPS[`${b.id}Loop`]; return (
              <div key={b.id} className="h-full pt-2">
                <PhotoPanel tilt={i % 2 ? 2 : -2} className="aspect-square" label={b.name}>
                  {loop ? <Loop src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="block h-full w-full object-cover" />
                    : art ? <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="h-full w-full object-cover" /> : <ArtPlaceholder name={b.name} />}
                </PhotoPanel>
                <p className="display mt-4 text-3xl md:mt-5">{b.name}</p>
                <p className="label mt-1">{b.job}</p>
                <p className="mt-2 text-ink-2">{b.line}</p>
              </div>
            ); })}
          </Swipe>
          <p className="mt-4 text-sm text-ink-3">That’s my squad. Yours gets its own names, its own jobs and, if you like, its own portraits.</p>

          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="reveal">
              <p className="label hidden md:block">Try it // a sample approval</p>
              <p className="display text-3xl md:mt-3 md:text-4xl">The brakes are yours.</p>
              <p className="mt-4 hidden text-ink-2 md:block">When an agent wants to send, delete or run something that matters, it stops and asks, on the dashboard and on your phone. The first answer wins, and no answer means no. Then try letting the agent answer for you.</p>
              <p className="mt-3 text-[15px] text-ink-2 md:hidden">It asks, you answer, no answer means no. And an agent can’t answer for you: the approval door doesn’t open for its key.</p>
              <div className="mt-5 md:mt-6"><ApprovalDrill /></div>
            </div>
            <div className="reveal">
              <Swipe label="What agents do and can’t do" desktop="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-1" item="basis-[86%] sm:basis-[60%]">
                <div className="panel h-full p-5 md:p-6">
                  <p className="label">What your agents do</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-snug text-ink md:mt-4 md:space-y-3 md:text-base md:leading-normal">{CAN.map((x) => <Check key={x}>{x}</Check>)}</ul>
                </div>
                <div className="panel h-full p-5 md:p-6">
                  <p className="label">What they can’t do</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-snug text-ink md:mt-4 md:space-y-3 md:text-base md:leading-normal">
                    {CANT.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-[0.1em] shrink-0 text-alert">☒</span><span>{x}</span></li>)}
                  </ul>
                  <p className="mt-5 hidden border-t border-line-2 pt-4 text-sm text-ink-3 md:block">That isn’t a line in a prompt asking nicely. The approval door doesn’t open for an agent’s key, even when it also carries your login.</p>
                </div>
              </Swipe>
              <Link to="/field-notes/agent-native/" className="group mt-4 flex min-h-[44px] items-center gap-3">
                <ClipboardCheck size={18} className="shrink-0 text-signal-text" />
                <span className="min-w-0 flex-1 text-ink-2 group-hover:text-ink"><span className="label mr-2">Field note 02</span>Agent-native: why your AI should live where your files are</span>
                <ArrowRight size={16} className="shrink-0 text-ink-3" />
              </Link>
            </div>
          </div>
        </div>
      </GridBand>

      {/* ── 04 your look, and how updates keep it ── */}
      <GridBand id="look" tone="raised" className="scroll-mt-28">
        <div className={PAD}>
          <SectionHeader num="04" label="Look & updates" right={<Link to="/themes/" className="label hover:!text-ink">All themes →</Link>} />
          <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-8">
            <div>
              <Display className={`reveal ${H2}`}>Your look. <span className="sig">Kept through every update.</span></Display>
              <p className="reveal mt-5 text-lg text-ink-2 md:mt-6">Your colors, type, corners and logo, down to your phone’s home screen. Your theme, settings and data live outside the code, so new features land on top and never touch them. <span className="hidden md:inline">Pick one and this page changes, the way yours would.</span></p>
            </div>
            <div className="reveal space-y-4">
              <ThemeRow />
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 md:block">Wearing {theme.name}: {theme.tagline}</p>
              <Link to="/themes/" className="btn btn-outline hidden md:inline-flex">Every theme, and how yours gets made</Link>
            </div>
          </div>
          <Swipe label="How updates work" desktop="md:grid md:grid-cols-3 md:gap-4" className="reveal mt-8 md:mt-10">
            <div className="h-full border-theme border-signal bg-ground p-5 md:p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
              <p className="label !text-ink">Yours // an update never touches it</p>
              <ul className="mt-4 space-y-3 text-ink">
                <Check>Your theme: colors, type, corners, logo</Check>
                <Check>Your settings: who it’s for, what’s switched on</Check>
                <Check>Your data: files, notes, chats, history</Check>
              </ul>
            </div>
            <div className="panel h-full p-5 md:p-6">
              <p className="label">The core // I keep it current</p>
              <ul className="mt-4 space-y-3 text-ink">
                <Check>New modules, and new features in the ones you have</Check>
                <Check>Fixes and security updates</Check>
                <Check>Better tools for your agents</Check>
              </ul>
            </div>
            <div className="panel h-full p-5 md:p-6">
              <p className="label">How an update goes in</p>
              <ol className="mt-4 space-y-2.5">
                {UPDATE_STEPS.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[28px_1fr] gap-2 text-[15px] leading-snug">
                    <span className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                    <span><b className="font-semibold text-ink">{t}.</b> <span className="text-ink-2">{d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </Swipe>
          <p className="reveal mt-6 text-ink-2">Want me to handle it? Keeping it current is what the <Link to="/pricing/" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">Command tier</Link> is for.</p>
        </div>
      </GridBand>

      {/* ── 05 your data stays home (moved here from Home) ── */}
      <GridBand id="privacy" className="scroll-mt-28">
        <div className={PAD}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader num="05" label="Privacy" />
              <Display className={`reveal mt-6 md:mt-8 ${H2}`}>Your data <span className="sig">stays home.</span></Display>
              <p className="reveal mt-5 text-lg text-ink-2 md:mt-6">The Command Center runs on hardware you own: a Mac mini, a mini PC or a server in the closet. Your files never sit in somebody else’s app.</p>
            </div>
            <ul className="reveal hidden content-start gap-3 text-lg text-ink md:grid">
              {PRIVACY.map(([Icon, t, d]) => (
                <li key={t} className="panel flex gap-4 p-5"><Icon size={22} className="mt-0.5 shrink-0 text-signal-text" /><span><b className="block font-semibold">{t}</b><span className="text-base text-ink-2">{d}</span></span></li>
              ))}
            </ul>
          </div>
          {/* phones: the four promises and the hardware in one row */}
          <Swipe label="Privacy and hardware" desktop="md:hidden" item="basis-[76%] sm:basis-[46%]" className="reveal mt-8 md:hidden">
            {[...PRIVACY, ...HARDWARE].map(([Icon, t, d], i) => (
              <div key={t} className="panel h-full p-5">
                <p className="label">{i < PRIVACY.length ? 'Privacy' : 'What it runs on'}</p>
                <Icon size={22} className="mt-3 text-signal-text" />
                <p className="mt-3 font-semibold text-ink">{t}</p>
                <p className="mt-1 text-[15px] text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
          <div className="hidden md:block">
            <p className="label reveal mt-14">What it runs on</p>
            <div className="reveal mt-4 grid grid-cols-3 gap-4">
              {HARDWARE.map(([Icon, t, d]) => (
                <div key={t} className="panel h-full p-6">
                  <Icon size={24} className="text-signal-text" />
                  <p className="display mt-4 text-3xl">{t}</p>
                  <p className="mt-2 text-ink-2">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="reveal mt-8 max-w-3xl border-l-2 border-alert pl-4 text-ink-2">
            <b className="font-semibold text-ink">One honest line.</b> When an agent works on something, the parts it reads go to the AI model you picked, under that plan’s terms. You decide what’s in reach. If some work can’t go to an AI at all, we draw that line in the audit.
          </p>
        </div>
      </GridBand>

      {/* ── 06 the stack ── */}
      <GridBand id="stack" tone="raised" className="scroll-mt-28">
        <div className={PAD}>
          <SectionHeader num="06" label="The stack" right={<Link to="/field-notes/stop-paying-for-twelve-apps/" className="label hidden hover:!text-ink sm:inline">Field note 01 →</Link>} />
          <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-2 lg:items-end lg:gap-6">
            <Display className={`reveal ${H2}`}>The stack vs. <span className="sig">one Command Center.</span></Display>
            <p className="reveal text-lg text-ink-2">Line by line, what changes. What stays put: your email, your bank, the social apps you post from, Canvas and your AI plan. It works next to them.</p>
          </div>
          <div className="reveal mt-8 md:mt-10"><StackCompare /></div>
          <details ref={math} id="math" className="group reveal panel mt-6 scroll-mt-28">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1"><span className="chip block text-lg text-ink">Do the math on your own stack</span><span className="hidden text-sm text-ink-3 sm:block">Tick what you pay for, fix the prices, see the year’s total.</span></span>
              <span aria-hidden="true" className="text-xl text-signal-text transition-transform group-open:rotate-90">▸</span>
            </summary>
            <div className="border-t border-line p-3 sm:p-5"><StackCalculator /></div>
          </details>
          <div className="reveal mt-10 hidden flex-wrap items-center justify-between gap-5 border-t border-line-2 pt-8 md:flex">
            <div className="flex gap-4">
              <MonitorPlay size={30} className="mt-1 hidden shrink-0 text-signal-text sm:block" />
              <div>
                <p className="display text-3xl md:text-4xl">See it run.</p>
                <p className="mt-2 hidden text-ink-2 md:block">Click around the real Command Center on sample data, in any theme. Nothing you do there touches anything real.</p>
              </div>
            </div>
            <Link to="/live-demo/" className="btn btn-primary shrink-0">Open the live demo <ArrowRight size={18} /></Link>
          </div>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};

/** The OP-01 intro sting beside the headline (the spec sheet stands in until it exists). */
const OpIntro: React.FC = () => {
  const loop = LOOPS.opIntro;
  if (!loop) return <SpecSheet />;
  return (
    <Chamfer>
      <Loop src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="block aspect-video w-full object-cover" />
    </Chamfer>
  );
};

/** Two columns of facts on phones, label-beside-value rows from sm up. */
const SpecSheet: React.FC = () => (
  <Chamfer innerClassName="flex flex-col">
    <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-2.5">
      <span className="label">[ Spec sheet // OP-01 ]</span>
    </div>
    <dl className="grid grid-cols-2 gap-px bg-line-2 sm:grid-cols-1">
      {SPEC.map(([k, v], i) => (
        <div key={k} className={`bg-ground-2 px-4 py-2.5 sm:grid sm:grid-cols-[96px_1fr] sm:gap-3 sm:py-3 ${i === SPEC.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
          <dt className="label sm:pt-0.5">{k}</dt>
          <dd className="mt-0.5 font-semibold leading-snug text-ink sm:mt-0">{v}</dd>
        </div>
      ))}
    </dl>
    <ul className="hidden flex-wrap gap-2.5 border-t border-line bg-ground px-4 py-3 sm:flex" aria-label="Live modules">
      {LIVE_MODULES.map((m) => { const I = MODULE_ICON[m.id]; return <li key={m.id} title={m.name}><I size={17} className="text-signal-text" aria-label={m.name} /></li>; })}
    </ul>
  </Chamfer>
);

const ArtPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="grid h-full w-full place-items-center bg-paper text-paper-ink"><span className="display text-6xl opacity-15">{name}</span></div>
);
