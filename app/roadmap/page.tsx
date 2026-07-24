import type { Metadata } from "next";
import Link from "next/link";
import { tools, liveTools, categories, categoryOrder } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "See where UIYard is headed — the tools already live, the ones planted and opening up next, and how you help decide what grows. Free, no signup.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  const soon = tools.filter((t) => t.status === "soon");

  return (
    <div>
      {/* Header */}
      <header className="hero-glow border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rise flex items-center gap-3 text-sm font-medium text-muted" style={{ ["--i" as string]: 0 }}>
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>Where the yard is headed</span>
          </div>
          <h1 className="rise mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.06] tracking-tight" style={{ ["--i" as string]: 1 }}>
            The roadmap
          </h1>
          <p className="rise mt-7 max-w-2xl text-xl leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
            UIYard grows one tool at a time. Here&apos;s what&apos;s already live, what&apos;s planted and
            opening up next, and how you help steer what grows.
          </p>
          <dl className="rise mt-10 grid grid-cols-3 gap-4" style={{ ["--i" as string]: 3 }}>
            {[
              { n: liveTools.length, l: "live now" },
              { n: soon.length, l: "growing next" },
              { n: categoryOrder.length, l: "categories" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-line bg-surface p-4">
                <dd className="font-display text-3xl font-bold tracking-tight">{s.n}</dd>
                <dt className="mt-1 text-sm text-muted">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Live */}
        <section>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Already live</h2>
                <p className="mt-2 text-muted">
                  {liveTools.length} free tools, all running in your browser.{" "}
                  <Link href="/whats-growing" className="font-medium text-accent hover:opacity-75">
                    See the diary of what shipped
                  </Link>
                  .
                </p>
              </div>
              <Link href="/tools" className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-75">
                Browse all →
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Coming soon */}
        <section className="mt-16">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Growing next</h2>
              <p className="mt-2 max-w-2xl text-muted">
                These are planted — the real queue. They open up free for everyone as they&apos;re ready.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {soon.map((tool, i) => {
              const meta = categories[tool.category];
              return (
                <Reveal key={tool.slug} delay={i * 60}>
                  <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-line bg-surface p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl"
                        style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                      >
                        <ToolIcon category={tool.category} className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                        Soon
                      </span>
                    </div>
                    <p className="text-[15px] font-semibold tracking-tight">{tool.name}</p>
                    <p className="text-sm leading-relaxed text-muted">{tool.tagline}</p>
                    <span className="mt-auto pt-1 text-xs font-medium" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Shape it */}
        <section className="mt-16">
          <Reveal>
            <div className="rounded-2xl border border-dashed border-accent/40 bg-accent-soft/40 p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-accent-ink sm:text-2xl">
                Help decide what grows next
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                What gets built next is driven by what people actually want — not a roadmap committee. A
                public board where you can vote on the queue is on the way. Until then, if there&apos;s a
                small job you keep opening another website for, send it over and it goes in the ground.
              </p>
              <a
                href="mailto:link.bernath5@gmail.com?subject=UIYard tool idea"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Send an idea →
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
