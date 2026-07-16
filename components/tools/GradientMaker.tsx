"use client";

import { useState } from "react";
import { generatePalette } from "@/lib/color";
import CopyButton from "@/components/CopyButton";

type GradientType = "linear" | "radial" | "conic";
type Stop = { color: string; pos: number };

const DEFAULT_STOPS: Stop[] = [
  { color: "#f5643c", pos: 0 },
  { color: "#f2a63d", pos: 100 },
];

export default function GradientMaker() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>(DEFAULT_STOPS);

  const stopList = [...stops]
    .sort((a, b) => a.pos - b.pos)
    .map((s) => `${s.color} ${s.pos}%`)
    .join(", ");

  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stopList})`
      : type === "radial"
        ? `radial-gradient(circle, ${stopList})`
        : `conic-gradient(from ${angle}deg, ${stopList})`;

  function updateStop(index: number, patch: Partial<Stop>) {
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );
  }

  function addStop() {
    if (stops.length >= 5) return;
    const fresh = generatePalette()[2];
    setStops((prev) => [...prev, { color: fresh, pos: 50 }]);
  }

  function removeStop(index: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  }

  function randomize() {
    const palette = generatePalette();
    setAngle(Math.floor(Math.random() * 360));
    setStops((prev) =>
      prev.map((s, i) => ({ ...s, color: palette[i % palette.length] }))
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div
        className="h-64 rounded-2xl border border-line sm:h-96"
        style={{ background: css }}
      />

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Type
          </label>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-background p-1">
            {(["linear", "radial", "conic"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-md px-2 py-1.5 text-sm capitalize transition-colors ${
                  type === t
                    ? "bg-surface font-medium shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {type !== "radial" && (
          <div>
            <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
              Angle <span className="font-mono">{angle}°</span>
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--accent)]"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Colors
          </label>
          <div className="mt-2 flex flex-col gap-2.5">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(i, { color: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded border border-line bg-surface"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.pos}
                  onChange={(e) => updateStop(i, { pos: Number(e.target.value) })}
                  className="flex-1 accent-[var(--accent)]"
                />
                <span className="w-10 text-right font-mono text-xs text-muted">
                  {stop.pos}%
                </span>
                <button
                  onClick={() => removeStop(i)}
                  disabled={stops.length <= 2}
                  title="Remove color"
                  className="text-muted transition-colors hover:text-foreground disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addStop}
            disabled={stops.length >= 5}
            className="mt-3 text-sm font-medium text-accent transition-opacity hover:opacity-80 disabled:opacity-30"
          >
            + Add color
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            background: {css};
          </code>
          <div className="flex gap-2">
            <CopyButton text={`background: ${css};`} />
            <button
              onClick={randomize}
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium transition-colors hover:bg-background"
            >
              🎲 Random
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
