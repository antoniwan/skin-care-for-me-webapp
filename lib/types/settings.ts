import type { BodyContextSettings } from "./body-context";
import type { RoutineScheduleSettings } from "./schedule";

export interface AppSettings {
  bodyContext: BodyContextSettings;
  onboardingComplete: boolean;
  routineSchedule: RoutineScheduleSettings;
}
