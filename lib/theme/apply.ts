import {
  cssVarsForHue,
  getThemePalette,
  type ThemePalette,
} from "./palettes";

const ROOT_VAR_MAP: Record<string, keyof ReturnType<typeof cssVarsForHue>> = {
  "--primary": "primary",
  "--primary-foreground": "primaryForeground",
  "--secondary": "secondary",
  "--secondary-foreground": "secondaryForeground",
  "--ring": "ring",
  "--sidebar-primary": "sidebarPrimary",
  "--sidebar-primary-foreground": "sidebarPrimaryForeground",
  "--sidebar-accent": "sidebarAccent",
  "--sidebar-accent-foreground": "sidebarAccentForeground",
  "--sidebar-ring": "sidebarRing",
  "--chart-1": "chart1",
  "--theme-glow-1": "glow1",
  "--theme-glow-2": "glow2",
};

export function applyThemePalette(palette: ThemePalette): void {
  if (typeof document === "undefined") return;

  const vars = cssVarsForHue(palette.hue);
  const root = document.documentElement;

  for (const [cssVar, key] of Object.entries(ROOT_VAR_MAP)) {
    root.style.setProperty(cssVar, vars[key]);
  }

  root.dataset.theme = palette.id;
}

export function applyThemeById(themeId: string): ThemePalette {
  const palette = getThemePalette(themeId);
  applyThemePalette(palette);
  return palette;
}
