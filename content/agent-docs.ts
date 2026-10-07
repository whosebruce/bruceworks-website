import { ADD_ONS, AUDIT_BUILD_NOTE, AUDIT_DELIVERABLES, AUDIT_HELP, AUDIT_PROMISE, BOOKING_PRIVACY, CARE, EVERY_TIER, HOSTING, HOSTING_LITE, TIERS } from './pricing';
import { FAQ_GROUPS, faqGroup } from './faq';
import { MODULES } from './modules';
import { MODULE_DETAILS } from './module-details';
import { GOV_CAPABILITIES, GOV_WHY, californiaCertifications, company, documents, identifiers, samRegistration, sbaCertifications } from './government';
import { auditPrices, dollars, tier } from '../components/offers/tiers';

// The site for AI agents (Bruce, 2026-10-07): a plain-markdown copy of the key pages (/pricing.md, /faq.md, …), an
// /llms.txt index, and the price list as schema.org offers for /pricing/. All of it is written at build time from the
// same content files the pages read, so none of it can drift: vite.config.ts writes the .md files and serves them in
// dev; scripts/generate-route-shells.mjs puts the offers and the markdown pointers into the static page shells.
// Plain text only: no JSX, no browser APIs.

export const ORIGIN = 'https://bruceworks.net';
export const PRICING_MD_PATH = '/pricing.md';
export const LLMS_TXT_PATH = '/llms.txt';

const abs = (href: string) => (href.startsWith('/') ? `${ORIGIN}${href}` : href);
const bullets = (xs: string[]) => xs.map((x) => `- ${x}`).join('\n');
const cell = (s: string) => s.replace(/\|/g, '\\|');
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const qa = (items: { q: string; a: string; link?: { label: string; href: string } }[]) =>
  items.map((x) => `**${x.q}**\n${x.a}${x.link ? ` [${x.link.label}](${abs(x.link.href)})` : ''}`).join('\n\n');

const ABOUT = 'Bruce Works LLC builds one private command center for your work, your files and your AI agents, set up to the way you run your day, on hardware you own or hosted by Bruce. San Diego based, California service, remote nationwide. Service-disabled veteran-owned (SDVOSB and VOSB, SBA VetCert).';

const header = (title: string, page: string, generated: string, extra = '') => `# ${title}

> For AI agents and assistants: ${ORIGIN}${page} in plain markdown, built from the same source as the page.${extra} If this file and the page ever disagree, the page wins.

${ABOUT}

Generated ${generated}. "I" and "me" mean Bruce.`;

const BOOK = () => {
  const recon = tier('recon');
  return `## Book or ask

- Book the ${recon.price} remote audit: ${ORIGIN}/book/
- Book the in-person audit (San Diego): ${ORIGIN}/book/?event=in-person
- Free 30-minute fit call: ${ORIGIN}/book/?event=fit
- Pre-pick the audit deliverable: add \`?deliverable=\` with ${AUDIT_DELIVERABLES.map((d) => `\`${d.id}\``).join(', ')} or \`help\` to the booking link
- Ask about a build or monthly: ${ORIGIN}/contact/?topic= with \`foundation\`, \`operator\`, \`command\`, \`care\`, \`workflow\` or \`government\`
- Toll-free intake: (866) 829-6757 · info@bruceworks.net
- ${BOOKING_PRIVACY}`;
};

// ── /pricing.md ──────────────────────────────────────────────────────────────────────────────────────────────────────
const pricingMarkdown = (generated: string): string => {
  const command = tier('command');
  return `${header('Bruce Works pricing', '/pricing/', generated, ' Prices are in US dollars.')}

## At a glance

| Tier | Name | Price | Terms |
|---|---|---|---|
${TIERS.map((t) => `| ${t.op.replace('TIER ', '')} | ${cell(t.name)} (${cell(t.sub)}) | ${t.price} | ${cell(t.per ?? '')} |`).join('\n')}
| — | ${CARE.name} (${CARE.where.toLowerCase()}) | ${CARE.price} | ${CARE.per} |

Every tier, every time:

${bullets(EVERY_TIER)}

## Tiers

${TIERS.map((t) => `### ${t.op}: ${t.name}, ${t.price}${t.per ? ` (${t.per})` : ''}

${t.sub}. ${t.forWho}

${bullets(t.includes)}

Next step: [${t.cta.label}](${abs(t.cta.href)})`).join('\n\n')}

## What the audit leaves you with

${AUDIT_PROMISE}

${AUDIT_DELIVERABLES.map((d) => `- **${d.name}.** ${d.what} Example: ${d.example} Not included: ${lower(d.not)}`).join('\n')}

## Monthly, after a build

Both are optional and only follow a Foundation or Operator build. Cancel either anytime.

- **${command.name} (${command.op}), ${command.price} ${command.per}.** I host your Command Center on my servers, limited to ${HOSTING.slots} slots, fit confirmed before you pay.
- **${CARE.name}, ${CARE.price} ${CARE.per}.** ${CARE.where}: ${CARE.includes.map(lower).join('; ')}.

Self-hosted services that come with ${command.name}, tied into your business:

${HOSTING.services.map(([like, app]) => `- ${like}: ${app}`).join('\n')}

${HOSTING_LITE}

## Add-ons

| Add-on | Price | Note |
|---|---|---|
${ADD_ONS.map((a) => `| ${cell(a.name)} | ${cell(a.price)} | ${cell(a.note)} |`).join('\n')}

## Pricing questions

${qa(faqGroup('pricing').items)}

${BOOK()}
`;
};

