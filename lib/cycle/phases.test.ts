import { describe, expect, it } from "vitest";
import { getCurrentCyclePhase, getCycleDay } from "@/lib/cycle/phases";
import type { CycleSettings } from "@/lib/types";

const baseCycle: CycleSettings = {
  enabled: true,
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: "2024-06-01",
};

describe("getCurrentCyclePhase", () => {
  it("returns none when tracking is disabled", () => {
    expect(
      getCurrentCyclePhase(
        { ...baseCycle, enabled: false },
        new Date("2024-06-10"),
      ),
    ).toBe("none");
  });

  it("returns menstrual on period days", () => {
    expect(getCurrentCyclePhase(baseCycle, new Date("2024-06-03"))).toBe(
      "menstrual",
    );
  });

  it("returns follicular after period", () => {
    expect(getCurrentCyclePhase(baseCycle, new Date("2024-06-10"))).toBe(
      "follicular",
    );
  });
});

describe("getCycleDay", () => {
  it("returns null when tracking is off", () => {
    expect(
      getCycleDay({ ...baseCycle, enabled: false }, new Date("2024-06-03")),
    ).toBeNull();
  });

  it("returns day number within cycle", () => {
    expect(getCycleDay(baseCycle, new Date("2024-06-03"))).toBe(3);
  });
});
