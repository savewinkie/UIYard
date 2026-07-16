"use client";

import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function luminance([r, g, b]: [number, number, number]) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function ratio(fg: string, bg: string) {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
        pass
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <span
        className={`flex items-center gap-1.5 text-sm font-semibold ${
          pass ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {pass ? "Pass" : "Fail"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          {pass ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
        </svg>
      </span>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 cursor-pointer rounded-lg border border-line"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
            if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
          }}
          className="w-full rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
        />
      </div>
    </div>
  );
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#2a1d18");
  const [bg, setBg] = useState("#fbf7f3");
  const r = ratio(fg, bg);
  const rounded = Math.round(r * 100) / 100;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      <div
        className="flex flex-col justify-center gap-4 rounded-2xl border border-line p-8 sm:p-12"
        style={{ background: bg, color: fg }}
      >
        <p className="text-3xl font-bold tracking-tight sm:text-4xl">
          The quick brown fox
        </p>
        <p className="text-lg">
          Large text sits around 24px. This paragraph is normal body text —
          the kind people actually read for a while, so it needs the most
          contrast to stay comfortable.
        </p>
        <p className="text-sm opacity-90">Small print and captions live down here.</p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <ColorField label="Text color" value={fg} onChange={setFg} />
        <ColorField label="Background color" value={bg} onChange={setBg} />

        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Contrast ratio
          </span>
          <span className="font-mono text-2xl font-semibold">{rounded}:1</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Badge pass={r >= 4.5} label="AA · normal text" />
          <Badge pass={r >= 3} label="AA · large text" />
          <Badge pass={r >= 7} label="AAA · normal text" />
          <Badge pass={r >= 4.5} label="AAA · large text" />
        </div>
      </div>
    </div>
  );
}
