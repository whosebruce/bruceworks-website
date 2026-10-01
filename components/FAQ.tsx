import React from 'react';
import { SectionHeader } from './brand';
import { Accordion } from './offers/Accordion';
import { FAQ_GROUPS, type FAQGroup } from '../content/faq';

// Every FAQ group from content/faq.ts, each with its own anchor (/faq/#pricing, /faq/#hardware …). The questions live
// in content/faq.ts; /faq/'s FAQPage JSON-LD in seo/routes.json must match them (the route verifier checks).
export const FAQ: React.FC<{ groups?: FAQGroup[] }> = ({ groups = FAQ_GROUPS }) => (
  <div className="space-y-14">
    {groups.map((g, i) => (
      <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`faq-${g.id}`}>
        <SectionHeader num={String(i + 1).padStart(2, '0')} label={g.label} />
        <h2 id={`faq-${g.id}`} className="sr-only">{g.label}</h2>
        <Accordion className="mt-5" items={g.items} />
      </section>
    ))}
  </div>
);
