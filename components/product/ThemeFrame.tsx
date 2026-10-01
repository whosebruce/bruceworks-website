import React from 'react';
import { createPortal } from 'react-dom';
import { BellRing, FileText, FolderTree, GraduationCap, Plus, StickyNote, Bot } from 'lucide-react';
import type { ThemeId } from '../../theme/themes';

// A live theme preview that doesn't depend on the theme the site is wearing.
//
// Why an iframe: every token is defined on `:root[data-theme="<id>"]` in index.css, and `:root` only ever matches the
// <html> element. So the clean way to show a theme other than the site's is to give it its own <html>: a same-origin
// `srcdoc` iframe whose <html data-theme="<id>"> gets a copy of the site's own stylesheets (the same <link>/<style>
// elements, so nothing is duplicated and index.css stays the single source). React renders the sample UI into that
// document through a portal, so the preview is ordinary JSX with ordinary token classes, and the theme's fonts, corners,
// display case, texture and the Field Manual // Day highlight all come out exactly as they do on the real site.
// No extra route, no copied CSS, no edit to index.css. The frame is decoration: hidden from screen readers and not
// focusable (the card around it carries the name and the "Wear it" button).
const DOC = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body></body></html>';

export const ThemeFrame: React.FC<{ theme: ThemeId; height?: number | string; className?: string; title: string; children: React.ReactNode }> = ({ theme, height = 320, className = '', title, children }) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [body, setBody] = React.useState<HTMLElement | null>(null);

  const mount = React.useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (!doc || !doc.body || doc.URL !== 'about:srcdoc') return;
    doc.documentElement.dataset.theme = theme;
    if (!doc.head.querySelector('[data-bw-copied]')) {
      for (const node of Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))) {
        const copy = node.cloneNode(true) as HTMLElement;
        copy.setAttribute('data-bw-copied', '');
        doc.head.appendChild(copy);
      }
    }
    doc.body.style.margin = '0';
    doc.body.style.overflow = 'hidden';
    setBody(doc.body);
  }, [theme]);

  // the srcdoc document may already be there (a fast load, or a remount in dev), or arrive with the load event
  React.useEffect(() => { mount(); }, [mount]);

  return (
    <iframe ref={ref} title={title} srcDoc={DOC} onLoad={mount} aria-hidden="true" tabIndex={-1} loading="lazy"
      className={`block w-full border-0 ${className}`} style={{ height }}>
      {body && createPortal(children, body)}
    </iframe>
  );
};

/** The sample UI every theme card shows: a title bar, a rail, a headline, two stat panels, chips, a list and buttons. */
export const ThemeSample: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex h-screen flex-col bg-ground text-ink-2 texture">
    <div className="flex h-9 shrink-0 items-center gap-2 border-b border-line bg-ground-3 px-3">
      <span className="h-3 w-3 bg-signal" style={{ borderRadius: 'var(--radius)' }} />
      <span className="label truncate">{name} // command</span>
      <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3"><BellRing size={12} /> 2</span>
    </div>
    <div className="flex min-h-0 flex-1">
      <div className="flex w-11 shrink-0 flex-col items-center gap-3 border-r border-line bg-ground-2 py-3 text-ink-3">
        {[Bot, StickyNote, FileText, FolderTree, GraduationCap].map((I, i) => (
          <span key={i} className={`grid h-7 w-7 place-items-center ${i === 1 ? 'bg-signal text-signal-ink' : ''}`} style={{ borderRadius: 'var(--radius)' }}><I size={15} /></span>
        ))}
      </div>
      <div className="min-w-0 flex-1 space-y-3 p-4">
        <p className="label max-[340px]:hidden">Tuesday // 0700</p>
        <p className="display text-[34px]">Morning, <span className="sig">Alex.</span></p>
        <div className="flex flex-wrap gap-1.5 max-[340px]:hidden">
          {['Business', 'School', 'Content'].map((c, i) => (
            <span key={c} className={`chip border-theme px-2 py-0.5 text-[12px] ${i === 0 ? 'border-signal text-ink' : 'border-line text-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}>{c}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[['Due today', '3'], ['Agents working', '2']].map(([k, v]) => (
            <div key={k} className="panel px-3 py-2"><p className="label !text-[10px]">{k}</p><p className="display text-2xl">{v}</p></div>
          ))}
        </div>
        <ul className="panel divide-y divide-line-2 text-[13px]">
          {['Send the Hernandez estimate', 'Chapter 5 quiz', 'Edit the skit intro'].map((x, i) => (
            <li key={x} className="flex items-center gap-2 px-3 py-1.5 text-ink"><span className="text-signal-text">{i === 2 ? '☐' : '☑'}</span><span className="truncate">{x}</span></li>
          ))}
        </ul>
        <div className="flex gap-2">
          <span className="btn btn-primary !min-h-[34px] !px-3 !text-[13px]"><Plus size={14} /> New task</span>
          <span className="btn btn-outline !min-h-[34px] !px-3 !text-[13px]">Ask Mira</span>
        </div>
      </div>
    </div>
  </div>
);
