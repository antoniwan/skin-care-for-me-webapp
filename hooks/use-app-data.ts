"use client";

import { useCallback, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ensureSeedProducts } from "@/lib/db";
import {
  addProductFromLookup as addProductFromLookupService,
  readAppDataSnapshot,
  refreshAppData,
  removeProductById,
  updateAppSettings,
} from "@/lib/services/app-data";
import type { AppSettings, ProductLookupResult } from "@/lib/types";

export function useAppData() {
  const [seedReady, setSeedReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureSeedProducts().then(() => {
      if (!cancelled) setSeedReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const snapshot = useLiveQuery(() => readAppDataSnapshot());
  const loading = !seedReady || snapshot === undefined;

  const products = snapshot?.products ?? [];
  const routines = snapshot?.routines ?? [];
  const settings = snapshot?.settings ?? null;
  const conflicts = snapshot?.conflicts ?? [];

  const refresh = useCallback(async () => {
    await refreshAppData();
  }, []);

  const addProductFromLookup = useCallback(
    async (lookup: ProductLookupResult) => {
      return addProductFromLookupService(lookup);
    },
    [],
  );

  const removeProduct = useCallback(async (id: string) => {
    await removeProductById(id);
  }, []);

  const updateSettings = useCallback(async (next: AppSettings) => {
    await updateAppSettings(next);
  }, []);

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
