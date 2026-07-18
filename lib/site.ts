/**
 * The canonical public URL of the site — single source of truth for sitemap,
 * robots, metadata, JSON-LD and llms.txt.
 *
 * Defaults to the current Vercel URL. When a custom domain (e.g. uiyard.com)
 * is connected, set NEXT_PUBLIC_SITE_URL to it in the Vercel project settings
 * and everything updates automatically — no code change needed.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://uiyard.vercel.app"
).replace(/\/$/, "");
