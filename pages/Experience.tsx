import React from 'react';
import { Briefcase, CheckCircle, ClipboardList, Computer, Hammer, Shield } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const experienceAreas = [
  {
    icon: Hammer,
    title: 'Handyman & repair work',
    text: 'Carpentry, painting, general repairs, minor electrical tasks, IT support, assembly, and practical fixes for homes and small businesses.',
  },
  {
    icon: ClipboardList,
    title: 'Logistics & operations',
    text: 'Supply tracking, inventory management, record keeping, disposal coordination, ordering support, and high-value equipment accountability.',
  },
  {
    icon: Computer,
    title: 'IT & technical support',
    text: 'Network setup, troubleshooting, computer configuration, SharePoint, Microsoft Office, MacOS, Windows, and entry-level programming knowledge.',
  },
  {
    icon: Shield,
    title: 'Military leadership',
    text: 'Experience leading teams, coordinating training operations, managing facilities requests, and supporting mission-critical equipment and services.',
  },
];

const timeline = [
  {
    role: 'CEO / Handyman Services',
    company: 'Bruce Works LLC',
    dates: 'April 2022 – Present',
    points: [
      'Deliver handyman, repair, painting, carpentry, minor electrical, IT support, and general maintenance services.',
      'Build repeat business through reliability, professionalism, referrals, and quality craftsmanship.',
      'Develop cost-effective solutions that help clients complete projects efficiently and confidently.',
    ],
  },
  {
    role: 'Supply Technician',
    company: 'Naval Special Warfare Center Ranges West',
    dates: 'November 2019 – Present',
    points: [
      'Maintain records for assets across range sites and support disposal, ordering, and equipment accountability.',
      'Use logistics systems including DPAS and ETIDS to track property and support operational readiness.',
      'Assist range managers with supplies, equipment requests, and documentation for high-value assets.',
    ],
  },
  {
    role: 'Information Technology Specialist',
    company: 'California Army National Guard',
    dates: 'August 2019 – Present',
    points: [
      'Troubleshoot equipment, configure services, support network connectivity, and document technical layouts.',
      'Run and terminate long-distance ethernet, support computer configuration, and help keep systems operational.',
      'Work across SIPR/NIPR environments, file services, SharePoint, VOIP, and related communication tools.',
    ],
  },
  {
    role: 'Logistics Supervisor / Logistics Clerk / Facilities Manager',
    company: 'United States Marine Corps',
    dates: 'April 2016 – August 2019',
    points: [
      'Led, mentored, and trained personnel supporting logistics and deployment readiness.',
      'Coordinated training operations and logistical support across multiple military branches.',
      'Managed facilities requests, inspections, equipment readiness, and high-value inventory with zero-loss accountability.',
    ],
  },
];

export const Experience: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Experience & Background"
        subtitle="A practical mix of handyman work, logistics, IT, leadership, and military-grade accountability."
        image="https://picsum.photos/1920/800?random=71"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-bold text-primary uppercase tracking-[0.25em] mb-4">More than a handyman</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-5">Bruce brings field experience, technical thinking, and operational discipline.</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bruce Works benefits from Bruce’s background in logistics, IT, facilities, leadership, and hands-on service. That means jobs are approached with planning, organization, communication, and follow-through.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experienceAreas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-gray-50 rounded-xl p-7 border border-gray-100 shadow-sm">
                <Icon className="text-primary mb-5" size={34} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Briefcase className="text-primary" size={34} />
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Professional background</p>
                <h2 className="text-3xl font-black text-gray-900">Experience that shows up in the work</h2>
              </div>
            </div>

            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={`${item.company}-${item.role}`} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.role}</h3>
                      <p className="text-primary font-semibold">{item.company}</p>
                    </div>
                    <span className="text-sm font-bold bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">{item.dates}</span>
                  </div>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-gray-700">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={19} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
