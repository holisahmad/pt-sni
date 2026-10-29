# CONTENT_REQUIREMENTS — Data yang Dibutuhkan

Dokumen ini mencatat status setiap informasi perusahaan: mana yang sudah terverifikasi dari dokumen
resmi, mana yang masih menunggu, dan mana yang sengaja tidak dipublikasikan. Sumber acuan awal: bagian 13
[`WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md`](WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md).

## Cara membaca dokumen ini

| Status | Arti |
|---|---|
| `NEEDS_CONFIRMATION` | Belum ada data atau belum diverifikasi. **Tidak boleh** diisi tebakan. |
| `PARTIAL` | Sebagian sudah diterima dan dipakai, tetapi format atau data turunannya belum lengkap. |
| `APPROVED` | Sudah dikonfirmasi perusahaan dan boleh dipublikasikan. |
| `NOT_APPLICABLE` | Tidak relevan untuk perusahaan; keputusan disetujui perusahaan. |

**Pembaruan 29 Okt 2026.** Enam foto dokumen resmi diterima dan dibaca: NIB, lampiran NIB (KBLI), Surat
Keputusan Kemenkumham, Surat Pernyataan Pendirian, serta kartu NPWP. Data yang terbaca dari dokumen
tersebut dipakai apa adanya dan berstatus `APPROVED` di bawah ini. Nilai yang tidak ada pada dokumen tetap
`null` sehingga UI menampilkan status jujur (mis. "Belum dipublikasikan"), bukan teks karangan.

**Data yang sengaja tidak dipublikasikan** (keputusan, bukan kekurangan data): NIK pendiri, NPWP, nomor
rekening, nama pendiri sebagai narasi profil, dan salinan berkas dokumen. Berkas asli tetap berada di luar
repositori.

**Cara memperbarui setelah data baru disetujui:**

1. Isi nilai pada [`src/data/company.ts`](src/data/company.ts) (identitas & kontak) atau
   [`src/data/content.ts`](src/data/content.ts) (lini usaha KBLI, alur kerja, fact sheet, kanal kontak).
2. Ganti teks terkait di `src/pages/*.astro` bila datanya berupa narasi.
3. Ubah status baris di dokumen ini menjadi `APPROVED` dan cantumkan tanggal persetujuan.
4. Jalankan `npm run verify`.

---

## 1. Identitas dan legalitas

| # | Item | Status | Tampil di | Nilai / yang dibutuhkan |
|---|---|---|---|---|
| 1 | Nama resmi | `APPROVED` | Semua halaman, structured data | PT Sentra Niagatama Indonesia |
| 2 | Bentuk badan usaha | `APPROVED` | Fact sheet, Tentang Kami | Perseroan Perorangan (usaha mikro) — SK Kemenkumham |
| 3 | Nomor Induk Berusaha | `APPROVED` | Fact sheet, hero beranda, structured data | `1507260071028`, terbit 15 Juli 2026, risiko rendah, status terbit |
| 4 | Pengesahan pendirian | `APPROVED` | Fact sheet, Tentang Kami | `AHU-A104374.AH.01.30.Tahun 2026`, 14 Juli 2026 |
| 5 | Tanggal pendirian | `APPROVED` | Fact sheet, structured data (`foundingDate`) | 14 Juli 2026 (akta) / 15 Juli 2026 (NIB terbit) |
| 6 | Bidang usaha menurut KBLI 2025 | `APPROVED` | Beranda §02, `/layanan` | 47901, 53301, 47709 — lihat §2 |
| 7 | Domisili / alamat terdaftar | `APPROVED` | `/kontak`, footer, fact sheet, structured data | Mejing Wetan RT 003/RW 004, Ambarketawang, Gamping, Sleman, DIY 55294 |
| 8 | Email resmi | `APPROVED` | `/kontak`, footer, kebijakan privasi | `ptsentraniagatamaindonesia@gmail.com` (alamat Gmail; lihat §6 butir 2) |
| 9 | Nomor telepon | `PARTIAL` | `/kontak`, footer | `0822-3381-7057` (terdaftar di NIB). **Belum dikonfirmasi** apakah nomor ini juga dipakai untuk WhatsApp, sehingga label di situs adalah "Telepon" |
| 10 | Jam operasional | `APPROVED` | `/kontak` (kanal resmi + catatan hero), fact sheet, structured data | `08.00–17.00 WIB`. **Belum ada:** hari layanan (mis. Senin–Jumat atau Senin–Sabtu), sehingga situs hanya menyebut jam tanpa hari |
| 11 | Nama pendiri / pengurus | `NOT_APPLICABLE` | — | Tertera pada dokumen, tetapi tidak dipublikasikan atas keputusan pemilik data |
| 12 | NPWP dan NIK | `NOT_APPLICABLE` | — | Tidak pernah disimpan di repositori dan tidak ditampilkan |

