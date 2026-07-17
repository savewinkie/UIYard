import Link from "next/link";
import Mascot from "@/components/Mascot";
import { liveTools } from "@/lib/tools";

export default function NotFound() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <div className="rise float-bob" style={{ ["--i" as string]: 0 }}>
          <Mascot className="h-40 w-auto sm:h-48" mood="search" />
        </div>

        <p
          className="rise mt-8 font-mono text-sm font-medium text-accent"
          style={{ ["--i" as string]: 1 }}
        >
          404
        </p>

        <h1
          className="rise mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ ["--i" as string]: 2 }}
        >
          Nothing grows here
        </h1>

        <p
          className="rise mt-4 max-w-sm text-lg leading-relaxed text-muted"
          style={{ ["--i" as string]: 3 }}
        >
          This patch of the yard is empty. The page may have moved, or the link
          might have a typo in it.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ ["--i" as string]: 4 }}
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(17_24_39_/_0.28)] transition-all hover:-translate-y-0.5"
          >
            Browse all {liveTools.length} tools →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium text-muted transition-colors hover:text-accent"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
