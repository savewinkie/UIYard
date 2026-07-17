"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Args = { color: string; size: number; speed: number };

const LOADERS: { id: string; name: string; css: (a: Args) => string }[] = [
  {
    id: "ring",
    name: "Ring",
    css: ({ color, size, speed }) => `.loader-ring {
  width: ${size}px;
  height: ${size}px;
  border: ${Math.max(3, size / 10)}px solid ${color}33;
  border-top-color: ${color};
  border-radius: 50%;
  animation: ring-spin ${speed}s linear infinite;
}
@keyframes ring-spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "dots",
    name: "Bouncing dots",
    css: ({ color, size, speed }) => `.loader-dots {
  display: flex;
  gap: ${size / 6}px;
}
.loader-dots span {
  width: ${size / 4}px;
  height: ${size / 4}px;
  border-radius: 50%;
  background: ${color};
  animation: dots-bounce ${speed}s ease-in-out infinite;
}
.loader-dots span:nth-child(2) { animation-delay: ${(speed / 6).toFixed(2)}s; }
.loader-dots span:nth-child(3) { animation-delay: ${(speed / 3).toFixed(2)}s; }
@keyframes dots-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-${size / 3}px); }
}
/* HTML: <div class="loader-dots"><span></span><span></span><span></span></div> */`,
  },
  {
    id: "bars",
    name: "Bars",
    css: ({ color, size, speed }) => `.loader-bars {
  display: flex;
  gap: ${size / 8}px;
  align-items: center;
  height: ${size}px;
}
.loader-bars span {
  width: ${size / 5}px;
  height: 100%;
  background: ${color};
  border-radius: ${size / 10}px;
  animation: bars-stretch ${speed}s ease-in-out infinite;
}
.loader-bars span:nth-child(2) { animation-delay: ${(speed / 8).toFixed(2)}s; }
.loader-bars span:nth-child(3) { animation-delay: ${(speed / 4).toFixed(2)}s; }
@keyframes bars-stretch {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}
/* HTML: <div class="loader-bars"><span></span><span></span><span></span></div> */`,
  },
  {
    id: "pulse",
    name: "Pulse",
    css: ({ color, size, speed }) => `.loader-pulse {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background: ${color};
  animation: pulse-grow ${speed}s ease-out infinite;
}
@keyframes pulse-grow {
  0% { transform: scale(0.4); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}`,
  },
  {
    id: "dual",
    name: "Dual ring",
    css: ({ color, size, speed }) => `.loader-dual {
  width: ${size}px;
  height: ${size}px;
  border: ${Math.max(3, size / 10)}px solid transparent;
  border-top-color: ${color};
  border-bottom-color: ${color};
  border-radius: 50%;
  animation: dual-spin ${speed}s linear infinite;
}
@keyframes dual-spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "flip",
    name: "Flipping square",
    css: ({ color, size, speed }) => `.loader-flip {
  width: ${size * 0.7}px;
  height: ${size * 0.7}px;
  background: ${color};
  border-radius: ${size / 12}px;
  animation: flip-turn ${speed * 1.4}s ease-in-out infinite;
}
@keyframes flip-turn {
  0% { transform: perspective(120px) rotateX(0) rotateY(0); }
  50% { transform: perspective(120px) rotateX(-180deg) rotateY(0); }
  100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); }
}`,
  },
];

function PreviewMarkup({ id }: { id: string }) {
  if (id === "dots") return <div className="loader-dots"><span /><span /><span /></div>;
  if (id === "bars") return <div className="loader-bars"><span /><span /><span /></div>;
  return <div className={`loader-${id}`} />;
}

export default function CssLoaderGenerator() {
  const [active, setActive] = useState("ring");
  const [color, setColor] = useState("#f5643c");
  const [size, setSize] = useState(48);
  const [speed, setSpeed] = useState(1);

  const args = { color, size, speed };
  const activeLoader = LOADERS.find((l) => l.id === active)!;
  const css = activeLoader.css(args);
  const allCss = LOADERS.map((l) => l.css(args)).join("\n");

  return (
    <div className="flex flex-col gap-6">
      <style>{allCss}</style>

      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-surface p-4">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          Color
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-11 cursor-pointer rounded border border-line" />
        </label>
        <label className="flex flex-1 items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted">
          Size
          <input type="range" min={24} max={96} value={size} onChange={(e) => setSize(Number(e.target.value))} className="min-w-24 flex-1 accent-[var(--accent)]" />
          <span className="font-mono">{size}px</span>
        </label>
        <label className="flex flex-1 items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted">
          Speed
          <input type="range" min={4} max={30} value={speed * 10} onChange={(e) => setSpeed(Number(e.target.value) / 10)} className="min-w-24 flex-1 accent-[var(--accent)]" />
          <span className="font-mono">{speed.toFixed(1)}s</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {LOADERS.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition-[transform,box-shadow,border-color,color] ${
              active === l.id
                ? "border-accent bg-accent-soft/50 shadow-[0_14px_30px_-18px_rgb(17_24_39_/_0.25)]"
                : "border-line bg-surface hover:border-accent/40"
            }`}
          >
            <span className="grid h-24 place-items-center">
              <PreviewMarkup id={l.id} />
            </span>
            <span className="text-sm font-medium">{l.name}</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <code className="block max-h-64 overflow-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
          {css}
        </code>
        <div className="mt-3">
          <CopyButton text={css} label={`Copy ${activeLoader.name} CSS`} />
        </div>
      </div>
    </div>
  );
}
