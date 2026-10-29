# WEBSITE COMPANY PROFILE — PT SENTRA NIAGATAMA INDONESIA

> **Dokumen arahan utama untuk AI coding agent**
>
> Bangun website company profile yang profesional, berkelas, kredibel, dan benar-benar siap dipresentasikan kepada calon klien maupun mitra bisnis. Hindari desain generik hasil AI (*AI slop*). Utamakan kejelasan informasi, komposisi visual yang kuat, detail yang konsisten, dan implementasi yang rapi.

---

## 1. PERAN DAN TUJUAN

Bertindak sebagai gabungan:
- Senior Product Designer / UI-UX Designer
- Brand & Visual Designer
- Senior Frontend Engineer
- Content Designer berbahasa Indonesia
- QA Engineer

Tugas utama: merancang dan membangun website company profile untuk **PT SENTRA NIAGATAMA INDONESIA**, perusahaan yang bergerak di bidang **perdagangan**.

Website harus menyampaikan kesan:
- Terpercaya dan profesional
- Modern, elegan, bersih, dan matang
- Tegas, terstruktur, serta berorientasi bisnis
- Memiliki identitas visual yang khas, bukan template startup generik
- Nyaman digunakan pada desktop, tablet, dan ponsel

**Bahasa utama:** Indonesia. Struktur harus memungkinkan penambahan versi Inggris di masa depan, tetapi jangan membuat tombol pengalih bahasa palsu.

## 2. ATURAN KERAS: ANTI-AI SLOP

Jangan menghasilkan desain atau konten yang tampak seperti template AI generik.

### Hindari
- Gradient merah-biru yang berlebihan atau glow dekoratif.
- Glassmorphism tanpa fungsi.
- Bentuk blob abstrak, orb bercahaya, dan dekorasi acak.
- Hero dengan headline bombastis tetapi tidak menjelaskan bisnis.
- Klaim seperti “terdepan”, “nomor satu”, “revolusioner”, “terpercaya sejak ...”, atau “mitra terbaik” jika tidak ada bukti.
- Statistik palsu seperti jumlah klien, tahun pengalaman, nilai transaksi, jumlah cabang, dan tingkat kepuasan.
- Logo rekaan yang seolah-olah logo resmi perusahaan.
- Foto stok rapat kantor generik, jabat tangan, atau orang memakai helm tanpa hubungan dengan bisnis.
- Ikon emoji, ikon dengan gaya campur-aduk, animasi berlebihan, carousel otomatis, dan efek scroll yang mengganggu.
- Terlalu banyak kartu dengan sudut membulat besar.
- Teks placeholder seperti Lorem ipsum pada hasil akhir.
- Tombol yang tidak bekerja, tautan `#` tanpa tujuan, dan elemen UI dekoratif yang menyerupai kontrol.
- Mengarang alamat, nomor telepon, email, NIB, NPWP, tahun berdiri, direktur, cakupan wilayah, sertifikasi, kategori barang, atau klien.

### Wajib
- Setiap bagian halaman harus memiliki tujuan komunikasi yang jelas.
- Gunakan hierarki tipografi, grid, ruang kosong, alignment, dan kontras yang disiplin.
- Gunakan komponen secukupnya; jangan memecah semua teks menjadi kartu.
- Buat copywriting ringkas, spesifik, dan tidak berlebihan.
- Jika informasi perusahaan belum tersedia, tandai sebagai **[PERLU DATA PERUSAHAAN]** di dokumentasi internal. Jangan tampilkan placeholder itu pada website publik.
- Jika data penting belum tersedia, buat struktur yang siap diisi dan catat pertanyaannya di `CONTENT_REQUIREMENTS.md`.
- Jangan mengklaim website selesai secara profesional sebelum semua tautan, formulir, responsivitas, aksesibilitas, dan build diperiksa.

## 3. ARAH BRAND DAN VISUAL

### Karakter visual
**Corporate Trade / Modern Editorial / Refined Minimalism**

Bayangkan profil perusahaan perdagangan yang serius dan terorganisasi: komposisi editorial yang rapi, fotografi relevan, garis pemisah tipis, bidang warna yang terukur, dan tipografi yang kuat.

### Palet warna

