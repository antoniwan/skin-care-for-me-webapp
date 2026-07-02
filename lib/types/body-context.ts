export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "none";

export type LifeStage =
  | "none"
  | "pregnant"
  | "postpartum"
  | "breastfeeding"
  | "perimenopause"
  | "menopause";

export type WeightChange =
  | "stable"
  | "gaining"
  | "losing"
  | "prefer_not_to_say";

export interface MenstrualCycleSettings {
  enabled: boolean;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string | null;
}

export interface WeightContextSettings {
  enabled: boolean;
  recentChange: WeightChange;
}

export interface BodyContextSettings {
  /** Master switch for all body-aware routine adjustments. */
  enabled: boolean;
  menstrual: MenstrualCycleSettings;
  lifeStage: LifeStage;
  /** Weeks since delivery when lifeStage is postpartum (0–52). */
  postpartumWeeks: number | null;
  weight: WeightContextSettings;
}

/** @deprecated Use MenstrualCycleSettings via BodyContextSettings */
export type CycleSettings = MenstrualCycleSettings;
