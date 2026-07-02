import type { ConflictWarning, Product, Routine, RoutineFrequency } from "../types";
import { categoryRank } from "./category-order";
import { getRoutineWarnings } from "./generator";

export type RoutineCheckId =
  | "application-order"
  | "ingredient-safety"
  | "shelf-alignment";

export interface RoutineCheck {
  id: RoutineCheckId;
  label: string;
  passed: boolean;
  detail: string;
}

export interface RoutineVerification {
  checks: RoutineCheck[];
  allPassed: boolean;
  reviewNotes: string[];
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
    label: "Layering order",
    passed: orderOk,
    detail: orderOk
      ? "Products are ordered cleanse → treat → hydrate → protect."
      : "The step order may not match how these products should be layered.",
  };
}

function checkIngredientSafety(warnings: ConflictWarning[]): RoutineCheck {
  const avoid = warnings.filter((w) => w.conflict.severity === "avoid");
  const caution = warnings.filter(
    (w) => w.conflict.severity === "caution" || w.conflict.severity === "separate",
  );

  if (avoid.length > 0) {
    return {
      id: "ingredient-safety",
      label: "Ingredient pairings",
      passed: false,
      detail: `${avoid.length} pairing${avoid.length === 1 ? "" : "s"} in this routine should not be used together.`,
    };
  }

  if (caution.length > 0) {
    return {
      id: "ingredient-safety",
      label: "Ingredient pairings",
      passed: true,
      detail: `No serious conflicts; ${caution.length} note${caution.length === 1 ? "" : "s"} worth reading below.`,
    };
  }

  return {
    id: "ingredient-safety",
    label: "Ingredient pairings",
    passed: true,
    detail: "Nothing in this routine conflicts on ingredients.",
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
    label: "Schedule match",
    passed: mismatches.length === 0,
    detail:
      mismatches.length === 0
        ? "Every product belongs in this routine's frequency and time of day."
        : `${mismatches.length} product${mismatches.length === 1 ? " doesn't" : "s don't"} quite match this routine's schedule.`,
  };
}

function collectReviewNotes(routine: Routine, warnings: ConflictWarning[]): string[] {
  const notes: string[] = [];
  const categories = routine.steps.map((s) => s.category);

  const duplicateCategories = [
    ...new Set(
      categories.filter((cat, i) => categories.indexOf(cat) !== i),
    ),
  ];
  if (duplicateCategories.length > 0) {
    notes.push(
      `Multiple ${duplicateCategories.join(", ").replaceAll("_", " ")} steps — confirm layering order with your skin goals.`,
    );
  }

  const caution = warnings.filter(
    (w) =>
      w.conflict.severity === "caution" || w.conflict.severity === "separate",
  );
  for (const warning of caution) {
    notes.push(warning.conflict.guidance);
  }

  if (routine.cyclePhase) {
    notes.push(
      `Adjusted for your current menstrual phase — harsher actives may be limited on sensitive days.`,
    );
  }

  return [...new Set(notes)];
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
  reason: string;
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
      reason: warning.conflict.reason,
      pairedWith: kept.name,
    });
  }

  return [...excluded.values()];
}

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

export function formatRoutineTitle(
  frequency: RoutineFrequency,
  timeOfDay: Routine["timeOfDay"],
): string {
  const timeLabel = timeOfDay === "morning" ? "Morning" : "Evening";
  if (frequency === "daily") return `${timeLabel} routine`;
  return `${timeLabel} · ${frequency}`;
}
