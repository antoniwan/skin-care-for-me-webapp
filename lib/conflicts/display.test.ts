import { describe, expect, it } from "vitest";
import {
  getOtherProductName,
  groupWarningsByProduct,
  highestSeverity,
  sortWarningsBySeverity,
} from "@/lib/conflicts/display";
import { makeProduct } from "@/lib/test/fixtures";
import type { ConflictWarning } from "@/lib/types";

function makeWarning(
  overrides: Partial<ConflictWarning["conflict"]> = {},
): ConflictWarning {
  return {
    productA: makeProduct({ id: "a", name: "Product A" }),
    productB: makeProduct({ id: "b", name: "Product B" }),
    conflict: {
      id: "retinol-vitamin-c",
      ingredientA: "retinol",
      ingredientB: "vitamin c",
      severity: "separate",
      reason: "test",
      guidance: "test",
      ...overrides,
    },
  };
}

describe("sortWarningsBySeverity", () => {
  it("orders avoid before caution before separate", () => {
    const sorted = sortWarningsBySeverity([
      makeWarning({ severity: "separate" }),
      makeWarning({ severity: "avoid" }),
      makeWarning({ severity: "caution" }),
    ]);

    expect(sorted.map((w) => w.conflict.severity)).toEqual([
      "avoid",
      "caution",
      "separate",
    ]);
  });
});

describe("highestSeverity", () => {
  it("returns null for empty list", () => {
    expect(highestSeverity([])).toBeNull();
  });
});

describe("getOtherProductName", () => {
  it("returns the paired product name", () => {
    const warning = makeWarning();
    expect(getOtherProductName(warning, "a")).toBe("Product B");
  });
});

describe("groupWarningsByProduct", () => {
  it("indexes warnings by both product ids", () => {
    const warning = makeWarning();
    const grouped = groupWarningsByProduct([warning]);

    expect(grouped.get("a")).toHaveLength(1);
    expect(grouped.get("b")).toHaveLength(1);
  });
});
