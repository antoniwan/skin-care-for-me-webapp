import type { Metadata } from "next";

export const SITE_NAME = "Skincare for You";

export const ROOT_METADATA: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Personal skin care routines, ingredient checks, and cycle-aware guidance — stored on your device.",
};

export function createPageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return { title, description };
}

export const PAGE_METADATA = {
  home: createPageMetadata({
    title: "Today",
    description: "Your skin care routine for today, with ingredient interaction notes.",
  }),
  products: createPageMetadata({
    title: "Products",
    description: "Your product shelf, stored locally on this device.",
  }),
  routines: createPageMetadata({
    title: "Routines",
    description: "Daily, weekly, and monthly routines built from your products.",
  }),
  cycle: createPageMetadata({
    title: "Cycle",
    description: "Optional cycle tracking to adapt routines by phase.",
  }),
  guide: createPageMetadata({
    title: "Guide",
    description: "Download your products, routines, and interaction notes as a PDF.",
  }),
} as const;
