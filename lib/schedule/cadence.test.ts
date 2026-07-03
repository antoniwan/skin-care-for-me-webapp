import { describe, expect, it } from "vitest";
import {
  isMonthlyRoutineDay,
  isWeeklyRoutineDay,
  normalizeRoutineSchedule,
} from "@/lib/schedule/cadence";
import { DEFAULT_ROUTINE_SCHEDULE } from "@/lib/schedule/defaults";

describe("normalizeRoutineSchedule", () => {
  it("returns defaults when missing", () => {
    expect(normalizeRoutineSchedule(undefined)).toEqual(DEFAULT_ROUTINE_SCHEDULE);
  });

  it("clamps out-of-range values", () => {
    expect(
      normalizeRoutineSchedule({ weeklyAnchorDay: 9, monthlyAnchorDay: 40 }),
    ).toEqual({ weeklyAnchorDay: 6, monthlyAnchorDay: 28 });
  });
});

describe("isWeeklyRoutineDay", () => {
  it("matches configured anchor day", () => {
    expect(
      isWeeklyRoutineDay(3, { weeklyAnchorDay: 3, monthlyAnchorDay: 1 }),
    ).toBe(true);
    expect(
      isWeeklyRoutineDay(0, { weeklyAnchorDay: 3, monthlyAnchorDay: 1 }),
    ).toBe(false);
  });
});

describe("isMonthlyRoutineDay", () => {
  it("matches configured anchor day", () => {
    expect(
      isMonthlyRoutineDay(15, { weeklyAnchorDay: 0, monthlyAnchorDay: 15 }),
    ).toBe(true);
    expect(
      isMonthlyRoutineDay(1, { weeklyAnchorDay: 0, monthlyAnchorDay: 15 }),
    ).toBe(false);
  });
});
