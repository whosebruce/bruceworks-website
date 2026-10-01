import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from '../brand';
import type { NoteBlock } from '../../content/field-notes';

// Renders a field note's blocks with the site's tokens. Inline text knows two marks only, **bold** and [text](href),
// and becomes React elements (never HTML), so article data can't inject markup.
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1]) out.push(<b key={i} className="font-semibold text-ink">{m[1]}</b>);
    else {
      const href = m[3];
      const cls = 'font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-text';
      out.push(href.startsWith('/')
        ? <Link key={i} to={href} className={cls}>{m[2]}</Link>
        : <a key={i} href={href} className={cls} rel="noopener" target="_blank">{m[2]}</a>);
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const ArticleBody: React.FC<{ blocks: NoteBlock[] }> = ({ blocks }) => {
  let h = 0;
  return (
    <div className="space-y-6 text-[18px] leading-[1.7] text-ink-2">
      {blocks.map((b, k) => {
        switch (b.t) {
          case 'p': return <p key={k}>{inline(b.text)}</p>;
          case 'h2': h += 1; return (
            <h2 key={k} id={slugify(b.text)} className="flex scroll-mt-28 items-baseline gap-3 pt-6">
              <span className="shrink-0 font-mono text-sm font-semibold text-alert">{String(h).padStart(2, '0')}</span>
              <span className="display text-3xl md:text-4xl">{b.text}</span>
            </h2>
          );
          case 'list': return <ul key={k} className="space-y-3">{b.items.map((x) => <Check key={x}>{inline(x)}</Check>)}</ul>;
          case 'steps': return (
            <ol key={k} className="divide-y divide-line-2 border-y border-line-2">
              {b.items.map(([head, text], i) => (
                <li key={head} className="grid grid-cols-[40px_1fr] gap-3 py-4">
                  <span className="pt-0.5 font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                  <span><b className="block font-semibold text-ink">{head}</b><span className="text-[17px]">{inline(text)}</span></span>
                </li>
              ))}
            </ol>
          );
          case 'pairs': return (
            <dl key={k} className="panel divide-y divide-line-2 text-[16px] leading-snug">
              {b.items.map(([a, c]) => (
                <div key={a} className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-4">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-3 sm:pt-0.5">{a}</dt>
                  <dd className="text-ink-2">{inline(c)}</dd>
                </div>
              ))}
            </dl>
          );
          case 'tree': return (
            <pre key={k} className="panel overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-ink" aria-label="Folder layout">{b.lines.join('\n')}</pre>
          );
          case 'callout': return (
            <aside key={k} className="chamfer mt-10"><div className="chamfer-in p-6">
              <p className="label">{b.label}</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">{inline(b.text)}</p>
            </div></aside>
          );
        }
      })}
    </div>
  );
};

/** The h2s of a note, for an "on this page" list. */
export const headings = (blocks: NoteBlock[]) => blocks.filter((b): b is Extract<NoteBlock, { t: 'h2' }> => b.t === 'h2').map((b) => ({ id: slugify(b.text), text: b.text }));
