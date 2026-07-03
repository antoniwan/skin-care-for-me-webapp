import {
  Heart,
  Home,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface AppNavItem {
  href: string;
  labelKey: "nav.today" | "nav.products" | "nav.routines" | "nav.lifestyle";
  icon: LucideIcon;
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/", labelKey: "nav.today", icon: Home },
  { href: "/products", labelKey: "nav.products", icon: Package },
  { href: "/routines", labelKey: "nav.routines", icon: Sparkles },
  { href: "/lifestyle", labelKey: "nav.lifestyle", icon: Heart },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
