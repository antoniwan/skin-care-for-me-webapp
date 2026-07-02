import type { CyclePhase, Product, ProductCategory } from "@/lib/types";
import type { BodyContextCore } from "./snapshot";

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

export function shouldIncludeProductInRoutine(
  product: Product,
  snapshot: BodyContextCore,
): boolean {
  if (!snapshot.enabled) return true;

  if (
    snapshot.lifeStage === "pregnant" ||
    snapshot.lifeStage === "breastfeeding"
  ) {
    if (shouldExcludeForPregnancy(product)) return false;
  }

  if (snapshot.lifeStage === "postpartum") {
    if (shouldExcludeForPostpartum(product, snapshot.postpartumWeeks)) {
      return false;
    }
  }

  if (snapshot.cyclePhase !== "none") {
    if (shouldLimitForMenstrualPhase(product, snapshot.cyclePhase)) {
      return product.frequency !== "daily";
    }
  }

  return true;
}

export function getProductExclusionReason(
  product: Product,
  snapshot: BodyContextCore,
): string | null {
  if (shouldIncludeProductInRoutine(product, snapshot)) return null;

  if (
    (snapshot.lifeStage === "pregnant" ||
      snapshot.lifeStage === "breastfeeding") &&
    shouldExcludeForPregnancy(product)
  ) {
    return "Held during pregnancy or breastfeeding — check with your clinician.";
  }

  if (
    snapshot.lifeStage === "postpartum" &&
    shouldExcludeForPostpartum(product, snapshot.postpartumWeeks)
  ) {
    return "Held during early postpartum recovery — reintroduce when ready.";
  }

  if (
    snapshot.cyclePhase !== "none" &&
    shouldLimitForMenstrualPhase(product, snapshot.cyclePhase) &&
    product.frequency === "daily"
  ) {
    return `Held on ${snapshot.cyclePhase} phase days — save harsh actives for less sensitive times.`;
  }

  return "Held based on your body settings.";
}

export function getBodyContextProductExclusions(
  products: Product[],
  snapshot: BodyContextCore,
): { product: Product; reason: string }[] {
  if (!snapshot.enabled) return [];

  return products.flatMap((product) => {
    const reason = getProductExclusionReason(product, snapshot);
    return reason ? [{ product, reason }] : [];
  });
}
