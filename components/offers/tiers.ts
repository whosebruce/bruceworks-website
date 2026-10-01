import { ADD_ONS, TIERS, type Tier } from '../../content/pricing';

// Numbers and structure for the offer pages (Pricing, Services, FAQ), read from content/pricing.ts so a price change
// there flows everywhere. The per-tier specs below say in structured form what each tier's `includes` list says in
// words; keep the two in step when a tier changes.

export const tier = (id: Tier['id']): Tier => {
  const t = TIERS.find((x) => x.id === id);
  if (!t) throw new Error(`content/pricing.ts has no tier "${id}"`);
  return t;
};

/** "$1,950" → 1950, "from $950" → 950, "at cost" → 0. */
export const dollars = (s: string | undefined): number => Number((s ?? '').replace(/[^0-9]/g, '')) || 0;

export const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

type AddOnKey = 'agent' | 'theme' | 'workflow' | 'moveIn' | 'hardware';
const ADD_ON_MATCH: Record<AddOnKey, RegExp> = { agent: /agent/i, theme: /theme/i, workflow: /workflow/i, moveIn: /move-in/i, hardware: /hardware/i };

/** An add-on from content/pricing.ts, found by what it is (so a small rename there doesn't break the estimator). */
export const addOn = (key: AddOnKey) => {
  const a = ADD_ONS.find((x) => ADD_ON_MATCH[key].test(x.name));
  if (!a) throw new Error(`content/pricing.ts has no add-on matching ${ADD_ON_MATCH[key]}`);
  return { ...a, amount: dollars(a.price), from: /from/i.test(a.price), atCost: /cost/i.test(a.price) };
};

/** The audit's two prices: "$197" remote and the in-person price inside `per` ("remote · $297 in person"). */
export const auditPrices = () => {
  const r = tier('recon');
  const inPerson = r.per?.match(/\$[\d,]+/)?.[0] ?? r.price;
  return { remote: r.price, inPerson };
};

/** What a build tier includes, as numbers the estimator can work with. */
export type BuildSpec = { agents: number; workflows: number; theme: boolean; moveIn: boolean };
export const BUILD_SPEC: Record<'foundation' | 'operator', BuildSpec> = {
  foundation: { agents: 1, workflows: 0, theme: false, moveIn: false },
  operator: { agents: 3, workflows: 2, theme: true, moveIn: true },
};

/** The comparison table: one row per thing a buyer compares, one cell per tier. `null` = not part of that tier. */
export type CompareTierId = 'recon' | 'foundation' | 'operator' | 'command';
export const COMPARE_TIERS: CompareTierId[] = ['recon', 'foundation', 'operator', 'command'];

export const COMPARE_ROWS: { label: string; cells: Record<CompareTierId, string | null> }[] = [
  { label: 'What you get', cells: { recon: 'Your workflow mapped and a 30-day plan you can run without me', foundation: 'Your Command Center, installed', operator: 'The full build, in your brand', command: 'Managed care, month to month' } },
  { label: 'Where it runs', cells: { recon: 'Remote, or in person in San Diego', foundation: 'A machine you own', operator: 'A machine you own', command: 'Keeps your system current' } },
  { label: 'Modules', cells: { recon: null, foundation: 'Up to 6, switched on for how you work', operator: 'Every module, on or off as you like', command: 'New features rolled in' } },
  { label: 'AI agents', cells: { recon: null, foundation: 'One, set up and briefed', operator: 'Up to 3, each with its own job', command: 'Tuned as your work changes' } },
  { label: 'Theme', cells: { recon: null, foundation: 'A stock theme (Field Manual, Harbor and more)', operator: 'A custom theme built from your brand', command: 'Your theme kept through every update' } },
  { label: 'Your files and apps', cells: { recon: 'What data stays private, and where it lives', foundation: 'Files organized into one structure', operator: 'Notes, docs and files moved in from your old apps', command: 'Backups verified' } },
  { label: 'Workflows', cells: { recon: 'Top opportunities, ranked by time saved', foundation: null, operator: 'Two, built end to end', command: 'One small new one every month' } },
  { label: 'Training', cells: { recon: null, foundation: 'One 90-minute session', operator: 'Two sessions', command: null } },
  { label: 'Support', cells: { recon: 'Plan delivered within 7 business days of intake', foundation: '14 days', operator: '30 days', command: 'Priority support, health checks and fixes' } },
  { label: 'Terms', cells: { recon: 'Fee credited toward a build within 30 days', foundation: 'One time', operator: 'One time', command: 'After Foundation or Operator. Cancel anytime.' } },
];
