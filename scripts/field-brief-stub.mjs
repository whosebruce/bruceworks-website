// A stand-in for Kit (the Field Brief's email tool) that lives inside the dev server and `vite preview`, so the signup
// boxes work and keep what people type before Bruce has a Kit account. Nothing is emailed. It answers two things:
//
//   POST /__field-brief/forms/<form>/subscriptions   what a Kit form takes from a website: email_address,
//                                                    fields[first_name], fields[signup_source] (form-encoded)
//   GET  /__field-brief/v4/subscribers               Kit's v4 list (status=, per_page=, after=), for the CRM sync
//   POST /__field-brief/v4/subscribers/<id>/unsubscribe   so the sync's "unsubscribed" path can be tested
//   GET  /__field-brief/guard                        stands in for Kit's "one more step" page (addresses with +check)
//
// Signups are kept in .field-brief-stub/subscribers.json (git-ignored; FIELD_BRIEF_STUB_DIR moves it), one record per
// email, the same shape Kit's API answers with. A new signup starts "inactive" (Kit's state until someone clicks the
// confirm button in the PDF email) and the stand-in confirms it at once, since there's no email to click.
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PREFIX = '/__field-brief';
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const STATES = ['active', 'inactive', 'bounced', 'complained', 'cancelled'];

export function fieldBriefStub() {
  const dir = resolve(process.env.FIELD_BRIEF_STUB_DIR || '.field-brief-stub');
  const file = join(dir, 'subscribers.json');
  const load = () => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return { next: 1, subscribers: [] }; } };
  const save = (db) => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${file}.tmp`, JSON.stringify(db, null, 2));
    renameSync(`${file}.tmp`, file);  // a crash mid-write never leaves half a file
  };
  const send = (res, code, body) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
  };
  const readBody = (req) => new Promise((ok, fail) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 20_000) { fail(new Error('too big')); req.destroy(); } });
    req.on('end', () => ok(raw));
    req.on('error', fail);
  });
  const parse = (raw, type) => {
    if ((type || '').includes('application/json')) { try { return JSON.parse(raw || '{}'); } catch { return {}; } }
    const p = new URLSearchParams(raw);
    const out = { fields: {} };
    for (const [k, v] of p) {
      const m = /^fields\[([a-z0-9_]{1,40})\]$/.exec(k);
      if (m) out.fields[m[1]] = v.slice(0, 200); else out[k] = v;
    }
    return out;
  };

  const handle = async (req, res, next) => {
    const url = new URL(req.url || '/', 'http://stub.local');
    if (!url.pathname.startsWith(`${PREFIX}/`)) return next();
    const path = url.pathname.slice(PREFIX.length);
    try {
      let m = /^\/forms\/([A-Za-z0-9_-]{1,40})\/subscriptions$/.exec(path);
      if (m && req.method === 'POST') {
        const body = parse(await readBody(req), req.headers['content-type']);
        const email = String(body.email_address || '').trim().toLowerCase();
        // Kit's own answer to a bad address: 200 with status "failed" (checked 2026-10-19), so the site must read the body
        if (!EMAIL.test(email)) return send(res, 200, { consent: { enabled: false }, status: 'failed', errors: { fields: ['email_address'], messages: ['Email address is invalid'] } });
        // Kit's spam guard: unsure signups get {"status":"quarantined","url"} and are saved only after a reCAPTCHA on that
        // page. Any address with "+check" in it plays that part here.
        if (email.includes('+check')) return send(res, 200, { consent: { enabled: false }, status: 'quarantined', url: `${PREFIX}/guard` });
        const db = load();
        const now = new Date().toISOString();
        let s = db.subscribers.find((x) => x.email_address === email);
        if (!s) {
          s = { id: db.next++, first_name: null, email_address: email, state: 'inactive', created_at: now, fields: {}, form_id: m[1] };
          db.subscribers.push(s);
        }
        const first = String(body.fields?.first_name || body.first_name || '').trim().slice(0, 80);
        if (first) s.first_name = first;
        if (body.fields?.signup_source && !s.fields.signup_source) s.fields.signup_source = body.fields.signup_source;
        // Kit sends the confirm email here; the stand-in confirms at once (a re-signup after unsubscribing too).
        s.state = 'active';
        s.updated_at = now;
        save(db);
        return send(res, 200, { status: 'success', subscriber: { id: s.id, state: s.state } });
      }
      if (path === '/guard' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.end('<!doctype html><title>One more step</title><p>Stand-in for Kit\'s "I\'m not a robot" page.</p>');
      }
      if (path === '/v4/subscribers' && req.method === 'GET') {
        const status = url.searchParams.get('status') || 'active';
        const per = Math.min(Math.max(Number(url.searchParams.get('per_page')) || 500, 1), 1000);
        const after = Number(url.searchParams.get('after')) || 0;
        const all = load().subscribers.filter((s) => status === 'all' || s.state === status);
        const page = all.filter((s) => s.id > after).slice(0, per);
        const last = page[page.length - 1];
        return send(res, 200, {
          subscribers: page,
          pagination: {
            has_previous_page: after > 0, has_next_page: !!last && all.some((s) => s.id > last.id),
            start_cursor: page[0] ? String(page[0].id) : null, end_cursor: last ? String(last.id) : null, per_page: per,
          },
        });
      }
      m = /^\/v4\/subscribers\/(\d{1,9})\/unsubscribe$/.exec(path);
      if (m && req.method === 'POST') {
        const db = load();
        const s = db.subscribers.find((x) => x.id === Number(m[1]));
        if (!s) return send(res, 404, { errors: ['Not Found'] });
        s.state = 'cancelled';
        s.updated_at = new Date().toISOString();
        save(db);
        return send(res, 200, { subscriber: s });
      }
      return send(res, 404, { errors: ['Not Found'], known_states: STATES });
    } catch (e) {
      return send(res, 400, { errors: [String(e && e.message || e)] });
    }
  };

  return {
    name: 'field-brief-stub',
    configureServer(server) { server.middlewares.use(handle); },
    configurePreviewServer(server) { server.middlewares.use(handle); },
  };
}
