"use client";

import type { LucideIcon } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSeverityStyle, type ConflictSeverity } from "./severity-styles";

interface InteractionTriggerProps {
  severity: ConflictSeverity;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick: () => void;
  className?: string;
  compact?: boolean;
}

export function InteractionTrigger({
  severity,
  icon: Icon,
  title,
  subtitle,
  onClick,
  className,
  compact = false,
}: InteractionTriggerProps) {
  const style = getSeverityStyle(severity);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-stretch overflow-hidden rounded-xl text-left transition-[transform,opacity] active:scale-[0.99]",
        className,
      )}
    >
      <span
        className={cn("w-1 shrink-0", style.accent)}
        aria-hidden
      />
      <span
        className={cn(
          "flex min-w-0 flex-1 items-center gap-3",
          compact ? "px-2.5 py-2" : "px-3 py-2.5",
          style.trigger,
        )}
      >
        <Icon
          className={cn(
            "shrink-0 opacity-80",
            compact ? "size-3.5" : "size-4",
          )}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block font-medium leading-snug",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              className={cn(
                "mt-0.5 block text-muted-foreground",
                compact ? "text-[11px]" : "text-xs",
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            "shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5",
            compact ? "text-xs" : "text-sm",
          )}
          aria-hidden
        >
          ›
        </span>
      </span>
    </button>
  );
}

export function SeverityBadge({
  severity,
  label,
  className,
}: {
  severity: ConflictSeverity;
  label: string;
  className?: string;
}) {
  const style = getSeverityStyle(severity);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        style.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
      {label}
    </span>
  );
}

export function SeveritySummary({
  warnings,
  getLabel,
  className,
}: {
  warnings: ConflictWarning[];
  getLabel: (severity: ConflictSeverity) => string;
  className?: string;
}) {
  const order: ConflictSeverity[] = ["avoid", "caution", "separate"];
  const counts = order
    .map((severity) => ({
      severity,
      count: warnings.filter((w) => w.conflict.severity === severity).length,
    }))
    .filter((item) => item.count > 0);

  if (counts.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {counts.map(({ severity, count }) => (
        <SeverityBadge
          key={severity}
          severity={severity}
          label={`${count} ${getLabel(severity)}`}
        />
      ))}
    </div>
  );
}
