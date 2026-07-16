"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

function blobPath(points: number, randomness: number, seed: number): string {
  let state = seed;
  const rand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  const cx = 100, cy = 100, baseR = 78;
  const pts = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    const r = baseR * (1 - randomness / 2 + rand() * randomness);
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r] as const;
  });

  // Catmull-Rom → cubic bezier for a smooth closed curve
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

export default function BlobGenerator() {
  const [points, setPoints] = useState(7);
  const [randomness, setRandomness] = useState(0.45);
  const [color, setColor] = useState("#f5643c");
  const [seed, setSeed] = useState(7);

  const path = useMemo(() => blobPath(points, randomness, seed), [points, randomness, seed]);
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n  <path fill="${color}" d="${path}" />\n</svg>`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid place-items-center rounded-2xl border border-line bg-background p-6">
        <svg viewBox="0 0 200 200" className="h-64 w-64 sm:h-80 sm:w-80">
          <path fill={color} d={path} />
        </svg>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">
            Points <span className="font-mono">{points}</span>
          </span>
          <input
            type="range"
            min={3}
            max={12}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="accent-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">
            Randomness <span className="font-mono">{Math.round(randomness * 100)}%</span>
          </span>
          <input
            type="range"
            min={5}
            max={80}
            value={randomness * 100}
            onChange={(e) => setRandomness(Number(e.target.value) / 100)}
            className="accent-[var(--accent)]"
          />
        </label>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-line"
          />
        </div>

        <button
          onClick={() => setSeed(Math.floor(Math.random() * 1e9))}
          className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          ↻ New blob
        </button>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block max-h-32 overflow-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-[10px] leading-relaxed text-muted">
            {svg}
          </code>
          <CopyButton text={svg} label="Copy SVG" />
        </div>
      </div>
    </div>
  );
}
