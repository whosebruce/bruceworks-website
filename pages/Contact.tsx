import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Landmark, LifeBuoy, Mail, MapPin, MessageSquare, Phone, Workflow, Wrench, X, Zap, Server } from 'lucide-react';
import { Chamfer, Check, Display, GridBand, PhotoPanel, SectionHeader } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { PhoneAndSmsConsent } from '../components/PhoneAndSmsConsent';
import { useHashScroll } from '../components/offers/useHashScroll';
import { addOn, tier } from '../components/offers/tiers';
import { company, identifiers, samRegistration } from '../content/government';
import { CARE, HOSTING } from '../content/pricing';
import { STILLS } from '../content/media';

// /contact/: one form for every kind of inquiry, posting to FormSubmit (no email app needed). ?topic= presets the
// inquiry type: government (route verifier checks it), foundation, operator and command (the pricing CTAs). A loadout
// sent from the /pricing/ estimator rides along in router state and is attached as a hidden field.

// `command` is Tier 04, Bruce hosting it (2026-10-04); `care` is monthly care on the client's own machine. Old
// ?topic=hosting links (the waitlist) land on `command`. `workflow` is one workflow buildout, on its own after the audit
// (2026-10-06).
type Topic = 'general' | 'workflow' | 'foundation' | 'operator' | 'command' | 'care' | 'government';
const TOPICS: Topic[] = ['general', 'workflow', 'foundation', 'operator', 'command', 'care', 'government'];
const ALIAS: Record<string, Topic> = { hosting: 'command' };
const isTopic = (t: string | null): t is Topic => !!t && (TOPICS as string[]).includes(t);
const topicOf = (t: string | null): Topic | null => (t && ALIAS[t]) || (isTopic(t) ? t : null);

const SUBJECT: Record<Topic, string> = {
  general: 'New contact request from bruceworks.net',
  workflow: 'Workflow buildout inquiry from bruceworks.net',
  foundation: 'Foundation install inquiry from bruceworks.net',
  operator: 'Operator build inquiry from bruceworks.net',
  command: 'Command (hosted by Bruce) inquiry from bruceworks.net',
  care: 'Monthly care inquiry from bruceworks.net',
  government: 'Government/teaming opportunity inquiry from bruceworks.net',
};
const INQUIRY_TYPE: Record<Topic, string> = { general: 'general', workflow: 'workflow-buildout', foundation: 'foundation', operator: 'operator', command: 'command-hosted', care: 'monthly-care', government: 'government-team' };

