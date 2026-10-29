// The tiers, approved by Bruce on 2026-10-01 (the audit prices are his existing ones). Change a number here only with
// his say-so. Done-for-you only: the Command Center's code stays private; every tier is Bruce setting it up for you.
// 2026-10-04 (Bruce): Tier 04 Command is now Bruce hosting it, $295 a month with everything the old monthly care had,
// after a Foundation or Operator build, limited slots, fit confirmed first. Care on the client's own machine stays as
// its own monthly option at the same price (CARE below).
// 2026-10-06 (Bruce): a workflow buildout can be booked on its own after the audit, in the tools the client already uses
// (no Command Center needed). No bare install or cheap VPS setup fee: a server in the client's name is still a
// Foundation or Operator build. The audit fee comes off a standalone workflow buildout booked within 30 days, too.

export const PRICES_APPROVED = true;

export type Tier = {
  id: 'recon' | 'foundation' | 'operator' | 'command' | 'gov';
  op: string;
  name: string;
  price: string;
  /** The price is where it starts: the business sets the rest, in writing before work starts. */
  from?: boolean;
  per?: string;
  sub: string;
  forWho: string;
  includes: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    id: 'recon', op: 'TIER 01', name: 'Recon', price: '$197', per: 'remote · $297 in person', sub: 'AI Leverage Audit',
    forWho: 'You want to know what to fix first, before you spend on anything.',
    includes: ['Your workflow mapped, bottlenecks named', 'Top opportunities, ranked by time saved', 'What data stays private and where it lives', 'A 30-day action plan you can run without me', 'One deliverable you keep: pick from four', 'Delivered in 7 business days after intake', 'Audit fee credited toward a build within 30 days'],
    cta: { label: 'Book the audit', href: '/book/' },
  },
  {
    id: 'foundation', op: 'TIER 02', name: 'Foundation', price: '$1,950', from: true, per: 'one time', sub: 'Command Center install',
    forWho: 'You want one dashboard for your files, notes, docs and one AI agent.',
    includes: ['Installed on a machine you own', 'Up to 6 modules, switched on for how you work', 'One AI agent, set up and briefed', 'A stock theme (Field Manual, Harbor and more)', 'Your files organized into one structure', 'One 90-minute training session, 14 days of support'],
    cta: { label: 'Start with Foundation', href: '/contact/?topic=foundation' },
  },
  {
    id: 'operator', op: 'TIER 03', name: 'Operator', price: '$4,950', from: true, per: 'one time', sub: 'Full build', featured: true,
    forWho: 'You want the whole super app, in your brand, with your old apps moved in.',
    includes: ['Every module, switched on or off as you like', 'Up to 3 AI agents with their own jobs', 'A custom theme built from your brand', 'Your notes, docs and files moved in from your old apps', 'Two workflows built end to end', 'Two training sessions, 30 days of support'],
    cta: { label: 'Build the full system', href: '/contact/?topic=operator' },
  },
  {
    id: 'command', op: 'TIER 04', name: 'Command', price: '$295', per: 'per month', sub: 'Hosted by Bruce, kept current',
    forWho: 'No machine at home: I run your Command Center on my servers and keep it current.',
    includes: ['Your Command Center on my servers, kept separate from other clients', 'New features rolled in, your theme kept', 'Health checks, backups verified, fixes', 'One small new workflow every month', 'Agent tuning as your work changes', 'Priority support', 'After a Foundation or Operator build · limited slots, cancel anytime'],
    cta: { label: 'Ask about hosting', href: '/contact/?topic=command' },
  },
  {
    id: 'gov', op: 'TIER 05', name: 'Government & teams', price: 'Scoped', per: 'quote', sub: 'Agencies, primes and larger teams',
    forWho: 'You need a scoped engagement, set-aside eligibility or several seats.',
    includes: ['SDVOSB and VOSB (SBA VetCert), California DVBE', 'SAM.gov active, all awards', 'Document and data operations, workflow modernization', 'On-premises and offline options', 'Capability statement on request'],
    cta: { label: 'Government inquiries', href: '/government-capabilities/' },
  },
];

