import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Check, Display, GridBand, HazardStrip, PhotoPanel, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { AuditBand } from '../components/AuditBand';
import { StatusChip } from '../components/cases/StatusChip';
import { ThemeSwatch, WearButton, WearStatus } from '../components/cases/Wear';
import { BrandLook } from '../components/cases/BrandLook';
import { themeById } from '../theme/themes';
import { CASE_STUDIES, HOW_MADE, caseBySlug, caseNumber, type CaseStudy as Case } from '../content/case-studies';
import { NotFound } from './NotFound';

// One case study: the brief, what we built, how it looks (their palette and type, drawn with the theme tokens), the
// result, and the audit. The page offers the client's theme; it never puts it on by itself.

const Spec: React.FC<{ cs: Case }> = ({ cs }) => {
  const rows: [string, React.ReactNode][] = [
    ['Business', cs.kind],
    ['Status', <StatusChip key="s" status={cs.status} />],
    ['Delivered', `${cs.built.length} pieces`],
    ['Theme', themeById(cs.theme).name],
  ];
  return (
    <aside aria-label={`${cs.client} at a glance`} className="panel p-5 md:p-6">
      <ThemeSwatch theme={cs.theme} height={14} />
      <dl className="mt-5 divide-y divide-line-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 py-3">
            <dt className="label">{k}</dt>
            <dd className="text-right text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};

// Screenshots of the live site, captured by Bruce Works, in photo panels labelled as proof.
const Proof: React.FC<{ cs: Case }> = ({ cs }) => {
  const s = cs.screens!;
  return (
    <div className="reveal lg:col-span-2">
      <div className={`grid items-start gap-6 md:gap-10 ${s.phone ? 'sm:grid-cols-[1fr_minmax(0,34%)] lg:grid-cols-[1fr_260px]' : ''}`}>
        <PhotoPanel label="SCREEN PROOF" tilt={0} className={s.phone ? '' : 'max-w-4xl'}>
          <img src={s.desktop.src} alt={s.desktop.alt} width={s.desktop.w} height={s.desktop.h} loading="lazy" decoding="async" className="block h-auto w-full" />
        </PhotoPanel>
        {s.phone && (
          <PhotoPanel label="SCREEN PROOF" className="mx-auto w-[62%] sm:w-full">
            <img src={s.phone.src} alt={s.phone.alt} width={s.phone.w} height={s.phone.h} loading="lazy" decoding="async" className="block h-auto w-full" />
          </PhotoPanel>
        )}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">The live site, {s.phone ? 'desktop and phone' : 'on a desktop screen'}, {s.captured}.</p>
    </div>
  );
};

const Neighbors: React.FC<{ cs: Case }> = ({ cs }) => {
  const i = CASE_STUDIES.findIndex((c) => c.slug === cs.slug);
  const prev = CASE_STUDIES[(i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
  return (
    <nav aria-label="More case studies" className="grid gap-3 sm:grid-cols-2">
      <Link to={`/case-studies/${prev.slug}/`} className="panel flex items-center gap-4 p-5 hover:border-ink-3">
        <ArrowLeft size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
        <span className="min-w-0"><span className="label block">Previous · {caseNumber(prev)}</span><span className="display mt-1 block text-2xl [overflow-wrap:anywhere]">{prev.client}</span></span>
      </Link>
      <Link to={`/case-studies/${next.slug}/`} className="panel flex items-center justify-end gap-4 p-5 text-right hover:border-ink-3">
        <span className="min-w-0"><span className="label block">Next · {caseNumber(next)}</span><span className="display mt-1 block text-2xl [overflow-wrap:anywhere]">{next.client}</span></span>
        <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
      </Link>
    </nav>
  );
};

export const CaseStudy: React.FC = () => {
  const { slug } = useParams();
  const cs = caseBySlug(slug);
  useReveal();
  if (!cs) return <NotFound />;

  return (
    <main>
      <WearStatus />
      <PageIntro op={caseNumber(cs)} tag="Case study"
        title={cs.client}
        sub={cs.summary}
        actions={<>
          <WearButton theme={cs.theme} client={cs.client} primary />
          {cs.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">{l.label} <ArrowUpRight size={16} aria-hidden="true" /></a>
          ))}
        </>}
        aside={<Spec cs={cs} />} />

      {/* ── 01 the brief ── */}
      <GridBand>
        <div className="grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div>
            <SectionHeader num="01" label="The brief" />
            <Display className="reveal mt-8 text-4xl md:text-5xl">What they <span className="sig">needed.</span></Display>
          </div>
          <div className="reveal space-y-4 text-lg leading-relaxed text-ink-2">
            {cs.challenge.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </GridBand>

      {/* ── 02 what we built ── */}
      <GridBand tone="raised">
        <div className="py-14 md:py-20">
          <SectionHeader num="02" label="What we built" right={<span className="label">{cs.built.length} pieces</span>} />
          <Display className="reveal mt-8 max-w-3xl text-4xl md:text-5xl">The <span className="sig">checklist.</span></Display>
          <ul className="reveal mt-10 grid gap-3 md:grid-cols-2">
            {cs.built.map((b) => (
              <Check key={b.what} className="panel p-5">
                <span className="block text-lg font-semibold text-ink">{b.what}</span>
                <span className="mt-1.5 block text-ink-2">{b.detail}</span>
              </Check>
            ))}
          </ul>
          <p className="reveal mt-6 max-w-3xl text-ink-3"><span className="label !text-ink-2">How it's made</span> <span className="mx-1 text-line" aria-hidden="true">/</span> {HOW_MADE}</p>
        </div>
      </GridBand>

      {/* ── 03 how it looks ── */}
      <GridBand>
        <div className="py-14 md:py-20">
          <SectionHeader num="03" label="How it looks" />
          <BrandLook cs={cs} />
        </div>
      </GridBand>

      {/* ── 04 the result ── */}
      <GridBand tone="raised">
        <div className="grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div>
            <SectionHeader num="04" label="The result" />
            <Display className="reveal mt-8 text-4xl md:text-5xl">What they <span className="sig">have now.</span></Display>
            <StatusChip status={cs.status} className="mt-6" />
          </div>
          <div className="reveal">
            <div className="space-y-4 text-lg leading-relaxed text-ink-2">
              {cs.outcome.map((p) => <p key={p}>{p}</p>)}
            </div>
            {cs.links.length > 0 && (
              <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {cs.links.map((l) => (
                  <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full sm:w-auto">{l.label} <ArrowUpRight size={16} aria-hidden="true" /></a></li>
                ))}
              </ul>
            )}
          </div>
          {cs.screens && <Proof cs={cs} />}
        </div>
      </GridBand>

      {/* ── 05 want this ── */}
      <GridBand>
        <div className="py-14 md:py-20">
          <SectionHeader num="05" label="Your turn" right={<Link to="/case-studies/" className="label hover:!text-ink">All case studies →</Link>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-10">
            <Display className="reveal text-4xl md:text-5xl">Want this for <span className="sig">your business?</span></Display>
            <p className="reveal text-lg text-ink-2">Yours starts with the audit: I map how you work now, rank what's worth building first, and hand you a 30-day plan. Book it below, or call.</p>
          </div>
          <div className="mt-10"><Neighbors cs={cs} /></div>
        </div>
      </GridBand>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};
