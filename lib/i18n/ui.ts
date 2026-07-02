import type { BodyContextSnapshot } from "@/lib/body-context/snapshot";
import type {
  CyclePhase,
  LifeStage,
  ProductCategory,
  RoutineFrequency,
  TimeOfDay,
} from "@/lib/types";
import type { RoutineCheck, RoutineVerification } from "@/lib/routines/verification";
import type { TranslateFn } from "./translate";

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
): string {
  switch (frequency) {
    case "daily":
      return t("schedule.everyDay");
    case "weekly":
      return t("schedule.sundays");
    case "monthly":
      return t("schedule.firstOfMonth");
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

export function localizeVerification(
  t: TranslateFn,
  verification: RoutineVerification,
): RoutineVerification {
  return {
    ...verification,
    checks: verification.checks.map((check) => localizeCheck(t, check)),
    reviewNotes: verification.reviewNotes.map((note) => {
      if (note.includes("Multiple") && note.includes("layering order")) {
        const match = note.match(/Multiple (.+) steps/);
        return t("safetyCheck.reviewDuplicate", {
          categories: match?.[1] ?? "",
        });
      }
      if (note.includes("menstrual phase")) {
        return t("safetyCheck.reviewMenstrual");
      }
      return note;
    }),
  };
}

function localizeCheck(t: TranslateFn, check: RoutineCheck): RoutineCheck {
  const base = `safetyCheck.checks.${check.id}`;

  if (check.id === "ingredient-safety" && !check.passed) {
    const countMatch = check.detail.match(/^(\d+)/);
    const count = countMatch ? Number(countMatch[1]) : 1;
    return {
      ...check,
      label: t(`${base}.label`),
      detail:
        count === 1
          ? t(`${base}.failed`, { count })
          : t(`${base}.failedPlural`, { count }),
    };
  }

  if (check.id === "ingredient-safety" && check.passed) {
    const cautionMatch = check.detail.match(/(\d+) caution/);
    if (cautionMatch) {
      const count = Number(cautionMatch[1]);
      return {
        ...check,
        label: t(`${base}.label`),
        detail:
          count === 1
            ? t(`${base}.passedCaution`, { count })
            : t(`${base}.passedCautionPlural`, { count }),
      };
    }
    return {
      ...check,
      label: t(`${base}.label`),
      detail: t(`${base}.passed`),
    };
  }

  if (check.id === "shelf-alignment" && !check.passed) {
    const countMatch = check.detail.match(/^(\d+)/);
    const count = countMatch ? Number(countMatch[1]) : 1;
    return {
      ...check,
      label: t(`${base}.label`),
      detail:
        count === 1
          ? t(`${base}.failed`, { count })
          : t(`${base}.failedPlural`, { count }),
    };
  }

  return {
    ...check,
    label: t(`${base}.label`),
    detail: t(`${base}.${check.passed ? "passed" : "failed"}`),
  };
}

export function getLifeStageDescription(t: TranslateFn, stage: LifeStage): string {
  return t(`lifeStageDescription.${stage}`);
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

export function localizeExclusionReason(t: TranslateFn, reason: string): string {
  if (reason.includes("pregnancy or breastfeeding")) {
    return t("exclusionReason.pregnancy");
  }
  if (reason.includes("postpartum")) {
    return t("exclusionReason.postpartum");
  }
  if (reason.includes("phase days")) {
    const phaseMatch = reason.match(/Held on (\w+) phase/);
    const phase = phaseMatch?.[1] ?? "";
    return t("exclusionReason.menstrual", {
      phase: t(`enums.cyclePhase.${phase}`),
    });
  }
  if (reason.includes("body settings")) {
    return t("exclusionReason.default");
  }
  return t("exclusionReason.ingredient", { reason });
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

  if (snapshot.lifeStage !== "none") {
    const stage = t(`enums.lifeStage.${snapshot.lifeStage}`);
    parts.push(
      snapshot.postpartumWeeks !== null
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