Gunakan merah, putih, dan biru dengan dominasi putih serta biru tua. Merah berfungsi sebagai aksen tindakan dan penekanan, bukan warna latar utama di semua bagian.

| Token | Warna | Fungsi |
|---|---|---|
| `brand.navy` | `#102A43` | Warna utama, header/footer, judul kuat |
| `brand.blue` | `#1D4ED8` | Link, elemen interaktif, aksen sekunder |
| `brand.red` | `#C62828` | CTA utama, penekanan terbatas |
| `brand.red-hover` | `#A61B1B` | Hover CTA merah |
| `neutral.white` | `#FFFFFF` | Latar utama |
| `neutral.canvas` | `#F5F7FA` | Latar section alternatif |
| `neutral.ink` | `#17212B` | Teks utama |
| `neutral.muted` | `#5B6773` | Teks sekunder |
| `neutral.line` | `#D9E0E7` | Border dan divider |

Jaga kontras warna teks sesuai WCAG AA. Jangan menggunakan biru terang dan merah secara bersamaan pada setiap komponen. Hindari teks merah di atas biru tua.

### Tipografi
- Gunakan satu keluarga sans-serif yang profesional, misalnya **Inter**, **Manrope**, atau font sistem yang tersedia.
- Maksimal dua keluarga font dan gunakan secara konsisten.
- H1 besar, tegas, dengan panjang baris terkontrol; isi teks mudah dibaca.
- Hindari terlalu banyak ukuran font dan huruf kapital penuh pada paragraf.
- Gunakan line-height yang nyaman dan lebar konten yang terkendali.

### Layout
- Desktop memakai grid yang konsisten, misalnya 12 kolom.
- Kontainer utama sekitar `max-width: 1200–1280px`, dengan padding responsif.
- Gunakan whitespace yang cukup, tetapi jangan membiarkan halaman terasa kosong tanpa alasan.
- Sudut elemen relatif kecil dan konsisten; tidak semua elemen perlu card.
- Shadow tipis hanya jika meningkatkan pemisahan visual.
- Ikon harus berasal dari satu pustaka yang konsisten, misalnya Lucide.

### Logo
- Jika logo resmi tersedia, gunakan aset tersebut tanpa mengubah proporsi atau warna resmi.
- Jika belum tersedia, tampilkan wordmark teks **PT SENTRA NIAGATAMA INDONESIA** secara tipografis dan sederhana.
- Jangan menciptakan simbol yang diklaim sebagai logo resmi. Jika ingin mengusulkan konsep logo, pisahkan sebagai eksplorasi dan minta persetujuan.

## 4. STRUKTUR SITEMAP

Bangun satu website company profile yang terstruktur. Gunakan halaman terpisah bila masuk akal; jangan memaksakan semua konten ke satu landing page yang sangat panjang.

### Halaman wajib

1. **Beranda** (`/`)
2. **Tentang Kami** (`/tentang-kami`)
3. **Layanan / Bidang Perdagangan** (`/layanan`)
4. **Hubungi Kami** (`/kontak`)
5. **Kebijakan Privasi** (`/kebijakan-privasi`) — hanya jika website mengumpulkan atau memproses data pengunjung; bila tidak, evaluasi kebutuhan dan jangan membuat klaim hukum yang tidak diperiksa.

Jika ruang lingkup proyek mengharuskan MVP satu halaman, buat section dengan anchor yang benar-benar berfungsi dan dokumentasikan keputusan itu.

### Navigasi utama
- Beranda
- Tentang Kami
- Bidang Perdagangan
- Cara Kerja
- Hubungi Kami

CTA navigasi: **Diskusikan Kebutuhan Bisnis** atau **Hubungi Kami**.

Jangan menambahkan menu “Karier”, “Berita”, “Investor”, “Sertifikasi”, atau “Portofolio” tanpa konten dan kebutuhan nyata.

## 5. RANCANGAN KONTEN DAN UX

### 5.1 Header
- Header putih, bersih, dengan wordmark/logo di kiri.
- Navigasi desktop jelas dan tidak terlalu padat.
- CTA merah dengan label yang spesifik.
- Header mobile memakai menu tombol yang dapat diakses keyboard dan screen reader.
- Sticky header hanya jika tidak mengganggu area baca.
- Pastikan state hover, focus, active, dan mobile menu tersedia.

