import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Display, OpTag, PhotoPanel } from '../brand';
import { STILLS } from '../../content/media';
import { company } from '../../content/government';

// The close of /government-capabilities/: the teaming call to action, laid out like the audit band so the page ends
// the way every other page does. The form's government mode lives at /contact/?topic=government.
export const TeamingBand: React.FC = () => {
  const art = STILLS.bruceBriefing;
  const tel = `tel:+1${company.phone.replace(/\D/g, '')}`;
  return (
    <section className="texture border-t border-line">
      <div className="container-x flex flex-col gap-8 py-12 md:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <OpTag op="OP-09">Teaming</OpTag>
          <Display className="mt-5 text-[2.75rem] sm:text-5xl md:mt-6 md:text-6xl">Have a requirement or <span className="sig">teaming gap?</span></Display>
          <p className="mt-4 text-lg text-ink-2 md:mt-5">Send the scope, due date, delivery location, and expected workshare. Bruce Works will respond with a fit assessment before making capability or pricing commitments.</p>
        </div>
        <div className="flex items-end gap-8">
          {art && <PhotoPanel tilt={3} className="hidden w-44 shrink-0 xl:block"><img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="block h-auto w-full" /></PhotoPanel>}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/contact/?topic=government" className="btn btn-primary">Contact Bruce Works <ArrowRight size={18} /></Link>
            <a href={tel} className="btn btn-outline"><Phone size={16} /> {company.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
