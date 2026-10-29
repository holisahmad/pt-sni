/**
 * Utilitas navigasi — fungsi murni agar dapat diuji tanpa DOM.
 */

/** Membuang query/hash dan garis miring di akhir agar perbandingan konsisten. */
export function normalizePath(path: string): string {
  const withoutQuery = path.split('#')[0]?.split('?')[0] ?? '/';
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
    return withoutQuery.replace(/\/+$/, '') || '/';
  }
  return withoutQuery.length === 0 ? '/' : withoutQuery;
}

/** True bila path saat ini termasuk salah satu path yang menandai item aktif. */
export function isActivePath(currentPath: string, activeOn: readonly string[]): boolean {
  const current = normalizePath(currentPath);
  return activeOn.some((candidate) => normalizePath(candidate) === current);
}
