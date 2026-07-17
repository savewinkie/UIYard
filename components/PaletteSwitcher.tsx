"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Dev-only. Writes palette tokens straight onto :root so Link can judge
 * colours on the real site instead of from a description. Tokens are set
 * inline (not via CSS classes) so nothing depends on the Tailwind build.
 * Once he picks one, the winner gets baked into :root in globals.css and
 * this component is deleted.
 */

type Tokens = Record<string, string>;
type Palette = { id: string; label: string; note: string; dot: string; light: Tokens; dark: Tokens };

const T = (
  background: string, surface: string, surface2: string, foreground: string,
  muted: string, line: string, accent: string, accentInk: string, accentSoft: string,
  warm: string, warmInk: string, warmSoft: string
): Tokens => ({
  "--background": background, "--surface": surface, "--surface-2": surface2,
  "--foreground": foreground, "--muted": muted, "--line": line,
  "--accent": accent, "--accent-ink": accentInk, "--accent-soft": accentSoft,
  "--warm": warm, "--warm-ink": warmInk, "--warm-soft": warmSoft,
});

const PALETTES: Palette[] = [
  {
    id: "coral", label: "Coral", note: "warm, friendly (current)", dot: "#f5643c",
    light: T("#fbf7f3","#ffffff","#fbf5f0","#2a1d18","#7c6a61","#efe4db","#f5643c","#db4e28","#fde7de","#f2a63d","#d97f1c","#fcefd9"),
    dark:  T("#17110e","#221812","#281c15","#f7ece4","#bda79b","#382a21","#fb7a54","#fd9576","#2f1b12","#f4b45e","#f8c87e","#2e2110"),
  },
  {
    id: "cobalt", label: "Cobalt", note: "classic software blue", dot: "#2563eb",
    light: T("#f7f8fb","#ffffff","#f2f4f8","#111827","#667085","#e4e7ec","#2563eb","#1d4ed8","#e6efff","#f59e0b","#b45309","#fef3e2"),
    dark:  T("#0b1120","#131c31","#182238","#eef2f8","#93a1b8","#24304a","#6f9dff","#9dbcff","#16233f","#fbbf24","#fcd34d","#2b2110"),
  },
  {
    id: "indigo", label: "Indigo", note: "10015's register", dot: "#4f46e5",
    light: T("#f6f6fb","#ffffff","#f1f1f9","#1e1b3a","#6b6a8c","#e6e5f2","#4f46e5","#4338ca","#ebeafd","#f59e0b","#b45309","#fef3e2"),
    dark:  T("#0d0b1a","#161331","#1c1839","#eeecfa","#a19cc8","#272254","#8b83f7","#a9a3fa","#201c45","#fbbf24","#fcd34d","#2b2110"),
  },
  {
    id: "graphite", label: "Graphite", note: "near-monochrome, Linear-ish", dot: "#18181b",
    light: T("#fafafa","#ffffff","#f4f4f5","#18181b","#71717a","#e4e4e7","#18181b","#000000","#efeff1","#f97316","#ea580c","#fff1e7"),
    dark:  T("#09090b","#141416","#1a1a1d","#fafafa","#a1a1aa","#27272a","#fafafa","#ffffff","#232326","#fb923c","#fdba74","#2a1a10"),
  },
  {
    id: "emerald", label: "Emerald", note: "professional, uncommon", dot: "#0d9488",
    light: T("#f6f9f7","#ffffff","#eff5f1","#10241c","#5f7a6f","#dfeae3","#0d9488","#0f766e","#dbf4ef","#f59e0b","#b45309","#fef3e2"),
    dark:  T("#08130f","#0f1f19","#13261f","#e9f5ef","#8fae9f","#1e3a2e","#2dd4bf","#5eead4","#0d2a24","#fbbf24","#fcd34d","#2b2110"),
  },
];

export default function PaletteSwitcher() {
  const [active, setActive] = useState("coral");
  const [open, setOpen] = useState(true);

  const paint = useCallback((id: string) => {
    const p = PALETTES.find((x) => x.id === id) ?? PALETTES[0];
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const tokens = dark ? p.dark : p.light;
    const root = document.documentElement;

    // Elements using `transition-all` animate background-color too, and an
    // unregistered custom property isn't interpolatable — so the transition
    // stalls holding the OLD colour and never repaints. Kill transitions for
    // the frame of the swap, then hand them back.
    const freeze = document.createElement("style");
    freeze.textContent = "*,*::before,*::after{transition:none !important}";
    document.head.appendChild(freeze);

    Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(k, v));

    void root.offsetHeight; // force the new values to resolve now
    requestAnimationFrame(() =>
      requestAnimationFrame(() => freeze.remove())
    );
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("uiyard-palette") || "coral";
    setActive(saved);
    paint(saved);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => paint(localStorage.getItem("uiyard-palette") || "coral");
    mq.addEventListener("change", onScheme);
    return () => mq.removeEventListener("change", onScheme);
  }, [paint]);

  function pick(id: string) {
    localStorage.setItem("uiyard-palette", id);
    setActive(id);
    paint(id);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open palette switcher"
        className="fixed bottom-4 left-4 z-[100] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-lg shadow-lg"
      >
        🎨
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[100] w-60 rounded-2xl border border-line bg-surface p-3 shadow-[0_20px_50px_-16px_rgb(0_0_0_/_0.45)]">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Try a palette
        </span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Hide palette switcher"
          className="text-muted transition-colors hover:text-accent"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            onClick={() => pick(p.id)}
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
              active === p.id ? "bg-accent-soft" : "hover:bg-surface-2"
            }`}
          >
            <span
              className="h-5 w-5 shrink-0 rounded-full border border-line"
              style={{ background: p.dot }}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-tight">{p.label}</span>
              <span className="block truncate text-[11px] text-muted">{p.note}</span>
            </span>
            {active === p.id && <span className="text-xs font-bold text-accent">✓</span>}
          </button>
        ))}
      </div>

      <p className="mt-2 px-1 text-[10px] leading-snug text-muted">
        Dev only — never ships. Click through, then tell me the winner.
      </p>
    </div>
  );
}
