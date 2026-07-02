import { describe, expect, it } from "vitest";
import { buildAmazonAffiliateUrl, hasAmazonAffiliateTag } from "@/lib/products/affiliate";

describe("buildAmazonAffiliateUrl", () => {
  it("returns a plain Amazon URL without a tag", () => {
    expect(buildAmazonAffiliateUrl("B002RBTB8C")).toBe(
      "https://www.amazon.com/dp/B002RBTB8C",
    );
  });
});

describe("hasAmazonAffiliateTag", () => {
  it("is false when no tag is configured", () => {
    expect(hasAmazonAffiliateTag()).toBe(false);
  });
});
