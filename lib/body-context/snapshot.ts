import type {
  BodyContextSettings,
  CyclePhase,
  LifeStageFlags,
  MenstrualCycleSettings,
  SkinConditionFlags,
  WeightChange,
  WellnessFlags,
} from "@/lib/types";
import type { TranslateFn } from "@/lib/i18n/translate";
import { getCycleSkinNote } from "@/lib/i18n/ui";
import {
  LIFE_STAGE_TOGGLE_KEYS,
  type LifeStageToggleKey,
} from "./life-stage";
import {
  collectSkinConditionGuidance,
  collectWellnessGuidance,
  SKIN_CONDITION_KEYS,
  WELLNESS_KEYS,
} from "./skin-wellness";

export interface BodyContextSnapshot {
  enabled: boolean;
  cyclePhase: CyclePhase;
  cycleDay: number | null;
  lifeStage: LifeStageFlags;
  postpartumWeeks: number | null;
  weightChange: WeightChange | null;
  skinConditions: SkinConditionFlags;
  wellness: WellnessFlags;
  activeFactors: string[];
  guidanceNotes: string[];
}

export type BodyContextCore = Pick<
  BodyContextSnapshot,
  | "enabled"
  | "cyclePhase"
  | "cycleDay"
  | "lifeStage"
  | "postpartumWeeks"
  | "weightChange"
  | "skinConditions"
>;

export function getCurrentCyclePhase(
  settings: MenstrualCycleSettings,
  date = new Date(),
): CyclePhase {
  if (!settings.enabled || !settings.lastPeriodStart) {
    return "none";
  }

  const start = new Date(settings.lastPeriodStart);
  const dayMs = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor(
    (date.getTime() - start.getTime()) / dayMs,
  );
  const dayInCycle =
    ((daysSinceStart % settings.cycleLength) + settings.cycleLength) %
    settings.cycleLength;

  if (dayInCycle < settings.periodLength) return "menstrual";
  if (dayInCycle < Math.floor(settings.cycleLength * 0.46)) return "follicular";
  if (dayInCycle < Math.floor(settings.cycleLength * 0.57)) return "ovulation";
  return "luteal";
}

export function getCycleDay(
  settings: MenstrualCycleSettings,
  date = new Date(),
): number | null {
  if (!settings.enabled || !settings.lastPeriodStart) return null;
  const start = new Date(settings.lastPeriodStart);
  const dayMs = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor(
    (date.getTime() - start.getTime()) / dayMs,
  );
  return (daysSinceStart % settings.cycleLength) + 1;
}

function lifeStageFactorLabel(
  t: TranslateFn,
  key: LifeStageToggleKey,
  postpartumWeeks: number | null,
): string {
  const stage = t(`enums.lifeStage.${key}`);
  if (key === "postpartum" && postpartumWeeks !== null) {
    return t("bodyBanner.factorLifeStageWeek", {
      stage,
      week: postpartumWeeks,
    });
  }
  return t("bodyBanner.factorLifeStage", { stage });
}

/** Accumulative, progressive guidance — each active flag adds its layer. */
export function collectLifeStageGuidance(
  t: TranslateFn,
  flags: LifeStageFlags,
  postpartumWeeks: number | null,
): string[] {
  const notes: string[] = [];

  if (flags.pregnant) {
    notes.push(t("bodyGuidance.pregnant1"), t("bodyGuidance.pregnant2"));
  }

  if (flags.postpartum) {
    if (postpartumWeeks === null) {
      notes.push(t("bodyGuidance.postpartumNeedWeeks"));
    } else if (postpartumWeeks < 12) {
      notes.push(
        t("bodyGuidance.postpartumEarly1", { week: postpartumWeeks }),
        t("bodyGuidance.postpartumEarly2"),
      );
    } else {
      notes.push(t("bodyGuidance.postpartumLate", { week: postpartumWeeks }));
    }
  }

  if (flags.breastfeeding) {
    notes.push(t("bodyGuidance.breastfeeding"));
  }

  if (flags.postpartum && flags.breastfeeding) {
    notes.push(t("bodyGuidance.postpartumBreastfeedingCombined"));
  }

  if (flags.perimenopause) {
    notes.push(t("bodyGuidance.perimenopause"));
  }

  if (flags.menopause) {
    notes.push(t("bodyGuidance.menopause"));
  }

  return notes;
}

