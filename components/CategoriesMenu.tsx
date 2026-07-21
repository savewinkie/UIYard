"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  categories,
  categoryOrder,
  toolsInCategory,
  liveCountIn,
  type ToolCategory,
} from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<ToolCategory | null>(null);
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
        <Chevron open={open} className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 max-h-[72vh] w-80 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-[0_24px_60px_-20px_rgb(42_29_24_/_0.3)]">
          {categoryOrder.map((cat, idx) => {
            const meta = categories[cat];
            const items = toolsInCategory(cat);
            const live = liveCountIn(cat);
            const isOpen = expanded === cat;
            return (
              <div key={cat} className={idx < categoryOrder.length - 1 ? "border-b border-line" : ""}>
                <button
                  onClick={() => setExpanded(isOpen ? null : cat)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-accent-soft/50"
                >
                  <ToolIcon
                    category={cat}
                    className="h-5 w-5 shrink-0 text-muted"
                    style={isOpen ? { color: meta.color } : undefined}
                  />
                  <span className="font-display flex-1 text-[15px] font-semibold tracking-tight">
                    {meta.label}
                  </span>
                  <span className="text-xs font-medium text-muted">{live}</span>
                  <Chevron open={isOpen} className="h-3.5 w-3.5 text-muted" />
                </button>

                {isOpen && (
                  <ul className="flex flex-col gap-0.5 pb-2 pl-11 pr-2">
                    {items.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={t.status === "live" ? `/tools/${t.slug}` : `/tools?q=${cat}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:text-accent"
                        >
                          <span className="min-w-0 truncate">{t.name}</span>
                          {t.status === "soon" && (
                            <span className="shrink-0 rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                              Soon
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`/tools?q=${cat}`}
                        onClick={() => setOpen(false)}
                        className="mt-1 flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-accent transition-opacity hover:opacity-80"
                      >
                        View all {meta.label} tools →
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
