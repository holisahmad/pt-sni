#!/usr/bin/env node
/**
 * Menyiapkan aset logo web dari berkas sumber di brand/source/.
 *
 * Berkas yang diberikan perusahaan adalah render dengan latar menempel
 * (termasuk pola kotak-kotak pada JPEG, yang bukan transparansi asli).
 * Skrip ini mengekstrak lambang logo menjadi PNG transparan, lalu membuat
 * varian favicon. Logo TIDAK digambar ulang atau diubah bentuk/warnanya;
 * hanya latarnya yang dibuang.
 *
 * Jalankan: node scripts/prepare-logo-assets.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const SOURCE = 'brand/source/logo_png_no_texts.jpg';
const OUTPUT_DIR = 'public/logo';

/** Luminance di atas ambang ini sudah dianggap latar (transparan penuh). */
const ALPHA_CLEAR = 236;
/** Luminance di bawah ambang ini dianggap bagian logo yang solid. */
const ALPHA_SOLID = 196;
/** Perkiraan kecerahan latar untuk membatalkan campuran warna tepi. */
const BACKGROUND_LUMA = 240;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

if (!existsSync(SOURCE)) {
  console.error(`Sumber logo tidak ditemukan: ${SOURCE}`);
  process.exit(1);
}

await mkdir(OUTPUT_DIR, { recursive: true });

/* -------------------------------------------------------------------------- */
/* 1. Ekstrak lambang menjadi PNG transparan                                  */
/* -------------------------------------------------------------------------- */

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const out = Buffer.alloc(width * height * 4);
let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = (y * width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);

    // Pola kotak-kotak latar berwarna netral terang: buang sepenuhnya, tanpa sisa
    // abu-abu. Piksel berwarna atau gelap dianggap bagian logo.
    const alpha =
      saturation < 12 && luma > 190
        ? 0
        : clamp((ALPHA_CLEAR - luma) / (ALPHA_CLEAR - ALPHA_SOLID), 0, 1);

    if (alpha === 0) {
      out[i + 3] = 0;
      continue;
    }

    // Batalkan campuran dengan latar agar tidak tersisa halo terang di tepi.
    if (alpha < 1) {
      out[i] = clamp((r - (1 - alpha) * BACKGROUND_LUMA) / alpha, 0, 255);
      out[i + 1] = clamp((g - (1 - alpha) * BACKGROUND_LUMA) / alpha, 0, 255);
      out[i + 2] = clamp((b - (1 - alpha) * BACKGROUND_LUMA) / alpha, 0, 255);
    } else {
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
    }
    out[i + 3] = Math.round(alpha * 255);

    if (alpha > 0.5) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropped = {
  left,
  top,
  width: Math.min(width - left, maxX - minX + 1 + pad * 2),
  height: Math.min(height - top, maxY - minY + 1 + pad * 2),
};

const mark = sharp(out, { raw: { width, height, channels: 4 } }).extract(cropped);

const markPath = `${OUTPUT_DIR}/sentra-mark.png`;
await mark.clone().resize({ height: 240 }).png({ compressionLevel: 9 }).toFile(markPath);
console.log(`lambang: ${markPath} (dipotong dari ${cropped.width}x${cropped.height})`);

/* -------------------------------------------------------------------------- */
/* 2. Ikon situs dari lambang yang sama                                        */
/* -------------------------------------------------------------------------- */

/** Lambang di dalam tile putih; tile putih menjaga kontras di tab terang/gelap. */
async function tile(size, { markHeight, rounded }) {
  const markPng = await sharp(markPath)
    .resize({ height: markHeight, fit: 'inside' })
    .png()
    .toBuffer();

  let image = sharp({
    create: { width: size, height: size, channels: 4, background: '#FFFFFF' },
  }).composite([{ input: markPng, gravity: 'center' }]);

  if (rounded) {
    const radius = Math.round(size * 0.19);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" ` +
        `rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
    );
    image = sharp(await image.png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]);
  }

  return image.png({ compressionLevel: 9 }).toBuffer();
}

// 32px: favicon tab. 180px: apple-touch-icon (sudut dibiarkan persegi, iOS memotong sendiri).
await writeFile('public/favicon-32.png', await tile(32, { markHeight: 27, rounded: true }));
await writeFile('public/apple-touch-icon.png', await tile(180, { markHeight: 152, rounded: false }));

console.log('ikon: public/favicon-32.png, public/apple-touch-icon.png');