/** "Every tier, every time": the promises on the /pricing/ intro, also in the agent price list (/pricing.md). */
export const EVERY_TIER = ['Done for you, start to finish', 'On a machine you own, or hosted by me', 'Your files and accounts stay yours', 'Scope and price in writing before work starts', 'Training on your real work, not a demo'];

/** The one deliverable the audit includes (Bruce, 2026-10-01): the client picks one with Bruce during the audit. Kept
 * small on purpose, so a $197 audit never turns into a custom build. `example`, `bring` and `not` (2026-10-04, from Mira's
 * clarity brief) are what the "Choose what you leave with" picker shows; `not` is what would need a separate build. */
export type DeliverableId = 'assistant' | 'workflow' | 'template' | 'plan';
export const AUDIT_DELIVERABLES: { id: DeliverableId; name: string; what: string; example: string; bring: string; not: string }[] = [
  { id: 'assistant', name: 'An AI assistant brief', what: 'Reusable instructions for an AI assistant, tailored to one job in your business.',
    example: 'Instructions an AI follows to draft your replies to customer questions, in your voice.',
    bring: 'A few real examples of that job (private details removed) and how you like it done.',
    not: 'An installed or connected AI agent.' },
  { id: 'workflow', name: 'One documented workflow', what: 'An SOP or checklist for one repetitive process, written so anyone can follow it.',
    example: 'The steps from receiving a shipment to sending the invoice.',
    bring: 'A walk-through of how it runs today and who does each step.',
    not: 'Software that does the steps for you (that’s a workflow buildout).' },
  { id: 'template', name: 'One business template', what: 'A client follow-up sequence, an intake questionnaire or an estimate template.',
    example: 'An estimate or invoice template, an intake questionnaire or a follow-up message sequence.',
    bring: 'Your current version if you have one, your logo, and what it needs to ask or say.',
    not: 'A custom app, a payment integration or a CRM.' },
  { id: 'plan', name: 'Your plan on one page', what: 'Your 30-day plan as a designed, printable one-page field manual.',
    example: 'Your 30-day plan as a designed page you can print and pin up.',
    bring: 'Nothing extra: it’s built from the audit itself.',
    not: 'Doing everything on the plan.' },
];
/** "Help me choose": a quick guide, then the pick is made together during the audit. */
export const AUDIT_HELP: [string, DeliverableId][] = [
  ['You write the same kind of message again and again', 'assistant'],
  ['One process only you know how to run', 'workflow'],
  ['You remake the same document every time', 'template'],
  ['You want the whole plan where you can see it', 'plan'],
];
/** The promise both paid audit events carry on Cal.com, word for word (Mira set them up, 2026-10-01). */
export const AUDIT_PROMISE = 'Within 7 business days of complete intake you get a written map, ranked opportunities, a 30-day plan and one deliverable you keep: an AI assistant brief, one documented workflow, one business template, or your plan on one page. We pick it together during the audit; it stays small (no account integrations, no ongoing support).';
export const BOOKING_PRIVACY = 'Please don’t put passwords, account numbers or medical records in the booking form.';
export const AUDIT_DELIVERABLE_SCOPE = 'One item, picked together during the audit, in a defined scope: no account integrations and no ongoing support.';

/** Monthly care on the client's own machine (Bruce, 2026-10-04): what Command used to be, now that Command is hosted. */
export const CARE = {
  name: 'Monthly care', price: '$295', per: 'per month', where: 'On your own machine',
  includes: ['New features rolled in, your theme kept', 'Health checks, backups verified, fixes', 'One small new workflow every month', 'Agent tuning as your work changes', 'Priority support', 'After Foundation or Operator, cancel anytime'],
};

export const ADD_ONS: { name: string; price: string; note: string }[] = [
  { name: 'Extra AI agent', price: '$450', note: 'Its own job, briefing and approvals.' },
  { name: 'Custom theme', price: '$650', note: 'Your colors, type and corners. Included in Operator.' },
  { name: 'Workflow buildout', price: 'from $950', note: 'One workflow, built and handed off. Also on its own after the audit.' },
  { name: 'Move-in from your old apps', price: '$350', note: 'Notes, docs and files brought over. Included in Operator.' },
  { name: 'Hardware', price: 'at cost', note: 'A mini PC or Mac mini sourced and set up for you.' },
];

