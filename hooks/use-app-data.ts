"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProducts,
  getSettings,
  saveProduct,
  saveRoutines,
  saveSettings,
} from "@/lib/db";
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

export function useAppData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [conflicts, setConflicts] = useState<ConflictWarning[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [loadedProducts, loadedSettings] = await Promise.all([
      getAllProducts(),
      getSettings(),
    ]);

    const generated = generateRoutines(loadedProducts, loadedSettings);
    await saveRoutines(generated);

    setProducts(loadedProducts);
    setSettings(loadedSettings);
    setRoutines(generated);
    setConflicts(detectConflicts(loadedProducts));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [loadedProducts, loadedSettings] = await Promise.all([
        getAllProducts(),
        getSettings(),
      ]);

      if (cancelled) return;

      const generated = generateRoutines(loadedProducts, loadedSettings);
      await saveRoutines(generated);

      if (cancelled) return;

      setProducts(loadedProducts);
      setSettings(loadedSettings);
      setRoutines(generated);
      setConflicts(detectConflicts(loadedProducts));
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const addProductFromLookup = useCallback(
    async (lookup: ProductLookupResult) => {
      const now = new Date().toISOString();
      const product: Product = {
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
      await saveProduct(product);
      await refresh();
      return product;
    },
    [refresh],
  );

  const removeProduct = useCallback(
    async (id: string) => {
      if (isSeedProductId(id)) return;
      await deleteProduct(id);
      await refresh();
    },
    [refresh],
  );

  const updateSettings = useCallback(
    async (next: AppSettings) => {
      await saveSettings(next);
      await refresh();
    },
    [refresh],
  );

  return {
    products,
    routines,
    settings,
    conflicts,
    loading,
    refresh,
    addProductFromLookup,
    removeProduct,
    updateSettings,
  };
}
