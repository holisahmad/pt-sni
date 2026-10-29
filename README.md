# Website Company Profile — PT Sentra Niagatama Indonesia

Situs profil perusahaan statis (Astro + TypeScript + CSS murni) untuk PT Sentra Niagatama Indonesia,
perseroan perorangan berskala usaha mikro yang bergerak di bidang perdagangan eceran digital di Gamping,
Sleman, Daerah Istimewa Yogyakarta.

Spesifikasi proyek:
[`WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md`](WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md).
Status setiap data perusahaan (terverifikasi / menunggu / sengaja tidak dipublikasikan) didaftar di
[`CONTENT_REQUIREMENTS.md`](CONTENT_REQUIREMENTS.md).

Prinsip yang dipegang di repositori ini: **tidak ada klaim yang belum terverifikasi**. Data yang belum
ada dokumennya ditampilkan sebagai status jujur ("Belum dipublikasikan"), bukan diisi teks karangan atau
placeholder tersembunyi. Identitas badan usaha, NIB, dan cakupan KBLI diambil dari dokumen resmi yang
diberikan perusahaan; NIK, NPWP, dan nama pendiri tidak pernah disimpan di repositori ini.

---

## 1. Prasyarat

| Kebutuhan | Versi |
|---|---|
| Node.js | `>= 22.23.4` (syarat Astro 7). Pengembangan dan pengujian terakhir memakai **Node v25.9.0** |
| npm | `>= 9.6.5` (terakhir diuji dengan npm 11.21.1) |

Tidak ada database, backend, atau layanan eksternal yang wajib. Build menghasilkan HTML statis penuh.

## 2. Instalasi

```powershell
npm install
```

## 3. Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan di `http://localhost:4321` (hot reload) |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Menjalankan hasil build (`dist/`) secara lokal |
| `npm run check` | Type-check dan diagnostik Astro/TypeScript (`astro check`) |
| `npm test` | Unit test (Node test runner bawaan, tanpa framework tambahan) |
| `npm run qa:build` | Audit hasil build di `dist/` (dijalankan **setelah** `npm run build`) |
| `npm run logo:assets` | Regenerasi `public/logo/sentra-mark.png`, `favicon-32.png`, dan `apple-touch-icon.png` dari berkas di `brand/source/` |
| `npm run verify` | `check` → `test` → `build` → `qa:build` berurutan |

`npm run start` adalah alias `npm run dev`.

## 4. Konfigurasi lingkungan

Semua variabel bersifat opsional; situs tetap build dan berfungsi tanpanya.

### `SITE_URL`

Domain produksi, dipakai untuk `canonical`, `og:url`, `url` pada structured data, isi `sitemap.xml`,
dan baris `Sitemap:` di `robots.txt`.

Nilai default sudah diisi `https://pt-sni.vercel.app` di [`site.config.mjs`](site.config.mjs), sehingga
build otomatis Vercel (tanpa variabel lingkungan) tetap menghasilkan canonical dan sitemap yang benar.
Untuk domain kustom atau server internal, timpa nilainya:

```powershell
$env:SITE_URL = "https://domain-perusahaan.co.id"
npm run build
```

`site.config.mjs` dibaca oleh `astro.config.mjs` **dan** `scripts/qa-build.mjs`, jadi QA memvalidasi
canonical/sitemap terhadap URL yang sama persis dengan yang dipakai build.

### `PUBLIC_CONTACT_FORM_ENDPOINT`

URL endpoint yang menerima `POST` JSON dari formulir kontak (mis. Formspree, Web3Forms, atau
Fungsi serverless milik sendiri).

```powershell
$env:PUBLIC_CONTACT_FORM_ENDPOINT = "https://contoh-endpoint.example/submit"
npm run build
```

Jika kosong (kondisi default saat ini):

- Halaman `/kontak` menampilkan panel "Formulir belum diaktifkan" beserta penjelasan, bukan formulir
  mati yang menipu pengunjung.
- Paragraf terkait di `/kebijakan-privasi` ikut menyesuaikan (tidak menjelaskan formulir yang tidak ada).

> Catatan: nilai ini ditanam saat **build**, bukan dibaca saat runtime. Mengubahnya memerlukan build ulang.

