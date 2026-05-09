import React from 'react';
import { PageHero } from '../components/PageHero';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export const FAQPage: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about AI Audits, Command Centers, privacy, pricing, and the build process."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
      />

      <FAQ />

      <section className="bg-white pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-lg">
            Didn't find what you were looking for? <br />
            Call <a href="tel:+18668296757" className="text-gray-900 hover:text-yellow-600 font-bold hover:underline">(866) 829-6757</a> or request an AI Audit below.
          </p>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
