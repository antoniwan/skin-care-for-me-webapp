import type { BodyContextSettings } from "@/lib/types";

export const DEFAULT_BODY_CONTEXT: BodyContextSettings = {
  enabled: false,
  menstrual: {
    enabled: false,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: null,
  },
  lifeStage: "none",
  postpartumWeeks: null,
  weight: {
    enabled: false,
    recentChange: "prefer_not_to_say",
  },
};