### Menguji formulir secara lokal

Tersedia endpoint tiruan agar alur formulir dapat diuji ujung ke ujung tanpa penyedia layanan:

```powershell
# Terminal 1
node scripts/mock-form-endpoint.mjs          # http://localhost:4399/submit, GET /health

# Terminal 2
$env:PUBLIC_CONTACT_FORM_ENDPOINT = "http://localhost:4399/submit"
npm run build
npm run preview
```

Endpoint tiruan hanya untuk pengembangan; jangan dipakai di produksi.

## 5. Struktur proyek

```text
brand/source/                     Aset logo asli dari perusahaan (tidak ikut diunggah ke hosting)
  logo_png_no_texts.jpg           Lambang tanpa teks — sumber ekstraksi
  logo_png_texts.png              Lengkap dengan wordmark + tagline
  logo-jpg.jpg / logo-jpg-1.jpg   Varian komposisi lain
public/
  logo/sentra-mark.png            Lambang logo, PNG transparan (dipakai di header)
  favicon-32.png                  Ikon tab 32px (lambang di tile putih)
  apple-touch-icon.png            Ikon 180px untuk iOS
  fonts/inter-latin-var.woff2     Inter Variable, subset latin, self-hosted
  fonts/Inter-LICENSE.txt         Lisensi SIL OFL 1.1
site.config.mjs                   URL produksi default (dipakai astro.config + QA build)
scripts/
  qa-build.mjs                    Audit HTML hasil build (SEO, heading, tautan, anchor, form)
  mock-form-endpoint.mjs          Endpoint tiruan untuk uji formulir lokal
  prepare-logo-assets.mjs         Ekstrak lambang dari aset sumber → PNG transparan + ikon
tests/unit/
  inquiry.test.ts                 Validasi & payload formulir
  navigation.test.ts              Normalisasi path & status menu aktif
src/
  data/company.ts                 Identitas, legalitas (NIB/AHU), tanggal, dan kontak (sumber tunggal)
  data/content.ts                 Navigasi, lini usaha KBLI, alur kerja, prinsip, fact sheet, kanal kontak
  lib/inquiry.ts                  Validasi formulir murni (tanpa DOM)
  lib/navigation.ts               Helper path aktif
  layouts/BaseLayout.astro        <head>, skip link, header, main, footer
  components/                     SiteHeader, SiteFooter, PageHero, SectionHeading,
                                  ProcessDiagram, ProcessSteps, ContactCTA, ContactForm
  pages/                          index, tentang-kami, layanan, kontak,
                                  kebijakan-privasi, 404, sitemap.xml.ts, robots.txt.ts
  styles/                         tokens.css, fonts.css, global.css
```

## 6. Design tokens

Seluruh nilai visual berasal dari [`src/styles/tokens.css`](src/styles/tokens.css).

| Token | Nilai | Fungsi |
|---|---|---|
| `--brand-navy` | `#102A43` | Warna utama: header, section gelap, judul |
| `--brand-navy-deep` | `#0B1F33` | Pemisahan tonal footer |
| `--brand-blue` | `#1D4ED8` | Link, focus ring, aksen sekunder |
| `--brand-red` | `#C62828` | CTA utama dan penekanan terbatas |
| `--brand-red-hover` | `#A61B1B` | Hover CTA merah |
| `--neutral-white` | `#FFFFFF` | Latar utama |
| `--neutral-canvas` | `#F5F7FA` | Latar section alternatif |
| `--neutral-ink` | `#17212B` | Teks utama |
| `--neutral-muted` | `#5B6773` | Teks sekunder |
| `--neutral-line` | `#D9E0E7` | Border dan divider |

- Tipografi: satu keluarga (Inter Variable, `100–900`), skala `--text-xs` … `--text-display`
  dengan `clamp()`, lebar baca `--measure: 62ch`.
- Layout: `--container-max: 1200px`, gutter `clamp(1.25rem, 4vw, 3rem)`, spacing kelipatan 4px.
- Radius `2px`/`3px`, satu bayangan tipis, transisi `150–200ms` dengan `prefers-reduced-motion` dimatikan.
- Ikon hanya dari `@lucide/astro` (ArrowRight, Menu, X).

