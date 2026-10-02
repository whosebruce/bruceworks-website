import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, MapPin, MessagesSquare, Video } from 'lucide-react';
import { Display, GridBand, OpTag, SectionHeader, useReveal } from '../components/brand';
import { ContactCTA } from '../components/ContactCTA';
import { CalInline, type CalState } from '../components/book/CalInline';
import { SwapField } from '../components/book/SwapField';
import { auditPrices } from '../components/offers/tiers';
import { SWAPS } from '../content/replaced';

// /book/: where every "Book the audit" button lands. Bruce's own Cal.com (self-hosted) sits in the middle, and the apps
// the Command Center replaces fall around it as blocks you can grab, throw and flip. Booking is free; the audit is
// invoiced after intake (Bruce, 2026-10-01). If the calendar can't load, the request form below still works.

const EVENTS = {
  remote: { link: 'whosebruce/ai-audit', label: 'Remote', icon: Video },
  person: { link: 'whosebruce/ai-audit-in-person', label: 'In person, San Diego', icon: MapPin },
  fit: { link: 'whosebruce/fit-call', label: 'Free fit call', icon: MessagesSquare },
} as const;
type Where = keyof typeof EVENTS;

export const Book: React.FC = () => {
  useReveal();
  const audit = auditPrices();
  const price: Record<Where, string> = { remote: audit.remote, person: audit.inPerson, fit: '30 min' };
  const stage = React.useRef<HTMLElement>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const ledge = React.useRef<HTMLDivElement>(null);
  const solids = React.useMemo(() => [card], []);
  const [where, setWhere] = React.useState<Where>('remote');
  const [opened, setOpened] = React.useState<Set<Where>>(() => new Set(['remote']));
  const [state, setState] = React.useState<Record<Where, CalState>>({ remote: 'loading', person: 'loading', fit: 'loading' });
  const [booked, setBooked] = React.useState(false);
  const pick = (w: Where) => { setWhere(w); setOpened((o) => new Set(o).add(w)); };
  const now = state[where];

  return (
    <main>
      <section ref={stage} aria-labelledby="book-title" className="texture relative overflow-hidden border-b border-line">
        <SwapField stage={stage} solids={solids} ledge={ledge} flipAll={booked} />

        <div className="container-x pointer-events-none relative z-20 pt-10 text-center md:pt-14">
          <OpTag op="OP-00">AI Leverage Audit</OpTag>
          <Display as="h1" id="book-title" className="mx-auto mt-5 max-w-4xl text-5xl md:text-7xl">Pick a time. <span className="sig">Bring the mess.</span></Display>
          <p className="mx-auto mt-4 max-w-2xl text-ink-2 md:text-lg" style={{ textShadow: '0 0 3px rgb(var(--c-ground)), 0 0 10px rgb(var(--c-ground)), 0 0 18px rgb(var(--c-ground))' }}>
            Every block falling around the calendar is an app you pay for, in money or in data. <span className="hidden md:inline">Grab one, throw it, or tap it to see what takes its place.</span><span className="md:hidden">Tap one to see what takes its place.</span>
          </p>
        </div>

        <div ref={ledge} aria-hidden="true" className="relative z-20 min-h-[170px] md:min-h-[104px]" />

        <div className="container-x relative z-30 pb-14 md:pb-20">
          <div ref={card} className="chamfer mx-auto max-w-[1000px]">
            <div className="chamfer-in flex flex-col bg-ground-2">
              <div className="flex flex-wrap items-center gap-3 border-b border-line bg-ground-3 px-3 py-2.5 sm:px-4">
                <span className="label flex items-center gap-2"><CalendarCheck size={14} className="text-signal-text" /> AI Leverage Audit // pick a time</span>
                <div role="group" aria-label="Where" className="flex w-full flex-wrap gap-1 sm:ml-auto sm:w-auto">
                  {(Object.keys(EVENTS) as Where[]).map((w) => {
                    const E = EVENTS[w]; const on = where === w;
                    return (
                      <button key={w} type="button" aria-pressed={on} onClick={() => pick(w)}
                        className={`chip flex min-h-[36px] items-center gap-1.5 border-theme px-2.5 text-[12px] sm:px-3 ${on ? 'border-signal bg-signal text-signal-ink' : 'border-line text-ink-2 hover:text-ink'}`}
                        style={{ borderRadius: 'var(--radius)' }}>
                        <E.icon size={13} /> <span className="hidden sm:inline">{E.label}</span><span className="sm:hidden">{{ remote: 'Remote', person: 'In person', fit: 'Free call' }[w]}</span> · {price[w]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-[560px] md:min-h-[640px]">
                {(Object.keys(EVENTS) as Where[]).filter((w) => opened.has(w)).map((w) => (
                  <div key={w} className={w === where && state[w] !== 'failed' ? 'block' : 'hidden'}>
                    <CalInline link={EVENTS[w].link} onState={(s) => setState((p) => ({ ...p, [w]: s }))} onBooked={() => setBooked(true)} />
                  </div>
                ))}
                {now === 'loading' && (
                  <p className="label pointer-events-none absolute inset-x-0 top-1/3 text-center">Loading the calendar…</p>
                )}
                {now === 'failed' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <p className="display text-3xl md:text-4xl">The calendar is getting set up.</p>
                    <p className="max-w-md text-ink-2">Send the request instead and Bruce books the time with you himself. {where === 'fit' ? 'Same free call.' : 'Same audit, same price.'}</p>
                    <a href="#contact-form" className="btn btn-primary">Request the audit <ArrowRight size={18} /></a>
                  </div>
                )}
              </div>

              <div className="border-t border-line px-4 py-3 text-sm text-ink-2" aria-live="polite">
                {booked
                  ? <p><b className="text-ink">Booked.</b> The invite is in your email. Every block just flipped to what replaces it; that’s what we’ll talk about.</p>
                  : where === 'fit'
                    ? <p><b className="text-ink">Free, 30 minutes, by video.</b> We see whether the audit makes sense for you. No deliverable and no pressure. Please don’t put passwords or account numbers in the booking form.</p>
                    : <p><b className="text-ink">Free to book.</b> You’re invoiced after intake: {audit.remote} remote, {audit.inPerson} in person in San Diego, with one deliverable you keep. Your roadmap lands within 7 business days of complete intake. Please don’t put passwords or account numbers in the booking form.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── what the blocks were: the same list, readable ── */}
      <GridBand>
        <div className="py-12 md:py-20">
          <SectionHeader num="01" label="What falls, and what takes its place" />
          <Display className="reveal mt-6 max-w-3xl text-4xl md:text-5xl">{SWAPS.length} apps. <span className="sig">One Command Center.</span></Display>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {([['module', 'Command Center modules', 'Built in, on a machine you own.'], ['open', 'Open-source apps', 'Bruce self-hosts them and ties them into your business.']] as const).map(([k, title, sub]) => (
              <div key={k}>
                <p className="label">{title}</p>
                <p className="mt-1 text-sm text-ink-3">{sub}</p>
                <ul className="mt-4 divide-y divide-line-2 border-y border-line-2">
                  {SWAPS.filter((s) => s.kind === k).map((s) => (
                    <li key={s.paid} className="flex items-baseline justify-between gap-4 py-2.5">
                      <span className="text-ink-2">{s.paid}</span>
                      <span className="text-right font-semibold text-ink">{s.with}{s.note && <span className="block text-xs font-normal text-ink-3">{s.note}</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-ink-3">
            The open-source apps come with <Link to="/pricing/#hosted" className="underline underline-offset-4 hover:text-ink">Hosted by Bruce</Link> (coming soon). Not sure what you’d drop? That’s what the audit is for. <Link to="/ai-leverage-audit/" className="underline underline-offset-4 hover:text-ink">What the audit covers →</Link>
          </p>
        </div>
      </GridBand>

      <ContactCTA />
    </main>
  );
};
