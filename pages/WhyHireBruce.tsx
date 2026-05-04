import React from 'react';
import { CheckCircle, Clock, MessagesSquare, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const reasons = [
  {
    icon: MessagesSquare,
    title: 'Clear communication',
    text: 'You get straightforward updates, realistic expectations, and someone who explains the plan before jumping into the work.',
  },
  {
    icon: Clock,
    title: 'Reliable follow-through',
    text: 'Bruce’s logistics and military background built a habit of accountability, scheduling, documentation, and finishing what gets started.',
  },
  {
    icon: Wrench,
    title: 'Practical fixes',
    text: 'Bruce looks for solutions that make sense for the space, the budget, and the long-term use of the home or business.',
  },
  {
    icon: ShieldCheck,
    title: 'Respect for your space',
    text: 'The goal is to protect your time, your property, and your trust by working cleanly, carefully, and professionally.',
  },
];

const proofPoints = [
  'Hands-on handyman service through Bruce Works LLC since 2022',
  'Experience with carpentry, painting, repairs, assembly, minor electrical tasks, and IT support',
  'Logistics and supply background supporting high-value equipment and operational readiness',
  'IT background with networks, computers, troubleshooting, SharePoint, Windows, MacOS, and Microsoft Office',
  'Leadership experience training teams, coordinating operations, and solving problems under pressure',
];

export const WhyHireBruce: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Why Hire Bruce?"
        subtitle="Because your project deserves someone who can think, communicate, problem-solve, and finish the job with care."
        image="https://picsum.photos/1920/800?random=72"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">Trust matters</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">A handyman with a strategist’s mindset.</h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Hiring someone to work on your home is personal. Bruce Works is built around making that decision easier: show up professionally, communicate clearly, solve the problem, and respect the space.
                </p>
                <p>
                  Bruce’s experience in logistics, IT, military operations, facilities support, and client-facing handyman work gives him a strong foundation for diagnosing issues, planning the work, and completing projects with accountability.
                </p>
                <p>
                  The result is a service experience that feels organized, practical, and personal — not rushed, sloppy, or confusing.
                </p>
              </div>
            </div>

            <div className="bg-secondary text-white rounded-2xl p-8 shadow-xl">
              <Sparkles className="text-primary mb-5" size={42} />
              <h3 className="text-2xl font-bold mb-5">What Bruce Works brings to each job</h3>
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
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Small-job care. Big-picture thinking.</h2>
            <p className="text-lg text-gray-600">
              Whether it is a quick repair or a growing punch list, Bruce Works treats the project like it matters — because it does.
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
