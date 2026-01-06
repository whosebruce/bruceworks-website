import React from 'react';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { FeatureSection } from '../components/FeatureSection';
import { QuoteSection } from '../components/QuoteSection';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      
      {/* Introduction Text */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            A Better Way to Maintain Your Home
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Stop worrying about that leaky faucet or the drywall patch you haven't gotten around to. Bruce Works brings professionalism, skill, and reliability to every job, big or small.
          </p>
        </div>
      </section>

      <ValueProps />

      {/* Feature Sections Zig-Zag */}
      <div id="services-preview">
        <FeatureSection 
          title="General Repairs"
          headline="Keep Your Home in Top Shape"
          description="From squeaky doors to broken tiles, our general repair services cover all the little annoyances that pile up over time. We assess, fix, and clean up, leaving your home better than we found it."
          points={[
            "Drywall patching and painting",
            "Door and window adjustments",
            "Hardware replacement",
            "Tile and grout repair",
            "Furniture assembly"
          ]}
          image="https://picsum.photos/800/600?random=1"
          imageAlt="Handyman repairing door"
          align="left"
        />

        <FeatureSection 
          title="Installations"
          headline="Professional Installations Done Right"
          description="Upgrade your living space with our expert installation services. Whether it's a new ceiling fan, a flat-screen TV mount, or new shelving units, we ensure everything is secure, level, and functional."
          points={[
            "Lighting fixtures and ceiling fans",
            "Smart home device setup",
            "Shelving and cabinet installation",
            "TV mounting",
            "Appliance hookups"
          ]}
          image="https://picsum.photos/800/600?random=2"
          imageAlt="Technician installing light"
          align="right"
        />
      </div>

      <QuoteSection />
      <FAQ />
      <ContactCTA />
    </main>
  );
};