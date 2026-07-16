"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function slugify(input: string, sep: string, strip: boolean): string {
  let s = input.trim();
  if (strip) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return s
    .toLowerCase()
    .replace(/['"’‘”“]/g, "")
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`\\${sep}{2,}`, "g"), sep)
    .replace(new RegExp(`^\\${sep}|\\${sep}$`, "g"), "");
}

export default function UrlSlugGenerator() {
  const [text, setText] = useState("");
  const [sep, setSep] = useState("-");
  const [strip, setStrip] = useState(true);

  const slug = slugify(text, sep, strip);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a title, e.g. Léon's 10 Best Café Tips!"
        className="w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm outline-none placeholder:text-muted focus:border-accent/50"
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface p-4 text-sm">
        <label className="flex items-center gap-2 text-muted">
          Separator
          <select
            value={sep}
            onChange={(e) => setSep(e.target.value)}
            className="rounded-lg border border-line bg-surface px-2 py-1.5 outline-none"
          >
            <option value="-">hyphen (-)</option>
            <option value="_">underscore (_)</option>
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={strip}
            onChange={(e) => setStrip(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          Convert accents (é → e)
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <p className="break-all font-mono text-sm leading-relaxed text-accent-ink">
          {slug ? `/${slug}` : <span className="font-sans text-muted">your-slug-appears-here</span>}
        </p>
        <div className="mt-3 border-t border-line pt-3">
          <CopyButton text={slug} label="Copy slug" />
        </div>
      </div>
    </div>
  );
}