// ── /command-center.md ───────────────────────────────────────────────────────────────────────────────────────────────
const GROUPS = ['Agents', 'Work', 'Make', 'System'] as const;
const commandCenterMarkdown = (generated: string): string => {
  const live = MODULES.filter((m) => m.status === 'live');
  const coming = MODULES.filter((m) => m.status === 'coming');
  return `${header('The Bruce Works Command Center', '/command-center/', generated)}

## What it is

${qa(faqGroup('command-center').items)}

## Modules

${live.length} modules ship today${coming.length ? `, ${coming.length} more are coming` : ''}. Each one is a switch: a client turns on what they use and nothing else. Try it in the live demo: ${ORIGIN}/live-demo/

${GROUPS.map((g) => `### ${g}

${MODULES.filter((m) => m.group === g).map((m) => {
    const d = MODULE_DETAILS[m.id];
    return `#### ${m.name}${m.status === 'coming' ? ' (coming)' : ''}

${m.does} Instead of ${m.instead}.

${bullets(d.points)}${d.with.length ? `\n\nWorks with: ${d.with.map((id) => MODULES.find((x) => x.id === id)?.name ?? id).join(', ')}.` : ''}${d.note ? `\n\n${d.note}` : ''}`;
  }).join('\n\n')}`).join('\n\n')}

## Prices

Foundation installs it for ${tier('foundation').price} once; Operator is the full build for ${tier('operator').price} once. Every price: ${ORIGIN}${PRICING_MD_PATH}

${BOOK()}
`;
};

// ── /ai-leverage-audit.md ────────────────────────────────────────────────────────────────────────────────────────────
const auditMarkdown = (generated: string): string => {
  const recon = tier('recon');
  const audit = auditPrices();
  return `${header('The AI Leverage Audit', '/ai-leverage-audit/', generated, ' Prices are in US dollars.')}

## Price

${audit.remote} remote, ${audit.inPerson} in person in San Diego. ${recon.forWho}

${bullets(recon.includes)}

## What you leave with

${AUDIT_PROMISE}

${AUDIT_DELIVERABLES.map((d) => `### ${d.name}

${d.what}

- Example: ${d.example}
- What to bring: ${d.bring}
- Not included: ${lower(d.not)}`).join('\n\n')}

### Help me choose

${AUDIT_HELP.map(([when, id]) => `- ${when}: ${lower(AUDIT_DELIVERABLES.find((d) => d.id === id)!.name)}`).join('\n')}

${AUDIT_BUILD_NOTE}

## Questions about the audit

${qa(faqGroup('audit').items)}

${BOOK()}
`;
};

// ── /faq.md ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const faqMarkdown = (generated: string): string => `${header('Bruce Works FAQ', '/faq/', generated)}

${FAQ_GROUPS.map((g) => `## ${g.label}\n\n${qa(g.items)}`).join('\n\n')}

${BOOK()}
`;

// ── /government-capabilities.md ──────────────────────────────────────────────────────────────────────────────────────
const governmentMarkdown = (generated: string): string => `${header('Bruce Works government capabilities', '/government-capabilities/', generated)}

${company.legalName} supports agencies, prime contractors, and teaming partners with document and data operations, workflow modernization, project controls, SOPs, and privacy-aware technology implementation. ${company.servicePosture}.

## On record

| Item | Value |
|---|---|
| Legal name | ${company.legalName} |
| UEI | ${identifiers.uei} |
| CAGE | ${identifiers.cage} |
| SAM.gov | ${samRegistration.status}, ${samRegistration.purpose} (active ${samRegistration.activeDate}, expires ${samRegistration.expirationDate}) |
| NAICS (SAM.gov) | ${samRegistration.naics.join(', ')} |
${sbaCertifications.certifications.map((c) => `| ${c.code} (${sbaCertifications.programShort}) | ${c.name}: ${c.status}, entrance ${c.entranceDate}, renewal ${c.renewalDate} |`).join('\n')}
${californiaCertifications.certifications.map((c) => `| California ${c.code} | ${c.name}: ${c.status}, ${c.effectiveDate} to ${c.validThrough}, Certification ID ${californiaCertifications.certificationId} |`).join('\n')}

