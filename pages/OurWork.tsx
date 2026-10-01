import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Check, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { Swipe } from '../components/Swipe';
import { ArtLoop, ScreenProof } from '../components/story/Art';
import { StoryNav } from '../components/story/StoryNav';

// The systems Bruce Works runs on itself, as proof. Privacy rules for this page: no client names, no internal hostnames
// or addresses, no real numbers, no credentials. Screens come from STILLS slots (content/media.ts): screenCommandCenter,
// screenContentStudio, screenDocOps. Until a sanitized capture is added there, each shows a plain wireframe placeholder.
type System = {
  id: string; num: string; label: string; title: React.ReactNode; what: string; body: string; more: string; proof: string[];
  flow?: string[]; slot: string; loop: string; kind: 'dashboard' | 'board' | 'pipeline'; shot: string; links?: { to: string; label: string }[];
};

const SYSTEMS: System[] = [
  {
    id: 'command', num: '01', label: 'Command Center', title: <>My own <span className="sig">Command Center.</span></>, what: 'Owner and operator surface',
    body: 'The screen I run Bruce Works from: the priority queue, owner approvals, agent work, finance visibility and day-to-day operations in one place.',
    more: 'It’s the same Command Center the live demo runs on sample data. My agents work from it, and anything risky they want to do waits in my approvals.',
    proof: ['Priority queue', 'Owner approvals', 'Evidence-linked work', 'Operations visibility'],
    slot: 'screenCommandCenter', loop: 'approvals', kind: 'dashboard', shot: 'Today view',
    links: [{ to: '/live-demo/', label: 'Try the live demo' }, { to: '/command-center/', label: 'What’s in it' }],
  },
  {
    id: 'content', num: '02', label: 'Content studio', title: <>The content <span className="sig">studio.</span></>, what: 'Idea-to-production workflow',
    body: 'A working pipeline that moves ideas through research, scripting, review, production and publishing without losing context.',
    more: 'Video projects, scripts, slides, social drafts, an idea board and YouTube research live in one place, next to the image, motion and voice tools that make the pieces.',
    proof: ['Idea intake', 'Research notes', 'Script review', 'Production status'],
    flow: ['Idea', 'Research', 'Script', 'Review', 'Production', 'Published'],
    slot: 'screenContentStudio', loop: 'studio', kind: 'board', shot: 'Idea board',
  },
  {
    id: 'docs', num: '03', label: 'Document and procurement operations', title: <>Document and <span className="sig">procurement ops.</span></>, what: 'Intake · OCR · indexing · QA',
    body: 'A controlled process for receiving documents, extracting the text, applying naming and metadata rules, tracking exceptions and producing accepted records.',
    more: 'Every record gets a name, a place and a QA check. Anything that doesn’t fit the rules gets flagged instead of lost.',
    proof: ['Controlled intake', 'OCR and indexing', 'Exception tracking', 'Acceptance evidence'],
    flow: ['Intake', 'OCR', 'Index', 'QA', 'Accepted'],
    slot: 'screenDocOps', loop: 'office', kind: 'pipeline', shot: 'Intake and QA queue',
    links: [{ to: '/government-capabilities/', label: 'Government capabilities' }],
  },
];

const RULES = ['No client names', 'No internal hostnames or addresses', 'No real numbers', 'No credentials or personal data'];

