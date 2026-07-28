#!/usr/bin/env node
/**
 * Deterministic verification of the built dist/ artifact. Runs as part of
 * `npm run build` and fails the build on any error. Checks:
 *   1. Direct HTTP 200 + full app shell for every clean route
 *   2. Route-specific metadata (title/description/robots/canonical/OG)
 *   3. Root-relative assets resolve, JSON-LD parses, sitemap is consistent
 *   4. No `#/` navigation links in shells or rendered pages
 *   5. Legacy `/#/...` URLs redirect exactly once in a real browser
 *      (headless Chrome over the DevTools protocol), with no loops
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from './lib/static-server.mjs';
import { launchChrome, visit } from './lib/cdp.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'seo', 'routes.json'), 'utf8'));

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? ` — ${detail}` : ''}`);
};

const decodeEntities = (value) =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');

const attrContent = (html, pattern) => {
  const match = html.match(pattern);
  return match ? decodeEntities(match[1]) : null;
};

let server = null;
let chrome = null;

async function main() {
  if (!existsSync(join(dist, 'index.html'))) {
    console.error('verify-routes: dist/index.html missing — run the build first');
    process.exit(1);
  }

  server = await createStaticServer(dist);
  const origin = server.origin;
  const siteOrigin = seo.site.origin;

  // ---------- 1+2+3: direct requests, metadata, JSON-LD, assets ----------
  const assetPaths = new Set();
  for (const route of seo.routes) {
    const response = await fetch(`${origin}${route.path}`, { redirect: 'manual' });
    const html = await response.text();
    check(`GET ${route.path} → 200`, response.status === 200, `got ${response.status}`);
    check(`${route.path} serves app shell`, html.includes('<div id="root">'));

    const title = attrContent(html, /<title>([^<]*)<\/title>/);
    check(`${route.path} title`, title === route.title, `got ${JSON.stringify(title)}`);
    const description = attrContent(html, /<meta name="description" content="([^"]*)">/);
    check(`${route.path} description`, description === route.description, `got ${JSON.stringify(description)}`);
    const robots = attrContent(html, /<meta name="robots" content="([^"]*)">/);
    check(`${route.path} robots`, robots === route.robots, `got ${JSON.stringify(robots)}`);
    const canonical = attrContent(html, /<link rel="canonical" href="([^"]*)">/);
    check(`${route.path} canonical`, canonical === `${siteOrigin}${route.path}`, `got ${JSON.stringify(canonical)}`);
    const ogUrl = attrContent(html, /<meta property="og:url" content="([^"]*)">/);
    check(`${route.path} og:url`, ogUrl === `${siteOrigin}${route.path}`, `got ${JSON.stringify(ogUrl)}`);
    const ogTitle = attrContent(html, /<meta property="og:title" content="([^"]*)">/);
    check(`${route.path} og:title`, ogTitle === route.title, `got ${JSON.stringify(ogTitle)}`);
    const expectedOgDescription = route.ogDescription ?? route.description;
    const ogDescription = attrContent(html, /<meta property="og:description" content="([^"]*)">/);
    check(`${route.path} og:description`, ogDescription === expectedOgDescription, `got ${JSON.stringify(ogDescription)}`);

    const jsonldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    let jsonldOk = jsonldBlocks.length > 0;
    let jsonldDetail = jsonldBlocks.length === 0 ? 'no JSON-LD blocks' : '';
    for (const [, block] of jsonldBlocks) {
      try {
        JSON.parse(block);
      } catch (error) {
        jsonldOk = false;
        jsonldDetail = String(error);
      }
    }
    check(`${route.path} JSON-LD parses`, jsonldOk, jsonldDetail);
    if (route.jsonld) {
      check(
        `${route.path} route JSON-LD present`,
        jsonldBlocks.some(([, block]) => block.includes(`${route.path}#webpage`))
      );
    }

    check(`${route.path} has no #/ links in shell`, !html.includes('href="#/') && !html.includes('href="/#/'));

    for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
      const path = match[1];
      if (!path.startsWith('//')) assetPaths.add(path.split('#')[0]);
    }

    // GitHub Pages 301s directory paths without a trailing slash.
    if (route.path !== '/') {
      const bare = route.path.slice(0, -1);
      const redirect = await fetch(`${origin}${bare}`, { redirect: 'manual' });
      check(
        `GET ${bare} → 301 ${route.path}`,
        redirect.status === 301 && redirect.headers.get('location') === route.path,
        `got ${redirect.status} → ${redirect.headers.get('location')}`
      );
    }
  }

  for (const page of seo.staticPages) {
    const response = await fetch(`${origin}${page.path}`, { redirect: 'manual' });
    const html = await response.text();
    check(`GET ${page.path} (static) → 200`, response.status === 200, `got ${response.status}`);
    check(`${page.path} canonical intact`, html.includes(`<link rel="canonical" href="${siteOrigin}${page.path}"`));

    // Explicit home navigation: one link near the top (inside <header>) and one
    // after the main content, both labelled and targeting canonical `/` with no
    // hash routing and no JavaScript/history dependency.
    const homeLinks = [...html.matchAll(/<a\b[^>]*class="home-link"[^>]*>/g)].filter(([tag]) =>
      tag.includes('href="/"')
    );
    check(`${page.path} has exactly two explicit home links to /`, homeLinks.length === 2, `found ${homeLinks.length}`);
    check(
      `${page.path} home links are labelled "Back to Bruce Works home"`,
      (html.match(/Back to Bruce Works home/g) ?? []).length === 2
    );
    if (homeLinks.length === 2) {
      check(`${page.path} top home link sits inside the header`, homeLinks[0].index < html.indexOf('</header>'));
      const contentEnd = Math.max(html.lastIndexOf('</section>'), html.lastIndexOf('</article>'));
      check(
        `${page.path} bottom home link follows the main content`,
        homeLinks[1].index > contentEnd && homeLinks[1].index < html.indexOf('</main>')
      );
    }
    check(
      `${page.path} references self-hosted field-manual fonts`,
      html.includes("url('/fonts/Barlow-Regular.ttf')") && html.includes("url('/fonts/BigShouldersDisplay-800.ttf')")
    );

    // Compliance surfaces stay intact around the navigation addition.
    if (page.path === '/sms-consent/') {
      check(
        `${page.path} form still posts to FormSubmit`,
        html.includes('action="https://formsubmit.co/info@bruceworks.net"')
      );
      check(
        `${page.path} keeps both explicit SMS preference options`,
        html.includes('value="yes_informational_sms"') && html.includes('value="no_sms_calls_only"')
      );
      check(
        `${page.path} keeps no SMS option preselected`,
        !/name="sms_preference"[^>]*\bchecked\b/.test(html)
      );
      check(
        `${page.path} keeps hidden disclosure/source fields`,
        html.includes('name="sms_disclosure_version" value="2026-07-17"') &&
          html.includes('name="sms_source_page" value="https://bruceworks.net/sms-consent/"')
      );
    }
    if (page.path === '/privacy-policy/') {
      check(
        `${page.path} keeps mobile opt-in non-sharing commitment`,
        html.includes('Mobile opt-in information and consent are never shared')
      );
    }
  }

  for (const path of [...assetPaths].sort()) {
    const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
    check(`asset ${path} → 200`, response.status === 200, `got ${response.status}`);
  }

  for (const pdf of [
    '/documents/Bruce-Works-LLC-Capability-Statement.pdf',
    '/documents/Bruce-Works-LLC-Certification-Verification-Summary.pdf',
  ]) {
    const response = await fetch(`${origin}${pdf}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    check(
      `pdf ${pdf} → 200 and is a PDF`,
      response.status === 200 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-',
      `got ${response.status}`
    );
  }

  // ---------- sitemap + robots ----------
  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  check('GET /sitemap.xml → 200', sitemapResponse.status === 200);
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc);
  check('sitemap has no hash URLs', locs.every((loc) => !loc.includes('#')));
  const expectedLocs = new Set([
    ...seo.routes.filter((route) => route.sitemap).map((route) => `${siteOrigin}${route.path}`),
    ...seo.staticPages.map((page) => `${siteOrigin}${page.path}`),
  ]);
  check(
    'sitemap matches indexable routes exactly',
    locs.length === expectedLocs.size &&
      new Set(locs).size === locs.length &&
      locs.every((loc) => expectedLocs.has(loc)),
    `sitemap: ${locs.join(', ')} | expected: ${[...expectedLocs].join(', ')}`
  );
  for (const loc of locs) {
    const localUrl = loc.replace(siteOrigin, origin);
    const response = await fetch(localUrl, { redirect: 'manual' });
    check(`sitemap URL ${loc.replace(siteOrigin, '')} → 200`, response.status === 200, `got ${response.status}`);
  }
  const robotsResponse = await fetch(`${origin}/robots.txt`);
  const robotsText = await robotsResponse.text();
  check('robots.txt → 200 and references sitemap', robotsResponse.status === 200 && robotsText.includes('sitemap.xml'));

  // Unknown paths must be a real 404 (no soft-200, no redirect loop).
  const missing = await fetch(`${origin}/this-route-does-not-exist/`, { redirect: 'manual' });
  check('unknown route → 404 status', missing.status === 404, `got ${missing.status}`);

  // Raw scan of every built HTML file for hash navigation links.
  const scanShells = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) scanShells(full);
      else if (entry.name.endsWith('.html')) {
        const html = readFileSync(full, 'utf8');
        check(
          `no #/ hrefs in ${full.replace(dist, 'dist')}`,
          !html.includes('href="#/') && !html.includes('href="/#/')
        );
      }
    }
  };
  scanShells(dist);

  // ---------- 4+5: real-browser checks ----------
  chrome = await launchChrome();

  const urlTail = (url) => {
    const parsed = new URL(url);
    return parsed.pathname + parsed.search + parsed.hash;
  };

  const browserTest = async (name, startPath, expectations) => {
    const page = await visit(chrome.connection, `${origin}${startPath}`);
    try {
      const finalHref = await page.evaluate('location.href');
      const final = urlTail(finalHref);
      const hops = page.navigations.length;
      if (expectations.final !== undefined) {
        check(`${name}: lands on ${expectations.final}`, final === expectations.final, `got ${final}`);
      }
      check(
        `${name}: at most one redirect hop (no loops)`,
        hops <= (expectations.maxNavigations ?? 2),
        `navigations: ${page.navigations.map(urlTail).join(' → ')}`
      );
      if (expectations.exactNavigations !== undefined) {
        check(
          `${name}: navigation count is ${expectations.exactNavigations}`,
          hops === expectations.exactNavigations,
          `navigations: ${page.navigations.map(urlTail).join(' → ')}`
        );
      }
      if (expectations.hop !== undefined) {
        check(
          `${name}: redirect hop preserves data (${expectations.hop})`,
          page.navigations.length === 2 && urlTail(page.navigations[1]) === expectations.hop,
          `navigations: ${page.navigations.map(urlTail).join(' → ')}`
        );
      }
      if (expectations.mounted) {
        const mounted = await page.evaluate(
          "!!document.getElementById('root') && document.getElementById('root').children.length > 0"
        );
        check(`${name}: React app shell mounted`, mounted === true);
        const hashAnchors = await page.evaluate('document.querySelectorAll(\'a[href*="#/"]\').length');
        check(`${name}: rendered page emits no #/ links`, hashAnchors === 0, `found ${hashAnchors}`);
      }
      if (expectations.title !== undefined) {
        const title = await page.evaluate('document.title');
        check(`${name}: title "${expectations.title}"`, title === expectations.title, `got ${JSON.stringify(title)}`);
      }
      if (expectations.bodyIncludes) {
        for (const text of expectations.bodyIncludes) {
          const found = await page.evaluate(`document.body.innerText.includes(${JSON.stringify(text)})`);
          check(`${name}: page shows ${JSON.stringify(text)}`, found === true);
        }
      }
      if (expectations.evaluate) {
        for (const [label, expression] of Object.entries(expectations.evaluate)) {
          const value = await page.evaluate(expression);
          check(`${name}: ${label}`, value === true, `got ${JSON.stringify(value)}`);
        }
      }
    } finally {
      await page.close();
    }
  };

  // Every clean route loads directly with zero redirects and no hash links.
  for (const route of seo.routes) {
    await browserTest(`direct ${route.path}`, route.path, {
      final: route.path,
      exactNavigations: 1,
      mounted: true,
      title: route.title,
    });
  }

  // Legacy hash-route compatibility, exactly one hop, data preserved.
  await browserTest('legacy /#/services', '/#/services', {
    final: '/services/',
    mounted: true,
    title: 'AI Command Center Services & Pricing | Bruce Works LLC',
  });
  await browserTest('legacy /#/services?utm_source=legacy', '/#/services?utm_source=legacy', {
    final: '/services/?utm_source=legacy',
    mounted: true,
  });
  await browserTest('legacy /?a=1#/services?b=2 merges queries', '/?a=1#/services?b=2', {
    final: '/services/?a=1&b=2',
    mounted: true,
  });
  await browserTest('legacy /#/review?submitted=true', '/#/review?submitted=true', {
    hop: '/review/?submitted=true',
    mounted: true,
    bodyIncludes: ['Message Sent'],
  });
  await browserTest('legacy /?submitted=true#/review', '/?submitted=true#/review', {
    hop: '/review/?submitted=true',
    mounted: true,
    bodyIncludes: ['Message Sent'],
  });
  await browserTest('legacy /#/faq#pricing keeps fragment', '/#/faq#pricing', {
    final: '/faq/#pricing',
    mounted: true,
  });
  await browserTest('legacy /#/ home', '/#/', {
    final: '/',
    exactNavigations: 1,
    mounted: true,
  });
  await browserTest('legacy /#/privacy-policy → static page', '/#/privacy-policy', {
    final: '/privacy-policy/',
    title: 'Privacy Policy | Bruce Works LLC',
  });
  await browserTest('legacy /#/government-capabilities', '/#/government-capabilities', {
    final: '/government-capabilities/',
    mounted: true,
    title: 'Government Capabilities | Bruce Works LLC',
  });
  await browserTest('legacy unknown /#/no-such-page → 404 page', '/#/no-such-page', {
    final: '/no-such-page/',
    mounted: true,
    bodyIncludes: ['Page not found'],
  });

  // Government CTA is web-native and reaches the contact form's government mode.
  await browserTest('government page CTA', '/government-capabilities/', {
    mounted: true,
    evaluate: {
      'Discuss an Opportunity links to /contact/?topic=government':
        'Array.from(document.querySelectorAll(\'a\')).some(a => a.getAttribute(\'href\') === \'/contact/?topic=government\' && a.textContent.includes(\'Discuss an Opportunity\'))',
      'no mailto CTA remains for Discuss an Opportunity':
        '!Array.from(document.querySelectorAll(\'a\')).some(a => (a.getAttribute(\'href\') || \'\').startsWith(\'mailto:\') && a.textContent.includes(\'Discuss an Opportunity\'))',
      'both PDFs are linked':
        'Array.from(document.querySelectorAll(\'a\')).filter(a => (a.getAttribute(\'href\') || \'\').endsWith(\'.pdf\')).length === 2',
      'Cal eProcure link present':
        'Array.from(document.querySelectorAll(\'a\')).some(a => a.href === \'https://caleprocure.ca.gov/pages/PublicSearch/supplier-search.aspx\')',
    },
  });
  await browserTest('contact page government mode', '/contact/?topic=government', {
    mounted: true,
    evaluate: {
      'government mode preselected':
        'document.querySelector(\'[role="radio"][aria-checked="true"]\') !== null && document.querySelector(\'[role="radio"][aria-checked="true"]\').textContent.includes(\'Government\')',
      'government-specific subject set':
        'document.querySelector(\'input[name="_subject"]\').value === \'Government/teaming opportunity inquiry from bruceworks.net\'',
      'form posts to FormSubmit (no mail client)':
        'document.querySelector(\'form\').action === \'https://formsubmit.co/info@bruceworks.net\'',
      'SMS consent options present':
        'document.querySelector(\'input[value="yes_informational_sms"]\') !== null && document.querySelector(\'input[value="no_sms_calls_only"]\') !== null',
      'consent links privacy policy and messaging terms':
        'Array.from(document.querySelectorAll(\'a\')).some(a => a.getAttribute(\'href\') === \'/privacy-policy/\') && Array.from(document.querySelectorAll(\'a\')).some(a => a.getAttribute(\'href\') === \'/sms-consent/#messaging-terms\')',
    },
  });

  // Standalone policy pages: explicit, keyboard-reachable home navigation that
  // works without JavaScript or history, with compliance behavior preserved.
  const homeNavExpectations = {
    'two visible keyboard-focusable home links target canonical /':
      "(() => { const links = Array.from(document.querySelectorAll('a.home-link')); return links.length === 2 && links.every(a => a.getAttribute('href') === '/' && a.textContent.includes('Back to Bruce Works home') && a.offsetParent !== null && a.tabIndex === 0); })()",
    'home links meet 44px minimum tap-target height':
      "Array.from(document.querySelectorAll('a.home-link')).every(a => a.getBoundingClientRect().height >= 44)",
    'no horizontal overflow':
      'document.documentElement.scrollWidth <= document.documentElement.clientWidth',
    'field-manual typography applied':
      "getComputedStyle(document.body).fontFamily.includes('Barlow') && getComputedStyle(document.querySelector('h1')).fontFamily.includes('Big Shoulders Display')",
  };
  await browserTest('static /sms-consent/ home navigation', '/sms-consent/', {
    final: '/sms-consent/',
    exactNavigations: 1,
    title: 'SMS Consent | Bruce Works LLC',
    evaluate: {
      ...homeNavExpectations,
      'form still posts to FormSubmit':
        "document.getElementById('sms-form').action === 'https://formsubmit.co/info@bruceworks.net'",
      'no SMS radio preselected':
        "document.querySelectorAll('input[name=\"sms_preference\"]:checked').length === 0",
      'both SMS preference options rendered':
        "document.querySelector('input[value=\"yes_informational_sms\"]') !== null && document.querySelector('input[value=\"no_sms_calls_only\"]') !== null",
    },
  });
  await browserTest('static /privacy-policy/ home navigation', '/privacy-policy/', {
    final: '/privacy-policy/',
    exactNavigations: 1,
    title: 'Privacy Policy | Bruce Works LLC',
    bodyIncludes: ['Mobile opt-in information and consent are never shared'],
    evaluate: homeNavExpectations,
  });

}

async function run() {
  let primaryError = null;
  try {
    await main();
  } catch (error) {
    primaryError = error;
  } finally {
    // Teardown always runs so an assertion or fatal failure cannot leak a
    // Chrome process or temp profile; a teardown failure fails the build too,
    // without masking the primary error.
    if (chrome) {
      try {
        await chrome.close();
      } catch (error) {
        console.error('verify-routes: Chrome cleanup failed');
        console.error(error);
        primaryError ??= error;
      }
    }
    if (server) {
      try {
        await server.close();
      } catch (error) {
        console.error('verify-routes: server cleanup failed');
        console.error(error);
        primaryError ??= error;
      }
    }
  }

  if (primaryError) {
    console.error('verify-routes: fatal error');
    console.error(primaryError);
    process.exit(1);
  }

  const failed = results.filter((result) => !result.pass);
  console.log(`\nverify-routes: ${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length > 0) {
    console.error('\nFailed checks:');
    for (const failure of failed) console.error(`- ${failure.name}${failure.detail ? ` — ${failure.detail}` : ''}`);
    process.exit(1);
  }
}

run();
