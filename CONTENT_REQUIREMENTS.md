# CONTENT_REQUIREMENTS — Data yang Dibutuhkan

Dokumen ini mencatat **semua informasi perusahaan yang belum tersedia atau belum terverifikasi**
sehingga sengaja tidak ditampilkan di website. Sumber acuan: bagian 13
[`WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md`](WEBSITE_COMPANY_PROFILE_PT_SENTRA_NIAGATAMA_INDONESIA.md).

## Cara membaca dokumen ini

| Status | Arti |
|---|---|
| `NEEDS_CONFIRMATION` | Belum ada data atau belum diverifikasi. **Tidak boleh** diisi tebakan. |
| `PARTIAL` | Sebagian sudah diterima dan dipakai, tetapi format atau data turunannya belum lengkap. |
| `APPROVED` | Sudah dikonfirmasi perusahaan dan boleh dipublikasikan. |
| `NOT_APPLICABLE` | Tidak relevan untuk perusahaan; keputusan disetujui perusahaan. |

Saat ini **tidak ada satu pun data** pada daftar di bawah yang berstatus `APPROVED`. Satu item berstatus
`PARTIAL` (logo: berkasnya sudah diterima, formatnya belum final). Website dibangun dengan struktur
siap-isi; bagian yang datanya kosong menampilkan status jujur (mis. "Belum dipublikasikan"), bukan teks
karangan.

**Cara memperbarui setelah data disetujui:**

1. Isi nilai pada [`src/data/company.ts`](src/data/company.ts) (identitas & kontak) atau
   [`src/data/content.ts`](src/data/content.ts) (kategori, alur kerja, fact sheet, kanal kontak).
2. Ganti teks terkait di `src/pages/*.astro` bila datanya berupa narasi.
3. Ubah status baris di dokumen ini menjadi `APPROVED` dan cantumkan tanggal persetujuan.
4. Jalankan `npm run verify`.

---

## 1. Data prioritas

| # | Item | Status | Tampil di | Yang dibutuhkan |
|---|---|---|---|---|
| 1 | Logo resmi | `PARTIAL` | Header, favicon, footer | **Diterima 29 Okt 2026** (4 berkas raster: `logo_png_no_texts.jpg`, `logo_png_texts.png`, `logo-jpg.jpg`, `logo-jpg-1.jpg`). Semuanya render dengan latar menempel — dua di antaranya pola kotak-kotak yang bukan transparansi asli. Sudah dipakai: lambang diekstrak menjadi `public/logo/sentra-mark.png` (header) dan ikon `favicon-32.png` + `apple-touch-icon.png`; bentuk/warna logo tidak diubah. **Masih dibutuhkan:** berkas vektor (SVG/AI/EPS) sebagai master, versi putih/monokrom untuk latar navy (footer), aturan ukuran minimum dan ruang kosong, serta konfirmasi bahwa simbol ini memang logo resmi yang dipakai perusahaan. |
| 2 | Deskripsi resmi perusahaan (1–3 paragraf) | `NEEDS_CONFIRMATION` | Beranda, Tentang Kami, `meta description` | Naskah resmi yang disetujui. Teks yang ada sekarang adalah draf yang diturunkan dari spesifikasi. |
| 3 | Kategori barang yang diperdagangkan | `NEEDS_CONFIRMATION` | `/layanan`, beranda bagian "Bidang Perdagangan" | Daftar kategori yang benar-benar diperdagangkan, beserta deskripsi singkat masing-masing. Saat ini situs hanya menyebut bidang usaha "Perdagangan" tanpa merinci kategori. **Catatan dari aset logo:** wordmark menyertakan tagline "IT TRADING & SERVICES", yang mengarah pada perdagangan perangkat TI + layanan. Tagline itu **belum** dipakai di situs sampai perusahaan mengonfirmasi cakupannya. |
| 4 | Layanan operasional yang benar-benar disediakan | `NEEDS_CONFIRMATION` | `/layanan` | Daftar layanan nyata (mis. pengadaan, distribusi, penanganan dokumen) — hanya yang benar-benar dijalankan. Saat ini situs hanya menjelaskan alur kerja, bukan jenis layanan. |
| 5 | Alamat kantor yang boleh dipublikasikan | `NEEDS_CONFIRMATION` | `/kontak`, footer, fact sheet, structured data | Alamat lengkap yang disetujui untuk publikasi (atau keputusan untuk tidak menampilkan alamat). |
| 6 | Email resmi dan nomor telepon/WhatsApp | `NEEDS_CONFIRMATION` | `/kontak`, footer, seluruh CTA | Alamat email domain perusahaan dan nomor yang aktif. `null` di `company.ts` membuat situs menampilkan "Belum dipublikasikan". |
| 7 | Jam operasional | `NEEDS_CONFIRMATION` | `/kontak` | Hari dan jam layanan, termasuk zona waktu (WIB/WITA/WIT). |
| 8 | Nama domain dan hosting target | `NEEDS_CONFIRMATION` | `SITE_URL`, canonical, `og:url`, `sitemap.xml`, `robots.txt` | Domain final. Tanpa domain, canonical sengaja tidak dirender dan sitemap kosong. |
| 9 | Foto produk, gudang, kantor, atau kegiatan nyata yang boleh digunakan | `NEEDS_CONFIRMATION` | Hero, section profil, `/layanan` | Berkas foto resolusi tinggi + bukti izin pakai. **Situs saat ini tidak memuat foto apa pun**; visual hero dibuat dengan CSS agar tidak memakai foto stok yang menyesatkan. |

