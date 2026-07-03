/** When weekly and monthly products appear on Today (JS `Date` conventions). */
export interface RoutineScheduleSettings {
  /** 0 = Sunday … 6 = Saturday (`Date.getDay()`). */
  weeklyAnchorDay: number;
  /** Day of month 1–28 for monthly treatments. */
  monthlyAnchorDay: number;
}
