"use client";

import { useCallback, useEffect, useState } from "react";
import { generatePalette, isLight } from "@/lib/color";
import CopyButton from "@/components/CopyButton";

type Swatch = { hex: string; locked: boolean };

export default function PaletteGenerator() {
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const regenerate = useCallback(() => {
    setSwatches((prev) => {
      const fresh = generatePalette();
      if (prev.length === 0)
        return fresh.map((hex) => ({ hex, locked: false }));
      return prev.map((s, i) => (s.locked ? s : { hex: fresh[i], locked: false }));
    });
  }, []);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  // Spacebar regenerates — unless the user is typing somewhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      const target = e.target;
      // Let space do its normal job inside form fields and on focused buttons.
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, button")
      )
        return;
      e.preventDefault();
      regenerate();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [regenerate]);

  function toggleLock(index: number) {
    setSwatches((prev) =>
      prev.map((s, i) => (i === index ? { ...s, locked: !s.locked } : s))
    );
  }

  async function copyHex(index: number) {
    await navigator.clipboard.writeText(swatches[index].hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  }

  const cssExport = `:root {\n${swatches
    .map((s, i) => `  --color-${i + 1}: ${s.hex};`)
    .join("\n")}\n}`;

  return (
    <div>
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line sm:grid-cols-5">
        {swatches.map((swatch, i) => {
          const dark = !isLight(swatch.hex);
          return (
            <div
              key={i}
              className="group relative flex h-40 flex-col items-center justify-end pb-4 sm:h-64"
              style={{ backgroundColor: swatch.hex }}
            >
              <button
                onClick={() => toggleLock(i)}
                title={swatch.locked ? "Unlock" : "Lock this color"}
                className={`absolute top-3 rounded-full p-2 text-lg transition-opacity ${
                  swatch.locked
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } ${dark ? "text-white/90" : "text-black/70"}`}
              >
                {swatch.locked ? "🔒" : "🔓"}
              </button>
              <button
                onClick={() => copyHex(i)}
                title="Copy hex"
                className={`rounded-lg px-2.5 py-1 font-mono text-sm font-medium tracking-wide transition-colors ${
                  dark
                    ? "text-white/90 hover:bg-white/15"
                    : "text-black/70 hover:bg-black/10"
                }`}
              >
                {copiedIndex === i ? "copied!" : swatch.hex.toUpperCase()}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={regenerate}
          className="rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Generate
        </button>
        <CopyButton text={cssExport} label="Export CSS variables" />
        <p className="text-sm text-muted">
          or press{" "}
          <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-xs">
            space
          </kbd>{" "}
          · click a color to lock it
        </p>
      </div>
    </div>
  );
}
