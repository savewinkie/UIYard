"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function formatHtml(html: string, indentSize: number): string {
  const pad = " ".repeat(indentSize);
  const raw = html.replace(/>\s+</g, "><").trim();
  const parts = raw.split(/(<[^>]+>)/).filter((s) => s.trim());
  let depth = 0;
  const out: string[] = [];

  for (const part of parts) {
    const isTag = /^<[^>]+>$/.test(part);
    if (!isTag) {
      out.push(pad.repeat(depth) + part.trim());
      continue;
    }
    const isClose = /^<\//.test(part);
    const tag = (part.match(/^<\/?\s*([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase() || "";
    const isComment = part.startsWith("<!");
    const selfClosing = /\/>$/.test(part);
    const isVoid = VOID.has(tag) || selfClosing || isComment;
    const isOpen = /^<[^/!]/.test(part) && !isVoid;

    if (isClose) depth = Math.max(0, depth - 1);
    out.push(pad.repeat(depth) + part);
    if (isOpen) depth++;
  }
  return out.join("\n");
}

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  const out = input.trim() ? formatHtml(input, indent) : "";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
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
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste minified or messy HTML…"
          rows={14}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
        />
        <div className="flex flex-col rounded-2xl border border-line bg-surface p-4">
          <pre className="max-h-96 flex-1 overflow-auto whitespace-pre font-mono text-xs leading-relaxed">
            {out || <span className="font-sans text-muted">Formatted HTML appears here.</span>}
          </pre>
          <div className="mt-3 border-t border-line pt-3">
            <CopyButton text={out} label="Copy HTML" />
          </div>
        </div>
      </div>
    </div>
  );
}
