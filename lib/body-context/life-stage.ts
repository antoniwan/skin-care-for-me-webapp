import type { BodyContextSettings } from "@/lib/types";
import type { LifeStage, LifeStageFlags } from "@/lib/types/body-context";

import {
  DEFAULT_SKIN_CONDITION_FLAGS,
  DEFAULT_WELLNESS_FLAGS,
} from "./skin-wellness";

export const DEFAULT_LIFE_STAGE_FLAGS: LifeStageFlags = {
  pregnant: false,
  postpartum: false,
  breastfeeding: false,
  perimenopause: false,
  menopause: false,
};

export const DEFAULT_BODY_CONTEXT: BodyContextSettings = {
  enabled: false,
  menstrual: {
    enabled: false,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: null,
  },
  lifeStage: { ...DEFAULT_LIFE_STAGE_FLAGS },
  postpartumWeeks: null,
  weight: {
    enabled: false,
    recentChange: "prefer_not_to_say",
  },
  skinConditions: { ...DEFAULT_SKIN_CONDITION_FLAGS },
  wellness: { ...DEFAULT_WELLNESS_FLAGS },
};

export const LIFE_STAGE_TOGGLE_KEYS = [
  "pregnant",
  "postpartum",
  "breastfeeding",
  "perimenopause",
  "menopause",
] as const satisfies readonly (keyof LifeStageFlags)[];

export type LifeStageToggleKey = (typeof LIFE_STAGE_TOGGLE_KEYS)[number];

/** Migrate legacy single-select `lifeStage` string into flags. */
export function lifeStageFlagsFromLegacy(stage: LifeStage | undefined): LifeStageFlags {
  if (!stage || stage === "none") {
    return { ...DEFAULT_LIFE_STAGE_FLAGS };
  }

  return {
    pregnant: stage === "pregnant",
    postpartum: stage === "postpartum",
    breastfeeding: stage === "breastfeeding",
    perimenopause: stage === "perimenopause",
    menopause: stage === "menopause",
  };
}

export function normalizeLifeStageFlags(raw: unknown): LifeStageFlags {
  if (raw && typeof raw === "object" && "postpartum" in raw) {
    return {
      ...DEFAULT_LIFE_STAGE_FLAGS,
      ...(raw as Partial<LifeStageFlags>),
    };
  }

  if (typeof raw === "string") {
    return lifeStageFlagsFromLegacy(raw as LifeStage);
  }

  return { ...DEFAULT_LIFE_STAGE_FLAGS };
}

export function hasActiveLifeStage(flags: LifeStageFlags): boolean {
  return LIFE_STAGE_TOGGLE_KEYS.some((key) => flags[key]);
}

/** Apply mutual-exclusion rules when toggling life-stage flags in the UI. */
export function reconcileLifeStageFlags(
  current: LifeStageFlags,
  patch: Partial<LifeStageFlags>,
): LifeStageFlags {
  const next = { ...current, ...patch };

  if (patch.pregnant) {
    next.postpartum = false;
  }
  if (patch.postpartum) {
    next.pregnant = false;
  }
  if (patch.perimenopause) {
    next.menopause = false;
  }
  if (patch.menopause) {
    next.perimenopause = false;
  }

  return next;
}