## 2. Data tambahan

| # | Item | Status | Catatan |
|---|---|---|---|
| 10 | Tahun berdiri dan sejarah singkat | `NEEDS_CONFIRMATION` | Fact sheet menampilkan "Belum dipublikasikan" untuk tahun berdiri. |
| 11 | Visi dan misi resmi | `NEEDS_CONFIRMATION` | Belum ditampilkan. Digunakan pada Tentang Kami bila disetujui. |
| 12 | Wilayah layanan | `NEEDS_CONFIRMATION` | Cakupan geografis (kota/provinsi/nasional/ekspor). |
| 13 | Alur pemesanan yang disetujui | `NEEDS_CONFIRMATION` | Alur 5 langkah di situs adalah **draf usulan** (lihat §3). Perlu konfirmasi bahwa proses nyata memang demikian. |
| 14 | Legalitas yang boleh ditampilkan | `NEEDS_CONFIRMATION` | NIB/izin usaha/akta hanya bila perusahaan setuju dipublikasikan. Situs tidak menampilkan nomor legalitas apa pun. |
| 15 | Profil manajemen | `NEEDS_CONFIRMATION` | Nama, jabatan, foto, dan izin publikasi. Tidak ditampilkan saat ini. |
| 16 | Akun media sosial resmi | `NEEDS_CONFIRMATION` | URL kanonik akun. Tanpa data ini, tidak ada ikon media sosial di footer. |
| 17 | Bahasa tambahan | `NEEDS_CONFIRMATION` | Bila perlu versi Inggris, diperlukan terjemahan resmi. Saat ini hanya bahasa Indonesia, tanpa pemilih bahasa palsu. |
| 18 | Kebijakan privasi dan pengelolaan formulir | `NEEDS_CONFIRMATION` | Lihat §4 — isi kebijakan perlu ditinjau sebelum formulir diaktifkan. |

## 3. Draf copywriting yang perlu persetujuan

Teks berikut **sudah tampil** di website tetapi berstatus draf (diturunkan dari spesifikasi, bukan
pernyataan resmi perusahaan). Perlu persetujuan atau penggantian.

