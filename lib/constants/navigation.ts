import {
  Calendar,
  Download,
  Home,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface AppNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/", label: "Today", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/routines", label: "Routines", icon: Sparkles },
  { href: "/cycle", label: "Cycle", icon: Calendar },
  { href: "/guide", label: "Guide", icon: Download },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
