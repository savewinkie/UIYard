import type { Metadata } from "next";
import Link from "next/link";
import { liveTools, tools } from "@/lib/tools";
import Mascot from "@/components/Mascot";
import Squiggle from "@/components/Squiggle";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "UIYard is a growing collection of free, no-signup design and developer tools. Everything runs in your browser — nothing uploaded, ever. Learn the story behind the yard.",
  alternates: { canonical: "/about" },
};

const FAQS = [
  {
    q: "Is UIYard really free?",
    a: `Yes — every tool, completely free, no account needed. UIYard currently has ${liveTools.length} live tools and new ones are planted all the time.`,
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Every tool runs entirely in your browser — your text, colors and passwords are never uploaded, stored or seen by anyone.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There are no accounts, no logins and no paywalls. Open a tool, use it, done.",
  },
  {
    q: "How often do new tools come out?",
    a: "Constantly — that's the whole idea of the yard. Tools marked “Soon” are already planted and open up as they're ready.",
  },
  {
    q: "Can I request a tool?",
    a: "Please do! Use the “Request a tool” link in the header or footer and describe the job you need done — real requests decide what grows next.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ---------- Manifesto ---------- */}
      <section className="hero-glow">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h1
            className="rise text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight"
            style={{ ["--i" as string]: 0 }}
          >
            Tools should be{" "}
            <span className="relative inline-block">
              free
              <Squiggle className="draw-in absolute -bottom-1.5 left-0 h-3 w-full" />
            </span>
            , fast and private.
          </h1>
          <p
            className="rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ ["--i" as string]: 1 }}
          >
            No signups. No ads. No uploads. Open a tool, get your answer, get
            back to work. That&apos;s the whole deal — {liveTools.length} tools
            and counting.
          </p>
        </div>
      </section>

      {/* ---------- The story ---------- */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <Mascot className="mx-auto h-44 w-auto lg:h-56" />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                The story of the yard
              </h2>
              <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted">
                <p>
                  UIYard started with an annoyance every maker knows: needing
                  ten different websites for ten tiny jobs — one for palettes,
                  one for gradients, one to count words — each buried under
                  ads, popups and “create an account” walls.
                </p>
                <p>
                  So we started planting a yard instead. One place where small,
                  sharp tools grow — each one does a single job, does it fast,
                  and hands you the result. The little sprout you see around
                  the site is the gardener; the “Soon” cards are seeds already
                  in the ground.
                </p>
                <p>
                  It&apos;s built and designed by Link, one tool at a time, and
                  it&apos;s never finished — that&apos;s the point. Yards grow.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions people ask
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <details className="group rounded-2xl border border-line bg-surface px-5 py-4 transition-colors open:border-accent/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(245_100_60_/_0.55)] transition-all hover:-translate-y-0.5"
              >
                Explore all {liveTools.length} tools →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ structured data — how search engines & AI assistants read this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
