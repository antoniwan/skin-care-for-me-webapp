import type { CyclePhase, CycleSettings } from "../types";

export function getCurrentCyclePhase(
  settings: CycleSettings,
  date = new Date(),
): CyclePhase {
  if (!settings.enabled || !settings.lastPeriodStart) {
    return "none";
  }

  const start = new Date(settings.lastPeriodStart);
  const dayMs = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor(
    (date.getTime() - start.getTime()) / dayMs,
  );
  const dayInCycle =
    ((daysSinceStart % settings.cycleLength) + settings.cycleLength) %
    settings.cycleLength;

  if (dayInCycle < settings.periodLength) return "menstrual";
  if (dayInCycle < Math.floor(settings.cycleLength * 0.46)) return "follicular";
  if (dayInCycle < Math.floor(settings.cycleLength * 0.57)) return "ovulation";
  return "luteal";
}

export const CYCLE_PHASE_LABELS: Record<CyclePhase, string> = {
  menstrual: "Menstrual",
  follicular: "Follicular",
  ovulation: "Ovulation",
  luteal: "Luteal",
  none: "Not tracking",
};

export const CYCLE_SKIN_NOTES: Record<CyclePhase, string> = {
  menstrual:
    "Skin may be more sensitive. Prioritize gentle cleansing and barrier support.",
  follicular:
    "Skin often tolerates actives well. Good phase for treatments and exfoliation.",
  ovulation:
    "Oil production may increase. Lightweight hydration and consistent SPF help.",
  luteal:
    "Breakouts can flare. Consider BHA and avoid introducing harsh new actives.",
  none: "Follow your standard routine based on your products.",
};

export function getCycleDay(settings: CycleSettings, date = new Date()): number | null {
  if (!settings.enabled || !settings.lastPeriodStart) return null;
  const start = new Date(settings.lastPeriodStart);
  const dayMs = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor(
    (date.getTime() - start.getTime()) / dayMs,
  );
  return (daysSinceStart % settings.cycleLength) + 1;
}
