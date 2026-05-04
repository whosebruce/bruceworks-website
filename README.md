# Bruce Works Website

React + Vite website for **Bruce Works LLC**, a professional handyman service serving the San Diego / Chula Vista area.

Live site: https://bruceworks.net

## What this repo contains

This repository holds the full source for the public Bruce Works marketing website, including:

- Home page and service overview
- Quote/contact form section
- Footer profile pages about Bruce and his background
- FAQ, review, services, why-us, and portfolio-style pages
- Logo assets used by the deployed GitHub Pages site
- GitHub Actions workflow for automatic deployment

## Tech stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router** using `HashRouter`
- **Lucide React** icons
- **GitHub Pages** deployment

## Project layout

```text
.
├── App.tsx                 # Main router and page registration
├── index.tsx               # React app entry point
├── index.html              # Vite HTML shell
├── index.css               # Tailwind/global styles
├── components/             # Shared reusable UI sections
│   ├── Header.tsx          # Top navigation and logo behavior
│   ├── Footer.tsx          # Footer links, company info, contact links
│   ├── Hero.tsx            # Home page hero section
│   ├── PageHero.tsx        # Reusable inner-page hero banner
│   ├── ContactCTA.tsx      # Quote/contact form section
│   ├── FeatureSection.tsx  # Service feature blocks
│   ├── FAQ.tsx             # FAQ component used on home page
│   ├── QuoteSection.tsx    # Quote/value section
│   ├── ValueProps.tsx      # Trust/value cards
│   └── Button.tsx          # Shared button component
├── pages/                  # Route-level pages
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── WhyUs.tsx
│   ├── OurWork.tsx
│   ├── FAQPage.tsx
│   ├── Review.tsx
│   ├── AboutBruce.tsx
│   ├── Experience.tsx
│   └── WhyHireBruce.tsx
├── public/                 # Static files copied into the build
│   ├── CNAME               # Custom domain for GitHub Pages
│   ├── logo.png
│   └── logo-scrolled.png
├── dist/                   # Production build output used by Pages artifact
├── .github/workflows/      # GitHub Pages deployment workflow
├── tailwind.config.js      # Tailwind theme/colors/content paths
├── vite.config.ts          # Vite config
└── package.json            # Scripts and dependencies
```

## Routes

The site uses `HashRouter`, so public links include `#/` paths.

| Page | Route |
| --- | --- |
| Home | `https://bruceworks.net/#/` |
| Services | `https://bruceworks.net/#/services` |
| Why Us | `https://bruceworks.net/#/why-us` |
| Our Work | `https://bruceworks.net/#/our-work` |
| FAQ | `https://bruceworks.net/#/faq` |
| About Bruce | `https://bruceworks.net/#/about-bruce` |
| Experience & Background | `https://bruceworks.net/#/experience` |
| Why Hire Bruce? | `https://bruceworks.net/#/why-hire-bruce` |
| Review Funnel | `https://bruceworks.net/#/review` |

## Local development

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

### Build for production

```bash
npm run build
```

The built site is written to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

## Editing common areas

### Add or edit a page

1. Create or edit a file in `pages/`.
2. Register the route in `App.tsx`.
3. Add navigation/footer links in `components/Header.tsx` or `components/Footer.tsx` if needed.

### Edit footer links

Update:

```text
components/Footer.tsx
```

The footer currently links to the Bruce profile pages, services, work examples, FAQ, and review funnel.

### Edit top navigation

Update the `navItems` array in:

```text
components/Header.tsx
```

### Edit logos

Logo files live in:

```text
public/logo.png
public/logo-scrolled.png
```

These are referenced from the site as:

```text
/logo.png
/logo-scrolled.png
```

If the logo does not appear on the live site, confirm the PNG files are valid image files and not corrupted text/binary conversions.

### Edit brand colors

Update Tailwind theme values in:

```text
tailwind.config.js
```

## Deployment

Deployment is handled automatically by GitHub Actions.

Workflow file:

```text
.github/workflows/deploy.yml
```

On every push to `main`, GitHub Actions will:

1. Check out the repo
2. Install dependencies
3. Run `npm run build`
4. Upload `dist/` as the GitHub Pages artifact
5. Deploy the site to GitHub Pages

## Custom domain

The live domain is configured through the `CNAME` file:

```text
public/CNAME
```

Vite copies this into `dist/CNAME` during build so GitHub Pages keeps using:

```text
bruceworks.net
```

## Notes for future updates

- Keep customer-facing copy clear, local, and trust-focused.
- Avoid generic placeholder content when possible.
- Use Bruce’s real background: handyman work, logistics, IT, military reliability, and problem-solving.
- Run `npm run build` before pushing meaningful code changes.
- After pushing to `main`, check the GitHub Actions deploy run and verify the live site.
