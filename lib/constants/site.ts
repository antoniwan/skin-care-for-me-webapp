/** Public site URL — set `NEXT_PUBLIC_SITE_URL` in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_NAME = "Skincare for You";

/** ~55 characters — default SERP / share title. */
export const SITE_TITLE =
  "Skincare for You — Daily Routines & Ingredient Safety";

/** ~140 characters — default meta description. */
export const SITE_DESCRIPTION =
  "Build your skincare shelf, get daily AM and PM routines, and spot ingredient conflicts before you layer. Private, local-first — data stays on your device.";

export const OG_IMAGE_PATH = "/og.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function ogImageAlt(): string {
  return `${SITE_NAME} — personal skincare routines on your device`;
}
