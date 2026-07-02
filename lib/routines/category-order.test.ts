import { describe, expect, it } from "vitest";
import { finalizeRoutineProductOrder } from "@/lib/routines/category-order";
import { makeProduct } from "@/lib/test/fixtures";

describe("finalizeRoutineProductOrder", () => {
  it("places sunscreen last in morning routines", () => {
    const products = [
      makeProduct({
        id: "spf",
        category: "sunscreen",
        frequency: "daily",
        timeOfDay: "morning",
      }),
      makeProduct({
        id: "cleanse",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "moist",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "any",
      }),
    ];

    const ordered = finalizeRoutineProductOrder(products, "morning");
    expect(ordered.map((p) => p.id)).toEqual(["cleanse", "moist", "spf"]);
  });

  it("places masks last in evening routines", () => {
    const products = [
      makeProduct({
        id: "mask",
        category: "mask",
        frequency: "daily",
        timeOfDay: "evening",
      }),
      makeProduct({
        id: "cleanse",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "moist",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "any",
      }),
    ];

    const ordered = finalizeRoutineProductOrder(products, "evening");
    expect(ordered.map((p) => p.id)).toEqual(["cleanse", "moist", "mask"]);
  });
});
