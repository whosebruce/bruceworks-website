import React from 'react';
import { Feature } from '../types';
import { Button } from './Button';

export const FeatureSection: React.FC<Feature> = ({
  title,
  headline,
  description,
  points,
  image,
  imageAlt,
  align
}) => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={image} 
                alt={imageAlt} 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{title}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {headline}
            </h2>
            <div className="text-gray-600 text-lg mb-8 leading-relaxed">
              <p className="mb-6">{description}</p>
              <ul className="space-y-3">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="primary" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Free Quote
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};