import React from 'react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';
import { ValueProps } from '../components/ValueProps';
import { CheckCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Why Choose Bruce Works?"
        subtitle="Private AI Command Centers built around practical outcomes, not hype."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built on trust, privacy, and usefulness.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Bruce Works helps turn scattered digital life into organized AI-ready context. The result is a private Command Center that helps with planning, follow-up, documentation, content, decisions, and repeatable work.
            </p>
          </div>
        </div>
      </section>

      <ValueProps />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"
                alt="Command center workspace"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Bruce Works Standard</h2>
              <div className="space-y-6">
                {[
                  ['Start with the audit', 'Map the real workflows and pain points before building a bigger system.'],
                  ['Keep it private by design', 'Use the right mix of local-first storage, cloud tools, backups, and client boundaries.'],
                  ['Build what you will use', 'Templates, dashboards, and assistant instructions should fit your real life and business.'],
                  ['Improve over time', 'A Command Center gets more valuable as workflows, documents, and support mature.'],
                ].map(([title, body]) => (
                  <div key={title} className="flex gap-4">
                    <CheckCircle className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-lg">{title}</h3>
                      <p className="text-gray-600">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
