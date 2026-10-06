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
    id: 'foundation', op: 'TIER 02', name: 'Foundation', price: '$1,950', per: 'one time', sub: 'Command Center install',
    forWho: 'You want one dashboard for your files, notes, docs and one AI agent.',
    includes: ['Installed on a machine you own', 'Up to 6 modules, switched on for how you work', 'One AI agent, set up and briefed', 'A stock theme (Field Manual, Harbor and more)', 'Your files organized into one structure', 'One 90-minute training session, 14 days of support'],
    cta: { label: 'Start with Foundation', href: '/contact/?topic=foundation' },
  },
  {
    id: 'operator', op: 'TIER 03', name: 'Operator', price: '$4,950', per: 'one time', sub: 'Full build', featured: true,
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
