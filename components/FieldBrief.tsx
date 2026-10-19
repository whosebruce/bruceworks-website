import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { Check, Display, GridBand, OpTag, PhotoPanel, SectionHeader } from './brand';
import { FIELD_BRIEF, FIELD_BRIEF_ENDPOINT, FIELD_BRIEF_ON, NO_PROMPT_PATHS, type Surface } from '../content/field-brief';

// The Field Brief signup boxes (content/field-brief.ts has the wording and the rules): one form, used by the homepage
// band, the footer strip, the prompt, and the opt-in box on the contact and audit forms. Nothing here renders until the
// list has somewhere to send a signup (FIELD_BRIEF_ON).

const KEY = 'bw.fieldBrief';              // { joinedAt?, closedAt? } in this browser
const SHOWN = 'bw.fieldBrief.shown';      // the prompt showed this visit (sessionStorage)
const QUIET_DAYS = 30;                    // after "No thanks", no prompt for this long
const ARM_MS = 8000;                      // desktop: no exit prompt in a visit's first 8 seconds

type Saved = { joinedAt?: string; closedAt?: string };
const saved = (): Saved => {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
};
const save = (patch: Saved) => {
  try { localStorage.setItem(KEY, JSON.stringify({ ...saved(), ...patch })); } catch { /* storage blocked: fine */ }
};

const signupBody = (email: string, firstName: string, surface: Surface) => {
  const body = new URLSearchParams({ email_address: email.trim() });
  if (firstName.trim()) body.set('fields[first_name]', firstName.trim().slice(0, 80));
  body.set('fields[signup_source]', surface);
  return body;
};

type Result = { ok: true } | { ok: false; message: string };

/** One signup to Kit's form (or the local stand-in). */
async function subscribe(email: string, firstName: string, surface: Surface): Promise<Result> {
  const body = signupBody(email, firstName, surface);
  try {
    const r = await fetch(FIELD_BRIEF_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
    if (!r.ok) {
      const j = await r.json().catch(() => null) as { errors?: { messages?: string[] } } | null;
      const bad = (j?.errors?.messages ?? []).some((m) => /email/i.test(m));
      return { ok: false, message: bad ? 'That email address doesn’t look right. Check it and try again.' : 'That didn’t go through. Try again, or email info@bruceworks.net.' };
    }
  } catch {
    // A plain form post is a "simple" request, so it reaches Kit even when Kit doesn't let another site read the
    // answer (the browser then throws). Only being offline is a real failure.
    if (navigator.onLine === false) return { ok: false, message: 'You look offline. Try again once you’re connected.' };
  }
  save({ joinedAt: new Date().toISOString() });
  return { ok: true };
}

/** The contact and audit forms leave the page for FormSubmit right after this, so it's sent as a keepalive post and
 * nobody waits on the answer. Their FormSubmit email also carries field_brief=yes, so Bruce sees the box was ticked. */
export function fieldBriefOnSubmit(form: HTMLFormElement, surface: Surface) {
  if (!FIELD_BRIEF_ON) return;
  const box = form.elements.namedItem('field_brief');
  const email = form.elements.namedItem('email');
  const name = form.elements.namedItem('name');
  if (!(box instanceof HTMLInputElement) || !box.checked || !(email instanceof HTMLInputElement) || !email.value.trim()) return;
  const first = name instanceof HTMLInputElement ? name.value.trim().split(/\s+/)[0] ?? '' : '';
  try {
    void fetch(FIELD_BRIEF_ENDPOINT, { method: 'POST', body: signupBody(email.value, first, surface), mode: 'no-cors', keepalive: true }).catch(() => {});
    save({ joinedAt: new Date().toISOString() });
  } catch { /* the inquiry itself still goes through */ }
}

/** The unchecked box for the contact and audit forms. */
export const FieldBriefOptIn: React.FC<{ id: string }> = ({ id }) => !FIELD_BRIEF_ON ? null : (
  <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-theme border-theme border-line p-3 text-sm text-ink hover:border-signal">
    <input id={id} type="checkbox" name="field_brief" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--c-signal))]" />
    <span>{FIELD_BRIEF.optIn} <a href="/privacy-policy/#email-list" className="text-ink-2 underline underline-offset-2 hover:text-ink">Privacy policy</a></span>
  </label>
);

