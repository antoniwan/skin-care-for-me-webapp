import {
  deleteProduct,
  getAllProducts,
  getSettings,
  saveProduct,
  saveSettings,
} from "@/lib/db";
import { productFromLookup } from "@/lib/products/factory";
import { isSeedProductId } from "@/lib/seed/default-products";
import { generateRoutines } from "@/lib/routines/generator";
import { detectConflicts } from "@/lib/rules/ingredient-conflicts";
import type {
  AppSettings,
  ConflictWarning,
  Product,
  ProductLookupResult,
  Routine,
} from "@/lib/types";

export interface AppDataSnapshot {
  products: Product[];
  settings: AppSettings;
  routines: Routine[];
  conflicts: ConflictWarning[];
}

/** Load shelf + settings and derive routines and conflicts. Routines are not persisted. */
export async function refreshAppData(): Promise<AppDataSnapshot> {
  const [products, settings] = await Promise.all([
    getAllProducts(),
    getSettings(),
  ]);

  return {
    products,
    settings,
    routines: generateRoutines(products, settings),
    conflicts: detectConflicts(products),
  };
}

export async function addProductFromLookup(
  lookup: ProductLookupResult,
): Promise<{ product: Product; snapshot: AppDataSnapshot }> {
  const product = productFromLookup(lookup);
  await saveProduct(product);
  const snapshot = await refreshAppData();
  return { product, snapshot };
}

export async function removeProductById(id: string): Promise<AppDataSnapshot> {
  if (isSeedProductId(id)) {
    return refreshAppData();
  }
  await deleteProduct(id);
  return refreshAppData();
}

export async function updateAppSettings(
  settings: AppSettings,
): Promise<AppDataSnapshot> {
  await saveSettings(settings);
  return refreshAppData();
}
