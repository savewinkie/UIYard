"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Dir = "up" | "down" | "left" | "right";

const DIRS: { id: Dir; label: string }[] = [
  { id: "up", label: "▲ Up" },
  { id: "down", label: "▼ Down" },
  { id: "left", label: "◀ Left" },
  { id: "right", label: "▶ Right" },
];

function borders(dir: Dir, size: number, color: string) {
  const t = `${size}px solid transparent`;
  const s = `${size}px solid ${color}`;
  switch (dir) {
    case "up":
      return { borderLeft: t, borderRight: t, borderBottom: s };
    case "down":
      return { borderLeft: t, borderRight: t, borderTop: s };
    case "left":
      return { borderTop: t, borderBottom: t, borderRight: s };
    case "right":
      return { borderTop: t, borderBottom: t, borderLeft: s };
  }
}

function css(dir: Dir, size: number, color: string) {
  const b = borders(dir, size, color);
  const lines = ["width: 0;", "height: 0;"];
  for (const [k, v] of Object.entries(b)) {
    const prop = k.replace(/([A-Z])/g, "-$1").toLowerCase();
    lines.push(`${prop}: ${v};`);
  }
  return lines.join("\n");
}

export default function CssTriangle() {
  const [dir, setDir] = useState<Dir>("up");
  const [size, setSize] = useState(40);
  const [color, setColor] = useState("#2563eb");

  const style = { width: 0, height: 0, ...borders(dir, size, color) } as React.CSSProperties;
  const code = css(dir, size, color);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid h-64 place-items-center rounded-2xl border border-line bg-background sm:h-96">
        <div style={style} />
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Direction</p>
          <div className="grid grid-cols-2 gap-2">
            {DIRS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDir(d.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  dir === d.id
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
            Size
            <span className="font-mono">{size}px</span>
          </label>
          <input
            type="range"
            min={8}
            max={120}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-line"
          />
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {code}
          </code>
          <CopyButton text={code} />
        </div>
      </div>
    </div>
  );
}
