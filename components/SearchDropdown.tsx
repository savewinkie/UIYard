"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { tools, type Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import Mascot from "@/components/Mascot";

export default function SearchDropdown({
  className = "",
  autoFocus = false,
}: {
  className?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const q = value.trim().toLowerCase();
  const results: Tool[] = q
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.includes(q)
      )
    : tools;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const firstLive = results.find((t) => t.status === "live");
    if (firstLive) {
      router.push(`/tools/${firstLive.slug}`);
      setOpen(false);
    } else if (results.length > 0) {
      router.push(`/tools?q=${results[0].category}`);
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form onSubmit={onSubmit}>
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search tools…"
          aria-label="Search tools"
          className="w-full rounded-2xl border border-line bg-surface py-2.5 pl-11 pr-4 text-sm font-medium outline-none transition-[transform,box-shadow,border-color,color] placeholder:text-muted focus:border-accent/60 focus:shadow-[0_0_0_3px_var(--accent-soft)]"
        />
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(33_29_64_/_0.35)]">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.status === "live" ? `/tools/${tool.slug}` : `/tools?q=${tool.category}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                      <ToolIcon category={tool.category} className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        {tool.name}
                        {tool.status === "soon" && (
                          <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                            Soon
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {tool.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
              <Mascot className="h-24 w-auto" mood="search" />
              <p className="text-sm text-muted">
                No tool matches “{value}” yet.
                <br />
                Try another word, or{" "}
                <a
                  href={`mailto:link.bernath5@gmail.com?subject=UIYard tool request&body=I wish UIYard had: ${encodeURIComponent(value)}`}
                  className="font-semibold text-accent hover:opacity-80"
                >
                  request a new tool
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
