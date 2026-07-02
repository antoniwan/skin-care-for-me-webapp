import type { CyclePhase, LifeStage, WeightChange } from "@/lib/types";

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
  none: "",
};

export const LIFE_STAGE_LABELS: Record<LifeStage, string> = {
  none: "Not specified",
  pregnant: "Pregnant",
  postpartum: "Postpartum",
  breastfeeding: "Breastfeeding",
  perimenopause: "Perimenopause",
  menopause: "Menopause",
};

export const LIFE_STAGE_DESCRIPTIONS: Record<LifeStage, string> = {
  none: "No life-stage adjustments beyond your other settings.",
  pregnant:
    "Retinoids and some strong acids are held from routines. Barrier care is prioritized.",
  postpartum:
    "Early weeks favor gentle care; actives are reintroduced gradually as you heal.",
  breastfeeding:
    "Similar caution to pregnancy for retinoids until you and your clinician agree.",
  perimenopause:
    "Hydration and barrier support help as hormones shift.",
  menopause: "Focus on moisture retention and gentle, consistent actives.",
};

export const WEIGHT_CHANGE_LABELS: Record<WeightChange, string> = {
  stable: "Mostly stable",
  gaining: "Gaining recently",
  losing: "Losing recently",
  prefer_not_to_say: "Prefer not to say",
};

export const WEIGHT_CHANGE_NOTES: Record<
  Exclude<WeightChange, "prefer_not_to_say" | "stable">,
  string
> = {
  gaining:
    "Rapid changes can stress skin — prioritize barrier repair and hydration.",
  losing:
    "Weight loss can affect skin elasticity — keep moisture and SPF consistent.",
};
