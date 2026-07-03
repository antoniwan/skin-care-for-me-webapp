"use client";

import { useState } from "react";
import {
  AlertCircle,
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
  const failedChecks = localized.checks.filter((check) => !check.passed);
  const hasNotes = localized.reviewNotes.length > 0;
  const hasIssues = failedChecks.length > 0 || hasNotes;

  const [open, setOpen] = useState(failedChecks.length > 0);

  if (!hasIssues) return null;

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
            {failedChecks.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                <CircleAlert className="size-3.5" />
                {t("common.reviewSuggested")}
              </span>
            )}
          </div>
          {!open && failedChecks.length > 0 && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("safetyCheck.collapsed", {
                passed: localized.checks.length - failedChecks.length,
                total: localized.checks.length,
              })}
            </p>
          )}
          {!open && failedChecks.length === 0 && hasNotes && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("conflicts.tapReview")}
            </p>
          )}
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border/80 px-3 pb-3 pt-2">
          {failedChecks.length > 0 && (
            <ul className="space-y-2">
              {failedChecks.map((check) => (
                <li key={check.id} className="flex gap-2.5">
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0 text-destructive"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-destructive">
                      {check.label}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {check.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {hasNotes && (
            <div
              className={cn(
                failedChecks.length > 0 && "border-t border-border/80 pt-3",
              )}
            >
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