## 2. Kegiatan usaha (KBLI 2025)

| Kode | Judul | Sumber | Catatan status |
|---|---|---|---|
| 47901 | Platform Digital Intermediasi Perdagangan Eceran | Lampiran NIB + SPP | Satu-satunya kode yang tercantum dengan status **Terbit** pada lampiran NIB |
| 53301 | Aktivitas Jasa Portal Intermediasi Pos dan Kurir | SPP | Tercatat pada dokumen pendirian |
| 47709 | Perdagangan Eceran Barang Baru Lainnya YTDL | SPP | Tercatat pada dokumen pendirian |

Kode KBLI menjelaskan **klasifikasi usaha**, bukan daftar produk yang dijual. Rincian produk tetap
`NEEDS_CONFIRMATION` (lihat §3 butir 3).

## 3. Data prioritas yang masih dibutuhkan

| # | Item | Status | Tampil di | Yang dibutuhkan |
|---|---|---|---|---|
| 1 | Logo resmi | `PARTIAL` | Header, favicon, footer | **Diterima 29 Okt 2026** (4 berkas raster). Lambang diekstrak menjadi `public/logo/sentra-mark.png` dan ikon `favicon-32.png` + `apple-touch-icon.png`; bentuk/warna tidak diubah. **Masih dibutuhkan:** berkas vektor (SVG/AI/EPS) sebagai master, versi putih/monokrom untuk latar navy, aturan ukuran minimum dan ruang kosong, serta konfirmasi simbol ini logo resmi |
| 2 | Deskripsi resmi perusahaan (1–3 paragraf) | `NEEDS_CONFIRMATION` | Beranda, Tentang Kami, `meta description` | Naskah resmi. Teks sekarang adalah draf yang diturunkan dari dokumen legalitas |
| 3 | Kategori barang / produk yang dijual | `NEEDS_CONFIRMATION` | `/layanan`, beranda §02 | KBLI 47709 bersifat "barang baru lainnya (YTDL)", sehingga daftar produk nyata masih dibutuhkan. **Catatan:** tagline pada berkas logo berbunyi "IT TRADING & SERVICES" dan belum dipakai di situs sampai cakupannya dikonfirmasi |
| 4 | Layanan operasional yang benar-benar disediakan | `NEEDS_CONFIRMATION` | `/layanan` | Apakah perusahaan menjalankan marketplace sendiri, menjadi PPMSE/PSP untuk pihak lain, atau keduanya; apakah ada layanan kurir/portal pos yang berjalan |
| 5 | Struktur modal / skala usaha | `APPROVED` | — | Modal dasar Rp100.000.000 (SPP). Tidak ditampilkan karena bukan informasi pemasaran; cukup dipakai sebagai rujukan internal |
| 6 | Domain dan hosting target | `APPROVED` | `SITE_URL`, canonical, `og:url`, `sitemap.xml`, `robots.txt` | `https://pt-sni.vercel.app` (Vercel, build otomatis dari repositori GitHub). Domain kustom belum ada; bila dipakai, timpa `SITE_URL` atau ubah default di `site.config.mjs` |
| 7 | Foto kantor, kegiatan, atau produk yang boleh dipakai | `NEEDS_CONFIRMATION` | Hero, section profil, `/layanan` | Berkas resolusi tinggi + bukti izin pakai. **Situs tidak memuat foto apa pun**; visual dibuat dengan CSS agar tidak memakai foto stok |

## 4. Data tambahan

| # | Item | Status | Catatan |
|---|---|---|---|
| 8 | Sejarah singkat perusahaan | `NEEDS_CONFIRMATION` | Baru berdiri Juli 2026; narasi sejarah belum ada |
| 9 | Visi dan misi resmi | `NEEDS_CONFIRMATION` | Belum ditampilkan |
| 10 | Wilayah layanan | `NEEDS_CONFIRMATION` | Cakupan geografis (lokal/nasional/ekspor) |
| 11 | Alur pemesanan yang disetujui | `NEEDS_CONFIRMATION` | Alur 5 langkah di situs adalah **draf usulan** (lihat §5) |
| 12 | Profil manajemen | `NEEDS_CONFIRMATION` | Nama, jabatan, foto, izin publikasi. Tidak ditampilkan |
| 13 | Akun media sosial resmi | `NEEDS_CONFIRMATION` | URL kanonik. Tanpa data ini tidak ada ikon media sosial |
| 14 | Bahasa tambahan | `NEEDS_CONFIRMATION` | Bila perlu versi Inggris, diperlukan terjemahan resmi |
| 15 | Kebijakan privasi dan pengelolaan formulir | `PARTIAL` | Isi sudah mengikuti kanal kontak yang kini aktif; perlu tinjauan sebelum formulir daring diaktifkan |

