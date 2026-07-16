import Link from "next/link";
import SearchDropdown from "@/components/SearchDropdown";
import CategoriesMenu from "@/components/CategoriesMenu";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo className="h-9 w-9 text-accent" />
          <span className="hidden text-lg font-bold tracking-tight sm:block">
            UIYard
          </span>
        </Link>

        <SearchDropdown className="min-w-0 flex-1 sm:max-w-md" />

        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <div className="hidden md:block">
            <CategoriesMenu />
          </div>
          <Link
            href="/about"
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent lg:block"
          >
            About
          </Link>
          <a
            href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent lg:block"
          >
            Request a tool
          </a>
          <Link
            href="/tools"
            className="ml-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            All tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
