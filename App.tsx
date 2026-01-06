import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { FeatureSection } from './components/FeatureSection';
import { QuoteSection } from './components/QuoteSection';
import { FAQ } from './components/FAQ';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
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
      <div id="services">
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

        <FeatureSection 
          title="Maintenance"
          headline="Preventative Care for Your Property"
          description="Regular maintenance prevents costly repairs down the road. Our seasonal maintenance packages keep your gutters clean, your filters changed, and your home running efficiently all year round."
          points={[
            "Gutter cleaning and repair",
            "Power washing (decks, driveways)",
            "Weatherstripping and sealing",
            "Filter replacements",
            "Safety checks (smoke detectors, etc.)"
          ]}
          image="https://picsum.photos/800/600?random=3"
          imageAlt="Exterior home maintenance"
          align="left"
        />
      </div>

      <QuoteSection />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}

export default App;