const Consent: React.FC<{ id: string; className?: string }> = ({ id, className = '' }) => (
  <p id={id} className={`text-xs leading-relaxed text-ink-3 ${className}`}>
    {FIELD_BRIEF.consent} <a href="/privacy-policy/#email-list" className="underline underline-offset-2 hover:text-ink">Privacy policy</a>
  </p>
);

/** The form itself. `row` puts the email and the button side by side from sm up (the footer). */
export const FieldBriefForm: React.FC<{
  surface: Surface; idPrefix: string; withName?: boolean; row?: boolean; focusOnMount?: boolean; className?: string;
}> = ({ surface, idPrefix, withName = false, row = false, focusOnMount = false, className = '' }) => {
  const [state, setState] = React.useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = React.useState('');
  const emailRef = React.useRef<HTMLInputElement>(null);
  const doneRef = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => { if (focusOnMount) emailRef.current?.focus(); }, [focusOnMount]);
  React.useEffect(() => { if (state === 'done') doneRef.current?.focus(); }, [state]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = (f.elements.namedItem('email') as HTMLInputElement).value;
    const first = withName ? (f.elements.namedItem('first_name') as HTMLInputElement).value : '';
    const trap = (f.elements.namedItem('company_site') as HTMLInputElement).value;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    setError('');
    setState('sending');
    if (trap) { setState('done'); return; }            // a bot filled the hidden field: say thanks, send nothing
    const r = await subscribe(email, first, surface);
    if (r.ok) setState('done'); else { setState('idle'); setError(r.message); emailRef.current?.focus(); }
  };

  if (state === 'done') {
    return (
      <div className={className} data-field-brief-inline>
        <p ref={doneRef} tabIndex={-1} className="display text-3xl outline-none">
          <span aria-hidden="true" className="sig">☑ </span>{FIELD_BRIEF.done.title}
        </p>
        <p className="mt-2 text-ink-2" role="status">{FIELD_BRIEF.done.body}</p>
      </div>
    );
  }
  const ids = { name: `${idPrefix}-first`, email: `${idPrefix}-email`, consent: `${idPrefix}-consent`, error: `${idPrefix}-error` };
  return (
    <form onSubmit={submit} noValidate className={`relative ${className}`} data-field-brief-inline aria-describedby={ids.consent}>
      <div className={row ? 'flex flex-col gap-3 sm:flex-row sm:items-end' : 'space-y-3'}>
        {withName && (
          <div className={row ? 'sm:w-40' : ''}>
            <label htmlFor={ids.name} className="mb-1.5 block text-sm font-semibold text-ink">First name <span className="font-normal text-ink-3">(optional)</span></label>
            <input id={ids.name} name="first_name" type="text" autoComplete="given-name" maxLength={80} className="field" />
          </div>
        )}
        <div className={row ? 'min-w-0 flex-1' : ''}>
          <label htmlFor={ids.email} className={row ? 'sr-only' : 'mb-1.5 block text-sm font-semibold text-ink'}>Email</label>
          <input ref={emailRef} id={ids.email} name="email" type="email" required autoComplete="email" inputMode="email" maxLength={254}
            placeholder="you@yourbusiness.com" className="field" aria-invalid={error ? true : undefined} aria-describedby={error ? ids.error : undefined} />
        </div>
        {/* bots fill every field; people never see this one */}
        <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
          <label>Company website<input name="company_site" type="text" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <button type="submit" disabled={state === 'sending'} className={`btn btn-primary ${row ? 'sm:shrink-0' : 'w-full'}`}>
          {state === 'sending' ? 'Sending…' : <>Send me the PDF <ArrowRight size={18} aria-hidden="true" /></>}
        </button>
      </div>
      {error && <p id={ids.error} role="alert" className="mt-3 text-sm font-semibold text-alert">{error}</p>}
      <Consent id={ids.consent} className="mt-3" />
    </form>
  );
};

const Cover: React.FC<{ className?: string; tilt?: number }> = ({ className = '', tilt = -2 }) => {
  const c = FIELD_BRIEF.cover;
  return (
    <PhotoPanel tilt={tilt} className={className}>
      <img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" decoding="async" className="block h-auto w-full" />
    </PhotoPanel>
  );
};

