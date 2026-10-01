import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { StoryNav } from '../components/story/StoryNav';
import { LoopPanel } from '../components/story/Art';

type Post = { id: string; role: string; org: string; short: string; from: [number, number]; to: [number, number] | null; dates: string; points: string[] };

// The record, newest first. Dates and duties as Bruce wrote them; nothing here is estimated.
const RECORD: Post[] = [
  {
    id: 'bw', role: 'CEO / Systems Builder', org: 'Bruce Works LLC', short: 'Bruce Works LLC', from: [2022, 4], to: null, dates: 'April 2022 – Present',
    points: [
      'Build practical systems for clients using AI, documentation, templates, technical setup and hands-on support.',
      'Help owner-led service businesses organize scattered information into usable workflows.',
      'Develop the AI Leverage Audit, the client-owned Command Center Foundation, bounded workflow builds and support offers.',
    ],
  },
  {
    id: 'nsw', role: 'Supply Technician', org: 'Naval Special Warfare Center Ranges West', short: 'NSW Center Ranges West', from: [2019, 11], to: null, dates: 'November 2019 – Present',
    points: [
      'Maintain records for assets across range sites and support disposal, ordering and equipment accountability.',
      'Use logistics systems including DPAS and ETIDS to track property and support operational readiness.',
      'Assist range managers with supplies, equipment requests and documentation for high-value assets.',
    ],
  },
  {
    id: 'arng', role: 'Information Technology Specialist', org: 'California Army National Guard', short: 'CA Army National Guard', from: [2019, 8], to: null, dates: 'August 2019 – Present',
    points: [
      'Troubleshoot equipment, configure services, support network connectivity and document technical layouts.',
      'Run and terminate long-distance ethernet, support computer configuration and help keep systems operational.',
      'Work across secure communication, file service, SharePoint, VOIP and related technical environments.',
    ],
  },
  {
    id: 'usmc', role: 'Logistics Supervisor / Logistics Clerk / Facilities Manager', org: 'United States Marine Corps', short: 'U.S. Marine Corps', from: [2016, 4], to: [2019, 8], dates: 'April 2016 – August 2019',
    points: [
      'Led, mentored and trained personnel supporting logistics and deployment readiness.',
      'Coordinated training operations and logistical support across multiple military branches.',
      'Managed facilities requests, inspections, equipment readiness and high-value inventory with zero-loss accountability.',
    ],
  },
];

const LANES: { title: string; items: string[] }[] = [
  { title: 'IT and technical support', items: ['Network setup and troubleshooting', 'Computer configuration on macOS and Windows', 'SharePoint and Microsoft Office', 'Practical, hands-on tool support'] },
  { title: 'Knowledge systems', items: ['Private vaults and organized documents', 'Workflow templates', 'Assistant and agent instructions', 'Digital systems that make information usable'] },
  { title: 'Logistics and operations', items: ['Supply tracking and inventory management', 'Record keeping and ordering support', 'Equipment accountability', 'Process documentation'] },
  { title: 'Military leadership', items: ['Leading teams', 'Coordinating training operations', 'Managing facilities requests', 'Supporting mission-critical equipment and services'] },
];

const CARRY = [
  ['Zero-loss accountability for high-value inventory', 'Your files get one structure and a name for everything. Nothing goes missing between a dozen apps.'],
  ['Asset records kept in DPAS and ETIDS', 'Documents come in through one door, get tracked, and get filed by rule.'],
  ['Documented technical layouts', 'Your machine, your network and your setup are written down, so how it works isn’t locked in my head.'],
  ['Led, mentored and trained personnel', 'You and your people learn the system on your real work, not a demo.'],
];

// ── the at-a-glance bars: flat, one baseline, the current company highlighted ──
const START = new Date(2016, 0, 1).getTime();
const at = (ym: [number, number] | null, end: number) => ((ym ? new Date(ym[0], ym[1] - 1, 1).getTime() : end) - START) / (end - START) * 100;

