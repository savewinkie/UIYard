"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [full, setFull] = useState(false);
  const [input, setInput] = useState("");

  let out = "";
  let error: string | null = null;
  if (input) {
    try {
      if (mode === "encode") {
        out = full ? encodeURI(input) : encodeURIComponent(input);
      } else {
        out = full ? decodeURI(input) : decodeURIComponent(input);
      }
    } catch {
      error = "That string can't be decoded.";
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <div className="inline-flex rounded-lg bg-background p-1">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3.5 py-1.5 text-sm capitalize transition-colors ${
                mode === m ? "bg-accent font-medium text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={full}
            onChange={(e) => setFull(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          Treat as full URL (keep / ? & =)
        </label>
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
          placeholder={mode === "encode" ? "Text or URL to encode…" : "Encoded URL to decode…"}
          rows={7}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
        />
        <div className="flex flex-col rounded-2xl border border-line bg-surface p-4">
          <p className="flex-1 break-all font-mono text-xs leading-relaxed">
            {out || <span className="font-sans text-muted">Result appears here.</span>}
          </p>
          <div className="mt-3 border-t border-line pt-3">
            <CopyButton text={out} label="Copy result" />
          </div>
        </div>
      </div>
    </div>
  );
}
