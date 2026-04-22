import React from 'react';
import { Button } from './Button';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  image = "https://picsum.photos/1920/600?grayscale" 
}) => {
  return (
    <section className="relative bg-secondary">
      <div className="absolute inset-0 z-0 h-[400px]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-24 h-[400px] flex flex-col justify-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-200 font-light max-w-2xl mb-8">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700 w-fit" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
};