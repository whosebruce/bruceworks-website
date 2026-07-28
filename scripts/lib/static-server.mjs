/**
 * Minimal static file server that mirrors GitHub Pages semantics for the
 * built dist/ artifact:
 *   - `/path/` serves `path/index.html`
 *   - `/path` (existing directory, no trailing slash) 301-redirects to `/path/`
 *   - unknown paths serve `404.html` with a real 404 status
 */
import http from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, normalize, extname } from 'node:path';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};

export function createStaticServer(distDir) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    let filePath = join(distDir, safePath);

    if (!filePath.startsWith(distDir)) {
      res.writeHead(400).end('bad request');
      return;
    }

    if (pathname.endsWith('/')) {
      filePath = join(filePath, 'index.html');
    } else if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      res.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
      return;
    }

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      res
        .writeHead(200, { 'Content-Type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream' })
        .end(readFileSync(filePath));
      return;
    }

    const notFoundPage = join(distDir, '404.html');
    if (existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(readFileSync(notFoundPage));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found');
    }
  });

  return new Promise((resolvePromise) => {
    server.listen(0, '127.0.0.1', () => {
      resolvePromise({
        port: server.address().port,
        origin: `http://127.0.0.1:${server.address().port}`,
        close: () =>
          new Promise((done, fail) => {
            // Without this, close() waits out undici's keep-alive sockets.
            server.closeIdleConnections();
            server.close((error) => (error ? fail(error) : done()));
          }),
      });
    });
  });
}
