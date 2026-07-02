import { describe, expect, it } from "vitest";
import { generateRoutines } from "@/lib/routines/generator";
import {
  formatRoutineTitle,
  verifyRoutine,
} from "@/lib/routines/verification";
import { defaultSettings, makeProduct } from "@/lib/test/fixtures";

describe("verifyRoutine", () => {
  it("passes all three checks for a well-formed morning routine", () => {
    const products = [
      makeProduct({
        id: "cleanse",
        name: "Cleanser",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "moist",
        name: "Moisturizer",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "spf",
        name: "SPF",
        category: "sunscreen",
        frequency: "daily",
        timeOfDay: "morning",
      }),
    ];

    const routines = generateRoutines(products, defaultSettings);
    const morning = routines.find(
      (r) => r.frequency === "daily" && r.timeOfDay === "morning",
    );

    expect(morning).toBeDefined();
    const verification = verifyRoutine(morning!, products);
    expect(verification.allPassed).toBe(true);
    expect(verification.checks.map((c) => c.id)).toEqual([
      "application-order",
      "ingredient-safety",
      "shelf-alignment",
    ]);
  });

  it("flags ingredient safety when avoid conflicts share a routine", () => {
    const retinol = makeProduct({
      id: "retinol",
      category: "treatment",
      frequency: "daily",
      timeOfDay: "evening",
      activeIngredients: ["retinol"],
    });
    const bpo = makeProduct({
      id: "bpo",
      category: "treatment",
      frequency: "daily",
      timeOfDay: "evening",
      activeIngredients: ["benzoyl peroxide"],
    });

    const routine = {
      id: "test",
      frequency: "daily" as const,
      timeOfDay: "evening" as const,
      steps: [
        {
          productId: retinol.id,
          productName: retinol.name,
          category: retinol.category,
          instructions: retinol.usageGuide,
          order: 1,
        },
        {
          productId: bpo.id,
          productName: bpo.name,
          category: bpo.category,
          instructions: bpo.usageGuide,
          order: 2,
        },
      ],
      generatedAt: new Date().toISOString(),
    };

    const verification = verifyRoutine(routine, [retinol, bpo]);
    const safety = verification.checks.find((c) => c.id === "ingredient-safety");
    expect(safety?.passed).toBe(false);
  });
});

describe("formatRoutineTitle", () => {
  it("names daily routines by time of day", () => {
    expect(formatRoutineTitle("daily", "morning")).toBe("Morning routine");
    expect(formatRoutineTitle("weekly", "evening")).toBe("Evening · weekly");
  });
});
