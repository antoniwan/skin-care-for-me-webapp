import type { RoutineScheduleSettings } from "@/lib/types/schedule";
import {
  DEFAULT_ROUTINE_SCHEDULE,
  MONTHLY_DAY_MAX,
  MONTHLY_DAY_MIN,
  WEEKDAY_MAX,
  WEEKDAY_MIN,
} from "./defaults";

export function clampWeeklyAnchorDay(day: number): number {
  return Math.min(WEEKDAY_MAX, Math.max(WEEKDAY_MIN, Math.floor(day)));
}

export function clampMonthlyAnchorDay(day: number): number {
  return Math.min(MONTHLY_DAY_MAX, Math.max(MONTHLY_DAY_MIN, Math.floor(day)));
}

export function normalizeRoutineSchedule(
  raw: Partial<RoutineScheduleSettings> | undefined,
): RoutineScheduleSettings {
  if (!raw) return { ...DEFAULT_ROUTINE_SCHEDULE };

  return {
    weeklyAnchorDay: clampWeeklyAnchorDay(
      raw.weeklyAnchorDay ?? DEFAULT_ROUTINE_SCHEDULE.weeklyAnchorDay,
    ),
    monthlyAnchorDay: clampMonthlyAnchorDay(
      raw.monthlyAnchorDay ?? DEFAULT_ROUTINE_SCHEDULE.monthlyAnchorDay,
    ),
  };
}

export function isWeeklyRoutineDay(
  dayOfWeek: number,
  schedule: RoutineScheduleSettings = DEFAULT_ROUTINE_SCHEDULE,
): boolean {
  return dayOfWeek === schedule.weeklyAnchorDay;
}

export function isMonthlyRoutineDay(
  dayOfMonth: number,
  schedule: RoutineScheduleSettings = DEFAULT_ROUTINE_SCHEDULE,
): boolean {
  return dayOfMonth === schedule.monthlyAnchorDay;
}
