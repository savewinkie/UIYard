"use client";

import { useState } from "react";

type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB | null {
  const m = hex.trim().replace("#", "");
  const h = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const to = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function parseRgb(s: string): RGB | null {
  const m = s.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return null;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if ([r, g, b].some((n) => n > 255)) return null;
  return { r, g, b };
}

function parseHsl(s: string): RGB | null {
  const m = s.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
  if (!m) return null;
  const [h, sl, l] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (h > 360 || sl > 100 || l > 100) return null;
  return hslToRgb(h, sl, l);
}

export default function HexRgbConverter() {
  const [rgb, setRgb] = useState<RGB>({ r: 245, g: 100, b: 60 });
  const [drafts, setDrafts] = useState<Record<string, string> | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const values: Record<string, string> = drafts ?? {
    hex,
    rgb: `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };

  function commit(kind: string, value: string) {
    const parsed =
      kind === "hex" ? hexToRgb(value) : kind === "rgb" ? parseRgb(value) : parseHsl(value);
    if (parsed) setRgb(parsed);
    setDrafts(null);
  }

  async function copy(kind: string) {
    await navigator.clipboard.writeText(values[kind]);
    setCopied(kind);
    setTimeout(() => setCopied((c) => (c === kind ? null : c)), 1200);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <div
          className="h-36 w-full rounded-2xl border border-line/60"
          style={{ backgroundColor: hex }}
        />
        <input
          type="color"
          value={hex}
          onChange={(e) => {
            const p = hexToRgb(e.target.value);
            if (p) setRgb(p);
            setDrafts(null);
          }}
          className="h-10 w-full cursor-pointer rounded-lg border border-line"
        />
      </div>

      <div className="flex flex-col gap-3">
        {(["hex", "rgb", "hsl"] as const).map((kind) => (
          <div key={kind} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
            <span className="w-10 text-xs font-semibold uppercase tracking-wider text-muted">
              {kind}
            </span>
            <input
              value={values[kind]}
              onChange={(e) => setDrafts({ ...values, [kind]: e.target.value })}
              onBlur={(e) => commit(kind, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commit(kind, e.currentTarget.value)}
              spellCheck={false}
              className="min-w-0 flex-1 rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
            />
            <button
              onClick={() => copy(kind)}
              className="rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent/90"
            >
              {copied === kind ? "✓" : "Copy"}
            </button>
          </div>
        ))}
        <p className="text-xs text-muted">
          Type in any field and press Enter — the others follow.
        </p>
      </div>
    </div>
  );
}