export const Contact: React.FC = () => {
  useHashScroll();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const asked = searchParams.get('topic');
  const [topic, setTopic] = React.useState<Topic>(topicOf(asked) ?? 'general');
  React.useEffect(() => { const t = topicOf(asked); if (t) setTopic(t); }, [asked]);
  const submitted = searchParams.get('submitted') === 'true';
  const sentLoadout = (location.state as { loadout?: unknown } | null)?.loadout;
  const [loadout, setLoadout] = React.useState<string | null>(typeof sentLoadout === 'string' ? sentLoadout.slice(0, 1200) : null);

  const returnUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/contact/?submitted=true&topic=${topic}`
    : `https://bruceworks.net/contact/?submitted=true&topic=${topic}`;

  const foundation = tier('foundation'), operator = tier('operator'), command = tier('command'), workflow = addOn('workflow');
  const options: { id: Topic; icon: typeof Phone; title: string; body: React.ReactNode }[] = [
    { id: 'general', icon: MessageSquare, title: 'The audit, or a question', body: 'The AI Leverage Audit, or how any of this works.' },
    { id: 'workflow', icon: Workflow, title: `One workflow buildout · ${workflow.price}`, body: 'One job built end to end and handed over, on its own after the audit or with a build.' },
    { id: 'foundation', icon: Wrench, title: `${foundation.name} install · ${foundation.price}`, body: foundation.forWho },
    { id: 'operator', icon: Zap, title: `${operator.name} build · ${operator.price}`, body: operator.forWho },
    { id: 'command', icon: Server, title: `${command.name} · hosted by Bruce · ${command.price}/mo`, body: `${command.forWho} Limited to ${HOSTING.slots} slots, after a build; we confirm it fits before you pay.` },
    { id: 'care', icon: LifeBuoy, title: `${CARE.name} · ${CARE.price}/mo`, body: 'Kept current on the machine you own: new features, health checks, one small workflow a month.' },
    { id: 'government', icon: Landmark, title: 'Government / teaming opportunity', body: <>Agencies, prime contractors and teaming partners. SBA-certified SDVOSB/VOSB · SAM.gov {samRegistration.statusShort} · UEI <span className="font-mono text-[0.95em]">{identifiers.uei}</span> · CAGE <span className="font-mono text-[0.95em]">{identifiers.cage}</span> · California DVBE/SB (Micro).</> },
  ];

  const radios = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = TOPICS[(TOPICS.indexOf(topic) + step + TOPICS.length) % TOPICS.length];
    setTopic(next);
    radios.current[TOPICS.indexOf(next)]?.focus();
  };

  const isGov = topic === 'government';
  const thumbs = STILLS.bruceSalute;
  const isBuild = topic === 'foundation' || topic === 'operator' || topic === 'command';

  return (
    <main>
      <PageIntro
        op="OP-08" tag="Contact"
        title={<>Tell me <span className="sig">the mission.</span></>}
        sub={<p>An audit, a build, hosting, monthly care or a government opportunity. This form comes straight to me, no email app needed. Rather talk? Call.</p>}
        aside={
          <Chamfer innerClassName="p-0">
            <ul className="divide-y divide-line-2">
              {[
                [Phone, 'Toll-free intake', '(866) 829-6757', 'tel:+18668296757'],
                [Phone, 'Bruce direct', '619-537-9720', 'tel:+16195379720'],
                [Mail, 'Email', 'info@bruceworks.net', 'mailto:info@bruceworks.net'],
              ].map(([Icon, k, v, href]: any) => (
                <li key={k}>
                  <a href={href} className="flex min-h-[64px] items-center gap-4 px-6 py-4 hover:bg-ground-3">
                    <Icon size={20} className="shrink-0 text-signal-text" />
                    <span className="min-w-0"><span className="label block">{k}</span><span className="block truncate text-lg font-semibold text-ink">{v}</span></span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 px-6 py-4">
                <MapPin size={20} className="shrink-0 text-signal-text" />
                <span><span className="label block">Base</span><span className="block font-semibold text-ink">San Diego</span><span className="block text-sm text-ink-2">California service · remote nationwide</span></span>
              </li>
            </ul>
          </Chamfer>
        }
      />

      <GridBand>
        <div className="py-16 md:py-20">
          {submitted ? (
            <div className="panel mx-auto max-w-2xl p-8 text-center md:p-12">
              {thumbs ? <PhotoPanel tilt={-2} className="mx-auto w-36"><img src={thumbs.src} alt={thumbs.alt} width={thumbs.w} height={thumbs.h} className="block h-auto w-full" /></PhotoPanel> : <p className="sig text-5xl" aria-hidden="true">☑</p>}
              <Display as="h2" className="mt-8 text-5xl">Message sent.</Display>
              <p className="mt-4 text-lg text-ink-2">
                {isGov
                  ? 'Thank you. I’ll review the opportunity details and respond with a fit assessment before making capability or pricing commitments.'
                  : 'Thanks for reaching out. I read every message myself and will follow up soon.'}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/" className="btn btn-outline">Back to the homepage</Link>
                {isGov && <Link to="/government-capabilities/" className="btn btn-outline">Return to Government Capabilities</Link>}
                {isBuild && <Link to="/pricing/" className="btn btn-outline">Back to pricing</Link>}
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-y-6">
              <div className="lg:col-start-1 lg:row-start-1">
                <SectionHeader num="01" label="What’s this about?" />
                <div role="radiogroup" aria-label="Inquiry type" onKeyDown={onKey} className="mt-6 space-y-2">
                  {options.map((o, i) => { const on = topic === o.id; const I = o.icon; return (
                    <button key={o.id} ref={(el) => { radios.current[i] = el; }} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} onClick={() => setTopic(o.id)}
                      className={`flex w-full items-start gap-4 border-theme p-4 text-left transition-colors rounded-theme ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'}`}>
                      <I size={20} className={`mt-0.5 shrink-0 ${on ? 'text-signal-text' : 'text-ink-3'}`} />
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink">{o.title}</span>
                        <span className="mt-0.5 block text-sm text-ink-2">{o.body}</span>
                      </span>
                    </button>
                  ); })}
                </div>
              </div>

              <form className="panel space-y-5 self-start p-6 md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1" action="https://formsubmit.co/info@bruceworks.net" method="POST">
                <input type="hidden" name="_subject" value={SUBJECT[topic]} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={returnUrl} />
                <input type="hidden" name="inquiry_type" value={INQUIRY_TYPE[topic]} />
                {loadout && !isGov && <input type="hidden" name="loadout_estimate" value={loadout} />}

                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
                  <input type="text" id="contact-name" name="name" required className="field" placeholder="Your name" autoComplete="name" />
                </div>
                {isGov && (
                  <div>
                    <label htmlFor="contact-organization" className="mb-1.5 block text-sm font-semibold text-ink">Organization / agency</label>
                    <input type="text" id="contact-organization" name="organization" required className="field" placeholder="Agency, prime contractor or company" autoComplete="organization" />
                  </div>
                )}
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
                  <input type="email" id="contact-email" name="email" required className="field" placeholder="you@example.com" autoComplete="email" />
                </div>

                <PhoneAndSmsConsent idPrefix="contact-inquiry" />

                {loadout && !isGov && (
                  <div className="border-theme border-signal/60 bg-signal/10 p-4 rounded-theme">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-ink">Your loadout estimate is attached</p>
                      <button type="button" onClick={() => setLoadout(null)} className="-m-2 grid h-10 w-10 shrink-0 place-items-center text-ink-2 hover:text-ink" aria-label="Remove the loadout estimate"><X size={16} /></button>
                    </div>
                    <p className="mt-1 text-sm text-ink-2">{loadout}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink">
                    {isGov ? 'Opportunity details' : isBuild ? 'Tell me about the job' : 'How can I help?'}
                  </label>
                  <textarea id="contact-message" name="message" required rows={5} className="field"
                    placeholder={isGov
                      ? 'Scope, due date, delivery location, expected workshare, solicitation or project reference, and anything else useful for a fit assessment.'
                      : isBuild
                        ? 'Who will use it, what apps and files you run on now, what you want in one place, and when you’d like it running.'
                        : 'What feels scattered or repetitive: lead follow-up, document intake, estimates, content, homework, files everywhere, or knowledge that only lives in your head.'} />
                </div>

                <button type="submit" className="btn btn-primary w-full">{isGov ? 'Send opportunity details' : 'Send message'}</button>
                <p className="text-center text-xs text-ink-3">Please don’t send passwords, account numbers, medical records or other sensitive client data through this form.</p>
              </form>

              {/* on phones the form comes right after the topic; the helper notes follow it */}
              <div className="lg:col-start-1 lg:row-start-2">
                {isGov && (
                  <div className="panel p-6">
                    <p className="label !text-ink">Government and prime contractor support</p>
                    <p className="mt-3 text-sm text-ink-2">Include the scope, due date, delivery location and expected workshare. I respond with a fit assessment before making capability or pricing commitments.</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li><a href={`tel:+1${company.phone.replace(/[^0-9]/g, '')}`} className="inline-flex min-h-[36px] items-center gap-2 text-ink hover:underline"><Phone size={15} className="text-signal-text" />{company.phone}</a></li>
                      <li><a href={`mailto:${company.email}`} className="inline-flex min-h-[36px] items-center gap-2 text-ink hover:underline"><Mail size={15} className="text-signal-text" />{company.email}</a></li>
                    </ul>
                    <Link to="/government-capabilities/" className="mt-3 inline-flex min-h-[44px] items-center font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-text hover:underline">Certifications and capabilities →</Link>
                  </div>
                )}
                {isBuild && (
                  <div className="panel p-6">
                    <p className="label !text-ink">Helps me quote it</p>
                    <ul className="mt-3 space-y-2 text-sm text-ink-2">
                      <Check>What you run on now: the apps, the files, the people</Check>
                      <Check>The machine you’d like it on, if you have one in mind</Check>
                      <Check>When you’d like to start</Check>
                    </ul>
                    <p className="mt-4 text-sm text-ink-2">Not sure which tier? <Link to="/ai-leverage-audit/" className="font-semibold text-ink underline underline-offset-4">Start with the audit</Link>; the fee is credited toward the build.</p>
                  </div>
                )}
                {topic === 'workflow' && (
                  <div className="panel p-6">
                    <p className="label !text-ink">Helps me quote it</p>
                    <ul className="mt-3 space-y-2 text-sm text-ink-2">
                      <Check>The job, step by step, as it runs today</Check>
                      <Check>The apps and files it touches</Check>
                      <Check>Who runs it now, and who should check it</Check>
                    </ul>
                    <p className="mt-4 text-sm text-ink-2">Haven’t had the audit yet? <Link to="/ai-leverage-audit/" className="font-semibold text-ink underline underline-offset-4">Start there</Link>; it’s where the job gets scoped.</p>
                  </div>
                )}
                {topic === 'general' && (
                  <div className="panel p-6">
                    <p className="label !text-ink">What happens next</p>
                    <ol className="mt-3 space-y-2 text-sm text-ink-2">
                      <li className="flex gap-3"><span className="font-mono font-semibold text-alert">01</span>I read every message myself.</li>
                      <li className="flex gap-3"><span className="font-mono font-semibold text-alert">02</span>I reply with a next step, usually a short call or the audit.</li>
                      <li className="flex gap-3"><span className="font-mono font-semibold text-alert">03</span>Scope and price go in writing before any work starts.</li>
                    </ol>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </GridBand>
    </main>
  );
};
