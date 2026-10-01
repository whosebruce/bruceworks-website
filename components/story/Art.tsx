import React from 'react';
import { Chamfer, Loop, PhotoPanel } from '../brand';
import { LOOPS, STILLS, type LoopMedia, type Still } from '../../content/media';

// Character art and screen proof for the story pages. Both read a slot from STILLS (content/media.ts). A slot that is
// null, or not added to content/media.ts yet (the screen* slots), renders a clean placeholder, so a page never shows a
// broken image while art and sanitized captures are still being made.
const still = (slot: string): Still => STILLS[slot] ?? null;
const loopOf = (slot?: string): LoopMedia => (slot ? LOOPS[slot] ?? null : null);

/** A motion loop (content/media.ts LOOPS) in a chamfered frame. Renders nothing while the slot is empty. */
export const LoopPanel: React.FC<{ slot: string; aspect?: string; className?: string; caption?: string }> = ({ slot, aspect = 'aspect-video', className = '', caption }) => {
  const l = loopOf(slot);
  if (!l) return null;
  return (
    <figure className={className}>
      <Chamfer innerClassName="overflow-hidden"><Loop src={l.mp4} webm={l.webm} poster={l.poster} label={l.label} className={`block w-full object-cover ${aspect}`} /></Chamfer>
      {caption && <figcaption className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">{caption}</figcaption>}
    </figure>
  );
};

/** Brand character art (Bruce, the squad) in a photo panel. */
export const ArtPanel: React.FC<{ slot: string; name: string; tilt?: number; className?: string; label?: string; nameClass?: string; eager?: boolean }> = ({ slot, name, tilt, className = '', label, nameClass = 'text-6xl', eager }) => {
  const art = still(slot);
  return (
    <PhotoPanel tilt={tilt} className={className} label={label}>
      {art ? (
        <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading={eager ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
      ) : (
        <div aria-hidden="true" className="grid h-full w-full place-items-center bg-paper text-paper-ink"><span className={`display opacity-15 ${nameClass}`}>{name}</span></div>
      )}
    </PhotoPanel>
  );
};

/** Character art that moves (a LOOPS slot drawn on white) in a photo panel; falls back to the still, then a placeholder. */
export const ArtLoop: React.FC<{ slot: string; still: string; name: string; tilt?: number; className?: string; label?: string }> = ({ slot, still: s, name, tilt, className = '', label }) => {
  const l = loopOf(slot);
  if (!l) return <ArtPanel slot={s} name={name} tilt={tilt} className={className} label={label} />;
  return (
    <PhotoPanel tilt={tilt} className={className} label={label}>
      <Loop src={l.mp4} webm={l.webm} poster={l.poster} label={l.label} className="block h-full w-full object-cover" />
    </PhotoPanel>
  );
};

type Kind = 'dashboard' | 'board' | 'pipeline';

/** A sanitized product screen in a photo panel labeled [ SCREEN PROOF ]. Until the capture exists: the module's motion
 *  graphic if there is one (captioned as a motion graphic, never as proof), otherwise a plain wireframe. */
export const ScreenProof: React.FC<{ slot: string; what: string; kind: Kind; tilt?: number; className?: string; loop?: string }> = ({ slot, what, kind, tilt = 0, className = '', loop }) => {
  const shot = still(slot);
  if (!shot && loopOf(loop)) return <LoopPanel slot={loop!} aspect="aspect-square" className={`mx-auto w-full max-w-[460px] ${className}`} caption={`Motion graphic // sanitized capture of the ${what.toLowerCase()} coming`} />;
  return (
    <PhotoPanel tilt={tilt} label="Screen proof" className={`aspect-[4/3] sm:aspect-[16/10] ${className}`}>
      {shot ? (
        <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" className="h-full w-full object-cover object-left-top" />
      ) : (
        <div className="flex h-full w-full flex-col bg-paper px-3 pb-3 pt-9 text-paper-ink sm:px-5 sm:pb-4 sm:pt-11">
          <div aria-hidden="true" className="min-h-0 flex-1 overflow-hidden">{kind === 'dashboard' ? <DashWire /> : kind === 'board' ? <BoardWire /> : <PipeWire />}</div>
          <p className="mt-3 truncate font-mono text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60">Sanitized capture coming <span className="opacity-60">//</span> {what}</p>
        </div>
      )}
    </PhotoPanel>
  );
};

const r = { borderRadius: 'var(--radius)' };
const Bar: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`block bg-paper-ink/10 ${className}`} style={r} />;

const DashWire: React.FC = () => (
  <div className="grid h-full grid-cols-[18px_1fr] gap-2 sm:grid-cols-[26px_1fr] sm:gap-3">
    <div className="flex flex-col gap-1.5">{[0, 1, 2, 3, 4, 5].map((i) => <Bar key={i} className={`aspect-square ${i === 1 ? '!bg-paper-ink/30' : ''}`} />)}</div>
    <div className="flex min-h-0 flex-col gap-2 sm:gap-3">
      <Bar className="h-2.5 w-2/5 !bg-paper-ink/25 sm:h-3.5" />
      <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="border border-paper-ink/15 p-1.5 sm:p-2" style={r}><Bar className="h-1.5 w-1/2" /><Bar className="mt-1.5 h-3 w-1/3 !bg-paper-ink/25 sm:h-4" /></div>)}</div>
      <div className="min-h-0 flex-1 divide-y divide-paper-ink/10 overflow-hidden border border-paper-ink/15" style={r}>
        {[0, 1, 2, 3].map((i) => <div key={i} className="flex items-center gap-2 px-2 py-1.5 sm:py-2"><Bar className="h-1.5 flex-1" /><Bar className={`h-2.5 w-10 ${i === 0 ? '!bg-paper-ink/30' : ''}`} /></div>)}
      </div>
    </div>
  </div>
);

const BoardWire: React.FC = () => (
  <div className="grid h-full grid-cols-4 gap-2 sm:gap-3">
    {[3, 2, 2, 1].map((n, c) => (
      <div key={c} className="flex min-h-0 flex-col gap-1.5 border border-paper-ink/15 p-1.5 sm:gap-2 sm:p-2" style={r}>
        <Bar className="h-2 w-3/5 !bg-paper-ink/25" />
        {Array.from({ length: n }, (_, i) => <div key={i} className="border border-paper-ink/10 bg-paper-ink/5 p-1.5" style={r}><Bar className="h-1.5 w-4/5" /><Bar className="mt-1 h-1.5 w-1/2" /></div>)}
      </div>
    ))}
  </div>
);

const PipeWire: React.FC = () => (
  <div className="flex h-full flex-col gap-2 sm:gap-3">
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <span className={`block h-5 flex-1 border border-paper-ink/20 sm:h-7 ${i === 4 ? 'bg-paper-ink/20' : 'bg-paper-ink/5'}`} style={r} />
          {i < 4 && <span className="font-mono text-[10px] opacity-40">→</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="min-h-0 flex-1 divide-y divide-paper-ink/10 overflow-hidden border border-paper-ink/15" style={r}>
      {[0, 1, 2, 3].map((i) => <div key={i} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-2 px-2 py-1.5 sm:py-2"><Bar className="h-1.5" /><Bar className="h-1.5" /><Bar className={`h-2.5 ${i === 2 ? '!bg-paper-ink/30' : ''}`} /></div>)}
    </div>
  </div>
);