/** Homepage: the low-commitment step after the tiers, before the audit. */
export const FieldBriefBand: React.FC = () => !FIELD_BRIEF_ON ? null : (
  <GridBand tone="raised" id="field-brief">
    <div className="py-16 md:py-24">
      <SectionHeader num="07" label={FIELD_BRIEF.name} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div>
          <Display className="reveal text-5xl md:text-6xl">Starting out? <span className="sig">Look legit on day one.</span></Display>
          <p className="reveal mt-5 max-w-xl text-lg text-ink-2"><strong className="text-ink">{FIELD_BRIEF.magnet}</strong>: {FIELD_BRIEF.promise}. One page, free.</p>
          <ul className="reveal mt-6 space-y-2.5 text-ink-2">
            {FIELD_BRIEF.points.map((p) => <Check key={p}>{p}</Check>)}
          </ul>
        </div>
        <div className="panel grid gap-6 p-6 md:p-8">
          <Cover tilt={-1} className="w-full" />
          <FieldBriefForm surface="home" idPrefix="fb-home" withName />
        </div>
      </div>
    </div>
  </GridBand>
);

/** The strip at the top of every page's footer. */
export const FieldBriefFooter: React.FC = () => !FIELD_BRIEF_ON ? null : (
  <div className="border-b border-line-2" data-field-brief-strip>
    <div className="container-x grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center lg:gap-12">
      <div>
        <OpTag op="FM-01">{FIELD_BRIEF.name}</OpTag>
        <p className="display mt-4 text-3xl md:text-4xl">One useful tool a week. <span className="sig">Free kit to start.</span></p>
        <p className="mt-2 max-w-xl text-ink-2">Plain English for small businesses. Join and get {FIELD_BRIEF.magnet} (PDF): {FIELD_BRIEF.promise}.</p>
      </div>
      <FieldBriefForm surface="footer" idPrefix="fb-footer" row />
    </div>
  </div>
);

// ── the prompt ────────────────────────────────────────────────────────────────────────────────────────────────────

const quiet = () => {
  const s = saved();
  if (s.joinedAt) return true;
  if (s.closedAt && Date.now() - Date.parse(s.closedAt) < QUIET_DAYS * 864e5) return true;
  try { return sessionStorage.getItem(SHOWN) === '1'; } catch { return false; }
};
// a signup box, the homepage band or the footer strip already in view: the prompt would only repeat it
const inlineOnScreen = () => Array.from(document.querySelectorAll('[data-field-brief-inline], #field-brief, [data-field-brief-strip]')).some((el) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
});
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),[tabindex]:not([tabindex="-1"])';

/** Desktop: a modal when the pointer leaves through the top of the window. Phones and tablets: a small card that
 * slides up after half the page is read. Never on arrival; see content/field-brief.ts for every rule. */