### 5.2 Hero beranda
Tujuan: pengunjung segera memahami identitas perusahaan, bidang usaha, dan langkah berikutnya.

Susunan yang disarankan:
- Eyebrow: `PT SENTRA NIAGATAMA INDONESIA`
- Headline contoh yang aman: **“Solusi Perdagangan untuk Kebutuhan Bisnis Anda.”**
- Deskripsi contoh: “PT Sentra Niagatama Indonesia bergerak di bidang perdagangan dan berfokus pada proses bisnis yang jelas, komunikasi yang profesional, serta kebutuhan mitra yang ditangani secara terstruktur.”
- CTA primer: **Hubungi Kami**
- CTA sekunder: **Kenali Perusahaan**
- Visual utama: fotografi perdagangan/logistik/distribusi yang relevan dan berlisensi, atau komposisi editorial berbasis bentuk geometris sederhana. Pilih visual berdasarkan kategori perdagangan aktual setelah dikonfirmasi.

Catatan: deskripsi di atas adalah draf positioning, bukan pernyataan fakta terverifikasi. Validasi dengan perusahaan sebelum publikasi. Jangan menyiratkan perusahaan memiliki gudang, armada, jaringan distribusi, atau layanan impor-ekspor jika belum dikonfirmasi.

### 5.3 Ringkasan perusahaan
Tampilkan pengantar singkat dan tautan menuju halaman Tentang Kami. Hindari blok “angka pencapaian” jika data belum tersedia.

### 5.4 Bidang perdagangan / layanan
- Tampilkan hanya kategori barang dan layanan yang benar-benar disediakan perusahaan.
- Jika kategorinya belum diketahui, jangan mengisi dengan kategori rekaan.
- Siapkan modul konten fleksibel untuk 2–6 kategori setelah data dikonfirmasi.
- Tiap kategori berisi nama, deskripsi ringkas, gambar relevan bila tersedia, dan CTA yang sesuai.
- Jangan menampilkan kategori kosong atau kartu dummy di situs publik.

### 5.5 Cara kerja
Bila sesuai dengan proses operasional perusahaan, gambarkan alur sederhana:
1. Konsultasi kebutuhan
2. Klarifikasi spesifikasi dan ketersediaan
3. Penawaran dan kesepakatan
4. Pemenuhan pesanan
5. Konfirmasi dan tindak lanjut

Ini adalah alur usulan, bukan klaim proses perusahaan. Konfirmasi sebelum dipublikasikan. Jangan menjanjikan waktu, harga, stok, atau SLA yang belum disepakati.

### 5.6 Mengapa bermitra dengan kami
Jangan membuat daftar keunggulan generik. Gunakan prinsip kerja yang dapat dibuktikan, misalnya:
- Komunikasi kebutuhan secara jelas
- Informasi penawaran yang terstruktur
- Koordinasi proses yang terdokumentasi

Publikasikan hanya setelah perusahaan menyetujui bahwa prinsip tersebut benar-benar dijalankan. Jangan memakai angka atau superlatif tanpa bukti.

### 5.7 CTA akhir
Section kontras dengan latar navy atau putih dan aksen merah terbatas.
Contoh judul: **“Mari Bahas Kebutuhan Perdagangan Anda.”**
Sediakan tombol ke kontak atau WhatsApp hanya jika nomor resmi telah diberikan dan tautannya sudah diuji.

### 5.8 Footer
- Wordmark/nama resmi perusahaan
- Ringkasan satu kalimat yang telah disetujui
- Navigasi utama
- Alamat dan kontak resmi jika tersedia
- Informasi legal yang sudah diverifikasi
- Copyright dengan tahun berjalan secara dinamis
- Tautan kebijakan privasi bila relevan

Jangan membuat alamat fiktif atau menampilkan ikon media sosial yang tidak memiliki akun resmi aktif.

## 6. HALAMAN TENTANG KAMI

Urutan konten:
1. Judul dan ringkasan identitas
2. Profil perusahaan
3. Visi dan misi — hanya berdasarkan rumusan yang disetujui manajemen
4. Nilai kerja — gunakan nilai yang nyata dan bisa diterapkan
5. Legalitas atau informasi perusahaan — hanya data yang disetujui untuk publikasi

