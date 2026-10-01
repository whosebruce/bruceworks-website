import React from 'react';

// A row of cards you swipe through on a phone (scroll-snap inside the section, the next card peeking; the page itself
// never scrolls sideways). From `md` up it's whatever layout `desktop` says, usually a grid.
//   <Swipe label="Tiers" desktop="md:grid md:grid-cols-3 md:gap-4">{cards}</Swipe>
export const Swipe: React.FC<{ children: React.ReactNode; label: string; desktop?: string; item?: string; className?: string }> = ({
  children, label, desktop = 'md:grid md:grid-cols-3 md:gap-4', item = 'basis-[84%] sm:basis-[60%]', className = '',
}) => {
  const row = React.useRef<HTMLUListElement>(null);
  const items = React.Children.toArray(children);
  const [at, setAt] = React.useState(0);
  React.useEffect(() => {
    const el = row.current; if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft + 8;
      let i = 0;
      kids.forEach((k, n) => { if (k.offsetLeft - el.offsetLeft <= left) i = n; });
      setAt(i);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const go = (i: number) => { const el = row.current; const k = el?.children[i] as HTMLElement | undefined; if (el && k) el.scrollTo({ left: k.offsetLeft - el.offsetLeft, behavior: 'smooth' }); };
  return (
    <div className={className}>
      <ul ref={row} role="region" aria-label={label} tabIndex={0}
        className={`-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${desktop}`}>
        {items.map((c, i) => <li key={i} className={`flex shrink-0 snap-start ${item} md:basis-auto [&>*]:w-full`}>{c}</li>)}
      </ul>
      {items.length > 1 && (
        <div className="mt-4 flex items-center gap-3 md:hidden" aria-hidden="true">
          <div className="flex flex-1 gap-1.5">
            {items.map((_, i) => <button key={i} type="button" tabIndex={-1} onClick={() => go(i)} className={`h-1.5 flex-1 transition-colors ${i === at ? 'bg-signal' : 'bg-line'}`} style={{ borderRadius: 'var(--radius)' }} />)}
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{at + 1} / {items.length} · swipe</span>
        </div>
      )}
    </div>
  );
};
