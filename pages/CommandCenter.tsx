import React from 'react';
import { Link } from 'react-router-dom';
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
// rules), the look, updates, hardware and privacy, the stack next to one Command Center, then the way in.

const COMING = MODULES.filter((m) => m.status === 'coming').length;

const JUMP = [
  ['pitch', 'The pitch'], ['modules', 'Modules'], ['agents', 'Agents'], ['look', 'Your look'],
  ['updates', 'Updates'], ['privacy', 'Privacy'], ['stack', 'The stack'],
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
  { id: 'mira', name: 'Mira', job: 'Command and data', line: 'Keeps the whole operation in view: what’s due, what changed, what needs you.' },
  { id: 'apollo', name: 'Apollo', job: 'Automations', line: 'Wires the repeat work: follow-ups, file sorting, the jobs that run at 2 a.m.' },
  { id: 'jade', name: 'Jade', job: 'Content', line: 'Scripts, captions, thumbnails and the content calendar.' },
  { id: 'otto', name: 'Otto', job: 'Ops', line: 'Checklists, maintenance and the boring stuff that keeps it all running.' },
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
  ['01', 'Pull', 'The new version of the core comes down.'],
  ['02', 'Build', 'It’s built beside the one you’re running, which keeps running.'],
  ['03', 'Swap', 'Only a clean build replaces it. A failed one changes nothing.'],
  ['04', 'Switch', 'New features show up in Settings → Features. Keep them, or flip them off.'],
];

