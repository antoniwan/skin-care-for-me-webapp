import { describe, expect, it } from "vitest";
import {
  collectLifeStageGuidance,
  getBodyContextSnapshot,
} from "@/lib/body-context/snapshot";
import {
  lifeStageFlagsFromLegacy,
  normalizeLifeStageFlags,
  reconcileLifeStageFlags,
} from "@/lib/body-context/life-stage";
import { DEFAULT_BODY_CONTEXT, DEFAULT_LIFE_STAGE_FLAGS } from "@/lib/body-context/defaults";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

const t = createTranslator(getMessages("en"));

describe("normalizeLifeStageFlags", () => {
  it("migrates legacy string values", () => {
    expect(normalizeLifeStageFlags("postpartum")).toEqual({
      ...DEFAULT_LIFE_STAGE_FLAGS,
      postpartum: true,
    });
  });

  it("merges object flags", () => {
    expect(
      normalizeLifeStageFlags({
        postpartum: true,
        breastfeeding: true,
      }),
    ).toEqual({
      ...DEFAULT_LIFE_STAGE_FLAGS,
      postpartum: true,
      breastfeeding: true,
    });
  });
});

describe("reconcileLifeStageFlags", () => {
  it("clears postpartum when pregnant is turned on", () => {
    const next = reconcileLifeStageFlags(
      { ...DEFAULT_LIFE_STAGE_FLAGS, postpartum: true },
      { pregnant: true },
    );
    expect(next.pregnant).toBe(true);
    expect(next.postpartum).toBe(false);
  });
});

describe("collectLifeStageGuidance", () => {
  it("stacks postpartum and breastfeeding guidance", () => {
    const notes = collectLifeStageGuidance(
      t,
      {
        ...DEFAULT_LIFE_STAGE_FLAGS,
        postpartum: true,
        breastfeeding: true,
      },
      4,
    );

    expect(notes.some((n) => n.includes("Postpartum week 4"))).toBe(true);
    expect(notes.some((n) => n.includes("Breastfeeding mode"))).toBe(true);
    expect(
      notes.some((n) => n.includes("Postpartum and breastfeeding together")),
    ).toBe(true);
  });
});

describe("lifeStageFlagsFromLegacy", () => {
  it("maps breastfeeding without postpartum", () => {
    expect(lifeStageFlagsFromLegacy("breastfeeding").breastfeeding).toBe(true);
    expect(lifeStageFlagsFromLegacy("breastfeeding").postpartum).toBe(false);
  });
});

describe("getBodyContextSnapshot factors", () => {
  it("lists separate active factors for postpartum and breastfeeding", () => {
    const snapshot = getBodyContextSnapshot(
      {
        ...DEFAULT_BODY_CONTEXT,
        enabled: true,
        lifeStage: {
          ...DEFAULT_LIFE_STAGE_FLAGS,
          postpartum: true,
          breastfeeding: true,
        },
        postpartumWeeks: 2,
      },
      t,
    );

    expect(snapshot.activeFactors.length).toBe(2);
    expect(snapshot.activeFactors.some((f) => f.includes("Postpartum"))).toBe(
      true,
    );
    expect(
      snapshot.activeFactors.some((f) => f.includes("Breastfeeding")),
    ).toBe(true);
  });
});
