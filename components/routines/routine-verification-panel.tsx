"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
} from "lucide-react";
import type { RoutineVerification } from "@/lib/routines/verification";
import { cn } from "@/lib/utils";

export const ROUTINE_SAFETY_CHECK_TITLE = "Safety check";

export function RoutineVerificationPanel({
  verification,
}: {
  verification: RoutineVerification;
}) {
  const passedCount = verification.checks.filter((c) => c.passed).length;
  const [open, setOpen] = useState(!verification.allPassed);

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
              {ROUTINE_SAFETY_CHECK_TITLE}
            </p>
            {verification.allPassed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                <CheckCircle2 className="size-3.5" />
                All clear
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                <CircleAlert className="size-3.5" />
                Review suggested
              </span>
            )}
          </div>
          {!open && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {passedCount} of {verification.checks.length} checks passed · tap
              to see details
            </p>
          )}
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border/80 px-3 pb-3 pt-2">
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
                Layering tips
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
      )}
    </div>
  );
}
