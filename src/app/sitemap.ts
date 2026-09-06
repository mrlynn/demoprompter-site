import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return [
    { url: base, lastModified: new Date("2026-09-06") },
    { url: `${base}/privacy`, lastModified: new Date("2026-09-06") },
    { url: `${base}/terms`, lastModified: new Date("2026-09-06") },
    { url: `${base}/cookies`, lastModified: new Date("2026-09-06") },
  ];
}
