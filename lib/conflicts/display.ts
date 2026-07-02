import type { ConflictWarning } from "@/lib/types";

export function warningKey(warning: ConflictWarning): string {
  return [
    warning.productA.id,
    warning.productB.id,
    warning.conflict.ingredientA,
    warning.conflict.ingredientB,
  ]
    .sort()
    .join("|");
}

export function groupWarningsByProduct(
  warnings: ConflictWarning[],
): Map<string, ConflictWarning[]> {
  const map = new Map<string, ConflictWarning[]>();

  for (const warning of warnings) {
    for (const productId of [warning.productA.id, warning.productB.id]) {
      const existing = map.get(productId) ?? [];
      if (!existing.some((w) => warningKey(w) === warningKey(warning))) {
        existing.push(warning);
      }
      map.set(productId, existing);
    }
  }

  return map;
}

export function getOtherProductName(
  warning: ConflictWarning,
  productId: string,
): string {
  return warning.productA.id === productId
    ? warning.productB.name
    : warning.productA.name;
}

export const SEVERITY_ORDER = { avoid: 0, caution: 1, separate: 2 } as const;

export function sortWarningsBySeverity(
  warnings: ConflictWarning[],
): ConflictWarning[] {
  return [...warnings].sort(
    (a, b) =>
      SEVERITY_ORDER[a.conflict.severity] -
      SEVERITY_ORDER[b.conflict.severity],
  );
}

export function highestSeverity(
  warnings: ConflictWarning[],
): ConflictWarning["conflict"]["severity"] | null {
  if (warnings.length === 0) return null;
  return sortWarningsBySeverity(warnings)[0].conflict.severity;
}
