export const SEVERITY_STYLES = {
  avoid: {
    accent: "bg-destructive",
    surface: "bg-destructive/6",
    trigger: "bg-destructive/8 hover:bg-destructive/12",
    badge: "bg-destructive/15 text-destructive",
    dot: "bg-destructive",
    label: "Avoid layering",
  },
  caution: {
    accent: "bg-amber-500",
    surface: "bg-amber-500/8",
    trigger: "bg-amber-500/10 hover:bg-amber-500/15",
    badge: "bg-amber-500/15 text-amber-950 dark:text-amber-100",
    dot: "bg-amber-500",
    label: "Use with care",
  },
  separate: {
    accent: "bg-muted-foreground/70",
    surface: "bg-muted/50",
    trigger: "bg-muted/60 hover:bg-muted/80",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Separate timing",
  },
} as const;

export type ConflictSeverity = keyof typeof SEVERITY_STYLES;

export function getSeverityStyle(severity: ConflictSeverity) {
  return SEVERITY_STYLES[severity];
}
