"use client";

import Link from "next/link";
import type { AppNavItem } from "@/lib/constants/navigation";
import { useTranslation } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

interface NavItemProps extends AppNavItem {
  active: boolean;
  variant: "sidebar" | "tab";
}

export function NavItem({
  href,
  labelKey,
  icon: Icon,
  active,
  variant,
}: NavItemProps) {
  const { t } = useTranslation();
  const label = t(labelKey);

  if (variant === "sidebar") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        )}
      >
        {active ? (
          <span
            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
            aria-hidden
          />
        ) : null}
        <Icon
          className={cn(
            "size-5 shrink-0 transition-transform",
            active ? "stroke-[2.25]" : "stroke-[1.75]",
          )}
          aria-hidden
        />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-[3.25rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 pt-2 pb-1.5",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
      )}
    >
      {active ? (
        <span
          className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary"
          aria-hidden
        />
      ) : null}
      <Icon
        className={cn(
          "size-[1.375rem] shrink-0 transition-colors",
          active ? "text-primary stroke-[2.25]" : "text-muted-foreground stroke-[1.75]",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "max-w-full truncate text-[11px] font-semibold leading-tight",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </Link>
  );
}
