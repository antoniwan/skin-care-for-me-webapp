import type { Product, ProductCategory, TimeOfDay } from "../types";

/** Dermatologist-style layering: cleanse → prep → treat → hydrate → protect. */
export const ROUTINE_CATEGORY_ORDER: ProductCategory[] = [
  "cleanser",
  "toner",
  "exfoliant",
  "serum",
  "treatment",
  "eye_cream",
  "moisturizer",
  "sunscreen",
  "mask",
  "other",
];

export function categoryRank(category: ProductCategory): number {
  const index = ROUTINE_CATEGORY_ORDER.indexOf(category);
  return index === -1 ? ROUTINE_CATEGORY_ORDER.length : index;
}

export function sortProductsByCategory(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const byCategory = categoryRank(a.category) - categoryRank(b.category);
    if (byCategory !== 0) return byCategory;
    return a.name.localeCompare(b.name);
  });
}

/** SPF is always last in the morning; leave-on masks are last at night. */
export function finalizeRoutineProductOrder(
  products: Product[],
  timeOfDay: TimeOfDay,
): Product[] {
  const sorted = sortProductsByCategory(products);

  if (timeOfDay === "morning") {
    const sunscreen = sorted.filter((p) => p.category === "sunscreen");
    const rest = sorted.filter((p) => p.category !== "sunscreen");
    return [...rest, ...sunscreen];
  }

  if (timeOfDay === "evening") {
    const masks = sorted.filter((p) => p.category === "mask");
    const rest = sorted.filter((p) => p.category !== "mask");
    return [...rest, ...masks];
  }

  return sorted;
}
