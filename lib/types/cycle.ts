export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "none";

export interface CycleSettings {
  enabled: boolean;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string | null;
}
