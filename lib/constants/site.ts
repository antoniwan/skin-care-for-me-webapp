/** Public site URL — set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://skincareforyou.app). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_DESCRIPTION =
  "Personal skin care routines, ingredient checks, and body-aware guidance — stored on your device.";
