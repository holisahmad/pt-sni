/**
 * Identitas dan data kontak perusahaan — sumber tunggal.
 *
 * ATURAN: nilai perusahaan di bawah ini HANYA boleh berisi data yang sudah
 * diverifikasi. Gunakan `null` untuk data yang belum tersedia; UI akan
 * menampilkan status jujur, bukan placeholder palsu.
 * Daftar pertanyaan lengkap ada di CONTENT_REQUIREMENTS.md.
 */

const rawFormEndpoint = (import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT ?? '').trim();

/** Endpoint formulir (mis. Formspree/Web3Forms). Kosong = formulir belum aktif. */
export const contactFormEndpoint: string | null = rawFormEndpoint.length > 0 ? rawFormEndpoint : null;

export const company = {
  legalName: 'PT Sentra Niagatama Indonesia',
  shortName: 'Sentra Niagatama',
  wordmark: {
    name: 'Sentra Niagatama',
    country: 'Indonesia',
    prefix: 'PT',
  },
  entityType: 'Perseroan Terbatas',
  sector: 'Perdagangan',
  /** Ringkasan satu kalimat (disetujui untuk footer). */
  summary:
    'Perusahaan dagang yang berfokus pada proses bisnis yang jelas dan komunikasi yang profesional.',
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
} as const;

/** Nama merek untuk <title>. */
export const siteName = `${company.legalName}`;

/** Bulan/tahun build, dipakai sebagai penanda pembaruan dokumen kebijakan. */
export const buildMonthLabel = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  year: 'numeric',
}).format(new Date());
