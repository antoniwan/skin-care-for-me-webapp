import Dexie, { type EntityTable } from "dexie";
import type { AppSettings, Product, Routine } from "./types";
import { DEFAULT_PRODUCTS } from "./seed/default-products";

const DEFAULT_SETTINGS: AppSettings = {
  cycle: {
    enabled: false,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: null,
  },
  onboardingComplete: false,
};

class SkinCareDB extends Dexie {
  products!: EntityTable<Product, "id">;
  routines!: EntityTable<Routine, "id">;
  settings!: EntityTable<AppSettings & { id: string }, "id">;

  constructor() {
    super("SkinCareForMe");
    this.version(1).stores({
      products: "id, name, category, frequency, createdAt",
      routines: "id, frequency, timeOfDay, generatedAt",
      settings: "id",
    });
  }
}

export const db = new SkinCareDB();

let seedPromise: Promise<void> | null = null;

/** Upsert default shelf products. Call outside liveQuery (read-only) contexts. */
export async function ensureSeedProducts(): Promise<void> {
  if (!seedPromise) {
    seedPromise = db.products.bulkPut(DEFAULT_PRODUCTS).then(() => undefined);
  }
  await seedPromise;
}

export async function getSettings(): Promise<AppSettings> {
  const row = await db.settings.get("app");
  return row ?? DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await db.settings.put({ id: "app", ...settings });
}

export async function listProducts(): Promise<Product[]> {
  return db.products.orderBy("createdAt").reverse().toArray();
}

export async function getAllProducts(): Promise<Product[]> {
  await ensureSeedProducts();
  return listProducts();
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return db.products.get(id);
}

export async function saveProduct(product: Product): Promise<void> {
  await db.products.put(product);
}

export async function deleteProduct(id: string): Promise<void> {
  await db.products.delete(id);
}

/** @deprecated Routines are derived on read via `refreshAppData()`. Table kept for schema v1 compat. */
export async function getRoutines(): Promise<Routine[]> {
  return db.routines.orderBy("generatedAt").reverse().toArray();
}

/** @deprecated Routines are derived on read via `refreshAppData()`. */
export async function saveRoutines(routines: Routine[]): Promise<void> {
  await db.routines.clear();
  await db.routines.bulkPut(routines);
}
