"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const RATIOS = [
  { value: 1.125, label: "1.125 · Major second" },
  { value: 1.2, label: "1.200 · Minor third" },
  { value: 1.25, label: "1.250 · Major third" },
  { value: 1.333, label: "1.333 · Perfect fourth" },
  { value: 1.414, label: "1.414 · Augmented fourth" },
  { value: 1.5, label: "1.500 · Perfect fifth" },
  { value: 1.618, label: "1.618 · Golden ratio" },
];

const STEPS = [
  { name: "xs", exp: -2 },
  { name: "sm", exp: -1 },
  { name: "base", exp: 0 },
  { name: "lg", exp: 1 },
  { name: "xl", exp: 2 },
  { name: "2xl", exp: 3 },
  { name: "3xl", exp: 4 },
  { name: "4xl", exp: 5 },
];

export default function TypeScale() {
  const [base, setBase] = useState(16);
  const [ratio, setRatio] = useState(1.25);

  const sizes = STEPS.map((s) => ({
    ...s,
    px: Math.round(base * Math.pow(ratio, s.exp) * 100) / 100,
  }));

  const css = `:root {\n${sizes
    .map((s) => `  --text-${s.name}: ${Math.round((s.px / base) * 10000) / 10000}rem;`)
    .join("\n")}\n}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-surface p-5">
        <label className="flex items-center gap-3 text-sm text-muted">
          <span className="text-xs font-medium uppercase tracking-wider">Base</span>
          <input
            type="number"
            min={10}
            max={24}
            value={base}
            onChange={(e) => setBase(Number(e.target.value) || 16)}
            className="w-20 rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
          />
          px
        </label>
        <label className="flex items-center gap-3 text-sm text-muted">
          <span className="text-xs font-medium uppercase tracking-wider">Ratio</span>
          <select
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none"
          >
            {RATIOS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-1 overflow-hidden rounded-2xl border border-line bg-surface p-6">
        {[...sizes].reverse().map((s) => (
          <div key={s.name} className="flex items-baseline gap-4 border-b border-line/60 py-2 last:border-0">
            <span className="w-12 shrink-0 font-mono text-xs text-muted">{s.name}</span>
            <span className="w-20 shrink-0 font-mono text-xs text-accent">{s.px}px</span>
            <span
              className="truncate font-semibold leading-tight tracking-tight"
              style={{ fontSize: `min(${s.px}px, 8vw)` }}
            >
              Design that grows
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
          {css}
        </code>
        <div className="mt-3">
          <CopyButton text={css} label="Copy CSS variables" />
        </div>
      </div>
    </div>
  );
}
