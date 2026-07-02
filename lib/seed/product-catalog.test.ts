import { describe, expect, it } from "vitest";
import { DEFAULT_PRODUCTS } from "@/lib/seed/default-products";
import { enrichSeedProduct, getSeedCatalogEntry } from "@/lib/seed/product-catalog";
import { SEED_PRODUCT_IDS } from "@/lib/seed/product-ids";

describe("seed product catalog", () => {
  it("enriches every default seed product with commerce metadata", () => {
    for (const product of DEFAULT_PRODUCTS) {
      expect(product.imageUrl).toBeTruthy();
      expect(product.manufacturerUrl).toMatch(/^https:\/\//);
      expect(product.amazonAsin).toMatch(/^B[0-9A-Z]{9}$/);
      expect(product.tagline).toBeTruthy();
      expect(product.highlights?.length).toBeGreaterThan(0);
    }
  });

  it("looks up catalog entries by seed id", () => {
    const entry = getSeedCatalogEntry(SEED_PRODUCT_IDS.ceraveHydratingMineralSunscreen);
    expect(entry?.amazonAsin).toBe("B084V4L9H1");
    expect(entry?.manufacturerUrl).toContain("cerave.com");
  });

  it("merges catalog fields onto base products", () => {
    const enriched = enrichSeedProduct({
      id: SEED_PRODUCT_IDS.freshSugarFacePolish,
      name: "Sugar Face Polish Exfoliator",
      category: "exfoliant",
      ingredients: [],
      activeIngredients: [],
      usageGuide: "Test",
      frequency: "weekly",
      timeOfDay: "evening",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    });

    expect(enriched.manufacturerUrl).toContain("ulta.com");
    expect(enriched.productPageLabel).toBe("Ulta");
  });
});
