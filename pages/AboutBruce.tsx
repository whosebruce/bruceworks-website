import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Chamfer, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Logo } from '../components/Logo';
import { Swipe } from '../components/Swipe';
import { ArtPanel, LoopPanel } from '../components/story/Art';
import { StoryNav } from '../components/story/StoryNav';
import { yearsIn } from '../components/story/record';
import { useTheme } from '../theme/ThemeProvider';

const link = 'underline decoration-line underline-offset-4 hover:decoration-ink';

const DOSSIER: [string, React.ReactNode][] = [
  ['Operator', 'Jonathan Bruce, goes by Bruce'],
  ['Post', 'CEO and operator of Bruce Works LLC since 2022'],
  ['Base', 'San Diego, California'],
  ['Service', 'U.S. Marine Corps veteran. A military background in accountability, documentation and operational readiness'],
  ['Background', `${yearsIn(['arng'])}+ years of IT, network support, troubleshooting and technical problem solving. ${yearsIn(['usmc', 'nsw'])}+ years of logistics, supply, inventory and operations`],
  ['Focus', 'Practical AI systems for owner-led service businesses, on hardware the client owns'],
  ['Company', <>Service-disabled veteran-owned <span className="text-ink-3">·</span> <Link to="/government-capabilities/" className={link}>certifications</Link></>],
];

const STRENGTHS = [
  ['Privacy-aware setup', 'I think about where your information lives, what should stay private, and how to build something useful without exposing sensitive data.'],
  ['Hands-on builder', 'Organize the files, brief the agents, document the workflows, build the templates, and teach you to run it.'],
  ['Human-first communication', 'Clear explanations, honest expectations, and systems regular people can actually use.'],
];

const ORDERS = ['Build only what is useful.', 'Keep it understandable.', 'Protect the client’s trust.', 'Improve the system as real needs appear.'];

