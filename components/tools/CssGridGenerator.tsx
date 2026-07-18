"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function Slider({
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        <span className="font-mono">
          {value}
          {unit}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

export default function CssGridGenerator() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(12);

  const css = `display: grid;
grid-template-columns: repeat(${cols}, 1fr);
grid-template-rows: repeat(${rows}, 1fr);
gap: ${gap}px;`;

  const cells = cols * rows;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-line bg-background p-5">
        <div
          className="h-64 sm:h-96"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {Array.from({ length: cells }, (_, i) => (
            <div
              key={i}
              className="grid place-items-center rounded-lg bg-accent-soft font-mono text-xs text-accent"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <Slider label="Columns" value={cols} min={1} max={8} onChange={setCols} />
        <Slider label="Rows" value={rows} min={1} max={8} onChange={setRows} />
        <Slider label="Gap" value={gap} min={0} max={48} unit="px" onChange={setGap} />

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {css}
          </code>
          <CopyButton text={css} />
        </div>
      </div>
    </div>
  );
}
