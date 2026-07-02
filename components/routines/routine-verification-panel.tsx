"use client";

import { AlertCircle, CheckCircle2, CircleAlert } from "lucide-react";
import type { RoutineVerification } from "@/lib/routines/verification";
import { cn } from "@/lib/utils";

export function RoutineVerificationPanel({
  verification,
}: {
  verification: RoutineVerification;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Triple-checked
        </p>
        {verification.allPassed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <CheckCircle2 className="size-3.5" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
            <CircleAlert className="size-3.5" />
            Needs review
          </span>
        )}
      </div>

      <ul className="space-y-2">
        {verification.checks.map((check) => (
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

      {verification.reviewNotes.length > 0 && (
        <div className="border-t border-border/80 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Layering notes
          </p>
          <ul className="mt-2 space-y-1.5">
            {verification.reviewNotes.map((note) => (
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
  );
}
