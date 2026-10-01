import React from 'react';

// The Field Manual motifs as components (brand kit readme, "Signature motifs"). They take every color and shape from
// the theme tokens, so a theme switch re-skins them too.

/** The stencil B tile: Signal square, Night "B". The site's mark on dark grounds. */
export const BTile: React.FC<{ size?: number; className?: string }> = ({ size = 34, className = '' }) => (
  <span aria-hidden="true" className={`inline-grid place-items-center bg-signal text-signal-ink font-display ${className}`}
    style={{ width: size, height: size, fontSize: size * 0.72, lineHeight: 1, fontWeight: 800, borderRadius: 'var(--radius)' }}>B</span>
);

/** "OP-01 // PRIVATE AI COMMAND CENTER" */
export const OpTag: React.FC<{ op?: string; children: React.ReactNode; className?: string }> = ({ op, children, className = '' }) => (
  <span className={`inline-flex items-center gap-2 border border-signal/40 bg-signal/5 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-signal-text ${className}`}
    style={{ borderRadius: 'var(--radius)' }}>
    {op && <span>{op}</span>}{op && <span className="opacity-60">//</span>}<span>{children}</span>
  </span>
);

/** Red number + mono label + hairline rule. */
export const SectionHeader: React.FC<{ num: string; label: string; right?: React.ReactNode; className?: string }> = ({ num, label, right, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="font-mono text-sm font-semibold text-alert">{num}</span>
    <span className="label !text-ink-2">{label}</span>
    <span className="h-px flex-1 bg-line" />
    {right}
  </div>
);

export const Display: React.FC<{ as?: 'h1' | 'h2' | 'h3'; className?: string; children: React.ReactNode; id?: string }> = ({ as: Tag = 'h2', className = '', children, id }) => (
  <Tag id={id} className={`display ${className}`}>{children}</Tag>
);

export const HazardStrip: React.FC<{ className?: string; height?: number }> = ({ className = '', height = 14 }) => (
  <div aria-hidden="true" className={`hazard w-full ${className}`} style={{ height }} />
);

/** White panel, Signal border, a slight tilt: where character art and screenshots live. */
export const PhotoPanel: React.FC<{ children: React.ReactNode; className?: string; tilt?: number; label?: string }> = ({ children, className = '', tilt, label }) => (
  <figure className={`photo-panel relative overflow-hidden ${className}`} style={tilt != null ? { transform: `rotate(${tilt}deg)` } : undefined}>
    {children}
    {label && <figcaption className="absolute left-2 top-2 bg-paper/90 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-paper-ink">[ {label} ]</figcaption>}
  </figure>
);

export const Check: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <li className={`flex gap-3 ${className}`}><span aria-hidden="true" className="mt-[0.1em] shrink-0 text-signal-text">☑</span><span>{children}</span></li>
);

/** A panel with one cut corner (Field Manual); rounded themes get their radius instead. */
export const Chamfer: React.FC<{ children: React.ReactNode; className?: string; innerClassName?: string }> = ({ children, className = '', innerClassName = '' }) => (
  <div className={`chamfer ${className}`}><div className={`chamfer-in ${innerClassName}`}>{children}</div></div>
);

/** A full-width band framed by the page grid: vertical rules at the container edges and + marks at the corners. */
export const GridBand: React.FC<{ children: React.ReactNode; className?: string; id?: string; marks?: boolean; tone?: 'ground' | 'raised' }> = ({ children, className = '', id, marks = true, tone = 'ground' }) => (
  <section id={id} className={`relative border-t border-line-2 ${tone === 'raised' ? 'bg-ground-2' : ''} ${className}`}>
    <div className="container-x relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 border-l border-line-2 md:left-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-5 border-r border-line-2 md:right-10" />
      {marks && <>
        <Cross className="-top-[7px] left-5 -translate-x-1/2 md:left-10" />
        <Cross className="-top-[7px] right-5 translate-x-1/2 md:right-10" />
      </>}
      <div className="relative px-0 md:px-6">{children}</div>
    </div>
  </section>
);

const Cross: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" className={`absolute z-10 ${className}`} style={{ color: 'var(--grid-mark)' }}>
    <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Adds .in to .reveal elements as they scroll into view (index.css keeps them visible without JS). */
export function useReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
}

/** A muted, looping motion graphic that only plays while on screen (and never for reduced motion). */
export const Loop: React.FC<{ src: string; poster: string; label: string; className?: string; webm?: string }> = ({ src, poster, label, className = '', webm }) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-label={label}>
      {webm && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
};
