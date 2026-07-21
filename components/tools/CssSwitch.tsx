"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

const HTML = `<label class="switch">
  <input type="checkbox" checked />
  <span class="slider"></span>
</label>`;

export default function CssSwitch() {
  const [width, setWidth] = useState(56);
  const [height, setHeight] = useState(32);
  const [radius, setRadius] = useState(32);
  const [onColor, setOnColor] = useState("#2563eb");
  const [offColor, setOffColor] = useState("#cbd5e1");
  const [knobColor, setKnobColor] = useState("#ffffff");

  const gap = Math.max(2, Math.round(height / 8));
  const knob = height - gap * 2;
  const travel = Math.max(0, width - knob - gap * 2);
  const r = Math.min(radius, height / 2);

  const css = useMemo(
    () => `.switch {
  position: relative;
  display: inline-block;
  width: ${width}px;
  height: ${height}px;
}
.switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  inset: 0;
  cursor: pointer;
  background: ${offColor};
  border-radius: ${r}px;
  transition: background 0.2s ease;
}
.slider::before {
  content: "";
  position: absolute;
  height: ${knob}px;
  width: ${knob}px;
  left: ${gap}px;
  bottom: ${gap}px;
  background: ${knobColor};
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s ease;
}
.switch input:checked + .slider {
  background: ${onColor};
}
.switch input:checked + .slider::before {
  transform: translateX(${travel}px);
}`,
    [width, height, r, offColor, onColor, knobColor, knob, gap, travel]
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      {/* Preview — the exact CSS below drives this switch; click to toggle */}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-background p-8">
        <style>{css}</style>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider" />
        </label>
        <p className="text-xs text-muted">Click the switch to toggle it.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">Width <span className="font-mono">{width}px</span></span>
          <input type="range" min={36} max={100} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">Height <span className="font-mono">{height}px</span></span>
          <input type="range" min={20} max={56} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">Corner radius <span className="font-mono">{r}px</span></span>
          <input type="range" min={4} max={Math.round(height / 2)} value={Math.min(radius, height / 2)} onChange={(e) => setRadius(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>

        <div className="flex flex-wrap gap-4 border-t border-line pt-4">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            On
            <input type="color" value={onColor} onChange={(e) => setOnColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-line" />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            Off
            <input type="color" value={offColor} onChange={(e) => setOffColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-line" />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            Knob
            <input type="color" value={knobColor} onChange={(e) => setKnobColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-line" />
          </label>
        </div>
      </div>

      {/* Code */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">HTML</p>
            <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
              {HTML}
            </code>
            <div className="mt-3">
              <CopyButton text={HTML} label="Copy HTML" />
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">CSS</p>
            <code className="block max-h-64 overflow-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
              {css}
            </code>
            <div className="mt-3">
              <CopyButton text={css} label="Copy CSS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
