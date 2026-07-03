import type { BodyContextSnapshot } from "@/lib/body-context/snapshot";
import type { IngredientConflict } from "@/lib/types";
import type { ProductExclusionReason } from "@/lib/types/exclusions";
import type {
  CyclePhase,
  ProductCategory,
  RoutineFrequency,
  TimeOfDay,
} from "@/lib/types";
import {
  LIFE_STAGE_TOGGLE_KEYS,
  type LifeStageToggleKey,
} from "@/lib/body-context/life-stage";
import type {
  SkinConditionKey,
  WellnessKey,
} from "@/lib/body-context/skin-wellness";
import type {
  ReviewNote,
  RoutineCheck,
  RoutineCheckId,
  RoutineVerification,
} from "@/lib/routines/verification";
import type { RoutineScheduleSettings } from "@/lib/types/schedule";
import { DEFAULT_ROUTINE_SCHEDULE } from "@/lib/schedule/defaults";
import type { TranslateFn } from "./translate";

const CHECK_MESSAGE_KEYS: Record<RoutineCheckId, string> = {
  "application-order": "applicationOrder",
  "ingredient-safety": "ingredientSafety",
  "shelf-alignment": "shelfAlignment",
};

export function getEnumLabel(
  t: TranslateFn,
  group:
    | "frequency"
    | "timeOfDay"
    | "category"
    | "cyclePhase"
    | "lifeStage"
    | "weightChange"
    | "severity",
  value: string,
): string {
  return t(`enums.${group}.${value}`);
}

export function formatCategoryLabel(
  t: TranslateFn,
  category: ProductCategory,
): string {
  return getEnumLabel(t, "category", category);
}

export function formatFrequencyLabel(
  t: TranslateFn,
  frequency: RoutineFrequency,
): string {
  return getEnumLabel(t, "frequency", frequency);
}

export function formatTimeOfDayLabel(
  t: TranslateFn,
  timeOfDay: TimeOfDay,
): string {
  return getEnumLabel(t, "timeOfDay", timeOfDay);
}

export function formatRoutineTitle(
  t: TranslateFn,
  frequency: RoutineFrequency,
  timeOfDay: TimeOfDay,
): string {
  if (frequency === "daily") {
    return timeOfDay === "morning"
      ? t("schedule.morningRoutine")
      : t("schedule.eveningRoutine");
  }
  return t("schedule.eveningFrequency", {
    frequency: formatFrequencyLabel(t, frequency),
  });
}

export function formatRoutineSchedule(
  t: TranslateFn,
  frequency: RoutineFrequency,
  schedule: RoutineScheduleSettings = DEFAULT_ROUTINE_SCHEDULE,
): string {
  switch (frequency) {
    case "daily":
      return t("schedule.everyDay");
    case "weekly":
      return t("schedule.weeklyOnDay", {
        day: t(`enums.weekday.${schedule.weeklyAnchorDay}`),
      });
    case "monthly":
      return t("schedule.monthlyOnDay", {
        day: schedule.monthlyAnchorDay,
      });
  }
}

export function plural(
  t: TranslateFn,
  count: number,
  singularKey: string,
  pluralKey: string,
): string {
  return count === 1 ? t(singularKey) : t(pluralKey);
}

export interface LocalizedRoutineCheck {
  id: RoutineCheckId;
  passed: boolean;
  label: string;
  detail: string;
}

export interface LocalizedRoutineVerification
  extends Omit<RoutineVerification, "checks" | "reviewNotes"> {
  checks: LocalizedRoutineCheck[];
  reviewNotes: string[];
}

export function localizeConflictRule(
  t: TranslateFn,
  conflict: Pick<IngredientConflict, "id" | "reason" | "guidance">,
): { reason: string; guidance: string } {
  return {
    reason: t(`conflictRules.${conflict.id}.reason`),
    guidance: t(`conflictRules.${conflict.id}.guidance`),
  };
}

export function localizeVerification(
  t: TranslateFn,
  verification: RoutineVerification,
): LocalizedRoutineVerification {
  return {
    ...verification,
    checks: verification.checks.map((check) => localizeCheck(t, check)),
    reviewNotes: verification.reviewNotes.map((note) =>
      localizeReviewNote(t, note),
    ),
  };
}

function localizeCheck(
  t: TranslateFn,
  check: RoutineCheck,
): LocalizedRoutineCheck {
  const messageKey = CHECK_MESSAGE_KEYS[check.id];
  const base = `safetyCheck.checks.${messageKey}`;
  const label = t(`${base}.label`);

  if (check.id === "ingredient-safety" && !check.passed) {
    const count = check.counts?.avoid ?? 1;
    return {
      ...check,
      label,
      detail:
        count === 1
          ? t(`${base}.failed`, { count })
          : t(`${base}.failedPlural`, { count }),
    };
  }

  if (check.id === "ingredient-safety" && check.passed) {
    const cautionCount = check.counts?.caution ?? 0;
    if (cautionCount > 0) {
      return {
        ...check,
        label,
        detail:
          cautionCount === 1
            ? t(`${base}.passedCaution`, { count: cautionCount })
            : t(`${base}.passedCautionPlural`, { count: cautionCount }),
      };
    }
    return {
      ...check,
      label,
      detail: t(`${base}.passed`),
    };
  }

  if (check.id === "shelf-alignment" && !check.passed) {
    const count = check.counts?.mismatches ?? 1;
    return {
      ...check,
      label,
      detail:
        count === 1
          ? t(`${base}.failed`, { count })
          : t(`${base}.failedPlural`, { count }),
    };
  }

  return {
    ...check,
    label,
    detail: t(`${base}.${check.passed ? "passed" : "failed"}`),
  };
}

