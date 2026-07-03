import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";

const ROUTES = ["/", "/products", "/routines", "/lifestyle"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
