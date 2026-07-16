"use client";

import { useRef, useState } from "react";

type Loaded = { img: HTMLImageElement; name: string; w: number; h: number };

export default function ImageResizer() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [quality, setQuality] = useState(90);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setLoaded({ img, name: file.name.replace(/\.[^.]+$/, ""), w: img.width, h: img.height });
      setW(img.width);
      setH(img.height);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function setWidth(nw: number) {
    setW(nw);
    if (lock && loaded) setH(Math.max(1, Math.round(nw * (loaded.h / loaded.w))));
  }
  function setHeight(nh: number) {
    setH(nh);
    if (lock && loaded) setW(Math.max(1, Math.round(nh * (loaded.w / loaded.h))));
  }

  function download() {
    if (!loaded || w < 1 || h < 1) return;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    if (format === "jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(loaded.img, 0, 0, w, h);
    const a = document.createElement("a");
    a.href = canvas.toDataURL(`image/${format}`, quality / 100);
    a.download = `${loaded.name}-${w}x${h}.${format === "jpeg" ? "jpg" : format}`;
    a.click();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Clean & minimal drop zone — Link's call */}
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
            {loaded ? `${loaded.name} · ${loaded.w}×${loaded.h}px` : "Drop an image, or click to browse"}
          </p>
          <p className="text-xs text-muted">Stays in your browser — never uploaded.</p>
        </div>
      </div>

      {loaded && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid place-items-center overflow-hidden rounded-2xl border border-line bg-background p-4">
            {/* live preview scaled to fit, real export uses full resolution */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={loaded.img.src}
              alt="Preview of the image being resized"
              className="max-h-80 max-w-full rounded-lg object-contain"
              style={{ aspectRatio: `${w} / ${h}` }}
            />
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-end gap-3">
              <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                Width
                <input
                  type="number"
                  min={1}
                  value={w || ""}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
                />
              </label>
              <button
                onClick={() => setLock((v) => !v)}
                title={lock ? "Aspect ratio locked" : "Aspect ratio free"}
                className={`mb-0.5 rounded-lg border px-2.5 py-2 text-sm transition-colors ${lock ? "border-accent/50 bg-accent-soft text-accent" : "border-line text-muted"}`}
              >
                {lock ? "🔒" : "🔓"}
              </button>
              <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                Height
                <input
                  type="number"
                  min={1}
                  value={h || ""}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="rounded-lg border border-line bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/50"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {[0.25, 0.5, 0.75].map((f) => (
                <button
                  key={f}
                  onClick={() => setWidth(Math.max(1, Math.round(loaded.w * f)))}
                  className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {f * 100}%
                </button>
              ))}
              <button
                onClick={() => {
                  setW(loaded.w);
                  setH(loaded.h);
                }}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                Original
              </button>
            </div>

            <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
              Format
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm normal-case outline-none"
              >
                <option value="png">PNG (lossless)</option>
                <option value="jpeg">JPG (smaller)</option>
                <option value="webp">WebP (modern)</option>
              </select>
            </label>

            {format !== "png" && (
              <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                <span className="flex justify-between">
                  Quality <span className="font-mono">{quality}%</span>
                </span>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="accent-[var(--accent)]"
                />
              </label>
            )}

            <button
              onClick={download}
              className="mt-auto rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              ⤓ Download {w}×{h}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
