"use client";

import { AppShell } from "@/components/layout/app-shell";
import { AppDataProvider } from "@/components/providers/app-data-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AppDataProvider>
        <AppShell>{children}</AppShell>
      </AppDataProvider>
    </LocaleProvider>
  );
}
