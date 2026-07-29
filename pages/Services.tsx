import React from 'react';
import { CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { FeatureSection } from '../components/FeatureSection';
import { ContactCTA } from '../components/ContactCTA';

const pricing = [
  ['AI Leverage Audit · Remote pilot', '$197'],
  ['AI Leverage Audit · San Diego in-person pilot', '$297'],
  ['Private AI Command Center Foundation', 'Scoped quote'],
  ['Single Workflow Buildout', 'Scoped quote'],
  ['Local AI / Hardware Add-on', 'Scoped quote'],
  ['Training, optimization, or support', 'Scoped quote'],
];

export const Services: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Practical AI Systems for Owner-Led Businesses"
        subtitle="Start with a paid diagnosis. Build one useful system or workflow at a time inside tools your business controls."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="border-b border-gray-200 bg-white py-10">
        <div className="container mx-auto grid gap-5 px-6 md:grid-cols-3">
          <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-secondary" /><p className="text-gray-700"><strong className="text-gray-900">Client-owned by default.</strong> Accounts, files, subscriptions, credentials, and hardware stay under client control wherever practical.</p></div>
          <div className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" /><p className="text-gray-700"><strong className="text-gray-900">Defined deliverables.</strong> Every engagement has a bounded scope, acceptance criteria, training, and handoff.</p></div>
          <div className="flex items-start gap-3"><Clock3 className="mt-1 h-5 w-5 shrink-0 text-secondary" /><p className="text-gray-700"><strong className="text-gray-900">No bot babysitting contract.</strong> Support means maintenance, coaching, and optimization—not permanent hosting of an autonomous workforce.</p></div>
        </div>
      </section>

      <div className="bg-white">
        <FeatureSection
          id="ai-audit"
          title="Offer 01 — AI Leverage Audit"
          headline="Find where time and information are being lost before buying another tool."
          description="A paid diagnosis for owner-led service businesses. Pilot audits target delivery within 7 business days after the required intake and source material are complete."
          points={[
            'Current-workflow map and bottleneck review',
            'Top three practical AI opportunities',
            'Data and privacy boundary assessment',
            'Tools you already own and can reuse',
            'Recommended client-owned architecture',
            '30-day action plan and a clear build / optimize / do-nothing recommendation'
          ]}
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Business workflow audit planning"
          align="left"
        />

        <FeatureSection
          id="command-center-foundation"
          title="Offer 02 — Private AI Command Center Foundation"
          headline="Create the organized operating foundation your business can actually use."
          description="A concrete setup in client-owned tools—not a mysterious platform and not a Bruce Works-hosted agent. A typical foundation targets completion within 30 days after scope, access, and source material are complete; final timing is confirmed in writing."
          points={[
            'Organized business knowledge base and folder structure',
            'AI assistant instructions grounded in your business',
            'Reusable prompt and process library',
            'Two starter workflows',
            'Data-boundary documentation',
            'Client training and a complete handoff guide'
          ]}
          image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Organized client-owned business command center"
          align="right"
        />

        <FeatureSection
          id="workflow-buildout"
          title="Offer 03 — Single Workflow Buildout"
          headline="Improve one defined business process at a time."
          description="Choose a bounded workflow with an owner, inputs, outputs, review point, and acceptance criteria. Build it, document it, train the team, and hand it over."
          points={[
            'Lead intake and follow-up',
            'Document intake, OCR, indexing, and organization',
            'Estimate or proposal preparation',
            'Content production and approval',
            'Project, task, or customer handoff tracking',
            'Internal knowledge retrieval'
          ]}
          image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Defined service-business workflow"
          align="left"
        />

        <FeatureSection
          id="local-ai-setup"
          title="Optional Add-on — Local AI & Hardware"
          headline="Add privacy, storage, backups, or local control only when the use case earns it."
          description="Local hardware is an implementation option—not the product. Bruce Works can assess spare or dedicated equipment and document what should remain local, cloud-based, or offline."
          points={[
            'Existing hardware fit assessment',
            'Local-first storage and backup planning',
            'Secure remote-access design',
            'Dedicated workstation or mini-PC setup',
            'Local model support when practical',
            'Documented ownership and support boundaries'
          ]}
          image="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Local AI hardware setup"
          align="right"
        />
      </div>

      <section id="pricing" className="py-20 bg-lightgrey scroll-mt-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-secondary">Commercial pilot pricing</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-[1.05]">Start small. Scope the larger work honestly.</h2>
            <p className="text-gray-600 text-lg">The audit prices below are launch-pilot prices for small commercial engagements. Buildouts, government requirements, prime-contractor workshare, travel, security requirements, volume, and formal deliverables are priced from their actual scope.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {pricing.map(([offer, price], index) => (
              <div key={offer} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-5 ${index !== pricing.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="font-semibold text-gray-900">{offer}</span>
                <span className="text-secondary font-black">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center mt-6">A low-cost commercial pilot does not set the price of an unrelated government or enterprise scope. Those buyers are purchasing the stated labor, risk, volume, controls, reporting, travel, schedule, and acceptance requirements—not the name of the service.</p>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
