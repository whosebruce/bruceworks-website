# Changelog

Every release of [bruceworks.net](https://bruceworks.net). The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/)
for the site as a whole (see "Releases" in the README).

## [2.2.0] - 2026-10-01

### Added
- **One included deliverable with the audit.** The client picks one with Bruce during the audit: an AI assistant
  brief, one documented workflow, one business template, or their plan on one page. It stays small (no account
  integrations, no ongoing support). Prices are unchanged, and the fee is still credited toward a build within 30 days.
- **A free 30-minute fit call**, offered on the booking page as "Not sure? Book a free fit call".
- Each booking choice loads its own event from Bruce's Cal.com (`ai-audit`, `ai-audit-in-person`, `fit-call`), the
  selected event's direct link is always on the card, and `/book/?event=in-person` or `/book/?event=fit` opens on that
  choice (the remote audit is the default). The card shows the price, the invoice-after-intake terms and the audit's
  promise before anyone books.
- **Booking page, `/book/`.** Bruce's self-hosted Cal.com sits in the middle of the page, in the visitor's theme (light
  or dark, plus the theme's brand, background, text and border colors, re-sent live when the theme changes). It has
  Remote ($197) and In person, San Diego ($297) tabs. Booking is free; the audit is invoiced after intake.
- **The falling blocks.** The 25 apps the Command Center replaces fall around the calendar. They land on top of it and
  pile up beside it, and you can grab, throw or tap them; a tap flips a block to what takes its place (a module, or an
  open-source app such as Cal.com, Nextcloud or Vaultwarden). The page uses Matter.js, loaded on this page only. It
  pauses when off screen or settled, shows 10 blocks on phones, and shows a still row when the visitor asks for
  reduced motion. After a booking, every block flips.
- A readable list of the same swaps under the calendar, and the request form as a fallback if the calendar can't load.
- Screenshots in the README, this changelog, version tags and GitHub Releases.

### Changed
- Every "Book the audit" button now goes to `/book/`. The audit page leads with "Pick a time".
- Header links fit in every theme. When a theme's font is too wide, the links first close up; if they still don't fit,
  About, then Government, then Themes move into the menu, which then shows on large screens too.
- The self-hosted service cards on Pricing are all the same height.
- The menu opens below the top bar on large screens.

### Fixed
- On Harbor, "About" ran into the Theme button.
- On phones, the swipe counter ran one card behind and never reached the last card (it showed 7 / 8 at the end). Tapping
  a dot now lands on that card, and rows that fit without scrolling don't show a counter.

## [2.1.0] - 2026-10-01

### Added
- Motion loops for every module: Files, Library, Projects, Finance, Pages (coming), Motion, Voice, Content,
  Notifications, Vault and Web, on top of Crew, Approvals, Jot, Office, Studio and School.
- Vulcan, the builder, joins the squad, and there's a five-bot hero image and loop.

### Changed
- Squad jobs corrected: Mira runs command and the agents, Apollo the content, Jade the research, Otto the ops and Vulcan
  the builds. New art for Apollo, Jade and Vulcan, and the squad, crew, theme and vault loops were re-rendered to match.
- The approval demo is now Apollo asking to publish a post.
- Both government PDFs were re-rendered with the SBA VetCert facts and the real logo (REV 2026-10).
- The Island Delicacy case study matches her updated brand kit.

### Removed
- Art that showed the old jobs (Apollo on automations, Jade on content, the four-bot hero).

## [2.0.0] - 2026-10-01

The Field Manual rebrand: the site now sells the private AI Command Center, one super app built to how you live and
work.

### Added
- A theme engine: five house themes (Field Manual, Field Manual // Day, Midnight Plush, Harbor, Phosphor) and five
  client themes from brand kits Bruce built (2 Ships, Island Delicacy, Highspot, Kitsap Brakes, Wakandaboy100), as
  tokens only. Visitors can switch at any time, and the logo, art and demo follow.
- The real Command Center as a live demo on sample data.
- New pages: Command Center, Live Demo, Themes, Pricing (the approved tiers: Recon, Foundation, Operator, Command,
  Government), Case Studies (five clients) and Field Notes (three articles).
- An app-stack calculator, a module explorer, approval and theme demos, and swipe rows on phones.
- SBA VetCert SDVOSB and VOSB alongside California DVBE and SB (Micro) and SAM.gov.
- Remotion motion graphics and on-brand art.

### Changed
- Every page redesigned in the Field Manual system, with the real tool-built B logo (the yellow B tile is retired).
- Faster first visits: code-split pages, subset WOFF2 fonts, and a demo that loads only when you launch it.
- SEO kept and extended: 26 routes with their own metadata, static shells and sitemap entries.

## [1.0.0] - 2026-09-25

The original bruceworks.net (January to September 2026): services, the AI Leverage Audit, government capabilities
with the SAM.gov registration and the California DVBE and SB (Micro) certifications, FormSubmit forms with SMS
consent, static route shells and the build checks.

[2.2.0]: https://github.com/whosebruce/bruceworks-website/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/whosebruce/bruceworks-website/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/whosebruce/bruceworks-website/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/whosebruce/bruceworks-website/releases/tag/v1.0.0
