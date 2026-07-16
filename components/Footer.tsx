import Link from "next/link";
import {
  categories,
  categoryOrder,
  liveCountIn,
  toolsInCategory,
} from "@/lib/tools";
import Logo from "@/components/Logo";
import Mascot from "@/components/Mascot";

export default function Footer() {
  const columns = categoryOrder.filter((cat) => liveCountIn(cat) > 0);

  return (
    <footer className="relative border-t border-line bg-surface-2">
      {/* Sprout, off duty */}
      <div className="pointer-events-none absolute -top-[52px] right-6 sm:right-12">
        <Mascot className="h-14 w-auto" mood="sleep" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="col-span-2 max-w-xs sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-accent" />
              <span className="text-lg font-bold tracking-tight">UIYard</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Grown with care in the yard. Free tools for designers and
              developers — no signup, no uploads, no ads.
            </p>
            <a
              href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
              className="mt-4 inline-block text-sm font-medium text-accent transition-opacity hover:opacity-75"
            >
              🌱 Request a tool →
            </a>
          </div>

          {columns.map((cat) => {
            const meta = categories[cat];
            const items = toolsInCategory(cat).filter((t) => t.status === "live");
            return (
              <div key={cat}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {items.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted sm:px-6">
          <span>© {new Date().getFullYear()} UIYard · Grown with care in the yard</span>
          <span className="flex gap-5">
            <Link href="/tools" className="transition-colors hover:text-foreground">
              All tools
            </Link>
            <Link href="/whats-growing" className="transition-colors hover:text-foreground">
              What&apos;s growing
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
