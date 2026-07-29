#!/usr/bin/env node
/**
 * Captures fixed-width (1440px desktop, 390px mobile) full-page screenshots
 * of key routes from the built dist/ artifact.
 *
 * Usage: node scripts/capture-screenshots.mjs [output-dir]
 */
import { mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from './lib/static-server.mjs';
import { launchChrome, visit } from './lib/cdp.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const outDir = resolve(process.argv[2] ?? join(root, 'screenshots'));

const targets = [
  { slug: 'home', path: '/' },
  { slug: 'government-capabilities', path: '/government-capabilities/' },
  { slug: 'contact-government', path: '/contact/?topic=government' },
  { slug: 'services', path: '/services/' },
  { slug: 'systems-in-use', path: '/our-work/' },
  { slug: 'sms-consent', path: '/sms-consent/' },
  { slug: 'privacy-policy', path: '/privacy-policy/' },
];

const viewports = [
  { label: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { label: 'mobile-390', width: 390, height: 844, mobile: true },
];

let server = null;
let chrome = null;

async function main() {
  if (!existsSync(join(dist, 'index.html'))) {
    console.error('capture-screenshots: dist/index.html missing — run the build first');
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });

  server = await createStaticServer(dist);
  chrome = await launchChrome();

  for (const target of targets) {
    for (const viewport of viewports) {
      const page = await visit(chrome.connection, `${server.origin}${target.path}`);
      try {
        const file = join(outDir, `${target.slug}-${viewport.label}.png`);
        await page.screenshot({ width: viewport.width, height: viewport.height, mobile: viewport.mobile, path: file });
        console.log(`captured ${file}`);
      } finally {
        await page.close();
      }
    }
  }
}

async function run() {
  let primaryError = null;
  try {
    await main();
  } catch (error) {
    primaryError = error;
  } finally {
    // Teardown always runs so a capture failure cannot leak a Chrome process
    // or temp profile; a teardown failure fails the run too, without masking
    // the primary error.
    if (chrome) {
      try {
        await chrome.close();
      } catch (error) {
        console.error('capture-screenshots: Chrome cleanup failed');
        console.error(error);
        primaryError ??= error;
      }
    }
    if (server) {
      try {
        await server.close();
      } catch (error) {
        console.error('capture-screenshots: server cleanup failed');
        console.error(error);
        primaryError ??= error;
      }
    }
  }

  if (primaryError) {
    console.error(primaryError);
    process.exit(1);
  }
}

run();