Jika visi, misi, sejarah, atau legalitas belum tersedia, jangan mengarang. Buat struktur data dan tandai sebagai kebutuhan konten internal.

## 7. HALAMAN LAYANAN

- Jelaskan bidang perdagangan berdasarkan data aktual.
- Pisahkan kategori produk dari layanan operasional agar tidak membingungkan.
- Berikan CTA inquiry pada tiap kategori bila relevan.
- Jangan menjanjikan pengadaan, ekspor-impor, distribusi nasional, pergudangan, konsultasi, atau layanan lain sebelum dikonfirmasi.
- Buat halaman tetap terlihat matang walau kategori awal sedikit; kualitas informasi lebih penting daripada jumlah kartu.

## 8. HALAMAN KONTAK DAN FORMULIR

Sediakan:
- Email resmi perusahaan
- Nomor telepon / WhatsApp resmi
- Alamat kantor, bila disetujui untuk publikasi
- Jam operasional, bila telah dikonfirmasi
- Formulir: nama, perusahaan (opsional), email/telepon, topik, pesan, persetujuan pemrosesan data bila diperlukan

### Persyaratan formulir
- Validasi di sisi klien dan server jika ada backend.
- Label setiap input; jangan hanya mengandalkan placeholder.
- Error message spesifik, dapat dibaca screen reader, dan tidak menghapus input yang valid.
- Loading, success, dan error states yang jelas.
- Proteksi spam yang proporsional.
- Jangan berpura-pura mengirim pesan jika belum ada backend atau integrasi yang berfungsi.
- Jika belum ada backend, gunakan tautan email yang benar-benar terisi (mailto) sebagai alternatif sementara, atau tampilkan instruksi kontak yang jujur.
- Jangan mengumpulkan data yang tidak diperlukan.
- Tentukan masa simpan dan akses data jika formulir menyimpan data di server.

## 9. INTERAKSI DAN MOTION

Gunakan motion secara hemat dan bermakna:
- Transisi hover/focus sekitar 150–250 ms.
- Animasi masuk section boleh ringan, tetapi konten harus tetap terlihat bila JavaScript atau animasi tidak berjalan.
- Hormati `prefers-reduced-motion`.
- Jangan menggunakan parallax berat, cursor custom, animasi angka palsu, auto-slider, atau animasi yang menunda akses ke konten.
- Semua interaksi harus dapat digunakan dengan keyboard dan touch.

## 10. RESPONSIVITAS DAN AKSESIBILITAS

Target: mobile-first dan berfungsi baik pada lebar 320px hingga layar desktop besar.

Checklist:
- Tidak ada horizontal overflow.
- Navigasi mobile berfungsi.
- Ukuran target sentuh memadai.
- Kontras teks memadai sesuai WCAG AA.
- Struktur heading semantik, satu H1 utama per halaman.
- Alt text menjelaskan gambar informatif; gambar dekoratif memakai alt kosong.
- Focus state terlihat.
- Form punya label dan pesan error yang terhubung.
- Keyboard dapat mengakses seluruh kontrol.
- Tidak bergantung pada warna saja untuk menyampaikan status.
- `prefers-reduced-motion` dihormati.
- Gunakan HTML semantik dan landmark yang tepat.

## 11. SEO DAN KUALITAS TEKNIS

Implementasikan:
- Title dan meta description unik untuk setiap halaman.
- Open Graph metadata dasar.
- Canonical URL hanya bila domain produksi sudah diketahui.
- Sitemap XML dan `robots.txt` sesuai stack dan kebutuhan deployment.
- Heading dan tautan internal yang deskriptif.
- Gambar teroptimasi, ukuran eksplisit, dan lazy loading untuk gambar di bawah fold.
- Favicon dari aset yang disetujui.
- Structured data `Organization` hanya dengan fakta yang benar-benar tersedia.
- Jangan menambahkan rating, review, alamat, telepon, atau social profile palsu.
- Pastikan 404 page jelas jika menggunakan routing multi-halaman.
- Hindari ketergantungan library yang tidak dibutuhkan.
- Perhatikan Core Web Vitals, khususnya LCP, CLS, dan INP.
- Jangan menambahkan analytics atau tracking sebelum kebutuhan, persetujuan, dan konfigurasi privasi jelas.

## 12. STACK DAN IMPLEMENTASI

