"use client";

import { useEffect, useState } from "react";
import HeroArt from "@/components/HeroArt";

// The palette that fills up, left to right.
const SWATCHES = ["#f5643c", "#f2a63d", "#f6c65a", "#9ccc54", "#2a1d18"];

// 7 ticks x 700ms ≈ 5s per loop:
// ticks 1-5 light the swatches, tick 6 celebrates, tick 0 resets.
const TICK_MS = 700;
const TICKS = 7;

export default function HeroScene() {
  const [tick, setTick] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const id = setInterval(() => setTick((t) => (t + 1) % TICKS), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const lit = still ? SWATCHES.length : Math.min(tick, SWATCHES.length);
  const celebrating = !still && tick === TICKS - 1;

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* ambient warmth, brightens on celebrate */}
      <div
        className="blob left-[6%] top-[12%] h-56 w-56 transition-opacity duration-500"
        style={{
          background: "rgb(37 99 235 / 0.26)",
          opacity: celebrating ? 0.9 : 0.4,
        }}
      />
      <div
        className="blob bottom-[8%] right-[8%] h-44 w-44 transition-opacity duration-500"
        style={{
          background: "rgb(242 166 61 / 0.3)",
          opacity: celebrating ? 0.85 : 0.35,
          animationDelay: "-8s",
        }}
      />

      {/* floating tool cards — lift and glow when the palette completes */}
      <div
        className="relative"
        style={{
          filter: celebrating
            ? "drop-shadow(0 0 26px rgb(37 99 235 / 0.4)) drop-shadow(0 0 60px rgb(242 166 61 / 0.3))"
            : "drop-shadow(0 0 0 rgb(37 99 235 / 0))",
          transform: celebrating ? "translateY(-6px) scale(1.012)" : "none",
          transition:
            "filter 420ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <HeroArt />

        {/* sparkles on completion */}
        {celebrating && (
          <>
            <span className="sparkle" style={{ left: "16%", top: "6%", ["--sd" as string]: "0ms" }} />
            <span className="sparkle" style={{ left: "42%", top: "-2%", ["--sd" as string]: "90ms", background: "var(--warm)" }} />
            <span className="sparkle" style={{ left: "6%", top: "38%", ["--sd" as string]: "170ms" }} />
            <span className="sparkle" style={{ right: "10%", bottom: "8%", ["--sd" as string]: "240ms", background: "var(--warm)" }} />
          </>
        )}
      </div>

      {/* the palette bar — built in code so it can actually fill up */}
      <div
        className="absolute right-[2%] top-[2%] rounded-2xl border border-line bg-surface p-2.5 shadow-[0_16px_40px_-18px_rgb(42_29_24_/_0.35)] transition-[transform,box-shadow,border-color,color] duration-500 sm:right-0"
        style={{
          transform: celebrating ? "translateY(-4px) scale(1.04)" : "none",
          borderColor: celebrating ? "var(--accent)" : "var(--line)",
        }}
      >
        <div className="flex gap-1.5">
          {SWATCHES.map((c, i) => {
            const on = i < lit;
            return (
              <span
                key={c}
                className="block h-8 w-5 rounded-md sm:h-10 sm:w-6"
                style={{
                  background: c,
                  opacity: on ? 1 : 0.18,
                  transform: on ? "scale(1)" : "scale(0.82)",
                  transition:
                    "opacity 260ms cubic-bezier(.22,1,.36,1), transform 260ms cubic-bezier(.22,1,.36,1)",
                }}
              />
            );
          })}
        </div>
        <p
          className="mt-1.5 text-center text-[10px] font-medium transition-colors duration-300"
          style={{ color: celebrating ? "var(--accent)" : "var(--muted)" }}
        >
          {celebrating ? "palette ready ✓" : `${lit}/${SWATCHES.length}`}
        </p>
      </div>
    </div>
  );
}
