import React from 'react';
import { Button } from './Button';

export const ContactCTA: React.FC = () => {
  return (
    <section id="contact-form" className="py-20 bg-lightgrey">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to build your private AI Command Center?
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Start with an AI Audit. Tell me what feels scattered, repetitive, or overwhelming, and I’ll help map the first practical system worth building.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-gray-900 font-bold text-xl">1</div>
                <div>
                  <h4 className="font-bold text-gray-900">Request an AI Audit</h4>
                  <p className="text-sm text-gray-500">Share what you want help organizing or improving.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-gray-900 font-bold text-xl">2</div>
                <div>
                  <h4 className="font-bold text-gray-900">Map the Opportunities</h4>
                  <p className="text-sm text-gray-500">We identify the workflows where AI can actually help.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-gray-900 font-bold text-xl">3</div>
                <div>
                  <h4 className="font-bold text-gray-900">Build the First Version</h4>
                  <p className="text-sm text-gray-500">Your vault, assistant instructions, workflows, and training come together.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-gray-50 p-10 lg:p-16 border-l border-gray-100">
            <form className="space-y-6" action="https://formsubmit.co/bruceworksllc@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="New AI Audit request from bruceworks.net" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="Best number to reach you"
                />
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <label htmlFor="sms-consent" className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                  <input
                    type="checkbox"
                    id="sms-consent"
                    name="sms_consent"
                    value="I agree to receive text messages from Bruce Works LLC"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>
                    I agree to receive text messages from Bruce Works LLC related to my inquiry, appointments, quotes, invoices, classes/events, and customer support. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not required to purchase services. View our{' '}
                    <a href="/#/privacy-policy" className="font-semibold text-secondary hover:underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">What do you want help organizing or improving?</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="Tell me what feels scattered, repetitive, or overwhelming. Notes, files, goals, content, admin, workflows, business processes, local AI/privacy needs, etc."
                ></textarea>
              </div>
              <Button fullWidth type="submit">
                Request AI Audit
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Please do not submit passwords, account numbers, medical records, or sensitive client data through this form.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
