export const THEME_STORAGE_KEY = "skincare-for-you-theme";

export interface ThemePalette {
  id: string;
  /** oklch hue 0–360 */
  hue: number;
  /** Preview swatch for the dial */
  swatch: string;
}

/** Curated accent hues — all use the same chroma/lightness recipe for cohesion. */
export const THEME_PALETTES: ThemePalette[] = [
  { id: "rose", hue: 12, swatch: "oklch(0.58 0.22 12)" },
  { id: "coral", hue: 28, swatch: "oklch(0.62 0.2 28)" },
  { id: "peach", hue: 52, swatch: "oklch(0.72 0.16 52)" },
  { id: "meadow", hue: 148, swatch: "oklch(0.58 0.16 148)" },
  { id: "ocean", hue: 225, swatch: "oklch(0.52 0.18 225)" },
  { id: "lavender", hue: 290, swatch: "oklch(0.58 0.2 290)" },
  { id: "berry", hue: 330, swatch: "oklch(0.55 0.22 330)" },
  { id: "blush", hue: 350, swatch: "oklch(0.62 0.19 350)" },
];

export const DEFAULT_THEME_ID = "rose";

export function getThemePalette(id: string): ThemePalette {
  return (
    THEME_PALETTES.find((p) => p.id === id) ??
    THEME_PALETTES.find((p) => p.id === DEFAULT_THEME_ID)!
  );
}

export type ThemeId = (typeof THEME_PALETTES)[number]["id"];

export function isThemeId(value: string): value is ThemeId {
  return THEME_PALETTES.some((p) => p.id === value);
}

export interface ThemeCssVars {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  ring: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarRing: string;
  chart1: string;
  glow1: string;
  glow2: string;
}

export function cssVarsForHue(hue: number): ThemeCssVars {
  const h2 = (hue + 38) % 360;
  return {
    primary: `oklch(0.54 0.22 ${hue})`,
    primaryForeground: `oklch(0.99 0.005 ${hue})`,
    secondary: `oklch(0.94 0.025 ${hue})`,
    secondaryForeground: `oklch(0.32 0.06 ${hue})`,
    ring: `oklch(0.54 0.22 ${hue})`,
    sidebarPrimary: `oklch(0.54 0.22 ${hue})`,
    sidebarPrimaryForeground: `oklch(0.99 0.005 ${hue})`,
    sidebarAccent: `oklch(0.96 0.02 ${hue})`,
    sidebarAccentForeground: `oklch(0.32 0.06 ${hue})`,
    sidebarRing: `oklch(0.54 0.22 ${hue})`,
    chart1: `oklch(0.54 0.22 ${hue})`,
    glow1: `oklch(0.92 0.06 ${hue} / 0.22)`,
    glow2: `oklch(0.9 0.04 ${h2} / 0.12)`,
  };
}
