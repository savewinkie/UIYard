"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Corners = { tl: number; tr: number; br: number; bl: number };

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        <span className="font-mono">{value}px</span>
      </label>
      <input
        type="range"
        min={0}
        max={150}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

export default function BorderRadius() {
  const [c, setC] = useState<Corners>({ tl: 38, tr: 12, br: 38, bl: 12 });
  const [linked, setLinked] = useState(false);

  function set(key: keyof Corners, v: number) {
    setC((prev) => (linked ? { tl: v, tr: v, br: v, bl: v } : { ...prev, [key]: v }));
  }

  const radius = `${c.tl}px ${c.tr}px ${c.br}px ${c.bl}px`;
  const css = `border-radius: ${radius};`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid h-64 place-items-center rounded-2xl border border-line bg-background sm:h-96">
        <div
          className="h-40 w-56 border-2 sm:h-52 sm:w-72"
          style={{
            borderRadius: radius,
            borderColor: "var(--accent)",
            background: "var(--accent-soft)",
          }}
        />
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={linked}
            onChange={(e) => {
              setLinked(e.target.checked);
              if (e.target.checked) setC((p) => ({ tl: p.tl, tr: p.tl, br: p.tl, bl: p.tl }));
            }}
            className="accent-[var(--accent)]"
          />
          Link all corners
        </label>

        <Slider label="Top left" value={c.tl} onChange={(v) => set("tl", v)} />
        {!linked && (
          <>
            <Slider label="Top right" value={c.tr} onChange={(v) => set("tr", v)} />
            <Slider label="Bottom right" value={c.br} onChange={(v) => set("br", v)} />
            <Slider label="Bottom left" value={c.bl} onChange={(v) => set("bl", v)} />
          </>
        )}

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