Sebelum coding:
1. Periksa repository dan file yang sudah ada.
2. Identifikasi framework, package manager, struktur komponen, routing, testing, dan deployment.
3. Pertahankan teknologi yang sudah bekerja; jangan migrasi stack hanya demi preferensi pribadi.
4. Buat rencana singkat, lalu implementasikan secara bertahap.
5. Jangan menimpa pekerjaan yang ada tanpa memeriksanya.

Jika repository kosong, pilih stack yang sederhana, modern, dan mudah dipelihara. Prioritaskan:
- TypeScript bila menggunakan React
- Komponen reusable dengan batas yang masuk akal
- CSS variables/design tokens
- Routing yang sesuai kebutuhan; tidak wajib memakai framework besar untuk situs statis
- Semantic HTML
- Optimasi gambar dan font
- Tooling minimal yang stabil

Jangan memasang banyak library sebelum ada kebutuhan nyata. Jangan menambah backend/database hanya untuk company profile statis. Jika diperlukan formulir aktif, pilih solusi berdasarkan hosting dan kebutuhan perusahaan.

### Struktur komponen yang disarankan
- `SiteHeader`
- `MobileNavigation`
- `SiteFooter`
- `PrimaryButton` / `TextLink`
- `PageHero`
- `SectionHeading`
- `TradeCategorySection`
- `ProcessSteps`
- `ContactCTA`
- `ContactForm` (hanya bila benar-benar berfungsi)

Nama dan struktur aktual boleh menyesuaikan framework yang ditemukan. Hindari membuat komponen abstrak yang hanya dipakai sekali tanpa manfaat.

## 13. DATA DAN KONTEN YANG HARUS DIMINTA

Buat `CONTENT_REQUIREMENTS.md` yang berisi checklist data berikut. Jangan menunggu semua data untuk membangun kerangka UI, tetapi jangan mempublikasikan klaim yang belum diverifikasi.

### Data prioritas
- [ ] Logo resmi (SVG/PNG) atau persetujuan menggunakan wordmark teks
- [ ] Deskripsi resmi perusahaan dalam 1–3 paragraf
- [ ] Kategori barang yang diperdagangkan
- [ ] Layanan operasional yang benar-benar disediakan
- [ ] Alamat kantor yang boleh dipublikasikan
- [ ] Email resmi dan nomor telepon/WhatsApp
- [ ] Jam operasional
- [ ] Nama domain dan hosting target
- [ ] Foto produk, gudang, kantor, atau kegiatan nyata yang boleh digunakan

### Data tambahan
- [ ] Tahun berdiri dan sejarah singkat
- [ ] Visi dan misi resmi
- [ ] Wilayah layanan
- [ ] Alur pemesanan yang disetujui
- [ ] Legalitas yang boleh ditampilkan
- [ ] Profil manajemen jika ingin dipublikasikan
- [ ] Akun media sosial resmi
- [ ] Bahasa tambahan
- [ ] Kebijakan privasi dan pengelolaan formulir

Setiap data yang belum tersedia harus diberi status `NEEDS_CONFIRMATION`, bukan diisi dengan tebakan.

## 14. DELIVERABLE YANG DIHARAPKAN

Hasil kerja agent harus mencakup:
1. Website yang berjalan dan responsif.
2. Semua halaman dan navigasi yang ditentukan atau keputusan MVP yang terdokumentasi.
3. Design tokens untuk warna, tipografi, spacing, border, dan layout.
4. Komponen yang terorganisasi dan tidak berlebihan.
5. Copywriting Indonesia yang konsisten dan telah ditandai untuk verifikasi jika masih berupa draf.
6. `CONTENT_REQUIREMENTS.md`.
7. `README.md` berisi prasyarat, instalasi, perintah development, build, test, dan deployment.
8. Pengujian atau checklist QA yang relevan.
9. Catatan asumsi dan keputusan teknis.
10. Daftar aset gambar/font beserta sumber dan lisensinya.

Jangan mengklaim semua deliverable selesai bila belum benar-benar dibuat.

## 15. ACCEPTANCE CRITERIA