function weightGuidance(
  t: TranslateFn,
  weightChange: WeightChange | null,
): string[] {
  if (!weightChange || weightChange === "prefer_not_to_say") return [];
  if (weightChange === "stable") return [];
  if (weightChange === "gaining") return [t("bodyGuidance.weightGaining")];
  return [t("bodyGuidance.weightLosing")];
}

export function getBodyContextSnapshot(
  settings: BodyContextSettings,
  t: TranslateFn,
  date = new Date(),
): BodyContextSnapshot {
  if (!settings.enabled) {
    return {
      enabled: false,
      cyclePhase: "none",
      cycleDay: null,
      lifeStage: settings.lifeStage,
      postpartumWeeks: null,
      weightChange: null,
      skinConditions: settings.skinConditions,
      wellness: settings.wellness,
      activeFactors: [],
      guidanceNotes: [],
    };
  }

  const cyclePhase = settings.menstrual.enabled
    ? getCurrentCyclePhase(settings.menstrual, date)
    : "none";
  const cycleDay = settings.menstrual.enabled
    ? getCycleDay(settings.menstrual, date)
    : null;

  const lifeStage = settings.lifeStage;
  const postpartumWeeks = lifeStage.postpartum
    ? settings.postpartumWeeks
    : null;
  const weightChange = settings.weight.enabled
    ? settings.weight.recentChange
    : null;

  const activeFactors: string[] = [];
  if (cyclePhase !== "none") {
    activeFactors.push(
      t("bodyBanner.factorMenstrual", {
        phase: t(`enums.cyclePhase.${cyclePhase}`),
      }),
    );
  }

  for (const key of LIFE_STAGE_TOGGLE_KEYS) {
    if (lifeStage[key]) {
      activeFactors.push(lifeStageFactorLabel(t, key, postpartumWeeks));
    }
  }

  if (weightChange && weightChange !== "prefer_not_to_say") {
    activeFactors.push(
      t("bodyBanner.factorWeight", {
        change: t(`enums.weightChange.${weightChange}`),
      }),
    );
  }

  for (const key of SKIN_CONDITION_KEYS) {
    if (settings.skinConditions[key]) {
      activeFactors.push(
        t("bodyBanner.factorSkinCondition", {
          condition: t(`enums.skinCondition.${key}`),
        }),
      );
    }
  }

  for (const key of WELLNESS_KEYS) {
    if (settings.wellness[key]) {
      activeFactors.push(
        t("bodyBanner.factorWellness", {
          topic: t(`enums.wellness.${key}`),
        }),
      );
    }
  }

  const guidanceNotes = [
    ...collectLifeStageGuidance(t, lifeStage, postpartumWeeks),
    ...weightGuidance(t, weightChange),
    ...collectSkinConditionGuidance(t, settings.skinConditions),
    ...collectWellnessGuidance(t, settings.wellness),
    ...(settings.menstrual.enabled && cyclePhase !== "none"
      ? [getCycleSkinNote(t, cyclePhase)]
      : []),
  ].filter(Boolean);

  return {
    enabled: true,
    cyclePhase,
    cycleDay,
    lifeStage,
    postpartumWeeks,
    weightChange,
    skinConditions: settings.skinConditions,
    wellness: settings.wellness,
    activeFactors,
    guidanceNotes: [...new Set(guidanceNotes)],
  };
}

/** Snapshot for routine generation — no localized strings needed. */
export function getBodyContextCore(
  settings: BodyContextSettings,
  date = new Date(),
): BodyContextCore {
  if (!settings.enabled) {
    return {
      enabled: false,
      cyclePhase: "none",
      cycleDay: null,
      lifeStage: settings.lifeStage,
      postpartumWeeks: null,
      weightChange: null,
      skinConditions: settings.skinConditions,
    };
  }

  return {
    enabled: true,
    cyclePhase: settings.menstrual.enabled
      ? getCurrentCyclePhase(settings.menstrual, date)
      : "none",
    cycleDay: settings.menstrual.enabled
      ? getCycleDay(settings.menstrual, date)
      : null,
    lifeStage: settings.lifeStage,
    postpartumWeeks: settings.lifeStage.postpartum
      ? settings.postpartumWeeks
      : null,
    weightChange: settings.weight.enabled
      ? settings.weight.recentChange
      : null,
    skinConditions: settings.skinConditions,
  };
}
