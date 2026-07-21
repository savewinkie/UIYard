"use client";

import { useRef, useState } from "react";
import CopyButton from "@/components/CopyButton";

type Loaded = { dataUri: string; name: string; type: string; bytes: number };

type Mode = "raw" | "img" | "css";

function prettyBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export default function ImageToBase64() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [mode, setMode] = useState<Mode>("raw");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = String(reader.result);
      setLoaded({ dataUri, name: file.name, type: file.type, bytes: file.size });
    };
    reader.readAsDataURL(file);
  }

  const output = loaded
    ? mode === "img"
      ? `<img src="${loaded.dataUri}" alt="" />`
      : mode === "css"
        ? `background-image: url("${loaded.dataUri}");`
        : loaded.dataUri
    : "";

  const encodedBytes = loaded ? new Blob([loaded.dataUri]).size : 0;

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) load(file);
        }}
        className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragging ? "border-accent bg-accent-soft/60" : "border-line bg-surface hover:border-accent/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
        />
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          <p className="text-sm font-medium">
            {loaded ? `${loaded.name} · ${loaded.type}` : "Drop an image, or click to browse"}
          </p>
          <p className="text-xs text-muted">Stays in your browser — never uploaded.</p>
        </div>
      </div>

      {loaded && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col gap-4">
            <div className="grid place-items-center overflow-hidden rounded-2xl border border-line bg-background p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={loaded.dataUri} alt="Encoded preview" className="max-h-40 max-w-full rounded-lg object-contain" />
            </div>
            <dl className="rounded-2xl border border-line bg-surface p-4 text-sm">
              <div className="flex justify-between py-1">
                <dt className="text-muted">Original</dt>
                <dd className="font-mono">{prettyBytes(loaded.bytes)}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted">Encoded</dt>
                <dd className="font-mono">{prettyBytes(encodedBytes)}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted">Overhead</dt>
                <dd className="font-mono">+{Math.round((encodedBytes / loaded.bytes - 1) * 100)}%</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "raw", label: "Data URI" },
                { id: "img", label: "<img>" },
                { id: "css", label: "CSS" },
              ] as { id: Mode; label: string }[]).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    mode === m.id
                      ? "bg-accent text-white"
                      : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <code className="block max-h-72 overflow-auto break-all rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
              {output}
            </code>
            <div className="flex items-center gap-3">
              <CopyButton text={output} label="Copy" />
              {encodedBytes > 100 * 1024 && (
                <span className="text-[11px] text-muted">
                  Large data URIs bloat your HTML/CSS — best for small icons.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
