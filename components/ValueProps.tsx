import React from 'react';
import { Wrench, Clock, ThumbsUp, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import { ValueProp } from '../types';

const props: ValueProp[] = [
  {
    title: "Simplify Home Maintenance",
    description: "One call does it all. We handle everything from small repairs to major installations, saving you time and hassle.",
    icon: <Wrench size={40} className="text-primary" />
  },
  {
    title: "Increase Efficiency",
    description: "Our experienced technicians arrive on time with the right tools, ensuring jobs are completed quickly and correctly.",
    icon: <Clock size={40} className="text-primary" />
  },
  {
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work. If you're not 100% happy with the result, we'll make it right.",
    icon: <ThumbsUp size={40} className="text-primary" />
  },
  {
    title: "Licensed & Insured",
    description: "Rest easy knowing your home is in safe hands. Our team is fully vetted, licensed, and insured.",
    icon: <ShieldCheck size={40} className="text-primary" />
  },
  {
    title: "Fair Pricing",
    description: "No hidden fees or surprises. We provide transparent upfront pricing for all our services.",
    icon: <DollarSign size={40} className="text-primary" />
  },
  {
    title: "Flexible Scheduling",
    description: "We work around your schedule. Weekend and evening appointments available upon request.",
    icon: <Calendar size={40} className="text-primary" />
  }
];

export const ValueProps: React.FC = () => {
  return (
    <section className="bg-lightgrey py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="flex justify-center mb-6">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{prop.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-primary font-bold hover:underline text-lg inline-flex items-center gap-2">
            See all our services <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};