export const AboutBruce: React.FC = () => {
  useReveal();
  return (
    <main>
      <PageIntro
        op="OP-11"
        tag="About Bruce"
        title={<>I'm Bruce. <span className="sig">I build the system.</span></>}
        sub="Marine Corps veteran, San Diego, founder of Bruce Works. I build private AI command centers: one place for your files, your work and your AI agents, set up for you on a machine you own."
        aside={<ArtPanel slot="bruceBriefing" name="Bruce" tilt={-2} eager className="mx-auto aspect-[4/5] w-3/5 max-w-[420px] lg:w-full" nameClass="text-5xl lg:text-7xl" />}
      />

      {/* ── 01 the short version ── */}
      <GridBand>
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <SectionHeader num="01" label="The short version" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Marine. Handyman. <span className="sig">Systems builder.</span></Display>
            <Link to="/experience/" className="btn btn-outline mt-8 hidden lg:inline-flex">Full service record <ArrowRight size={18} /></Link>
          </div>
          <Chamfer className="reveal" innerClassName="p-5 md:p-8">
            <p className="label">Personnel file // Bruce Works LLC</p>
            <dl className="mt-4 divide-y divide-line-2">
              {DOSSIER.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                  <dt className="label pt-1">{k}</dt>
                  <dd className="text-ink md:text-lg">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/experience/" className="btn btn-outline mt-5 w-full lg:hidden">Full service record <ArrowRight size={18} /></Link>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 02 why I build this ── */}
      <GridBand tone="raised">
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <SectionHeader num="02" label="Why I build this" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">I was the guy <span className="sig">everybody called.</span></Display>
            <div className="reveal mt-6 space-y-5 text-lg leading-relaxed text-ink-2">
              <p>Websites, resumes, business ideas, tech problems, family decisions. It all ended up on my phone, and I was trying to hold all of it in my head.</p>
              <p className="text-ink">Then I stopped using AI like a search engine and started using it like a coworker.</p>
              <p>The unlock wasn't fifty AI tools. It was one connected system that knew my notes, my projects, my home lab, my files and the way I think. That's how Bruce Works got organized into something real.</p>
            </div>
          </div>
          <div>
            <blockquote className="reveal border-l-theme border-line pl-5">
              <p className="display text-4xl md:text-5xl">AI didn't replace me. It helped me catch up.</p>
              <footer className="label mt-3">Bruce</footer>
            </blockquote>
          </div>
        </div>
      </GridBand>

      {/* ── 03 where it comes from ── */}
      <GridBand>
        <div className="grid gap-8 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <SectionHeader num="03" label="Where it comes from" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Same tools. <span className="sig">New trade.</span></Display>
            <div className="reveal mt-6 space-y-4 text-lg leading-relaxed text-ink-2">
              <p>Bruce Works started as a handyman company. The logo is still a B built out of tools, and the habits came with it: find the real problem, fix it right, leave it cleaner than you found it.</p>
              <p>The Marine Corps added accountability, documentation and readiness. IT, logistics and facilities work taught me how systems break and how to keep them running. Now the job is your digital operation. Same standard.</p>
            </div>
          </div>
          <Chamfer className="reveal" innerClassName="flex items-center gap-6 p-6 md:flex-col md:p-10">
            <span className="shrink-0 md:hidden"><Logo size={96} title="The Bruce Works logo: a letter B built out of tools" /></span>
            <span className="hidden md:block"><Logo size={150} title="The Bruce Works logo: a letter B built out of tools" /></span>
            <p className="label md:text-center">The tool-built B // still the company mark</p>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 04 what I build now ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="04" label="What I build now" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-10">
            <Display className="reveal text-5xl md:text-6xl">One system, <span className="sig">built to your life.</span></Display>
            <p className="reveal text-lg text-ink-2">Stop paying for a stack of apps that each want a login and a copy of your files. I build one Command Center around how you live and work, with your files organized and your AI agents working next to them. The business, the homework, the skit, the content: one place, on a machine you own. I set it up, train you on it, and hand it over.</p>
          </div>
          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/live-demo/" className="btn btn-outline">Try the live demo <ArrowRight size={18} /></Link>
            <Link to="/command-center/" className="btn btn-outline">What's in it</Link>
          </div>
          <Corners />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div className="reveal">
              <p className="label">The squad</p>
              <p className="display mt-3 text-4xl">I don't run it alone.</p>
              <p className="mt-4 text-lg text-ink-2">Mira runs command and data, Apollo the automations, Jade the content and Otto the ops. They're the AI agents that work Bruce Works with me, and anything risky waits for my OK. Yours can work the same way.</p>
            </div>
            <LoopPanel slot="squad" className="reveal" />
          </div>
        </div>
      </GridBand>

      {/* ── 05 how I work ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="05" label="How I work" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-10">
            <Display className="reveal text-5xl md:text-6xl">Practical systems, <span className="sig">not hype.</span></Display>
            <p className="reveal text-lg text-ink-2">Map the mess, organize the information, build the workflow, make it usable. What you get is a second brain and a digital operations system that helps you think, plan, follow up, create and execute faster. And yes, the work is AI-assisted, with Bruce flavor: human input and perfection.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-[3fr_1fr]">
            <Swipe label="How I work" desktop="md:grid md:grid-cols-3 md:gap-4">
              {STRENGTHS.map(([t, d]) => (
                <div key={t} className="panel h-full p-6">
                  <p className="display text-2xl">{t}</p>
                  <p className="mt-3 text-ink-2">{d}</p>
                </div>
              ))}
            </Swipe>
            <Chamfer className="reveal" innerClassName="p-6">
              <p className="label">Standing orders</p>
              <ol className="mt-4 space-y-2.5">
                {ORDERS.map((o, i) => <li key={o} className="flex gap-3 text-ink"><span className="font-mono text-sm font-semibold leading-6 text-alert">{String(i + 1).padStart(2, '0')}</span>{o}</li>)}
              </ol>
            </Chamfer>
          </div>
        </div>
      </GridBand>

      <StoryNav current="/about-bruce/" num="06" />
      <HazardStrip />
      <AuditBand />
    </main>
  );
};

/** It wears your brand, corners included. Every site Bruce has shipped so far is square; one tap rounds this one off. */
const Corners: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [round, setRound] = React.useState(false);
  React.useEffect(() => { setRound(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius')) > 0); }, [theme.id]);
  return (
    <div className="reveal mt-10 flex flex-col gap-4 border-t border-line-2 pt-6 md:flex-row md:items-center md:justify-between">
      <p className="max-w-3xl text-lg text-ink-2">It wears your brand, too. Full disclosure: every site I've shipped so far has square corners, Field Manual and my clients' sites alike. I'm getting into rounded corners now.</p>
      <button type="button" onClick={() => setTheme(round ? 'field-manual' : 'midnight-plush')} className="btn btn-outline shrink-0">
        {round ? 'Back to square' : 'Round them off'}
      </button>
    </div>
  );
};
