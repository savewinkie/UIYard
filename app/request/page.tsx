import type { Metadata } from "next";
import Link from "next/link";
import { liveTools, tools } from "@/lib/tools";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Request a tool",
  description:
    "Missing a tool? Tell us the small job you keep opening another website for, and it goes on the list. Real requests decide what UIYard grows next.",
  alternates: { canonical: "/request" },
};

export default function RequestPage() {
  const soon = tools.length - liveTools.length;

  return (
    <article>
      {/* Header band */}
      <header className="hero-glow border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rise flex items-center gap-3 text-sm font-medium text-muted" style={{ ["--i" as string]: 0 }}>
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>The yard grows by request</span>
          </div>
          <h1 className="rise mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.06] tracking-tight" style={{ ["--i" as string]: 1 }}>
            Request a tool
          </h1>
          <p className="rise mt-7 max-w-2xl text-xl leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
            UIYard grows one tool at a time — and what gets planted next is decided by you. Tell us the
            small job you keep opening another website for, and it goes on the list.
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <RequestForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="flex flex-col gap-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">How it works</h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {[
                    "You describe the job — not a spec, just the thing you need done.",
                    "It goes on the real queue (the cards marked “Soon” you see around the site).",
                    "When it’s built, it opens up free for everyone — and we email you if you left one.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent-soft text-xs font-semibold text-accent">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-muted">
                <p className="font-semibold text-foreground">Already {soon} planted</p>
                <p className="mt-1">
                  There are already {soon} tools growing behind the scenes. Yours could be next — or{" "}
                  <Link href="/tools" className="font-medium text-accent hover:opacity-75">
                    browse the {liveTools.length} that are live
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
