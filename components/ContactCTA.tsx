import React from 'react';
import { Button } from './Button';
import { PhoneAndSmsConsent } from './PhoneAndSmsConsent';

export const ContactCTA: React.FC = () => {
  return (
    <section id="contact-form" className="py-20 bg-lightgrey">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-secondary">AI Leverage Audit</p>
            <h2 className="font-display mt-3 text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.05]">
              Find the first practical improvement worth building.
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tell Bruce what feels scattered, repetitive, or trapped in your head. The paid audit maps the workflow, identifies the top opportunities, defines data boundaries, and gives you a 30-day action plan.
            </p>
            <div className="space-y-4">
              {[
                ['1', 'Request the audit', 'Share the business problem without sending sensitive data.'],
                ['2', 'Complete intake', 'Confirm the workflow, tools, people, and source material needed for analysis.'],
                ['3', 'Receive the roadmap', 'Pilot target: 7 business days after complete intake and required materials.'],
              ].map(([number, title, body]) => (
                <div key={number} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-gray-900 font-display font-bold text-2xl">{number}</div>
                  <div><h4 className="font-bold text-gray-900">{title}</h4><p className="text-sm text-gray-500">{body}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm font-semibold text-secondary">Remote pilot: $197 · San Diego in-person pilot: $297</p>
          </div>

          <div className="lg:w-1/2 bg-gray-50 p-10 lg:p-16 border-l border-gray-100">
            <form className="space-y-6" action="https://formsubmit.co/info@bruceworks.net" method="POST">
              <input type="hidden" name="_subject" value="New AI Leverage Audit request from bruceworks.net" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" id="business" name="business" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none" placeholder="Your business" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none" placeholder="you@example.com" />
              </div>
              <PhoneAndSmsConsent idPrefix="audit-request" />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">What business process feels scattered or repetitive?</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none" placeholder="Example: lead follow-up, document intake, estimates, proposals, content, project tracking, customer handoff, or business knowledge that only lives in the owner's head."></textarea>
              </div>
              <Button fullWidth type="submit">Request AI Leverage Audit</Button>
              <p className="text-xs text-gray-500 text-center mt-4">Please do not submit passwords, account numbers, medical records, regulated records, or sensitive client data through this form.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
