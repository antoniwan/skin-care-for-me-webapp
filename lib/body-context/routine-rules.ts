import type { CyclePhase, Product, ProductCategory } from "@/lib/types";
import type { ProductExclusionReason } from "@/lib/types/exclusions";
import type { BodyContextCore } from "./snapshot";
import {
  getPrimarySkinCondition,
  needsBarrierFirstHolds,
  shouldExcludeForBarrierFirstSkin,
} from "./skin-wellness";

const RETINOID_PATTERN = /retinol|retinal|tretinoin|adapalene|retinyl/i;
const STRONG_ACID_PATTERN = /salicylic acid|\bbha\b|\baha\b|lactic acid|glycolic/i;

const PHASE_SENSITIVE: Record<CyclePhase, ProductCategory[]> = {
  menstrual: ["exfoliant", "treatment"],
  follicular: [],
  ovulation: [],
  luteal: ["exfoliant"],
  none: [],
};

function hasActivePattern(product: Product, pattern: RegExp): boolean {
  const sources = [...product.activeIngredients, ...product.ingredients];
  return sources.some((item) => pattern.test(item));
}

function isDailyHarshActive(product: Product): boolean {
  return (
    product.frequency === "daily" &&
    (PHASE_SENSITIVE.menstrual.includes(product.category) ||
      hasActivePattern(product, STRONG_ACID_PATTERN) ||
      hasActivePattern(product, RETINOID_PATTERN))
  );
}

function shouldLimitForMenstrualPhase(
  product: Product,
  cyclePhase: CyclePhase,
): boolean {
  if (cyclePhase === "none") return false;

  const sensitive = PHASE_SENSITIVE[cyclePhase];
  if (!sensitive.includes(product.category)) return false;

  const hasHarshActive =
    hasActivePattern(product, RETINOID_PATTERN) ||
    hasActivePattern(product, STRONG_ACID_PATTERN);

  if (!hasHarshActive) return false;

  return cyclePhase === "menstrual" || cyclePhase === "luteal";
}

function shouldExcludeForPregnancy(product: Product): boolean {
  if (hasActivePattern(product, RETINOID_PATTERN)) return true;

  if (
    product.frequency === "daily" &&
    hasActivePattern(product, STRONG_ACID_PATTERN) &&
    (product.category === "exfoliant" ||
      product.category === "treatment" ||
      product.category === "toner")
  ) {
    return true;
  }

  return false;
}

function shouldExcludeForPostpartum(
  product: Product,
  postpartumWeeks: number | null,
): boolean {
  if (postpartumWeeks === null || postpartumWeeks >= 12) return false;

  if (hasActivePattern(product, RETINOID_PATTERN)) return true;
  if (isDailyHarshActive(product)) return true;

  return false;
}

function needsPregnancyStyleCaution(snapshot: BodyContextCore): boolean {
  return (
    snapshot.lifeStage.pregnant || snapshot.lifeStage.breastfeeding
  );
}

export function shouldIncludeProductInRoutine(
  product: Product,
  snapshot: BodyContextCore,
): boolean {
  if (!snapshot.enabled) return true;

  if (needsPregnancyStyleCaution(snapshot)) {
    if (shouldExcludeForPregnancy(product)) return false;
  }

  if (snapshot.lifeStage.postpartum) {
    if (shouldExcludeForPostpartum(product, snapshot.postpartumWeeks)) {
      return false;
    }
  }

  if (snapshot.cyclePhase !== "none") {
    if (shouldLimitForMenstrualPhase(product, snapshot.cyclePhase)) {
      return product.frequency !== "daily";
    }
  }

  if (needsBarrierFirstHolds(snapshot.skinConditions)) {
    if (shouldExcludeForBarrierFirstSkin(product)) return false;
  }

  return true;
}

export function getProductExclusionReason(
  product: Product,
  snapshot: BodyContextCore,
): ProductExclusionReason | null {
  if (shouldIncludeProductInRoutine(product, snapshot)) return null;

  if (needsPregnancyStyleCaution(snapshot) && shouldExcludeForPregnancy(product)) {
    return { kind: "pregnancy" };
  }

  if (
    snapshot.lifeStage.postpartum &&
    shouldExcludeForPostpartum(product, snapshot.postpartumWeeks)
  ) {
    return { kind: "postpartum" };
  }

  if (
    snapshot.cyclePhase !== "none" &&
    shouldLimitForMenstrualPhase(product, snapshot.cyclePhase) &&
    product.frequency === "daily"
  ) {
    return { kind: "menstrual", phase: snapshot.cyclePhase };
  }

  if (
    needsBarrierFirstHolds(snapshot.skinConditions) &&
    shouldExcludeForBarrierFirstSkin(product)
  ) {
    const condition = getPrimarySkinCondition(snapshot.skinConditions);
    if (condition) {
      return { kind: "skin-condition", condition };
    }
  }

  return { kind: "body-default" };
}

export function getBodyContextProductExclusions(
  products: Product[],
  snapshot: BodyContextCore,
): { product: Product; reason: ProductExclusionReason }[] {
  if (!snapshot.enabled) return [];

  return products.flatMap((product) => {
    const reason = getProductExclusionReason(product, snapshot);
    return reason ? [{ product, reason }] : [];
  });
}
