"use client";

import { createContext, useContext } from "react";
import { useAppData } from "@/hooks/use-app-data";

type AppDataContextValue = ReturnType<typeof useAppData>;

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const value = useAppData();
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
