import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CalendarCheck, ExternalLink, MapPin, MessagesSquare, Video } from 'lucide-react';
import { Display, GridBand, OpTag, SectionHeader, useReveal } from '../components/brand';
import { ContactCTA } from '../components/ContactCTA';
import { CAL_ORIGIN, CalInline, type CalState } from '../components/book/CalInline';
import { SwapField } from '../components/book/SwapField';
import { auditPrices } from '../components/offers/tiers';
import { AUDIT_PROMISE, BOOKING_PRIVACY } from '../content/pricing';
import { SWAPS } from '../content/replaced';

// /book/: where every "Book the audit" button lands. Bruce's own Cal.com (self-hosted at schedule.bruceworks.net) sits in
// the middle, and the apps the Command Center replaces fall around it as blocks you can grab, throw and flip. Booking is
// free; the audit is invoiced after intake (Bruce, 2026-10-01). Each choice loads its own event (set up by Mira); the
// selected event's direct link is always on the card, and the request form below still works if the calendar doesn't.
// `?event=in-person` or `?event=fit` opens on that choice; the remote audit is the default.

const EVENTS = {
  remote: { link: 'whosebruce/ai-audit', label: 'Remote', icon: Video },
  person: { link: 'whosebruce/ai-audit-in-person', label: 'In person, San Diego', icon: MapPin },
  fit: { link: 'whosebruce/fit-call', label: 'Free fit call', icon: MessagesSquare },
} as const;
type Where = keyof typeof EVENTS;
const FROM_PARAM: Record<string, Where> = { remote: 'remote', person: 'person', 'in-person': 'person', fit: 'fit', 'fit-call': 'fit' };
const TO_PARAM: Record<Where, string | null> = { remote: null, person: 'in-person', fit: 'fit' };

export const Book: React.FC = () => {
  useReveal();
  const audit = auditPrices();
  const price: Record<Where, string> = { remote: audit.remote, person: audit.inPerson, fit: '30 min' };
  const stage = React.useRef<HTMLElement>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const ledge = React.useRef<HTMLDivElement>(null);
  const solids = React.useMemo(() => [card], []);
  const [params, setParams] = useSearchParams();
  const [where, setWhere] = React.useState<Where>(() => FROM_PARAM[params.get('event') ?? ''] ?? 'remote');
  const [opened, setOpened] = React.useState<Set<Where>>(() => new Set([where]));
  const [state, setState] = React.useState<Record<Where, CalState>>({ remote: 'loading', person: 'loading', fit: 'loading' });
  const [booked, setBooked] = React.useState(false);
  const pick = (w: Where) => {
    setWhere(w); setOpened((o) => new Set(o).add(w));
    const p = new URLSearchParams(params); const v = TO_PARAM[w];
    if (v) p.set('event', v); else p.delete('event');
    setParams(p, { replace: true, preventScrollReset: true });
  };
  const direct = `${CAL_ORIGIN}/${EVENTS[where].link}`;
  const tab = (w: Where, secondary = false) => {
    const E = EVENTS[w]; const on = where === w;
    return (
      <button key={w} type="button" aria-pressed={on} onClick={() => pick(w)}
        className={`chip flex min-h-[36px] items-center gap-1.5 border-theme px-2.5 text-[12px] sm:px-3 ${on ? 'border-signal bg-signal text-signal-ink' : secondary ? 'border-dashed border-line text-ink-2 hover:text-ink' : 'border-line text-ink-2 hover:text-ink'}`}
        style={{ borderRadius: 'var(--radius)' }}>
        <E.icon size={13} />
        {secondary
          ? <span>Not sure? <span className="hidden sm:inline">Book a </span>free fit call</span>
          : <><span className="hidden sm:inline">{E.label}</span><span className="sm:hidden">{w === 'remote' ? 'Remote' : 'In person'}</span> · {price[w]}</>}
      </button>
    );
  };
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

        {/* the band the blocks land in, and the calendar's wrapper, let clicks through to the blocks; only the card itself takes them */}
        <div ref={ledge} aria-hidden="true" className="pointer-events-none relative z-20 min-h-[170px] md:min-h-[104px]" />

        <div className="container-x pointer-events-none relative z-30 pb-14 md:pb-20">
          <div ref={card} className="chamfer pointer-events-auto mx-auto max-w-[1000px]">
            <div className="chamfer-in flex flex-col bg-ground-2">
              <div className="flex flex-wrap items-center gap-3 border-b border-line bg-ground-3 px-3 py-2.5 sm:px-4">
                <span className="label flex items-center gap-2"><CalendarCheck size={14} className="text-signal-text" /> AI Leverage Audit // pick a time</span>
                <div role="group" aria-label="Which booking" className="flex w-full flex-wrap gap-1 sm:ml-auto sm:w-auto">
                  {tab('remote')}{tab('person')}{tab('fit', true)}
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
                    <p className="display text-3xl md:text-4xl">The calendar didn’t load here.</p>
                    <p className="max-w-md text-ink-2">Open it on Bruce’s scheduling site instead, or send a request and Bruce books the time with you himself. {where === 'fit' ? 'Same free call.' : 'Same audit, same price.'}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <a href={direct} target="_blank" rel="noopener" className="btn btn-primary">Open the calendar <ExternalLink size={16} /></a>
                      <a href="#contact-form" className="btn btn-outline">Send a request <ArrowRight size={18} /></a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t border-line px-4 py-3 text-sm text-ink-2" aria-live="polite">
                {booked
                  ? <p><b className="text-ink">Booked.</b> The invite is in your email. Every block just flipped to what replaces it; that’s what we’ll talk about.</p>
                  : where === 'fit'
                    ? <p><b className="text-ink">Truly free: 30 minutes on Zoom.</b> We see whether the audit makes sense for you. No deliverable and no pressure.</p>
                    : <>
                        <p><b className="text-ink">Free to book. The audit itself is {where === 'person' ? `${audit.inPerson} in person in San Diego County (90 minutes at your address)` : `${audit.remote} remote (60 minutes on Zoom)`},</b> invoiced after intake.</p>
                        <p>{AUDIT_PROMISE}</p>
                      </>}
                <p className="text-ink-3">{BOOKING_PRIVACY}</p>
                <p><a href={direct} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 hover:text-ink">Open this calendar on schedule.bruceworks.net <ExternalLink size={12} /></a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── what the blocks were: the same list, readable ── */}
      <GridBand>
        {/* on phones the grid's rules sit right at the content's edge, and this two-sided list ran into them */}
        <div className="px-4 py-12 md:px-0 md:py-20">
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