## 7. Alur kerja konten

1. **Data perusahaan** hanya diubah di `src/data/company.ts`. Nilai yang belum diverifikasi wajib
   `null`; UI sudah menangani `null` dengan status jujur.
2. **Konten struktural** (navigasi, lini usaha KBLI, alur kerja, prinsip, fact sheet, kanal kontak) ada di
   `src/data/content.ts`.
3. **Teks halaman** berada di masing-masing file `src/pages/*.astro`.
4. Setelah data baru disetujui, isi nilai di `company.ts`/`content.ts`, perbarui status baris terkait di
   `CONTENT_REQUIREMENTS.md`, lalu jalankan `npm run verify`.
5. `npm run qa:build` akan gagal jika muncul teks placeholder (`lorem`, `ipsum`, `TODO`, `XXXX`).

## 8. Deployment

Build statis: unggah isi `dist/` ke hosting apa pun (Netlify, Vercel, Cloudflare Pages, GitHub Pages,
Nginx, Apache).

1. **Vercel (kondisi saat ini).** Repositori terhubung ke Vercel; setiap push ke `main` memicu build
   otomatis dengan `npm run build` dan output `dist`. Proyek: <https://pt-sni.vercel.app>. Canonical dan
   sitemap sudah memakai URL tersebut lewat default di `site.config.mjs` — tidak perlu variabel
   lingkungan tambahan.
2. Set `SITE_URL` pada lingkungan build hanya bila memakai domain kustom atau server lain (menimpa
   default).
3. Set `PUBLIC_CONTACT_FORM_ENDPOINT` jika formulir kontak diaktifkan.
4. Build command: `npm run build` — output directory: `dist`.
5. **Halaman 404**: `404.html` sudah dihasilkan di root `dist/`. Hosting statis umumnya memakainya
   otomatis; pada Nginx tambahkan `error_page 404 /404.html;`.
6. Routing tanpa ekstensi (mis. `/tentang-kami`) mengandalkan `directory index`
   (`/tentang-kami/index.html`). Fitur ini standar pada Netlify, Vercel, Cloudflare Pages, dan GitHub
   Pages. Jika memakai server kustom, pastikan `index.html` direktori dilayani.
7. Font di `/fonts/` sebaiknya dikirim dengan cache panjang (`Cache-Control: public, max-age=31536000,
   immutable`) karena nama berkas stabil.

### 8.1 Server internal (192.168.89.72)

Situs berjalan sebagai systemd **user** service `pt-sni` di `/home/holis/pt-sni` (Node statis tanpa
dependensi, `deploy/serve.mjs`, port `8080`) — pola yang sama dengan aplikasi lain di server tersebut.

```bash
# build dengan URL server, lalu kirim dist/ + deploy/
SITE_URL=http://192.168.89.72:8080 npm run build
tar -czf - dist deploy | ssh holis@192.168.89.72 'tar -xzf - -C /home/holis/pt-sni'

# pasang/segarkan unit lalu restart
ssh holis@192.168.89.72 'install -m 0644 /home/holis/pt-sni/deploy/pt-sni.user.service \
  ~/.config/systemd/user/pt-sni.service && systemctl --user daemon-reload \
  && systemctl --user enable --now pt-sni.service && systemctl --user restart pt-sni.service'
```

URL: <http://192.168.89.72:8080/>. Log: `journalctl --user -u pt-sni -f`.
Untuk menaruhnya di portal Apache (`/var/www/portal`) perlu langkah root (ProxyPass + kartu di
landing page), karena `holis` bukan sudoer.

## 9. Pengujian

```powershell
npm run check      # 0 error, 0 warning, 0 hint (30 berkas)
npm test           # 22 test lulus
npm run build      # 5 halaman publik + 404 + robots.txt + sitemap.xml
npm run qa:build   # 348 pemeriksaan, 0 peringatan, 0 error
npm run verify     # semuanya sekaligus
```

Cakupan:

- **Unit test** — `validateInquiry` (wajib isi, panjang maksimum, format email/telepon, consent),
  `buildInquiryPayload` (trim, honeypot, topik), `normalizePath`/`isActivePath`.
