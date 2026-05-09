import React from 'react';
import { Award, CheckCircle, HeartHandshake, ShieldCheck, Target, Workflow } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const strengths = [
  {
    icon: ShieldCheck,
    title: 'Privacy-aware technical setup',
    text: 'Bruce thinks about where your information lives, what should stay private, and how to build useful systems without exposing sensitive data unnecessarily.',
  },
  {
    icon: Workflow,
    title: 'Hands-on systems builder',
    text: 'The work is practical: organize the vault, define the assistant, document workflows, build templates, and teach you how to use the system.',
  },
  {
    icon: HeartHandshake,
    title: 'Human-first communication',
    text: 'Bruce Works is built around clear explanations, honest expectations, and systems that regular people can actually use.',
  },
];

const highlights = [
  'CEO and operator of Bruce Works LLC since 2022',
  '3+ years of IT, network support, troubleshooting, and technical problem solving',
  '4+ years of logistics, supply, inventory, and operations experience',
  'Military background in accountability, documentation, and operational readiness',
  'Focused on private AI Command Centers for individuals, creators, and small businesses',
];

export const AboutBruce: React.FC = () => {
  return (
    <main>
      <PageHero
        title="About Bruce"
        subtitle="A practical systems builder helping people turn scattered digital knowledge into private AI assistant systems."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">Bruce Works LLC</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                Practical AI systems, not hype.
              </h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Bruce Works helps individuals, creators, and small businesses build private AI Command Centers: systems that organize notes, files, goals, workflows, and business knowledge so AI can help with real work.
                </p>
                <p>
                  Bruce’s background combines IT support, logistics, military operations, facilities coordination, and hands-on problem solving. That mix makes the work grounded: map the mess, organize the information, build the workflow, and make it usable.
                </p>
                <p>
                  The goal is not to sell AI magic. The goal is to build a useful second brain and digital operations system that helps you think, plan, follow up, create, and execute faster.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-primary" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Background at a Glance</h3>
              </div>
              <ul className="space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{item}</span>
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
            <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">What you can expect</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">A real system you can use.</h2>
            <p className="text-lg text-gray-600">
              Bruce Works turns scattered information into organized context, then wraps it with AI workflows that fit how you actually live and work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <Icon className="text-primary mb-5" size={36} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="text-primary mx-auto mb-6" size={44} />
            <h2 className="text-3xl lg:text-4xl font-black mb-6">The Bruce Works mindset</h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Build only what is useful, keep it understandable, protect the client’s trust, and improve the system as real needs appear.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
