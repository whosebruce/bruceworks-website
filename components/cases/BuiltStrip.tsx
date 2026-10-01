import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Swipe } from '../Swipe';
import { CASE_STUDIES } from '../../content/case-studies';
import { StatusChip } from './StatusChip';
import { ThemeSwatch, WearButton } from './Wear';

// "Brands we've built": a compact strip of every case study (name, kind of business, live site, wear their theme, the
// case study), for pages that only need the short version (Home, Our Work). A swipe row of cards on phones, two
// columns on tablets, one row per client from `lg` up. The host page gives it its band and section header; this is only
// the strip, with an optional label line above it.
export const BuiltStrip: React.FC<{ className?: string; heading?: boolean }> = ({ className = '', heading = true }) => (
  <div className={className}>
    {heading && (
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="label">Brands we've built</p>
        <Link to="/case-studies/" className="label inline-flex min-h-[44px] items-center hover:!text-ink">All case studies →</Link>
      </div>
    )}
    <Swipe label="Brands we've built" item="basis-[80%] sm:basis-[48%]"
      desktop="md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-1 lg:gap-0 lg:panel lg:divide-y lg:divide-line-2">
      {CASE_STUDIES.map((cs) => {
        const live = cs.status === 'live' ? cs.links[0] : undefined;
        return (
          <article key={cs.slug}
            className="panel flex h-full flex-col p-4 lg:grid lg:grid-cols-[88px_minmax(0,1fr)_128px_auto] lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:px-5 lg:py-4">
            <ThemeSwatch theme={cs.theme} height={8} />
            <div className="mt-4 min-w-0 lg:mt-0">
              <h3 className="display text-2xl [overflow-wrap:anywhere]">{cs.client}</h3>
              <p className="label mt-1">{cs.kind}</p>
            </div>
            <StatusChip status={cs.status} className="mt-3 self-start lg:mt-0 lg:self-center lg:justify-self-end" />
            <div className="mt-auto pt-5 lg:mt-0 lg:flex lg:items-center lg:justify-end lg:gap-5 lg:pt-0">
              <WearButton theme={cs.theme} client={cs.client} className="w-full lg:w-auto" />
              <div className="mt-2 flex flex-wrap gap-x-5 lg:mt-0 lg:w-[104px] lg:flex-col lg:gap-0">
                <Link to={`/case-studies/${cs.slug}/`} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:underline"
                  aria-label={`${cs.client} case study`}>Case study <ArrowRight size={14} aria-hidden="true" /></Link>
                {live && (
                  <a href={live.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink hover:underline"
                    aria-label={`Visit ${live.label} (opens in a new tab)`}>Visit site <ArrowUpRight size={14} aria-hidden="true" /></a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </Swipe>
  </div>
);