export const FieldBriefPrompt: React.FC = () => {
  const { pathname, search } = useLocation();
  const [mode, setMode] = React.useState<null | 'exit' | 'scroll'>(null);
  const blocked = !FIELD_BRIEF_ON || NO_PROMPT_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const open = React.useCallback((m: 'exit' | 'scroll') => {
    try { sessionStorage.setItem(SHOWN, '1'); } catch { /* fine */ }
    setMode(m);
  }, []);
  const close = React.useCallback((remember: boolean) => {
    if (remember) save({ closedAt: new Date().toISOString() });
    setMode(null);
  }, []);

  // dev only: ?fieldbrief=exit or ?fieldbrief=scroll opens it at once, for reviewing the design
  React.useEffect(() => {
    if (!import.meta.env.DEV || blocked) return;
    const m = new URLSearchParams(search).get('fieldbrief');
    if (m === 'exit' || m === 'scroll') setMode(m);
  }, [search, blocked]);

  React.useEffect(() => { if (blocked) setMode(null); }, [blocked]);

  React.useEffect(() => {
    if (blocked || mode || quiet()) return;
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    if (desktop) {
      const onOut = (e: MouseEvent) => {
        if (e.relatedTarget || e.clientY > 0 || performance.now() < ARM_MS || quiet() || inlineOnScreen()) return;
        open('exit');
      };
      document.addEventListener('mouseout', onOut);
      return () => document.removeEventListener('mouseout', onOut);
    }
    const onScroll = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (room < 600 || window.scrollY / room < 0.5 || quiet() || inlineOnScreen()) return;
      open('scroll');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [blocked, mode, pathname, open]);

  if (!mode) return null;
  return mode === 'exit' ? <ExitDialog onClose={close} /> : <SlideIn onClose={close} />;
};

const ExitDialog: React.FC<{ onClose: (remember: boolean) => void }> = ({ onClose }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  // where focus was before the dialog (read while rendering: the form focuses its email field before effects here run)
  const [back] = React.useState(() => document.activeElement as HTMLElement | null);
  React.useEffect(() => {
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(true); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === first || !ref.current.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.style.overflow = overflow;
      if (back && document.contains(back)) back.focus();
    };
  }, [onClose, back]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" onClick={() => onClose(true)} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="fb-dialog-title" aria-describedby="fb-dialog-desc"
        className="relative grid w-full max-w-[860px] overflow-hidden border-theme border-line bg-ground md:grid-cols-[300px_minmax(0,1fr)] motion-safe:animate-[fade-in-up_0.22s_ease-out_both]"
        style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="hidden items-center justify-center border-r border-line-2 bg-ground-2 p-7 md:flex">
          <Cover tilt={-3} className="w-full" />
        </div>
        <div className="p-7 md:p-9">
          <button type="button" onClick={() => onClose(true)} aria-label="Close"
            className="absolute right-2 top-2 grid h-11 w-11 place-items-center text-ink-3 hover:text-ink">
            <X size={20} aria-hidden="true" />
          </button>
          <OpTag op="FM-01">Free kit</OpTag>
          <Display id="fb-dialog-title" className="mt-5 text-4xl md:text-[2.75rem]">Before you go: <span className="sig">take the kit.</span></Display>
          <p id="fb-dialog-desc" className="mt-3 text-ink-2"><strong className="text-ink">{FIELD_BRIEF.magnet}</strong>: {FIELD_BRIEF.promise}. One page, free, then one useful tool or workflow a week by email.</p>
          <FieldBriefForm surface="exit" idPrefix="fb-exit" withName focusOnMount className="mt-6" />
          <button type="button" onClick={() => onClose(true)} className="mt-3 min-h-[44px] text-sm font-semibold text-ink-3 underline underline-offset-4 hover:text-ink">No thanks</button>
        </div>
      </div>
    </div>
  );
};

const SlideIn: React.FC<{ onClose: (remember: boolean) => void }> = ({ onClose }) => {
  const [form, setForm] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(true); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <section role="dialog" aria-modal="false" aria-labelledby="fb-slide-title"
      className="fixed inset-x-3 bottom-3 z-[35] mx-auto max-w-xl border-theme border-line bg-ground shadow-[0_10px_30px_-10px_rgb(0_0_0/0.45)] motion-safe:animate-[fade-in-up_0.22s_ease-out_both]"
      style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="h-1 bg-signal" style={{ borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }} aria-hidden="true" />
      <div className="flex items-start gap-3 py-3 pl-4 pr-1">
        <div className="min-w-0 flex-1">
          <p className="label !text-signal-text">Free PDF · {FIELD_BRIEF.name}</p>
          <p id="fb-slide-title" className="mt-1 font-semibold leading-snug text-ink">{FIELD_BRIEF.magnet}: {FIELD_BRIEF.promise}</p>
        </div>
        <button type="button" onClick={() => onClose(true)} aria-label="Close"
          className="grid h-11 w-11 shrink-0 place-items-center text-ink-3 hover:text-ink">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="px-4 pb-4">
        {form
          ? <FieldBriefForm surface="scroll" idPrefix="fb-scroll" focusOnMount />
          : (
            <div className="flex gap-2">
              <button type="button" onClick={() => setForm(true)} className="btn btn-primary flex-1">Send it to me</button>
              <button type="button" onClick={() => onClose(true)} className="btn btn-outline">No thanks</button>
            </div>
          )}
      </div>
    </section>
  );
};
