#!/usr/bin/env node
/**
 * QA build: memeriksa hasil `astro build` di folder dist/.
 * Berfokus pada hal yang tidak tertangkap oleh type-check:
 * metadata SEO, struktur heading, tautan internal, anchor, dan deliverable produksi.
 *
 * Jalankan setelah build: `npm run qa:build`
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = resolve('dist');
const SITE_URL = process.env.SITE_URL?.trim().replace(/\/+$/, '') ?? null;
const PLACEHOLDER_PATTERNS = [
  /\blorem\b/i,
  /\bipsum\b/i,
  /\btodo\b/i,
  /\[perlu data/i,
  /\bxxxx+\b/i,
];

const errors = [];
const warnings = [];
let checks = 0;

const fail = (scope, message) => errors.push(`${scope}: ${message}`);
const warn = (scope, message) => warnings.push(`${scope}: ${message}`);
const ok = () => {
  checks += 1;
};

if (!existsSync(DIST)) {
  console.error('Folder dist/ tidak ditemukan. Jalankan `npm run build` terlebih dahulu.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function toRoute(file) {
  const rel = relative(DIST, file).split('\\').join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((file) => extname(file) === '.html');
const pageFiles = htmlFiles.filter((file) => toRoute(file) !== '/404.html');

if (pageFiles.length === 0) {
  console.error('Tidak ada halaman HTML di dist/.');
  process.exit(1);
}

const titles = new Map();
const descriptions = new Map();

/* -------------------------------------------------------------------------- */
/* Pemeriksaan per halaman                                                    */
/* -------------------------------------------------------------------------- */

