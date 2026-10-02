// The tiers, approved by Bruce on 2026-10-01 (the audit prices are his existing ones). Change a number here only with
// his say-so. Done-for-you only: the Command Center's code stays private; every tier is Bruce setting it up for you.

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
    includes: ['Your workflow mapped, bottlenecks named', 'Top opportunities, ranked by time saved', 'What data stays private and where it lives', 'A 30-day action plan you can run without me', 'Delivered in 7 business days after intake', 'Audit fee credited toward a build within 30 days'],
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
    id: 'command', op: 'TIER 04', name: 'Command', price: '$295', per: 'per month', sub: 'Managed and kept current',
    forWho: 'You want it kept up to date and improved, without thinking about it.',
    includes: ['New features rolled in, your theme kept', 'Health checks, backups verified, fixes', 'One small new workflow every month', 'Agent tuning as your work changes', 'Priority support', 'After Foundation or Operator, cancel anytime'],
    cta: { label: 'Ask about Command', href: '/contact/?topic=command' },
  },
  {
    id: 'gov', op: 'TIER 05', name: 'Government & teams', price: 'Scoped', per: 'quote', sub: 'Agencies, primes and larger teams',
    forWho: 'You need a scoped engagement, set-aside eligibility or several seats.',
    includes: ['SDVOSB and VOSB (SBA VetCert), California DVBE', 'SAM.gov active, all awards', 'Document and data operations, workflow modernization', 'On-premises and offline options', 'Capability statement on request'],
    cta: { label: 'Government inquiries', href: '/government-capabilities/' },
  },
];

export const ADD_ONS: { name: string; price: string; note: string }[] = [
  { name: 'Extra AI agent', price: '$450', note: 'Its own job, briefing and approvals.' },
  { name: 'Custom theme', price: '$650', note: 'Your colors, type and corners. Included in Operator.' },
  { name: 'Workflow buildout', price: 'from $950', note: 'One workflow, built and handed off.' },
  { name: 'Move-in from your old apps', price: '$350', note: 'Notes, docs and files brought over. Included in Operator.' },
  { name: 'Hardware', price: 'at cost', note: 'A mini PC or Mac mini sourced and set up for you.' },
];

// Hosted by Bruce: coming soon. A few slots on Bruce's own servers for people who don't want a machine at home. No GPU
// (no local AI models) for now. Bruce's self-hosted business services come with it at no extra cost, tied into the
// client's Command Center (he sets up the firewall rules per client). Price TBD with Bruce.
export const HOSTING = {
  status: 'coming' as const,
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
