/**
 * Logika formulir kontak — fungsi murni, tanpa akses DOM.
 * Dipakai oleh komponen ContactForm dan oleh pengujian unit.
 */

export const inquiryTopics = [
  'Permintaan penawaran',
  'Pertanyaan umum',
  'Kerja sama',
  'Lainnya',
] as const;

export type InquiryTopic = (typeof inquiryTopics)[number];

export interface InquiryInput {
  name: string;
  organization: string;
  contact: string;
  topic: string;
  message: string;
  consent: boolean;
}

export type InquiryField = 'name' | 'organization' | 'contact' | 'topic' | 'message' | 'consent';

export type InquiryErrors = Partial<Record<InquiryField, string>>;

export interface InquiryPayload {
  name: string;
  organization: string | null;
  contact: string;
  topic: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^\+?[\d\s()-]{8,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isLikelyPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!PHONE_PATTERN.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

/** Email atau nomor telepon — pengunjung boleh memilih salah satu. */
export function isValidContact(value: string): boolean {
  return isValidEmail(value) || isLikelyPhone(value);
}

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = input.name.trim();
  const contact = input.contact.trim();
  const message = input.message.trim();

  if (name.length === 0) {
    errors.name = 'Nama wajib diisi.';
  } else if (name.length < 2) {
    errors.name = 'Nama minimal 2 karakter.';
  } else if (name.length > 100) {
    errors.name = 'Nama maksimal 100 karakter.';
  }

  if (input.organization.trim().length > 120) {
    errors.organization = 'Nama perusahaan maksimal 120 karakter.';
  }

  if (contact.length === 0) {
    errors.contact = 'Isi email atau nomor telepon yang dapat dihubungi.';
  } else if (!isValidContact(contact)) {
    errors.contact = 'Format email atau nomor telepon belum sesuai.';
  }

  if (!inquiryTopics.includes(input.topic as InquiryTopic)) {
    errors.topic = 'Pilih topik permintaan.';
  }

  if (message.length === 0) {
    errors.message = 'Pesan wajib diisi.';
  } else if (message.length < 20) {
    errors.message = 'Uraikan kebutuhan Anda minimal 20 karakter.';
  } else if (message.length > 2000) {
    errors.message = 'Pesan maksimal 2000 karakter.';
  }

  if (!input.consent) {
    errors.consent = 'Persetujuan pemrosesan data diperlukan sebelum mengirim.';
  }

  return errors;
}

export function hasErrors(errors: InquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function buildInquiryPayload(input: InquiryInput): InquiryPayload {
  const organization = input.organization.trim();
  return {
    name: input.name.trim(),
    organization: organization.length > 0 ? organization : null,
    contact: input.contact.trim(),
    topic: input.topic,
    message: input.message.trim(),
  };
}
