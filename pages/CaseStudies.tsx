import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Check, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { Swipe } from '../components/Swipe';
import { AuditBand } from '../components/AuditBand';
import { StatusChip } from '../components/cases/StatusChip';
import { ThemeSwatch, WearButton, WearStatus } from '../components/cases/Wear';
import { useTheme } from '../theme/ThemeProvider';
import { CASE_STUDIES, caseNumber, type CaseStudy } from '../content/case-studies';

// The case studies, as cards (a swipe row on phones). Every card can put that client's theme on the whole site, which
// is the point: you see their brand, built from tokens, on a real page. Facts live in content/case-studies.ts.

const Card: React.FC<{ cs: CaseStudy }> = ({ cs }) => {
  const { theme } = useTheme();
  const wearing = theme.id === cs.theme;
  const href = `/case-studies/${cs.slug}/`;
  return (
    <article className={`flex h-full flex-col border-theme bg-ground-2 p-5 md:p-6 ${wearing ? 'border-signal' : 'border-line'}`} style={{ borderRadius: 'var(--radius-lg)' }}>
      <ThemeSwatch theme={cs.theme} height={10} />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-alert">{caseNumber(cs)}</span>
        <StatusChip status={cs.status} />
      </div>
      <h2 className="display mt-4 text-3xl md:text-4xl"><Link to={href} className="hover:underline">{cs.client}</Link></h2>
      <p className="label mt-2">{cs.kind}</p>
      <p className="mt-4 text-ink-2">{cs.summary}</p>
      <ul className="mt-5 space-y-2 text-sm text-ink-2">
        {cs.built.slice(0, 3).map((b) => <Check key={b.what}>{b.what}</Check>)}
        {cs.built.length > 3 && <li className="pl-7 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">+ {cs.built.length - 3} more</li>}
      </ul>
      <div className="mt-auto flex flex-col gap-3 pt-6">
        <WearButton theme={cs.theme} client={cs.client} className="w-full" />
        <Link to={href} className="btn btn-outline w-full">Read the case <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
};

// The empty slot after the last case: where the visitor's business would go.
const YourCard: React.FC<{ n: number }> = ({ n }) => (
  <div className="flex h-full flex-col border-theme border-dashed border-line p-5 md:p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-alert">CASE-{String(n).padStart(2, '0')}</span>
    <h2 className="display mt-4 text-3xl md:text-4xl">Your business</h2>
    <p className="mt-4 text-ink-2">Want your brand on a page like this? It starts with the audit: a map of how you work now, the best opportunities ranked, and a 30-day plan.</p>
    <div className="mt-auto pt-6"><Link to="/ai-leverage-audit/" className="btn btn-primary w-full">Book the audit <ArrowRight size={16} aria-hidden="true" /></Link></div>
  </div>
);

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const count = (n: number) => WORDS[n] ?? String(n);

// Beside the intro: what's live and what's delivered, straight from the data.
const Record: React.FC = () => {
  const live = CASE_STUDIES.filter((c) => c.status === 'live');
  const rows: [string, number][] = [
    ['Live sites', live.length],
    ['Delivered designs', CASE_STUDIES.filter((c) => c.status === 'delivered').length],
    ['Themes you can wear', new Set(CASE_STUDIES.map((c) => c.theme)).size],
  ];
  return (
    <aside aria-label="The record" className="panel p-5 md:p-6">
      <p className="label">On the record</p>
      <dl className="mt-3 divide-y divide-line-2">
        {rows.filter(([, v]) => v > 0).map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-ink-2">{k}</dt>
            <dd className="display text-3xl">{v}</dd>
          </div>
        ))}
      </dl>
      {live.length > 0 && (
        <ul className="mt-2 border-t border-line-2 pt-3">
          {live.flatMap((c) => c.links).map((l) => (
            <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] text-ink hover:underline">{l.label} <ArrowUpRight size={14} aria-hidden="true" className="text-ink-3" /></a></li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export const CaseStudies: React.FC = () => {
  useReveal();
  const { theme } = useTheme();
  return (
    <main>
      <WearStatus />
      <PageIntro op="OP-06" tag="Case studies"
        title={<>Real clients. <span className="sig">Wear their brand.</span></>}
        sub={<>{count(CASE_STUDIES.length)} businesses I've built for, shown with their OK. Every card can put that client's theme on this whole site: their colors, their type, their corners. Tokens only, so no logos and no artwork.</>}
        aside={<Record />} />

      <GridBand>
        <div className="py-14 md:py-20">
          <SectionHeader num="01" label="The work" right={<span className="label hidden sm:inline">Wearing: <span className="text-ink">{theme.name}</span></span>} />
          <Swipe label="Case studies" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3" item="basis-[86%] sm:basis-[58%]" className="mt-10">
            {[...CASE_STUDIES.map((cs) => <Card key={cs.slug} cs={cs} />), <YourCard key="yours" n={CASE_STUDIES.length + 1} />]}
          </Swipe>
        </div>
      </GridBand>

      <GridBand tone="raised">
        <div className="grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeader num="02" label="How the themes work" />
            <Display className="reveal mt-8 text-4xl md:text-5xl">Same site. <span className="sig">Their look.</span></Display>
          </div>
          <div className="reveal space-y-4 text-lg text-ink-2">
            <p>Each client theme comes from the brand kit or design I made for that client: the colors, the type, the corners and the line weight. Nothing else. No logo, no mascot, no photos, no copy.</p>
            <p>Wear one and the header, the buttons, the panels and this text change over. Take it off and you're back where you were. A Command Center can wear your brand the same way.</p>
            <Link to="/themes/" className="label inline-block hover:!text-ink">Every theme, side by side →</Link>
          </div>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