// 2026-10-18 (Bruce): the Local Presence Report, for local businesses. The first report is free and handed over on a
// call; the Fix Sprint is $450 flat; a phone-layout rebuild, a new website or a hosting move is quoted separately.
// Later the same day (Bruce): the Fix Sprint also includes a plain SEO audit (Mira's website-seo-audits skill, packaged
// short and simple for the client).
// Presence Watch (the monthly report plus a down/certificate alert, $49 a month, free with Monthly care) is approved but
// stays OFF the site until its weekly check job runs, so no `price:` for it here (verify-routes lists every one).
// The report itself is made by govcon/rnd-rig/scouts/presence_report.py from data Bruce Works collects itself.
// 2026-10-29 (Bruce): the report is for a business that already has a website; each fix is said as what it does for
// the calls a business gets. A too-old site gets the custom website instead of a quoted rebuild.
export const PRESENCE = {
  name: 'Local Presence Report',
  what: 'One page on what can stop a new customer from reaching you: does your website load, is it secure, does it work on a phone, is it current, can people call or write to you from it, and does it point to your Google reviews. Scored 0 to 100, with the fixes in plain words.',
  checks: ['Your website loads', 'Secure (https) with a working certificate', 'Built for phones', 'How recently it changed', 'Contact form, call link, booking or chat', 'Links to your Google reviews and social pages'],
  first: { name: 'First report', price: 'Free', note: 'Your report, gone over with you on a call. It’s yours to keep, whether or not you hire me.' },
  sprint: {
    name: 'Fix Sprint', price: '$450', per: 'flat',
    note: 'I make the small fixes on your report, the ones that stop people from calling, re-check the site and hand you a new report with the new score.',
    includes: ['A plain SEO audit: how Google sees your site, who shows up ahead of you, and what to fix first', 'A tap-to-call phone number, so people on a phone reach you in one tap', 'A contact form, so people can reach you after hours', 'A link to your Google reviews, so new customers see them', 'Links to your Instagram, Facebook and LinkedIn', 'The footer year, and your plain web address forwarding to https', 'A certificate renewal through your own host account'],
    access: 'You add me as a user on your site or host. No passwords by email or text.',
  },
  bigger: 'If your site is too far gone to fix, the custom website replaces it. Moving your hosting is quoted separately.',
  bridge: 'Every report ends with one question: what happens to calls and messages after hours? That’s what the audit answers.',
};

// 2026-10-22 (Bruce): two website prices for local businesses, $500 one page and $1,500 up to 5 pages. Anything bigger
// is quoted in writing. They sit with the Local Presence Report on /pricing/#websites, and "Websites from $500" is one
// of the three doors.
// 2026-10-29 (Bruce): same prices, new terms, so every caller, email and page says the same thing (docs/LOCAL-OFFER.md).
// The $500 site is built first from the trade templates (the preview look Bruce approved 2026-10-28): the owner sees it
// before paying, gets up to 3 rounds of changes to the words, photos and colors, hosting included, live within a week of
// their photos and info, and pays only when happy. It stays one page with every section a small site has. The $1,500 is
// the custom one: designed around the business, up to 5 pages, 3 rounds of changes, half to start. Say "built for your
// business" for the $500, never "custom": custom invites open-ended redesigns.
export const WEBSITES = {
  preview: { name: 'Free preview', price: 'Free', note: 'No website yet? I build your homepage first, with your business on it, and send you the link. You see it before you pay anything.' },
  quick: {
    name: 'One-page website', price: '$500', per: 'one page',
    note: 'Built from a template made for your trade. Everything a small site has, on one page built for phones.',
    includes: ['Your services, about, reviews, hours and map, and contact', 'Tap-to-call and a link to your Google reviews', 'Up to 3 rounds of changes to the words, photos and colors', 'On your own web address, hosting included', 'Live within a week of getting your photos and info'],
    terms: 'You pay when you’re happy with it. Nothing goes live until then.',
  },
  full: {
    name: 'Custom website', price: '$1,500', per: 'up to 5 pages',
    note: 'Designed around your business: your logo, colors and look, not a template.',
    includes: ['Up to 5 pages, each written for you', 'A page for each service, so Google can show you for each one', 'Up to 3 rounds of changes, layout included', 'On your own web address, hosting set up'],
    terms: 'Half to start, half when you’re happy.',
  },
  address: 'The web address is in your name. You pay the registrar for it directly, usually $10 to $20 a year.',
  bigger: 'A store, booking or more than five pages is quoted in writing.',
};

