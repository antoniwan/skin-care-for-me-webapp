"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "@/components/providers/locale-provider";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className={cn("flex items-center gap-1", className)}
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
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
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
