"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearch({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/tools?q=${encodeURIComponent(q)}` : "/tools");
  }

  return (
    <form onSubmit={submit} className={`relative ${className}`}>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search tools…"
        aria-label="Search tools"
        className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted focus:border-accent/50 focus:shadow-[0_0_0_3px_var(--accent-soft)]"
      />
    </form>
  );
}