## Verify it yourself

- ${sbaCertifications.verification.system}: ${sbaCertifications.verification.profileUrl ?? sbaCertifications.verification.url}
- ${samRegistration.verification.system}: ${samRegistration.verification.url} (${samRegistration.verification.instructions})
- ${californiaCertifications.verification.system}: ${californiaCertifications.verification.url} (${californiaCertifications.verification.instructions})

## Capabilities

${GOV_CAPABILITIES.map((c) => `### ${c.title}\n\n${bullets(c.points)}`).join('\n\n')}

## Why Bruce Works

${GOV_WHY.map(([, title, line]) => `- **${title}** ${line}`).join('\n')}

## Documents and contact

- Capability statement (PDF): ${abs(documents.capabilityStatement)}
- Certification verification summary (PDF): ${abs(documents.verificationSummary)}
- Discuss an opportunity: ${ORIGIN}/contact/?topic=government
- ${company.email} · ${company.phone}
`;

// ── the list, /llms.txt and the /pricing/ offers ─────────────────────────────────────────────────────────────────────
export type AgentDoc = { path: string; page: string; title: string; about: string; body: (generated: string) => string };

export const AGENT_DOCS: AgentDoc[] = [
  { path: PRICING_MD_PATH, page: '/pricing/', title: 'Pricing', about: 'every tier, add-on and monthly option in US dollars, what the audit includes, and how to book', body: pricingMarkdown },
  { path: '/command-center.md', page: '/command-center/', title: 'The Command Center', about: `what it is and all ${MODULES.length} modules, what each one does`, body: commandCenterMarkdown },
  { path: '/ai-leverage-audit.md', page: '/ai-leverage-audit/', title: 'The AI Leverage Audit', about: 'the price, the four deliverables to choose from, and what to bring', body: auditMarkdown },
  { path: '/faq.md', page: '/faq/', title: 'FAQ', about: 'every question on the FAQ page, answered', body: faqMarkdown },
  { path: '/government-capabilities.md', page: '/government-capabilities/', title: 'Government capabilities', about: 'certifications, identifiers, NAICS codes and capabilities for agencies and primes', body: governmentMarkdown },
];

export const llmsTxt = (): string => `# Bruce Works

> ${ABOUT}

## Plain markdown for AI agents

${AGENT_DOCS.map((d) => `- [${d.title}](${ORIGIN}${d.path}): ${d.about}`).join('\n')}

## Pages

- [Book the audit or a free fit call](${ORIGIN}/book/)
- [Live demo of the Command Center](${ORIGIN}/live-demo/)
- [Services](${ORIGIN}/services/)
- [Case studies](${ORIGIN}/case-studies/)
- [Contact](${ORIGIN}/contact/)
`;

/** Every priced offer on /pricing/ as schema.org Offers, hung on the business (index.html's #organization). Tiers and
 * add-ons without a dollar amount ("Scoped", "at cost") are left out. */
export const pricingJsonLd = () => {
  const org = { '@id': `${ORIGIN}/#organization` };
  const monthly = (per?: string) => /month/i.test(per ?? '');
  const offer = (name: string, price: string, url: string, description: string, opts: { monthly?: boolean; from?: boolean } = {}) => ({
    '@type': 'Offer',
    name,
    price: String(dollars(price)),
    priceCurrency: 'USD',
    ...(opts.monthly
      ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: String(dollars(price)), priceCurrency: 'USD', unitCode: 'MON', unitText: 'per month' } }
      : opts.from ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: String(dollars(price)), priceCurrency: 'USD' } } : {}),
    url: abs(url),
    itemOffered: { '@type': 'Service', name, description, provider: org },
  });
  const audit = auditPrices();
  const offers = [
    ...TIERS.filter((t) => dollars(t.price) > 0).flatMap((t) => t.id === 'recon'
      ? [offer(`${t.sub} (remote)`, audit.remote, '/book/', t.forWho), offer(`${t.sub} (in person, San Diego)`, audit.inPerson, '/book/?event=in-person', t.forWho)]
      : [offer(`${t.name}: ${t.sub}`, t.price, t.cta.href, t.forWho, { monthly: monthly(t.per) })]),
    offer(`${CARE.name} (${CARE.where.toLowerCase()})`, CARE.price, '/contact/?topic=care', CARE.includes.join('. ') + '.', { monthly: true }),
    ...ADD_ONS.filter((a) => dollars(a.price) > 0).map((a) => offer(`Add-on: ${a.name}`, a.price, '/pricing/#add-ons', a.note, { from: /from/i.test(a.price) })),
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    ...org,
    hasOfferCatalog: { '@type': 'OfferCatalog', '@id': `${ORIGIN}/pricing/#offers`, name: 'Bruce Works pricing', url: `${ORIGIN}/pricing/`, itemListElement: offers },
  };
};
