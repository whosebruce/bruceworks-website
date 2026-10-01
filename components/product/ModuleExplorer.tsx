import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Check, Chamfer, Loop } from '../brand';
import { MODULE_ICON } from '../ModuleGrid';
import { MODULES, type Module, type ModuleId } from '../../content/modules';
import { MODULE_DETAILS } from '../../content/module-details';
import { LOOPS } from '../../content/media';

// Pick a module, see what it does, what it replaces, how it works in the field and its motion loop. Every module is
// also a switch: flip it and "your build" changes, the way Settings → Features does in the real thing.
const GROUPS: { id: Module['group']; blurb: string }[] = [
  { id: 'Work', blurb: 'Files, documents, tasks, school, money.' },
  { id: 'Agents', blurb: 'Your AI squad, and the brakes.' },
  { id: 'Make', blurb: 'Images, motion, voice, video.' },
  { id: 'System', blurb: 'Alerts, keys, your sites.' },
];
const START: ModuleId[] = ['crew', 'approvals', 'jot', 'office', 'files', 'library', 'projects', 'studio', 'content', 'notifications'];

export const ModuleExplorer: React.FC = () => {
  const [group, setGroup] = React.useState<Module['group']>('Work');
  const [id, setId] = React.useState<ModuleId>('jot');
  const [on, setOn] = React.useState<Set<ModuleId>>(() => new Set(START));
  const m = MODULES.find((x) => x.id === id)!;
  const inGroup = MODULES.filter((x) => x.group === group);
  const index = MODULES.findIndex((x) => x.id === id);
  const live = MODULES.filter((x) => x.status === 'live');
  const built = live.filter((x) => on.has(x.id));

  const pick = (next: ModuleId) => { const n = MODULES.find((x) => x.id === next)!; setGroup(n.group); setId(next); };
  const row = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => { // on phones the module list is one sideways row: bring the picked one into it (never scrolls the page)
    const el = row.current; const b = el?.querySelector<HTMLElement>('[aria-current="true"]');
    if (el && b && el.scrollWidth > el.clientWidth) el.scrollTo({ left: Math.max(0, b.parentElement!.offsetLeft - el.offsetLeft - 20), behavior: 'smooth' });
  }, [id, group]);
  const step = (d: number) => pick(MODULES[(index + d + MODULES.length) % MODULES.length].id);
  const flip = (x: ModuleId) => setOn((p) => { const n = new Set(p); n.has(x) ? n.delete(x) : n.add(x); return n; });

  return (
    <div className="space-y-4">
      {/* your build: the sidebar the switches make */}
      <div className="panel hidden flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex" aria-live="polite">
        <p className="label shrink-0">Your build <span className="text-ink">· {built.length} of {live.length} on</span></p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Modules switched on">
          {built.map((x) => { const I = MODULE_ICON[x.id]; return (
            <li key={x.id}><button type="button" onClick={() => pick(x.id)} title={x.name} aria-label={`Show ${x.name}`}
              className={`grid h-8 w-8 place-items-center border-theme transition-colors ${x.id === id ? 'border-signal bg-signal text-signal-ink' : 'border-line text-signal-text hover:border-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}><I size={15} /></button></li>
          ); })}
          {!built.length && <li className="text-sm text-ink-3">Everything’s off. Flip a few on.</li>}
        </ul>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* picker */}
        <div className="space-y-3">
          <div role="tablist" aria-label="Module groups" className="grid grid-cols-4 gap-1.5 lg:grid-cols-2">
            {GROUPS.map((g) => { const sel = g.id === group; const n = MODULES.filter((x) => x.group === g.id).length; return (
              <button key={g.id} type="button" role="tab" aria-selected={sel} aria-controls="module-list" id={`tab-${g.id}`}
                onClick={() => { setGroup(g.id); setId(MODULES.find((x) => x.group === g.id)!.id); }}
                className={`border-theme px-2 py-2 text-left transition-colors lg:px-3 lg:py-2.5 ${sel ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}>
                <span className="chip block text-[15px] text-ink lg:text-base">{g.id}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{n} {n === 1 ? 'module' : 'modules'}</span>
              </button>
            ); })}
          </div>
          <p className="hidden text-sm text-ink-3 lg:block">{GROUPS.find((g) => g.id === group)!.blurb}</p>
          <ul ref={row} id="module-list" role="tabpanel" aria-labelledby={`tab-${group}`} className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 lg:flex-col lg:gap-1 [&::-webkit-scrollbar]:hidden">
            {inGroup.map((x) => { const I = MODULE_ICON[x.id]; const sel = x.id === id; return (
              <li key={x.id} className="shrink-0">
                <button type="button" onClick={() => setId(x.id)} aria-current={sel ? 'true' : undefined}
                  className={`flex min-h-[44px] w-full items-center gap-2.5 whitespace-nowrap border-theme px-3 py-2 text-left transition-colors ${sel ? 'border-signal bg-ground-3 text-ink' : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink lg:border-transparent'}`} style={{ borderRadius: 'var(--radius)' }}>
                  <I size={17} className={sel ? 'text-signal-text' : 'text-ink-3'} />
                  <span className="chip text-[15px]">{x.name}</span>
                  {x.status === 'coming'
                    ? <span className="ml-auto pl-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Coming</span>
                    : <span aria-hidden="true" className={`ml-auto hidden h-2 w-2 lg:block ${on.has(x.id) ? 'bg-signal' : 'border border-line'}`} style={{ borderRadius: 'var(--radius)' }} />}
                </button>
              </li>
            ); })}
          </ul>
        </div>

        {/* the module */}
        <ModuleDetailPanel m={m} index={index} on={on.has(m.id)} count={`${built.length} of ${live.length} on`} onFlip={() => flip(m.id)} onStep={step} onPick={pick} />
      </div>
    </div>
  );
};

