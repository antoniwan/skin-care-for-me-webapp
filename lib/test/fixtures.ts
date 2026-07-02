import type { AppSettings, Product } from "@/lib/types";
import { DEFAULT_BODY_CONTEXT } from "@/lib/body-context/defaults";

const TIMESTAMP = "2024-06-01T12:00:00.000Z";

export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "product-1",
    name: "Test Cleanser",
    category: "cleanser",
    ingredients: ["Water", "Glycerin"],
    activeIngredients: [],
    usageGuide: "Use morning and evening.",
    frequency: "daily",
    timeOfDay: "any",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    ...overrides,
  };
}

export const defaultSettings: AppSettings = {
  onboardingComplete: false,
  bodyContext: { ...DEFAULT_BODY_CONTEXT },
};
