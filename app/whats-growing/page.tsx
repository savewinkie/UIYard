import type { Metadata } from "next";
import Link from "next/link";
import {
  categories,
  plantedOn,
  recentTools,
  tools,
} from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "What's growing",
  description:
    "The UIYard garden diary: every tool we've planted, newest first, plus the seeds still in the ground. New free design tools land all the time.",
  alternates: { canonical: "/whats-growing" },
};

export default function WhatsGrowingPage() {
  const live = recentTools();
  const seeds = tools.filter((t) => t.status === "soon");

  // Group live tools into diary entries by planting date.
  const entries = new Map<string, typeof live>();
  for (const tool of live) {
    const key = plantedOn(tool);
    entries.set(key, [...(entries.get(key) ?? []), tool]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1
          className="rise text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ ["--i" as string]: 0 }}
        >
          What&apos;s growing
        </h1>
        <p
          className="rise mx-auto mt-3 max-w-md text-muted"
          style={{ ["--i" as string]: 1 }}
        >
          The garden diary — {live.length} tools planted so far, {seeds.length}{" "}
          seeds still in the ground.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-10">
        {[...entries.entries()].map(([date, items]) => (
          <Reveal key={date}>
            <section>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {date}
                </h2>
                <span className="text-xs text-muted">
                  · {items.length} planted
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 border-l-2 border-line pl-5">
                {items.map((tool) => {
                  const meta = categories[tool.category];
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
                      >
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                          style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                        >
                          <ToolIcon category={tool.category} className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold group-hover:text-accent">
                          {tool.name}
                        </span>
                        <span className="hidden truncate text-xs text-muted sm:block">
                          {tool.tagline}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Seeds in the ground */}
      <Reveal>
        <section className="mt-16 rounded-3xl border border-dashed border-accent/40 bg-accent-soft/40 p-7">
          <div className="flex items-center gap-4">
            <Mascot className="h-16 w-auto" />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Seeds in the ground
              </h2>
              <p className="text-sm text-muted">
                Already planted, not yet sprouted — coming as they&apos;re ready.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {seeds.map((tool) => (
              <span
                key={tool.slug}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {tool.name}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            Want one of these sooner — or something not listed?{" "}
            <a
              href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
              className="font-medium text-accent transition-opacity hover:opacity-75"
            >
              Request it
            </a>{" "}
            and it moves up the queue.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
