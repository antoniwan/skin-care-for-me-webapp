"use client";

import { createContext, useContext, useMemo } from "react";
import { useAppData } from "@/hooks/use-app-data";
import { localizeProducts, localizeRoutines } from "@/lib/seed/localize";
import { useLocale } from "@/components/providers/locale-provider";

type AppDataContextValue = ReturnType<typeof useAppData>;

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const {
    products: rawProducts,
    routines: rawRoutines,
    settings,
    conflicts,
    loading,
    refresh,
    addProductFromLookup,
    removeProduct,
    updateSettings,
  } = useAppData();
  const { locale } = useLocale();

  const products = useMemo(
    () => localizeProducts(rawProducts, locale),
    [rawProducts, locale],
  );

  const routines = useMemo(
    () => localizeRoutines(rawRoutines, locale, products),
    [rawRoutines, locale, products],
  );

  const value = useMemo(
    () => ({
      products,
      routines,
      settings,
      conflicts,
      loading,
      refresh,
      addProductFromLookup,
      removeProduct,
      updateSettings,
    }),
    [
      products,
      routines,
      settings,
      conflicts,
      loading,
      refresh,
      addProductFromLookup,
      removeProduct,
      updateSettings,
    ],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppDataContext() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppDataContext must be used within AppDataProvider");
  }
  return ctx;
}
