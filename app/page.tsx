import Link from "next/link";
import {
  tools,
  liveTools,
  featuredTools,
  categories,
  categoryOrder,
  toolsInCategory,
  liveCountIn,
} from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/ToolIcon";
import HeroScene from "@/components/HeroScene";
import WhatsNew from "@/components/WhatsNew";
import Squiggle from "@/components/Squiggle";
import Reveal from "@/components/Reveal";

const STRIP = [
  "Free forever",
  "No signup",
  "Runs in your browser",
  "Copy-ready CSS",
  "Nothing uploaded",
  "New tools planted often",
];

export default function Home() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl items-center px-4 sm:px-6">
          <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr]">
            {/* Floating-cards art: desktop/laptop only — hidden on phones */}
            <div className="order-2 hidden lg:block">
              <HeroScene />
            </div>

            <div className="order-1">
              <p className="rise flex items-center gap-2 text-sm font-medium text-muted" style={{ ["--i" as string]: 0 }}>
                <span className="h-2 w-2 rounded-full bg-brand" />
                Free design tools · no signup
              </p>
              <h1
                className="rise mt-4 text-[clamp(2.5rem,5.2vw,4.2rem)] font-bold leading-[1.05] tracking-tight"
                style={{ ["--i" as string]: 1 }}
              >
                All design tools,
                <br />
                in{" "}
                <span className="relative inline-block">
                  one yard
                  <Squiggle className="draw-in absolute -bottom-2 left-0 h-3.5 w-full" />
                </span>
              </h1>

              <p
                className="rise mt-6 max-w-md text-lg leading-relaxed text-muted"
                style={{ ["--i" as string]: 2 }}
              >
                Stop bookmarking a different site for every little job. UIYard
                grows one free tool at a time — palettes, gradients, shadows,
                fonts — all in your browser.
              </p>

              <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ ["--i" as string]: 3 }}>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(17_24_39_/_0.28)] transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgb(17_24_39_/_0.32)]"
                >
                  Explore tools →
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-surface px-6 py-3 text-[15px] font-semibold text-accent transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.33c-.55.21-.9.71-.9 1.3V14" />
                    <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                  What is UIYard?
                </Link>
              </div>

              <div className="rise mt-9" style={{ ["--i" as string]: 4 }}>
                <p className="text-sm text-muted">
                  Nothing to install — jump straight into a tool:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {liveTools.slice(0, 3).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-muted transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                    >
                      <span
                        className="grid h-5 w-5 place-items-center rounded-md"
                        style={{
                          backgroundColor: `${categories[tool.category].color}1a`,
                          color: categories[tool.category].color,
                        }}
                      >
                        <ToolIcon category={tool.category} className="h-3 w-3" />
                      </span>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <p className="rise mt-8 text-sm text-muted" style={{ ["--i" as string]: 5 }}>
                {liveTools.length} tools live · {tools.length - liveTools.length} more
                growing
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-line bg-surface/60 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-accent/70" />
          </div>
        </div>
      </section>

      {/* ---------- Marquee strip ---------- */}
      <section className="marquee overflow-hidden border-y border-line bg-surface py-4">
        <div className="marquee-track gap-10 text-sm text-muted">
          {[...STRIP, ...STRIP].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-3">
              <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-warm/80" : "bg-accent/80"}`} />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- New in the yard ---------- */}
      <WhatsNew />

      {/* ---------- Tool Categories ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tool categories
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Everything, sorted. Pick a category or dig into the whole yard.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((cat, i) => {
            const meta = categories[cat];
            const total = toolsInCategory(cat).length;
            const live = liveCountIn(cat);
            return (
              <Reveal key={cat} delay={i * 70}>
                <Link
                  href={`/tools?q=${cat}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-[transform,box-shadow,border-color,color] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(17_24_39_/_0.22)]"
                >
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                  >
                    <ToolIcon category={cat} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight">{meta.label} Tools</p>
                    <p className="truncate text-sm text-muted">{meta.blurb}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                    {live > 0 ? `${live} live` : `${total} soon`}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Popular tools ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-20 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Popular tools
              </h2>
              <p className="mt-2 text-muted">
                The ones people reach for most — jump straight in.
              </p>
            </div>
            <Link
              href="/tools"
              className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-75"
            >
              Browse all {liveTools.length} tools →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.slice(0, 6).map((tool, i) => (
            <Reveal key={tool.slug} delay={i * 70}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="border-t border-line bg-surface-2">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                A free toolbox that keeps growing
              </h2>
              <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted">
                <p>
                  UIYard collects the small tools designers and developers reach
                  for every day, and puts them in one friendly place. No
                  accounts, no uploads, no ads between you and the answer.
                </p>
                <p>
                  Every tool finishes the job in as few clicks as possible —
                  generate, tweak, copy, done. Everything runs in your browser,
                  so your work never leaves your machine.
                </p>
                <p>
                  Missing a tool?{" "}
                  <a
                    href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
                    className="font-medium text-accent transition-opacity hover:opacity-75"
                  >
                    Tell us what to grow next
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {categoryOrder.slice(0, 3).map((cat) => (
                <div
                  key={cat}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 transition-transform hover:-translate-y-1"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ backgroundColor: `${categories[cat].color}1a`, color: categories[cat].color }}
                  >
                    <ToolIcon category={cat} className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold">{categories[cat].label}</span>
                  <span className="text-xs text-muted">
                    {toolsInCategory(cat).length} tools
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-accent/40 bg-accent-soft/50 p-5">
                <span className="text-lg">🌱</span>
                <span className="text-sm font-semibold text-accent-ink">
                  Your idea here
                </span>
                <a
                  href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
                  className="text-xs font-medium text-accent transition-opacity hover:opacity-75"
                >
                  Request a tool →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-8 py-14 text-center">
            <div
              className="blob left-[8%] top-[-30%] h-44 w-44"
              style={{ background: "rgb(37 99 235 / 0.14)" }}
            />
            <div
              className="blob bottom-[-35%] right-[10%] h-44 w-44"
              style={{ background: "rgb(242 166 61 / 0.16)", animationDelay: "-7s" }}
            />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to dig in?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Pick a tool and get something beautiful out in under a minute.
              </p>
              <Link
                href="/tools"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(17_24_39_/_0.28)] transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5"
              >
                Browse all {liveTools.length} tools →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
