import Link from "next/link";
import { featuredTools, liveTools } from "@/lib/tools";
import Logo from "@/components/Logo";
import CookieSettingsLink from "@/components/CookieSettingsLink";

export default function Footer() {
  const year = new Date().getFullYear();
  const popular = featuredTools.slice(0, 6);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 max-w-xs sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-brand" />
              <span className="text-lg font-bold tracking-tight">UIYard</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A growing yard of free tools for designers and developers. No
              signup, no uploads, no ads.
            </p>
            <Link
              href="/roadmap"
              className="mt-4 inline-block text-sm font-medium text-accent transition-opacity hover:opacity-75"
            >
              See the roadmap →
            </Link>
          </div>

          {/* Popular tools */}
          <nav aria-label="Popular tools">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Popular
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {popular.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools"
                  className="text-sm font-medium text-accent transition-opacity hover:opacity-75"
                >
                  All tools →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Project */}
          <nav aria-label="Project">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Project
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about" className="text-muted transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/whats-growing" className="text-muted transition-colors hover:text-foreground">
                  What&apos;s growing
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted transition-colors hover:text-foreground">
                  Roadmap
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Legal
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted transition-colors hover:text-foreground">
                  Privacy &amp; Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted transition-colors hover:text-foreground">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <CookieSettingsLink className="cursor-pointer text-muted transition-colors hover:text-foreground" />
              </li>
            </ul>
          </nav>
        </div>

        {/* Giant ghost wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none pt-10 text-center font-display font-bold leading-none tracking-tight text-foreground/[0.04]"
          style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
        >
          UIYard
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 font-mono text-xs text-muted sm:px-6">
          <span>© {year} UIYard</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {liveTools.length} tools live · free forever
          </span>
          <span>Made with care 🌱</span>
        </div>
      </div>
    </footer>
  );
}