function localizeReviewNote(t: TranslateFn, note: ReviewNote): string {
  switch (note.type) {
    case "duplicate-categories": {
      const categories = note.categories
        .map((category) => formatCategoryLabel(t, category))
        .join(", ");
      return t("safetyCheck.reviewDuplicate", { categories });
    }
    case "conflict-guidance":
      return t(`conflictRules.${note.ruleId}.guidance`);
    case "menstrual-phase":
      return t("safetyCheck.reviewMenstrual");
  }
}

export function getLifeStageToggleHelp(
  t: TranslateFn,
  key: LifeStageToggleKey,
): string {
  return t(`lifeStageToggle.${key}.help`);
}

export function getSkinConditionToggleHelp(
  t: TranslateFn,
  key: SkinConditionKey,
): string {
  return t(`skinConditionToggle.${key}.help`);
}

export function getWellnessToggleHelp(
  t: TranslateFn,
  key: WellnessKey,
): string {
  return t(`wellnessToggle.${key}.help`);
}

export function getCycleSkinNote(t: TranslateFn, phase: CyclePhase): string {
  if (phase === "none") return "";
  const keyMap: Record<Exclude<CyclePhase, "none">, string> = {
    menstrual: "bodyGuidance.cycleMenstrual",
    follicular: "bodyGuidance.cycleFollicular",
    ovulation: "bodyGuidance.cycleOvulation",
    luteal: "bodyGuidance.cycleLuteal",
  };
  return t(keyMap[phase]);
}

export function localizeExclusionReason(
  t: TranslateFn,
  reason: ProductExclusionReason,
): string {
  switch (reason.kind) {
    case "pregnancy":
      return t("exclusionReason.pregnancy");
    case "postpartum":
      return t("exclusionReason.postpartum");
    case "menstrual":
      return t("exclusionReason.menstrual", {
        phase: t(`enums.cyclePhase.${reason.phase}`),
      });
    case "skin-condition":
      return t("exclusionReason.skinCondition", {
        condition: t(`enums.skinCondition.${reason.condition}`),
      });
    case "body-default":
      return t("exclusionReason.default");
    case "ingredient":
      return t("exclusionReason.ingredient", {
        reason: t(`conflictRules.${reason.ruleId}.reason`),
      });
  }
}

export function getSeverityLabel(
  t: TranslateFn,
  severity: "avoid" | "caution" | "separate",
): string {
  return t(`enums.severity.${severity}`);
}

export function localizeConflictSummary(t: TranslateFn, count: number): string {
  return count === 1
    ? t("conflicts.summary", { count })
    : t("conflicts.summaryPlural", { count });
}

export function buildBodyContextHeadline(
  t: TranslateFn,
  snapshot: Pick<
    BodyContextSnapshot,
    | "cyclePhase"
    | "cycleDay"
    | "lifeStage"
    | "postpartumWeeks"
    | "weightChange"
  >,
): string {
  const parts: string[] = [];

  if (snapshot.cyclePhase !== "none") {
    const phase = t(`enums.cyclePhase.${snapshot.cyclePhase}`);
    parts.push(
      snapshot.cycleDay
        ? `${phase} · ${t("bodyBanner.day", { day: snapshot.cycleDay })}`
        : phase,
    );
  }

  for (const key of LIFE_STAGE_TOGGLE_KEYS) {
    if (!snapshot.lifeStage[key]) continue;
    const stage = t(`enums.lifeStage.${key}`);
    parts.push(
      key === "postpartum" && snapshot.postpartumWeeks !== null
        ? `${stage} · ${t("bodyBanner.week", { week: snapshot.postpartumWeeks })}`
        : stage,
    );
  }

  if (
    snapshot.weightChange &&
    snapshot.weightChange !== "prefer_not_to_say"
  ) {
    parts.push(t(`enums.weightChange.${snapshot.weightChange}`));
  }

  return parts.length > 0 ? parts.join(" · ") : t("bodyBanner.fallback");
}

export type PageTitleKey = "home" | "products" | "routines" | "lifestyle";

const PAGE_TITLE_KEYS: Record<PageTitleKey, string> = {
  home: "pages.home.title",
  products: "pages.products.title",
  routines: "pages.routines.title",
  lifestyle: "pages.lifestyle.title",
};

export function getPageTitleKey(pathname: string): PageTitleKey {
  if (pathname.startsWith("/products")) return "products";
  if (pathname.startsWith("/routines")) return "routines";
  if (pathname.startsWith("/lifestyle") || pathname.startsWith("/cycle")) {
    return "lifestyle";
  }
  return "home";
}

export function formatDocumentTitle(t: TranslateFn, pathname: string): string {
  const pageKey = getPageTitleKey(pathname);
  const pageTitle = t(PAGE_TITLE_KEYS[pageKey]);
  return `${pageTitle} · ${t("brand.name")}`;
}
