import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import { Display, GridBand, OpTag, PhotoPanel, SectionHeader, useReveal } from '../components/brand';
import { Accordion, type QA } from '../components/offers/Accordion';
import { PresenceCards, WebsiteCards } from '../components/offers/WebsiteCards';
import { caseBySlug, type CaseStudy } from '../content/case-studies';
import { FREE_PREVIEW_CALL, FREE_REPORT_CALL, WEBSITES } from '../content/pricing';

// /websites/: the page just for the local website offer (winner research, 2026-11-01: the offer only lived on /pricing/,
// and the edge is seeing the homepage before paying, not the price). One job: a local owner sees the two prices and takes
// the one free step that fits them. So no audit or Command Center here, and no three-doors band at the bottom. Every price
// and term comes from content/pricing.ts. Never say "custom" for the $500 site, and no comparison prices.

const PROOF = ['kitsap-mobile-brakes', 'island-delicacy'].map((slug) => caseBySlug(slug)!);

const STEPS = [
  ['Book the free call', 'Put your business name and trade in the notes.'],
  ['I build your homepage', 'With your business on it. I send you the link.'],
  ['You look it over', 'Up to 3 rounds of changes to the words, photos and colors.'],
  ['You pay when you’re happy', 'Nothing goes live until then. Live within a week of getting your photos and info.'],
];

// The hosting and web address lines are the one-page website's terms, word for word. The "AI" answer is the one Bruce
// approved for the Call desk (docs/LOCAL-OFFER.md).
const QUESTIONS: QA[] = [
  { q: 'What if I don’t like the preview?', a: 'Then you don’t pay anything. The preview is free, and nothing goes live until you’re happy with it.' },
  { q: `What else do I pay for on the ${WEBSITES.quick.price} site?`, a: `Hosting is included. ${WEBSITES.address}` },
  { q: 'I can just make one with AI.', a: `You could. Honestly, AI is how I make them too. That’s how it’s only ${WEBSITES.quick.price}. The hard part isn’t the page. It’s getting it live on your own web address, hooked up to your phone and your Google reviews, and fixed when something breaks.` },
  { q: `Can I get more pages for ${WEBSITES.quick.price}?`, a: 'That one stays one page, with everything a small site has. Separate pages are the custom website: a page for each service, so Google can show you for each one.' },
  { q: 'Do I have to be in San Diego?', a: 'No. I’m based in San Diego, and the call is on Zoom, so it works wherever your business is.' },
];

/** The one next step, for each kind of owner. Side by side with short labels on a phone, so both stay on the first screen. */
const NextStep: React.FC = () => (
  <div className="grid gap-x-3 gap-y-3 min-[360px]:grid-cols-2">
    {[
      { q: 'No website yet?', to: FREE_PREVIEW_CALL, short: 'Free preview', long: 'Get my free preview', btn: 'btn-primary' },
      { q: 'Already have one?', to: FREE_REPORT_CALL, short: 'Free report', long: 'Get my free report', btn: 'btn-outline' },
    ].map((x) => (
      <div key={x.to}>
        <p className="mb-1.5 font-semibold leading-tight text-ink">{x.q}</p>
        <Link to={x.to} className={`btn ${x.btn} w-full !px-2 sm:!px-6`}>
          <span className="sm:hidden">{x.short}</span><span className="hidden sm:inline">{x.long}</span> <ArrowRight size={18} className="hidden sm:block" />
        </Link>
      </div>
    ))}
  </div>
);

/** One live client site: the phone screenshot (labelled as proof, per content/case-studies.ts; under the picture, since an
 * overlay would cover most of one this small), what it is, where to check it. */