- **QA build** (`scripts/qa-build.mjs`) — `lang="id"`, viewport, judul & meta description unik dan
  panjangnya wajar, kelengkapan Open Graph, aturan `noindex` untuk 404, konsistensi canonical dengan
  `SITE_URL`, keberadaan `main`/`header`/`footer` dan target skip link, tepat satu `<h1>` per halaman
  serta tidak ada lompatan heading, setiap `aria-labelledby`/`aria-describedby`/`aria-controls`
  menunjuk id yang ada, semua tautan internal dan anchor `#` valid, semua aset ada (termasuk berkas
  `src` gambar lokal), berkas ikon yang dirujuk `<head>` benar-benar ada di `dist/`, `<img>` ber-`alt`,
  setiap kontrol formulir berlabel, tidak ada teks placeholder, tidak ada skrip analitik, serta
  keberadaan `robots.txt`, `sitemap.xml`, `favicon-32.png`, `apple-touch-icon.png`,
  `logo/sentra-mark.png`, `404.html`, dan berkas font.

Hasil build & QA terakhir (build default, tanpa variabel lingkungan): **348 pemeriksaan lolos, 0 error,
0 peringatan**. Angka ini sama ketika `SITE_URL` ditimpa ke domain lain karena QA membaca URL yang sama
dengan build. Dengan `PUBLIC_CONTACT_FORM_ENDPOINT` diset, pemeriksaan bertambah (formulir aktif) dan tetap
0 error.

Pemeriksaan manual yang sudah dilakukan pada hasil build di browser: tidak ada error console, tidak ada
overflow horizontal pada 320/360/390/768/1280/1440px (header dengan logo diukur langsung: `scrollWidth`
sama dengan lebar viewport, jarak wordmark–tombol menu minimal 24px, teks tidak terpotong), blok kontak
footer (email, telepon, alamat) diukur pada 320/360/390px: `scrollWidth` sama dengan `innerWidth` dan
tidak ada elemen yang melewati tepi kanan viewport, menu mobile dapat dibuka/ditutup dengan keyboard
(Escape mengembalikan fokus ke tombol), 404 mengembalikan status HTTP 404, dan alur formulir (validasi
kosong, fokus ke field bermasalah, status "Mengirim...", sukses, reset) berjalan terhadap endpoint tiruan.

## 10. Aset dan lisensi

