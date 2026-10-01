import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Chamfer, Display, GridBand, OpTag } from '../components/brand';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
const HQ = [1, 1]; // B2
const YOU = [4, 4]; // E5

/** A small map grid: HQ (home) and the square you landed on. */
const GridMap: React.FC = () => (
  <Chamfer innerClassName="p-5 sm:p-7">
    <p className="label">Grid reference // sector BW</p>
    <div className="mt-5 grid grid-cols-[22px_repeat(6,minmax(0,1fr))] gap-1.5">
      <span />
      {COLS.map((c) => <span key={c} className="text-center font-mono text-[11px] text-ink-3">{c}</span>)}
      {[0, 1, 2, 3, 4, 5].map((r) => (
        <React.Fragment key={r}>
          <span className="grid place-items-center font-mono text-[11px] text-ink-3">{r + 1}</span>
          {COLS.map((c, k) => {
            const hq = r === HQ[0] && k === HQ[1];
            const you = r === YOU[0] && k === YOU[1];
            const box = 'grid aspect-square place-items-center border-theme';
            const style = { borderRadius: 'var(--radius)' };
            if (hq) return <Link key={c} to="/" aria-label="HQ: back to the Bruce Works home page" className={`${box} border-ink-3 bg-ground-3 font-mono text-[11px] font-semibold text-ink hover:border-ink`} style={style}>HQ</Link>;
            if (you) return <span key={c} aria-label="You are here" className={`${box} border-alert bg-alert/10 font-mono text-base font-semibold text-alert`} style={style}>✕</span>;
            return <span key={c} aria-hidden="true" className={`${box} border-line-2 bg-ground`} style={style} />;
          })}
        </React.Fragment>
      ))}
    </div>
    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3"><span className="text-alert">✕</span> You are here <span className="opacity-60">//</span> HQ is home</p>
  </Chamfer>
);

export const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <GridBand className="texture border-t-0" marks={false}>
        <div className="grid gap-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <OpTag op="ERR-404">Page not found</OpTag>
            <Display as="h1" className="mt-6 text-[clamp(2.75rem,7vw,6rem)]">Wrong <span className="sig">grid square.</span></Display>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              <b className="font-semibold text-ink">Page not found.</b> There's nothing at this address. It may have moved in the rebuild, or the link was off by a digit. Pick a rally point and I'll get you back on the map.
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">
              Requested <span className="opacity-60">//</span> <span className="break-all normal-case text-ink">{pathname}</span> <span className="opacity-60">//</span> <span className="whitespace-nowrap">no target</span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/" className="btn btn-primary">Back to base <ArrowRight size={18} /></Link>
              <Link to="/live-demo/" className="btn btn-outline">Try the live demo</Link>
              <Link to="/contact/" className="btn btn-outline">Contact Bruce</Link>
            </div>
          </div>
          <GridMap />
        </div>
      </GridBand>
    </main>
  );
};
