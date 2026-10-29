# How prices show on the site

Since v2.11.0 (Bruce, 2026-10-22). The numbers themselves live in `content/pricing.ts`; change one only with Bruce's
say-so. What the site showed before this change is in [PRICE-INVENTORY.md](PRICE-INVENTORY.md).

## Three doors

Outside /pricing/, the site shows three prices and no others, always worded the same way, from `DOORS` in
`content/pricing.ts`:

| Door | Price | Button | Goes to |
|---|---|---|---|
| Websites | from $500 | Book a free call | the free 30-minute call, `/book/?event=fit` (`FIT_CALL`) |
| AI Leverage Audit | $197 remote | Book a free call | the same free call |
| Command Center | from $1,950 | Book a free call | the same free call |

Each door also has a small "What you get" link. Under them: "Every price is on the pricing page. Scope and price in
writing before work starts."

`components/Doors.tsx` draws them three ways: `Doors` (the cards, on Home), `DoorList` (one row each, at the top of
/services/) and `DoorsBand` (the closing band at the bottom of most pages: "Start with a free call.").

## Where other prices may show

- **/pricing/**: the full ladder, with "from" (`from: true` on a tier) where the business sets the rest: the free
  report, the Fix Sprint, the free preview, the one-page and custom websites (terms since 2026-10-29 in
  [LOCAL-OFFER.md](LOCAL-OFFER.md)), the audit, Foundation and Operator, the workflow buildout,
  monthly hosting and care, the add-ons and the government quote. /pricing.md and the offers JSON-LD are written from
  the same file, and the build fails if either misses a price.
- **/ai-leverage-audit/ and /book/**: the audit's own two prices ($197 remote, $297 in person), because that's where
  it's bought.
- **FAQ answers to a specific price question** (an extra agent, a custom theme, hosting). "What does it cost?" leads
  with the three doors. The FAQ JSON-LD in `seo/routes.json` must match the page word for word.

Everywhere else (Services, Command Center, Live Demo, Why Us, Themes, Contact, case studies, field notes) shows only
the door prices or none. The main button is "Book a free call", not "Book the audit".

## Rules

- No "was", "normally" or crossed-out prices. A former price has to be one actually charged (California Business and
  Professions Code §17501).
- "From" means the price starts there; the exact price goes in writing before work starts.
- A new offer either fits one of the three doors or lives on /pricing/ only. Adding a fourth door is Bruce's call.
