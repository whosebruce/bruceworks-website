import type { ThemeId } from '../theme/themes';

// The case studies. Every client here agreed to be shown. Every line traces to the client's own files, their public
// repo or their live site (the source is noted above each entry); where a fact couldn't be confirmed it was left out.
// No invented quotes, testimonials, numbers or dates. Themes are tokens only (theme/themes.ts): no client logos or
// artwork on this site, except what shows in a screenshot of a public site captured for [ SCREEN PROOF ].

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
  /** Public live sites only, confirmed from the repo, CNAME or files. */
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
  screens?: { desktop: Screen; phone: Screen; captured: string };
};

const shot = (slug: string, client: string, captured: string) => ({
  desktop: { src: `/media/cases/${slug}-desktop.webp`, alt: `The ${client} home page on a desktop screen, ${captured}.`, w: 1440, h: 900 },
  phone: { src: `/media/cases/${slug}-phone.webp`, alt: `The ${client} home page on a phone, ${captured}.`, w: 780, h: 1688 },
  captured,
});

export const CASE_STUDIES: CaseStudy[] = [
  // Sources: github.com/whosebruce/kitsap-mobile-brakes-website (index.html, services/index.html, contact/index.html,
  // CNAME, sitemap.xml, robots.txt, README.md; GitHub Pages API: https://kitsapmobilebrakes.com/, HTTPS enforced);
  // Kitsap Mobile Brakes/Brand Guidelines.dc.html (v1.0); Kitsap Mobile Brakes/KMBO Invoice Tool - Offline.html and
  // Invoice Creator.dc.html; bruceworks-website public/kmbo-update/ (update-request form, commit 41a4f94).
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

  // Sources: Island Delicacy/Ready Documents/design_handoff_ordering_site/README.md (lines 3, 11-18: preorder model,
  // Square, islanddelicacy.com via CNAME) and its zip (FIXES.md); Ready Documents/FIX_ORDER_PAGE.md (both bugs fixed on
  // the live site, checked October 1, 2026); Ready Documents/Island Delicacy Restaurant brand kit setup/ (Island
  // Delicacy Directions.dc.html, Island Delicacy Brand Kit.dc.html = v1, Island Delicacy Brand Kit v2.dc.html = 1c
  // Callaloo & Cream); Content Creation/ (Affinity sources and PDFs: business cards, menus, 24x36 poster, flyers);
  // live site https://islanddelicacy.com/ (pages, "Secure payment via Square"). The three quotes on the live site are
  // anonymous, so they are not used here.
  {
    slug: 'island-delicacy',
    client: 'Island Delicacy',
    kind: 'Preorder Caribbean kitchen · San Diego',
    theme: 'island-delicacy',
    summary: 'Brand kits, a preorder ordering site and the print to match, for a San Diego kitchen that cooks Jamaican and Caribbean plates to order.',
    challenge: [
      'Island Delicacy is a preorder kitchen, not a restaurant. Every Jamaican and Caribbean plate is cooked for the person who ordered it, so it takes a day’s notice.',
      'Orders used to come in by text and DM, paid by app. The kitchen needed one place where people could see the menu, order for a future day and pay, and a brand that looks as good as the food tastes.',
    ],
    built: [
      { what: 'Three brand directions', detail: 'Cane & Copper, Tide & Flame and Callaloo & Cream, plus three logo-mark options to choose from.' },
      { what: 'Brand kit, two editions', detail: 'A starter kit and the Callaloo & Cream kit: logo family, color and type, photography, templates and guidelines.' },
      { what: 'Templates', detail: 'Menu flyer, Instagram square and story, a catering one-sheet and a business card.' },
      { what: 'Ordering site design and spec', detail: 'A clickable prototype and a written build spec: pick a plate, two sides, quantity and a pickup day, with a cutoff countdown and sold-out counters.' },
      { what: 'Live preorder site', detail: 'Home, Order, Catering, Events, About and FAQ, plus a link-in-bio page. A multi-plate cart, extras and plate notes, and a review step before paying through Square.' },
      { what: 'Catering', detail: 'Tray prices per dish, build-your-own spreads, and an inquiry that opens a text or an email.' },
      { what: 'Print', detail: 'Business cards, printable menus and menu flyers, a 24 x 36 poster, and event and holiday flyers.' },
      { what: 'Live-site fixes', detail: 'A redirect loop on the order page and stretched side-dish cards, both found and fixed on the live site.' },
    ],
    outcome: [
      'Island Delicacy takes preorders at islanddelicacy.com: pick your plates and sides, choose a pickup day, check the order, then pay through Square with no account needed.',
      'The menu, catering trays, events and FAQ live on the same site now, instead of in a text thread.',
    ],
    links: [{ label: 'islanddelicacy.com', href: 'https://islanddelicacy.com/' }],
    status: 'live',
    look: {
      palette: ['Coconut Cream', 'Card cream', 'Browning', 'Callaloo Green'],
      type: [
        { role: 'Headlines', face: 'Archivo Expanded, extra bold, uppercase' },
        { role: 'Body', face: 'Source Serif 4, italic for the human voice' },
        { role: 'Labels, prices', face: 'Archivo, uppercase, tracked out' },
      ],
      rules: [
        'Callaloo green does the accent’s job. Pimento red is the one hot accent per layout.',
        'Cane gold goes on green only.',
        'Sound warm, proud, welcoming, confident and a little playful.',
        'Never stuffy, salesy or cluttered. No flag clichés, no stock-island clipart.',
      ],
      note: 'This theme is the Callaloo & Cream kit. The live ordering site wears the darker starter-kit palette, night ink and gold, in the same Archivo and Source Serif type: you can see it in the screenshots below.',
    },
    screens: shot('island-delicacy', 'Island Delicacy', 'captured October 1, 2026'),
  },

  // Sources: github.com/whosebruce/wakandaboy100 (README.md, DESIGN.md, DESIGN-DIRECTION.md, OPEN_DESIGN.md, CNAME,
  // content/merch.json, scripts/build_site.py, scripts/verify_site.py, scripts/add_media.py,
  // .github/workflows/static.yml; GitHub Pages: https://wakandaboy100.com/, HTTPS enforced); Wakandaboy100/Default
  // Website/Wakandaboy100 Portfolio Redesign.zip (Brand Guidelines.dc.html, Brand Guidelines Deck.dc.html, github.md);
  // Wakandaboy100/Logo/Desktop Affinity Sources and Exports/; Wakandaboy100/Product Merch/ (FW 01-21, Fourthwall Drop
  // 001/manifest.json). The channel numbers on the live site are the artist's own, not results of this work: not used.
  {
    slug: 'wakandaboy100',
    client: 'Wakandaboy100',
    kind: 'Independent artist · music, dance, comedy',
    theme: 'wakandaboy',
    summary: 'A brand guide, a six-page portfolio that checks itself before every deploy, and print-ready art for a merch line, for an artist who does music, dance and comedy.',
    challenge: [
      'Wakandaboy100 is an independent artist and performer working across music, dance, comedy and video. The work lives everywhere: YouTube, six streaming services, Instagram clips, private-event bookings and a merch line, The Ultimate Cardio.',
      'The site had to pull all of that under the stage name, with a real page for music, videos, booking and merch that people and search engines can find. And the look had to change, from the dark neon "night stage" of the earlier version to a clean athletic one in heather grey and ink black.',
    ],
    built: [
      { what: 'Brand guidelines, Edition 01', detail: 'Six sections: the brand, the mark, color, typography, voice and words, and in the wild. As a scrolling guide and a 24-slide deck.' },
      { what: 'Six-page portfolio site', detail: 'Home, About, Videos, Music, Booking and Merch, plus a custom 404 page. Mobile menu and reduced-motion support.' },
      { what: 'Watch and listen', detail: 'Music-video and comedy-clip cards that open on YouTube and Instagram, and links to all six streaming services.' },
      { what: 'Booking', detail: 'A three-step guide to requesting a private event, ending at an Instagram message.' },
      { what: 'Merch page', detail: 'The Ultimate Cardio’s nine live styles, each with its price and a link to the online shop.' },
      { what: 'Print-ready merch art', detail: 'Vector masters of the dancer mark in Affinity, 300 dpi print files for the shirt, and upload files for 21 product variants: beanies, caps, tanks, shorts and hoodies.' },
      { what: 'Search and sharing', detail: 'Canonical addresses, page descriptions, structured data for the artist and his profiles, a sitemap, robots.txt and share images.' },
      { what: 'Build and check tooling', detail: 'One script builds the six pages; another stops a deploy if a route, tag, link or price is wrong. GitHub Actions runs both before every deploy.' },
    ],
    outcome: [
      'The portfolio is live at wakandaboy100.com: six pages over HTTPS, rebuilt and checked automatically before every deploy, so a broken link or a stale price doesn’t ship.',
      'The Ultimate Cardio’s nine styles are on the site, each one linking straight to the shop.',
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
  // recolours). No domain is named in any file and no site is live, so there is no link.
  {
    slug: 'two-ships',
    client: '2 Ships RW LLC',
    kind: 'Veteran-led growth and execution firm · Southern California',
    theme: 'two-ship',
    summary: 'A 31-slide brand system, a homepage design and a developer handoff for a growth firm that wanted to look built for big work.',
    challenge: [
      '2 Ships RW LLC helps businesses and mission-driven organizations turn opportunity into execution: strategy, AI-enabled systems, marketing, partnerships and commerce. Its brief asked for a premium, mobile-first website that positions the company as a broad growth and execution platform.',
      'The brief set the standard too: discipline and precision rather than military costume, and never fake metrics, fake clients or anonymous testimonials. In its own words: make it look built for big work.',
    ],
    built: [
      { what: 'Brand guidelines, V1.0', detail: '31 slides in six sections: the brand, the logo, color, typography, graphic language, and voice and application.' },
      { what: 'Logo usage rules', detail: 'Four colorways of the emblem, clear space, minimum sizes and what not to do with it.' },
      { what: 'Color and type system', detail: 'The palette with set proportions and contrast-rated pairings, and a type scale in Space Grotesk, IBM Plex Sans and IBM Plex Mono.' },
      { what: 'Graphic language', detail: 'A grid, signal marks and a two-path motif: a strategy route and an execution route meeting at one objective.' },
      { what: 'Homepage design', detail: 'A high-fidelity prototype: an animated two-route hero, six capability lanes, the four-step operating model (Assess, Design, Activate, Improve), the founder and a closing call to action.' },
      { what: 'Developer handoff', detail: 'A README with every token, section, interaction and technical requirement, condensed brand notes, and the logo files in four colors.' },
    ],
    outcome: [
      '2 Ships has a complete brand system and a homepage design, packaged with a written handoff for whoever builds the site.',
      'The site isn’t built yet, so there’s no link here.',
    ],
    links: [],
    status: 'delivered',
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
  },

  // Sources: HighSpot/Highspot tech company website/Highspot Website.dc.html (four pages; services; WhatsApp quote
  // request) and Brand Guidelines.dc.html (v1.0, 8 sections). The logo was supplied by the client (uploads/). Both are
  // Claude Design files, not deployed: the domain named in them doesn't resolve, so there is no link. This is Highspot
  // Company in Nairobi, not the US sales-software company of the same name.
  {
    slug: 'highspot',
    client: 'Highspot',
    kind: 'Tech and design studio · Nairobi, Kenya',
    theme: 'highspot',
    summary: 'A brand guide and a four-page website design for a Nairobi studio that builds websites, apps and brands for Kenyan small businesses.',
    challenge: [
      'Highspot is a Nairobi technology studio. It designs and builds websites, mobile apps and brands for small businesses and startups across Kenya, and does IT support.',
      'It came with its logo and needed a company website. A studio that sells design has to look right everywhere it shows up, so the site came with a brand guide for how Highspot looks, speaks and behaves on the web, in print and on social.',
    ],
    built: [
      { what: 'Brand guidelines, v1.0', detail: 'Eight sections: brand idea, logo, color, typography, iconography and pattern, stationery, social media, and voice and language.' },
      { what: 'Stationery', detail: 'Business card front and back, an A4 letterhead and an email signature.' },
      { what: 'Social templates', detail: 'A profile photo and square posts for dark and light grounds.' },
      { what: 'Four-page website design', detail: 'Home, Services, About and Contact, with a sticky header and footer.' },
      { what: 'Services, spelled out', detail: 'Each of the four services with a "What you get" list, and a four-step "How we work": talk, design, build, launch and support.' },
      { what: 'Quotes over WhatsApp', detail: 'A request-a-quote form that opens a pre-filled WhatsApp message, plus a floating WhatsApp button and call buttons.' },
    ],
    outcome: [
      'Highspot has a finished brand guide and a complete four-page website design, with the stationery and social templates to match.',
      'The site isn’t live yet, so there’s no link here.',
    ],
    links: [],
    status: 'delivered',
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
  },
];

export const caseBySlug = (slug: string | undefined) => CASE_STUDIES.find((c) => c.slug === slug);
export const caseNumber = (cs: CaseStudy) => `CASE-${String(CASE_STUDIES.indexOf(cs) + 1).padStart(2, '0')}`;
