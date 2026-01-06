import React from 'react';
import { PageHero } from '../components/PageHero';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export const FAQPage: React.FC = () => {
  return (
    <main>
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about our services, pricing, and process."
        image="https://picsum.photos/1920/800?random=50"
      />
      
      {/* Reusing existing FAQ component */}
      <FAQ />

      <section className="bg-white pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-lg">
            Didn't find what you were looking for? <br />
            Give us a call at <a href="tel:+15550199888" className="text-primary font-bold hover:underline">(555) 019-9888</a> or send us a message below.
          </p>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};