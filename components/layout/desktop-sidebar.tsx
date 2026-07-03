"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/layout/app-logo";
import { AppPreferences } from "@/components/layout/app-preferences";
import { NavItem } from "@/components/layout/nav-item";
import { APP_NAV_ITEMS, isNavItemActive } from "@/lib/constants/navigation";

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-card/80 backdrop-blur-xl lg:flex">
      <div className="px-5 py-6">
        <Link
          href="/"
          className="inline-flex rounded-lg outline-offset-4 transition-opacity hover:opacity-90"
        >
          <AppLogo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3" aria-label="Main">
        {APP_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={isNavItemActive(pathname, item.href)}
            variant="sidebar"
          />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <AppPreferences />
      </div>
    </aside>
  );
}
