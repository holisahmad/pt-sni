/**
 * URL produksi default bila `SITE_URL` tidak diset.
 *
 * Dipakai bersama oleh `astro.config.mjs` (canonical, og:url, structured data, sitemap)
 * dan `scripts/qa-build.mjs` (validasi), sehingga build tanpa variabel lingkungan tetap
 * konsisten — termasuk build otomatis di Vercel.
 *
 * Timpa dengan `SITE_URL` saat memakai domain kustom atau server internal, mis.
 * `SITE_URL=https://domain-perusahaan.co.id npm run build`.
 */
export const DEFAULT_SITE_URL = 'https://pt-sni.vercel.app';
