"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function Slider({
  label,
  value,
  min,
  max,
  unit = "px",
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

function hexToRgb(hex: string) {
  return `${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}`;
}

function ShadowTool() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(12);
  const [blur, setBlur] = useState(32);
  const [spread, setSpread] = useState(-4);
  const [opacity, setOpacity] = useState(18);
  const [color, setColor] = useState("#1c1917");
  const [layered, setLayered] = useState(true);

  const rgb = hexToRgb(color);
  const shadow = layered
    ? // Stacked shadows with growing blur = the smooth "Stripe" look.
      [1, 2, 4]
        .map(
          (mult) =>
            `${x * mult * 0.5}px ${y * mult * 0.5}px ${blur * mult * 0.6}px ${spread}px rgba(${rgb}, ${(opacity / 100 / mult).toFixed(3)})`
        )
        .join(",\n    ")
    : `${x}px ${y}px ${blur}px ${spread}px rgba(${rgb}, ${(opacity / 100).toFixed(2)})`;

  const css = `box-shadow: ${shadow};`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid h-64 place-items-center rounded-2xl border border-line bg-background sm:h-96">
        <div
          className="grid h-36 w-56 place-items-center rounded-2xl bg-surface text-sm text-muted"
          style={{ boxShadow: shadow.replaceAll("\n    ", " ") }}
        >
          your card
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <Slider label="Offset X" value={x} min={-40} max={40} onChange={setX} />
        <Slider label="Offset Y" value={y} min={-40} max={40} onChange={setY} />
        <Slider label="Blur" value={blur} min={0} max={100} onChange={setBlur} />
        <Slider label="Spread" value={spread} min={-30} max={30} onChange={setSpread} />
        <Slider label="Opacity" value={opacity} min={0} max={60} unit="%" onChange={setOpacity} />

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border border-line"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={layered}
            onChange={(e) => setLayered(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          Layered (smoother, more natural)
        </label>

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

function GlassTool() {
  const [blur, setBlur] = useState(12);
  const [bgOpacity, setBgOpacity] = useState(25);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [saturate, setSaturate] = useState(160);

  const css = [
    `background: rgba(255, 255, 255, ${(bgOpacity / 100).toFixed(2)});`,
    `backdrop-filter: blur(${blur}px) saturate(${saturate}%);`,
    `-webkit-backdrop-filter: blur(${blur}px) saturate(${saturate}%);`,
    `border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});`,
    `border-radius: 16px;`,
  ].join("\n");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div
        className="relative grid h-64 place-items-center overflow-hidden rounded-2xl border border-line sm:h-96"
        style={{
          background:
            "linear-gradient(135deg, #f5643c 0%, #ec5a86 50%, #f6c65a 100%)",
        }}
      >
        <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-white/40" />
        <div className="absolute bottom-8 right-16 h-32 w-32 rounded-full bg-black/20" />
        <div
          className="relative grid h-36 w-64 place-items-center text-sm font-medium text-white"
          style={{
            background: `rgba(255,255,255,${bgOpacity / 100})`,
            backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
            border: `1px solid rgba(255,255,255,${borderOpacity / 100})`,
            borderRadius: 16,
          }}
        >
          frosted glass
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <Slider label="Blur" value={blur} min={0} max={40} onChange={setBlur} />
        <Slider label="Background" value={bgOpacity} min={0} max={80} unit="%" onChange={setBgOpacity} />
        <Slider label="Border" value={borderOpacity} min={0} max={100} unit="%" onChange={setBorderOpacity} />
        <Slider label="Saturation" value={saturate} min={100} max={300} unit="%" onChange={setSaturate} />

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

export default function ShadowGlass() {
  const [tab, setTab] = useState<"shadow" | "glass">("shadow");

  return (
    <div>
      <div className="mb-6 inline-flex rounded-lg bg-surface p-1 shadow-[inset_0_0_0_1px_var(--line)]">
        {(["shadow", "glass"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm capitalize transition-colors ${
              tab === t
                ? "bg-accent font-medium text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t === "shadow" ? "Box shadow" : "Glassmorphism"}
          </button>
        ))}
      </div>
      {tab === "shadow" ? <ShadowTool /> : <GlassTool />}
    </div>
  );
}