## 5. Draf copywriting yang perlu persetujuan

Teks berikut **sudah tampil** tetapi masih draf (diturunkan dari dokumen legalitas dan spesifikasi, bukan
pernyataan resmi perusahaan).

| Lokasi | Teks saat ini | Perlu keputusan |
|---|---|---|
| Beranda — H1 | "Perdagangan eceran digital dengan proses yang dapat diikuti." | Apakah posisi ini sesuai? |
| Beranda §01 & Tentang Kami §01 | Ringkasan perseroan perorangan, tanggal pendirian, domisili, cakupan usaha | Fakta sudah sesuai dokumen; perlu persetujuan gaya penyampaian |
| `/layanan` §Cara Kerja (5 langkah) | Konsultasi kebutuhan → Klarifikasi spesifikasi → Penawaran dan kesepakatan → Pelaksanaan pesanan → Konfirmasi dan tindak lanjut | Harus cocok dengan proses operasional nyata |
| Beranda §04 & Tentang Kami | 3 prinsip: komunikasi jelas, penawaran terstruktur, koordinasi terdokumentasi | Apakah perusahaan memegang prinsip ini secara eksplisit? |
| `/kebijakan-privasi` | 4 bagian (tanpa akun pengguna, data formulir, tanpa pelacakan, pembaruan) | Perlu tinjauan sebelum formulir diaktifkan |

## 6. Keputusan yang masih terbuka

1. **Hari layanan belum ditetapkan.** Jam sudah disetujui (08.00–17.00 WIB), tetapi hari buka belum disebut. Setelah diputuskan, tambahkan pada `hours` di `company.ts` (mis. "Senin–Sabtu, 08.00–17.00 WIB") dan lengkapi `dayOfWeek` pada `openingHoursSpecification` di beranda.
2. **Apakah email Gmail dipakai sebagai kanal resmi jangka panjang?** Alamat pada NIB adalah
   `ptsentraniagatamaindonesia@gmail.com`. Bila perusahaan menyiapkan email domain sendiri, ganti nilai di
   `company.ts` agar footer, `/kontak`, dan kebijakan privasi ikut berubah.
2. **Apakah nomor `0822-3381-7057` aktif untuk WhatsApp?** Jika ya, label kanal dapat diubah menjadi
   "Telepon/WhatsApp".
3. **Apakah alamat terdaftar boleh tampil publik** dalam bentuk lengkap (termasuk RT/RW), atau cukup
   "Ambarketawang, Gamping, Sleman"?
4. **Apakah formulir kontak akan diaktifkan?** Jika ya, dibutuhkan penyedia/endpoint
   (`PUBLIC_CONTACT_FORM_ENDPOINT`), penerima pesan, tujuan penggunaan data, dan masa penyimpanan. Tanpa
   itu, `/kontak` menampilkan panel "Formulir belum diaktifkan".
5. **Penyimpanan data formulir.** Perlu pernyataan resmi: di mana pesan disimpan, berapa lama, dan
   bagaimana permintaan penghapusan diproses.
6. **Apakah tagline "IT TRADING & SERVICES" dipakai di situs?** Tagline ada pada berkas logo, tetapi belum
   ada keputusan apakah situs menyebut bidang usaha sebagai perdagangan perangkat TI + layanan.
7. **Apakah ada versi putih/monokrom logo** untuk footer berlatar navy? Tanpanya, footer memakai wordmark
   teks.
8. **Apakah diperlukan versi bahasa Inggris** untuk mitra internasional?

## 7. Checklist sebelum publikasi

- [ ] Data pada §3 yang `NEEDS_CONFIRMATION` sudah diisi atau diputuskan `NOT_APPLICABLE`
- [ ] Berkas logo vektor + versi putih diterima, dan izin penggunaan logo dikonfirmasi
- [ ] Seluruh draf copywriting pada §5 disetujui atau diganti
- [ ] `SITE_URL` diset pada build produksi → canonical, `og:url`, dan sitemap terisi
- [ ] Formulir: endpoint dipasang **atau** halaman kontak dipastikan tetap menampilkan status nonaktif
- [ ] Kebijakan privasi disesuaikan dengan keputusan pada §6
- [ ] `npm run verify` lulus tanpa error
- [ ] `npm run qa:build` tanpa peringatan (peringatan sitemap hilang setelah `SITE_URL` diset)
- [ ] Pemeriksaan manual: navigasi keyboard, menu mobile, tampilan 320–1440px, dan halaman 404
- [ ] Baris yang sudah disetujui diperbarui di dokumen ini agar tidak menyesatkan
