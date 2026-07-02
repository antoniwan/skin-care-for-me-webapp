import type {
  BodyContextSettings,
  CyclePhase,
  LifeStage,
  MenstrualCycleSettings,
  WeightChange,
} from "@/lib/types";
import type { TranslateFn } from "@/lib/i18n/translate";
import { getCycleSkinNote } from "@/lib/i18n/ui";

export interface BodyContextSnapshot {
  enabled: boolean;
  cyclePhase: CyclePhase;
  cycleDay: number | null;
  lifeStage: LifeStage;
  postpartumWeeks: number | null;
  weightChange: WeightChange | null;
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

function lifeStageGuidance(
  t: TranslateFn,
  lifeStage: LifeStage,
  postpartumWeeks: number | null,
): string[] {
  switch (lifeStage) {
    case "pregnant":
      return [t("bodyGuidance.pregnant1"), t("bodyGuidance.pregnant2")];
    case "breastfeeding":
      return [t("bodyGuidance.breastfeeding")];
    case "postpartum":
      if (postpartumWeeks === null) {
        return [t("bodyGuidance.postpartumNeedWeeks")];
      }
      if (postpartumWeeks < 12) {
        return [
          t("bodyGuidance.postpartumEarly1", { week: postpartumWeeks }),
          t("bodyGuidance.postpartumEarly2"),
        ];
      }
      return [t("bodyGuidance.postpartumLate", { week: postpartumWeeks })];
    case "perimenopause":
      return [t("bodyGuidance.perimenopause")];
    case "menopause":
      return [t("bodyGuidance.menopause")];
    default:
      return [];
  }
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
      lifeStage: "none",
      postpartumWeeks: null,
      weightChange: null,
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
  const postpartumWeeks =
    lifeStage === "postpartum" ? settings.postpartumWeeks : null;
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
  if (lifeStage !== "none") {
    activeFactors.push(
      postpartumWeeks !== null
        ? t("bodyBanner.factorLifeStageWeek", {
            stage: t(`enums.lifeStage.${lifeStage}`),
            week: postpartumWeeks,
          })
        : t("bodyBanner.factorLifeStage", {
            stage: t(`enums.lifeStage.${lifeStage}`),
          }),
    );
  }
  if (weightChange && weightChange !== "prefer_not_to_say") {
    activeFactors.push(
      t("bodyBanner.factorWeight", {
        change: t(`enums.weightChange.${weightChange}`),
      }),
    );
  }

  const guidanceNotes = [
    ...lifeStageGuidance(t, lifeStage, postpartumWeeks),
    ...weightGuidance(t, weightChange),
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
      lifeStage: "none",
      postpartumWeeks: null,
      weightChange: null,
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
    postpartumWeeks:
      settings.lifeStage === "postpartum" ? settings.postpartumWeeks : null,
    weightChange: settings.weight.enabled
      ? settings.weight.recentChange
      : null,
  };
}
