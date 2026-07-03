"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { useTheme, THEME_PALETTES } from "@/components/providers/theme-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

const DIAL_RADIUS = 76;
const SWATCH_SIZE = 32;

function polarPosition(index: number, total: number) {
  const angle = (index / total) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * DIAL_RADIUS,
    y: Math.sin(rad) * DIAL_RADIUS,
    angle,
  };
}

export function ThemeDial({ className }: { className?: string }) {
  const { themeId, palette, setThemeId } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const activeIndex = THEME_PALETTES.findIndex((p) => p.id === themeId);
  const spinDeg =
    activeIndex >= 0 ? -(activeIndex / THEME_PALETTES.length) * 360 : 0;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectTheme(id: string) {
    setThemeId(id);
    window.setTimeout(() => setOpen(false), 380);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t("theme.openDial")}
        className={cn(
          "group relative flex size-9 items-center justify-center rounded-full border border-border/80 bg-card shadow-sm transition-all duration-300",
          "hover:scale-105 hover:shadow-md active:scale-95",
          open && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
        )}
      >
        <span
          className="absolute inset-1 rounded-full opacity-90 transition-[background] duration-500 ease-out"
          style={{ background: palette.swatch }}
          aria-hidden
        />
        <span
          className="absolute inset-0 rounded-full bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <Palette
          className="relative z-10 size-4 text-primary-foreground drop-shadow-sm"
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-label={t("theme.dialTitle")}
        className={cn(
          "absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2",
          "origin-bottom transition-all duration-300 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0",
        )}
      >
        <div className="relative rounded-3xl border border-border/70 bg-card/95 p-4 shadow-xl backdrop-blur-md">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("theme.dialTitle")}
          </p>

          <div className="relative mx-auto size-[196px]">
            {/* Fixed pointer at top */}
            <div
              className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-0.5"
              aria-hidden
            >
              <div className="size-2 rotate-45 rounded-sm bg-foreground/80 shadow-sm" />
            </div>

            {/* Spinning color ring */}
            <div
              className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
              style={{ transform: `rotate(${spinDeg}deg)` }}
            >
              {THEME_PALETTES.map((item, index) => {
                const { x, y } = polarPosition(index, THEME_PALETTES.length);
                const selected = item.id === themeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={t(`theme.palettes.${item.id}`)}
                    onClick={() => selectTheme(item.id)}
                    className={cn(
                      "absolute left-1/2 top-1/2 rounded-full border-2 border-white/80 shadow-md transition-all duration-300",
                      "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected ? "z-10 scale-125 ring-2 ring-foreground/25" : "scale-100",
                    )}
                    style={{
                      width: SWATCH_SIZE,
                      height: SWATCH_SIZE,
                      marginLeft: -SWATCH_SIZE / 2,
                      marginTop: -SWATCH_SIZE / 2,
                      transform: `translate(${x}px, ${y}px)`,
                      background: item.swatch,
                    }}
                    aria-label={t(`theme.palettes.${item.id}`)}
                    aria-pressed={selected}
                  />
                );
              })}
            </div>

            {/* Center hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-[72px] flex-col items-center justify-center rounded-full border border-border/60 bg-background/90 shadow-inner">
                <span
                  className="size-5 rounded-full border border-white/60 shadow-sm transition-[background] duration-500"
                  style={{ background: palette.swatch }}
                  aria-hidden
                />
                <span className="mt-1 max-w-[4.5rem] truncate text-[10px] font-semibold text-foreground/80">
                  {t(`theme.palettes.${themeId}`)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
