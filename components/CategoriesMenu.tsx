"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categories, categoryOrder, toolsInCategory } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          open ? "bg-accent-soft text-accent" : "text-muted hover:bg-accent-soft hover:text-accent"
        }`}
      >
        Categories
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgb(42_29_24_/_0.3)]">
          {categoryOrder.map((cat) => {
            const meta = categories[cat];
            const count = toolsInCategory(cat).length;
            return (
              <Link
                key={cat}
                href={`/tools?q=${cat}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg"
                  style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                >
                  <ToolIcon category={cat} className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{meta.label} Tools</span>
                  <span className="block truncate text-xs text-muted">{meta.blurb}</span>
                </span>
                <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
