import type { Metadata } from "next";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  ogImageAlt,
} from "./site";

export { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "./site";

const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
  alt: ogImageAlt(),
  type: "image/png" as const,
};

function buildSocialMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(path);

  return {
    openGraph: {
      type: "website",
      locale: "es_419",
      alternateLocale: ["en_US"],
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
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
  ...buildSocialMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
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
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
}): Metadata {
  const socialTitle = absoluteTitle ?? `${title} · ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...buildSocialMetadata({
      title: socialTitle,
      description,
      path,
    }),
  };
}

export const PAGE_METADATA = {
  home: createPageMetadata({
    title: "Today",
    absoluteTitle: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  products: createPageMetadata({
    title: "Products",
    description:
      "Your curated skincare shelf with photos, brand links, and shop links. Products and settings are stored locally on this device — no account required.",
    path: "/products",
  }),
  routines: createPageMetadata({
    title: "Routines",
    description:
      "Daily, weekly, and monthly skincare routines built automatically from your shelf. Open any routine for ordered steps, ingredient interaction notes, and safety checks.",
    path: "/routines",
  }),
  lifestyle: createPageMetadata({
    title: "Lifestyle",
    description:
      "Optional cycle, life-stage, skin, and wellness context to adapt routines and guidance. Everything stays in your browser — never sent to our servers.",
    path: "/lifestyle",
  }),
  guide: createPageMetadata({
    title: "Guide",
    description:
      "Download a printable PDF of your product shelf, routines, ingredient interactions, and body context notes. Generated entirely on your device.",
    path: "/routines",
  }),
} as const;