const SystemCard: React.FC<{ s: System; flip: boolean }> = ({ s, flip }) => (
  <article id={s.id} className="panel flex h-full flex-col gap-6 p-4 pt-5 md:grid md:grid-cols-2 md:items-center md:gap-10 md:border-0 md:bg-transparent md:p-0">
    <div className={`px-1 md:px-0 ${flip ? 'md:order-2' : ''}`}>
      <p className="label"><span className="text-alert">{s.num}</span> <span className="opacity-60">·</span> {s.what}</p>
      <Display as="h3" className="mt-3 text-4xl md:text-6xl">{s.title}</Display>
      <p className="mt-4 text-ink-2 md:mt-6 md:text-lg">{s.body}</p>
      <p className="mt-4 hidden text-lg text-ink-2 md:block">{s.more}</p>
      <ul className="mt-5 grid gap-2 text-ink sm:grid-cols-2 md:mt-6">{s.proof.map((p) => <Check key={p}>{p}</Check>)}</ul>
      {s.flow && (
        <ol aria-label={`${s.label} workflow`} className="mt-6 flex flex-wrap items-center gap-1.5 md:mt-7 md:gap-2">
          {s.flow.map((step, k) => (
            <li key={step} className="flex items-center gap-1.5 md:gap-2">
              <span className={`border-theme px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] md:px-3 md:py-1.5 md:text-[11px] ${k === s.flow!.length - 1 ? 'border-ink-3 bg-ground-3 text-ink' : 'border-line text-ink-2'}`} style={{ borderRadius: 'var(--radius)' }}>{step}</span>
              {k < s.flow!.length - 1 && <span aria-hidden="true" className="font-mono text-xs text-ink-3">→</span>}
            </li>
          ))}
        </ol>
      )}
      {s.links && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
          {s.links.map((l) => <Link key={l.to} to={l.to} className="btn btn-outline">{l.label} <ArrowRight size={18} /></Link>)}
        </div>
      )}
    </div>
    <div className={`order-first px-1 pt-1 md:px-0 md:pt-0 ${flip ? 'md:order-1' : 'md:order-none'}`}>
      <ScreenProof slot={s.slot} loop={s.loop} what={s.shot} kind={s.kind} tilt={flip ? 1 : -1} />
    </div>
  </article>
);

export const OurWork: React.FC = () => {
  useReveal();
  return (
    <main>
      <PageIntro
        op="OP-15"
        tag="Systems in use"
        title={<>I run my company <span className="sig">on it.</span></>}
        sub="The same operating logic Bruce Works sells runs inside Bruce Works. These are the systems I use every day, shown with the private details scrubbed."
        actions={<>
          <Link to="/live-demo/" className="btn btn-primary">Try the live demo <ArrowRight size={18} /></Link>
          <Link to="/command-center/" className="btn btn-outline">What's in the Command Center</Link>
        </>}
        aside={<ArtLoop slot="heroSquadLoop" still="heroSquad" name="The squad" label="HQ" tilt={-1} className="aspect-video w-full" />}
      />

      {/* ── ground rules ── */}
      <section className="border-y border-line bg-ground-2">
        <div className="container-x grid gap-5 py-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <p className="text-ink-2"><span className="label block !text-ink">Ground rules for this page</span><span className="mt-2 block">Stylized, privacy-sanitized views of real internal systems: the structure, without personal, military, financial, credential or client data.</span></p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink md:text-base">{RULES.map((r) => <Check key={r}>{r}</Check>)}</ul>
        </div>
      </section>

      {/* ── 01 the systems: a swipe row on phones, alternating rows from md up ── */}
      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="Three systems in daily use" />
          <Swipe label="Systems in use" desktop="md:block md:divide-y md:divide-line-2 md:[&>li]:py-14 md:[&>li:first-child]:pt-10 md:[&>li:last-child]:pb-0" item="basis-[88%] sm:basis-[64%]" className="mt-8">
            {SYSTEMS.map((s, i) => <SystemCard key={s.id} s={s} flip={i % 2 === 1} />)}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 what comes next ── */}
      <GridBand tone="raised">
        <div className="py-14 md:py-20">
          <SectionHeader num="02" label="What comes next" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
            <Display className="reveal text-4xl md:text-5xl">Real screens, <span className="sig">scrubbed first.</span></Display>
            <p className="reveal text-lg text-ink-2">Approved screenshots and case studies go up here once the private details are scrubbed. Bruce Works will not use AI-generated dashboards as proof of delivered work.</p>
          </div>
        </div>
      </GridBand>

      <StoryNav current="/our-work/" num="03" />
      <HazardStrip />
      <AuditBand />
    </main>
  );
};
