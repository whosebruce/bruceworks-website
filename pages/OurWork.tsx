import React from 'react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const projects = [
  { id: 1, title: 'Private Knowledge Vault', category: 'Memory Layer', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Assistant Instructions', category: 'AI Setup', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Workflow Templates', category: 'Operations', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Content Pipeline', category: 'Creators', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'Business AI Ops System', category: 'Small Business', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Local AI Hardware Setup', category: 'Privacy & Control', img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80' },
];

export const OurWork: React.FC = () => {
  return (
    <main>
      <PageHero
        title="What I Build"
        subtitle="Examples of the systems and workflows that can go inside a Personal AI Command Center."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">Start with an AI Audit to decide which pieces are actually worth building first.</p>
            <button
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book an AI Audit
            </button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
