/**
 * Dependency-free headless Chrome driver over the DevTools protocol, using
 * Node's built-in WebSocket client (Node >= 22). Used by verify-routes.mjs
 * for real-browser hash-compatibility checks and by capture-screenshots.mjs.
 */
import { spawn, execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const candidate of ['google-chrome-stable', 'google-chrome', 'chromium-browser', 'chromium']) {
    try {
      const found = execSync(`command -v ${candidate}`, { encoding: 'utf8' }).trim();
      if (found) return found;
    } catch {
      /* try next candidate */
    }
  }
  throw new Error(
    'No Chrome/Chromium executable found. Install Chrome or set CHROME_PATH; the route verifier needs a JavaScript-capable browser.'
  );
}

export async function launchChrome() {
  const executable = findChrome();
  const profileDir = mkdtempSync(join(tmpdir(), 'bw-verify-chrome-'));
  const child = spawn(
    executable,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );

  const childExited = new Promise((resolvePromise) => {
    child.once('exit', () => resolvePromise(true));
  });

  const wsUrl = await new Promise((resolvePromise, rejectPromise) => {
    let stderr = '';
    const timer = setTimeout(() => rejectPromise(new Error(`Chrome did not expose DevTools endpoint:\n${stderr}`)), 20000);
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolvePromise(match[1]);
      }
    });
    child.on('exit', (code) => {
      clearTimeout(timer);
      rejectPromise(new Error(`Chrome exited early (code ${code}):\n${stderr}`));
    });
  });

  const connection = await connect(wsUrl);
  return {
    connection,
    close: async () => {
      try {
        try {
          await connection.send('Browser.close', {}, undefined, 10000);
        } catch {
          /* graceful close unavailable — the kill fallback below takes over */
        }
        // The profile must not be removed while Chrome can still write to it:
        // wait for the child to actually exit, escalating to SIGKILL.
        if (!(await exitedWithin(childExited, 10000))) {
          child.kill('SIGKILL');
          if (!(await exitedWithin(childExited, 5000))) {
            throw new Error(`Chrome (pid ${child.pid}) did not exit after Browser.close and SIGKILL`);
          }
        }
      } finally {
        connection.socket.close();
      }
      await removeProfileDir(profileDir);
    },
  };
}

function exitedWithin(childExited, timeoutMs) {
  let timer;
  return Promise.race([
    childExited,
    new Promise((resolvePromise) => {
      timer = setTimeout(() => resolvePromise(false), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timer));
}

/**
 * The kernel can briefly report ENOTEMPTY/EBUSY while Chrome's just-exited
 * profile writes flush; retry those with a bound. Anything else — or a race
 * that outlives the bound — is a genuine failure and propagates.
 */
async function removeProfileDir(profileDir) {
  const maxAttempts = 10;
  for (let attempt = 1; ; attempt++) {
    try {
      rmSync(profileDir, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt >= maxAttempts || !['ENOTEMPTY', 'EBUSY'].includes(error.code)) throw error;
      await sleep(200);
    }
  }
}

function connect(wsUrl) {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const listeners = [];

    const connection = {
      socket,
      send(method, params = {}, sessionId, timeoutMs = 60000) {
        const id = nextId++;
        return new Promise((resolveSend, rejectSend) => {
          const timer = setTimeout(() => {
            if (pending.has(id)) {
              pending.delete(id);
              rejectSend(new Error(`${method}: no response from Chrome after ${timeoutMs}ms`));
            }
          }, timeoutMs);
          pending.set(id, {
            resolveSend: (value) => {
              clearTimeout(timer);
              resolveSend(value);
            },
            rejectSend: (error) => {
              clearTimeout(timer);
              rejectSend(error);
            },
            method,
          });
          socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
        });
      },
      onEvent(handler) {
        listeners.push(handler);
      },
    };

    socket.addEventListener('open', () => resolvePromise(connection));
    socket.addEventListener('error', () => rejectPromise(new Error(`Could not connect to ${wsUrl}`)));
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const { resolveSend, rejectSend, method } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) {
          rejectSend(new Error(`${method}: ${message.error.message}`));
        } else {
          resolveSend(message.result);
        }
      } else if (message.method) {
        for (const handler of listeners) handler(message.method, message.params, message.sessionId);
      }
    });
  });
}

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

/**
 * Opens a fresh tab, navigates to `url`, waits for the page (and any client
 * redirect) to settle, and reports every main-frame navigation observed.
 */
export async function visit(connection, url, { settleMs = 400, timeoutMs = 20000 } = {}) {
  const { targetId } = await connection.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await connection.send('Target.attachToTarget', { targetId, flatten: true });
  await connection.send('Page.enable', {}, sessionId);
  await connection.send('Runtime.enable', {}, sessionId);

  const navigations = [];
  connection.onEvent((method, params, eventSession) => {
    if (eventSession !== sessionId) return;
    if (method === 'Page.frameNavigated' && !params.frame.parentId && params.frame.url !== 'about:blank') {
      navigations.push(params.frame.url);
    }
  });

  await connection.send('Page.navigate', { url }, sessionId);

  const evaluate = async (expression) => {
    const { result } = await connection.send(
      'Runtime.evaluate',
      { expression, returnByValue: true },
      sessionId
    );
    return result.value;
  };

  const deadline = Date.now() + timeoutMs;
  let lastHref = null;
  let stableSince = null;
  while (Date.now() < deadline) {
    let snapshot;
    try {
      snapshot = await evaluate('JSON.stringify({href: location.href, ready: document.readyState})');
    } catch {
      await sleep(100);
      continue;
    }
    const { href, ready } = JSON.parse(snapshot);
    if (ready === 'complete' && href === lastHref) {
      if (stableSince === null) stableSince = Date.now();
      if (Date.now() - stableSince >= settleMs) break;
    } else {
      stableSince = null;
    }
    lastHref = href;
    await sleep(100);
  }

  return {
    navigations,
    evaluate,
    screenshot: async ({ width, height, mobile, path }) => {
      const { writeFileSync } = await import('node:fs');
      // deviceScaleFactor stays 1: the deliverable is a fixed CSS-pixel width,
      // and 2x full-page bitmaps hang Chrome's software rasterizer.
      await connection.send(
        'Emulation.setDeviceMetricsOverride',
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId
      );
      await sleep(500);
      const { data } = await connection.send(
        'Page.captureScreenshot',
        { format: 'png', captureBeyondViewport: true },
        sessionId,
        120000
      );
      writeFileSync(path, Buffer.from(data, 'base64'));
    },
    close: () => connection.send('Target.closeTarget', { targetId }),
  };
}
