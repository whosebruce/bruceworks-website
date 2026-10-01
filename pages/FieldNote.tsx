import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MonitorPlay } from 'lucide-react';
import { Display, GridBand, HazardStrip, OpTag, SectionHeader } from '../components/brand';
import { Swipe } from '../components/Swipe';
import { AuditBand } from '../components/AuditBand';
import { ArticleBody, headings } from '../components/product/ArticleBody';
import { useHashScroll } from '../components/product/useHashScroll';
import { FIELD_NOTES, noteBySlug, noteDate, readMinutes } from '../content/field-notes';
import { NoteCard } from './FieldNotes';
import { NotFound } from './NotFound';

// /field-notes/<slug>/: one article from content/field-notes.ts (its metadata and Article JSON-LD are in seo/routes.json).
// An unknown slug is the site's 404 page.
export const FieldNote: React.FC = () => {
  const { slug } = useParams();
  const note = noteBySlug(slug);
  useHashScroll();
  if (!note) return <NotFound />;
  const toc = headings(note.blocks);
  const more = FIELD_NOTES.filter((n) => n.slug !== note.slug);

  return (
    <main>
      <GridBand className="texture border-t-0" marks={false}>
        <div className="pb-12 pt-10 md:pb-16 md:pt-16">
          <Link to="/field-notes/" className="label inline-flex min-h-[44px] items-center gap-2 hover:!text-ink"><ArrowLeft size={14} /> Field notes</Link>
          <div className="mt-4"><OpTag op={note.code}>{note.tag}</OpTag></div>
          <Display as="h1" className="mt-6 max-w-5xl text-[clamp(2.5rem,6vw,5rem)]">{note.title}</Display>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink-2">{note.summary}</p>
          <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
            By Bruce <span className="opacity-60">//</span> <time dateTime={note.date}>{noteDate(note.date)}</time> <span className="opacity-60">//</span> {readMinutes(note)} min read
          </p>
        </div>
      </GridBand>

      <GridBand>
        <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="max-w-[44rem]"><ArticleBody blocks={note.blocks} /></article>
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <nav aria-label="In this note" className="panel p-5">
                <p className="label">In this note</p>
                <ol className="mt-3 space-y-2 text-[15px]">
                  {toc.map((h, i) => (
                    <li key={h.id} className="flex gap-2">
                      <span className="font-mono text-[11px] font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                      <a href={`#${h.id}`} className="leading-snug text-ink-2 hover:text-ink">{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <Link to="/live-demo/" className="panel group flex items-center gap-3 p-5">
                <MonitorPlay size={20} className="shrink-0 text-signal-text" />
                <span className="min-w-0 flex-1 font-semibold text-ink group-hover:underline">Try the live demo</span>
                <ArrowRight size={16} className="shrink-0 text-ink-3" />
              </Link>
            </div>
          </aside>
        </div>
      </GridBand>

      {more.length > 0 && (
        <GridBand tone="raised">
          <div className="py-14 md:py-20">
            <SectionHeader num="+" label="More field notes" right={<Link to="/field-notes/" className="label hover:!text-ink">All notes →</Link>} />
            <Swipe label="More field notes" desktop="md:grid md:grid-cols-2 md:gap-5" className="mt-8">
              {more.map((n) => <NoteCard key={n.slug} n={n} />)}
            </Swipe>
          </div>
        </GridBand>
      )}

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
