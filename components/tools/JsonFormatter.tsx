"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [minify, setMinify] = useState(false);

  let out = "";
  let error: string | null = null;
  if (input.trim()) {
    try {
      const parsed = JSON.parse(input);
      out = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    } catch (e) {
      error = e instanceof Error ? e.message : "Invalid JSON";
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <div className="inline-flex rounded-lg bg-background p-1">
          <button
            onClick={() => setMinify(false)}
            className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${!minify ? "bg-accent font-medium text-white" : "text-muted hover:text-foreground"}`}
          >
            Pretty
          </button>
          <button
            onClick={() => setMinify(true)}
            className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${minify ? "bg-accent font-medium text-white" : "text-muted hover:text-foreground"}`}
          >
            Minify
          </button>
        </div>
        {!minify && (
          <label className="flex items-center gap-2 text-sm text-muted">
            Indent
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="rounded-lg border border-line bg-surface px-2 py-1.5 text-sm outline-none"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        )}
        {error && (
          <span className="rounded-full bg-[#fdecea] px-3 py-1 text-xs font-medium text-[#b3261e] dark:bg-[#3a1512] dark:text-[#ff8a80]">
            {error}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"paste": "your JSON here"}'
          rows={14}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
        />
        <div className="flex flex-col rounded-2xl border border-line bg-surface p-4">
          <pre className="max-h-96 flex-1 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {out || <span className="font-sans text-muted">Formatted JSON appears here.</span>}
          </pre>
          <div className="mt-3 border-t border-line pt-3">
            <CopyButton text={out} label="Copy JSON" />
          </div>
        </div>
      </div>
    </div>
  );
}
