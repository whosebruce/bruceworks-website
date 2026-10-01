# bruceworks.net design system

The site wears the Bruce Works **Field Manual** brand (brand kit: Night Ops ground, Signal Yellow, Big Shoulders
Display, Barlow, IBM Plex Mono, square corners, hazard stripes) and can be re-skinned by the visitor with the theme
picker, the same way a client's Command Center wears the client's brand. So every page is built from **theme tokens**,
never from fixed colors or fonts.

## Tokens (index.css)

Colors are RGB channels on `<html data-theme>`; Tailwind maps them (tailwind.config.js):

| Class | Use |
|---|---|
| `bg-ground`, `bg-ground-2`, `bg-ground-3` | page, raised panel, higher panel |
| `border-line`, `border-line-2` | borders, hairlines |
| `text-ink`, `text-ink-2`, `text-ink-3` | headings, body, muted |
| `bg-signal`, `text-signal-ink` | THE accent (one signal element per layout) and the text on it |
| `text-signal-text` or `.sig` | the accent as text (it's darkened where the ground is light) |
| `text-alert` | section numbers and warnings only |
| `bg-paper`, `text-paper-ink` | photo panels (character art is drawn on white) |

Shape and type come from CSS variables: `var(--radius)`, `var(--radius-lg)`, `var(--border-w)` (`border-theme`,
`rounded-theme`, `rounded-theme-lg`), `font-display` / `font-body` / `font-label` / `font-mono`.
Never write a hex color, a `rounded-*` size, `shadow-*`, a gradient, `text-gray-*`, `bg-white` or a font name in a page.
The old names `primary`, `secondary`, `dark`, `lightgrey` are legacy; don't use them in new work.

## Components

- `components/brand.tsx`: `OpTag` ("OP-04 // TOPIC"), `SectionHeader` (red number + mono label + rule), `Display`
  (headline in the theme's display face and case), `HazardStrip`, `PhotoPanel` (white panel, Signal border, tilt; where
  character art and screenshots go), `Check` (☑ list item), `Chamfer` (panel with a cut corner), `GridBand` (a full-width
  band with the page grid's vertical rules and + marks), `useReveal()` (add `className="reveal"` to animate in),
  `Loop` (a muted motion loop that plays only on screen), `BTile`.
- `components/PageIntro.tsx`: the top of every inner page.
- CSS classes: `.display`, `.label` (mono caps), `.chip` (condensed label), `.panel`, `.btn .btn-primary`,
  `.btn .btn-outline`, `.field` (inputs), `.container-x`, `.texture`, `.hazard`.
- `components/DemoFrame.tsx`: the live Command Center demo (iframe on desktop, a button on phones).
- `components/ThemePicker.tsx`: `ThemeMenu`, `ThemeRow`. `theme/ThemeProvider.tsx`: `useTheme()`.

## Content is data (content/)

`modules.ts` (what's in the Command Center; only `live` ones may be claimed as available), `pricing.ts` (tiers and
add-ons, **proposed, not approved** until `PRICES_APPROVED` is true), `stack.ts`, `usecases.ts`, `media.ts` (every
image and motion loop; a `null` slot renders a placeholder). Pages read from these instead of repeating facts.

## Rules

- **Voice:** jobsite English. Outcome first, then steps. Short sentences. First person "I" from Bruce, "you" to the
  reader. Display headlines are short. No emoji. Don't use: game-changer, revolutionary, 10x, effortless, magic,
  seamless, synergy, disrupt, "just".
- **Honesty:** never claim a module, feature, result, client, award or number that isn't real. "Coming" features say so.
  No invented testimonials or logos. Government facts come only from the government facts file and are checked by
  `scripts/check_government_capabilities.py`.
- **One signal per layout:** one yellow thing leads each section (usually the `.sig` words or the primary button).
- **Motion:** fast and linear-ish, no bounce, nothing that loops forever in the reader's face except muted motion
  graphics that pause off screen. Respect `prefers-reduced-motion`.
- **Mobile first:** check every section at 390px. Nothing may push the page sideways. Tap targets ≥ 44px.
- **Imagery:** brand character art in photo panels, motion graphics, and real product screens only. No stock photos.
- **Accessibility:** real headings in order, labels on every input, focus states visible, alt text that says what an
  image shows.

## Pages and SEO

A page is `pages/<Name>.tsx`, registered in `App.tsx`, with its metadata in `seo/routes.json` (title, description,
robots, sitemap, optional `jsonLd`) and its URL in `public/sitemap.xml` (the build fails if they disagree).
`npm run build` runs the SMS compliance check (every phone field goes through `components/PhoneAndSmsConsent.tsx`, used
only by `ContactCTA`, `pages/AILeverageAudit.tsx` and `pages/Contact.tsx`), the government check, `tsc`, the Vite
build, the static route shells and the headless-Chrome route verifier.
