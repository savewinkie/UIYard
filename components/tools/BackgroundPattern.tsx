"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Args = { fg: string; bg: string; size: number };
type Pattern = { id: string; name: string; style: (a: Args) => React.CSSProperties };

const PATTERNS: Pattern[] = [
  {
    id: "dots",
    name: "Dots",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `radial-gradient(${fg} ${Math.max(1, Math.round(size / 12))}px, transparent ${Math.max(1, Math.round(size / 12))}px)`,
      backgroundSize: `${size}px ${size}px`,
    }),
  },
  {
    id: "grid",
    name: "Grid",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `linear-gradient(${fg} 1px, transparent 1px), linear-gradient(90deg, ${fg} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }),
  },
  {
    id: "lines-diagonal",
    name: "Diagonal lines",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `repeating-linear-gradient(45deg, ${fg} 0, ${fg} 1px, transparent 0, transparent 50%)`,
      backgroundSize: `${size}px ${size}px`,
    }),
  },
  {
    id: "checkerboard",
    name: "Checkerboard",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `linear-gradient(45deg, ${fg} 25%, transparent 25%, transparent 75%, ${fg} 75%), linear-gradient(45deg, ${fg} 25%, transparent 25%, transparent 75%, ${fg} 75%)`,
      backgroundPosition: `0 0, ${size / 2}px ${size / 2}px`,
      backgroundSize: `${size}px ${size}px`,
    }),
  },
  {
    id: "stripes",
    name: "Stripes",
    style: ({ fg, bg, size }) => ({
      backgroundImage: `repeating-linear-gradient(45deg, ${bg} 0, ${bg} ${size / 2}px, ${fg} ${size / 2}px, ${fg} ${size}px)`,
    }),
  },
  {
    id: "vertical",
    name: "Vertical lines",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `repeating-linear-gradient(90deg, ${fg} 0, ${fg} 1px, transparent 1px, transparent ${size}px)`,
    }),
  },
  {
    id: "horizontal",
    name: "Horizontal lines",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `repeating-linear-gradient(0deg, ${fg} 0, ${fg} 1px, transparent 1px, transparent ${size}px)`,
    }),
  },
  {
    id: "crosshatch",
    name: "Cross-hatch",
    style: ({ fg, bg, size }) => ({
      backgroundColor: bg,
      backgroundImage: `repeating-linear-gradient(45deg, ${fg} 0, ${fg} 1px, transparent 1px, transparent ${size}px), repeating-linear-gradient(-45deg, ${fg} 0, ${fg} 1px, transparent 1px, transparent ${size}px)`,
    }),
  },
];

/** React.CSSProperties → copy-ready CSS text. */
function toCss(style: React.CSSProperties): string {
  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v};`)
    .join("\n");
}

export default function BackgroundPattern() {
  const [active, setActive] = useState("dots");
  const [fg, setFg] = useState("#1e293b");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(24);

  const args = { fg, bg, size };
  const activePattern = PATTERNS.find((p) => p.id === active)!;
  const css = toCss(activePattern.style(args));

  return (
    <div className="flex flex-col gap-6">
      {/* Big live preview */}
      <div
        className="h-56 rounded-2xl border border-line"
        style={activePattern.style(args)}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-surface p-4">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          Pattern
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-8 w-11 cursor-pointer rounded border border-line" />
        </label>
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          Background
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-11 cursor-pointer rounded border border-line" />
        </label>
        <label className="flex flex-1 items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted">
          Size
          <input type="range" min={8} max={64} value={size} onChange={(e) => setSize(Number(e.target.value))} className="min-w-24 flex-1 accent-[var(--accent)]" />
          <span className="font-mono">{size}px</span>
        </label>
      </div>

      {/* Pattern picker */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-[border-color,box-shadow] ${
              active === p.id
                ? "border-accent shadow-[0_14px_30px_-18px_rgb(17_24_39_/_0.25)]"
                : "border-line hover:border-accent/40"
            }`}
          >
            <span className="h-16 w-full rounded-lg border border-line" style={p.style(args)} />
            <span className="text-xs font-medium">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Code */}
      <div className="rounded-2xl border border-line bg-surface p-4">
        <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
          {css}
        </code>
        <div className="mt-3">
          <CopyButton text={css} label={`Copy ${activePattern.name} CSS`} />
        </div>
      </div>
    </div>
  );
}
