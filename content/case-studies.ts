import type { ThemeId } from '../theme/themes';

// The case studies. Every client here agreed to be shown. Every line traces to the client's own files, their public
// repo, their live site or Bruce's own answers (the source is noted above each entry); where a fact couldn't be
// confirmed it was left out. No owner or founder names (Bruce: "if they want the names they can go to their website"),
// no testimonials, no invented numbers or dates. The clients made their own logos; the claim is always refinement and a
// print-ready logo system, never logo design. Themes are tokens only (theme/themes.ts): no client logos or artwork on
// this site, except what shows in a screenshot of a public site captured for [ SCREEN PROOF ].

export type CaseStatus = 'live' | 'in progress' | 'delivered';

export type Screen = { src: string; alt: string; w: number; h: number };

export type CaseStudy = {
  slug: string;
  client: string;
  /** The kind of business, in a few words. */
  kind: string;
  theme: ThemeId;
  /** One line. */
  summary: string;
  /** The brief: what they do and what they needed (paragraphs). */
  challenge: string[];
  /** What Bruce Works delivered, only what the files show. */
  built: { what: string; detail: string }[];
  /** What they have now (paragraphs). Verifiable facts only; no metrics we can't show. */
  outcome: string[];
  /** Public live sites only, confirmed from the repo, CNAME, files or Bruce. */
  links: { label: string; href: string }[];
  status: CaseStatus;
  look: {
    /** The brand kit's names for the theme's four swatch colours: ground, panel, text, signal. */
    palette: [string, string, string, string];
    type: { role: string; face: string }[];
    /** House rules, from the client's brand kit. */
    rules: string[];
    /** Anything a visitor should know about how the theme relates to what's live. */
    note?: string;
  };
  /** Screenshots of the public live site, captured by Bruce Works (public/media/cases/, WebP). */
  screens?: { desktop: Screen; phone?: Screen; captured: string };
};

/** How the work gets made, in one honest line (Bruce: "AI assisted, with Bruce flavor aka human input and perfection"). */
export const HOW_MADE = 'AI-assisted, with Bruce flavor: the tools draft fast, then I add the human input and sweat every detail until it’s right.';

const shot = (slug: string, client: string, captured: string, phone = true) => ({
  desktop: { src: `/media/cases/${slug}-desktop.webp`, alt: `The ${client} home page on a desktop screen, ${captured}.`, w: 1440, h: 900 },
  ...(phone ? { phone: { src: `/media/cases/${slug}-phone.webp`, alt: `The ${client} home page on a phone, ${captured}.`, w: 780, h: 1688 } } : {}),
  captured,
});

