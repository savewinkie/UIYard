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

function toHex(n: number): string {
  return Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
}

function mix([r, g, b]: [number, number, number], target: number, amount: number) {
  return `#${toHex(r + (target - r) * amount)}${toHex(g + (target - g) * amount)}${toHex(b + (target - b) * amount)}`;
}

// 11-step ramp: 5 tints (toward white), base, 5 shades (toward black)
function buildRamp(hex: string) {
  const rgb = hexToRgb(hex);
  const tints = [0.85, 0.68, 0.5, 0.32, 0.15].map((a) => mix(rgb, 255, a));
  const shades = [0.15, 0.3, 0.45, 0.6, 0.75].map((a) => mix(rgb, 0, a));
  return [...tints, hex.toLowerCase(), ...shades];
}

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export default function ColorShades() {
  const [base, setBase] = useState("#f5643c");
  const [copied, setCopied] = useState<string | null>(null);
  const ramp = buildRamp(base);

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
  }

  const cssVars = ramp
    .map((hex, i) => `  --color-${STEPS[i]}: ${hex};`)
    .join("\n");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Base color
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-line"
            />
            <input
              type="text"
              value={base}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{6}$/.test(v)) setBase(v);
                else if (/^#?[0-9a-fA-F]{0,6}$/.test(v)) setBase(v.startsWith("#") ? v : `#${v}`);
              }}
              className="w-full rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
            />
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block max-h-40 overflow-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {`:root {\n${cssVars}\n}`}
          </code>
          <button
            onClick={() => copy(`:root {\n${cssVars}\n}`)}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Copy CSS variables
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line">
        {ramp.map((hex, i) => {
          const [r, g, b] = hexToRgb(hex);
          const dark = (r * 299 + g * 587 + b * 114) / 1000 < 140;
          return (
            <button
              key={i}
              onClick={() => copy(hex)}
              className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.01]"
              style={{ background: hex, color: dark ? "#fff" : "#1a1a1a" }}
            >
              <span className="font-mono opacity-70">{STEPS[i]}</span>
              <span className="font-mono">
                {copied === hex ? "copied ✓" : hex.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
