import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, Landmark, Workflow } from 'lucide-react';
import { Hero } from '../components/Hero';
import { QuoteSection } from '../components/QuoteSection';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';
import { GovernmentTrustStrip } from '../components/GovernmentTrustStrip';

const offers = [
  {
    number: '01',
    title: 'AI Leverage Audit',
    body: 'Map the current workflow, find where time and information are being lost, define data boundaries, and leave with a 30-day action plan.',
    note: 'Remote pilot $197 · San Diego in-person pilot $297 · 7-business-day target after complete intake',
  },
  {
    number: '02',
    title: 'Private AI Command Center Foundation',
    body: 'Organize the business knowledge base, assistant instructions, reusable process library, and two starter workflows inside client-owned tools.',
    note: 'Training, data-boundary documentation, and handoff included · Typical target up to 30 days after scope and access are complete',
  },
  {
    number: '03',
    title: 'Single Workflow Buildout',
    body: 'Improve one bounded process—lead follow-up, document intake, estimating, content, task tracking, handoff, or knowledge retrieval.',
    note: 'Defined inputs, outputs, acceptance criteria, documentation, training, and handoff',
  },
];

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <GovernmentTrustStrip />

      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-secondary">The Bruce Works model</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.05]">
            We do not sell bots. We organize how the business works.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bruce Works helps owner-led service businesses move important information and repetitive work out of the owner’s head and into a practical, AI-ready operating system. Agents, automation, local models, and hardware may support the solution—but they are not the promise.
          </p>
        </div>
      </section>

      <section id="who-this-is-for" className="py-20 bg-lightgrey">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-primary font-condensed font-semibold tracking-[0.12em] uppercase text-base mb-3">Primary commercial lane</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-[1.05]">
              Built for owner-led service businesses that have outgrown memory and scattered tools.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The strongest fit is usually a 1–20 person business with no internal automation team, recurring administrative work, and critical knowledge spread across texts, notes, inboxes, files, and the owner’s head.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['Knowledge is scattered', 'Customer details, job notes, pricing logic, templates, and decisions are difficult to find or depend on one person.'],
              ['Work repeats manually', 'Follow-ups, document intake, estimates, proposals, content, status updates, or handoffs consume the same time every week.'],
              ['Tools already exist', 'The business already pays for Google Workspace, Microsoft 365, ChatGPT, Notion, or similar tools but lacks one usable operating method.'],
            ].map(([title, body]) => (
              <article key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <CheckCircle2 className="mb-5 h-7 w-7 text-secondary" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-build" className="bg-secondary py-20 text-white scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-cyan-200">What gets built</p>
              <h2 className="font-display mt-3 text-4xl font-bold leading-[1.05] lg:text-6xl">A system the client can own, understand, and use.</h2>
              <p className="mt-6 text-lg leading-relaxed text-blue-100">The architecture follows the problem. That might mean better folders and templates, a searchable knowledge base, an assistant instruction set, one automated handoff, or a private local option. The client does not need to buy or understand an “autonomous agent workforce.”</p>
              <Link to="/services/" className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:underline">View services, deliverables, and pricing <ArrowRight className="h-5 w-5" /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                [Building2, 'Organized business knowledge', 'A clear place for operating knowledge, files, templates, decisions, and SOPs.'],
                [Workflow, 'Repeatable workflows', 'Defined steps, review points, ownership, and acceptance criteria for work that repeats.'],
                [CheckCircle2, 'Practical AI assistance', 'Instructions and context that help the tools the client already owns produce useful drafts and next actions.'],
                [Landmark, 'Separate government lane', 'Document and data operations, workflow modernization, project controls, SOPs, and defined teaming workshare.'],
              ].map(([Icon, title, body]) => {
                const CardIcon = Icon as React.ElementType;
                return (
                  <article key={title as string} className="rounded-2xl border border-white/15 bg-white/[0.07] p-7">
                    <CardIcon className="mb-4 h-7 w-7 text-primary" />
                    <h3 className="text-xl font-bold">{title as string}</h3>
                    <p className="mt-2 leading-relaxed text-blue-100">{body as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="services-preview" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-secondary">Commercial offer ladder</p>
            <h2 className="font-display mt-3 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">Diagnosis first. Then one useful build at a time.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <article key={offer.number} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <span className="font-display text-4xl font-extrabold text-primary">{offer.number}</span>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">{offer.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-gray-600">{offer.body}</p>
                <p className="mt-6 border-t border-gray-100 pt-5 text-sm font-semibold leading-relaxed text-secondary">{offer.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-lightgrey">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-[1.05]">How It Works</h2>
            <p className="text-gray-600 text-lg">Start with a focused audit, then build only what the business can own and use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              ['Audit', 'Review the workflow, tools, files, pain points, goals, and data boundaries.'],
              ['Map', 'Choose the highest-value opportunity and define what success means.'],
              ['Build', 'Create the knowledge structure, instructions, templates, or bounded workflow.'],
              ['Train', 'Teach the owner or team how to use, review, and maintain the system.'],
              ['Hand Off', 'Deliver documentation, acceptance evidence, ownership, and next options.']
            ].map(([title, body], index) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-display font-bold text-xl text-gray-900 mb-4">{index + 1}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
      <FAQ />
      <ContactCTA />
    </main>
  );
};