export const CASE_STUDIES: CaseStudy[] = [
  // Sources: github.com/whosebruce/kitsap-mobile-brakes-website (index.html, services/index.html, contact/index.html,
  // CNAME, sitemap.xml, robots.txt, README.md; GitHub Pages API: https://kitsapmobilebrakes.com/, HTTPS enforced);
  // Kitsap Mobile Brakes/Brand Guidelines.dc.html (v1.0: logo rules, KMBO wordmark); Kitsap Mobile Brakes/assets/;
  // Kitsap Mobile Brakes/KMBO Invoice Tool - Offline.html and Invoice Creator.dc.html; bruceworks-website
  // public/kmbo-update/ (update-request form, commit 41a4f94). Logo refinement: Bruce, 2026-10-01.
  {
    slug: 'kitsap-mobile-brakes',
    client: 'Kitsap Mobile Brakes & Oil',
    kind: 'Mobile mechanic · Kitsap County, WA',
    theme: 'kitsap-brakes',
    summary: 'A brand guide, a three-page website and an offline invoice tool for a mechanic who does brakes and oil changes in the customer’s driveway.',
    challenge: [
      'KMBO does brakes, oil changes and general mechanical work in customers’ driveways across Kitsap County, Washington. No shop visit, no waiting room.',
      'There’s no booking system and no contact form: customers call or text one business line. So the website’s whole job is to say what KMBO fixes, where it goes and what the labor costs, then put that number one tap away. And it had to sound like the work: rugged and direct, plain talk about cars and money.',
    ],
    built: [
      { what: 'Brand guidelines', detail: 'Version 1.0: palette, type, logo rules, voice and the "Rules of the Road" that keep every page on brand.' },
      { what: 'Logo refinement and system', detail: 'The owner’s logo refined and set up for black grounds, plus a KMBO wordmark for small spaces, clear space and a minimum size, so it prints clean.' },
      { what: 'Three-page website', detail: 'Home, Services & Prices, and Contact. Plain static pages with no build step, and layouts for tablets and phones.' },
      { what: 'Prices up front', detail: 'The Services page lists the labor price for every standard job. Parts are quoted by vehicle.' },
      { what: 'Call or text, one tap', detail: 'The business number is a tap-to-call link on every page. No forms to fill in.' },
      { what: 'Search and sharing basics', detail: 'A description and canonical address on each page, share cards, a sitemap and robots.txt, and clean URLs with redirects from the old .html addresses.' },
      { what: 'Custom domain and hosting', detail: 'kitsapmobilebrakes.com on GitHub Pages, HTTPS enforced, with the old address redirecting to it.' },
      { what: 'Offline invoice and quote tool', detail: 'Runs in a browser with no connection and saves on the device. Labor and parts lines, the standard prices one tap away, an editable sales-tax table by area, a signature pad, print or save as PDF, and backup and restore.' },
      { what: 'Update requests and docs', detail: 'One update-request form for site changes, and a README that says where the prices, phone and service areas live and how the site deploys.' },
    ],
    outcome: [
      'KMBO’s site is live at kitsapmobilebrakes.com: three pages over HTTPS, with every old address redirecting to its new one. The pages run no JavaScript at all, so there’s very little that can break.',
      'Off the site, the business has its own invoice and quote tool that works without a connection and keeps its records on the device. The invoicing tool and business records stay out of the public code on purpose.',
    ],
    links: [{ label: 'kitsapmobilebrakes.com', href: 'https://kitsapmobilebrakes.com/' }],
    status: 'live',
    look: {
      palette: ['Asphalt Black', 'Asphalt, one step up', 'Bone', 'Ignition Orange'],
      type: [
        { role: 'Headlines', face: 'Anton, always uppercase' },
        { role: 'Body', face: 'Barlow, sentence case' },
        { role: 'Labels, buttons', face: 'Barlow Condensed, uppercase, tracked out' },
      ],
      rules: [
        'Hard edges only. Zero corner radius is the brand’s signature move.',
        'One accent, Ignition Orange, and never two accents on one surface.',
        'Borders, not shadows: no drop shadows, no gradients, no glass.',
        'Numbers up front. A price is a headline, not fine print.',
      ],
    },
    screens: shot('kitsap-mobile-brakes', 'Kitsap Mobile Brakes & Oil', 'captured October 1, 2026'),
  },

  // Sources: Island Delicacy/Ready Documents/Island Delicacy Restaurant brand kit setup/Island Delicacy Brand Kit.dc.html
  // (the brand: the v1 "Brand Starter Kit": direction, logo family, color & type, photography, templates, guidelines;
  // Bruce, 2026-10-01: the client kept v1); Island Delicacy Directions.dc.html and Island Delicacy Brand Kit v2.dc.html
  // (explored, passed on); Ready Documents/design_handoff_ordering_site/README.md (lines 3, 11-18) and its zip; Ready
  // Documents/FIX_ORDER_PAGE.md (both bugs fixed on the live site, checked 2026-10-01); Content Creation/ (Affinity
  // sources and PDFs: business cards, menus, 24x36 poster, flyers; made by Bruce Works: Bruce); live site
  // https://islanddelicacy.com/ (pages, css/styles.css, "Secure payment via Square"; real payments: Bruce).
  {
    slug: 'island-delicacy',
    client: 'Island Delicacy',
    kind: 'Preorder Caribbean kitchen · San Diego',
    theme: 'island-delicacy',
    summary: 'A brand kit, a preorder site that takes orders and payments, and the print to match, for a San Diego kitchen that cooks Jamaican and Caribbean plates to order.',
    challenge: [
      'Island Delicacy is a preorder kitchen, not a restaurant. Every Jamaican and Caribbean plate is cooked for the person who ordered it, so it takes a day’s notice.',
      'Orders used to come in by text and DM, paid by app. The kitchen needed one place to see the menu, order for a future day and pay. And the brand needed a refresh: keep the black, gold and deep-green soul of the original, lose the heavy glow and the clipart, and look as good as the food tastes.',
    ],
    built: [
      { what: 'Brand kit', detail: 'Night ink, charcoal and gold: brand direction, logo family, color and type, photography, templates and guidelines.' },
      { what: 'Logo refinement and system', detail: 'The owner’s logo cleaned up into a flat-gold line-art sunrise that reads at any size, in four locked versions: full lockup, mark only, one color and social avatar. Ready for signs, stamps and single-ink print.' },
      { what: 'Templates', detail: 'Menu flyer, Instagram square and story, a catering one-sheet and a business card.' },
      { what: 'Other directions, explored', detail: 'Three more identity directions and a full lighter kit, Callaloo & Cream. The kitchen stayed with the darker look.' },
      { what: 'Ordering site design and spec', detail: 'A clickable prototype and a written build spec: pick a plate, two sides, quantity and a pickup day, with a cutoff countdown and sold-out counters.' },
      { what: 'Live preorder site', detail: 'Home, Order, Catering, Events, About and FAQ, plus a link-in-bio page. A multi-plate cart, extras and plate notes, a review step, then checkout through Square.' },
      { what: 'Catering', detail: 'Tray prices per dish, build-your-own spreads, and an inquiry that opens a text or an email.' },
      { what: 'Print', detail: 'Business cards, printable menus and menu flyers, a 24 x 36 poster, and event and holiday flyers.' },
      { what: 'Live-site fixes', detail: 'A redirect loop on the order page and stretched side-dish cards, both found and fixed on the live site.' },
    ],
    outcome: [
      'Island Delicacy takes orders and payments at islanddelicacy.com: pick your plates and sides, choose a pickup day, check the order, then pay through Square with no account needed.',
      'The menu, catering trays, events and FAQ live on the same site now, instead of in a text thread.',
    ],
    links: [{ label: 'islanddelicacy.com', href: 'https://islanddelicacy.com/' }],
    status: 'live',
    look: {
      palette: ['Night Ink', 'Charcoal', 'Cream', 'Sun Gold'],
      type: [
        { role: 'Headlines', face: 'Bricolage Grotesque' },
        { role: 'Body, labels, prices', face: 'Archivo' },
        { role: 'Signature', face: 'Yellowtail, one flourish word per layout' },
      ],
      rules: [
        'Black and charcoal carry everything. Gold is the star; green grounds it.',
        'Scotch Bonnet orange is a spice: one small hot accent at a time, never a background.',
        'Yellowtail never goes on body copy or prices.',
        'Sound warm, proud, welcoming, confident and a little playful.',
      ],
      note: 'The kit’s headline face is Bricolage Grotesque. The live site and this theme set headlines in wide Archivo capitals instead, and the live site adds Source Serif 4 for body copy: you can see it in the screenshots below.',
    },
    screens: shot('island-delicacy', 'Island Delicacy', 'captured October 1, 2026'),
  },

  // Sources: github.com/whosebruce/wakandaboy100 (README.md, DESIGN.md, DESIGN-DIRECTION.md, OPEN_DESIGN.md, CNAME,
  // content/merch.json, scripts/build_site.py, scripts/verify_site.py, scripts/add_media.py,
  // .github/workflows/static.yml; GitHub Pages: https://wakandaboy100.com/, HTTPS enforced); Wakandaboy100/Default
  // Website/Wakandaboy100 Portfolio Redesign.zip (Brand Guidelines.dc.html, Brand Guidelines Deck.dc.html, github.md);
  // Wakandaboy100/Logo/Desktop Affinity Sources and Exports/; Wakandaboy100/Product Merch/ (FW 01-21, Fourthwall Drop
  // 001/manifest.json). Fourthwall store set up and built by Bruce Works, matched to the site: Bruce, 2026-10-01. The
  // channel numbers on the live site are the artist's own, not results of this work: not used.
  {
    slug: 'wakandaboy100',
    client: 'Wakandaboy100',
    kind: 'Independent artist · music, dance, comedy',
    theme: 'wakandaboy',
    summary: 'A brand guide, a six-page portfolio that checks itself before every deploy, and a merch store with print-ready art, for an artist who does music, dance and comedy.',
    challenge: [
      'Wakandaboy100 is an independent artist and performer working across music, dance, comedy and video. The work lives everywhere: YouTube, six streaming services, Instagram clips, private-event bookings and a merch line, The Ultimate Cardio.',
      'The site had to pull all of that under the stage name, with a real page for music, videos, booking and merch that people and search engines can find. And the look had to change, from the dark neon "night stage" of the earlier version to a clean athletic one in heather grey and ink black.',
    ],
    built: [
      { what: 'Brand guidelines, Edition 01', detail: 'Six sections: the brand, the mark, color, typography, voice and words, and in the wild. As a scrolling guide and a 24-slide deck.' },
      { what: 'Logo refinement', detail: 'The artist’s dancer mark refined into clean vector masters in Affinity, with SVG, EPS and PDF exports, ready for print and merch.' },
      { what: 'Six-page portfolio site', detail: 'Home, About, Videos, Music, Booking and Merch, plus a custom 404 page. Mobile menu and reduced-motion support.' },
      { what: 'Watch and listen', detail: 'Music-video and comedy-clip cards that open on YouTube and Instagram, and links to all six streaming services.' },
      { what: 'Booking', detail: 'A three-step guide to requesting a private event, ending at an Instagram message.' },
      { what: 'Fourthwall store and merch page', detail: 'The online shop on Fourthwall, set up and built to match the site, and a merch page with The Ultimate Cardio’s nine live styles, each priced and linked to the shop.' },
      { what: 'Print-ready merch art', detail: '300 dpi print files for the shirt, and upload files for 21 product variants: beanies, caps, tanks, shorts and hoodies.' },
      { what: 'Search and sharing', detail: 'Canonical addresses, page descriptions, structured data for the artist and his profiles, a sitemap, robots.txt and share images.' },
      { what: 'Build and check tooling', detail: 'One script builds the six pages; another stops a deploy if a route, tag, link or price is wrong. GitHub Actions runs both before every deploy.' },
    ],
    outcome: [
      'The portfolio is live at wakandaboy100.com: six pages over HTTPS, rebuilt and checked automatically before every deploy, so a broken link or a stale price doesn’t ship.',
      'The Ultimate Cardio sells through the Fourthwall store I set up to match the site: the same nine styles, each one a tap from the merch page.',
    ],
    links: [{ label: 'wakandaboy100.com', href: 'https://wakandaboy100.com/' }],
    status: 'live',
    look: {
      palette: ['Heather Grey', 'Paper White', 'Ink Black', 'Ink Black, reversed'],
      type: [
        { role: 'Headlines', face: 'Anton, uppercase, set tight' },
        { role: 'Body', face: 'Helvetica Neue, never below 16px on the web' },
        { role: 'Labels, nav', face: 'Barlow Condensed' },
      ],
      rules: [
        'No neon, no rainbow. Restraint is the flex.',
        '8px corners and no pill shapes.',
        'Every block reads in order: eyebrow, headline, body, action.',
        'Confident, playful, direct. Short lines, never corporate.',
      ],
    },
    screens: shot('wakandaboy100', 'Wakandaboy100', 'captured October 1, 2026'),
  },

  // Sources: 2 Ship RW LLC/2_SHIPS_RW_LLC_WEBSITE_BRIEF.pdf (the client's brief, July 29, 2026: pp. 2-3, 5, 11, 14, 19);
  // 2 Ships RW Brand Guidelines.pdf and 2 Ships Brand Guidelines.dc.html (V1.0, 31 slides); 2 Ships Homepage.html;
  // Two Ships brand guidelines.zip (design_handoff_2ships_website/: README.md, brand-guidelines-notes.md, logo
  // colourways); live site https://2shipxrodwave.github.io/ (homepage sections, /2-ships-rw-brand-guidelines/,
  // assets/2_Ships_RW_LLC_Corrected_Logo_Package.zip; live: Bruce, 2026-10-01). Logo refinement: Bruce.
  {
    slug: 'two-ships',
    client: '2 Ships RW LLC',
    kind: 'Veteran-led growth and execution firm · Southern California',
    theme: 'two-ship',
    summary: 'A 31-slide brand system, a live website and a print-ready logo package for a growth firm that wanted to look built for big work.',
    challenge: [
      '2 Ships RW LLC helps businesses and mission-driven organizations turn opportunity into execution: strategy, AI-enabled systems, marketing, partnerships and commerce. Its brief asked for a premium, mobile-first website that positions the company as a broad growth and execution platform.',
      'The brief set the standard too: discipline and precision rather than military costume, and never fake metrics, fake clients or anonymous testimonials. In its own words: make it look built for big work.',
    ],
    built: [
      { what: 'Brand guidelines, V1.0', detail: '31 slides in six sections: the brand, the logo, color, typography, graphic language, and voice and application.' },
      { what: 'Logo refinement and package', detail: 'The client’s emblem refined into a production-ready logo package: four colorways, clear space, minimum sizes and what not to do with it.' },
      { what: 'Color and type system', detail: 'The palette with set proportions and contrast-rated pairings, and a type scale in Space Grotesk, IBM Plex Sans and IBM Plex Mono.' },
      { what: 'Graphic language', detail: 'A grid, signal marks and a two-path motif: a strategy route and an execution route meeting at one objective.' },
      { what: 'Homepage design', detail: 'A high-fidelity prototype: an animated two-route hero, six capability lanes, the operating model, the founder and a closing call to action.' },
      { what: 'Developer handoff', detail: 'A README with every token, section, interaction and technical requirement, condensed brand notes, and the logo files in four colors.' },
      { what: 'Live website', detail: 'Capabilities, approach, initiatives, partners, investments and founder sections, and a "Start a conversation" email that asks for the objective, what’s blocked and what a win looks like.' },
      { what: 'Brand resources, published', detail: 'The full guidelines on their own page of the site, and the logo package as a download.' },
    ],
    outcome: [
      '2 Ships is live on GitHub Pages: the homepage, the full brand guidelines on their own page, and the logo package one click away.',
      'Anyone making something for 2 Ships starts from the same files. As the site puts it: one system, one source of truth.',
    ],
    links: [{ label: '2 Ships live site', href: 'https://2shipxrodwave.github.io/' }],
    status: 'live',
    look: {
      palette: ['Command Black', 'Carbon', 'Warm White', 'Signal Red'],
      type: [
        { role: 'Headlines', face: 'Space Grotesk, bold, uppercase' },
        { role: 'Body', face: 'IBM Plex Sans' },
        { role: 'Labels, data', face: 'IBM Plex Mono, uppercase, tracked out' },
      ],
      rules: [
        'Red covers 5 to 10% of a page and is never a background.',
        'One red signal mark per composition.',
        'Hard corners: 4px at most, no pills.',
        'No stencil, camo or military fonts.',
      ],
    },
    screens: shot('two-ships', '2 Ships RW LLC', 'captured October 1, 2026'),
  },

  // Sources: HighSpot/Highspot tech company website/Highspot Website.dc.html (four pages; services; WhatsApp quote
  // request) and Brand Guidelines.dc.html (v1.0, 8 sections, logo use on white, dark and cyan). The logo is the
  // client's own (uploads/). Live: https://ongeramohammed.github.io/highspot-tech-company-website/ (GitHub Pages, footer
  // links the brand guidelines; live: Bruce, 2026-10-01). This is Highspot Company in Nairobi, not the US
  // sales-software company of the same name. Desktop screenshot only: the live page runs wider than a phone screen
  // (scrollWidth 778 at 390, checked 2026-10-01), so a phone capture would show a cut-off header.
  {
    slug: 'highspot',
    client: 'Highspot',
    kind: 'Tech and design studio · Nairobi, Kenya',
    theme: 'highspot',
    summary: 'A brand guide and a live four-page website for a Nairobi studio that builds websites, apps and brands for Kenyan small businesses.',
    challenge: [
      'Highspot is a Nairobi technology studio. It designs and builds websites, mobile apps and brands for small businesses and startups across Kenya, and does IT support.',
      'It came with its logo and needed a company website. A studio that sells design has to look right everywhere it shows up, so the site came with a brand guide for how Highspot looks, speaks and behaves on the web, in print and on social.',
    ],
    built: [
      { what: 'Brand guidelines, v1.0', detail: 'Eight sections: brand idea, logo, color, typography, iconography and pattern, stationery, social media, and voice and language.' },
      { what: 'Logo system', detail: 'The client’s logo set up for white, dark and cyan grounds, with clear space, minimum sizes for screen and print, and what not to do with it.' },
      { what: 'Stationery', detail: 'Business card front and back, an A4 letterhead and an email signature.' },
      { what: 'Social templates', detail: 'A profile photo and square posts for dark and light grounds.' },
      { what: 'Four-page website', detail: 'Home, Services, About and Contact, with a sticky header and footer, live on GitHub Pages.' },
      { what: 'Services, spelled out', detail: 'Each of the four services with a "What you get" list, and a four-step "How we work": talk, design, build, launch and support.' },
      { what: 'Quotes over WhatsApp', detail: 'A request-a-quote form that opens a pre-filled WhatsApp message, plus a floating WhatsApp button and call buttons.' },
    ],
    outcome: [
      'Highspot’s site is live: four pages, a quote request that opens straight in WhatsApp, and the brand guide one click away in the footer.',
      'The stationery and social templates follow the same guide, so the cards, the posts and the site match.',
    ],
    links: [{ label: 'Highspot live site', href: 'https://ongeramohammed.github.io/highspot-tech-company-website/' }],
    status: 'live',
    look: {
      palette: ['Page tint', 'White', 'Deep Charcoal', 'Highspot Cyan'],
      type: [
        { role: 'Headlines', face: 'Montserrat, extra bold, sentence case' },
        { role: 'Body', face: 'Public Sans' },
        { role: 'Labels, buttons', face: 'Public Sans SemiBold' },
      ],
      rules: [
        'Mostly white space, with cyan as the one accent.',
        'Never cyan for body text.',
        'The stripe pattern is used sparingly, never behind text or the logo.',
        'Plain English for body copy, Swahili for greetings, and no mixing languages mid-sentence.',
      ],
    },
    screens: shot('highspot', 'Highspot', 'captured October 1, 2026', false),
  },
];

export const caseBySlug = (slug: string | undefined) => CASE_STUDIES.find((c) => c.slug === slug);
export const caseNumber = (cs: CaseStudy) => `CASE-${String(CASE_STUDIES.indexOf(cs) + 1).padStart(2, '0')}`;
