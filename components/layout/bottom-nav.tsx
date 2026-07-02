"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/components/providers/locale-provider";
import { APP_NAV_ITEMS, isNavItemActive } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-[0_-4px_24px_oklch(0.19_0.03_285_/_0.06)] backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-0.5 px-2 py-1.5 lg:max-w-none">
        {APP_NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
          const active = isNavItemActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className={cn("size-5", active && "stroke-[2.5]")} />
              <span>{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
