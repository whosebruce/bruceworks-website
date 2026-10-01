import React from 'react';
import { Display, OpTag } from './brand';
import { PhoneAndSmsConsent } from './PhoneAndSmsConsent';
import { STILLS } from '../content/media';

// The shared "book the audit" block at the bottom of most pages. Posts to FormSubmit like every form on the site.
export const ContactCTA: React.FC = () => {
  const art = STILLS.bruceSalute;
  return (
    <section id="contact-form" className="texture border-t border-line">
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <OpTag op="OP-00">AI Leverage Audit</OpTag>
          <Display className="mt-6 text-5xl md:text-6xl">Find the first thing <span className="sig">worth building.</span></Display>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            Tell Bruce what feels scattered, repetitive or stuck in your head. The audit maps the workflow, ranks the opportunities, sets what data stays private, and hands you a 30-day plan.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              ['01', 'Request the audit', 'Describe the problem. No sensitive data needed.'],
              ['02', 'Complete intake', 'Confirm the workflow, the tools, the people and the material to review.'],
              ['03', 'Get the roadmap', 'Within 7 business days of complete intake.'],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-alert">{n}</span>
                <span><b className="block font-semibold text-ink">{t}</b><span className="text-ink-2">{d}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">Remote $197 <span className="text-ink-3">·</span> San Diego in person $297</p>
          {art && <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="photo-panel mt-10 hidden w-64 lg:block" />}
        </div>

        <form className="panel space-y-5 p-6 md:p-8" action="https://formsubmit.co/info@bruceworks.net" method="POST">
          <input type="hidden" name="_subject" value="New AI Leverage Audit request from bruceworks.net" />
          <input type="hidden" name="_captcha" value="false" />
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
            <input type="text" id="name" name="name" required className="field" placeholder="Your name" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="business" className="mb-1.5 block text-sm font-semibold text-ink">Business, school or project</label>
            <input type="text" id="business" name="business" className="field" placeholder="Optional" autoComplete="organization" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
            <input type="email" id="email" name="email" required className="field" placeholder="you@example.com" autoComplete="email" />
          </div>
          <PhoneAndSmsConsent idPrefix="audit-request" />
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">What feels scattered or repetitive?</label>
            <textarea id="message" name="message" required rows={5} className="field"
              placeholder="Example: following up on leads, too many apps for one job, estimates, content, homework, files everywhere, or knowledge that only lives in your head." />
          </div>
          <button type="submit" className="btn btn-primary h-auto w-full whitespace-normal py-3 text-center">Request the AI Leverage Audit</button>
          <p className="text-center text-xs text-ink-3">Please don't send passwords, account numbers, medical records or other sensitive data through this form.</p>
        </form>
      </div>
    </section>
  );
};
