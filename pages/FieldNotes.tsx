import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MonitorPlay } from 'lucide-react';
import { Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { Swipe } from '../components/Swipe';
import { AuditBand } from '../components/AuditBand';
import { FIELD_NOTES, noteDate, readMinutes, type FieldNote } from '../content/field-notes';

// /field-notes/: Bruce's articles, newest first, from content/field-notes.ts.

export const FieldNotes: React.FC = () => {
  useReveal();
  const notes = [...FIELD_NOTES].sort((a, b) => b.date.localeCompare(a.date) || a.code.localeCompare(b.code));
  return (
    <main>
      <PageIntro op="OP-04" tag="Field notes"
        title={<>Field notes. <span className="sig">Plain talk.</span></>}
        sub={<p>What I’ve learned running my own company and my content from one Command Center. Outcome first, then the steps, and the honest part about what it doesn’t do.</p>}
      />

      <GridBand>
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The notes" right={<span className="label">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>} />
          <Swipe label="Field notes" desktop="md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3" className="reveal mt-10">
            {notes.map((n) => <NoteCard key={n.slug} n={n} />)}
          </Swipe>
        </div>
      </GridBand>

      <section className="border-t border-line bg-ground-2">
        <div className="container-x flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Display className="text-4xl md:text-5xl">More on the channel.</Display>
            <p className="mt-3 text-lg text-ink-2">The same plain talk, on video: builds, breakdowns and what broke, on the Bruce Works channel.</p>
          </div>
          <a href="https://www.youtube.com/@bruceworks" target="_blank" rel="noopener" className="btn btn-outline"><MonitorPlay size={18} /> Watch on YouTube</a>
        </div>
      </section>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};

export const NoteCard: React.FC<{ n: FieldNote }> = ({ n }) => (
  <Link to={`/field-notes/${n.slug}/`} className="panel group flex h-full flex-col p-6 hover:border-ink-3">
    <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
      <span className="text-alert">{n.code}</span><span className="text-ink-3">// {n.tag}</span>
    </p>
    <h2 className="display mt-4 text-3xl md:text-4xl">{n.title}</h2>
    <p className="mt-3 text-ink-2">{n.summary}</p>
    <p className="mt-auto flex items-center justify-between gap-3 pt-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{noteDate(n.date)} · {readMinutes(n)} min read</span>
      <ArrowRight size={18} className="shrink-0 text-signal-text transition-transform group-hover:translate-x-0.5" />
    </p>
  </Link>
);
