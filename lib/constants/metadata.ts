import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_URL } from "./site";

export const SITE_NAME = "Skincare for You";

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "skincare routine",
    "ingredient conflicts",
    "product shelf",
    "retinol",
    "local-first",
    "rutina de skincare",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_419",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — personal skincare routines on your device`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function createPageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      title: `${title} · ${SITE_NAME}`,
      description,
    },
  };
}

export const PAGE_METADATA = {
  home: createPageMetadata({
    title: "Today",
    description:
      "Your skin care routine for today, with ingredient interaction notes.",
  }),
  products: createPageMetadata({
    title: "Products",
    description: "Your product shelf, stored locally on this device.",
  }),
  routines: createPageMetadata({
    title: "Routines",
    description:
      "Daily, weekly, and monthly routines built from your products.",
  }),
  cycle: createPageMetadata({
    title: "Body & cycle",
    description:
      "Optional menstrual, life-stage, and weight context — stored only on your device.",
  }),
  guide: createPageMetadata({
    title: "Guide",
    description:
      "Download your products, routines, and interaction notes as a PDF.",
  }),
} as const;
