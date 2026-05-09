import React from 'react';
import { CheckCircle, Clock, MessagesSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const reasons = [
  {
    icon: MessagesSquare,
    title: 'Plain-English communication',
    text: 'You get practical explanations, realistic expectations, and a system you can understand instead of jargon and AI hype.',
  },
  {
    icon: Clock,
    title: 'Reliable follow-through',
    text: 'Bruce’s logistics and military background built habits around accountability, documentation, scheduling, and finishing what gets started.',
  },
  {
    icon: Workflow,
    title: 'Useful workflows first',
    text: 'The goal is not to overbuild. The goal is to find the first workflows that save time, reduce chaos, or create momentum.',
  },
  {
    icon: ShieldCheck,
    title: 'Respect for privacy',
    text: 'Your personal and business information deserves careful handling, clear boundaries, and the right mix of local-first and cloud tools.',
  },
];

const proofPoints = [
  'IT and network support background across real operating environments',
  'Logistics and supply background supporting high-value equipment and documentation',
  'Hands-on systems mindset from business, facilities, and technical work',
  'Experience turning messy information into organized processes and workflows',
  'Focused on private AI Command Centers for individuals, creators, and small businesses',
];

export const WhyHireBruce: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Why Bruce Works?"
        subtitle="Because useful AI is not just prompts — it is context, workflow, organization, and follow-through."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">Trust matters</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">AI systems need a strategist’s mindset.</h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Most AI setups fail because they are disconnected from the user’s real life. They do not know the files, projects, goals, decisions, or repeated tasks that actually matter.
                </p>
                <p>
                  Bruce Works starts by understanding the mess, then builds a Command Center around your actual needs: memory, workflows, assistant instructions, templates, and practical support.
                </p>
                <p>
                  The result is a system that feels personal, organized, and useful — not just another app you forget to open.
                </p>
              </div>
            </div>

            <div className="bg-secondary text-white rounded-2xl p-8 shadow-xl">
              <Sparkles className="text-primary mb-5" size={42} />
              <h3 className="text-2xl font-bold mb-5">What Bruce Works brings to each build</h3>
              <ul className="space-y-4">
                {proofPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-gray-200">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">The difference</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Private, practical, and built around you.</h2>
            <p className="text-lg text-gray-600">
              A Command Center should make your existing life and business easier — not force you into a complicated new system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-xl p-7 shadow-md border border-gray-100">
                <Icon className="text-primary mb-5" size={36} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
