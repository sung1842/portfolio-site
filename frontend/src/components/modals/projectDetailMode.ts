/**
 * Projects whose detail body was built before the JD-FIT frame.
 * Their modals stay as implemented. Every other id uses BaseProjectDetail.
 */
const LEGACY_DETAIL_IDS = new Set([0, 1, 2, 3, 4]);

export function usesLegacyProjectDetail(id: number): boolean {
  return LEGACY_DETAIL_IDS.has(id);
}
