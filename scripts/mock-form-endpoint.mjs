#!/usr/bin/env node
/**
 * Endpoint tiruan untuk menguji formulir kontak tanpa penyedia layanan sungguhan.
 *
 * Pakai:
 *   1) node scripts/mock-form-endpoint.mjs
 *   2) PUBLIC_CONTACT_FORM_ENDPOINT=http://localhost:4399/submit npm run build && npm run preview
 *
 * Hanya untuk pengembangan lokal. Jangan dipakai di produksi.
 */

import { createServer } from 'node:http';

const PORT = Number(process.env.MOCK_PORT ?? 4399);

const server = createServer((request, response) => {
  const { method, url } = request;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (method === 'OPTIONS') {
    response.writeHead(204).end();
    return;
  }

  if (method === 'GET' && url === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (method === 'POST' && url === '/submit') {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      console.log('[mock] payload:', body);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`Mock endpoint formulir aktif di http://localhost:${PORT}/submit`);
});
