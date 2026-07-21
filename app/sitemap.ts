import type { MetadataRoute } from "next";
import { liveTools } from "@/lib/tools";
import { allPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/request`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/whats-growing`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ...allPosts().map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...liveTools.map((tool) => ({
      url: `${BASE}/tools/${tool.slug}`,
      lastModified: new Date(tool.addedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
