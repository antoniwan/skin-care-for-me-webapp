import { describe, expect, it } from "vitest";
import { detectConflicts } from "@/lib/rules/ingredient-conflicts";
import { makeProduct } from "@/lib/test/fixtures";

describe("detectConflicts", () => {
  it("detects retinol and BHA conflict", () => {
    const products = [
      makeProduct({
        id: "retinol",
        name: "Retinol Serum",
        category: "treatment",
        activeIngredients: ["retinol"],
      }),
      makeProduct({
        id: "bha",
        name: "Salicylic Toner",
        category: "exfoliant",
        activeIngredients: ["salicylic acid"],
      }),
    ];

    const warnings = detectConflicts(products);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0].conflict.ingredientA).toMatch(/retinol|bha/);
  });

  it("returns empty array when no conflicts", () => {
    const products = [
      makeProduct({
        id: "moist",
        name: "Moisturizer",
        activeIngredients: ["glycerin"],
      }),
    ];

    expect(detectConflicts(products)).toEqual([]);
  });
});
