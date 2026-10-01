# Bruce Works Website

Source for [bruceworks.net](https://bruceworks.net), the public website of Bruce Works LLC.

Bruce Works is a San Diego company that helps owner-led service businesses organize business knowledge, modernize repetitive workflows, and build practical AI-assisted systems inside tools the client owns. The site covers services, the AI Leverage Audit, the systems Bruce Works runs internally, and a government capabilities page for agencies and prime contractors.

The site is live and deploys automatically from `main`.

## Stack

- React 18, TypeScript, Vite 5
- Tailwind CSS 3
- React Router 6 with clean `BrowserRouter` routes
- Lucide React icons
- GitHub Pages, deployed by GitHub Actions

## Quick start

You need Node.js (CI uses Node 24). A full `npm run build` also needs Python 3 and Chrome or Chromium; see [Build checks](#build-checks).

```bash
npm install
npm run dev       # Vite dev server, usually http://localhost:5173/
npm run build     # checks, type check, production build, route shells, route verification
npm run preview   # serve the production build locally
```

The build writes to `dist/`, which is not committed.

## Routes

| Page | Route | Notes |
| --- | --- | --- |
| Home | `/` | |
| Services | `/services/` | |
| Why Us | `/why-us/` | |
| Systems in Use | `/our-work/` | |
| FAQ | `/faq/` | |
| About Bruce | `/about-bruce/` | |
| Experience & Background | `/experience/` | |
| Why Bruce Works? | `/why-hire-bruce/` | |
| AI Leverage Audit | `/ai-leverage-audit/` | |
| Government Capabilities | `/government-capabilities/` | Links the capability statement and certification summary PDFs |
| Contact | `/contact/` | `?topic=government` opens the government inquiry option |
| Review | `/review/` | `noindex`, not in the sitemap |
| Privacy Policy | `/privacy-policy/` | Static HTML in `public/` |
| SMS Consent and Messaging Terms | `/sms-consent/` | Static HTML in `public/` |

`public/kmbo-update/` is a `noindex` redirect to a client's website update request form.

Older `#/` hash URLs from the previous HashRouter version are rewritten once to the clean route by an inline script in `index.html`.

## How it's organized

```text
.
├── App.tsx               # Router and page registration
├── index.tsx             # React entry point
├── index.html            # App shell: meta tags, JSON-LD, legacy hash-route redirect
├── index.css             # Tailwind layers, @font-face rules, global styles
├── components/           # Shared sections: Header, Footer, Hero, ContactCTA, FAQ,
│                         # GovernmentTrustStrip, PhoneAndSmsConsent, RouteMetadata, ...
├── pages/                # One component per route
├── content/              # government.json: single source of truth for government facts
├── seo/routes.json       # Titles, descriptions, robots, sitemap settings and JSON-LD per route
├── scripts/              # Build checks, route shell generator, route verifier, screenshots
├── documents/            # Source content for the two government PDFs
├── public/               # Copied into the build as-is
│   ├── CNAME             # bruceworks.net
│   ├── documents/        # Capability statement and certification verification summary PDFs
│   ├── fonts/            # Self-hosted fonts, licenses in FONT-LICENSES.md
│   ├── privacy-policy/   # Static privacy policy
│   ├── sms-consent/      # Static SMS consent and messaging terms
│   ├── kmbo-update/      # Client update-form redirect
│   └── robots.txt, sitemap.xml, og-image.png, logos, favicon
├── tailwind.config.js    # Theme colors, fonts and content paths
├── vite.config.ts
└── .github/workflows/deploy.yml
```

Route metadata lives in one place. `seo/routes.json` feeds `components/RouteMetadata.tsx`, which updates the document head during client-side navigation, and `scripts/generate-route-shells.mjs`, which writes a static `index.html` for every route (plus `404.html`) at build time. Direct requests to any route get a 200 with the right title, description, canonical URL and Open Graph tags, and a short crawlable summary before React mounts.

The site's forms (the shared `ContactCTA` section, Contact, AI Leverage Audit and Review) post to FormSubmit. Every phone field goes through `components/PhoneAndSmsConsent.tsx`, which carries the SMS consent choices.

`documents/*.input.json` holds the source content for the PDFs in `public/documents/`. The PDF renderer is not part of this repo: since October 2026 the PDFs are built on the Mac with `~/Projects/bw-doc-render/render.py` (input JSON → HTML → headless Chrome PDF, then page-count, font-embedding, text and email checks; `--publish public/documents` copies them in, `--compare OLD.pdf` adds a side-by-side proof). Before that they came from the document factory skill on the VM (`bruce-works-document-factory`). Regenerate and replace the PDFs whenever that content changes.

## Build checks

`npm run build` runs these steps in order and stops on the first failure:

1. `check:sms-compliance` (`scripts/check_sms_compliance.py`): phone fields only appear in `PhoneAndSmsConsent.tsx`, every known phone form uses it, and the static privacy and SMS consent pages keep their required language.
2. `check:government-capabilities` (`scripts/check_government_capabilities.py`): `content/government.json` holds the verified facts (pinned in the script), the government page, home trust strip, route metadata, JSON-LD, sitemap entry and PDF sources carry them, nothing public uses stale or prohibited wording, and no page claims a designation (8(a), HUBZone, WOSB and others) or contract award that the facts file does not list.
3. `tsc` and `vite build`.
4. `scripts/generate-route-shells.mjs`: per-route shells and `404.html` in `dist/`.
5. `verify:routes` (`scripts/verify-routes.mjs`): serves `dist/` locally and checks every route for a 200, route metadata, working assets, valid JSON-LD, a sitemap that matches `seo/routes.json`, and that legacy `#/` URLs redirect exactly once in headless Chrome.

The route verifier looks for `google-chrome-stable`, `google-chrome`, `chromium-browser` or `chromium` on your `PATH`. Set `CHROME_PATH` to point it at another Chrome binary (on macOS, the executable inside the Chrome app bundle).

`npm run screenshots` captures 1440px desktop and 390px mobile full-page screenshots of key routes from an existing `dist/` build into `screenshots/`, or into a directory you pass after `--`.

## Common edits

- **Add a page:** create it in `pages/`, register it in `App.tsx`, add an entry to `seo/routes.json`, and add it to `public/sitemap.xml` if it should be indexed. The verifier fails if the sitemap and `seo/routes.json` disagree.
- **Top navigation:** the `navItems` array in `components/Header.tsx`.
- **Footer links and contact details:** `components/Footer.tsx`.
- **Logos:** `public/logo.png` and `public/logo-scrolled.png`, served as `/logo.png` and `/logo-scrolled.png`.
- **Brand colors and fonts:** `tailwind.config.js` and the `@font-face` rules in `index.css`.
- **Government facts** (registration, certifications, PDFs): edit `content/government.json`; the government page, home trust strip, contact page and static route summary read it. Then update the pinned facts in `scripts/check_government_capabilities.py`, the literal text in `seo/routes.json` and the `index.html` JSON-LD, and the PDF sources in `documents/`, and re-render `public/documents/`. The build checks them together.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Check out the repo and set up Node 24
2. `npm install`
3. `npm run build`
4. Upload `dist/` as the GitHub Pages artifact
5. Deploy to GitHub Pages

`public/CNAME` is copied into `dist/CNAME`, which keeps the custom domain `bruceworks.net` attached. After a push, check the Actions run and then the live site.

## Maintainer

Built and maintained by Jonathan Bruce, [Bruce Works LLC](https://bruceworks.net). © Bruce Works LLC. All rights reserved.
