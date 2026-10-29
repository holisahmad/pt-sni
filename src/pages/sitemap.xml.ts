import type { APIRoute } from 'astro';

/** Halaman publik yang diindeks. 404 tidak disertakan. */
const pages = ['/', '/tentang-kami/', '/layanan/', '/kontak/', '/kebijakan-privasi/'];

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const entries = site
    ? pages
        .map((path) => `  <url>\n    <loc>${new URL(path, site.origin).href}</loc>\n  </url>`)
        .join('\n')
    : '';

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
