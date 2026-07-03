"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { applyThemeById } from "@/lib/theme/apply";
import {
  DEFAULT_THEME_ID,
  getThemePalette,
  isThemeId,
  THEME_PALETTES,
  THEME_STORAGE_KEY,
  type ThemePalette,
} from "@/lib/theme/palettes";

interface ThemeContextValue {
  themeId: string;
  palette: ThemePalette;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredThemeId(): string {
  if (typeof window === "undefined") return DEFAULT_THEME_ID;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored && isThemeId(stored) ? stored : DEFAULT_THEME_ID;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState(readStoredThemeId);

  useEffect(() => {
    applyThemeById(themeId);
  }, [themeId]);

  const setThemeId = useCallback((id: string) => {
    const next = isThemeId(id) ? id : DEFAULT_THEME_ID;
    setThemeIdState(next);
    applyThemeById(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  const palette = useMemo(() => getThemePalette(themeId), [themeId]);

  const value = useMemo(
    () => ({ themeId, palette, setThemeId }),
    [themeId, palette, setThemeId],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export { THEME_PALETTES };