| Aset | Sumber | Lisensi |
|---|---|---|
| Logo perusahaan (`brand/source/*`) | Diberikan perusahaan; **dipakai apa adanya** (tidak digambar ulang, tidak diubah warna) | Milik perusahaan |
| `public/logo/sentra-mark.png` | Ekstraksi lambang dari aset sumber — hanya latar yang dibuang, lihat `npm run logo:assets` | Milik perusahaan |
| `public/favicon-32.png`, `public/apple-touch-icon.png` | Dirender dari lambang yang sama, warna asli dipertahankan | Milik perusahaan |
| Inter Variable (`public/fonts/inter-latin-var.woff2`) | `@fontsource-variable/inter` 5.3.0 (subset latin), disalin ke `public/` | SIL Open Font License 1.1 — [`public/fonts/Inter-LICENSE.txt`](public/fonts/Inter-LICENSE.txt) |
| Ikon UI | [`@lucide/astro`](https://lucide.dev) 1.64.0 | ISC |
| Fotografi | **Tidak ada** — belum ada foto resmi perusahaan | — |
| Diagram alur kerja | SVG + CSS, dibuat untuk proyek ini | Milik proyek |

## 11. Asumsi dan keputusan teknis

- **Astro 7 + CSS murni, tanpa Tailwind/UI kit.** Situs lima halaman statis tidak membutuhkan runtime
  framework; CSS token membuat sistem visual tetap konsisten tanpa dependensi tambahan.
- **Tanpa vitest.** Node 25 tidak memenuhi syarat engine vitest 5 (`^22.12 || ^24 || >=26`), sehingga
  dipakai test runner bawaan Node dengan type stripping. Menghindari penambahan dev-dependency besar.
- **Formulir kontak bersifat opt-in.** Formulir hanya dirender bila endpoint tersedia, agar tidak ada
  formulir yang tampak berfungsi tetapi membuang pesan pengunjung.
- **"Cara Kerja" bukan halaman terpisah** melainkan anchor `/layanan#cara-kerja`; item menu tetap ada
  sesuai spesifikasi dan anchor divalidasi oleh QA build.
- **Structured data dari dokumen resmi.** `Organization` memuat `name`, `legalName`, `description`,
  `foundingDate`, `email`, `telephone`, `PostalAddress` (jalan, kota, provinsi, kode pos), `identifier`
  berupa NIB, dan `url` bila `SITE_URL` tersedia. Semuanya berasal dari `src/data/company.ts`; NPWP dan
  NIK sengaja tidak dirender.
- **Visual tanpa fotografi.** Bidang hero (navy bergaris) dan diagram alur kerja dibangun dari CSS
  dan SVG inline. Tidak ada foto stok yang menampilkan fasilitas atau produk yang belum tentu milik
  perusahaan.
- **Logo resmi dipakai tanpa modifikasi.** Empat berkas dari perusahaan adalah render raster dengan
  latar menempel (dua di antaranya pola kotak-kotak yang *bukan* transparansi asli; tidak ada SVG).
  `scripts/prepare-logo-assets.mjs` hanya membuang latar dan memotong bidang kosong — bentuk dan warna
  logo tidak disentuh. Header memakai lambang + nama perusahaan sebagai teks karena berkas yang
  tersedia hanya komposisi vertikal bertumpuk yang tidak terbaca pada tinggi header 68px; footer
  tetap wordmark teks karena belum ada versi putih/monokrom resmi untuk latar navy.
- **Ikon tab memakai lambang asli di tile putih.** Tile putih dipilih setelah uji keterbacaan pada
  16/32/48px di latar terang dan gelap; versi tile navy ditolak karena menuntut penerangan warna logo.
- **Diagram alur kerja hanya di beranda.** Beranda memakai `ProcessDiagram` (rel + penanda langkah)
sebagai ringkasan visual; rincian tiap langkah tetap berupa teks di `/layanan`, sehingga tidak ada
informasi yang hanya tersedia sebagai gambar.
- **Kebijakan Privasi tetap dibuat** meskipun formulir belum aktif, karena spesifikasi mencantumkannya
  sebagai halaman wajib dan isinya menyatakan secara eksplisit bahwa belum ada pelacakan/akun pengguna.

## 12. Batasan dan pekerjaan tersisa

- Domain produksi saat ini `https://pt-sni.vercel.app` (default di `site.config.mjs`). Bila memakai domain
  kustom, set `SITE_URL` di lingkungan build Vercel agar canonical dan sitemap ikut berubah.
- Logo tersedia hanya sebagai raster (tanpa SVG) dan belum ada versi putih/monokrom resmi; header
  memakai lambang apa adanya, sedangkan footer menunggu berkas yang disetujui untuk latar gelap.
- Tagline pada berkas logo ("IT TRADING & SERVICES") belum dipakai di situs karena belum ada
  keputusan apakah bidang usaha dijelaskan sebagai perdagangan perangkat TI + layanan (lihat
  `CONTENT_REQUIREMENTS.md` butir 3).
- Formulir kontak belum aktif → menunggu endpoint dan persetujuan kebijakan pengelolaan data.
- Data yang masih `NEEDS_CONFIRMATION`: jam operasional, kategori barang/produk yang dijual, layanan
  operasional rinci, sejarah, visi-misi, wilayah layanan, dan profil manajemen (lihat
  `CONTENT_REQUIREMENTS.md`). Sampai data itu disetujui, situs sengaja menampilkan status kosong.
- Label nomor kontak masih "Telepon" karena status WhatsApp belum dikonfirmasi, dan email yang dipakai
  adalah alamat Gmail pada NIB — bukan email domain perusahaan.
- Copywriting (hero, alur kerja, prinsip, halaman kontak) adalah **draf** yang diturunkan dari
  spesifikasi dan perlu persetujuan perusahaan sebelum publikasi.
- Tidak ada analitik, cookie, atau pelacakan — sesuai spesifikasi; belum ada kebutuhan yang
  memerlukan itu.
