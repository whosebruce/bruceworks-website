import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-secondary">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
          alt="AI command center workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="max-w-4xl">
          <p className="text-primary font-bold tracking-wider uppercase text-sm mb-4">
            Private AI assistant systems for real life and business
          </p>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Build Your Private AI Command Center
          </h1>
          <h2 className="text-xl lg:text-2xl text-gray-200 mb-8 font-light leading-relaxed max-w-3xl">
            Bruce Works helps individuals, creators, and small businesses turn scattered notes, files, ideas, and workflows into a private AI assistant system that helps them stay organized, move faster, and get more done.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Book an AI Audit
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('services-preview')?.scrollIntoView({ behavior: 'smooth' })}>
              See What I Build
            </Button>
          </div>
          <p className="text-gray-300 mt-6 max-w-2xl">
            Private knowledge vaults. Custom AI assistants. Practical workflows. Optional local hardware and monthly support.
          </p>
        </div>
      </div>
    </section>
  );
};