const ProofCard: React.FC<{ cs: CaseStudy }> = ({ cs }) => {
  const phone = cs.screens!.phone!;
  const live = cs.links[0];
  return (
    <article className="panel grid grid-cols-[38%_1fr] gap-4 p-4 md:gap-6 md:p-6">
      <div className="self-start">
        <PhotoPanel tilt={0}>
          <img src={phone.src} alt={phone.alt} width={phone.w} height={phone.h} loading="lazy" decoding="async" className="block h-auto w-full" />
        </PhotoPanel>
        <p className="mt-1.5 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-3 md:text-[10px]">[ Screen proof ]</p>
      </div>
      <div className="flex min-w-0 flex-col">
        <h3 className="display text-2xl [overflow-wrap:anywhere] md:text-3xl">{cs.client}</h3>
        <p className="label mt-1">{cs.kind}</p>
        <p className="mt-3 text-[15px] leading-snug text-ink-2">{cs.summary}</p>
        <div className="mt-auto flex flex-col pt-2">
          <a href={live.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:underline"
            aria-label={`Visit ${live.label} (opens in a new tab)`}>Visit site <ArrowUpRight size={14} aria-hidden="true" /></a>
          <Link to={`/case-studies/${cs.slug}/`} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink hover:underline"
            aria-label={`${cs.client} case study`}>Case study <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
};

export const Websites: React.FC = () => {
  useReveal();

  return (
    <main>
      {/* ── the first screen: who it's for, see it first, the two prices, the one next step ── */}
      <GridBand className="texture border-t-0" marks={false}>
        <div className="grid gap-4 pb-8 pt-5 md:gap-6 md:pb-20 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-x-12">
          <div>
            <OpTag>Websites for local businesses</OpTag>
            <Display as="h1" className="mt-3 text-[clamp(2.25rem,6.5vw,5.5rem)] md:mt-6">Run a local business? <span className="sig">See your homepage before you pay.</span></Display>
            <p className="mt-3 max-w-2xl leading-snug text-ink-2 md:mt-6 md:text-xl md:leading-relaxed">I’m Bruce, based in San Diego. {WEBSITES.preview.note}</p>
          </div>
          <ul className="panel divide-y divide-line lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            {[WEBSITES.quick, WEBSITES.full].map((w, i) => (
              <li key={w.name} className="px-4 py-2.5 md:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold leading-tight text-ink md:text-xl">{w.name}</p>
                  <p className="display whitespace-nowrap text-3xl tabular-nums md:text-5xl"><span className={i === 0 ? 'sig' : ''}>{w.price}</span></p>
                </div>
                <p className="mt-0.5 text-sm leading-snug text-ink-2 md:mt-2 md:text-base">{w.terms}</p>
              </li>
            ))}
          </ul>
          <NextStep />
        </div>
      </GridBand>

      {/* ── 01 how it goes ── */}
      <GridBand tone="raised">
        <div className="py-12 md:py-24">
          <SectionHeader num="01" label="No website yet" />
          <Display className="reveal mt-8 text-5xl md:text-6xl">Here’s <span className="sig">how it goes.</span></Display>
          <ol className="reveal mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="panel p-5">
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <p className="display mt-3 text-3xl">{t}</p>
                <p className="mt-2 text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </GridBand>

      {/* ── 02 the prices ── */}
      <GridBand id="prices" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader num="02" label="Prices" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">What you get, <span className="sig">what it costs.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Both start with the free preview, so you’ve seen your homepage before you decide.</p>
          </div>
          <div className="reveal flex flex-col gap-4">
            <WebsiteCards />
            <Link to={FREE_PREVIEW_CALL} className="btn btn-primary self-start">Get my free preview <ArrowRight size={18} /></Link>
          </div>
        </div>
      </GridBand>

      {/* ── 03 a website already ── */}
      <GridBand id="report" tone="raised" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader num="03" label="Already have a website" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Find out what’s <span className="sig">costing you calls.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">The free report shows what stops a new customer from calling you. It’s yours to keep, whether or not you hire me.</p>
          </div>
          <div className="reveal flex flex-col gap-4">
            <PresenceCards />
            <Link to={FREE_REPORT_CALL} className="btn btn-primary self-start">Get my free report <ArrowRight size={18} /></Link>
          </div>
        </div>
      </GridBand>

      {/* ── 04 proof: real clients, live sites, and neither is the $500 site ── */}
      <GridBand>
        <div className="py-12 md:py-24">
          <SectionHeader num="04" label="Real sites" right={<Link to="/case-studies/" className="label hover:!text-ink">Case studies →</Link>} />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Two sites <span className="sig">you can go check.</span></Display>
          <p className="reveal mt-5 max-w-2xl text-lg text-ink-2">Real clients, live right now. Both were bigger jobs than the one-page website, so they’re not what {WEBSITES.quick.price} buys. The {WEBSITES.quick.price} site starts from a template made for your trade, and you’ll see yours before you pay.</p>
          <div className="reveal mt-8 grid gap-4 md:mt-10 lg:grid-cols-2">
            {PROOF.map((cs) => <ProofCard key={cs.slug} cs={cs} />)}
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">The live sites on a phone, {PROOF[0].screens!.captured}.</p>
        </div>
      </GridBand>

      {/* ── 05 questions ── */}
      <GridBand tone="raised">
        <div className="py-12 md:py-24">
          <SectionHeader num="05" label="Questions" right={<Link to="/pricing/#websites" className="label hover:!text-ink">Pricing page →</Link>} />
          <div className="mt-8 grid gap-8 md:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Display className="reveal text-5xl md:text-6xl">Straight <span className="sig">answers.</span></Display>
            <Accordion className="reveal" items={QUESTIONS} />
          </div>
        </div>
      </GridBand>

      {/* ── the close: the same next step, plus the phone ── */}
      <section className="texture border-t border-line">
        <div className="container-x py-14 md:py-20">
          <Display className="max-w-3xl text-5xl md:text-6xl">The first step <span className="sig">is free.</span></Display>
          <div className="mt-8 max-w-2xl"><NextStep /></div>
          <a href="tel:+18668296757" className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink hover:underline"><Phone size={16} aria-hidden="true" /> Rather call? (866) 829-6757</a>
        </div>
      </section>
    </main>
  );
};
