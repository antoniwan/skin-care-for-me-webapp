export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "none";

/** @deprecated Legacy single-select value — migrated to `LifeStageFlags`. */
export type LifeStage =
  | "none"
  | "pregnant"
  | "postpartum"
  | "breastfeeding"
  | "perimenopause"
  | "menopause";

/** Independent life-stage toggles — postpartum and breastfeeding can both be active. */
export interface LifeStageFlags {
  pregnant: boolean;
  postpartum: boolean;
  breastfeeding: boolean;
  perimenopause: boolean;
  menopause: boolean;
}

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

export interface SkinConditionFlags {
  psoriasis: boolean;
  eczema: boolean;
  rosacea: boolean;
  acneProne: boolean;
}

export interface WellnessFlags {
  anxiety: boolean;
  depression: boolean;
}

export interface BodyContextSettings {
  /** Master switch for all lifestyle-aware routine adjustments. */
  enabled: boolean;
  menstrual: MenstrualCycleSettings;
  lifeStage: LifeStageFlags;
  /** Weeks since delivery when `lifeStage.postpartum` is on (0–52). */
  postpartumWeeks: number | null;
  weight: WeightContextSettings;
  skinConditions: SkinConditionFlags;
  wellness: WellnessFlags;
}

/** @deprecated Use MenstrualCycleSettings via BodyContextSettings */
export type CycleSettings = MenstrualCycleSettings;
