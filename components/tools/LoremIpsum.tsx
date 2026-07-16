"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

const BANK =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

function seededSentence(rand: () => number): string {
  const len = 8 + Math.floor(rand() * 10);
  const w: string[] = [];
  for (let i = 0; i < len; i++) w.push(BANK[Math.floor(rand() * BANK.length)]);
  const s = w.join(" ");
  return s[0].toUpperCase() + s.slice(1) + ".";
}

function generate(mode: string, amount: number, seed: number): string {
  let state = seed;
  const rand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  if (mode === "words") {
    const w: string[] = [];
    for (let i = 0; i < amount; i++) w.push(BANK[Math.floor(rand() * BANK.length)]);
    const s = w.join(" ");
    return s[0].toUpperCase() + s.slice(1) + ".";
  }
  if (mode === "sentences") {
    return Array.from({ length: amount }, () => seededSentence(rand)).join(" ");
  }
  return Array.from({ length: amount }, () =>
    Array.from({ length: 3 + Math.floor(rand() * 3) }, () => seededSentence(rand)).join(" ")
  ).join("\n\n");
}

export default function LoremIpsum() {
  const [mode, setMode] = useState("paragraphs");
  const [amount, setAmount] = useState(3);
  const [seed, setSeed] = useState(42);

  const out = useMemo(() => generate(mode, amount, seed), [mode, amount, seed]);
  const max = mode === "words" ? 200 : mode === "sentences" ? 30 : 10;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <div className="inline-flex rounded-lg bg-background p-1">
          {["paragraphs", "sentences", "words"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setAmount(m === "words" ? 40 : m === "sentences" ? 5 : 3);
              }}
              className={`rounded-md px-3.5 py-1.5 text-sm capitalize transition-colors ${
                mode === m ? "bg-accent font-medium text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <label className="flex flex-1 items-center gap-3 text-sm text-muted">
          <span className="font-mono tabular-nums">{amount}</span>
          <input
            type="range"
            min={1}
            max={max}
            value={Math.min(amount, max)}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full min-w-32 accent-[var(--accent)]"
          />
        </label>

        <button
          onClick={() => setSeed(Math.floor(Math.random() * 1e9))}
          className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          ↻ Reroll
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="max-h-96 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-muted">
          {out}
        </p>
        <div className="mt-4 border-t border-line pt-4">
          <CopyButton text={out} label="Copy text" />
        </div>
      </div>
    </div>
  );
}
