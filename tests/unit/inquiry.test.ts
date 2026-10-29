import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildInquiryPayload,
  hasErrors,
  isLikelyPhone,
  isValidContact,
  isValidEmail,
  validateInquiry,
  type InquiryInput,
} from '../../src/lib/inquiry.ts';

const validInput: InquiryInput = {
  name: 'Rina',
  organization: 'PT Contoh Mitra',
  contact: 'rina@contoh.co.id',
  topic: 'Permintaan penawaran',
  message: 'Kami membutuhkan informasi mengenai ketersediaan barang untuk pengiriman kuartal depan.',
  consent: true,
};

describe('validateInquiry', () => {
  it('menerima isian lengkap yang valid', () => {
    const errors = validateInquiry(validInput);
    assert.equal(hasErrors(errors), false);
    assert.deepEqual(errors, {});
  });

  it('menandai nama kosong', () => {
    const errors = validateInquiry({ ...validInput, name: '   ' });
    assert.equal(errors.name, 'Nama wajib diisi.');
  });

  it('menandai nama terlalu pendek', () => {
    const errors = validateInquiry({ ...validInput, name: 'A' });
    assert.equal(errors.name, 'Nama minimal 2 karakter.');
  });

  it('menandai kontak yang tidak sesuai format', () => {
    const errors = validateInquiry({ ...validInput, contact: 'bukan-kontak' });
    assert.equal(errors.contact, 'Format email atau nomor telepon belum sesuai.');
  });

  it('menerima nomor telepon Indonesia dengan spasi dan tanda hubung', () => {
    const errors = validateInquiry({ ...validInput, contact: '+62 812-3456-7890' });
    assert.equal(errors.contact, undefined);
  });

  it('menandai topik di luar daftar', () => {
    const errors = validateInquiry({ ...validInput, topic: 'Topik karangan' });
    assert.equal(errors.topic, 'Pilih topik permintaan.');
  });

  it('menandai pesan yang terlalu pendek tanpa menghapus isian lain', () => {
    const errors = validateInquiry({ ...validInput, message: 'Halo' });
    assert.equal(errors.message, 'Uraikan kebutuhan Anda minimal 20 karakter.');
    assert.equal(errors.name, undefined);
    assert.equal(errors.contact, undefined);
  });

  it('menandai pesan yang melebihi batas', () => {
    const errors = validateInquiry({ ...validInput, message: 'a'.repeat(2001) });
    assert.equal(errors.message, 'Pesan maksimal 2000 karakter.');
  });

  it('mewajibkan persetujuan pemrosesan data', () => {
    const errors = validateInquiry({ ...validInput, consent: false });
    assert.equal(errors.consent, 'Persetujuan pemrosesan data diperlukan sebelum mengirim.');
  });

  it('menandai nama perusahaan yang terlalu panjang', () => {
    const errors = validateInquiry({ ...validInput, organization: 'a'.repeat(121) });
    assert.equal(errors.organization, 'Nama perusahaan maksimal 120 karakter.');
  });
});

describe('pemeriksaan kontak', () => {
  it('memvalidasi email', () => {
    assert.equal(isValidEmail('nama@perusahaan.co.id'), true);
    assert.equal(isValidEmail('nama@perusahaan'), false);
    assert.equal(isValidEmail(' nama@perusahaan.id '), true);
  });

  it('membatasi panjang nomor telepon', () => {
    assert.equal(isLikelyPhone('1234567'), false);
    assert.equal(isLikelyPhone('81234567'), true);
    assert.equal(isLikelyPhone('1234567890123456'), false);
  });

  it('menerima email maupun telepon', () => {
    assert.equal(isValidContact('081234567890'), true);
    assert.equal(isValidContact('mitra@contoh.id'), true);
    assert.equal(isValidContact('---'), false);
  });
});

describe('buildInquiryPayload', () => {
  it('memangkas spasi dan mengosongkan perusahaan yang tidak diisi', () => {
    const payload = buildInquiryPayload({
      ...validInput,
      name: '  Rina  ',
      organization: '   ',
      message: '  Pesan kebutuhan  ',
    });

    assert.equal(payload.name, 'Rina');
    assert.equal(payload.organization, null);
    assert.equal(payload.message, 'Pesan kebutuhan');
  });

  it('mempertahankan nama perusahaan yang diisi', () => {
    const payload = buildInquiryPayload(validInput);
    assert.equal(payload.organization, 'PT Contoh Mitra');
    assert.equal(payload.topic, 'Permintaan penawaran');
  });
});
