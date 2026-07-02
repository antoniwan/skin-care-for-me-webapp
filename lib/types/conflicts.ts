import type { Product } from "./product";

export interface IngredientConflict {
  ingredientA: string;
  ingredientB: string;
  severity: "avoid" | "caution" | "separate";
  reason: string;
  guidance: string;
}

export interface ConflictWarning {
  productA: Product;
  productB: Product;
  conflict: IngredientConflict;
}
