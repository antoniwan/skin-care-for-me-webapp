import type {
  AppSettings,
  BodyContextSettings,
  MenstrualCycleSettings,
} from "@/lib/types";
import { DEFAULT_BODY_CONTEXT } from "./defaults";

type LegacySettings = Partial<AppSettings> & {
  cycle?: Partial<MenstrualCycleSettings> | MenstrualCycleSettings;
};

function normalizeMenstrual(
  menstrual: Partial<MenstrualCycleSettings> | undefined,
  legacy?: MenstrualCycleSettings,
): MenstrualCycleSettings {
  const source = menstrual ?? legacy ?? DEFAULT_BODY_CONTEXT.menstrual;
  return {
    enabled: source.enabled ?? DEFAULT_BODY_CONTEXT.menstrual.enabled,
    cycleLength: source.cycleLength ?? DEFAULT_BODY_CONTEXT.menstrual.cycleLength,
    periodLength:
      source.periodLength ?? DEFAULT_BODY_CONTEXT.menstrual.periodLength,
    lastPeriodStart:
      source.lastPeriodStart ?? DEFAULT_BODY_CONTEXT.menstrual.lastPeriodStart,
  };
}

export function normalizeBodyContext(
  raw: Partial<BodyContextSettings> | undefined,
  legacyCycle?: MenstrualCycleSettings,
): BodyContextSettings {
  if (!raw && !legacyCycle) return { ...DEFAULT_BODY_CONTEXT };

  const legacyEnabled = legacyCycle?.enabled ?? false;
  const menstrual = normalizeMenstrual(raw?.menstrual, legacyCycle);

  return {
    enabled: raw?.enabled ?? legacyEnabled,
    menstrual,
    lifeStage: raw?.lifeStage ?? DEFAULT_BODY_CONTEXT.lifeStage,
    postpartumWeeks:
      raw?.postpartumWeeks ?? DEFAULT_BODY_CONTEXT.postpartumWeeks,
    weight: {
      enabled: raw?.weight?.enabled ?? DEFAULT_BODY_CONTEXT.weight.enabled,
      recentChange:
        raw?.weight?.recentChange ?? DEFAULT_BODY_CONTEXT.weight.recentChange,
    },
  };
}

export function normalizeAppSettings(raw: LegacySettings | undefined): AppSettings {
  if (!raw) {
    return {
      onboardingComplete: false,
      bodyContext: { ...DEFAULT_BODY_CONTEXT },
    };
  }

  const legacyCycle = raw.cycle as MenstrualCycleSettings | undefined;

  return {
    onboardingComplete: raw.onboardingComplete ?? false,
    bodyContext: normalizeBodyContext(raw.bodyContext, legacyCycle),
  };
}
