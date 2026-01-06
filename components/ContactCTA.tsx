import React from 'react';
import { Button } from './Button';

export const ContactCTA: React.FC = () => {
  return (
    <section id="contact-form" className="py-20 bg-lightgrey">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Text Side */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Fix Up Your Home?
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Don't let that "to-do" list keep growing. Contact Bruce Works today for reliable, professional handyman services. Get a free quote in minutes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">1</div>
                <div>
                  <h4 className="font-bold text-gray-900">Request a Quote</h4>
                  <p className="text-sm text-gray-500">Fill out the form or give us a call.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">2</div>
                <div>
                  <h4 className="font-bold text-gray-900">Schedule Service</h4>
                  <p className="text-sm text-gray-500">We pick a time that works for you.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">3</div>
                <div>
                  <h4 className="font-bold text-gray-900">Job Done</h4>
                  <p className="text-sm text-gray-500">Relax while we handle the hard work.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 bg-gray-50 p-10 lg:p-16 border-l border-gray-100">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="Tell us what needs fixing..."
                ></textarea>
              </div>
              <Button fullWidth type="submit">
                Submit Request
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking submit you agree to our privacy policy.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};