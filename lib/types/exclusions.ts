import type { CyclePhase } from "./cycle";

/** Machine-readable exclusion reason — localized at display time. */
export type ProductExclusionReason =
  | { kind: "pregnancy" }
  | { kind: "postpartum" }
  | { kind: "menstrual"; phase: CyclePhase }
  | { kind: "body-default" }
  | { kind: "ingredient"; ruleId: string };
