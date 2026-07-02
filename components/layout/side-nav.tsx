"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/layout/app-logo";
import { APP_NAV_ITEMS, isNavItemActive } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-border bg-card/95 backdrop-blur-sm lg:flex">
      <div className="px-6 py-8">
        <Link
          href="/"
          className="inline-flex rounded-md outline-offset-4 transition-opacity hover:opacity-90"
        >
          <AppLogo />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 pb-8">
        {APP_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isNavItemActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className={cn("size-5", active && "stroke-[2.5]")} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
