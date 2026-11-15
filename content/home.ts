import { DOORS, FIT_CALL, type Door } from './pricing';
import { FIELD_BRIEF } from './field-brief';
import { LIVE_MODULES } from './modules';
import { revealed } from './announcement';

// The services-first home page (Bruce, 2026-11-14): what Bruce Works does, named by the job, before the product.
// He liked the draft built that day (~/Projects/site/bw-site-home-services-draft) and asked for three things on top of
// it: the themes stay on the home page, custom apps are front and center, and "look at what we already built".
//
// Prices: outside /pricing/ the only prices the site shows are the three doors (content/pricing.ts, Bruce 2026-10-22),
// worded the same way everywhere. So every price here is a door (`door: 'websites'` and so on, drawn by DoorPrice); a
// job without a door links to its price on /pricing/ instead of naming a number. The route check holds this.

export const door = (id: Door['id']) => DOORS.find((d) => d.id === id)!;

/** One spot on the page that names a door's price, or says something that isn't a price. */
export type Cost = { door: Door['id'] } | { text: string };

// Headline: Bruce hasn't picked yet. A is on; the other two from the draft are one swap away:
//   B: ['Websites, apps and AI. ', 'Built for you.', '']
//   C: ['Stop renting twelve apps. ', 'Own one system.', '']
export const HERO = {
  tag: 'The digital handyman',
  /** [before, highlighted, after] */
  headline: ['The handyman for the ', 'digital side', ' of your business.'] as [string, string, string],
  sub: 'Bruce Works builds websites, custom apps and AI agents that do real work, and puts the computer you already own to work. Fewer apps, fewer monthly bills, and it’s done for you, not just advised.',
  fine: '30 minutes, free. Scope and price in writing before work starts.',
};

/** The sample punch list under the hero: what owners call about, and which job fixes it. */
export const PUNCH: { what: string; fix: string; cost: Cost; done: boolean }[] = [
  { what: 'No website', fix: 'A one-page site built for phones. You see it before you pay.', cost: { door: 'websites' }, done: true },
  { what: 'An app that doesn’t exist yet', fix: 'Custom software, built around how you work.', cost: { text: 'Scoped' }, done: true },
  { what: 'A spare computer collecting dust', fix: 'Set up to run your files, docs and one AI agent, privately.', cost: { door: 'command-center' }, done: true },
  { what: 'Too many monthly apps', fix: 'Moved onto one dashboard, on a machine you own.', cost: { text: 'In the build' }, done: true },
  { what: 'Follow-ups done by hand', fix: 'An AI agent drafts them. Nothing goes out until you approve.', cost: { text: 'Agent included' }, done: true },
  { what: 'Not sure where to start', fix: 'The audit: your workflow mapped, and a 30-day plan.', cost: { door: 'audit' }, done: false },
];

/** 01: three steps, the same for every job. */
export const STEPS: [string, string][] = [
  ['Tell me what’s slowing you down', 'A free 30-minute call. I’ll tell you which job fits, or that none does.'],
  ['Get the scope and price in writing', 'Before any work starts. No surprises on the invoice.'],
  ['I build it, then train you on it', 'On your real work, not a demo. Your files and accounts stay yours.'],
];

export type JobIcon = 'site' | 'app' | 'computer' | 'agent' | 'build' | 'workflow' | 'audit';

/** 02: every job, named by what it does rather than by tier. `door` is a door's price; `note` for the rest, which
 * link to their price. `lead` jobs take two columns on wide screens, `full` takes the whole row.
 * No monthly-care tile (Bruce, 2026-11-15: a monthly plan doesn't make sense next to custom apps and people's own
 * software); monthly care and hosting stay on /pricing/. */
export type Job = { icon: JobIcon; title: string; body: string; lead?: boolean; full?: boolean; star?: boolean; tag?: string } & (
  { door: Door['id']; more: { label: string; href: string } } |
  { note: string; more: { label: string; href: string } }
);

