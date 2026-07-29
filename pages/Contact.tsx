import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BadgeCheck, Landmark, Mail, Phone, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { PhoneAndSmsConsent } from '../components/PhoneAndSmsConsent';

type ContactTopic = 'general' | 'government';

const subjects: Record<ContactTopic, string> = {
  general: 'New contact request from bruceworks.net',
  government: 'Government/teaming opportunity inquiry from bruceworks.net',
};

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTopic: ContactTopic = searchParams.get('topic') === 'government' ? 'government' : 'general';
  const [topic, setTopic] = React.useState<ContactTopic>(initialTopic);
  const submitted = searchParams.get('submitted') === 'true';

  const returnUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/contact/?submitted=true&topic=${topic}`
      : `https://bruceworks.net/contact/?submitted=true&topic=${topic}`;

  return (
    <main className="bg-white">
      <section className="relative bg-secondary pt-32 pb-14 text-white lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-secondary to-indigo-950" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto px-6">
          <p className="font-condensed text-base font-bold uppercase tracking-[0.12em] text-cyan-200">Contact Bruce Works</p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl font-extrabold leading-[1.02] md:text-6xl">
            Start a conversation — no email app required.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Use this form for AI Leverage Audit requests, client-owned business systems, or government and teaming opportunities. It submits directly from the website.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          {submitted ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl animate-fade-in-up">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Message Sent</h2>
              <p className="mb-8 text-gray-600">
                {topic === 'government'
                  ? 'Thank you. Bruce Works will review the opportunity details and respond with a fit assessment before making capability or pricing commitments.'
                  : 'Thank you for reaching out. Bruce will review your message personally and follow up soon.'}
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/" className="font-semibold text-secondary underline underline-offset-4 hover:text-blue-900">
                  Back to homepage
                </Link>
                {topic === 'government' && (
                  <Link
                    to="/government-capabilities/"
                    className="font-semibold text-secondary underline underline-offset-4 hover:text-blue-900"
                  >
                    Return to Government Capabilities
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">What is this about?</h2>
                <p className="mb-6 text-gray-600">
                  Pick the option that fits. Government and teaming inquiries route with a dedicated subject so they get the right attention.
                </p>
                <div className="space-y-4" role="radiogroup" aria-label="Inquiry type">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={topic === 'general'}
                    onClick={() => setTopic('general')}
                    className={`flex w-full items-start gap-4 rounded-xl border-2 p-5 text-left transition-colors ${
                      topic === 'general' ? 'border-secondary bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Sparkles className={`mt-1 h-6 w-6 flex-shrink-0 ${topic === 'general' ? 'text-secondary' : 'text-gray-400'}`} />
                    <span>
                      <span className="block font-bold text-gray-900">AI Leverage Audit or commercial inquiry</span>
                      <span className="text-sm text-gray-600">
                        Owner-led service business systems, workflow buildouts, local AI add-ons, and support.
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={topic === 'government'}
                    onClick={() => setTopic('government')}
                    className={`flex w-full items-start gap-4 rounded-xl border-2 p-5 text-left transition-colors ${
                      topic === 'government' ? 'border-secondary bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Landmark className={`mt-1 h-6 w-6 flex-shrink-0 ${topic === 'government' ? 'text-secondary' : 'text-gray-400'}`} />
                    <span>
                      <span className="block font-bold text-gray-900">Government / teaming opportunity</span>
                      <span className="text-sm text-gray-600">
                        Agencies, prime contractors, and teaming partners. California DVBE · SB (Micro), Certification ID <span className="font-mono text-[0.95em]">2053352</span>.
                      </span>
                    </span>
                  </button>
                </div>

                {topic === 'government' && (
                  <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 animate-fade-in-up">
                    <p className="mb-2 flex items-center gap-2 font-condensed text-base font-bold uppercase tracking-[0.08em] text-secondary">
                      <BadgeCheck className="h-4 w-4" /> Government &amp; prime contractor support
                    </p>
                    <p className="text-sm text-gray-700">
                      Include the scope, due date, delivery location, and expected workshare. Bruce Works responds with a fit assessment before making capability or pricing commitments.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                        <a href="tel:+16195379720" className="hover:underline">619-537-9720</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 flex-shrink-0 text-secondary" />
                        <a href="mailto:bruce@bruceworks.net" className="hover:underline">bruce@bruceworks.net</a>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-700">
                      <Link to="/government-capabilities/" className="font-semibold text-secondary hover:underline">
                        View certifications and capabilities
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-xl lg:p-12">
                <form className="space-y-6" action="https://formsubmit.co/info@bruceworks.net" method="POST">
                  <input type="hidden" name="_subject" value={subjects[topic]} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={returnUrl} />
                  <input type="hidden" name="inquiry_type" value={topic === 'government' ? 'government-team' : 'general'} />

                  <div>
                    <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  {topic === 'government' && (
                    <div>
                      <label htmlFor="contact-organization" className="mb-1 block text-sm font-medium text-gray-700">
                        Organization / Agency
                      </label>
                      <input
                        type="text"
                        id="contact-organization"
                        name="organization"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary"
                        placeholder="Agency, prime contractor, or company"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>

                  <PhoneAndSmsConsent idPrefix="contact-inquiry" />

                  <div>
                    <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
                      {topic === 'government' ? 'Opportunity details' : 'How can Bruce Works help?'}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary"
                      placeholder={
                        topic === 'government'
                          ? 'Scope, due date, delivery location, expected workshare, solicitation or project reference, and anything else useful for a fit assessment.'
                          : 'Tell me which business process feels scattered or repetitive: lead follow-up, document intake, estimates, proposals, content, project tracking, customer handoff, or knowledge that lives in the owner’s head.'
                      }
                    ></textarea>
                  </div>

                  <Button fullWidth type="submit">
                    {topic === 'government' ? 'Send Opportunity Details' : 'Send Message'}
                  </Button>
                  <p className="mt-4 text-center text-xs text-gray-500">
                    Please do not submit passwords, account numbers, medical records, or sensitive client data through this form.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
