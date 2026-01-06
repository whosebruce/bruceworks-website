import React from 'react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const projects = [
  { id: 1, title: 'Kitchen Cabinet Repair', category: 'Carpentry', img: 'https://picsum.photos/600/400?random=41' },
  { id: 2, title: 'Custom Shelving Unit', category: 'Installation', img: 'https://picsum.photos/600/400?random=42' },
  { id: 3, title: 'Deck Refinishing', category: 'Exterior', img: 'https://picsum.photos/600/400?random=43' },
  { id: 4, title: 'Bathroom Tile Update', category: 'Tiling', img: 'https://picsum.photos/600/400?random=44' },
  { id: 5, title: 'Light Fixture Upgrade', category: 'Electrical', img: 'https://picsum.photos/600/400?random=45' },
  { id: 6, title: 'Drywall Repair', category: 'Repairs', img: 'https://picsum.photos/600/400?random=46' },
];

export const OurWork: React.FC = () => {
  return (
    <main>
      <PageHero 
        title="Our Work" 
        subtitle="Browse our portfolio of recent projects and see the quality for yourself."
        image="https://picsum.photos/1920/800?random=40"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">This is just a small sample of what we can do.</p>
            <button 
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};