export const SEVERITY_STYLES = {
  avoid: {
    chip: "border-destructive/25 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    label: "Avoid layering",
  },
  caution: {
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-900",
    dot: "bg-amber-500",
    label: "Use with care",
  },
  separate: {
    chip: "border-border bg-muted/60 text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Separate timing",
  },
} as const;

export type ConflictSeverity = keyof typeof SEVERITY_STYLES;

export function getSeverityStyle(severity: ConflictSeverity) {
  return SEVERITY_STYLES[severity];
}
