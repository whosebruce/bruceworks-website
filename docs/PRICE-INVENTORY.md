# Price inventory

Every price on bruceworks.net as of v2.10.6 (origin/main, 2026-10-22), before the three-doors change. Counted from the
source and from a crawl of the built site at 1440 and 390 wide. Prices themselves live in `content/pricing.ts`; most
pages read them from there, and the rest are typed into the page by hand (marked "typed").

## The prices

| Price | What it is for | Where a visitor sees it | Source |
|---|---|---|---|
| Free | Local Presence Report, first report, gone over on a call | /pricing/ (Local presence) | `PRESENCE.first` |
| $197 | AI Leverage Audit, remote (Tier 01 Recon) | Nearly every page: the audit band at the bottom of 16 pages, the phone menu button, the Home hero button, /pricing/, /services/, /ai-leverage-audit/, /book/, /faq/, /why-us/, /live-demo/, /command-center/, one field note | `TIERS` recon, plus 9 typed copies (Header, Home, CommandCenter, LiveDemo ×2, AuditBand, ContactCTA, a field note, a motion-graphic label) |
| $297 | AI Leverage Audit, in person in San Diego | Same audit band (16 pages), /pricing/, /services/, /ai-leverage-audit/, /book/, /faq/ | `TIERS` recon `per`, typed in AuditBand and ContactCTA |
| $450 | Two products: the Fix Sprint (flat) and an extra AI agent (add-on) | /pricing/ (both), /services/ price list (agent), the FAQ (agent), the loadout builder | `PRESENCE.sprint`, `ADD_ONS` |
| $650 | Custom theme add-on | /pricing/, /themes/, the FAQ, loadout | `ADD_ONS` |
| $350 | Move-in from your old apps add-on | /pricing/, loadout | `ADD_ONS` |
| from $950 | Workflow buildout | /pricing/, /services/ (3 times), /contact/ topic card, the FAQ, the audit page | `ADD_ONS` |
| $1,950 | Foundation, Command Center install (Tier 02) | Home tier cards and the stack calculator, /pricing/, /services/, /contact/, the FAQ | `TIERS` foundation |
| $4,950 | Operator, full build (Tier 03) | Home tier cards, /pricing/, /services/, /contact/, the FAQ | `TIERS` operator |
| $295 a month | Two products: Command (hosted by Bruce, Tier 04) and Monthly care (own machine) | Home tier cards, /pricing/, /services/, /contact/, the FAQ | `TIERS` command, `CARE` |
| Scoped | Government and larger teams (Tier 05) | /pricing/, /services/ | `TIERS` gov |
| at cost | Hardware, sourced and set up | /pricing/, /services/, loadout | `ADD_ONS` |
| $49 a month | Presence Watch | Nowhere: approved, kept off the site until its weekly check runs | comment in `content/pricing.ts` |
| $500, $1,500 | Quick one-page website, full website (up to 5 pages, hosting set up), set by Bruce 2026-10-22 | Not on the site yet | none |

## How many prices each page shows

Bruce Works prices only, in the visible text at 1440 wide (FAQ answers are folded until opened).

| Page | Different prices | Which |
|---|---|---|
| /pricing/ | 10 | Free, $197, $297, $295, $350, $450, $650, from $950, $1,950, $4,950 |
| /services/ | 7 | $197, $297, $295, $450, from $950, $1,950, $4,950 |
| Home | 5 | $197, $297, $295, $1,950, $4,950 |
| /contact/ | 4 | $295, from $950, $1,950, $4,950 |
| /themes/ | 3 | $197, $297, $650 |
| /ai-leverage-audit/, /book/ | 2 to 3 | $197, $297 (the audit page also names the workflow buildout) |
| Every other page (16) | 2 | $197, $297, from the audit band at the bottom |
| /government-capabilities/ | 0 | |

## Files written from these prices at build time

| File | What it carries | Made by |
|---|---|---|
| /pricing.md | Every tier, monthly option, add-on and the presence report | `content/agent-docs.ts`, written by `vite.config.ts` |
| /ai-leverage-audit.md | $197 and $297, the workflow buildout | same |
| /command-center.md | Foundation and Operator | same |
| /faq.md | Every FAQ answer, with $450, $650, from $950, $1,950, $4,950, $295 | same |
| /llms.txt | No amounts; points to /pricing.md | same |
| /pricing/ offers JSON-LD | Every dollar amount in `content/pricing.ts` (the build checks this) | `pricingJsonLd()`, put in the shell by `scripts/generate-route-shells.mjs` |
| Search descriptions | /pricing/ ($197, from $1,950, $295/month), /book/ and /ai-leverage-audit/ ($197, $297) | typed in `seo/routes.json` |
| FAQ JSON-LD | The FAQ answers word for word, prices included (the build checks it matches the page) | typed in `seo/routes.json` |

## Not Bruce Works prices

- The stack calculator on Home and /command-center/ ($101, $1,212 and so on): typical prices of other people's apps,
  editable by the visitor (`content/stack.ts`).
- The Look-Legit Kit PDF: prices of the ten tools it recommends.
- $3.19M in the capability statement: assets Bruce was accountable for, not a price.
- $0 in the loadout builder: "nothing monthly".

## What stands out

1. Ten different numbers on /pricing/ and seven on /services/, and no website price anywhere, though websites are
   what Rod is calling about.
2. The main button on almost every page is the paid audit ("Book the $197 audit"), not a free call or the free report.
3. $295 a month (hosting and care) sits next to $297 (the in-person audit): it reads like a typo.
4. $450 is two different things (the Fix Sprint and an extra agent).
5. The free fit call on /book/ says "No deliverable", while /pricing/ says the free report is handed over on that call.
6. /pricing/ still says new websites are quoted separately.

## After v2.11.0 (three doors)

Same crawl, same counting, on the v2.11.0 build. The rule is in [PRICING.md](PRICING.md).

| Page | Different prices | Which |
|---|---|---|
| /pricing/ | 12 | Free, $197, $297, $295, $350, $450, $500, $650, from $950, $1,500, from $1,950, from $4,950 |
| /ai-leverage-audit/, /book/ | 2 | $197, $297 |
| Home, /services/ and every other page | 3 | from $500, $197, from $1,950 |
| /contact/, /government-capabilities/ | 0 | |