const ServiceBars: React.FC = () => {
  const end = Date.now();
  const ticks = [2016, 2018, 2020, 2022, 2024];
  return (
    <Chamfer innerClassName="p-5 sm:p-7">
      <p className="label">Time in post // 2016 to today</p>
      <ul className="mt-5 space-y-4">
        {[...RECORD].reverse().map((p) => {
          const left = at(p.from, end); const right = at(p.to, end);
          return (
            <li key={p.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="chip truncate text-[15px] text-ink">{p.short}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">{p.from[0]}–{p.to ? p.to[0] : 'now'}</span>
              </div>
              <div className="relative mt-2 h-3">
                <span className={`absolute inset-y-0 ${p.id === 'bw' ? 'bg-signal' : 'bg-ink-3'}`} style={{ left: `${left}%`, width: `${right - left}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 border-t-[3px] border-line" />
      <div className="relative mt-2 h-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
        {ticks.map((y, i) => <span key={y} className="absolute top-0" style={{ left: `${at([y, 1], end)}%`, transform: i ? 'translateX(-50%)' : undefined }}>{y}</span>)}
        <span className="absolute right-0 top-0">Now</span>
      </div>
    </Chamfer>
  );
};

export const Experience: React.FC = () => {
  useReveal();
  return (
    <main>
      <PageIntro
        op="OP-12"
        tag="Service record"
        title={<>Service <span className="sig">record.</span></>}
        sub="IT, logistics, systems and leadership: field experience, technical thinking and operational discipline. Here's where it comes from, and where it shows up in what I build."
        aside={<ServiceBars />}
      />

      {/* ── 01 capabilities ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="Capabilities" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Four lanes. <span className="sig">One operator.</span></Display>
            <p className="reveal text-lg text-ink-2">AI tools only help when the habits around them are right: documentation, organization, repeatable workflows and clear support.</p>
          </div>
          <Swipe label="Capabilities" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" className="mt-10">
            {LANES.map((l, i) => (
              <div key={l.title} className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="display mt-3 text-3xl">{l.title}</h3>
                <ul className="mt-5 space-y-2.5 text-ink">{l.items.map((x) => <Check key={x}>{x}</Check>)}</ul>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 the record: swipe cards on phones, a timeline rail from md up ── */}
      <GridBand tone="raised">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="The record" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Where the habits <span className="sig">came from.</span></Display>
          <Swipe label="Service record, newest first" desktop="md:block md:border-l-theme md:border-line md:pl-10 md:[&>li+li]:mt-12 md:[&>li+li]:border-t md:[&>li+li]:border-line-2 md:[&>li+li]:pt-12" className="mt-10 md:mt-12">
            {RECORD.map((p) => (
              <article key={p.id} className="panel relative h-full p-5 md:grid md:grid-cols-[230px_1fr] md:gap-10 md:border-0 md:bg-transparent md:p-0">
                <span aria-hidden="true" className={`absolute hidden h-3.5 w-3.5 border-theme border-ink-3 md:block ${p.to ? 'bg-ground-2' : 'bg-ink-3'}`}
                  style={{ left: 'calc(-1 * var(--border-w) / 2 - 7px - 2.5rem)', top: '4px', borderRadius: 'var(--radius)' }} />
                <div>
                  <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">{p.dates}</p>
                  {!p.to && <p className="label mt-1.5">Current</p>}
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="display text-3xl md:text-4xl">{p.role}</h3>
                  <p className="chip mt-2 text-ink-2 md:text-lg">{p.org}</p>
                  <ul className="mt-5 space-y-3 text-ink">{p.points.map((x) => <Check key={x}>{x}</Check>)}</ul>
                </div>
              </article>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 03 how it shows up ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="03" label="In your system" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Experience that <span className="sig">shows up in the build.</span></Display>
          <Swipe label="How the experience shows up in your system" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" className="mt-10">
            {CARRY.map(([then, now]) => (
              <div key={then} className="panel flex h-full flex-col p-6">
                <p className="label">In the field</p>
                <p className="mt-2 text-lg font-semibold text-ink-2">{then}</p>
                <p aria-hidden="true" className="my-4 font-mono text-ink-3">↓</p>
                <p className="label">In your Command Center</p>
                <p className="mt-2 text-lg text-ink">{now}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 04 veteran-owned (the facts themselves live on /government-capabilities/) ── */}
      <GridBand tone="raised">
        <div className="grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <SectionHeader num="04" label="Veteran-owned" />
            <Display className="reveal mt-8 text-4xl md:text-5xl">Service-disabled <span className="sig">veteran-owned.</span></Display>
            <p className="reveal mt-5 text-lg text-ink-2">The record above is where that comes from. Certifications, registrations and the capability statement are on one page for agencies and primes.</p>
            <Link to="/government-capabilities/" className="btn btn-outline mt-7">Government capabilities <ArrowRight size={18} /></Link>
          </div>
          <LoopPanel slot="credentials" className="reveal" />
        </div>
      </GridBand>

      <StoryNav current="/experience/" num="05" />
      <HazardStrip />
      <AuditBand />
    </main>
  );
};
