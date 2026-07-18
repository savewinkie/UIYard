"use client";

import { useState } from "react";

type Row = { type: "same" | "add" | "remove"; text: string };

// Classic longest-common-subsequence line diff.
function diffLines(aText: string, bText: string): Row[] {
  const a = aText.split("\n");
  const b = bText.split("\n");
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const rows: Row[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      rows.push({ type: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ type: "remove", text: a[i] });
      i++;
    } else {
      rows.push({ type: "add", text: b[j] });
      j++;
    }
  }
  while (i < m) rows.push({ type: "remove", text: a[i++] });
  while (j < n) rows.push({ type: "add", text: b[j++] });
  return rows;
}

export default function TextDiff() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const rows = a || b ? diffLines(a, b) : [];
  const added = rows.filter((r) => r.type === "add").length;
  const removed = rows.filter((r) => r.type === "remove").length;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            Original
          </label>
          <textarea
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Paste the original text…"
            rows={8}
            className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            Changed
          </label>
          <textarea
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Paste the changed text…"
            rows={8}
            className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface">
        <div className="flex items-center gap-4 border-b border-line px-4 py-2.5 text-xs font-medium">
          <span className="text-emerald-600">+{added} added</span>
          <span className="text-red-500">−{removed} removed</span>
        </div>
        {rows.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted">
            Paste text on both sides to see the differences.
          </p>
        ) : (
          <div className="max-h-96 overflow-auto p-2 font-mono text-xs leading-relaxed">
            {rows.map((r, i) => (
              <div
                key={i}
                className={
                  r.type === "add"
                    ? "whitespace-pre-wrap rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-300"
                    : r.type === "remove"
                      ? "whitespace-pre-wrap rounded bg-red-500/10 px-2 py-0.5 text-red-600 dark:text-red-300"
                      : "whitespace-pre-wrap px-2 py-0.5 text-muted"
                }
              >
                <span className="select-none opacity-60">
                  {r.type === "add" ? "+ " : r.type === "remove" ? "− " : "  "}
                </span>
                {r.text || " "}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
