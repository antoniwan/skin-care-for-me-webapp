"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Languages, Palette, Settings2, X } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemePicker } from "@/components/layout/theme-picker";
import { useTranslation } from "@/components/providers/locale-provider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function PreferenceCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-muted/30 p-4">
      <div className="mb-4 flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-foreground/70 shadow-sm">
          <Icon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-heading text-sm font-semibold text-foreground">
            {title}
          </h3>
          {description ? (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function PreferencesPanel({ variant }: { variant: "mobile" | "desktop" }) {
  const { t } = useTranslation();
  const isMobile = variant === "mobile";

  return (
    <div className={cn("space-y-4", isMobile && "space-y-3")}>
      <PreferenceCard
        icon={Palette}
        title={t("preferences.themeSection")}
        description={isMobile ? t("preferences.themeHelp") : undefined}
      >
        <ThemePicker variant={isMobile ? "labeled" : "compact"} />
      </PreferenceCard>

      <PreferenceCard
        icon={Languages}
        title={t("preferences.languageSection")}
        description={isMobile ? t("preferences.languageHelp") : undefined}
      >
        <LanguageToggle
          variant="segmented"
          className={isMobile ? "p-1.5" : undefined}
          size={isMobile ? "large" : "default"}
        />
      </PreferenceCard>
    </div>
  );
}

function DesktopPreferencesMenu({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    let removeListeners: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
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
      removeListeners = () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    });

    return () => {
      cancelAnimationFrame(frame);
      removeListeners?.();
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "bg-muted text-foreground",
        )}
      >
        <Settings2 className="size-5 shrink-0" aria-hidden />
        {t("preferences.title")}
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-label={t("preferences.title")}
        aria-hidden={!open}
        className={cn(
          "absolute bottom-full left-0 z-50 mb-2 w-80 rounded-2xl border border-border bg-popover p-4 shadow-xl",
          "origin-bottom-left transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0",
        )}
      >
        <p className="mb-4 font-heading text-sm font-semibold">
          {t("preferences.title")}
        </p>
        <PreferencesPanel variant="desktop" />
      </div>
    </div>
  );
}

function MobilePreferencesSheet() {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label={t("preferences.open")}
      >
        <Settings2 className="size-5" aria-hidden />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[min(88dvh,640px)] gap-0 overflow-hidden rounded-t-[1.35rem] border-0 px-0 pb-0"
      >
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="h-1 w-10 rounded-full bg-muted-foreground/30"
            aria-hidden
          />
        </div>

        <div className="flex items-start justify-between gap-3 border-b border-border/70 px-5 pb-4 pt-2">
          <div className="min-w-0">
            <SheetTitle className="font-heading text-lg font-semibold">
              {t("preferences.title")}
            </SheetTitle>
            <SheetDescription className="mt-1 text-sm leading-relaxed">
              {t("preferences.subtitle")}
            </SheetDescription>
          </div>
          <SheetClose
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label={t("preferences.close")}
          >
            <X className="size-5" aria-hidden />
          </SheetClose>
        </div>

        <div
          className="overflow-y-auto overscroll-contain px-5 pt-4"
          style={{
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <PreferencesPanel variant="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AppPreferences({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("lg:hidden", className)}>
        <MobilePreferencesSheet />
      </div>
      <div className={cn("hidden lg:block", className)}>
        <DesktopPreferencesMenu />
      </div>
    </>
  );
}
