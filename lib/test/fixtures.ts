import type { AppSettings, Product } from "@/lib/types";

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
  cycle: {
    enabled: false,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: null,
  },
};
