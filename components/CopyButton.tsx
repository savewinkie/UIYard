"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "Copy CSS",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
        copied
          ? "bg-emerald-600 text-white"
          : "bg-accent text-white hover:bg-accent/90"
      }`}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
