import React from 'react';
import { Display, GridBand, OpTag } from './brand';

// The top of every inner page: OP tag, the headline, one paragraph, optional actions. Pages put their own art beside
// it through `aside`.
export const PageIntro: React.FC<{ op: string; tag: string; title: React.ReactNode; sub?: React.ReactNode; actions?: React.ReactNode; aside?: React.ReactNode }> = ({ op, tag, title, sub, actions, aside }) => (
  <GridBand className="texture border-t-0" marks={false}>
    <div className={`grid gap-10 pb-14 pt-12 md:pb-20 md:pt-20 ${aside ? 'lg:grid-cols-[1.25fr_1fr] lg:items-center' : ''}`}>
      <div>
        <OpTag op={op}>{tag}</OpTag>
        <Display as="h1" className="mt-6 text-[clamp(2.75rem,7vw,6rem)]">{title}</Display>
        {sub && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">{sub}</div>}
        {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
      </div>
      {aside}
    </div>
  </GridBand>
);
