import { defineConfig } from 'astro/config';

// Domain produksi belum ditetapkan. Set SITE_URL (mis. https://contoh.co.id) saat
// build agar canonical, Open Graph URL, dan sitemap.xml memakai URL absolut.
const siteUrl = process.env.SITE_URL?.trim();

export default defineConfig({
  site: siteUrl || undefined,
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  devToolbar: { enabled: false },
});
