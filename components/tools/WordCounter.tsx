"use client";

import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length;
  const paragraphs = text.trim()
    ? text.trim().split(/\n\s*\n/).filter(Boolean).length
    : 0;
  const readMinutes = Math.max(1, Math.round(words / 200));

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "No spaces", value: charsNoSpace },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Read time", value: words ? `${readMinutes} min` : "—" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-center"
          >
            <p className="text-xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing — everything counts live…"
        rows={10}
        className="w-full resize-y rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
      />
    </div>
  );
}
