import React from 'react';
import {
  Bell, Bot, BriefcaseBusiness, Clapperboard, FileText, FolderTree, Globe, GraduationCap, Image, KeyRound, Landmark,
  Library, Mic, NotebookPen, ShieldCheck, Sparkles, StickyNote, type LucideIcon,
} from 'lucide-react';
import { MODULES, type Module, type ModuleId } from '../content/modules';
import { LOOPS } from '../content/media';
import { Loop } from './brand';

export const MODULE_ICON: Record<ModuleId, LucideIcon> = {
  crew: Bot, approvals: ShieldCheck, jot: StickyNote, office: FileText, files: FolderTree, library: Library, projects: BriefcaseBusiness,
  school: GraduationCap, finance: Landmark, studio: Image, motion: Sparkles, voice: Mic, content: Clapperboard, notifications: Bell,
  vault: KeyRound, web: Globe, pages: NotebookPen,
};

const START: ModuleId[] = ['crew', 'approvals', 'jot', 'office', 'files', 'library', 'studio', 'content', 'notifications'];

/** Every module is a switch: flip them and watch the sidebar of "your" command center change. */
export const ModuleGrid: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const [on, setOn] = React.useState<Set<ModuleId>>(() => new Set(START));
  const live = MODULES.filter((m) => m.status === 'live');
  const flip = (id: ModuleId) => setOn((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const shown = live.filter((m) => on.has(m.id));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m) => <ModuleCard key={m.id} m={m} on={on.has(m.id)} onFlip={interactive && m.status === 'live' ? () => flip(m.id) : undefined} />)}
      </ul>
      {interactive && (
        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Your command center's sidebar">
          <div className="chamfer"><div className="chamfer-in">
            <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-3"><span className="label">Your sidebar · {shown.length} on</span></div>
            <ul className="p-2">
              {shown.length ? shown.map((m) => { const I = MODULE_ICON[m.id]; return (
                <li key={m.id} className="flex items-center gap-3 px-3 py-2 text-[15px] font-semibold text-ink"><I size={17} className="text-signal-text" />{m.name}</li>
              ); }) : <li className="px-3 py-6 text-center text-sm text-ink-3">Everything's off. Flip a few on.</li>}
            </ul>
            <p className="border-t border-line px-4 py-3 text-xs text-ink-3">Off means gone: out of the sidebar, the search and every link, and the server stops running it.</p>
          </div></div>
        </aside>
      )}
    </div>
  );
};

const ModuleCard: React.FC<{ m: Module; on: boolean; onFlip?: () => void }> = ({ m, on, onFlip }) => {
  const I = MODULE_ICON[m.id];
  const loop = m.loop ? LOOPS[m.loop] : null;
  return (
    <li className={`panel flex flex-col overflow-hidden transition-opacity ${onFlip && !on ? 'opacity-55' : ''}`}>
      {loop && <Loop src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="aspect-square w-full border-b border-line object-cover" />}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2.5">
          <I size={18} className="text-signal-text" />
          <h3 className="chip text-lg text-ink">{m.name}</h3>
          {m.status === 'coming' && <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Coming</span>}
          {onFlip && (
            <button type="button" role="switch" aria-checked={on} aria-label={`${m.name} ${on ? 'on' : 'off'}`} onClick={onFlip}
              className={`ml-auto h-6 w-11 shrink-0 border-theme p-0.5 transition-colors ${on ? 'border-signal bg-signal' : 'border-line bg-ground'}`} style={{ borderRadius: 'var(--radius)' }}>
              <span className={`block h-full w-1/2 transition-transform ${on ? 'translate-x-full bg-signal-ink' : 'bg-ink-3'}`} style={{ borderRadius: 'var(--radius)' }} />
            </button>
          )}
        </div>
        <p className="text-[15px] leading-snug text-ink-2">{m.does}</p>
        <p className="mt-auto pt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Instead of {m.instead}</p>
      </div>
    </li>
  );
};