export const JOBS: Job[] = [
  { icon: 'site', lead: true, title: 'Websites', door: 'websites',
    body: 'A site built for phones, so new customers find you and call. No website yet? You see yours before you pay.',
    more: { label: 'What you get', href: '/websites/' } },
  { icon: 'app', lead: true, star: true, tag: 'New', title: 'A custom app, built for you', note: 'Scoped · price in writing',
    body: 'Need software that doesn’t exist? Paying every month for an app that almost fits? You get one built around how you work, for the web or your phone.',
    more: { label: 'See what’s already built', href: '#built' } },
  // Bruce, 2026-11-15: "think of it like your own mini app that you can customize how you want, that you can add any
  // feature you want and have it simply just work". Worded "ask for any feature": a new feature gets built in for you.
  { icon: 'computer', title: 'Your own command center', door: 'command-center',
    body: 'Think of it as your own app. Customize it how you want, ask for any feature you need, and it just works. It runs on a computer you already own, privately.',
    more: { label: 'The Command Center', href: '/command-center/' } },
  { icon: 'agent', title: 'AI agents with a job', note: 'One in every build',
    body: 'Each agent gets one job and a briefing. It asks before it does anything risky. You approve from your phone.',
    more: { label: 'Extra agents', href: '/pricing/#add-ons' } },
  { icon: 'build', title: 'The full build', note: 'Up to 3 agents, in your brand',
    body: 'I work out what your company needs, then build all of it: AI agents with their own jobs, your brand, your old apps moved in.',
    more: { label: 'See the price', href: '/pricing/#tiers' } },
  { icon: 'workflow', title: 'One workflow, built', note: 'On its own or in a build',
    body: 'One repeat job taken off your plate, built and handed off. From a new lead to a sent estimate, for example.',
    more: { label: 'See the price', href: '/pricing/#add-ons' } },
  { icon: 'audit', full: true, title: 'Not sure where to start?', door: 'audit',
    body: 'The AI Leverage Audit: your workflow mapped, the first fixes ranked, and a 30-day plan you can run without me.',
    more: { label: 'The audit', href: '/ai-leverage-audit/' } },
];

/** 03: learn it, plan it, or hand it off (DIY, done with you, done for you, in plain words; from Wyeth at the SBDC). */
export const WAYS: { title: string; cost: Cost; body: string; more: { label: string; href: string }; pick?: boolean }[] = [
  { title: 'I’ll learn it', cost: { text: 'Free' },
    body: `One useful tool or workflow a week by email, in plain English. Start with ${FIELD_BRIEF.magnet}: ${FIELD_BRIEF.promise}.`,
    more: { label: `Get ${FIELD_BRIEF.name}`, href: '#field-brief' } },
  { title: 'Plan it with me', cost: { door: 'audit' },
    body: 'We map your workflow together and rank what to fix first. You leave with a 30-day plan you can run without me.',
    more: { label: 'The audit', href: '/ai-leverage-audit/' } },
  { title: 'Do it for me', cost: { door: 'websites' }, pick: true,
    body: 'Websites, custom apps, AI agents and full builds, done start to finish. Then training on your real work, not a demo.',
    more: { label: 'Book a free call', href: FIT_CALL } },
];

/**
 * 04: what's already been built here. Only these four (Bruce, 2026-11-14). Two more are held back on purpose and must
 * not be added without the owner's yes: a shipping desk app (a surprise gift) and a medical staffing app (the client's
 * product). Baby Forecast links to the game the same way the announcement bar does (Bruce, 2026-10-16), and like it
 * never shows a name, a gender or a date.
 */
/** `logo`: each product's own app icon, in public/media/products/ (Bruce, 2026-11-15: "use all the logos"). */
export type Product = { logo: string; name: string; chip: string; live?: boolean; body: string; links: { label: string; href: string; external?: boolean }[]; note?: string };
/** Baby Forecast's line turns to the past tense at the reveal (noon Pacific, 2026-11-15), like the announcement bar. */
export const babyForecastLine = (now: number = Date.now()) => revealed(now)
  ? 'A gender-reveal guessing game, built for my family. Family and friends made their calls before the big reveal.'
  : 'A gender-reveal guessing game, built for my family. Family and friends make their call before the big reveal.';

export const BUILT: Product[] = [
  { logo: '/media/products/bruce-works-os.png', name: 'Bruce Works OS', chip: 'Live demo', live: true,
    body: `The Command Center: your own app for your files, docs, tasks and AI agents, ${LIVE_MODULES.length} tools to start. Customize it how you want, ask for any feature you need, and it just works.`,
    links: [{ label: 'Try the live demo', href: '/live-demo/' }, { label: 'What it does', href: '/command-center/' }] },
  { logo: '/media/products/redlyn.png', name: 'Redlyn', chip: 'iOS',  // iOS only for now; an Android plan exists, nothing built (2026-11-15)
    body: 'The mileage and car app. It catches drives on its own, asks one tap about the rest, and keeps your garage in order.',
    links: [{ label: 'redlyn.app', href: 'https://redlyn.app/', external: true }] },
  // iOS and Android (Bruce, 2026-11-15); chalklyn.app is live with its coming-soon page (checked 2026-11-15)
  { logo: '/media/products/chalklyn.png', name: 'Chalklyn', chip: 'iOS · Android',
    body: 'A time clock for trades crews. Scan the foreman’s code, the foreman signs the day, and the signed hours stay yours.',
    links: [{ label: 'chalklyn.app', href: 'https://chalklyn.app/', external: true }] },
  { logo: '/media/products/baby-forecast.svg', name: 'Baby Forecast', chip: 'Family',
    body: babyForecastLine(),
    links: [{ label: 'gender.bruceworks.net', href: 'https://gender.bruceworks.net/', external: true }] },
];
export const BUILT_LEDE = 'Each of these started as an everyday problem: running a business from one screen, logging miles, proving hours, calling a baby’s gender. Yours can be next.';
