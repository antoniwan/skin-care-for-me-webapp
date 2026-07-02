import type { Product, ProductLookupResult } from "@/lib/types";

export function productFromLookup(lookup: ProductLookupResult): Product {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: lookup.name,
    brand: lookup.brand,
    category: lookup.category,
    ingredients: lookup.ingredients,
    activeIngredients: lookup.activeIngredients,
    usageGuide: lookup.usageGuide,
    frequency: lookup.suggestedFrequency,
    timeOfDay: lookup.suggestedTimeOfDay,
    createdAt: now,
    updatedAt: now,
  };
}
