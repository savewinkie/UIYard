import Link from "next/link";
import { categories, plantedOn, recentTools } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import Reveal from "@/components/Reveal";

export default function WhatsNew() {
  const recent = recentTools(4);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">🌱 Freshly planted</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              New in the yard
            </h2>
          </div>
          <Link
            href="/whats-growing"
            className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-75"
          >
            See everything growing →
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recent.map((tool, i) => {
          const meta = categories[tool.category];
          return (
            <Reveal key={tool.slug} delay={i * 70}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col gap-2.5 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_40px_-20px_rgb(245_100_60_/_0.35)]"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                >
                  <ToolIcon category={tool.category} className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight group-hover:text-accent">
                  {tool.name}
                </span>
                <span className="mt-auto text-xs text-muted">
                  Planted {plantedOn(tool)}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
