import type { MetadataRoute } from "next";
import { liveTools } from "@/lib/tools";

const BASE = "https://uiyard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/whats-growing`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.3 },
    ...liveTools.map((tool) => ({
      url: `${BASE}/tools/${tool.slug}`,
      lastModified: new Date(tool.addedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
