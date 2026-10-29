import { defineConfig } from 'astro/config';
import { DEFAULT_SITE_URL } from './site.config.mjs';

// Default: URL Vercel (lihat site.config.mjs). Timpa dengan SITE_URL saat build
// memakai domain kustom, mis. SITE_URL=https://contoh.co.id npm run build.
const siteUrl = (process.env.SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/+$/, '');

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  devToolbar: { enabled: false },
});
