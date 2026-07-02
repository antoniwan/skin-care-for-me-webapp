"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addProductFromLookup as addProductFromLookupService,
  refreshAppData,
  removeProductById,
  updateAppSettings,
  type AppDataSnapshot,
} from "@/lib/services/app-data";
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

  const applySnapshot = useCallback((snapshot: AppDataSnapshot) => {
    setProducts(snapshot.products);
    setSettings(snapshot.settings);
    setRoutines(snapshot.routines);
    setConflicts(snapshot.conflicts);
  }, []);

  const refresh = useCallback(async () => {
    const snapshot = await refreshAppData();
    applySnapshot(snapshot);
    setLoading(false);
  }, [applySnapshot]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const snapshot = await refreshAppData();
      if (cancelled) return;
      applySnapshot(snapshot);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [applySnapshot]);

  const addProductFromLookup = useCallback(
    async (lookup: ProductLookupResult) => {
      const { product, snapshot } = await addProductFromLookupService(lookup);
      applySnapshot(snapshot);
      return product;
    },
    [applySnapshot],
  );

  const removeProduct = useCallback(
    async (id: string) => {
      const snapshot = await removeProductById(id);
      applySnapshot(snapshot);
    },
    [applySnapshot],
  );

  const updateSettings = useCallback(
    async (next: AppSettings) => {
      const snapshot = await updateAppSettings(next);
      applySnapshot(snapshot);
    },
    [applySnapshot],
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
