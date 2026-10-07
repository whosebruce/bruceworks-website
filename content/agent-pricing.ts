import { ADD_ONS, AUDIT_DELIVERABLES, AUDIT_PROMISE, BOOKING_PRIVACY, CARE, EVERY_TIER, HOSTING, HOSTING_LITE, TIERS } from './pricing';
import { FAQ_GROUPS } from './faq';

// The price list for AI agents (Bruce, 2026-10-07): /pricing.md and /llms.txt, written at build time by the plugin in
// vite.config.ts from the same content/pricing.ts and content/faq.ts the /pricing/ page reads, so the two can't drift.
// Plain text only: no JSX, no browser APIs (vite.config.ts imports this file).

export const ORIGIN = 'https://bruceworks.net';
export const PRICING_MD_PATH = '/pricing.md';
export const LLMS_TXT_PATH = '/llms.txt';

const abs = (href: string) => (href.startsWith('/') ? `${ORIGIN}${href}` : href);
const bullets = (xs: string[]) => xs.map((x) => `- ${x}`).join('\n');
const cell = (s: string) => s.replace(/\|/g, '\\|');

export const pricingMarkdown = (generated: string): string => {
  const recon = TIERS.find((t) => t.id === 'recon')!;
  const command = TIERS.find((t) => t.id === 'command')!;
  const pricingFaq = FAQ_GROUPS.find((g) => g.id === 'pricing')?.items ?? [];

  return `# Bruce Works pricing

> For AI agents and assistants: the full price list from ${ORIGIN}/pricing/ in plain markdown, built from the same source as the page. Prices are in US dollars. If this file and the page ever disagree, the page wins.

Bruce Works LLC builds one private command center for your work, your files and your AI agents, set up to the way you run your day, on hardware you own or hosted by Bruce. San Diego based, California service, remote nationwide. Service-disabled veteran-owned (SDVOSB and VOSB, SBA VetCert).

Generated ${generated}. In the lists below, "I" and "me" mean Bruce.

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

${AUDIT_DELIVERABLES.map((d) => `- **${d.name}.** ${d.what} Example: ${d.example} Not included: ${d.not.charAt(0).toLowerCase()}${d.not.slice(1)}`).join('\n')}

## Monthly, after a build

Both are optional and only follow a Foundation or Operator build. Cancel either anytime.

- **${command.name} (${command.op}), ${command.price} ${command.per}.** I host your Command Center on my servers, limited to ${HOSTING.slots} slots, fit confirmed before you pay.
- **${CARE.name}, ${CARE.price} ${CARE.per}.** ${CARE.where}: ${CARE.includes.map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join('; ')}.

Self-hosted services that come with ${command.name}, tied into your business:

${HOSTING.services.map(([like, app]) => `- ${like}: ${app}`).join('\n')}

${HOSTING_LITE}

## Add-ons

| Add-on | Price | Note |
|---|---|---|
${ADD_ONS.map((a) => `| ${cell(a.name)} | ${cell(a.price)} | ${cell(a.note)} |`).join('\n')}

## Pricing questions

${pricingFaq.map((x) => `**${x.q}**\n${x.a}`).join('\n\n')}

## Book or ask

- Book the ${recon.price} remote audit: ${ORIGIN}/book/
- Book the in-person audit (San Diego): ${ORIGIN}/book/?event=in-person
- Free 30-minute fit call: ${ORIGIN}/book/?event=fit
- Pre-pick the audit deliverable: add \`?deliverable=\` with ${AUDIT_DELIVERABLES.map((d) => `\`${d.id}\``).join(', ')} or \`help\` to the booking link
- Ask about a build or monthly: ${ORIGIN}/contact/?topic= with \`foundation\`, \`operator\`, \`command\`, \`care\`, \`workflow\` or \`government\`
- Toll-free intake: (866) 829-6757 · info@bruceworks.net
- ${BOOKING_PRIVACY}
`;
};

export const llmsTxt = (): string => `# Bruce Works

> Bruce Works LLC builds one private command center for your work, your files and your AI agents, on hardware you own or hosted by Bruce. Done for you, start to finish. San Diego based, California service, remote nationwide. Service-disabled veteran-owned (SDVOSB and VOSB, SBA VetCert).

## Pricing

- [Pricing for AI agents](${ORIGIN}${PRICING_MD_PATH}): every tier, add-on and monthly option in US dollars, what the audit includes, and how to book

## Pages

- [Pricing](${ORIGIN}/pricing/)
- [AI Leverage Audit](${ORIGIN}/ai-leverage-audit/)
- [Book the audit or a free fit call](${ORIGIN}/book/)
- [Services](${ORIGIN}/services/)
- [FAQ](${ORIGIN}/faq/)
- [Government capabilities](${ORIGIN}/government-capabilities/)
- [Contact](${ORIGIN}/contact/)
`;
