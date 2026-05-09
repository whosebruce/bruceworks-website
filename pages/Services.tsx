import React from 'react';
import { PageHero } from '../components/PageHero';
import { FeatureSection } from '../components/FeatureSection';
import { ContactCTA } from '../components/ContactCTA';

const pricing = [
  ['AI Audit Remote', '$197'],
  ['AI Audit In-Person', '$297'],
  ['Personal AI Command Center', 'Starting at $697'],
  ['Command Center Pro', 'Starting at $1,497'],
  ['Business AI Ops System', 'Starting at $2,497'],
  ['Local AI / Hardware Setup', 'Custom quote'],
  ['Monthly Support', 'Starting at $150/mo'],
];

export const Services: React.FC = () => {
  return (
    <main>
      <PageHero
        title="AI Command Center Services"
        subtitle="Private AI assistant systems for individuals, creators, and small businesses."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="bg-white">
        <FeatureSection
          id="ai-audit"
          title="AI Life & Business Audit"
          headline="Find the first AI workflows worth building."
          description="A practical review of your current tools, files, notes, workflows, and bottlenecks. You get a roadmap showing where AI can save time, reduce chaos, or create revenue."
          points={[
            "Discovery call or in-person walkthrough",
            "Workflow and tool review",
            "AI opportunity map",
            "Recommended first build",
            "Quote for implementation"
          ]}
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
          imageAlt="AI audit planning"
          align="left"
        />

        <FeatureSection
          id="personal-command-center"
          title="Personal AI Command Center"
          headline="Build a private assistant system around your world."
          description="A private AI assistant system built around your goals, projects, notes, documents, and workflows. Best for individuals, creators, and busy operators."
          points={[
            "Private knowledge vault",
            "Custom assistant/persona setup",
            "Goals, projects, and task structure",
            "2–3 starter workflows",
            "Training session and support window"
          ]}
          image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Personal AI command center"
          align="right"
        />

        <FeatureSection
          id="business-ai-ops"
          title="Business AI Ops System"
          headline="Create a digital operations system for your business."
          description="For small businesses where too much knowledge, follow-up, and admin work still lives in the owner's head."
          points={[
            "Business knowledge vault",
            "SOP and process documentation",
            "Client/admin workflows",
            "Proposal, email, and document templates",
            "Assistant setup for business operations"
          ]}
          image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Business AI operations system"
          align="left"
        />

        <FeatureSection
          id="local-ai-setup"
          title="Local AI & Hardware Setup"
          headline="Add privacy, backups, storage, and local control when needed."
          description="For clients who want more privacy, control, storage, backups, or a dedicated AI-ready setup on their own hardware."
          points={[
            "Mini PC or workstation setup",
            "Local-first vault/storage",
            "Backup planning",
            "Secure access",
            "Optional local model support when practical"
          ]}
          image="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Local AI hardware setup"
          align="right"
        />
      </div>

      <section id="pricing" className="py-20 bg-lightgrey scroll-mt-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p className="text-gray-600 text-lg">Most clients start with an AI Audit, then choose a buildout based on scope.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {pricing.map(([offer, price], index) => (
              <div key={offer} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-5 ${index !== pricing.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="font-semibold text-gray-900">{offer}</span>
                <span className="text-primary font-black">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center mt-6">Every build is different. The audit helps identify what is actually worth building before you spend money on a bigger system.</p>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
