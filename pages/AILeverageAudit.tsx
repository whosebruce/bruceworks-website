import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Cpu, FileText, Phone, Wrench } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, Loop, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { PhoneAndSmsConsent } from '../components/PhoneAndSmsConsent';
import { Swipe } from '../components/Swipe';
import { Accordion } from '../components/offers/Accordion';
import { SlotArt } from '../components/offers/Art';
import { useHashScroll } from '../components/offers/useHashScroll';
import { auditPrices } from '../components/offers/tiers';
import { faqGroup } from '../content/faq';
import { LOOPS } from '../content/media';

// /ai-leverage-audit/: the paid diagnosis that starts every engagement. The form posts to FormSubmit with the same
// action, hidden fields and field names as before, and its phone field goes through PhoneAndSmsConsent (the SMS
// compliance check requires this page to use it).

export const AILeverageAudit: React.FC = () => {
  useReveal();
  useHashScroll();
  const audit = auditPrices();
  const close = LOOPS.ctaClose;

  return (
    <main>
      <PageIntro
        op="OP-00" tag="AI Leverage Audit"
        title={<>Tried AI and got nothing? <span className="sig">Start with recon.</span></>}
        sub={<p>The AI Leverage Audit maps how you really work, names where time and information leak, and hands you a ranked 30-day plan. No hype and no sales pitch in disguise: a written map and a straight call on what to build first.</p>}
        actions={<>
          <Link to="/book/" className="btn btn-primary">Pick a time <ArrowRight size={18} /></Link>
          <a href="#contact-form" className="btn btn-outline">Or send a request</a>
        </>}
        aside={<SlotArt slot="bruceWhiteboard" label="Recon" placeholder="Recon" tilt={2} className="reveal mx-auto aspect-[4/3] w-full max-w-xl" />}
      />

      {/* ── the audit in four numbers ── */}
      <section className="border-y border-line bg-ground-2">
        <dl className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {[
            ['Remote', audit.remote, 'From anywhere'],
            ['In person', audit.inPerson, 'In San Diego'],
            ['Delivered', '7 days', 'Business days after complete intake (target)'],
            ['Credit', '30 days', 'The fee comes off a build booked within 30 days'],
          ].map(([k, v, d]) => (
            <div key={k} className="px-4 py-5 md:px-6">
              <dt className="label">{k}</dt>
              <dd className="display mt-1 text-3xl md:text-4xl">{k === 'Remote' ? <span className="sig">{v}</span> : v}</dd>
              <dd className="mt-1 text-sm text-ink-2">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── 01 the problem ── */}
      <GridBand>
        <div className="py-12 md:py-24">
          <SectionHeader num="01" label="The problem" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Most people use AI <span className="sig">backwards.</span></Display>
            <p className="reveal text-lg text-ink-2">They open a chatbot, ask a generic question, get a generic answer and decide AI is overhyped. The value shows up when AI has context: your files, your customers, your tools, your repeat jobs and the way you actually work.</p>
          </div>
          <Swipe label="The problem" desktop="md:grid md:grid-cols-3 md:gap-4" className="mt-10">
            {[
              ['Generic prompts', 'A chatbot doesn’t know your business, your customers, your process or your standards. So it guesses.'],
              ['Too many subscriptions', 'Buying another app isn’t the same as building a system. Each one adds a login, a bill and another copy of your files.'],
              ['No first move', 'Without one clear workflow to start with, AI turns into another thing to manage instead of leverage.'],
            ].map(([t, d], i) => (
              <div key={t} className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="display mt-3 text-3xl">{t}</h3>
                <p className="mt-3 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 what I look at ── */}
      <GridBand id="what-we-look-for" tone="raised" className="scroll-mt-24">
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeader num="02" label="What I look at" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">You may already own <span className="sig">more than you think.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">I’m not here to sell you another subscription first. The audit starts with what you already have: your documents, your devices, the apps you pay for, your workflows and the know-how in your head. Then we figure out what’s worth using.</p>
          </div>
          <Swipe label="What I look at" desktop="md:grid md:grid-cols-2 md:gap-4">
            {[
              [FileText, 'Files, notes and knowledge', 'Scattered documents, SOPs, customer questions, project notes and ideas, turned into something an agent can search, summarize and act on.'],
              [Wrench, 'Workflows and repeat work', 'The admin, writing, planning, estimating, follow-up and support jobs where AI can be real help instead of a distraction.'],
              [Boxes, 'The apps you pay for', 'Which subscriptions earn their keep, which overlap, and which ones one dashboard could replace.'],
              [Cpu, 'Devices you already own', 'A spare laptop, an older workstation, a mini PC or a NAS may be worth more as backups, local tools or the machine your system runs on.'],
            ].map(([Icon, t, d]: any) => (
              <div key={t} className="panel h-full p-6">
                <Icon size={22} className="text-signal-text" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 03 what you get ── */}
      <GridBand>
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader num="03" label="What you leave with" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">A written map, <span className="sig">not a sales pitch.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">It’s specific to your business and how it really runs. It isn’t a disguised commitment to buy a bigger build: one of the calls it can make is “do nothing yet.”</p>
            <ul className="reveal mt-6 space-y-3 text-ink">
              <Check>Your current workflow mapped, showing where time and information get lost</Check>
              <Check>The top three practical opportunities, ranked by time saved</Check>
              <Check>What data stays private, and where it lives</Check>
              <Check>The tools and hardware you already own that can be reused</Check>
              <Check>A recommended setup that you own</Check>
              <Check>A 30-day action plan with a clear call: build, optimize or do nothing</Check>
            </ul>
          </div>
          <Chamfer className="reveal hidden md:block" innerClassName="p-0">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-3 px-5 py-3">
              <span className="label !text-ink">AI Leverage Map</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Example layout</span>
            </div>
            <ul className="divide-y divide-line-2">
              {[
                ['Quick win', 'A first workflow you can start using this week'],
                ['Keep or cancel', 'Which apps earn their keep, and which to drop'],
                ['Devices', 'Hidden value in the hardware you already own'],
                ['Data boundary', 'What stays on your machine, what may leave it'],
              ].map(([k, v]) => (
                <li key={k} className="px-5 py-4"><p className="font-semibold text-ink">{k}</p><p className="text-ink-2">{v}</p></li>
              ))}
              <li className="bg-signal/10 px-5 py-4"><p className="font-semibold text-signal-text">Next step</p><p className="text-ink">The first build that actually makes sense</p></li>
            </ul>
          </Chamfer>
        </div>
      </GridBand>

      {/* ── 04 how it runs ── */}
      <GridBand tone="raised">
        <div className="py-12 md:py-24">
          <SectionHeader num="04" label="How it runs" />
          <Display className="reveal mt-8 max-w-4xl text-5xl md:text-6xl">Five steps. <span className="sig">One plan.</span></Display>
          <Swipe label="How the audit runs" desktop="md:grid md:grid-cols-3 md:gap-4 xl:grid-cols-5" className="mt-10">
            {[
              ['01', 'Request', 'Fill in the form below. Describe the problem; no sensitive data needed.'],
              ['02', 'Intake', 'We confirm the workflow, the tools, the people and the material I should review.'],
              ['03', 'Review', `I go through it with you: remote for ${audit.remote}, or in person in San Diego for ${audit.inPerson}.`],
              ['04', 'Roadmap', 'Your written plan, targeted within 7 business days of complete intake.'],
              ['05', 'Decide', 'Build, optimize or do nothing. Book a build within 30 days and the fee is credited.'],
            ].map(([n, t, d]) => (
              <div key={n} className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                <p className="display mt-4 text-3xl">{t}</p>
                <p className="mt-3 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 05 questions ── */}
      <GridBand>
        <div className="grid gap-8 py-12 md:gap-10 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader num="05" label="Questions" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">Before <span className="sig">you book.</span></Display>
          </div>
          <Accordion className="reveal" items={faqGroup('audit').items.filter((x) => !x.link || x.link.href !== '/ai-leverage-audit/')} />
        </div>
      </GridBand>

      {/* ── the form ── */}
      <section id="contact-form" className="texture scroll-mt-24 border-t border-line">
        <div className="container-x grid gap-10 py-12 md:py-24 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeader num="06" label="Book the audit" />
            <Display className="mt-8 text-5xl md:text-6xl">Tell me what <span className="sig">you’re trying to fix.</span></Display>
            <p className="mt-6 max-w-xl text-lg text-ink-2">Share what feels scattered, repetitive, expensive or underused. I’ll use it to start mapping where AI could help and what you may already have on hand.</p>
            <ul className="mt-8 space-y-3 text-ink">
              <Check>Owner-led service businesses with scattered knowledge or repeat admin are the main fit. Creators, students and families are welcome too.</Check>
              <Check>No passwords, private client data or sensitive records needed in this form.</Check>
              <Check>The first goal is clarity: what’s worth doing, what isn’t, and what to build first.</Check>
            </ul>
            <p className="mt-8 hidden font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink md:block">Remote {audit.remote} <span className="text-ink-3">·</span> San Diego in person {audit.inPerson}</p>
            <a href="tel:+18668296757" className="mt-6 inline-flex md:mt-4 min-h-[44px] items-center gap-2 text-ink-2 hover:text-ink"><Phone size={16} className="text-signal-text" /> Rather talk first? <span className="font-semibold text-ink underline underline-offset-4">(866) 829-6757</span></a>
            {close && <Chamfer className="mt-10 hidden lg:block" innerClassName="overflow-hidden"><Loop src={close.mp4} webm={close.webm} poster={close.poster} label={close.label} className="block aspect-video w-full object-cover" /></Chamfer>}
          </div>

          <form className="panel space-y-5 p-6 md:p-8" action="https://formsubmit.co/info@bruceworks.net" method="POST">
            <input type="hidden" name="_subject" value="New AI Leverage Audit request from bruceworks.net" />
            <input type="hidden" name="_captcha" value="false" />
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
              <input id="name" name="name" type="text" required className="field" placeholder="Your name" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
              <input id="email" name="email" type="email" required className="field" placeholder="you@example.com" autoComplete="email" />
            </div>
            <PhoneAndSmsConsent idPrefix="leverage-audit" />
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">What are you trying to improve?</label>
              <textarea id="message" name="message" required rows={5} className="field"
                placeholder="The process, the files, the tools, the repeat work, the AI tools you’ve tried, or anything that feels underused or hard to hand off." />
            </div>
            <button type="submit" className="btn btn-primary w-full">Request the audit</button>
            <p className="text-center text-xs text-ink-3">Please don’t send passwords, account numbers, medical records or other sensitive client data through this form.</p>
          </form>
        </div>
      </section>
    </main>
  );
};
