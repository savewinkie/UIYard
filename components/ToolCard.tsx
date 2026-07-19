import Link from "next/link";
import { categories, isNew, type Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: Tool }) {
  const meta = categories[tool.category];
  const soon = tool.status === "soon";
  const catColor = { color: meta.color };

  const inner = (
    <>
      {/* name-first: the tool is the hero, not a decorative icon tile */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="tool-card-title font-display text-lg font-semibold leading-snug text-foreground">
          {tool.name}
        </h3>
        {!soon && (
          <span aria-hidden className="tool-card-arrow mt-0.5 shrink-0 text-muted">
            →
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {tool.tagline}
      </p>

      {/* category identity at the bottom — small inline icon, no tinted tile */}
      <div className="mt-5 flex items-center gap-2">
        <ToolIcon category={tool.category} className="h-4 w-4 shrink-0" style={catColor} />
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={catColor}
        >
          {meta.label}
        </span>
        {soon ? (
          <span className="ml-auto rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Soon
          </span>
        ) : (
          isNew(tool) && (
            <span className="ml-auto rounded-md bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-ink">
              New
            </span>
          )
        )}
      </div>
    </>
  );

  const base =
    "tool-card group relative flex flex-col rounded-xl border bg-surface p-5 shadow-[var(--card-shadow)]";
  const style = { ["--cat" as string]: meta.color };

  if (soon) {
    return (
      <div className={`${base} border-dashed border-line opacity-70`} style={style}>
        {inner}
      </div>
    );
  }

  return (
    <Link href={`/tools/${tool.slug}`} style={style} className={`${base} border-line`}>
      {inner}
    </Link>
  );
}
