"use client";

import { useState } from "react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolGrid({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  const q = query.trim().toLowerCase();
  const visible = q
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.includes(q)
      )
    : tools;

  return (
    <div id="tools" className="scroll-mt-24">
      <div className="relative mx-auto max-w-md">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          aria-label="Search tools"
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted focus:border-accent/50 focus:shadow-[0_0_0_3px_var(--accent-soft)]"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">
          Nothing matches “{query}” — yet. New tools land all the time.
        </p>
      )}
    </div>
  );
}
