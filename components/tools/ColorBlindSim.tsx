"use client";

import { useState } from "react";

// Standard simulation matrices (rows: R', G', B' from R, G, B)
const TYPES: { name: string; note: string; m: number[] }[] = [
  { name: "Normal vision", note: "your original", m: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
  { name: "Protanopia", note: "no red cones · ~1% of men", m: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758] },
  { name: "Protanomaly", note: "weak red cones", m: [0.817, 0.183, 0, 0.333, 0.667, 0, 0, 0.125, 0.875] },
  { name: "Deuteranopia", note: "no green cones · ~1% of men", m: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7] },
  { name: "Deuteranomaly", note: "weak green · most common", m: [0.8, 0.2, 0, 0.258, 0.742, 0, 0, 0.142, 0.858] },
  { name: "Tritanopia", note: "no blue cones · rare", m: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525] },
  { name: "Tritanomaly", note: "weak blue cones", m: [0.967, 0.033, 0, 0, 0.733, 0.267, 0, 0.183, 0.817] },
  { name: "Achromatopsia", note: "no color at all", m: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114] },
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function simulate(hex: string, m: number[]): string {
  const [r, g, b] = hexToRgb(hex);
  const to = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${to(r * m[0] + g * m[1] + b * m[2])}${to(r * m[3] + g * m[4] + b * m[5])}${to(r * m[6] + g * m[7] + b * m[8])}`;
}

export default function ColorBlindSim() {
  const [colors, setColors] = useState(["#f5643c", "#7fa650", "#5b8bb2"]);

  function setColor(i: number, v: string) {
    setColors((p) => p.map((c, j) => (j === i ? v : c)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          Your palette
        </span>
        {colors.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <input
              type="color"
              value={c}
              onChange={(e) => setColor(i, e.target.value)}
              className="h-9 w-11 cursor-pointer rounded-lg border border-line"
            />
            {colors.length > 1 && (
              <button
                onClick={() => setColors((p) => p.filter((_, j) => j !== i))}
                className="text-xs text-muted hover:text-accent"
                aria-label="Remove color"
              >
                ✕
              </button>
            )}
          </span>
        ))}
        {colors.length < 6 && (
          <button
            onClick={() => setColors((p) => [...p, "#e7a93a"])}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            + Add color
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TYPES.map((t) => (
          <div key={t.name} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted">{t.note}</p>
            </div>
            <div className="mt-3 flex h-14 gap-1.5 overflow-hidden rounded-xl">
              {colors.map((c, i) => (
                <div key={i} className="flex-1" style={{ background: simulate(c, t.m) }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted">
        If two colors in your palette become hard to tell apart in any row, don&apos;t
        rely on color alone — add labels, icons or patterns.
      </p>
    </div>
  );
}
