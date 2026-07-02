import type { ConflictWarning } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getSeverityStyle } from "./severity-styles";

export function InteractionDetail({ warning }: { warning: ConflictWarning }) {
  const style = getSeverityStyle(warning.conflict.severity);

  return (
    <div className="space-y-2 rounded-xl border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("text-[10px] capitalize", style.chip)}>
          {warning.conflict.severity}
        </Badge>
        <span className="text-sm font-medium leading-snug">
          {warning.productA.name}
          <span className="font-normal text-muted-foreground"> + </span>
          {warning.productB.name}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{warning.conflict.reason}</p>
      <p className="text-xs leading-relaxed">{warning.conflict.guidance}</p>
    </div>
  );
}
