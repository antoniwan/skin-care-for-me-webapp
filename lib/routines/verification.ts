import type { ConflictWarning, Product, ProductCategory, Routine, RoutineFrequency } from "../types";
import { categoryRank } from "./category-order";
import { getRoutineWarnings } from "./generator";

export type RoutineCheckId =
  | "application-order"
  | "ingredient-safety"
  | "shelf-alignment";

export interface RoutineCheck {
  id: RoutineCheckId;
  passed: boolean;
  counts?: {
    avoid?: number;
    caution?: number;
    mismatches?: number;
  };
}

export type ReviewNote =
  | { type: "duplicate-categories"; categories: ProductCategory[] }
  | { type: "conflict-guidance"; ruleId: string }
  | { type: "menstrual-phase" };

export interface RoutineVerification {
  checks: RoutineCheck[];
  allPassed: boolean;
  reviewNotes: ReviewNote[];
}

function matchesTime(product: Product, time: Routine["timeOfDay"]): boolean {
  return product.timeOfDay === "any" || product.timeOfDay === time;
}

function checkApplicationOrder(routine: Routine): RoutineCheck {
  const categories = routine.steps.map((step) => step.category);
  const ranks = categories.map(categoryRank);

  let orderOk = true;
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i] < ranks[i - 1]) {
      orderOk = false;
      break;
    }
  }

  const hasSunscreen = categories.includes("sunscreen");
  const hasMask = categories.includes("mask");

  if (routine.timeOfDay === "morning" && hasSunscreen) {
    const last = categories[categories.length - 1];
    if (last !== "sunscreen") orderOk = false;
  }

  if (routine.timeOfDay === "evening" && hasMask) {
    const last = categories[categories.length - 1];
    if (last !== "mask") orderOk = false;
  }

  return {
    id: "application-order",
    passed: orderOk,
  };
}

function checkIngredientSafety(warnings: ConflictWarning[]): RoutineCheck {
  const avoid = warnings.filter((w) => w.conflict.severity === "avoid");
  const caution = warnings.filter(
    (w) =>
      w.conflict.severity === "caution" || w.conflict.severity === "separate",
  );

  if (avoid.length > 0) {
    return {
      id: "ingredient-safety",
      passed: false,
      counts: { avoid: avoid.length },
    };
  }

  if (caution.length > 0) {
    return {
      id: "ingredient-safety",
      passed: true,
      counts: { caution: caution.length },
    };
  }

  return {
    id: "ingredient-safety",
    passed: true,
  };
}

function checkShelfAlignment(
  routine: Routine,
  stepProducts: Product[],
): RoutineCheck {
  const mismatches = stepProducts.filter(
    (product) =>
      product.frequency !== routine.frequency ||
      !matchesTime(product, routine.timeOfDay),
  );

  return {
    id: "shelf-alignment",
    passed: mismatches.length === 0,
    counts: mismatches.length > 0 ? { mismatches: mismatches.length } : undefined,
  };
}

function collectReviewNotes(routine: Routine, warnings: ConflictWarning[]): ReviewNote[] {
  const notes: ReviewNote[] = [];
  const categories = routine.steps.map((s) => s.category);

  const duplicateCategories = [
    ...new Set(
      categories.filter((cat, i) => categories.indexOf(cat) !== i),
    ),
  ];
  if (duplicateCategories.length > 0) {
    notes.push({ type: "duplicate-categories", categories: duplicateCategories });
  }

  const caution = warnings.filter(
    (w) =>
      w.conflict.severity === "caution" || w.conflict.severity === "separate",
  );
  for (const warning of caution) {
    notes.push({ type: "conflict-guidance", ruleId: warning.conflict.id });
  }

  if (routine.cyclePhase) {
    notes.push({ type: "menstrual-phase" });
  }

  const unique = new Map<string, ReviewNote>();
  for (const note of notes) {
    const key =
      note.type === "duplicate-categories"
        ? `dup:${note.categories.join(",")}`
        : note.type === "conflict-guidance"
          ? `conflict:${note.ruleId}`
          : "menstrual";
    unique.set(key, note);
  }

  return [...unique.values()];
}

export function verifyRoutine(
  routine: Routine,
  products: Product[],
): RoutineVerification {
  const stepProducts = routine.steps
    .map((step) => products.find((p) => p.id === step.productId))
    .filter((p): p is Product => Boolean(p));

  const warnings = getRoutineWarnings(routine, products);

  const checks: RoutineCheck[] = [
    checkApplicationOrder(routine),
    checkIngredientSafety(warnings),
    checkShelfAlignment(routine, stepProducts),
  ];

  return {
    checks,
    allPassed: checks.every((check) => check.passed),
    reviewNotes: collectReviewNotes(routine, warnings),
  };
}

export interface RoutineShelfExclusion {
  product: Product;
  reason: import("../types").ProductExclusionReason;
  pairedWith: string;
}

export function getRoutineShelfExclusions(
  products: Product[],
  warnings: ConflictWarning[],
): RoutineShelfExclusion[] {
  const avoidPairs = warnings.filter((w) => w.conflict.severity === "avoid");
  const excluded = new Map<string, RoutineShelfExclusion>();

  for (const warning of avoidPairs) {
    const keepSunscreen = warning.productA.category === "sunscreen";
    const removed = keepSunscreen ? warning.productB : warning.productA;
    const kept = keepSunscreen ? warning.productA : warning.productB;

    if (excluded.has(removed.id)) continue;

    excluded.set(removed.id, {
      product: removed,
      reason: { kind: "ingredient", ruleId: warning.conflict.id },
      pairedWith: kept.name,
    });
  }

  return [...excluded.values()];
}

/** @deprecated Use `formatRoutineSchedule` from `@/lib/i18n/ui` in UI code. */
export function formatRoutineSchedule(frequency: RoutineFrequency): string {
  switch (frequency) {
    case "daily":
      return "Every day";
    case "weekly":
      return "Sundays";
    case "monthly":
      return "1st of each month";
  }
}

/** @deprecated Use `formatRoutineTitle` from `@/lib/i18n/ui` in UI code. */
export function formatRoutineTitle(
  frequency: RoutineFrequency,
  timeOfDay: Routine["timeOfDay"],
): string {
  const timeLabel = timeOfDay === "morning" ? "Morning" : "Evening";
  if (frequency === "daily") return `${timeLabel} routine`;
  return `${timeLabel} · ${frequency}`;
}
