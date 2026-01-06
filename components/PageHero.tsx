import React from 'react';

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
    <section className="relative bg-secondary -mt-[88px] pt-[88px] lg:-mt-[116px] lg:pt-[116px]">
      <div className="absolute inset-0 z-0 h-[400px]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16 lg:py-24 h-[300px] flex flex-col justify-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-200 font-light max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};