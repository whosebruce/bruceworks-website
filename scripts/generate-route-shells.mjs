#!/usr/bin/env node
/**
 * Writes a static index.html shell for every clean React route so that
 * GitHub Pages answers direct requests with HTTP 200 and route-specific
 * metadata. Reads dist/index.html (the built app shell) and seo/routes.json
 * (single source of truth shared with components/RouteMetadata.tsx).
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'seo', 'routes.json'), 'utf8'));

const shellPath = join(dist, 'index.html');
if (!existsSync(shellPath)) {
  console.error('generate-route-shells: dist/index.html not found — run vite build first');
  process.exit(1);
}
const baseShell = readFileSync(shellPath, 'utf8');

const replaceOnce = (html, pattern, replacement, label, path) => {
  if (!pattern.test(html)) {
    throw new Error(`generate-route-shells: could not find ${label} in shell for ${path}`);
  }
  return html.replace(pattern, replacement);
};

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const buildStaticBody = (route) => {
  const heading = escapeHtml(route.title.replace(/\s*\|\s*Bruce Works(?: LLC)?$/i, ''));
  const description = escapeHtml(route.description);
  const isGovernment = route.path === '/government-capabilities/';
  const extra = isGovernment
    ? 'California-certified DVBE and Small Business (Micro). Available for statewide on-site support, defined subcontract work, and remote delivery. Buyers can review the capability statement and certification verification summary from the rendered page.'
    : 'Bruce Works starts with the real workflow, the tools already in use, and the information the owner or team needs to find. Engagements are bounded, documented, and designed for practical ownership and handoff rather than permanent dependence on an unexplained black box.';
  return `<div id="root"><main data-static-route-shell="${escapeHtml(route.path)}" style="max-width:72rem;margin:0 auto;padding:2rem 1.5rem;font-family:Arial,sans-serif;line-height:1.6;color:#111827"><nav aria-label="Primary navigation" style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:3rem"><a href="/">Bruce Works</a><a href="/services/">Services</a><a href="/our-work/">Systems in Use</a><a href="/government-capabilities/">Government</a><a href="/faq/">FAQ</a><a href="/contact/">Contact</a></nav><article><p>San Diego-based · Serving clients across California and remotely nationwide</p><h1>${heading}</h1><p>${description}</p><p>${escapeHtml(extra)}</p><p>Bruce Works helps owner-led service businesses organize business knowledge, modernize repetitive workflows, and implement practical AI-assisted systems inside client-owned tools. AI agents, workflow automation, local models, and hardware may support the solution, but the business outcome, documentation, training, and usable handoff are the deliverable.</p><p><a href="/services/">Review services and pilot pricing</a> · <a href="/ai-leverage-audit/">Request an AI Leverage Audit</a> · <a href="tel:+18668296757">Toll-Free Intake: (866) 829-6757</a></p></article><noscript><p>JavaScript is not required to read this business summary. For full page details, enable JavaScript or contact Bruce Works through the toll-free intake line.</p></noscript></main></div>`;
};

const buildShell = (route) => {
  const url = `${seo.site.origin}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const ogDescription = escapeHtml(route.ogDescription ?? route.description);
  let html = baseShell;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>', route.path);
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`,
    'meta description',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta name="robots" content="[^"]*">/,
    `<meta name="robots" content="${route.robots}">`,
    'meta robots',
    route.path
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${url}">`,
    'canonical link',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${url}">`,
    'og:url',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${title}">`,
    'og:title',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${ogDescription}">`,
    'og:description',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${url}">`,
    'twitter:url',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${title}">`,
    'twitter:title',
    route.path
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`,
    'twitter:description',
    route.path
  );
  if (route.jsonld) {
    const block = `    <script type="application/ld+json">\n${JSON.stringify(route.jsonld, null, 2)}\n    </script>\n  </head>`;
    html = replaceOnce(html, /<\/head>/, block, '</head>', route.path);
  }
  html = replaceOnce(
    html,
    /<div id="root"><\/div>/,
    buildStaticBody(route),
    'React root placeholder',
    route.path
  );
  return html;
};

let written = 0;
for (const route of seo.routes) {
  if (route.path === '/') {
    writeFileSync(shellPath, buildShell(route));
    written += 1;
    continue;
  }
  const target = join(dist, route.path.replace(/^\/|\/$/g, ''), 'index.html');
  if (existsSync(target)) {
    console.error(
      `generate-route-shells: refusing to overwrite existing ${target} — a static page in public/ collides with React route ${route.path}`
    );
    process.exit(1);
  }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buildShell(route));
  written += 1;
}

// 404.html: GitHub Pages serves this (with a real 404 status) for unknown
// paths; the app shell renders the React NotFound page there.
writeFileSync(
  join(dist, '404.html'),
  buildShell({
    path: '/',
    title: seo.notFound.title,
    description: seo.notFound.description,
    robots: seo.notFound.robots,
  })
);

console.log(`generate-route-shells: wrote ${written} route shells + 404.html into dist/`);
