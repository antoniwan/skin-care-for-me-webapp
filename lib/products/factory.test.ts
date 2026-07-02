import { describe, expect, it } from "vitest";
import { productFromLookup } from "@/lib/products/factory";
import type { ProductLookupResult } from "@/lib/types";

const lookup: ProductLookupResult = {
  name: "Test SPF",
  brand: "CeraVe",
  category: "sunscreen",
  ingredients: ["Zinc Oxide"],
  activeIngredients: ["zinc oxide"],
  usageGuide: "Apply every morning.",
  suggestedFrequency: "daily",
  suggestedTimeOfDay: "morning",
};

describe("productFromLookup", () => {
  it("maps lookup fields onto a product", () => {
    const product = productFromLookup(lookup);

    expect(product.name).toBe("Test SPF");
    expect(product.brand).toBe("CeraVe");
    expect(product.category).toBe("sunscreen");
    expect(product.frequency).toBe("daily");
    expect(product.timeOfDay).toBe("morning");
    expect(product.id).toBeTruthy();
    expect(product.createdAt).toBe(product.updatedAt);
  });
});
