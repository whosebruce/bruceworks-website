import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { ArtPanel } from '../components/story/Art';
import { StoryNav } from '../components/story/StoryNav';

const BRIEF = [
  ['Situation', 'Your knowledge is scattered across apps, inboxes, folders and your own head. Every AI tool starts from zero.'],
  ['The brief', 'Understand the mess first. Organize it. Build the Command Center around what you really need.'],
  ['Outcome', 'A system that knows your work: memory, workflows, agent instructions, templates and real support.'],
];

const STANDARD = [
  ['Plain English', 'Practical explanations, realistic expectations, and a system you can understand. No jargon, no AI hype.'],
  ['Follow-through', 'Logistics and the Marine Corps built the habits: accountability, documentation, scheduling, and finishing what gets started.'],
  ['Useful workflows first', 'I don’t overbuild. We find the first workflows that save time, cut the chaos or get things moving, and build those.'],
  ['Respect for your privacy', 'Your personal and business information gets careful handling, clear boundaries, and the right mix of local and cloud tools.'],
];

const BRINGS = [
  'IT and network support background across real operating environments',
  'Logistics and supply background supporting high-value equipment and documentation',
  'A hands-on systems mindset from business, facilities and technical work',
  'Experience turning messy information into organized processes and workflows',
  'Focused on practical AI systems for owner-led service businesses',
];

export const WhyHireBruce: React.FC = () => {
  useReveal();
  return (
    <main>
      <PageIntro
        op="OP-13"
        tag="Why Bruce"
        title={<>Prompts are easy. <span className="sig">Follow-through</span> isn't.</>}
        sub="Useful AI isn't a clever prompt. It's context, workflow, organization and somebody who finishes the job. Here's who you get, and the standard I hold."
        aside={<ArtPanel slot="bruceWhiteboard" name="Bruce" label="Bruce // the brief" tilt={2} eager className="mx-auto aspect-[4/3] w-full max-w-[560px]" nameClass="text-7xl" />}
      />

      {/* ── 01 the problem ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The problem" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Most AI setups <span className="sig">don't know your life.</span></Display>
            <p className="reveal text-lg text-ink-2">They don't know your files, your projects, your goals, your decisions or the repeat work that eats your week. So you paste the same context in again, every time, into a different app. I start with the mess and build around it, so you end up with something personal and useful, not another app you forget to open.</p>
          </div>
          <Swipe label="Situation, brief and outcome" desktop="md:grid md:grid-cols-3 md:gap-4" className="mt-10">
            {BRIEF.map(([k, v], i) => (
              <div key={k} className="panel h-full p-6">
                <p className="label"><span className="text-alert">{i + 1}</span> <span className="opacity-60">·</span> {k}</p>
                <p className="mt-4 text-lg text-ink">{v}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 the standard: cards on phones, ruled rows from md up ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="The standard" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Four things <span className="sig">you can count on.</span></Display>
          <Swipe label="The standard" desktop="md:block md:divide-y md:divide-line md:border-y md:border-line" className="mt-10">
            {STANDARD.map(([t, d], i) => (
              <div key={t} className="panel h-full p-6 md:grid md:grid-cols-[90px_1fr_1.3fr] md:items-baseline md:gap-8 md:border-0 md:bg-transparent md:px-0 md:py-7">
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="display mt-3 text-4xl md:mt-0 md:text-5xl">{t}</h3>
                <p className="mt-3 text-lg text-ink-2 md:mt-0">{d}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 03 who you get ── */}
      <GridBand>
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader num="03" label="Who you get" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">You deal with <span className="sig">me.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Bruce Works is done for you. I map your workflow, set up the machine, brief the agents and train you on it. Right now you work with me directly. When Bruce Works grows, it'll be a team I train to the same standard.</p>
          </div>
          <Chamfer className="reveal" innerClassName="p-6 md:p-8">
            <p className="label">What I bring to each build</p>
            <ul className="mt-5 space-y-3 text-ink md:text-lg">{BRINGS.map((b) => <Check key={b}>{b}</Check>)}</ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/experience/" className="btn btn-outline">Service record <ArrowRight size={18} /></Link>
              <Link to="/about-bruce/" className="btn btn-outline">About Bruce</Link>
            </div>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 04 veteran-owned ── */}
      <section className="border-t border-line-2 bg-ground-3">
        <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="max-w-3xl">
            <p className="label"><span className="text-alert">04</span> <span className="opacity-60">·</span> Veteran-owned</p>
            <p className="display mt-3 text-3xl md:text-4xl">Service-disabled veteran-owned. Same standard for a family, a shop or a prime contractor.</p>
          </div>
          <Link to="/government-capabilities/" className="btn btn-outline shrink-0">Government capabilities <ArrowRight size={18} /></Link>
        </div>
      </section>

      <StoryNav current="/why-hire-bruce/" num="05" />
      <HazardStrip />
      <AuditBand />
    </main>
  );
};
