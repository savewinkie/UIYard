"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const words = (s: string) =>
  s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9']+/)
    .filter(Boolean);

const CASES: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "lower", label: "lowercase", fn: (s) => s.toLowerCase() },
  { id: "upper", label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  {
    id: "title",
    label: "Title Case",
    fn: (s) =>
      s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()),
  },
  {
    id: "sentence",
    label: "Sentence case",
    fn: (s) =>
      s.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p, c) => p + c.toUpperCase()),
  },
  {
    id: "camel",
    label: "camelCase",
    fn: (s) =>
      words(s)
        .map((w, i) =>
          i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()
        )
        .join(""),
  },
  { id: "snake", label: "snake_case", fn: (s) => words(s).join("_").toLowerCase() },
  { id: "kebab", label: "kebab-case", fn: (s) => words(s).join("-").toLowerCase() },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [active, setActive] = useState("lower");

  const out = text ? CASES.find((c) => c.id === active)!.fn(text) : "";

  return (
    <div className="flex flex-col gap-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here…"
        rows={5}
        className="w-full resize-y rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
      />

      <div className="flex flex-wrap gap-2">
        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c.id
                ? "bg-accent text-white"
                : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <p className="min-h-24 whitespace-pre-wrap text-sm leading-relaxed">
          {out || <span className="text-muted">Converted text appears here.</span>}
        </p>
        <div className="mt-3 border-t border-line pt-3">
          <CopyButton text={out} label="Copy text" />
        </div>
      </div>
    </div>
  );
}
