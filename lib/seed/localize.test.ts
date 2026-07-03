import { describe, expect, it } from "vitest";
import { localizeProduct, localizeRoutines } from "@/lib/seed/localize";
import { DEFAULT_PRODUCTS } from "@/lib/seed/default-products";
import { SEED_PRODUCT_IDS } from "@/lib/seed/product-ids";
import { generateRoutines } from "@/lib/routines/generator";
import { defaultSettings } from "@/lib/test/fixtures";

describe("localizeProduct", () => {
  const seed = DEFAULT_PRODUCTS[0]!;

  it("returns Spanish copy for es-419", () => {
    const localized = localizeProduct(seed, "es-419");
    expect(localized.usageGuide).toContain("dos veces al día");
    expect(localized.tagline).toContain("Paso 1");
    expect(localized.highlights?.[0]).toContain("Limpiador");
  });

  it("returns English copy for en", () => {
    const localized = localizeProduct(seed, "en");
    expect(localized.usageGuide).toContain("twice daily");
    expect(localized.tagline).toContain("Step 1");
  });

  it("leaves non-seed products unchanged", () => {
    const custom = {
      ...seed,
      id: "user-custom",
      isSeed: false,
      name: "My Custom Cream",
      usageGuide: "Apply nightly",
    };
    const localized = localizeProduct(custom, "es-419");
    expect(localized.name).toBe("My Custom Cream");
    expect(localized.usageGuide).toBe("Apply nightly");
  });
});

describe("localizeRoutines", () => {
  it("localizes step names and instructions from localized products", () => {
    const products = localizeProduct(
      DEFAULT_PRODUCTS.find(
        (p) => p.id === SEED_PRODUCT_IDS.cliniqueAllAboutCleanSoap,
      )!,
      "es-419",
    );
    const allProducts = DEFAULT_PRODUCTS.map((p) =>
      p.id === products.id ? products : localizeProduct(p, "es-419"),
    );
    const routines = generateRoutines(allProducts, defaultSettings);
    const localized = localizeRoutines(routines, "es-419", allProducts);
    const step = localized
      .flatMap((r) => r.steps)
      .find((s) => s.productId === SEED_PRODUCT_IDS.cliniqueAllAboutCleanSoap);

    expect(step?.productName).toContain("All About Clean");
    expect(step?.instructions).toContain("dos veces al día");
  });
});