export const CommandCenter: React.FC = () => {
  useReveal();
  useHashScroll();
  const { theme } = useTheme();

  return (
    <main>
      <PageIntro op="OP-01" tag="Private AI Command Center"
        title={<>One super app. <span className="sig">Built to your life.</span></>}
        sub={<>
          <p>Stop paying for a stack of apps that add friction. Want this feature from one app and that one from another? It’s all inside one dashboard: files organized, agents working right next to them, and the work itself done from one place. The business, the homework, the skit, the comedy, the content.</p>
          <p className="mt-4 text-lg">Done for you. I build it to the way you work, install it on a machine you own, and it wears your brand. The code stays private; your files, your settings and your look are yours.</p>
        </>}
        actions={<>
          <Link to="/live-demo/" className="btn btn-primary">Try the live demo <ArrowRight size={18} /></Link>
          <Link to="/ai-leverage-audit/" className="btn btn-outline">Book the $197 audit</Link>
        </>}
        aside={<OpIntro />}
      />

      {/* jump list */}
      <nav aria-label="On this page" className="border-t border-line-2 bg-ground-2">
        <ul className="container-x flex flex-wrap gap-x-1 py-2">
          {JUMP.map(([id, label], i) => (
            <li key={id}><a href={`#${id}`} className="flex min-h-[44px] items-center gap-2 px-2.5 text-ink-3 hover:text-ink">
              <span className="font-mono text-[11px] font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span><span className="chip text-[15px]">{label}</span>
            </a></li>
          ))}
        </ul>
      </nav>

      {/* ── 01 the pitch ── */}
      <GridBand id="pitch" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The pitch" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <Display className="reveal text-5xl md:text-6xl">Twelve apps. Twelve logins. <span className="sig">One of you.</span></Display>
              <p className="reveal mt-6 text-lg text-ink-2">Every app showed up to fix one problem, and now you spend the day moving files between them and re-explaining yourself to every AI. A Command Center turns that around: one place that holds the files, the tools and the agents, so the work comes to you.</p>
            </div>
            <div className="reveal"><SpecSheet /></div>
          </div>
          <Swipe label="Situation, brief, outcome" desktop="md:grid md:grid-cols-3 md:gap-4" className="reveal mt-10">
            {TRIAD.map(([k, v], i) => (
              <div key={k} className={`flex h-full flex-col p-6 ${i === 2 ? 'border-theme border-signal bg-ground' : 'panel'}`} style={i === 2 ? { borderRadius: 'var(--radius-lg)' } : undefined}>
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <p className="display mt-3 text-4xl">{k}</p>
                <p className="mt-3 text-ink-2">{v}</p>
              </div>
            ))}
          </Swipe>
          <ul className="reveal mt-6 flex flex-wrap gap-2">
            {['Not an app you download', 'Not somebody else’s cloud', 'Not a chatbot in a tab', 'Done for you, start to finish'].map((x, i) => (
              <li key={x} className={`chip border-theme px-3 py-1.5 text-[15px] ${i === 3 ? 'border-ink-3 text-ink' : 'border-line text-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}>{x}</li>
            ))}
          </ul>
        </div>
      </GridBand>

      {/* ── 02 modules ── */}
      <GridBand id="modules" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="The modules" right={<span className="label hidden sm:inline">{LIVE_MODULES.length} live · {COMING} coming</span>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Pick a module. <span className="sig">See what it replaces.</span></Display>
            <p className="reveal text-lg text-ink-2">Grouped the way the Command Center groups them: Work, Agents, Make and System. Every one is a switch. Flip it off and it’s gone: out of the sidebar, out of the search, not running. Its data stays put for the day you flip it back.</p>
          </div>
          <div className="reveal mt-10"><ModuleExplorer /></div>
        </div>
      </GridBand>

      {/* ── 03 agent native (the squad moved here from Home) ── */}
      <GridBand id="agents" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="Agent native" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">A squad that works <span className="sig">where your files are.</span></Display>
            <p className="reveal text-lg text-ink-2">Your agents live inside the Command Center, next to your documents and your calendar, so they work with real context instead of whatever you paste in. Anything risky waits for your OK.</p>
          </div>
          <Swipe label="The squad" desktop="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4" item="basis-[72%] sm:basis-[46%]" className="reveal mt-10">
            {SQUAD.map((b, i) => { const art = STILLS[b.id]; const loop = LOOPS[`${b.id}Loop`]; return (
              <div key={b.id} className="h-full pt-2">
                <PhotoPanel tilt={i % 2 ? 2 : -2} className="aspect-square" label={b.name}>
                  {loop ? <Loop src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="block h-full w-full object-cover" />
                    : art ? <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="h-full w-full object-cover" /> : <ArtPlaceholder name={b.name} />}
                </PhotoPanel>
                <p className="display mt-5 text-3xl">{b.name}</p>
                <p className="label mt-1">{b.job}</p>
                <p className="mt-2 text-ink-2">{b.line}</p>
              </div>
            ); })}
          </Swipe>
          <p className="mt-4 text-sm text-ink-3">That’s my squad. Yours gets its own names, its own jobs and, if you like, its own portraits.</p>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="reveal">
              <p className="label">Try it // a sample approval</p>
              <p className="display mt-3 text-4xl">The brakes are yours.</p>
              <p className="mt-4 text-ink-2">When an agent wants to send, delete or run something that matters, it stops and asks, on the dashboard and on your phone. The first answer wins, and no answer means no. Then try letting the agent answer for you.</p>
              <div className="mt-6"><ApprovalDrill /></div>
            </div>
            <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="panel p-6">
                <p className="label">What your agents do</p>
                <ul className="mt-4 space-y-3 text-ink">{CAN.map((x) => <Check key={x}>{x}</Check>)}</ul>
              </div>
              <div className="panel p-6">
                <p className="label">What they can’t do</p>
                <ul className="mt-4 space-y-3 text-ink">
                  {CANT.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-[0.1em] shrink-0 text-alert">☒</span><span>{x}</span></li>)}
                </ul>
                <p className="mt-5 border-t border-line-2 pt-4 text-sm text-ink-3">That isn’t a line in a prompt asking nicely. The approval door doesn’t open for an agent’s key, even when it also carries your login.</p>
              </div>
              <Link to="/field-notes/agent-native/" className="panel group flex items-center gap-3 p-5 sm:col-span-2 lg:col-span-1">
                <ClipboardCheck size={20} className="shrink-0 text-signal-text" />
                <span className="min-w-0 flex-1"><span className="label block">Field note 02</span><span className="block font-semibold text-ink group-hover:underline">Agent-native: why your AI should live where your files are</span></span>
                <ArrowRight size={18} className="shrink-0 text-ink-3" />
              </Link>
            </div>
          </div>
        </div>
      </GridBand>

      {/* ── 04 your look ── */}
      <GridBand id="look" tone="raised" className="scroll-mt-28">
        <div className="grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader num="04" label="Your look" right={<Link to="/themes/" className="label hover:!text-ink">All themes →</Link>} />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Same engine. <span className="sig">Your look.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Your colors, your type, your corners and your logo, down to the login page and the icon on your phone’s home screen. Pick one and this whole page changes, the same way your Command Center would.</p>
          </div>
          <div className="reveal space-y-5">
            <ThemeRow />
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Wearing {theme.name}: {theme.tagline}</p>
            <Link to="/themes/" className="btn btn-outline w-full sm:w-auto">Every theme, and how yours gets made</Link>
          </div>
        </div>
      </GridBand>

      {/* ── 05 updates ── */}
      <GridBand id="updates" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="05" label="Updates" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">New features roll in. <span className="sig">Yours stays yours.</span></Display>
            <p className="reveal text-lg text-ink-2">The Command Center keeps getting better, and an update never touches what’s yours. Your theme, your settings and your data live outside the code, so new features land on top without a fight.</p>
          </div>
          <div className="reveal mt-10 grid gap-4 md:grid-cols-2">
            <div className="panel p-6">
              <p className="label">The core // I keep it current</p>
              <ul className="mt-4 space-y-3 text-ink">
                <Check>New modules, and new features in the ones you have</Check>
                <Check>Fixes and security updates</Check>
                <Check>Better tools for your agents</Check>
              </ul>
            </div>
            <div className="border-theme border-signal bg-ground p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
              <p className="label !text-ink">Yours // an update never touches it</p>
              <ul className="mt-4 space-y-3 text-ink">
                <Check>Your theme: colors, type, corners, logo</Check>
                <Check>Your settings: who it’s for, what’s switched on</Check>
                <Check>Your data: files, notes, chats, history</Check>
              </ul>
            </div>
          </div>
          <Swipe label="How an update goes in" desktop="md:grid md:grid-cols-4 md:gap-4" item="basis-[72%] sm:basis-[46%]" className="reveal mt-4">
            {UPDATE_STEPS.map(([n, t, d]) => (
              <div key={n} className="panel h-full p-5">
                <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                <p className="display mt-3 text-3xl">{t}</p>
                <p className="mt-2 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
          <p className="reveal mt-6 text-ink-2">Want me to handle it? Keeping it current is what the <Link to="/pricing/" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">Command tier</Link> is for.</p>
        </div>
      </GridBand>

      {/* ── 06 your data stays home (moved here from Home) ── */}
      <GridBand id="privacy" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader num="06" label="Privacy" />
              <Display className="reveal mt-8 text-5xl md:text-6xl">Your data <span className="sig">stays home.</span></Display>
              <p className="reveal mt-6 text-lg text-ink-2">The Command Center runs on hardware you own: a Mac mini, a mini PC or a server in the closet. Your files never sit in somebody else’s app.</p>
            </div>
            <ul className="reveal grid content-start gap-3 text-lg text-ink">
              {PRIVACY.map(([Icon, t, d]) => (
                <li key={t} className="panel flex gap-4 p-5"><Icon size={22} className="mt-0.5 shrink-0 text-signal-text" /><span><b className="block font-semibold">{t}</b><span className="text-base text-ink-2">{d}</span></span></li>
              ))}
            </ul>
          </div>
          <p className="label reveal mt-14">What it runs on</p>
          <Swipe label="What it runs on" desktop="md:grid md:grid-cols-3 md:gap-4" className="reveal mt-4">
            {HARDWARE.map(([Icon, t, d]) => (
              <div key={t} className="panel h-full p-6">
                <Icon size={24} className="text-signal-text" />
                <p className="display mt-4 text-3xl">{t}</p>
                <p className="mt-2 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
          <p className="reveal mt-8 max-w-3xl border-l-2 border-alert pl-4 text-ink-2">
            <b className="font-semibold text-ink">One honest line.</b> When an agent works on something, the parts it reads go to the AI model you picked, under that plan’s terms. That’s true of every AI tool. Here you decide what’s in reach, and nothing else is. If some work can’t go to an AI at all, we draw that line in the audit.
          </p>
        </div>
      </GridBand>

      {/* ── 07 the stack ── */}
      <GridBand id="stack" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="07" label="The stack" right={<Link to="/field-notes/stop-paying-for-twelve-apps/" className="label hidden hover:!text-ink sm:inline">Field note 01 →</Link>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">The stack vs. <span className="sig">one Command Center.</span></Display>
            <p className="reveal text-lg text-ink-2">Line by line, what changes. And what doesn’t: your email, your bank, the social apps you post from, Canvas itself and your AI plan stay where they are. The Command Center works next to them.</p>
          </div>
          <div className="reveal mt-10"><StackCompare /></div>
          <p className="label reveal mt-14">Do the math on yours</p>
          <div className="reveal mt-4"><StackCalculator /></div>
        </div>
      </GridBand>

      {/* ── see it run ── */}
      <section className="border-t border-line bg-ground-2">
        <div className="container-x flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl gap-5">
            <MonitorPlay size={36} className="mt-1 hidden shrink-0 text-signal-text sm:block" />
            <div>
              <Display className="text-4xl md:text-5xl">See it run.</Display>
              <p className="mt-3 text-lg text-ink-2">Click around the real Command Center on sample data, in any theme. Nothing you do there touches anything real.</p>
            </div>
          </div>
          <Link to="/live-demo/" className="btn btn-primary">Open the live demo <ArrowRight size={18} /></Link>
        </div>
      </section>

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

const SpecSheet: React.FC = () => (
  <Chamfer innerClassName="flex flex-col">
    <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-2.5">
      <span className="label">[ Spec sheet // OP-01 ]</span>
    </div>
    <dl className="divide-y divide-line-2">
      {SPEC.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-3">
          <dt className="label pt-0.5">{k}</dt>
          <dd className="font-semibold text-ink">{v}</dd>
        </div>
      ))}
    </dl>
    <ul className="flex flex-wrap gap-2.5 border-t border-line bg-ground px-4 py-3" aria-label="Live modules">
      {LIVE_MODULES.map((m) => { const I = MODULE_ICON[m.id]; return <li key={m.id} title={m.name}><I size={17} className="text-signal-text" aria-label={m.name} /></li>; })}
    </ul>
  </Chamfer>
);

const ArtPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="grid h-full w-full place-items-center bg-paper text-paper-ink"><span className="display text-6xl opacity-15">{name}</span></div>
);
