export {
  getCurrentCyclePhase,
  getCycleDay,
  getBodyContextSnapshot,
  getBodyContextCore,
  type BodyContextSnapshot,
  type BodyContextCore,
} from "./snapshot";

export {
  shouldIncludeProductInRoutine,
  getProductExclusionReason,
  getBodyContextProductExclusions,
} from "./routine-rules";

export { normalizeAppSettings, normalizeBodyContext } from "./migrate";

export { DEFAULT_BODY_CONTEXT } from "./defaults";

export {
  CYCLE_PHASE_LABELS,
  CYCLE_SKIN_NOTES,
  LIFE_STAGE_LABELS,
  LIFE_STAGE_DESCRIPTIONS,
  WEIGHT_CHANGE_LABELS,
  WEIGHT_CHANGE_NOTES,
} from "./labels";
