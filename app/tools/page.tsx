import type { Metadata } from "next";
import ToolGrid from "@/components/ToolGrid";
import ToolShowcase from "@/components/ToolShowcase";
import Reveal from "@/components/Reveal";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All tools",
  description:
    "Browse every free UIYard tool — color palette generator, CSS gradient maker, box-shadow & glassmorphism, font pairing and more. No signup, runs in your browser.",
  alternates: { canonical: "/tools" },
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const filtered = Boolean(q);

  return (
    <div>
      {!filtered && (
        <>
          {/* Intro */}
          <section className="hero-glow relative">
            <div className="mx-auto flex min-h-[46vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
              <h1
                className="rise text-3xl font-semibold tracking-tight sm:text-5xl"
                style={{ ["--i" as string]: 0 }}
              >
                The whole yard
              </h1>
              <p
                className="rise mx-auto mt-4 max-w-md text-muted sm:text-lg"
                style={{ ["--i" as string]: 1 }}
              >
                {tools.length} free tools and counting. Scroll through the deck
                — or jump to the full list below.
              </p>
              <p className="rise mt-10 text-sm text-muted" style={{ ["--i" as string]: 2 }}>
                Scroll ↓
              </p>
            </div>
          </section>

          {/* GSAP stacked deck */}
          <ToolShowcase />
        </>
      )}

      {/* Browse & search */}
      <section id="all" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {filtered ? "The whole yard" : "Browse everything"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Search by name, job or category — no signup, no nonsense.
            </p>
          </div>
        </Reveal>
        <div className="mt-10">
          <ToolGrid initialQuery={q ?? ""} />
        </div>
      </section>
    </div>
  );
}
