"use client";

import { useEffect, useRef, useState } from "react";
import CopyButton from "@/components/CopyButton";

type Pt = { x: number; y: number };

const round = (n: number) => Math.round(n * 100) / 100;

// Plot bounds (px) for the [0,1] unit square inside the SVG.
const L = 30;
const R = 270;
const T = 30;
const Bt = 270;
const W = R - L;
const H = Bt - T;
const toPx = (p: Pt) => ({ x: L + p.x * W, y: Bt - p.y * H });

const PRESETS: { name: string; v: [number, number, number, number] }[] = [
  { name: "linear", v: [0, 0, 1, 1] },
  { name: "ease", v: [0.25, 0.1, 0.25, 1] },
  { name: "ease-in", v: [0.42, 0, 1, 1] },
  { name: "ease-out", v: [0, 0, 0.58, 1] },
  { name: "ease-in-out", v: [0.42, 0, 0.58, 1] },
  { name: "overshoot", v: [0.34, 1.56, 0.64, 1] },
];

export default function EasingEditor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [p1, setP1] = useState<Pt>({ x: 0.25, y: 0.1 });
  const [p2, setP2] = useState<Pt>({ x: 0.25, y: 1 });
  const [drag, setDrag] = useState<null | 1 | 2>(null);
  const [pos, setPos] = useState(0);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPos((p) => (p ? 0 : 1)), 1700);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTravel(Math.max(0, el.clientWidth - 32));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const loc = pt.matrixTransform(ctm.inverse());
      const x = Math.min(1, Math.max(0, (loc.x - L) / W));
      const y = Math.min(1.3, Math.max(-0.3, (Bt - loc.y) / H));
      const next = { x: round(x), y: round(y) };
      if (drag === 1) setP1(next);
      else setP2(next);
    };
    const up = () => setDrag(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag]);

  const bezier = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`;
  const css = `transition-timing-function: ${bezier};`;

  const a = toPx({ x: 0, y: 0 });
  const d = toPx({ x: 1, y: 1 });
  const b = toPx(p1);
  const c = toPx(p2);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border border-line bg-surface p-4">
        <svg ref={svgRef} viewBox="0 -50 300 400" className="w-full touch-none select-none">
          {/* unit square guide */}
          <rect x={L} y={T} width={W} height={H} fill="none" stroke="var(--line)" strokeWidth="1.5" />
          <line x1={L} y1={Bt} x2={R} y2={Bt} stroke="var(--line)" strokeWidth="1.5" />
          {/* handle guide lines */}
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
          <line x1={d.x} y1={d.y} x2={c.x} y2={c.y} stroke="var(--warm)" strokeWidth="1.5" opacity="0.6" />
          {/* the curve */}
          <path
            d={`M${a.x} ${a.y} C ${b.x} ${b.y} ${c.x} ${c.y} ${d.x} ${d.y}`}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2.5"
          />
          {/* endpoints */}
          <circle cx={a.x} cy={a.y} r="3.5" fill="var(--muted)" />
          <circle cx={d.x} cy={d.y} r="3.5" fill="var(--muted)" />
          {/* draggable handles */}
          <circle
            cx={b.x}
            cy={b.y}
            r="9"
            fill="var(--accent)"
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={() => setDrag(1)}
          />
          <circle
            cx={c.x}
            cy={c.y}
            r="9"
            fill="var(--warm)"
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={() => setDrag(2)}
          />
        </svg>
        <p className="mt-1 text-center text-xs text-muted">Drag the two dots to shape the curve</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* live motion preview */}
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">Preview</p>
          <div ref={trackRef} className="relative h-8 rounded-full bg-background">
            <div
              className="absolute left-1 top-1 h-6 w-6 rounded-full bg-accent"
              style={{
                transform: `translateX(${pos ? travel : 0}px)`,
                transition: `transform 1.3s ${bezier}`,
              }}
            />
          </div>
        </div>

        {/* presets */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setP1({ x: p.v[0], y: p.v[1] });
                setP2({ x: p.v[2], y: p.v[3] });
              }}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
          <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {css}
          </code>
          <CopyButton text={css} />
        </div>
      </div>
    </div>
  );
}
