import Link from "next/link";
import { categories, isNew, type Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: Tool }) {
  const meta = categories[tool.category];
  const soon = tool.status === "soon";

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ backgroundColor: `${meta.color}14`, color: meta.color }}
        >
          <ToolIcon category={tool.category} className="h-[22px] w-[22px]" />
        </span>
        {soon ? (
          <span className="rounded-md bg-surface-2 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Soon
          </span>
        ) : (
          isNew(tool) && (
            <span className="rounded-md bg-accent-soft px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-ink">
              New
            </span>
          )
        )}
      </div>

      <div className="mt-4 flex-1">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{tool.tagline}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
        <span
          className={`text-sm font-semibold ${soon ? "text-muted" : "text-accent"}`}
        >
          {soon ? "Coming soon" : "Open tool"}
        </span>
        {!soon && (
          <span
            aria-hidden
            className="text-accent transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </div>
    </>
  );

  const base =
    "group relative flex flex-col rounded-2xl border bg-surface p-5 shadow-[var(--card-shadow)]";

  if (soon) {
    return (
      <div className={`${base} border-dashed border-line opacity-75`}>
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`${base} border-line transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--card-shadow-hover)]`}
    >
      {inner}
    </Link>
  );
}