/** Under the audit's "choose what you leave with" summary: the next step up from a document, then what needs a scoped build. */
export const AUDIT_BUILD_NOTE = `Want one job running for you, not just written down? A workflow buildout (${ADD_ONS.find((a) => a.name === 'Workflow buildout')!.price}) can follow the audit on its own. Working software, integrations or several connected workflows need a separately scoped build.`;

// Hosted by Bruce = Tier 04 Command (Bruce, 2026-10-04): a few slots on Bruce's own servers for people who don't want a
// machine at home, $295 a month after a build, fit confirmed before anyone pays, no uptime promise. No GPU (no local AI
// models) for now. Bruce's self-hosted business services come with it at no extra cost, tied into the client's Command
// Center (he sets up the firewall rules per client).
/** The lighter route for people who only want hosting: kept to one line so it doesn't read as a fifth tier. */
export const HOSTING_LITE = 'Rather not pay monthly for hosting? I can install it on a cloud server in your name instead, as part of a Foundation or Operator build. You pay the cloud provider directly, for a lot less than Command.';

export const HOSTING = {
  status: 'limited' as const,
  slots: 4,
  services: [
    // [the paid app people know, the self-hosted one Bruce runs]
    ['Like Dropbox and Google Photos', 'Nextcloud'],
    ['Like 1Password', 'Vaultwarden (Bitwarden compatible)'],
    ['Like HubSpot', 'Twenty CRM'],
    ['Like DocuSign', 'Documenso'],
    ['Like Calendly', 'Cal.com'],
    ['Like Zapier', 'n8n'],
    ['Like a filing cabinet for your paperwork', 'Papra'],
    ['Like Google search, without the tracking', 'SearXNG'],
  ] as [string, string][],
};

/** The free 30-minute call on /book/: where the free report is handed over and where every door's button goes. */
export const FIT_CALL = '/book/?event=fit';

// 2026-10-22 (Bruce): three doors. Outside /pricing/ these are the only prices the site shows, always worded this way,
// each with one button to the free call. Every other price lives on /pricing/ (and /pricing.md), and the audit's own
// pages show its in-person price. No "was" or "normally" prices anywhere (Bus. & Prof. Code §17501).
export type Door = { id: 'websites' | 'audit' | 'command-center'; name: string; price: string; from?: boolean; per?: string; line: string; cta: { label: string; href: string }; more: string };
const tierById = (id: Tier['id']) => TIERS.find((t) => t.id === id)!;
export const DOORS: Door[] = [
  { id: 'websites', name: 'Websites', price: WEBSITES.quick.price, from: true,
    line: 'A site built for phones, so new customers find you and call. No website yet? You see yours before you pay.',
    cta: { label: 'Book a free call', href: FIT_CALL }, more: '/pricing/#websites' },
  { id: 'audit', name: 'AI Leverage Audit', price: tierById('recon').price, per: 'remote',
    line: 'Your workflow mapped, the first things worth fixing ranked, and a 30-day plan you can run without me.',
    cta: { label: 'Book a free call', href: FIT_CALL }, more: '/ai-leverage-audit/' },
  { id: 'command-center', name: 'Command Center', price: tierById('foundation').price, from: true,
    line: 'One private dashboard for your files, docs, tasks and AI agents, built to how you work, on a machine you own.',
    cta: { label: 'Book a free call', href: FIT_CALL }, more: '/command-center/' },
];
