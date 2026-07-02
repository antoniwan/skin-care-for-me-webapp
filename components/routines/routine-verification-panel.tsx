"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
} from "lucide-react";
import type { RoutineVerification } from "@/lib/routines/verification";
import { useTranslation } from "@/components/providers/locale-provider";
import { localizeVerification } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

export function RoutineVerificationPanel({
  verification,
}: {
  verification: RoutineVerification;
}) {
  const { t } = useTranslation();
  const localized = localizeVerification(t, verification);
  const passedCount = localized.checks.filter((c) => c.passed).length;
  const [open, setOpen] = useState(!localized.allPassed);

  return (
    <div className="rounded-lg border border-border bg-muted/40">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 p-3 text-left"
      >
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-foreground">
              {t("safetyCheck.title")}
            </p>
            {localized.allPassed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                <CheckCircle2 className="size-3.5" />
                {t("common.allClear")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                <CircleAlert className="size-3.5" />
                {t("common.reviewSuggested")}
              </span>
            )}
          </div>
          {!open && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("safetyCheck.collapsed", {
                passed: passedCount,
                total: localized.checks.length,
              })}
            </p>
          )}
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border/80 px-3 pb-3 pt-2">
          <ul className="space-y-2">
            {localized.checks.map((check) => (
              <li key={check.id} className="flex gap-2.5">
                {check.passed ? (
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                ) : (
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0 text-destructive"
                    aria-hidden
                  />
                )}
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      check.passed ? "text-foreground" : "text-destructive",
                    )}
                  >
                    {check.label}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {check.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {localized.reviewNotes.length > 0 && (
            <div className="border-t border-border/80 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("safetyCheck.layeringTips")}
              </p>
              <ul className="mt-2 space-y-1.5">
                {localized.reviewNotes.map((note) => (
                  <li
                    key={note}
                    className="text-xs leading-relaxed text-muted-foreground before:mr-1.5 before:content-['•']"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
