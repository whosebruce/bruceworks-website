import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-secondary -mt-[88px] pt-[88px] lg:-mt-[116px] lg:pt-[116px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?random=10" 
          alt="Handyman working" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-24 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Professional Handyman Services You Can Trust
          </h1>
          <h2 className="text-xl lg:text-2xl text-gray-200 mb-8 font-light leading-relaxed max-w-2xl">
            More than just repairs—Bruce Works provides a complete range of home maintenance solutions with expert craftsmanship at a fair price.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Free Quote
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};