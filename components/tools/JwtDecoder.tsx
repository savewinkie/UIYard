"use client";

import { useState } from "react";

function b64urlDecode(part: string): string {
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(part.length + ((4 - (part.length % 4)) % 4), "=");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodePart(part: string): { json: string; obj: Record<string, unknown> } | null {
  try {
    const text = b64urlDecode(part);
    const obj = JSON.parse(text);
    return { json: JSON.stringify(obj, null, 2), obj };
  } catch {
    return null;
  }
}

function Section({ title, decoded }: { title: string; decoded: ReturnType<typeof decodePart> }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      {decoded ? (
        <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">{decoded.json}</pre>
      ) : (
        <p className="text-sm text-muted">—</p>
      )}
    </div>
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const parts = token.trim().split(".");
  const valid = parts.length === 3 && parts.every(Boolean);
  const header = valid ? decodePart(parts[0]) : null;
  const payload = valid ? decodePart(parts[1]) : null;

  let expiry: string | null = null;
  const exp = payload?.obj?.exp;
  if (typeof exp === "number") {
    const d = new Date(exp * 1000);
    const past = d.getTime() < Date.now();
    expiry = `${d.toLocaleString()} — ${past ? "expired" : "valid"}`;
  }

  return (
    <div className="flex flex-col gap-5">
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste a JWT (eyJhbGciOi…)"
        rows={4}
        spellCheck={false}
        className="w-full resize-y break-all rounded-2xl border border-line bg-surface p-4 font-mono text-xs leading-relaxed outline-none placeholder:text-muted focus:border-accent/50"
      />

      {token.trim() && !valid && (
        <p className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-red-500">
          That doesn&apos;t look like a JWT — it should have three parts separated by dots.
        </p>
      )}

      {valid && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Section title="Header" decoded={header} />
            <Section title="Payload" decoded={payload} />
          </div>
          {expiry && (
            <p className="text-sm text-muted">
              Expiry (exp): <span className="font-medium text-foreground">{expiry}</span>
            </p>
          )}
        </>
      )}

      <p className="text-xs text-muted">
        Decoded locally — your token never leaves your browser. This shows the contents;
        it does not verify the signature (that needs your secret key).
      </p>
    </div>
  );
}
