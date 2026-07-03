import type { SkinConditionFlags, WellnessFlags } from "@/lib/types/body-context";
import type { TranslateFn } from "@/lib/i18n/translate";
import type { Product } from "@/lib/types";

export const SKIN_CONDITION_KEYS = [
  "psoriasis",
  "eczema",
  "rosacea",
  "acneProne",
] as const satisfies readonly (keyof SkinConditionFlags)[];

export const WELLNESS_KEYS = [
  "anxiety",
  "depression",
] as const satisfies readonly (keyof WellnessFlags)[];

export type SkinConditionKey = (typeof SKIN_CONDITION_KEYS)[number];
export type WellnessKey = (typeof WELLNESS_KEYS)[number];

export const DEFAULT_SKIN_CONDITION_FLAGS: SkinConditionFlags = {
  psoriasis: false,
  eczema: false,
  rosacea: false,
  acneProne: false,
};

export const DEFAULT_WELLNESS_FLAGS: WellnessFlags = {
  anxiety: false,
  depression: false,
};

const RETINOID_PATTERN = /retinol|retinal|tretinoin|adapalene|retinyl/i;
const STRONG_ACID_PATTERN = /salicylic acid|\bbha\b|\baha\b|lactic acid|glycolic/i;

function hasActivePattern(product: Product, pattern: RegExp): boolean {
  const sources = [...product.activeIngredients, ...product.ingredients];
  return sources.some((item) => pattern.test(item));
}

export function hasActiveSkinCondition(flags: SkinConditionFlags): boolean {
  return SKIN_CONDITION_KEYS.some((key) => flags[key]);
}

export function hasActiveWellness(flags: WellnessFlags): boolean {
  return WELLNESS_KEYS.some((key) => flags[key]);
}

/** Conditions where we hold daily harsh actives from routines. */
export function needsBarrierFirstHolds(flags: SkinConditionFlags): boolean {
  return flags.psoriasis || flags.eczema || flags.rosacea;
}

export function shouldExcludeForBarrierFirstSkin(product: Product): boolean {
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

export function getPrimarySkinCondition(
  flags: SkinConditionFlags,
): SkinConditionKey | null {
  for (const key of SKIN_CONDITION_KEYS) {
    if (key === "acneProne") continue;
    if (flags[key]) return key;
  }
  return null;
}

export function collectSkinConditionGuidance(
  t: TranslateFn,
  flags: SkinConditionFlags,
): string[] {
  const notes: string[] = [];
  for (const key of SKIN_CONDITION_KEYS) {
    if (flags[key]) {
      notes.push(t(`bodyGuidance.skin.${key}`));
    }
  }
  return notes;
}

export function collectWellnessGuidance(
  t: TranslateFn,
  flags: WellnessFlags,
): string[] {
  const notes: string[] = [];
  for (const key of WELLNESS_KEYS) {
    if (flags[key]) {
      notes.push(t(`bodyGuidance.wellness.${key}`));
    }
  }
  if (flags.anxiety && flags.depression) {
    notes.push(t("bodyGuidance.wellness.anxietyDepressionCombined"));
  }
  return notes;
}
