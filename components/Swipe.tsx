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
  const [scrolls, setScrolls] = React.useState(true); // a row that fits without scrolling gets no counter
  // Cards snap with their left edge on the row's scroll padding, so the current card is the one nearest that line. The
  // last cards can't reach the line (the row runs out first), so the end of the row counts as the last card.
  const snapLine = (el: HTMLElement) => el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0);
  React.useEffect(() => {
    const el = row.current; if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return;
      setScrolls(el.scrollWidth > el.clientWidth + 4 || !el.offsetParent);
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) { setAt(kids.length - 1); return; }
      const line = snapLine(el);
      let best = 0, d = Infinity;
      kids.forEach((k, n) => { const x = Math.abs(k.getBoundingClientRect().left - line); if (x < d) { d = x; best = n; } });
      setAt(best);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  const go = (i: number) => {
    const el = row.current; const k = el?.children[i] as HTMLElement | undefined; if (!el || !k) return;
    el.scrollTo({ left: el.scrollLeft + k.getBoundingClientRect().left - snapLine(el), behavior: 'smooth' });
  };
  return (
    <div className={className}>
      <ul ref={row} role="region" aria-label={label} tabIndex={0}
        className={`-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${desktop}`}>
        {items.map((c, i) => <li key={i} className={`flex shrink-0 snap-start ${item} md:basis-auto [&>*]:w-full`}>{c}</li>)}
      </ul>
      {items.length > 1 && scrolls && (
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
