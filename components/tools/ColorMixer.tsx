"use client";

import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function mixHex(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const to = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${to(r1 + (r2 - r1) * t)}${to(g1 + (g2 - g1) * t)}${to(b1 + (b2 - b1) * t)}`;
}

export default function ColorMixer() {
  const [colorA, setColorA] = useState("#f5643c");
  const [colorB, setColorB] = useState("#5b8bb2");
  const [steps, setSteps] = useState(7);
  const [copied, setCopied] = useState<string | null>(null);

  const ramp = Array.from({ length: steps }, (_, i) =>
    mixHex(colorA, colorB, steps === 1 ? 0.5 : i / (steps - 1))
  );

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-surface p-5">
        {(
          [
            ["From", colorA, setColorA],
            ["To", colorB, setColorB],
          ] as const
        ).map(([label, value, set]) => (
          <label key={label} className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {label}
            </span>
            <input
              type="color"
              value={value}
              onChange={(e) => set(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-line"
            />
            <span className="font-mono text-sm">{value.toUpperCase()}</span>
          </label>
        ))}
        <label className="flex flex-1 items-center gap-3 text-sm text-muted">
          <span className="text-xs font-medium uppercase tracking-wider">Steps</span>
          <input
            type="range"
            min={3}
            max={15}
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full min-w-28 accent-[var(--accent)]"
          />
          <span className="font-mono tabular-nums">{steps}</span>
        </label>
      </div>

      <div className="flex overflow-hidden rounded-2xl border border-line">
        {ramp.map((hex, i) => (
          <button
            key={i}
            onClick={() => copy(hex)}
            className="group flex h-40 flex-1 items-end justify-center pb-3 transition-[flex] hover:flex-[1.35]"
            style={{ background: hex }}
            title={hex}
          >
            <span className="rounded-md bg-black/35 px-1.5 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {copied === hex ? "✓" : hex.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">Click any step to copy its hex.</p>
    </div>
  );
}
