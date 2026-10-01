import { LIVE_MODULES, MODULES } from './modules';
import { addOn, auditPrices, BUILD_SPEC, tier } from '../components/offers/tiers';
import type { QA } from '../components/offers/Accordion';

// The FAQ, grouped. /faq/ shows every group; /pricing/ shows the "pricing" group. Prices come from content/pricing.ts.
// seo/routes.json carries the same questions and answers as FAQPage JSON-LD for /faq/, and the build's route verifier
// fails if the two drift apart: after editing a question here (or a price in pricing.ts), update that JSON-LD to match.

export type FAQGroup = { id: string; label: string; items: QA[] };

const audit = auditPrices();
const foundation = tier('foundation');
const operator = tier('operator');
const command = tier('command');
const agentAddOn = addOn('agent');
const themeAddOn = addOn('theme');
const coming = MODULES.filter((m) => m.status === 'coming');
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const count = (n: number) => ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'][n] ?? String(n);
const Cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const FAQ_GROUPS: FAQGroup[] = [
  {
    id: 'command-center', label: 'The Command Center',
    items: [
      {
        q: 'What is the Command Center?',
        a: 'One private dashboard on a machine you own. Your files, notes, documents, tasks, content and AI agents live in one place instead of a stack of separate apps. I install it, build it to how you work, and train you on it.',
        link: { label: 'See what it does', href: '/command-center/' },
      },
      {
        q: 'Is it an app I download?',
        a: 'No. It’s done for you. I install it on your hardware, switch on the modules you use and move your work in. The code stays private; the machine, your files and your data are yours.',
      },
      {
        q: 'What’s in it today?',
        a: `${Cap(count(LIVE_MODULES.length))} modules ship today: ${list(LIVE_MODULES.map((m) => m.name))}. Each one is a switch, so you only see what you use.`,
        link: { label: 'Try the live demo', href: '/live-demo/' },
      },
      {
        q: 'What does it replace, and what doesn’t it?',
        a: `It stands in for the notes app, the office suite, the PDF signer, cloud storage, the to-do app, the project tracker, the invoicing app and the content calendar. It doesn’t replace the AI plan you pay for: your agents run on it. Posting stays in each social app; plans and drafts live here.${coming.some((m) => m.id === 'pages') ? ' And Notion-style Pages aren’t here yet: they’re coming.' : ''}`,
      },
      {
        q: 'Is this ChatGPT with a new skin?',
        a: 'No. ChatGPT or another AI plan powers the agents, but the Command Center is where your files, tasks and approvals live, so the agents work with real context instead of whatever you paste into a chat.',
      },
    ],
  },
  {
    id: 'who', label: 'Who it’s for',
    items: [
      {
        q: 'Who is it for?',
        a: 'Owner-led businesses first: the shop, the firm, the crew where the owner still runs the day. It also fits creators, students and families who want their files, plans and AI in one place.',
      },
      {
        q: 'Do I need to be technical?',
        a: 'No. I set it up, write it down in plain English and train you on your real work, not a demo.',
      },
    ],
  },
  {
    id: 'hardware', label: 'Hardware and privacy',
    items: [
      {
        q: 'What does it run on?',
        a: 'A machine you own: a Mac mini, a mini PC or a server you already have. I can source a mini PC or Mac mini at cost and set it up. The audit checks whether a machine you already own is up to it.',
        link: { label: 'How hardware works', href: '/pricing/#hardware' },
      },
      {
        q: 'Where does my data live?',
        a: 'On storage you own. Files, notes and history stay on your machine. When an agent works, it sends the AI provider you use what that job needs, the same as any AI chat. Local models are an option when the hardware and the job allow it.',
      },
      {
        q: 'Does Bruce Works host my agents or hold my data?',
        a: 'No, not by default. Accounts, storage, subscriptions, credentials and hardware stay with you wherever practical. Any exception is scoped and approved in writing first.',
      },
      {
        q: 'Can I reach it away from home or the shop?',
        a: 'Yes, if you want to. It’s reachable from any device on your network, and from anywhere once secure remote access is set up.',
      },
    ],
  },
  {
    id: 'agents', label: 'Agents and approvals',
    items: [
      {
        q: 'What does “agent-native” mean?',
        a: 'Your AI agents live inside the Command Center, next to your documents, calendar and files, so they work with real context. Each one has its own job, its own briefing and its own approvals.',
      },
      {
        q: 'Can an agent do something I didn’t approve?',
        a: 'Anything risky waits for your OK. Agents ask before they send, delete or run anything that matters, and you approve or deny from the dashboard or your phone. The Vault hands an agent a key without it landing in a chat.',
      },
      {
        q: 'How many agents do I get?',
        a: `Foundation comes with ${count(BUILD_SPEC.foundation.agents)}, Operator with up to ${count(BUILD_SPEC.operator.agents)}. Each extra agent is ${agentAddOn.price} and gets its own job, briefing and approvals.`,
      },
    ],
  },
  {
    id: 'themes', label: 'Themes and updates',
    items: [
      {
        q: 'Can it wear my brand?',
        a: `Yes. Foundation starts with a stock theme like Field Manual or Harbor. Operator includes a custom theme built from your brand: your colors, type, corners and logo. On Foundation, a custom theme is a ${themeAddOn.price} add-on.`,
        link: { label: 'Try the themes', href: '/themes/' },
      },
      {
        q: 'How do updates work?',
        a: `New features roll in without touching your look. With Command, I roll them in for you, run health checks, verify your backups and fix what breaks. Without Command, your system keeps running the way it was installed.`,
      },
      {
        q: 'What’s coming next?',
        a: coming.length
          ? `${coming.map((m) => `${m.name}: ${m.does}`).join(' ')} ${coming.length === 1 ? 'It’s' : 'They’re'} designed, not shipped yet.${coming.some((m) => m.id === 'pages') ? ' Until then, notes live in Jot and documents in Office.' : ''}`
          : 'Everything designed so far has shipped. New modules show up in Field Notes when they land.',
      },
    ],
  },
  {
    id: 'pricing', label: 'Pricing',
    items: [
      {
        q: 'What does it cost?',
        a: `The audit is ${audit.remote} remote or ${audit.inPerson} in person in San Diego. A Foundation install is ${foundation.price} once, Operator is ${operator.price} once, and Command, the optional monthly care, is ${command.price} a month. Your exact price is set in writing after the audit.`,
        link: { label: 'Build your loadout', href: '/pricing/#loadout' },
      },
      {
        q: 'Is there a monthly fee?',
        a: `Only if you want Command. Foundation and Operator are paid once. Command is ${command.price} a month after either one, and you can cancel anytime.`,
      },
      {
        q: 'What happens if I stop Command?',
        a: 'Your Command Center keeps running on your machine, and your files stay where they are. You stop getting new features rolled in, the health checks and the monthly workflow.',
      },
      {
        q: 'Is the audit fee credited?',
        a: `Yes. Book a build within 30 days of your audit and the ${audit.remote} (or ${audit.inPerson}) comes off the price.`,
      },
      {
        q: 'What isn’t in the price?',
        a: 'Your AI plan (your agents run on it), the hardware (sourced at cost if you want me to), and travel or extra scope, which are quoted up front before any work starts.',
      },
      {
        q: 'Can I add things later?',
        a: `Yes. Extra agents, a custom theme, workflow buildouts and the move-in from your old apps are add-ons you can book after the install. Moving from Foundation to Operator later is quoted against what’s already built.`,
      },
    ],
  },
  {
    id: 'audit', label: 'The audit',
    items: [
      {
        q: 'Where should I start?',
        a: 'With the AI Leverage Audit. It maps how you work, ranks the top opportunities by time saved, sets what data stays private, and ends with a 30-day plan and a clear call: build, optimize, or do nothing.',
        link: { label: 'About the audit', href: '/ai-leverage-audit/' },
      },
      {
        q: 'Remote or in person?',
        a: `Either. Remote is ${audit.remote} and works from anywhere. In person in San Diego is ${audit.inPerson}. You get the same written plan.`,
      },
      {
        q: 'How long does the audit take?',
        a: 'The target is 7 business days from the day your intake and source material are complete.',
      },
      {
        q: 'Do I have to send private files or passwords?',
        a: 'No. The request form needs none of that. During intake we agree on what I should look at and how; passwords and private records never go through a web form.',
      },
      {
        q: 'Do I have to buy a build after the audit?',
        a: 'No. The plan is written so you can run it without me. If you do build within 30 days, the audit fee is credited.',
      },
    ],
  },
  {
    id: 'government', label: 'Government',
    items: [
      {
        q: 'Do you work with agencies and prime contractors?',
        a: 'Yes. Bruce Works is an SDVOSB and VOSB (SBA VetCert), a California DVBE and Small Business (Micro), and active in SAM.gov for all awards. I support agencies and primes with document and data operations, workflow modernization and private AI systems.',
        link: { label: 'Government capabilities', href: '/government-capabilities/' },
      },
      {
        q: 'How is government work priced?',
        a: 'From the actual scope: labor, risk, volume, controls, reporting, travel, schedule and acceptance requirements. A low-cost commercial pilot doesn’t set the price of a government or enterprise scope.',
      },
    ],
  },
];

export const faqGroup = (id: string) => FAQ_GROUPS.find((g) => g.id === id)!;
