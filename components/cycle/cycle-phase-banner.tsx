import type { CyclePhase } from "@/lib/types";
import {
  CYCLE_PHASE_LABELS,
  CYCLE_SKIN_NOTES,
} from "@/lib/cycle/phases";
import { Card, CardContent } from "@/components/ui/card";

interface CyclePhaseBannerProps {
  phase: CyclePhase;
  cycleDay: number | null;
  prefix?: string;
}

export function CyclePhaseBanner({
  phase,
  cycleDay,
  prefix = "",
}: CyclePhaseBannerProps) {
  if (phase === "none") return null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-4">
        <p className="text-sm font-medium text-primary">
          {prefix}
          {CYCLE_PHASE_LABELS[phase]}
          {cycleDay ? ` · Day ${cycleDay}` : ""}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {CYCLE_SKIN_NOTES[phase]}
        </p>
      </CardContent>
    </Card>
  );
}
