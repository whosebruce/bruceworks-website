import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Display, GridBand, HazardStrip } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { FAQ } from '../components/FAQ';
import { useHashScroll } from '../components/offers/useHashScroll';
import { auditPrices } from '../components/offers/tiers';
import { FAQ_GROUPS } from '../content/faq';

// /faq/: every question, grouped, with a jump list. The answers come from content/faq.ts.
export const FAQPage: React.FC = () => {
  useHashScroll();
  const audit = auditPrices();
  return (
    <main>
      <PageIntro
        op="OP-07" tag="FAQ"
        title={<>What it is. What it isn’t. <span className="sig">What it costs.</span></>}
        sub={<p>The Command Center, who it’s for, what it replaces and what it doesn’t, hardware, privacy, agents, themes, pricing, government work and the audit. Plain answers, limits included.</p>}
        actions={<>
          <Link to="/book/" className="btn btn-primary">Book the {audit.remote} audit <ArrowRight size={18} /></Link>
          <a href="tel:+18668296757" className="btn btn-outline"><Phone size={16} /> (866) 829-6757</a>
        </>}
      />

      <GridBand>
        <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-[264px_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-3">Jump to</p>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {FAQ_GROUPS.map((g, i) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="chip flex min-h-[44px] items-center gap-2 border-theme border-line px-3 text-[15px] text-ink-2 rounded-theme hover:border-ink-3 hover:text-ink lg:text-[14px] lg:border-transparent lg:hover:border-transparent lg:hover:bg-ground-3">
                    <span className="font-mono text-xs text-alert">{String(i + 1).padStart(2, '0')}</span>{g.label}
                    <span className="ml-auto hidden font-mono text-xs text-ink-3 lg:inline">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <FAQ />
            <div className="panel mt-14 grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <Display as="h2" className="text-4xl">Didn’t find it?</Display>
                <p className="mt-3 text-ink-2">Call the intake line, or send the question and I’ll answer it myself.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="tel:+18668296757" className="btn btn-outline"><Phone size={16} /> (866) 829-6757</a>
                <Link to="/contact/" className="btn btn-outline">Send a question</Link>
              </div>
            </div>
          </div>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
