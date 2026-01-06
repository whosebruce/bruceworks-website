import React from 'react';
import { Quote } from 'lucide-react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <Quote size={48} className="text-primary mx-auto mb-8 opacity-80" />
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
            "Bruce Works transformed our home renovation experience. The team was professional, clean, and the quality of the carpentry was outstanding. I finally found a handyman service I can trust."
          </blockquote>
          <cite className="text-primary font-bold text-lg not-italic block">
            Sarah Jenkins <span className="text-white/60 font-normal mx-2">-</span> Homeowner, Westside
          </cite>
        </div>
      </div>
    </section>
  );
};