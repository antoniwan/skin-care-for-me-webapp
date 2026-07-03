import { describe, expect, it } from "vitest";
import {
  generateRoutines,
  getRoutineWarnings,
  getTodaysRoutines,
} from "@/lib/routines/generator";
import { defaultSettings, makeProduct } from "@/lib/test/fixtures";

describe("generateRoutines", () => {
  it("orders Clinique-style steps: cleanse, toner, moisturize, SPF", () => {
    const products = [
      makeProduct({
        id: "spf",
        name: "SPF",
        category: "sunscreen",
        frequency: "daily",
        timeOfDay: "morning",
      }),
      makeProduct({
        id: "moist",
        name: "Moisturizer",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "toner",
        name: "Toner",
        category: "toner",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "cleanse",
        name: "Cleanser",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "any",
      }),
    ];

    const routines = generateRoutines(products, defaultSettings);
    const morning = routines.find(
      (r) => r.frequency === "daily" && r.timeOfDay === "morning",
    );

    expect(morning?.steps.map((s) => s.category)).toEqual([
      "cleanser",
      "toner",
      "moisturizer",
      "sunscreen",
    ]);
  });

  it("orders steps by category", () => {
    const products = [
      makeProduct({
        id: "moist",
        name: "Moisturizer",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "morning",
      }),
      makeProduct({
        id: "cleanse",
        name: "Cleanser",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "morning",
      }),
    ];

    const routines = generateRoutines(products, defaultSettings);
    const morning = routines.find(
      (r) => r.frequency === "daily" && r.timeOfDay === "morning",
    );

    expect(morning?.steps.map((s) => s.category)).toEqual([
      "cleanser",
      "moisturizer",
    ]);
  });

  it("skips empty routine buckets", () => {
    const products = [
      makeProduct({
        frequency: "weekly",
        timeOfDay: "evening",
      }),
    ];

    const routines = generateRoutines(products, defaultSettings);
    expect(
      routines.some((r) => r.frequency === "daily" && r.timeOfDay === "morning"),
    ).toBe(false);
  });
});

describe("getRoutineWarnings", () => {
  it("returns warnings only for products in the routine", () => {
    const retinol = makeProduct({
      id: "retinol",
      category: "treatment",
      frequency: "daily",
      timeOfDay: "evening",
      activeIngredients: ["retinol"],
    });
    const bha = makeProduct({
      id: "bha",
      category: "exfoliant",
      frequency: "daily",
      timeOfDay: "evening",
      activeIngredients: ["salicylic acid"],
    });
    const cleanser = makeProduct({
      id: "cleanse",
      category: "cleanser",
      frequency: "daily",
      timeOfDay: "morning",
      activeIngredients: [],
    });

    const routines = generateRoutines(
      [retinol, bha, cleanser],
      defaultSettings,
    );
    const evening = routines.find((r) => r.timeOfDay === "evening");

    expect(evening).toBeDefined();
    const warnings = getRoutineWarnings(evening!, [retinol, bha, cleanser]);
    expect(warnings.length).toBeGreaterThan(0);
  });
});

describe("getTodaysRoutines", () => {
  it("includes weekly routines on the configured anchor day", () => {
    const products = [
      makeProduct({
        frequency: "weekly",
        timeOfDay: "evening",
      }),
    ];
    const routines = generateRoutines(products, defaultSettings);
    const wednesday = new Date(2024, 5, 5); // Local Wednesday

    const sundayOnly = getTodaysRoutines(routines, defaultSettings, wednesday);
    expect(sundayOnly.some((r) => r.frequency === "weekly")).toBe(false);

    const wednesdaySettings = {
      ...defaultSettings,
      routineSchedule: { weeklyAnchorDay: 3, monthlyAnchorDay: 1 },
    };
    const wednesdayRoutines = getTodaysRoutines(
      routines,
      wednesdaySettings,
      wednesday,
    );
    expect(wednesdayRoutines.some((r) => r.frequency === "weekly")).toBe(true);
  });

  it("includes monthly routines on the configured anchor day", () => {
    const products = [
      makeProduct({
        frequency: "monthly",
        timeOfDay: "evening",
      }),
    ];
    const routines = generateRoutines(products, defaultSettings);
    const fifteenth = new Date(2024, 5, 15); // Local June 15

    const firstOnly = getTodaysRoutines(routines, defaultSettings, fifteenth);
    expect(firstOnly.some((r) => r.frequency === "monthly")).toBe(false);

    const midMonthSettings = {
      ...defaultSettings,
      routineSchedule: { weeklyAnchorDay: 0, monthlyAnchorDay: 15 },
    };
    const midMonth = getTodaysRoutines(
      routines,
      midMonthSettings,
      fifteenth,
    );
    expect(midMonth.some((r) => r.frequency === "monthly")).toBe(true);
  });
});
