import Link from "next/link";
import CategoriesMenu from "@/components/CategoriesMenu";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import Wordmark from "@/components/Wordmark";

const NAV = [
  { href: "/tools", label: "Tools", show: "sm" },
  { href: "/blog", label: "Blog", show: "sm" },
  { href: "/about", label: "About", show: "lg" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="UIYard — home">
          <Wordmark className="text-xl sm:text-[1.6rem]" />
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${item.show === "lg" ? "hidden lg:block" : "hidden sm:block"} rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent`}
            >
              {item.label}
            </Link>
          ))}

          <div className="hidden md:block">
            <CategoriesMenu />
          </div>

          <ThemeToggle />

          <Link
            href="/tools"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            All tools
            <span aria-hidden="true">→</span>
          </Link>

          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
