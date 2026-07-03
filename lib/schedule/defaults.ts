import type { RoutineScheduleSettings } from "@/lib/types/schedule";

export const WEEKDAY_MIN = 0;
export const WEEKDAY_MAX = 6;
export const MONTHLY_DAY_MIN = 1;
export const MONTHLY_DAY_MAX = 28;

export const DEFAULT_ROUTINE_SCHEDULE: RoutineScheduleSettings = {
  weeklyAnchorDay: 0,
  monthlyAnchorDay: 1,
};
