import type { MetadataRoute } from "next";
import { serviceLandings, locationLandings } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://barberiasilverfox.com";
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceLandings.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/ubicaciones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...locationLandings.map((l) => ({
      url: `${base}/ubicaciones/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
