import Link from "next/link";
import { categories, isNew, type Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: Tool }) {
  const meta = categories[tool.category];
  const soon = tool.status === "soon";

  const inner = (
    <>
      {soon ? (
        <span className="absolute right-5 top-5 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
          Soon
        </span>
      ) : (
        isNew(tool) && (
          <span className="absolute right-5 top-5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-ink">
            New
          </span>
        )
      )}
      <span
        className="grid h-12 w-12 place-items-center rounded-2xl"
        style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
      >
        <ToolIcon category={tool.category} className="h-6 w-6" />
      </span>
      <div>
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
          {tool.name}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted">{tool.tagline}</p>
      {!soon && (
        <span className="mt-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Open tool →
        </span>
      )}
    </>
  );

  if (soon) {
    return (
      <div className="group relative flex flex-col gap-3 rounded-3xl border border-dashed border-line bg-surface/60 p-6 opacity-80">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col gap-3 rounded-3xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_40px_-20px_rgb(17_24_39_/_0.22)]"
    >
      {inner}
    </Link>
  );
}
