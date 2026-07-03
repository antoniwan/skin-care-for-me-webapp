"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "@/components/providers/locale-provider";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  className,
  variant = "compact",
  size = "default",
}: {
  className?: string;
  variant?: "compact" | "segmented";
  size?: "default" | "large";
}) {
  const { locale, setLocale, t } = useTranslation();

  if (variant === "segmented") {
    return (
      <div
        className={cn("flex rounded-xl bg-muted p-1", className)}
        role="group"
        aria-label={t("language.label")}
      >
        {LOCALES.map((code) => {
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code as Locale)}
              className={cn(
                "flex-1 rounded-lg font-semibold transition-all",
                size === "large" ? "px-3 py-3 text-sm" : "px-3 py-2 text-sm",
                active
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={active}
            >
              {LOCALE_LABELS[code]}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="group"
      aria-label={t("language.label")}
    >
      <Languages className="size-4 text-muted-foreground" aria-hidden />
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
