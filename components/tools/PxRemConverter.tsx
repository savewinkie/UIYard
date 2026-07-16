"use client";

import { useState } from "react";

const COMMON = [4, 8, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64];

export default function PxRemConverter() {
  const [base, setBase] = useState(16);
  const [px, setPx] = useState("16");
  const [rem, setRem] = useState("1");
  const [copied, setCopied] = useState<string | null>(null);

  function fromPx(v: string) {
    setPx(v);
    const n = parseFloat(v);
    setRem(isNaN(n) ? "" : String(Math.round((n / base) * 10000) / 10000));
  }

  function fromRem(v: string) {
    setRem(v);
    const n = parseFloat(v);
    setPx(isNaN(n) ? "" : String(Math.round(n * base * 100) / 100));
  }

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-6 rounded-2xl border border-line bg-surface p-5">
        <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
          Root font size
          <span className="flex items-center gap-2">
            <input
              type="number"
              value={base}
              min={1}
              onChange={(e) => {
                const b = Number(e.target.value) || 16;
                setBase(b);
                const n = parseFloat(px);
                if (!isNaN(n)) setRem(String(Math.round((n / b) * 10000) / 10000));
              }}
              className="w-20 rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
            />
            <span className="text-sm normal-case">px</span>
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
          Pixels
          <input
            value={px}
            onChange={(e) => fromPx(e.target.value)}
            className="w-28 rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
          />
        </label>

        <span className="pb-2 text-lg text-muted">=</span>

        <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
          Rem
          <input
            value={rem}
            onChange={(e) => fromRem(e.target.value)}
            className="w-28 rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-medium">px</th>
              <th className="px-5 py-3 font-medium">rem @ {base}px</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {COMMON.map((p) => {
              const r = Math.round((p / base) * 10000) / 10000;
              return (
                <tr key={p} className="border-t border-line bg-surface">
                  <td className="px-5 py-2.5 font-mono">{p}px</td>
                  <td className="px-5 py-2.5 font-mono">{r}rem</td>
                  <td className="px-5 py-2.5 text-right">
                    <button
                      onClick={() => copy(`${r}rem`)}
                      className="text-xs font-medium text-accent opacity-70 transition-opacity hover:opacity-100"
                    >
                      {copied === `${r}rem` ? "copied ✓" : "copy"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