| Lokasi | Teks saat ini | Perlu keputusan |
|---|---|---|
| Beranda — H1 | "Solusi Perdagangan untuk Kebutuhan Bisnis Anda." | Apakah posisi ini sesuai? |
| Beranda — paragraf hero | Fokus pada "proses bisnis yang jelas, komunikasi profesional, kebutuhan mitra ditangani terstruktur" | Apakah klaim cara kerja ini benar? |
| Beranda §01 & Tentang Kami §01 | "Kebutuhan dipahami lebih dahulu, keputusan diambil bersama." + 3 paragraf profil | Belum ada deskripsi resmi; seluruh paragraf adalah draf |
| `/layanan` §Cara Kerja (5 langkah) | Konsultasi kebutuhan → Klarifikasi spesifikasi → Penawaran dan kesepakatan → Pelaksanaan pesanan → Konfirmasi dan tindak lanjut | Harus cocok dengan proses operasional nyata (termasuk syarat pembayaran/pengiriman bila ada) |
| Beranda §04 & Tentang Kami | 3 prinsip: komunikasi jelas, penawaran terstruktur, koordinasi terdokumentasi | Apakah perusahaan memegang prinsip ini secara eksplisit? |
| `/kontak` — catatan hero | "Data kontak resmi belum dipublikasikan…" | Hapus setelah data kontak disetujui |
| `/kebijakan-privasi` | 4 bagian (tanpa akun pengguna, data formulir, tanpa pelacakan, pembaruan) | Perlu tinjauan sebelum publikasi, terutama bila formulir diaktifkan |

## 4. Keputusan yang masih terbuka

1. **Apakah formulir kontak akan diaktifkan?**
   Jika ya, dibutuhkan: penyedia/endpoint (`PUBLIC_CONTACT_FORM_ENDPOINT`), siapa penerima pesan,
   tujuan penggunaan data, dan masa penyimpanan. Tanpa itu, halaman `/kontak` menampilkan panel
   "Formulir belum diaktifkan" dan tidak ada data pengunjung yang dikirim ke mana pun.
2. **Penyimpanan data formulir.** Perlu pernyataan resmi: di mana pesan disimpan, berapa lama, dan
   bagaimana permintaan penghapusan diproses. Paragraf di `/kebijakan-privasi` harus disesuaikan.
3. **Kebijakan privasi perlu ditinjau pihak berwenang perusahaan** sebelum domain dipublikasikan.
4. **Apakah alamat kantor boleh tampil publik** (dan apakah kunjungan hanya dengan perjanjian)?
5. **Apakah perusahaan memiliki foto resmi** yang boleh dipakai? Jika tidak, situs tetap tanpa foto.
6. **Apakah diperlukan versi bahasa Inggris** untuk mitra internasional?
7. **Apakah perlu menampilkan legalitas** (NIB dan sejenisnya) sebagai penanda kredibilitas?
8. **Apakah tagline "IT TRADING & SERVICES" dipakai di situs?** Tagline ini sudah ada di berkas logo,
   tetapi belum ada keputusan apakah situs menyebut bidang usaha sebagai perdagangan perangkat TI +
   layanan. Jika tidak dipakai, situs tetap menyebut "Perdagangan" secara umum.
9. **Apakah ada versi putih/monokrom logo** untuk footer berlatar navy? Tanpanya, footer memakai
   wordmark teks.

## 5. Checklist sebelum publikasi

- [ ] Semua data pada §1 berstatus `APPROVED` atau `NOT_APPLICABLE` (butir 1 perlu naik dari `PARTIAL`)
- [ ] Berkas logo vektor + versi putih diterima, dan izin penggunaan logo dikonfirmasi
- [ ] Seluruh draf copywriting pada §3 disetujui atau diganti
- [ ] `SITE_URL` diset pada build produksi → canonical, `og:url`, dan sitemap terisi
- [ ] Formulir: endpoint dipasang **atau** halaman kontak dipastikan tetap menampilkan status nonaktif
- [ ] Kebijakan privasi disesuaikan dengan keputusan pada §4
- [ ] `npm run verify` lulus tanpa error
- [ ] `npm run qa:build` tanpa peringatan (peringatan sitemap hilang setelah `SITE_URL` diset)
- [ ] Pemeriksaan manual: navigasi keyboard, menu mobile, tampilan 320–1440px, dan halaman 404
- [ ] Baris yang sudah disetujui diperbarui di dokumen ini agar tidak menyesatkan
