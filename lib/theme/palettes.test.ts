import { describe, expect, it } from "vitest";
import { cssVarsForHue } from "@/lib/theme/palettes";
import { DEFAULT_THEME_ID, getThemePalette, isThemeId } from "@/lib/theme/palettes";

describe("theme palettes", () => {
  it("resolves default rose theme", () => {
    expect(getThemePalette("unknown").id).toBe(DEFAULT_THEME_ID);
  });

  it("validates theme ids", () => {
    expect(isThemeId("ocean")).toBe(true);
    expect(isThemeId("nope")).toBe(false);
  });

  it("generates oklch primary from hue", () => {
    const vars = cssVarsForHue(225);
    expect(vars.primary).toContain("225");
    expect(vars.glow1).toContain("/ 0.22");
  });
});
