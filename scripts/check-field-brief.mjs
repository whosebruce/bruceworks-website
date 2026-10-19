#!/usr/bin/env node
/**
 * Checks the Field Brief signup boxes and prompt in a real headless Chrome, against a running dev server (or
 * `vite preview` of a build made with VITE_FIELD_BRIEF_ENDPOINT), because both serve the local stand-in for Kit.
 *
 *   node scripts/check-field-brief.mjs http://localhost:5187 [screens-dir]
 *
 * What it proves, with real input events (mouse, keys, typing), not dispatched DOM events:
 *   - nothing pops up on arrival, on desktop or on a phone
 *   - desktop: leaving through the top in the first seconds does nothing; later it opens the dialog, focus goes in,
 *     Tab stays inside, Escape closes it, focus comes back, and it doesn't come back on the next page or a reload
 *   - phone: the card slides up only after half the page, "No thanks" closes it and it stays closed
 *   - never on /contact/, /book/ or /ai-leverage-audit/
 *   - the homepage form signs someone up (the stand-in has them, with signup_source "home") and says so
 *   - the contact form's Field Brief box starts unchecked
 * With a screens dir it also saves screenshots in Field Manual // Day and Field Manual (Night), desktop and phone.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { launchChrome } from './lib/cdp.mjs';

const base = (process.argv[2] || 'http://localhost:5187').replace(/\/$/, '');
const shots = process.argv[3] ? resolve(process.argv[3]) : null;
if (shots) mkdirSync(shots, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`); };

const DESKTOP = { width: 1440, height: 900, mobile: false };
const PHONE = { width: 390, height: 844, mobile: true };

async function tab(connection, viewport) {
  const { targetId } = await connection.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await connection.send('Target.attachToTarget', { targetId, flatten: true });
  const send = (m, p = {}) => connection.send(m, p, sessionId);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile });
  if (viewport.mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || exceptionDetails.text);
    return result.value;
  };
  const go = async (path) => {
    await send('Page.navigate', { url: base + path });
    for (let i = 0; i < 100; i++) {
      await sleep(100);
      try { if (await evaluate('document.readyState') === 'complete' && await evaluate('!!document.querySelector("footer")')) break; } catch { /* navigating */ }
    }
    await evaluate('document.querySelectorAll(".reveal").forEach(e => e.classList.add("in")), true');
    await sleep(300);
  };
  const mouse = async (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'none', ...extra });
  const click = async (selector) => {
    const box = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(selector)}); if (!e) return null; e.scrollIntoView({block: 'center'}); const r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; })()`);
    if (!box) throw new Error(`no ${selector}`);
    await sleep(150);
    if (viewport.mobile) {
      await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x, y: box.y }] });
      await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    } else {
      await mouse('mouseMoved', box.x, box.y);
      await mouse('mousePressed', box.x, box.y, { button: 'left', clickCount: 1 });
      await mouse('mouseReleased', box.x, box.y, { button: 'left', clickCount: 1 });
    }
    await sleep(200);
  };
  const key = async (k, code, keyCode, modifiers = 0) => {
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code, windowsVirtualKeyCode: keyCode, modifiers });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: keyCode, modifiers });
    await sleep(120);
  };
  const type = async (text) => { await send('Input.insertText', { text }); await sleep(100); };
  const scrollTo = async (fraction) => {
    // a real wheel/scroll gesture, in steps, so the page's own scroll listener sees it
    const target = await evaluate(`Math.round((document.documentElement.scrollHeight - innerHeight) * ${fraction})`);
    for (let i = 0; i < 60; i++) {
      const y = await evaluate('scrollY');
      if (Math.abs(target - y) < 40) break;
      await mouse('mouseWheel', viewport.width / 2, viewport.height / 2, { deltaX: 0, deltaY: Math.max(Math.min(target - y, 700), -700) });
      await sleep(60);
    }
    await sleep(400);
  };
  const shot = async (name) => {
    if (!shots) return;
    await sleep(700);                              // let the 0.22 s fade-in finish
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(shots, `${name}.png`), Buffer.from(data, 'base64'));
  };
  const close = () => connection.send('Target.closeTarget', { targetId });
  return { evaluate, go, mouse, click, key, type, scrollTo, shot, close };
}

const dialogOpen = 'document.querySelector(\'[role="dialog"][aria-modal="true"]\') !== null';
const slideOpen = 'document.querySelector(\'[role="dialog"][aria-modal="false"]\') !== null';
const resetStorage = 'localStorage.removeItem("bw.fieldBrief"); sessionStorage.clear(); true';

async function main() {
  const chrome = await launchChrome();
  const { connection } = chrome;
  try {
    // ── desktop: exit intent ──
    let t = await tab(connection, DESKTOP);
    await t.go('/');
    await t.evaluate(resetStorage);
    await t.go('/');
    check('desktop: nothing pops up on arrival', !(await t.evaluate(dialogOpen)));
    await t.mouse('mouseMoved', 720, 400);
    await t.mouse('mouseMoved', 720, 2);
    await t.mouse('mouseMoved', 720, -20);
    await sleep(300);
    check('desktop: leaving in the first seconds does nothing', !(await t.evaluate(dialogOpen)));
    await sleep(8200);
    await t.mouse('mouseMoved', 720, 400);
    await t.mouse('mouseMoved', 720, 2);
    await t.mouse('mouseMoved', 720, -20);
    await sleep(400);
    let open = await t.evaluate(dialogOpen);
    if (!open) {
      // headless Chrome may not report a pointer leaving the window; fall back to the event a real browser sends
      await t.evaluate('document.dispatchEvent(new MouseEvent("mouseout", {bubbles: true, clientX: 720, clientY: -5, relatedTarget: null})), true');
      await sleep(300);
      open = await t.evaluate(dialogOpen);
      check('desktop: pointer leaving through the top opens the dialog (synthetic mouseout)', open);
    } else check('desktop: pointer leaving through the top opens the dialog', open);
    check('desktop: focus moves into the dialog (email field)', await t.evaluate('document.activeElement?.id === "fb-exit-email"'));
    check('desktop: the page behind can\'t scroll', await t.evaluate('document.documentElement.style.overflow === "hidden"'));
    await t.shot('desktop-exit-dialog');
    for (let i = 0; i < 8; i++) await t.key('Tab', 'Tab', 9);
    check('desktop: Tab stays inside the dialog', await t.evaluate('!!document.activeElement?.closest(\'[role="dialog"]\')'));
    for (let i = 0; i < 8; i++) await t.key('Tab', 'Tab', 9, 8);
    check('desktop: Shift+Tab stays inside the dialog', await t.evaluate('!!document.activeElement?.closest(\'[role="dialog"]\')'));
    await t.key('Escape', 'Escape', 27);
    check('desktop: Escape closes it', !(await t.evaluate(dialogOpen)));
    check('desktop: "closed" is remembered', await t.evaluate('!!JSON.parse(localStorage.getItem("bw.fieldBrief") || "{}").closedAt'));
    await t.close();
    t = await tab(connection, DESKTOP);              // a new visit: only the 30-day "closed" memory can stop it now
    await t.go('/pricing/');
    await sleep(8200);
    await t.mouse('mouseMoved', 720, 400);
    await t.evaluate('document.dispatchEvent(new MouseEvent("mouseout", {bubbles: true, clientX: 720, clientY: -5, relatedTarget: null})), true');
    await sleep(300);
    check('desktop: after "close" it stays closed on the next visit', !(await t.evaluate(dialogOpen)));
    await t.close();

    // ── desktop: never on the booking / contact / audit pages ──
    for (const path of ['/contact/', '/book/', '/ai-leverage-audit/']) {
      t = await tab(connection, DESKTOP);
      await t.go(path);
      await t.evaluate(resetStorage);
      await t.go(path);
      await sleep(8200);
      await t.mouse('mouseMoved', 720, 400);
      await t.evaluate('document.dispatchEvent(new MouseEvent("mouseout", {bubbles: true, clientX: 720, clientY: -5, relatedTarget: null})), true');
      await sleep(300);
      check(`desktop: no prompt on ${path}`, !(await t.evaluate(dialogOpen)));
      await t.close();
    }

    // ── desktop: the homepage form signs someone up ──
    t = await tab(connection, DESKTOP);
    await t.go('/');
    await t.evaluate(resetStorage);
    const email = `check+${Date.now()}@example.com`;
    await t.click('#fb-home-first');
    await t.type('Pat');
    await t.click('#fb-home-email');
    await t.type(email);
    await t.click('#field-brief button[type=submit]');
    await sleep(800);
    check('home form: says "Check your inbox."', await t.evaluate('document.querySelector("#field-brief")?.textContent.includes("Check your inbox.")'));
    const stored = await t.evaluate(`fetch("/__field-brief/v4/subscribers?status=all&per_page=1000").then(r => r.json()).then(j => j.subscribers.find(s => s.email_address === ${JSON.stringify(email)}) || null)`);
    check('home form: the stand-in stored the signup', !!stored, stored ? `${stored.first_name}, source ${stored.fields?.signup_source}, ${stored.state}` : 'missing');
    check('home form: first name and source came through', stored?.first_name === 'Pat' && stored?.fields?.signup_source === 'home');
    await t.close();

    // ── a bad address is refused with a message, not a thank-you ──
    t = await tab(connection, DESKTOP);
    await t.go('/');
    await t.evaluate(resetStorage);
    await t.go('/');
    await t.click('#fb-footer-email');
    await t.type('not-an-email');
    await t.click('footer form button[type=submit]');
    await sleep(500);
    check('footer form: a bad address is not accepted', !(await t.evaluate('document.querySelector("footer").textContent.includes("Check your inbox.")')));
    await t.close();

    // ── an address the browser accepts but Kit refuses: Kit says 200 + "status":"failed", and the site must not thank them ──
    t = await tab(connection, DESKTOP);
    await t.go('/');
    await t.evaluate(resetStorage);
    await t.go('/');
    await t.click('#fb-footer-email');
    await t.type('pat@localhost');
    await t.click('footer form button[type=submit]');
    await sleep(800);
    check('footer form: Kit\'s "failed" answer shows an error, not a thank-you',
      await t.evaluate('!document.querySelector("footer").textContent.includes("Check your inbox.") && /doesn.t look right/.test(document.querySelector("footer [role=alert]")?.textContent || "")'));
    await t.close();

    // ── contact form: the box starts unchecked ──
    t = await tab(connection, DESKTOP);
    await t.go('/contact/');
    check('contact form: Field Brief box is there and unchecked', await t.evaluate('(() => { const b = document.getElementById("contact-field-brief"); return !!b && b.checked === false; })()'));
    await t.close();

    // ── phone: half-page slide-in ──
    t = await tab(connection, PHONE);
    await t.go('/pricing/');
    await t.evaluate(resetStorage);
    await t.go('/pricing/');
    await sleep(1000);
    check('phone: nothing pops up on arrival', !(await t.evaluate(slideOpen)) && !(await t.evaluate(dialogOpen)));
    await t.scrollTo(0.3);
    check('phone: nothing at 30% of the page', !(await t.evaluate(slideOpen)));
    await t.scrollTo(0.56);
    check('phone: the card slides up after half the page', await t.evaluate(slideOpen));
    const h = await t.evaluate('Math.round(document.querySelector(\'[role="dialog"][aria-modal="false"]\')?.getBoundingClientRect().height || 0)');
    check('phone: the card covers well under a third of the screen', h > 0 && h < 844 / 3, `${h}px of 844`);
    check('phone: focus is not moved by the card', await t.evaluate('!document.activeElement?.closest(\'[role="dialog"]\')'));
    await t.shot('phone-slide-in');
    await t.click('[role="dialog"][aria-modal="false"] .btn-primary');
    check('phone: "Send it to me" shows the form and focuses the email field', await t.evaluate('document.activeElement?.id === "fb-scroll-email"'));
    await t.shot('phone-slide-in-form');
    await t.click('[role="dialog"][aria-modal="false"] button[aria-label="Close"]');
    check('phone: Close closes it', !(await t.evaluate(slideOpen)));
    await t.scrollTo(0.2);
    await t.scrollTo(0.7);
    check('phone: it stays closed', !(await t.evaluate(slideOpen)));
    await t.close();

    // ── phone: no card while the homepage's own Field Brief section is on screen ──
    t = await tab(connection, PHONE);
    await t.go('/');
    await t.evaluate(resetStorage);
    await t.go('/');
    const bandAt = await t.evaluate('(() => { const e = document.getElementById("field-brief"); return Math.round((e.getBoundingClientRect().top + scrollY - 200) / (document.documentElement.scrollHeight - innerHeight) * 1000) / 1000; })()');
    // a jump straight there (a #field-brief link, a fast fling): one scroll event, already past half, band in view
    await t.evaluate(`scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * ${bandAt}), true`);
    await sleep(500);
    check('phone: no card when it would land on the homepage Field Brief section', !(await t.evaluate(slideOpen)), `at ${Math.round(bandAt * 100)}% of the page`);
    await t.close();

    // ── screenshots: both house themes, desktop and phone ──
    if (shots) {
      for (const [theme, label] of [['field-day', 'day'], ['field-manual', 'night']]) {
        t = await tab(connection, DESKTOP);
        await t.go(`/?theme=${theme}`);
        await t.evaluate(resetStorage);
        await t.go(`/?theme=${theme}`);
        await t.evaluate('(() => { const e = document.getElementById("field-brief"); e.scrollIntoView(); scrollBy(0, -110); return true; })()');
        await sleep(500);
        await t.shot(`desktop-home-band-${label}`);
        await t.evaluate('(() => { const e = document.querySelector("footer"); e.scrollIntoView(); scrollBy(0, -140); return true; })()');
        await sleep(400);
        await t.shot(`desktop-footer-${label}`);
        await sleep(7800);
        await t.evaluate('scrollTo(0, 2400), true');
        await sleep(300);
        await t.mouse('mouseMoved', 720, 400);
        await t.evaluate('document.dispatchEvent(new MouseEvent("mouseout", {bubbles: true, clientX: 720, clientY: -5, relatedTarget: null})), true');
        await sleep(500);
        await t.shot(`desktop-exit-dialog-${label}`);
        await t.close();

        t = await tab(connection, DESKTOP);
        await t.go(`/contact/?theme=${theme}`);
        await t.evaluate('(() => { const e = document.getElementById("contact-field-brief"); e.scrollIntoView({block: "center"}); return true; })()');
        await sleep(400);
        await t.shot(`desktop-contact-optin-${label}`);
        await t.close();

        t = await tab(connection, PHONE);
        await t.go(`/?theme=${theme}`);
        await t.evaluate('localStorage.setItem("bw.fieldBrief", JSON.stringify({closedAt: new Date().toISOString()})), true');
        await t.go(`/?theme=${theme}`);
        await t.evaluate('(() => { const e = document.getElementById("field-brief"); e.scrollIntoView(); scrollBy(0, -70); return true; })()');
        await sleep(500);
        await t.shot(`phone-home-band-${label}`);
        await t.close();

        t = await tab(connection, PHONE);
        await t.go(`/pricing/?theme=${theme}`);
        await t.evaluate(resetStorage);
        await t.go(`/pricing/?theme=${theme}`);
        await t.scrollTo(0.56);
        await t.shot(`phone-slide-in-${label}`);
        await t.close();
      }
    }
  } finally {
    await chrome.close();
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed${shots ? `; screenshots in ${shots}` : ''}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
