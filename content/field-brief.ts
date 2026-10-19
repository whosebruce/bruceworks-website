/// <reference types="vite/client" />
// The Field Brief: the Bruce Works email list (started 2026-10-19). The free PDF, The Look-Legit Kit (ten tools that
// make a new business look professional), is the reason to join; one useful tool or workflow a week is what people stay
// for. The kit replaced the first draft, The AI Field Manual, the same day (Bruce: "way less wordy").
//
// Signups go from the visitor's browser straight to Kit's public form address: no key on the site, nothing of ours in
// between. KIT_FORM_ACTION stays empty until Bruce makes the Kit form (field-brief/README.md in the brand kit), and
// while it's empty the production build shows no signup anywhere. The dev server (and `vite preview`) answers
// /__field-brief/… itself (scripts/field-brief-stub.mjs), a stand-in for Kit that keeps signups in .field-brief-stub/.
// VITE_FIELD_BRIEF_ENDPOINT overrides both, for testing a production build against the stand-in.
//
// Where the prompt may show (components/FieldBrief.tsx): desktop only when the pointer leaves the page through the top
// (exit intent), phones and tablets only after half the page is read. Never on arrival, never on the pages where
// someone is already booking or writing to Bruce, at most once a visit, and not again for 30 days after "No thanks".

/** Kit → the form → Embed → HTML: the form's action URL, e.g. https://app.kit.com/forms/1234567/subscriptions */
export const KIT_FORM_ACTION = '';

export const FIELD_BRIEF_ENDPOINT: string =
  (import.meta.env.VITE_FIELD_BRIEF_ENDPOINT as string | undefined) || KIT_FORM_ACTION
  || (import.meta.env.DEV ? '/__field-brief/forms/stub/subscriptions' : '');

/** Off until there's somewhere to send a signup. */
export const FIELD_BRIEF_ON = FIELD_BRIEF_ENDPOINT !== '';

/** Which box someone used. It rides along as Kit's custom field signup_source, then into Twenty and bw-intel. */
export type Surface = 'home' | 'footer' | 'exit' | 'scroll' | 'contact' | 'audit';

export const FIELD_BRIEF = {
  name: 'The Field Brief',
  magnet: 'The Look-Legit Kit',
  promise: '10 tools that make a new business look professional',
  /** the cover of the PDF, landscape (rendered from field-brief/legit-kit in the brand kit) */
  cover: { src: '/media/field-brief/look-legit-kit-cover.webp', w: 640, h: 495, alt: 'The Look-Legit Kit: ten tool cards, from a domain to a password manager, each with its price and a QR code' },
  points: [
    'Domain, email, website, CRM, booking, e-signatures and more, in the order to set them up',
    'What each one costs, and the one I’d pick',
    'Then one useful tool or workflow a week by email. Plain English, no hype.',
  ],
  /** Shown under every signup box. The privacy policy's "Email list" section says the same in full. */
  consent: 'You’ll get the PDF and the weekly Field Brief by email. Unsubscribe in one click, any time. Never sold.',
  /** The unchecked box on the contact and audit forms. */
  optIn: 'Send me the weekly Field Brief and the free Look-Legit Kit (PDF). Unsubscribe any time.',
  done: { title: 'Check your inbox.', body: 'Your copy of The Look-Legit Kit is on its way. Open the email and tap the button to get it. Nothing there in 10 minutes? Check spam, or email info@bruceworks.net.' },
} as const;

/** Pages where the prompt never shows: someone is already booking, writing in, or inside the full-screen demo. */
export const NO_PROMPT_PATHS = ['/book', '/contact', '/ai-leverage-audit', '/live-demo', '/review', '/privacy-policy', '/sms-consent'];
