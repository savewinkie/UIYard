"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function minify(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, "$1") // space around syntax
    .replace(/;}/g, "}") // trailing semicolons
    .trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const out = input.trim() ? minify(input) : "";

  const before = new Blob([input]).size;
  const after = new Blob([out]).size;
  const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">
      {out && (
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3 text-sm">
          <span className="text-muted">
            {before.toLocaleString()} B → <span className="font-semibold text-foreground">{after.toLocaleString()} B</span>
          </span>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
            {saved}% smaller
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSS…"
          rows={12}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
        />
        <div className="flex flex-col rounded-2xl border border-line bg-surface p-4">
          <p className="max-h-96 flex-1 overflow-auto break-all font-mono text-xs leading-relaxed">
            {out || <span className="text-muted">Minified CSS appears here.</span>}
          </p>
          <div className="mt-3 border-t border-line pt-3">
            <CopyButton text={out} label="Copy minified CSS" />
          </div>
        </div>
      </div>
    </div>
  );
}
