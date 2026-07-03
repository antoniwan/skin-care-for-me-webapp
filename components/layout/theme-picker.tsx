"use client";

import { Check } from "lucide-react";
import { useTheme, THEME_PALETTES } from "@/components/providers/theme-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function ThemePicker({
  className,
  variant = "compact",
}: {
  className?: string;
  /** `labeled` — larger swatches with names (mobile sheet). */
  variant?: "compact" | "labeled";
}) {
  const { themeId, setThemeId } = useTheme();
  const { t } = useTranslation();

  if (variant === "labeled") {
    return (
      <div
        className={cn("grid grid-cols-4 gap-x-2 gap-y-4", className)}
        role="listbox"
        aria-label={t("theme.dialTitle")}
      >
        {THEME_PALETTES.map((item) => {
          const selected = item.id === themeId;
          return (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={selected}
              aria-label={t(`theme.palettes.${item.id}`)}
              onClick={() => setThemeId(item.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl p-2 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !selected && "hover:bg-muted/60",
              )}
            >
              <span
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-full border-2 border-background shadow-md transition-transform",
                  selected && "ring-2 ring-primary ring-offset-2 ring-offset-muted/30",
                )}
                style={{ background: item.swatch }}
              >
                {selected ? (
                  <Check
                    className="size-5 text-white drop-shadow-sm"
                    strokeWidth={3}
                    aria-hidden
                  />
                ) : null}
              </span>
              <span
                className={cn(
                  "max-w-full truncate text-center text-[11px] font-semibold leading-tight",
                  selected ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t(`theme.palettes.${item.id}`)}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("grid grid-cols-4 gap-2.5", className)}
      role="listbox"
      aria-label={t("theme.dialTitle")}
    >
      {THEME_PALETTES.map((item) => {
        const selected = item.id === themeId;
        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={selected}
            aria-label={t(`theme.palettes.${item.id}`)}
            onClick={() => setThemeId(item.id)}
            className={cn(
              "aspect-square rounded-full border-2 border-background shadow-sm transition-transform",
              "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected && "scale-105 ring-2 ring-foreground/25",
            )}
            style={{ background: item.swatch }}
          />
        );
      })}
    </div>
  );
}
