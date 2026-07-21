"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="24" fill="#2563eb"/>
  <path d="M35 62l18 18 32-38" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

type Dims = { w: number; h: number } | null;

/** Pull an intrinsic pixel size out of an SVG string (width/height, else viewBox). */
function parseDims(svg: string): Dims {
  try {
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    const el = doc.querySelector("svg");
    if (!el || doc.querySelector("parsererror")) return null;
    const wAttr = parseFloat(el.getAttribute("width") || "");
    const hAttr = parseFloat(el.getAttribute("height") || "");
    if (wAttr > 0 && hAttr > 0) return { w: wAttr, h: hAttr };
    const vb = (el.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    if (vb.length === 4 && vb[2] > 0 && vb[3] > 0) return { w: vb[2], h: vb[3] };
    return null;
  } catch {
    return null;
  }
}

const SCALES = [1, 2, 3, 4];

export default function SvgToPng() {
  const [svg, setSvg] = useState(SAMPLE);
  const [scale, setScale] = useState(2);
  const [bg, setBg] = useState<"transparent" | "white" | "custom">("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const fileRef = useRef<HTMLInputElement>(null);

  const dims = useMemo(() => parseDims(svg), [svg]);

  const url = useMemo(() => {
    if (!svg.trim()) return "";
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [svg]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const outW = dims ? Math.round(dims.w * scale) : 0;
  const outH = dims ? Math.round(dims.h * scale) : 0;
  const fill = bg === "transparent" ? null : bg === "white" ? "#ffffff" : bgColor;

  function download() {
    if (!dims || !url) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d")!;
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fillRect(0, 0, outW, outH);
      }
      ctx.drawImage(img, 0, 0, outW, outH);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `image@${scale}x.png`;
      a.click();
    };
    img.src = url;
  }

  function loadFile(file: File) {
    if (!/svg/.test(file.type) && !file.name.endsWith(".svg")) return;
    file.text().then(setSvg);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      {/* Input + preview */}
      <div className="flex flex-col gap-4">
        <textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          spellCheck={false}
          placeholder="Paste your SVG markup here…"
          className="h-40 resize-y rounded-2xl border border-line bg-background p-4 font-mono text-xs leading-relaxed outline-none focus:border-accent/50"
        />
        <div
          className="grid min-h-56 place-items-center rounded-2xl border border-line p-6"
          style={{
            backgroundColor: fill || "transparent",
            backgroundImage: fill
              ? undefined
              : "repeating-conic-gradient(#0000000d 0% 25%, transparent 0% 50%)",
            backgroundSize: fill ? undefined : "20px 20px",
          }}
        >
          {url && dims ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={url} alt="SVG preview" className="max-h-64 max-w-full object-contain" />
          ) : (
            <p className="text-sm text-muted">
              {svg.trim() ? "Couldn’t read this SVG — check the markup." : "Paste an SVG to preview it."}
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          Upload .svg file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".svg,image/svg+xml"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
        />

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Scale</p>
          <div className="grid grid-cols-4 gap-2">
            {SCALES.map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                  scale === s
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Background</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "transparent", label: "None" },
              { id: "white", label: "White" },
              { id: "custom", label: "Custom" },
            ] as const).map((b) => (
              <button
                key={b.id}
                onClick={() => setBg(b.id)}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                  bg === b.id
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          {bg === "custom" && (
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-2 h-8 w-full cursor-pointer rounded border border-line"
            />
          )}
        </div>

        <div className="mt-auto border-t border-line pt-4">
          <p className="mb-3 text-sm text-muted">
            Output:{" "}
            <span className="font-mono text-foreground">
              {dims ? `${outW}×${outH}px` : "—"}
            </span>
          </p>
          <button
            onClick={download}
            disabled={!dims}
            className="w-full rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ⤓ Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
