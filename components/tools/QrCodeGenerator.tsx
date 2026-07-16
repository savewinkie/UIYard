"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const EC_LEVELS = [
  { id: "L", label: "L · smallest" },
  { id: "M", label: "M · balanced" },
  { id: "Q", label: "Q · robust" },
  { id: "H", label: "H · sticker-proof" },
] as const;

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://uiyard.com");
  const [size, setSize] = useState(320);
  const [dark, setDark] = useState("#2a1d18");
  const [light, setLight] = useState("#ffffff");
  const [ec, setEc] = useState<"L" | "M" | "Q" | "H">("M");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;
    QRCode.toCanvas(canvas, text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: ec,
      color: { dark, light },
    }).catch(() => {
      /* text too long for a QR — keep last valid render */
    });
  }, [text, size, dark, light, ec]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "qr-code.png";
    a.click();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid place-items-center rounded-2xl border border-line bg-background p-6">
        {text.trim() ? (
          <canvas ref={canvasRef} className="max-w-full rounded-xl border border-line" />
        ) : (
          <p className="text-sm text-muted">Type something to encode.</p>
        )}
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          Content
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="https://your-link.com or any text"
            className="resize-none rounded-xl border border-line bg-background p-3 font-mono text-xs normal-case leading-relaxed outline-none focus:border-accent/50"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="flex justify-between">
            Size <span className="font-mono">{size}px</span>
          </span>
          <input
            type="range"
            min={160}
            max={640}
            step={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="accent-[var(--accent)]"
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            Dots
            <input type="color" value={dark} onChange={(e) => setDark(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-line" />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            Background
            <input type="color" value={light} onChange={(e) => setLight(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-line" />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          Error correction
          <select
            value={ec}
            onChange={(e) => setEc(e.target.value as typeof ec)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm normal-case outline-none"
          >
            {EC_LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </label>

        <button
          onClick={download}
          className="mt-auto rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          ⤓ Download PNG
        </button>
        <p className="text-xs text-muted">
          Generated locally — your link is never sent anywhere.
        </p>
      </div>
    </div>
  );
}
