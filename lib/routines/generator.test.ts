import { describe, expect, it } from "vitest";
import {
  generateRoutines,
  getRoutineWarnings,
} from "@/lib/routines/generator";
import { defaultSettings, makeProduct } from "@/lib/test/fixtures";

describe("generateRoutines", () => {
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
