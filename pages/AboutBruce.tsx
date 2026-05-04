import React from 'react';
import { Award, CheckCircle, HeartHandshake, ShieldCheck, Target, Wrench } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const strengths = [
  {
    icon: ShieldCheck,
    title: 'Military-tested reliability',
    text: 'Bruce brings the discipline, accountability, and attention to detail built through years of military logistics, IT, and facilities work.',
  },
  {
    icon: Wrench,
    title: 'Hands-on problem solver',
    text: 'From repairs and painting to assembly, minor electrical, carpentry, IT support, and general punch-list work, Bruce focuses on practical solutions that get the job done right.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-first communication',
    text: 'Bruce Works is built on clear communication, honest expectations, and treating every home or business with respect.',
  },
];

const highlights = [
  'CEO and operator of Bruce Works LLC since 2022',
  '4+ years of logistics, supply, inventory, and operations experience',
  '3+ years of IT, network support, troubleshooting, and technical problem solving',
  'Experience coordinating high-value equipment, facilities needs, and time-sensitive requests',
  'Known for a “no problem too big or small” mindset',
];

export const AboutBruce: React.FC = () => {
  return (
    <main>
      <PageHero
        title="About Bruce"
        subtitle="A San Diego handyman and problem solver with military discipline, technical skill, and a customer-first mindset."
        image="https://picsum.photos/1920/800?random=70"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">Bruce Works LLC</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                Built by someone who cares about the details.
              </h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Bruce Works was created by Jonathan A. Bruce to bring reliable, professional handyman help to homeowners, renters, and small businesses that need the job handled without the runaround.
                </p>
                <p>
                  Bruce’s background combines military logistics, facilities coordination, IT support, inventory management, and hands-on repair work. That mix gives him a practical eye for planning, safety, organization, and clean execution.
                </p>
                <p>
                  Whether the project is a small fix, a punch list, a home improvement task, or a technical setup issue, Bruce approaches the work with the same mindset: understand the problem, communicate clearly, and leave the space better than he found it.
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
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Professional service without the corporate feel.</h2>
            <p className="text-lg text-gray-600">
              Bruce Works is local, personal, and built around trust. You get someone who can think through the job, explain the plan, and follow through.
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
              No problem too big or small. Bruce Works is about showing up, solving problems, protecting the customer’s time, and building a reputation one finished project at a time.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
