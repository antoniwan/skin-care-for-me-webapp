"use client";

import { usePathname } from "next/navigation";
import { AppPreferences } from "@/components/layout/app-preferences";
import { useTranslation } from "@/components/providers/locale-provider";
import { getActiveNavItem } from "@/lib/constants/navigation";

export function MobileTopBar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const active = getActiveNavItem(pathname);

  return (
    <header className="sticky top-0 z-30 grid h-14 grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 border-b border-border/80 bg-background/80 px-3 backdrop-blur-xl lg:hidden">
      <div aria-hidden />
      <h1 className="truncate text-center font-heading text-base font-semibold tracking-tight text-foreground">
        {t(active.labelKey)}
      </h1>
      <div className="flex justify-end">
        <AppPreferences />
      </div>
    </header>
  );
}
