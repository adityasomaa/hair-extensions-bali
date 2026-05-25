import type { MetadataRoute } from "next";
import { services } from "@/lib/content";

const BASE = "https://thehairextensionsbali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/tips`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gallery`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/book`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/products/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
