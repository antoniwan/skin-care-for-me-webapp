import { describe, expect, it } from "vitest";
import { normalizeAppSettings } from "@/lib/body-context/migrate";

describe("normalizeAppSettings", () => {
  it("migrates legacy cycle settings into bodyContext.menstrual", () => {
    const settings = normalizeAppSettings({
      onboardingComplete: true,
      cycle: {
        enabled: true,
        cycleLength: 30,
        periodLength: 4,
        lastPeriodStart: "2024-01-01",
      },
    });

    expect(settings.bodyContext.enabled).toBe(true);
    expect(settings.bodyContext.menstrual).toEqual({
      enabled: true,
      cycleLength: 30,
      periodLength: 4,
      lastPeriodStart: "2024-01-01",
    });
  });

  it("prefers bodyContext when both legacy and new shapes exist", () => {
    const settings = normalizeAppSettings({
      cycle: { enabled: true, cycleLength: 28, periodLength: 5, lastPeriodStart: null },
      bodyContext: {
        enabled: true,
        menstrual: {
          enabled: false,
          cycleLength: 28,
          periodLength: 5,
          lastPeriodStart: null,
        },
        lifeStage: "postpartum",
        postpartumWeeks: 6,
        weight: { enabled: true, recentChange: "stable" },
      } as unknown as import("@/lib/types").BodyContextSettings,
    });

    expect(settings.bodyContext.lifeStage.postpartum).toBe(true);
    expect(settings.bodyContext.menstrual.enabled).toBe(false);
  });

  it("defaults routine schedule when missing", () => {
    const settings = normalizeAppSettings({
      onboardingComplete: true,
    });

    expect(settings.routineSchedule).toEqual({
      weeklyAnchorDay: 0,
      monthlyAnchorDay: 1,
    });
  });
});
