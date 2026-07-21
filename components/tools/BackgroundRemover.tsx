"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RGB = { r: number; g: number; b: number };
type BgMode = "transparent" | "color" | "image";

const MAX_DIM = 1400; // cap processing size so big photos stay responsive

export default function BackgroundRemover() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("image");
  const [keys, setKeys] = useState<RGB[]>([]);
  const [tolerance, setTolerance] = useState(48);
  const [softness, setSoftness] = useState(16);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImgUrl, setBgImgUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const baseData = useRef<ImageData | null>(null); // untouched source pixels
  const cutRef = useRef<HTMLCanvasElement>(null); // visible cutout (transparent bg)
  const fileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);

  // Re-run the colour-key erase whenever inputs change; owns the visible canvas.
  const process = useCallback(() => {
    const base = baseData.current;
    const canvas = cutRef.current;
    if (!base || !canvas) return;
    if (canvas.width !== base.width || canvas.height !== base.height) {
      canvas.width = base.width;
      canvas.height = base.height;
    }
    const out = new ImageData(new Uint8ClampedArray(base.data), base.width, base.height);
    const d = out.data;
    const soft = Math.max(1, softness);
    for (let i = 0; i < d.length; i += 4) {
      let min = Infinity;
      for (const c of keys) {
        const dr = d[i] - c.r;
        const dg = d[i + 1] - c.g;
        const db = d[i + 2] - c.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist < min) min = dist;
      }
      if (min <= tolerance) {
        d[i + 3] = 0;
      } else if (min <= tolerance + soft) {
        d[i + 3] = Math.round(d[i + 3] * ((min - tolerance) / soft));
      }
    }
    canvas.getContext("2d")!.putImageData(out, 0, 0);
  }, [keys, tolerance, softness]);

  useEffect(() => {
    process();
  }, [process, loaded]);

  function loadImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const tmp = document.createElement("canvas");
      tmp.width = w;
      tmp.height = h;
      const tctx = tmp.getContext("2d", { willReadFrequently: true })!;
      tctx.drawImage(img, 0, 0, w, h);
      baseData.current = tctx.getImageData(0, 0, w, h);
      setName(file.name.replace(/\.[^.]+$/, ""));
      setKeys([]);
      setLoaded(true);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function pickAt(e: React.MouseEvent<HTMLCanvasElement>) {
    const base = baseData.current;
    const canvas = cutRef.current;
    if (!base || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
    const i = (y * canvas.width + x) * 4;
    setKeys((prev) => [...prev, { r: base.data[i], g: base.data[i + 1], b: base.data[i + 2] }]);
  }

  function loadBg(file: File) {
    if (!file.type.startsWith("image/")) return;
    setBgImgUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    setBgMode("image");
  }

  function download() {
    const cut = cutRef.current;
    if (!cut) return;
    const w = cut.width;
    const h = cut.height;
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const ctx = out.getContext("2d")!;

    const finish = () => {
      ctx.drawImage(cut, 0, 0);
      const a = document.createElement("a");
      a.href = out.toDataURL("image/png");
      a.download = `${name}-transparent.png`;
      a.click();
    };

    if (bgMode === "color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
      finish();
    } else if (bgMode === "image" && bgImgUrl) {
      const bg = new Image();
      bg.onload = () => {
        const scale = Math.max(w / bg.width, h / bg.height); // cover
        const bw = bg.width * scale;
        const bh = bg.height * scale;
        ctx.drawImage(bg, (w - bw) / 2, (h - bh) / 2, bw, bh);
        finish();
      };
      bg.src = bgImgUrl;
    } else {
      finish(); // transparent
    }
  }

  // Backdrop shown *through* the transparent areas in the preview.
  const backdrop: React.CSSProperties =
    bgMode === "color"
      ? { background: bgColor }
      : bgMode === "image" && bgImgUrl
        ? { backgroundImage: `url(${bgImgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
        : {
            backgroundImage: "repeating-conic-gradient(#0000000f 0% 25%, transparent 0% 50%)",
            backgroundSize: "22px 22px",
          };

  if (!loaded) {
    return (
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) loadImage(f);
        }}
        className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
          dragging ? "border-accent bg-accent-soft/60" : "border-line bg-surface hover:border-accent/40"
        }`}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          <p className="text-sm font-medium">Drop an image, or click to browse</p>
          <p className="text-xs text-muted">Stays in your browser — never uploaded. Works best on solid backgrounds.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      {/* Preview */}
      <div className="flex flex-col gap-3">
        <div className="grid place-items-center overflow-hidden rounded-2xl border border-line p-4" style={backdrop}>
          <canvas
            ref={cutRef}
            onClick={pickAt}
            className="max-h-[420px] max-w-full cursor-crosshair rounded-lg"
          />
        </div>
        <p className="text-center text-xs text-muted">
          Click any part of the background to erase that colour. Click a few spots for uneven backgrounds.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">
            {keys.length} colour{keys.length === 1 ? "" : "s"} erased
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setKeys((p) => p.slice(0, -1))}
              disabled={!keys.length}
              className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40"
            >
              Undo
            </button>
            <button
              onClick={() => setKeys([])}
              disabled={!keys.length}
              className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40"
            >
              Reset
            </button>
          </div>
        </div>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">Tolerance <span className="font-mono">{tolerance}</span></span>
          <input type="range" min={5} max={150} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">Edge softness <span className="font-mono">{softness}</span></span>
          <input type="range" min={1} max={60} value={softness} onChange={(e) => setSoftness(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>

        <div className="border-t border-line pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Backdrop</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "transparent", label: "None" },
              { id: "color", label: "Colour" },
              { id: "image", label: "Image" },
            ] as { id: BgMode; label: string }[]).map((b) => (
              <button
                key={b.id}
                onClick={() => (b.id === "image" ? bgFileRef.current?.click() : setBgMode(b.id))}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                  bgMode === b.id
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          {bgMode === "color" && (
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="mt-2 h-8 w-full cursor-pointer rounded border border-line" />
          )}
          <input ref={bgFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadBg(e.target.files[0])} />
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
          <button
            onClick={download}
            className="w-full rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            ⤓ Download PNG
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            Use a different image
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
        </div>
      </div>
    </div>
  );
}
