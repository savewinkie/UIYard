"use client";

import { useEffect, useState } from "react";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHashes({});
      return;
    }
    (async () => {
      const entries = await Promise.all(
        ALGOS.map(async (a) => [a, await hash(a, input)] as const)
      );
      if (!cancelled) setHashes(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [input]);

  async function copy(algo: string) {
    await navigator.clipboard.writeText(hashes[algo]);
    setCopied(algo);
    setTimeout(() => setCopied((c) => (c === algo ? null : c)), 1200);
  }

  return (
    <div className="flex flex-col gap-5">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text — hashes update live…"
        rows={5}
        spellCheck={false}
        className="w-full resize-y rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
      />

      <div className="flex flex-col gap-3">
        {ALGOS.map((algo) => (
          <button
            key={algo}
            onClick={() => hashes[algo] && copy(algo)}
            className="group flex flex-col gap-1 rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-accent/40"
          >
            <span className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {algo}
              </span>
              <span className="text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                {copied === algo ? "copied ✓" : "click to copy"}
              </span>
            </span>
            <span className="break-all font-mono text-xs leading-relaxed">
              {hashes[algo] || <span className="text-muted">—</span>}
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted">
        Computed locally with your browser&apos;s Web Crypto — nothing is sent anywhere.
      </p>
    </div>
  );
}
