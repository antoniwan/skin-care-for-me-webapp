import { describe, expect, it } from "vitest";
import { formatCategory, pluralize } from "@/lib/format";

describe("formatCategory", () => {
  it("replaces underscores with spaces", () => {
    expect(formatCategory("eye_cream")).toBe("eye cream");
  });
});

describe("pluralize", () => {
  it("returns singular for count of 1", () => {
    expect(pluralize(1, "item")).toBe("item");
  });

  it("returns plural for other counts", () => {
    expect(pluralize(3, "item")).toBe("items");
  });
});
