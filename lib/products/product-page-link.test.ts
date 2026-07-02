import { describe, expect, it } from "vitest";
import { getProductPageLabel } from "@/lib/products/product-page-link";

describe("getProductPageLabel", () => {
  it("uses an explicit label when provided", () => {
    expect(
      getProductPageLabel("https://example.com/foo", "Medicube"),
    ).toBe("Medicube");
  });

  it("maps known brand hostnames", () => {
    expect(
      getProductPageLabel(
        "https://www.clinique.com/product/1687/83690/skincare/moisturizers/foo",
      ),
    ).toBe("Clinique.com");
    expect(
      getProductPageLabel(
        "https://www.cerave.com/sunscreen/face/hydrating-mineral-sunscreen-face-lotion-spf-30",
      ),
    ).toBe("CeraVe.com");
  });
});
