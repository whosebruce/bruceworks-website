import React from 'react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';
import { ValueProps } from '../components/ValueProps';
import { CheckCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <main>
      <PageHero 
        title="Why Choose Bruce Works?" 
        subtitle="We're not just handy—we're professionals committed to excellence."
        image="https://picsum.photos/1920/800?random=30"
      />

      {/* Intro Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built on Trust and Quality</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              At Bruce Works, we understand that inviting a worker into your home requires trust. That's why we've built our business on a foundation of reliability, transparency, and superior craftsmanship. We treat your home as if it were our own.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Reuse */}
      <ValueProps />

      {/* The Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://picsum.photos/800/800?random=31" 
                alt="Our team meeting" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Bruce Works Standard</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                   <CheckCircle className="text-primary flex-shrink-0" size={24} />
                   <div>
                     <h3 className="font-bold text-lg">Vetted Professionals</h3>
                     <p className="text-gray-600">Every technician undergoes a strict background check and skills assessment.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <CheckCircle className="text-primary flex-shrink-0" size={24} />
                   <div>
                     <h3 className="font-bold text-lg">12-Month Warranty</h3>
                     <p className="text-gray-600">We stand by our work. All labor is backed by a 12-month worry-free guarantee.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <CheckCircle className="text-primary flex-shrink-0" size={24} />
                   <div>
                     <h3 className="font-bold text-lg">Clean Workspace</h3>
                     <p className="text-gray-600">We wear booties, use drop cloths, and clean up thoroughly before we leave.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <CheckCircle className="text-primary flex-shrink-0" size={24} />
                   <div>
                     <h3 className="font-bold text-lg">Transparent Communication</h3>
                     <p className="text-gray-600">You'll receive text updates when we're on our way and digital receipts instantly.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};