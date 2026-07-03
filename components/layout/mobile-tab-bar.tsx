"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "@/components/layout/nav-item";
import { APP_NAV_ITEMS, isNavItemActive } from "@/lib/constants/navigation";

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg items-stretch px-1">
        {APP_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={isNavItemActive(pathname, item.href)}
            variant="tab"
          />
        ))}
      </div>
    </nav>
  );
}
