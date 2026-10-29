#!/usr/bin/env node
// Server statis tanpa dependensi untuk hasil build Astro (dist/).
// Dipakai oleh unit systemd user `pt-sni.service` di server 192.168.89.72.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const PORT = Number(process.env.PORT ?? 8080);
const HOST = process.env.HOST ?? '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

const fileAt = async (path) => {
  try {
    const info = await stat(path);
    return info.isFile() ? info : null;
  } catch {
    return null;
  }
};

// Urutan pencarian: berkas apa adanya, lalu index.html direktori (routing tanpa ekstensi).
const resolveFile = async (pathname) => {
  const candidates = [pathname, join(pathname, 'index.html'), `${pathname}.html`];
  for (const candidate of candidates) {
    const info = await fileAt(candidate);
    if (info) return { path: candidate, info };
  }
  return null;
};

const cacheControl = (pathname) =>
  pathname.startsWith('/_astro/') || pathname.startsWith('/fonts/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  const target = normalize(join(ROOT, pathname));
  if (target !== ROOT && !target.startsWith(ROOT + sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const found = await resolveFile(target);
  const notFoundPath = join(ROOT, '404.html');
  const info = found?.info ?? (found ? null : await fileAt(notFoundPath));
  if (!info) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 page missing');
    return;
  }

  const servedPath = found?.path ?? notFoundPath;
  res.writeHead(found ? 200 : 404, {
    'Content-Type': MIME[extname(servedPath).toLowerCase()] ?? 'application/octet-stream',
    'Content-Length': info.size,
    'Cache-Control': cacheControl(url.pathname),
    'X-Content-Type-Options': 'nosniff',
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  createReadStream(servedPath).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`pt-sni siap di http://${HOST}:${PORT} (root: ${ROOT})`);
});
