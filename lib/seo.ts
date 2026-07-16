import type { Metadata } from "next";
import { getTool } from "@/lib/tools";

export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.seoTitle} | UIYard`,
      description: tool.seoDescription,
      url: `/tools/${tool.slug}`,
      siteName: "UIYard",
      type: "website",
    },
  };
}
