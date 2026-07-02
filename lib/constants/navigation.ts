import {
  Calendar,
  Home,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface AppNavItem {
  href: string;
  labelKey: "nav.today" | "nav.products" | "nav.routines" | "nav.body";
  icon: LucideIcon;
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/", labelKey: "nav.today", icon: Home },
  { href: "/products", labelKey: "nav.products", icon: Package },
  { href: "/routines", labelKey: "nav.routines", icon: Sparkles },
  { href: "/cycle", labelKey: "nav.body", icon: Calendar },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
