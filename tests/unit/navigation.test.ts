import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isActivePath, normalizePath } from '../../src/lib/navigation.ts';

describe('normalizePath', () => {
  it('mempertahankan akar situs', () => {
    assert.equal(normalizePath('/'), '/');
    assert.equal(normalizePath('/#main'), '/');
  });

  it('membuang garis miring di akhir', () => {
    assert.equal(normalizePath('/tentang-kami/'), '/tentang-kami');
    assert.equal(normalizePath('/layanan//'), '/layanan');
  });

  it('membuang hash dan query', () => {
    assert.equal(normalizePath('/layanan#cara-kerja'), '/layanan');
    assert.equal(normalizePath('/kontak?ref=footer'), '/kontak');
  });

  it('menangani string kosong sebagai akar', () => {
    assert.equal(normalizePath(''), '/');
  });
});

describe('isActivePath', () => {
  it('menandai beranda hanya pada akar', () => {
    assert.equal(isActivePath('/', ['/']), true);
    assert.equal(isActivePath('/layanan', ['/']), false);
  });

  it('menangani variasi garis miring', () => {
    assert.equal(isActivePath('/tentang-kami/', ['/tentang-kami']), true);
  });

  it('tidak menandai item tanpa path aktif (anchor di halaman lain)', () => {
    assert.equal(isActivePath('/layanan', []), false);
  });
});