for (const file of htmlFiles) {
  const route = toRoute(file);
  const scopedFail = (message) => fail(route, message);
  const scopedWarn = (message) => warn(route, message);
  const html = readFileSync(file, 'utf8');
  const root = parse(html, { comment: false });
  const ids = new Set(
    root
      .querySelectorAll('[id]')
      .map((node) => node.getAttribute('id'))
      .filter(Boolean),
  );
  const text = root.text.replace(/\s+/g, ' ');

  // Bahasa dokumen
  const htmlTag = root.querySelector('html');
  if (htmlTag?.getAttribute('lang') !== 'id') scopedFail('atribut lang pada <html> harus "id"');
  else ok();

  // Viewport
  if (!root.querySelector('meta[name="viewport"]')) scopedFail('meta viewport tidak ditemukan');
  else ok();

  // Title
  const title = root.querySelector('title')?.text.trim() ?? '';
  if (title.length === 0) scopedFail('judul halaman kosong');
  else if (title.length > 70) scopedWarn(`judul ${title.length} karakter (disarankan ≤ 70)`);
  else ok();

  // Meta description
  const description = root.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
  if (description.length === 0) scopedFail('meta description tidak ditemukan');
  else if (description.length < 50 || description.length > 170) {
    scopedWarn(`meta description ${description.length} karakter (disarankan 50–170)`);
  } else ok();

  // Unik antar halaman
  if (route !== '/404.html') {
    if (titles.has(title)) scopedFail(`judul duplikat dengan ${titles.get(title)}`);
    else titles.set(title, route);

    if (descriptions.has(description)) scopedFail(`meta description duplikat dengan ${descriptions.get(description)}`);
    else descriptions.set(description, route);
  }

  // Open Graph
  for (const property of ['og:title', 'og:description', 'og:type', 'og:locale', 'og:site_name']) {
    const content = root.querySelector(`meta[property="${property}"]`)?.getAttribute('content')?.trim() ?? '';
    if (content.length === 0) scopedFail(`meta ${property} tidak ditemukan`);
    else ok();
  }

  // Robots
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (route === '/404.html' && !robots.includes('noindex')) scopedFail('halaman 404 harus noindex');
  if (route !== '/404.html' && robots.includes('noindex')) scopedFail('halaman publik tidak boleh noindex');
  ok();

  // Canonical hanya ketika domain produksi diketahui
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null;
  if (SITE_URL) {
    if (!canonical) scopedFail('canonical tidak ditemukan meski SITE_URL tersedia');
    else if (!canonical.startsWith(SITE_URL)) scopedFail(`canonical tidak memakai SITE_URL (${canonical})`);
    else ok();
  } else if (canonical) {
    scopedWarn('canonical ada tanpa SITE_URL');
  }

  // Landmark dan skip link
  const main = root.querySelector('main');
  if (!main) scopedFail('elemen <main> tidak ditemukan');
  else if (!main.getAttribute('id')) scopedFail('<main> tanpa id');
  else ok();

  const skipLink = root.querySelector('a.skip-link');
  if (!skipLink) scopedFail('skip link tidak ditemukan');
  else {
    const target = (skipLink.getAttribute('href') ?? '').replace('#', '');
    if (!ids.has(target)) scopedFail(`skip link menuju #${target} yang tidak ada`);
    else ok();
  }

  if (!root.querySelector('header.site-header')) scopedFail('header situs tidak ditemukan');
  else ok();
  if (!root.querySelector('footer.site-footer')) scopedFail('footer situs tidak ditemukan');
  else ok();

  // Heading
  const headingNodes = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const h1s = headingNodes.filter((node) => node.rawTagName === 'h1');
  if (h1s.length !== 1) scopedFail(`jumlah <h1> harus 1, ditemukan ${h1s.length}`);
  else ok();

  let previousLevel = 0;
  for (const heading of headingNodes) {
    const level = Number(heading.rawTagName.slice(1));
    if (previousLevel > 0 && level - previousLevel > 1) {
      scopedFail(`lompatan heading h${previousLevel} → h${level} ("${heading.text.trim()}")`);
    }
    previousLevel = level;
  }
  ok();

  // Atribut ARIA yang merujuk id
  for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
    for (const node of root.querySelectorAll(`[${attr}]`)) {
      for (const id of (node.getAttribute(attr) ?? '').split(/\s+/).filter(Boolean)) {
        if (!ids.has(id)) scopedFail(`${attr}="${id}" tidak memiliki elemen target`);
        else ok();
      }
    }
  }

  // Tautan
  for (const link of root.querySelectorAll('a')) {
    const href = link.getAttribute('href') ?? '';
    if (href.trim() === '' || href === '#') {
      scopedFail(`tautan tanpa tujuan (teks: "${link.text.trim().slice(0, 40)}")`);
      continue;
    }

    const [pathPart, hashPart] = href.split('#');
    if (/^(mailto:|tel:)/.test(href)) {
      ok();
      continue;
    }
    if (/^https?:\/\//.test(href)) {
      scopedWarn(`tautan eksternal: ${href}`);
      continue;
    }

    let targetFile = file;
    if (pathPart && pathPart.length > 0) {
      if (extname(pathPart)) {
        const assetPath = join(DIST, pathPart.replace(/^\//, ''));
        if (!existsSync(assetPath)) scopedFail(`aset tidak ditemukan: ${href}`);
        else ok();
        continue;
      }

      const normalized = pathPart.replace(/^\.?\//, '');
      const candidate = join(DIST, normalized);
      if (existsSync(candidate) && statSync(candidate).isDirectory()) {
        targetFile = join(candidate, 'index.html');
      } else {
        targetFile = candidate.endsWith('.html') ? candidate : `${candidate}.html`;
      }

      if (!existsSync(targetFile)) {
        scopedFail(`tautan internal tidak ditemukan: ${href}`);
        continue;
      }
      ok();
    }

    if (hashPart) {
      const targetHtml = readFileSync(targetFile, 'utf8');
      if (!new RegExp(`id=["']${hashPart}["']`).test(targetHtml)) {
        scopedFail(`anchor #${hashPart} tidak ada di ${toRoute(targetFile)}`);
      } else ok();
    }
  }

  // Gambar
  for (const image of root.querySelectorAll('img')) {
    const src = image.getAttribute('src') ?? '';
    if (!image.hasAttribute('alt')) scopedFail(`<img> tanpa alt (${src})`);
    else ok();

    if (src.startsWith('/')) {
      if (!existsSync(join(DIST, src.slice(1)))) scopedFail(`berkas gambar tidak ditemukan: ${src}`);
      else ok();
    }
  }

  // Berkas ikon yang dirujuk <head> harus benar-benar ada di dist/
  for (const iconLink of root.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')) {
    const href = iconLink.getAttribute('href') ?? '';
    const iconPath = join(DIST, href.replace(/^\//, ''));
    if (!existsSync(iconPath)) scopedFail(`berkas ikon tidak ditemukan: ${href}`);
    else ok();
  }

  // Kontrol formulir harus punya label
  for (const control of root.querySelectorAll('input, select, textarea')) {
    const type = (control.getAttribute('type') ?? '').toLowerCase();
    const name = control.getAttribute('name') ?? '';
    if (type === 'hidden' || name === '_gotcha') continue;

    const id = control.getAttribute('id');
    const hasExplicitLabel = id ? Boolean(root.querySelector(`label[for="${id}"]`)) : false;
    const hasAriaLabel = Boolean(control.getAttribute('aria-label') || control.getAttribute('aria-labelledby'));
    if (!hasExplicitLabel && !hasAriaLabel) scopedFail(`kontrol "${name || control.rawTagName}" tanpa label`);
    else ok();
  }

  // Teks placeholder
  const lower = text.toLowerCase();
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(lower)) scopedFail(`teks placeholder terdeteksi: ${pattern}`);
  }

  // Analytics / tracking
  if (/googletagmanager|google-analytics|gtag\(|fbq\(|hotjar|plausible|matomo/i.test(html)) {
    scopedFail('skrip analitik/tracking terdeteksi');
  } else ok();
}

/* -------------------------------------------------------------------------- */
/* Deliverable produksi                                                       */
/* -------------------------------------------------------------------------- */

const requiredFiles = [
  'robots.txt',
  'sitemap.xml',
  'favicon-32.png',
  'apple-touch-icon.png',
  'logo/sentra-mark.png',
  '404.html',
  'fonts/inter-latin-var.woff2',
];
for (const file of requiredFiles) {
  if (!existsSync(join(DIST, file))) fail('dist', `berkas wajib tidak ditemukan: ${file}`);
  else ok();
}

const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!/User-agent:\s*\*/i.test(robots)) fail('robots.txt', 'tidak memuat User-agent: *');
else ok();
if (SITE_URL && !robots.includes(`${SITE_URL}/sitemap.xml`)) {
  fail('robots.txt', 'Sitemap tidak tercantum meski SITE_URL tersedia');
} else ok();

const sitemap = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : '';
if (!/<urlset[^>]+sitemaps\.org\/schemas\/sitemap\/0\.9/.test(sitemap)) {
  fail('sitemap.xml', 'root <urlset> dengan namespace standar tidak ditemukan');
} else ok();

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (SITE_URL) {
  if (locs.length !== pageFiles.length) {
    fail('sitemap.xml', `jumlah URL (${locs.length}) tidak sama dengan halaman publik (${pageFiles.length})`);
  } else ok();
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) fail('sitemap.xml', `URL tidak absolut sesuai SITE_URL: ${loc}`);
  }
  ok();
} else if (locs.length > 0) {
  fail('sitemap.xml', 'berisi URL padahal SITE_URL tidak diset');
} else {
  warn('sitemap.xml', 'kosong karena SITE_URL belum ditetapkan (lihat README)');
}

const cssFiles = allFiles.filter((file) => extname(file) === '.css');
if (cssFiles.length === 0) fail('dist', 'tidak ada berkas CSS');
else ok();

/* -------------------------------------------------------------------------- */
/* Laporan                                                                    */
/* -------------------------------------------------------------------------- */

const pageList = htmlFiles.map(toRoute).sort();
console.log(`Halaman diperiksa (${pageList.length}):`);
for (const route of pageList) console.log(`  - ${route}`);

console.log(`\nPemeriksaan lolos: ${checks}`);
console.log(`Peringatan: ${warnings.length}`);
console.log(`Kesalahan: ${errors.length}`);

if (warnings.length > 0) {
  console.log('\nPeringatan:');
  for (const message of warnings) console.log(`  ! ${message}`);
}

if (errors.length > 0) {
  console.log('\nKesalahan:');
  for (const message of errors) console.log(`  x ${message}`);
  process.exit(1);
}

console.log('\nQA build selesai tanpa kesalahan.');
