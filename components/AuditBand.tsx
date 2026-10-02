import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Display, OpTag, PhotoPanel } from './brand';
import { STILLS } from '../content/media';

// The short version of the audit call to action, for pages that don't need the whole form (Home): one line, the
// price, two ways in. The form itself lives on /ai-leverage-audit/ and /contact/.
export const AuditBand: React.FC = () => {
  const art = STILLS.bruceSalute;
  return (
  <section className="texture border-t border-line">
    <div className="container-x flex flex-col gap-8 py-14 md:py-20 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <OpTag op="OP-00">AI Leverage Audit</OpTag>
        <Display className="mt-6 text-5xl md:text-6xl">Find the first thing <span className="sig">worth building.</span></Display>
        <p className="mt-5 text-lg text-ink-2">A workflow map, the top opportunities ranked, what stays private, and a 30-day plan. Delivered within 7 business days of complete intake.</p>
        <p className="mt-5 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">Remote $197 <span className="text-ink-3">·</span> San Diego in person $297</p>
      </div>
      <div className="flex items-end gap-8">
        {art && <PhotoPanel tilt={3} className="hidden w-44 shrink-0 xl:block"><img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="block h-auto w-full" /></PhotoPanel>}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link to="/book/" className="btn btn-primary">Book the audit <ArrowRight size={18} /></Link>
          <a href="tel:+18668296757" className="btn btn-outline"><Phone size={16} /> (866) 829-6757</a>
        </div>
      </div>
    </div>
  </section>
  );
};