const ModuleDetailPanel: React.FC<{ m: Module; index: number; on: boolean; count: string; onFlip: () => void; onStep: (d: number) => void; onPick: (id: ModuleId) => void }> = ({ m, index, on, count, onFlip, onStep, onPick }) => {
  const I = MODULE_ICON[m.id];
  const d = MODULE_DETAILS[m.id];
  const coming = m.status === 'coming';
  return (
    <Chamfer innerClassName="flex flex-col">
      <article aria-labelledby="module-name" className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-3 py-2 sm:px-4">
          <span className="label truncate">[ {m.group} // {String(index + 1).padStart(2, '0')} of {MODULES.length} ]</span>
          <span className="ml-auto flex shrink-0 gap-1">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous module" className="grid h-9 w-9 place-items-center border-theme border-line text-ink-2 hover:border-ink-3 hover:text-ink" style={{ borderRadius: 'var(--radius)' }}><ChevronLeft size={16} /></button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next module" className="grid h-9 w-9 place-items-center border-theme border-line text-ink-2 hover:border-ink-3 hover:text-ink" style={{ borderRadius: 'var(--radius)' }}><ChevronRight size={16} /></button>
          </span>
        </div>

        <div className="grid flex-1 gap-0 xl:grid-cols-[1.15fr_1fr]">
          <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <I size={30} className="text-signal-text" />
              <h3 id="module-name" className="display text-4xl md:text-5xl">{m.name}</h3>
              <span className={`chip border-theme px-2 py-0.5 text-sm ${coming ? 'border-line text-ink-3' : 'border-signal/60 text-ink'}`} style={{ borderRadius: 'var(--radius)' }}>{coming ? 'Coming' : 'Live'}</span>
            </div>
            <p className="text-lg leading-snug text-ink md:text-xl">{m.does}</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-3">Instead of <span className="text-ink-2">{m.instead}</span></p>
            <div className="hidden space-y-5 lg:block"><ModulePoints d={d} /></div>
            <details className="group border-theme border-line lg:hidden" style={{ borderRadius: 'var(--radius)' }}>
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 px-3 [&::-webkit-details-marker]:hidden">
                <span className="label !text-ink">In the field</span><span className="label">· {d.points.length} notes</span>
                <span aria-hidden="true" className="ml-auto text-ink-3 transition-transform group-open:rotate-90">▸</span>
              </summary>
              <div className="space-y-4 border-t border-line-2 px-3 py-3"><ModulePoints d={d} /></div>
            </details>
            <div className="flex flex-wrap items-center gap-2 border-t border-line-2 pt-4">
              <span className="label mr-1">Works with</span>
              {d.with.map((w) => { const x = MODULES.find((y) => y.id === w)!; const W = MODULE_ICON[w]; return (
                <button key={w} type="button" onClick={() => onPick(w)} className="chip flex min-h-[36px] items-center gap-1.5 border-theme border-line px-2.5 text-sm text-ink-2 hover:border-ink-3 hover:text-ink" style={{ borderRadius: 'var(--radius)' }}>
                  <W size={14} className="text-signal-text" />{x.name}
                </button>
              ); })}
            </div>
          </div>

          <div className="grid grid-cols-[112px_1fr] items-center gap-3 border-t border-line p-4 sm:grid-cols-[180px_1fr] sm:p-6 xl:flex xl:flex-col xl:items-stretch xl:border-l xl:border-t-0">
            <ModuleMedia m={m} />
            <div className="flex items-center gap-3 self-stretch border-theme border-line bg-ground px-3 py-2.5 xl:self-auto" style={{ borderRadius: 'var(--radius)' }}>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink">{coming ? 'Not in today’s build' : on ? 'On in your build' : 'Off in your build'}</span>
                <span className="block text-xs text-ink-3">{coming ? 'It arrives as a switch when it ships.' : on ? 'In the sidebar, the search and every link.' : 'Gone from the sidebar, and not running.'}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 sm:hidden">Your build · {count}</span>
              </span>
              <button type="button" role="switch" aria-checked={on && !coming} disabled={coming} aria-label={`${m.name} in your build`} onClick={onFlip}
                className={`h-7 w-12 shrink-0 border-theme p-0.5 transition-colors disabled:opacity-40 ${on && !coming ? 'border-signal bg-signal' : 'border-line bg-ground-2'}`} style={{ borderRadius: 'var(--radius)' }}>
                <span className={`block h-full w-1/2 transition-transform ${on && !coming ? 'translate-x-full bg-signal-ink' : 'bg-ink-3'}`} style={{ borderRadius: 'var(--radius)' }} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Chamfer>
  );
};

const ModulePoints: React.FC<{ d: (typeof MODULE_DETAILS)[ModuleId] }> = ({ d }) => (<>
  <ul className="space-y-2.5 text-[15px] leading-snug text-ink-2">
    {d.points.map((p) => <Check key={p}>{p}</Check>)}
  </ul>
  {d.note && <p className="border-l-2 border-line pl-3 text-sm text-ink-3">{d.note}</p>}
</>);

/** The module's motion loop, or a designed placeholder until it's made. */
const ModuleMedia: React.FC<{ m: Module }> = ({ m }) => {
  const loop = m.loop ? LOOPS[m.loop] : null;
  const I = MODULE_ICON[m.id];
  if (loop) return (
    <div className="overflow-hidden border-theme border-line bg-ground" style={{ borderRadius: 'var(--radius)' }}>
      <Loop key={m.id} src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="block aspect-square w-full object-cover" />
    </div>
  );
  return (
    <div className="texture relative grid aspect-square w-full place-items-center overflow-hidden border-theme border-line bg-ground" style={{ borderRadius: 'var(--radius)' }} role="img" aria-label={`${m.name}: motion loop coming`}>
      <span aria-hidden="true" className="display pointer-events-none absolute inset-x-0 bottom-2 truncate px-2 text-center text-2xl opacity-10 sm:text-4xl xl:bottom-3 xl:px-4 xl:text-6xl">{m.name}</span>
      <I aria-hidden="true" className="h-9 w-9 text-signal-text sm:h-12 sm:w-12 xl:h-14 xl:w-14" />
      <span className="label absolute left-3 top-3 hidden sm:block">[ Motion loop // {m.status === 'coming' ? 'when it ships' : 'coming'} ]</span>
    </div>
  );
};
