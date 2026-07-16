"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const OPTIONS = [
  { id: "collapse", label: "Collapse double spaces" },
  { id: "trim", label: "Trim line starts & ends" },
  { id: "empty", label: "Remove empty lines" },
  { id: "breaks", label: "Remove ALL line breaks" },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"];

export default function WhitespaceRemover() {
  const [text, setText] = useState("");
  const [on, setOn] = useState<Record<OptionId, boolean>>({
    collapse: true,
    trim: true,
    empty: true,
    breaks: false,
  });

  let out = text;
  if (on.breaks) out = out.replace(/\s*\n+\s*/g, " ");
  if (on.trim) out = out.replace(/^[ \t]+|[ \t]+$/gm, "");
  if (on.empty) out = out.replace(/\n{2,}/g, "\n");
  if (on.collapse) out = out.replace(/[ \t]{2,}/g, " ");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface p-4">
        {OPTIONS.map((o) => (
          <label key={o.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={on[o.id]}
              onChange={(e) => setOn((p) => ({ ...p, [o.id]: e.target.checked }))}
              className="accent-[var(--accent)]"
            />
            {o.label}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste messy text here…"
          rows={10}
          className="w-full resize-y rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
        />
        <div className="flex flex-col rounded-2xl border border-line bg-surface p-4">
          <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed">
            {out || <span className="text-muted">Clean text appears here.</span>}
          </p>
          <div className="mt-3 border-t border-line pt-3">
            <CopyButton text={out} label="Copy clean text" />
          </div>
        </div>
      </div>
    </div>
  );
}
