"use client";

import { useEffect, useState } from "react";

const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  digits: "23456789",
  symbols: "!@#$%^&*-_=+?",
};

type SetKey = keyof typeof SETS;

function generate(length: number, on: Record<SetKey, boolean>): string {
  const pools = (Object.keys(SETS) as SetKey[]).filter((k) => on[k]);
  if (pools.length === 0) return "";
  const all = pools.map((k) => SETS[k]).join("");
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  // Guarantee one char from every enabled set, fill the rest from the pool.
  const out: string[] = pools.map(
    (k, i) => SETS[k][bytes[i] % SETS[k].length]
  );
  for (let i = pools.length; i < length; i++) out.push(all[bytes[i] % all.length]);
  // Shuffle (Fisher-Yates with fresh randomness).
  const shuffle = new Uint32Array(length);
  crypto.getRandomValues(shuffle);
  for (let i = out.length - 1; i > 0; i--) {
    const j = shuffle[i] % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.slice(0, length).join("");
}

function strengthOf(length: number, on: Record<SetKey, boolean>) {
  const pool = (Object.keys(SETS) as SetKey[])
    .filter((k) => on[k])
    .reduce((n, k) => n + SETS[k].length, 0);
  const bits = pool ? Math.round(length * Math.log2(pool)) : 0;
  if (bits >= 90) return { label: "Very strong", color: "#3f9d64", pct: 100 };
  if (bits >= 60) return { label: "Strong", color: "#7fa650", pct: 75 };
  if (bits >= 40) return { label: "Okay", color: "#e7a93a", pct: 50 };
  return { label: "Weak", color: "#e2604e", pct: 25 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [on, setOn] = useState<Record<SetKey, boolean>>({
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassword(generate(length, on));
  }, [length, on]);

  const strength = strengthOf(length, on);

  async function copy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="break-all text-center font-mono text-xl leading-relaxed sm:text-2xl">
          {password || <span className="text-sm text-muted">Enable at least one set below.</span>}
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full transition-[transform,box-shadow,border-color,color] duration-300"
            style={{ width: `${strength.pct}%`, background: strength.color }}
          />
        </div>
        <p className="mt-2 text-center text-xs font-medium" style={{ color: strength.color }}>
          {strength.label}
        </p>
        <div className="mt-4 flex justify-center gap-3 border-t border-line pt-4">
          <button
            onClick={copy}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors ${copied ? "bg-emerald-600" : "bg-accent hover:bg-accent/90"}`}
          >
            {copied ? "Copied ✓" : "Copy password"}
          </button>
          <button
            onClick={() => setPassword(generate(length, on))}
            className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            ↻ New one
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5">
        <label className="flex items-center gap-3 text-sm text-muted">
          <span className="text-xs font-medium uppercase tracking-wider">Length</span>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <span className="w-8 text-right font-mono tabular-nums">{length}</span>
        </label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {(
            [
              ["lower", "abc"],
              ["upper", "ABC"],
              ["digits", "123"],
              ["symbols", "#$&"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={on[key]}
                onChange={(e) => setOn((p) => ({ ...p, [key]: e.target.checked }))}
                className="accent-[var(--accent)]"
              />
              <span className="font-mono">{label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-muted">
          Generated locally with crypto-grade randomness — never sent, stored or logged.
          Ambiguous characters (l, 1, O, 0) are left out.
        </p>
      </div>
    </div>
  );
}