Pekerjaan dinyatakan siap ditinjau bila:
- [ ] Identitas perusahaan dan bidang perdagangan langsung dipahami di hero.
- [ ] Visual konsisten menggunakan merah, putih, dan biru dengan dominasi putih/navy.
- [ ] Layout memiliki hierarki jelas, whitespace terukur, dan tidak tampak seperti template AI generik.
- [ ] Tidak ada klaim, angka, kontak, legalitas, kategori perdagangan, atau sejarah rekaan.
- [ ] Tidak ada teks Lorem ipsum atau placeholder internal yang bocor ke publik.
- [ ] Semua tautan, CTA, menu, dan formulir memiliki perilaku nyata yang sudah diuji.
- [ ] Tampilan lolos pemeriksaan pada mobile, tablet, dan desktop.
- [ ] Keyboard navigation, focus states, heading, alt text, dan kontras diperiksa.
- [ ] Build produksi berhasil.
- [ ] Tidak ada error penting di console/browser.
- [ ] Metadata SEO dasar dan halaman 404 tersedia bila diperlukan.
- [ ] README dan `CONTENT_REQUIREMENTS.md` diperbarui.
- [ ] Agent memberikan ringkasan perubahan, hasil test, asumsi, dan pekerjaan yang masih menunggu data.

## 16. URUTAN EKSEKUSI AGENT

Kerjakan berurutan, jangan mencoba membangun semua hal sekaligus.

### Fase 1 — Audit dan rencana
- Inspeksi repository dan environment.
- Laporkan stack, struktur, dan kondisi saat ini.
- Identifikasi informasi yang belum tersedia.
- Susun rencana implementasi singkat.
- Jangan menghapus atau mengganti konfigurasi tanpa alasan.

### Fase 2 — Fondasi visual
- Tetapkan design tokens.
- Buat header, footer, tombol, tipografi, grid, dan breakpoint.
- Pastikan mobile navigation dan focus states berfungsi.

### Fase 3 — Halaman utama
- Implementasikan hero, profil singkat, bidang perdagangan (hanya data terverifikasi), cara kerja bila disetujui, dan CTA.
- Gunakan visual yang relevan serta berlisensi.
- Periksa hierarki visual sebelum menambah dekorasi.

### Fase 4 — Halaman lain
- Bangun Tentang Kami, Layanan, dan Kontak.
- Buat halaman kebijakan privasi jika memang relevan.
- Jangan memaksakan konten yang belum ada.

### Fase 5 — Polishing dan QA
- Audit responsivitas, aksesibilitas, SEO, performa, tautan, formulir, dan konsistensi.
- Jalankan lint, type-check, test, dan production build sesuai tooling repository.
- Perbaiki error yang ditemukan, bukan hanya melaporkannya.

### Fase 6 — Handover
- Perbarui README dan `CONTENT_REQUIREMENTS.md`.
- Berikan ringkasan implementasi.
- Cantumkan perintah untuk menjalankan proyek.
- Cantumkan test yang dijalankan beserta hasil aktual.
- Pisahkan fakta terverifikasi, asumsi, dan data yang menunggu konfirmasi.

## 17. FORMAT LAPORAN AKHIR AGENT

Gunakan format ringkas berikut:

1. **Status:** selesai / sebagian / terhambat
2. **Yang dibangun:** halaman dan fitur utama
3. **Keputusan desain:** palet, tipografi, layout, dan alasan
4. **Validasi:** lint, type-check, test, build, responsive/accessibility checks
5. **Data yang dibutuhkan:** daftar pertanyaan paling penting
6. **Cara menjalankan:** perintah yang benar-benar berlaku
7. **Risiko atau pekerjaan tersisa:** hanya hal nyata yang belum selesai

Jangan memberi klaim keberhasilan yang tidak didukung hasil pemeriksaan.

---

## INSTRUKSI TERAKHIR UNTUK AGENT

Mulai dengan membaca repository dan memahami kondisi aktual. Bangun website yang rapi dan khas untuk **PT SENTRA NIAGATAMA INDONESIA**, bukan sekadar landing page penuh efek. Utamakan kredibilitas, struktur bisnis yang jelas, copywriting yang jujur, pengalaman pengguna yang matang, serta kode yang mudah dirawat.

**Jangan mengarang fakta perusahaan. Jangan menambah fitur tanpa kebutuhan. Jangan menyebut pekerjaan selesai sebelum memverifikasi hasilnya.**
