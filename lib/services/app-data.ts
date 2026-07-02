import {
  deleteProduct,
  getAllProducts,
  getSettings,
  listProducts,
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

/** Read-only snapshot for liveQuery (no IndexedDB writes). */
export async function readAppDataSnapshot(): Promise<AppDataSnapshot> {
  const [products, settings] = await Promise.all([
    listProducts(),
    getSettings(),
  ]);

  return deriveAppDataSnapshot(products, settings);
}

function deriveAppDataSnapshot(
  products: Product[],
  settings: AppSettings,
): AppDataSnapshot {
  return {
    products,
    settings,
    routines: generateRoutines(products, settings),
    conflicts: detectConflicts(products),
  };
}

/** Load shelf + settings and derive routines and conflicts. Ensures seed products first. */
export async function refreshAppData(): Promise<AppDataSnapshot> {
  const [products, settings] = await Promise.all([
    getAllProducts(),
    getSettings(),
  ]);

  return deriveAppDataSnapshot(products, settings);
}

export async function addProductFromLookup(
  lookup: ProductLookupResult,
): Promise<Product> {
  const product = productFromLookup(lookup);
  await saveProduct(product);
  return product;
}

export async function removeProductById(id: string): Promise<void> {
  if (isSeedProductId(id)) return;
  await deleteProduct(id);
}

export async function updateAppSettings(settings: AppSettings): Promise<void> {
  await saveSettings(settings);
}
