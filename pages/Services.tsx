import React from 'react';
import { PageHero } from '../components/PageHero';
import { FeatureSection } from '../components/FeatureSection';
import { ContactCTA } from '../components/ContactCTA';

export const Services: React.FC = () => {
  return (
    <main>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive handyman solutions for every corner of your home."
        image="https://picsum.photos/1920/800?random=20"
      />
      
      <div className="bg-white">
        <FeatureSection 
          title="General Repairs"
          headline="Quick Fixes for Daily Problems"
          description="We handle the small stuff so it doesn't become big stuff. Our general repair team is equipped to handle a wide variety of household issues in a single visit."
          points={[
            "Drywall patching and painting",
            "Door and window adjustments",
            "Hardware replacement and lock installation",
            "Tile and grout repair",
            "Furniture assembly and repair"
          ]}
          image="https://picsum.photos/800/600?random=1"
          imageAlt="Handyman repairing door"
          align="left"
        />

        <FeatureSection 
          title="Installations"
          headline="Upgrades Made Easy"
          description="Bought something new? Let us install it properly. We ensure your new fixtures and appliances are installed safely and according to manufacturer specifications."
          points={[
            "Lighting fixtures, ceiling fans, and dimmers",
            "Smart home device setup (cameras, doorbells)",
            "Shelving, cabinets, and storage systems",
            "TV mounting and wire concealment",
            "Appliance hookups (washers, dryers, dishwashers)"
          ]}
          image="https://picsum.photos/800/600?random=2"
          imageAlt="Technician installing light"
          align="right"
        />

        <FeatureSection 
          title="Maintenance"
          headline="Protect Your Investment"
          description="Routine maintenance is key to preserving your home's value. We offer scheduled maintenance services to keep everything running smoothly year-round."
          points={[
            "Gutter cleaning and minor repair",
            "Power washing (decks, driveways, siding)",
            "Weatherstripping and insulation checks",
            "HVAC filter replacements",
            "Safety checks (smoke detectors, CO detectors)"
          ]}
          image="https://picsum.photos/800/600?random=3"
          imageAlt="Exterior home maintenance"
          align="left"
        />

        <FeatureSection 
          title="Outdoor & Exterior"
          headline="Curb Appeal & Safety"
          description="Your home's exterior faces the elements every day. We help repair weather damage and keep your outdoor living spaces looking their best."
          points={[
            "Deck and fence repair",
            "Siding repair",
            "Exterior trim painting",
            "Mailbox installation",
            "Screen repair"
          ]}
          image="https://picsum.photos/800/600?random=4"
          imageAlt="Fence repair"
          align="right"
        />
      </div>

      <ContactCTA />
    </main>
  );
};