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
  entityType: 'Perseroan Perorangan',
  scale: 'Usaha Mikro',
  sector: 'Perdagangan eceran digital',
  /** Ringkasan satu kalimat (disetujui untuk footer). */
  summary:
    'Perusahaan perdagangan eceran digital di Sleman, Yogyakarta, yang menjalankan platform dan layanan pendukungnya.',
  /** Tanggal pendirian menurut akta (14 Juli 2026) dan NIB terbit (15 Juli 2026). */
  founded: {
    iso: '2026-07-14',
    year: 2026,
    label: '14 Juli 2026',
  },
  contact: {
    email: 'ptsentraniagatamaindonesia@gmail.com' as string | null,
    /** Bentuk tampilan; `phoneHref` dipakai untuk tautan telepon. */
    phone: '0822-3381-7057' as string | null,
    phoneHref: '+6282233817057' as string | null,
    address:
      'Mejing Wetan, RT 003/RW 004, Ambarketawang, Gamping, Sleman, Daerah Istimewa Yogyakarta 55294' as string | null,
    addressLocality: 'Gamping, Sleman' as string | null,
    addressRegion: 'Daerah Istimewa Yogyakarta' as string | null,
    postalCode: '55294' as string | null,
    /** Jam layanan; hari layanan belum ditetapkan (lihat CONTENT_REQUIREMENTS.md). */
    hours: '08.00–17.00 WIB' as string | null,
    /** Bentuk 24 jam untuk structured data. */
    hoursSpec: { opens: '08:00', closes: '17:00' } as { opens: string; closes: string } | null,
  },
  /** Identitas legal yang boleh dipublikasikan (NIB dan pengesahan pendirian). */
  legal: {
    nib: '1507260071028',
    nibIssued: '15 Juli 2026',
    nibRisk: 'Risiko rendah',
    deed: 'AHU-A104374.AH.01.30.Tahun 2026',
    deedLabel: 'Surat Pernyataan Pendirian',
    deedDate: '14 Juli 2026',
  },
} as const;

/** Nama merek untuk <title>. */
export const siteName = `${company.legalName}`;

/** Bulan/tahun build, dipakai sebagai penanda pembaruan dokumen kebijakan. */
export const buildMonthLabel = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  year: 'numeric',
}).format(new Date());
