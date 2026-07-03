import type { Product } from "./product";

export interface IngredientConflict {
  /** Stable key for i18n — `conflictRules.{id}` in message files. */
  id: string;
  ingredientA: string;
  ingredientB: string;
  severity: "avoid" | "caution" | "separate";
  /** English fallback for PDF export and tests. */
  reason: string;
  guidance: string;
}

export interface ConflictWarning {
  productA: Product;
  productB: Product;
  conflict: IngredientConflict;
}
