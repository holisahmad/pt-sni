import { company } from './company';

export interface NavItem {
  label: string;
  href: string;
  /** Path yang membuat item ditandai aktif (aria-current="page"). */
  activeOn: string[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Beranda', href: '/', activeOn: ['/'] },
  { label: 'Tentang Kami', href: '/tentang-kami', activeOn: ['/tentang-kami'] },
  { label: 'Bidang Perdagangan', href: '/layanan', activeOn: ['/layanan'] },
  { label: 'Cara Kerja', href: '/layanan#cara-kerja', activeOn: [] },
  { label: 'Hubungi Kami', href: '/kontak', activeOn: ['/kontak'] },
];

/** Alur kerja usulan (lihat CONTENT_REQUIREMENTS.md — menunggu konfirmasi perusahaan). */
export const processSteps = [
  {
    title: 'Konsultasi kebutuhan',
    description:
      'Diskusi awal untuk memahami konteks kebutuhan, jenis barang, dan tenggat waktu yang diharapkan.',
  },
  {
    title: 'Klarifikasi spesifikasi',
    description:
      'Spesifikasi, jumlah, dan ketersediaan ditinjau bersama sebelum penawaran disusun.',
  },
  {
    title: 'Penawaran dan kesepakatan',
    description:
      'Penawaran disampaikan secara tertulis, lalu syarat dan ketentuan disepakati kedua pihak.',
  },
  {
    title: 'Pelaksanaan pesanan',
    description:
      'Proses berjalan sesuai kesepakatan, dengan pembaruan status pada titik yang telah ditentukan.',
  },
  {
    title: 'Konfirmasi dan tindak lanjut',
    description:
      'Hasil pekerjaan dikonfirmasi bersama, termasuk catatan untuk kebutuhan berikutnya.',
  },
];

export interface BusinessLine {
  /** Kode KBLI 2025 yang tercatat pada dokumen pendirian. */
  code: string;
  /** Judul resmi KBLI. */
  title: string;
  description: string;
}

/**
 * Kegiatan usaha menurut Surat Pernyataan Pendirian (14 Juli 2026).
 * Pada lampiran NIB hanya KBLI 47901 yang tercantum dengan status "Terbit".
 */
export const businessLines: BusinessLine[] = [
  {
    code: '47901',
    title: 'Platform Digital Intermediasi Perdagangan Eceran',
    description:
      'Penyelenggaraan platform digital perdagangan eceran, mencakup penyelenggara perdagangan melalui sistem elektronik (PPMSE) dan penyelenggara sarana perantara (PSP).',
  },
  {
    code: '53301',
    title: 'Aktivitas Jasa Portal Intermediasi Pos dan Kurir',
    description:
      'Layanan portal intermediasi untuk kegiatan pos dan kurir.',
  },
  {
    code: '47709',
    title: 'Perdagangan Eceran Barang Baru Lainnya YTDL',
    description:
      'Perdagangan eceran barang baru yang tidak tercakup pada kelompok KBLI lain (YTDL).',
  },
];

/** Prinsip kerja yang dapat dijelaskan tanpa klaim superlatif. */
export const principles = [
  {
    title: 'Komunikasi yang jelas',
    description:
      'Kebutuhan dibahas dengan bahasa yang konkret: apa yang dibutuhkan, berapa jumlahnya, dan kapan diperlukan.',
  },
  {
    title: 'Penawaran yang terstruktur',
    description:
      'Informasi penawaran disampaikan dalam bentuk yang dapat ditinjau ulang dan dibandingkan, bukan hanya angka akhir.',
  },
  {
    title: 'Koordinasi yang terdokumentasi',
    description:
      'Setiap tahap yang disepakati dicatat agar kedua pihak memiliki rujukan yang sama selama proses berjalan.',
  },
];

export interface FactRow {
  label: string;
  value: string | null;
}

/** Data perusahaan yang boleh ditampilkan. null = belum diverifikasi. */
export const factSheet: FactRow[] = [
  { label: 'Nama resmi', value: company.legalName },
  { label: 'Bentuk badan usaha', value: company.entityType },
  { label: 'Skala usaha', value: company.scale },
  { label: 'Bidang usaha', value: company.sector },
  {
    label: 'Alamat kantor',
    value: company.contact.address,
  },
  { label: 'Tahun berdiri', value: String(company.founded.year) },
  { label: 'Jam operasional', value: company.contact.hours },
  {
    label: 'Nomor Induk Berusaha',
    value: `${company.legal.nib} (terbit ${company.legal.nibIssued})`,
  },
  {
    label: 'Pengesahan pendirian',
    value: `${company.legal.deed} (${company.legal.deedDate})`,
  },
];

export interface ContactChannelRow {
  label: string;
  value: string | null;
  href: string | null;
  note?: string;
}

export const contactChannels: ContactChannelRow[] = [
  {
    label: 'Email resmi',
    value: company.contact.email,
    href: company.contact.email ? `mailto:${company.contact.email}` : null,
    note: 'Untuk permintaan penawaran dan pertanyaan tertulis.',
  },
  {
    label: 'Telepon',
    value: company.contact.phone,
    href: company.contact.phoneHref ? `tel:${company.contact.phoneHref}` : null,
    note: 'Nomor seluler yang terdaftar pada NIB.',
  },
  {
    label: 'Kantor',
    value: company.contact.address,
    href: null,
    note: 'Alamat terdaftar sesuai dokumen NIB.',
  },
  {
    label: 'Jam operasional',
    value: company.contact.hours,
    href: null,
    note: 'Waktu Indonesia Barat (UTC+7).',
  },
];
