"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Card = "summary_large_image" | "summary";

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || "example.com";
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildTags(v: {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  card: Card;
}): string {
  const lines: string[] = [];
  lines.push(`<!-- Primary -->`);
  lines.push(`<title>${esc(v.title)}</title>`);
  lines.push(`<meta name="description" content="${esc(v.description)}" />`);
  lines.push(``);
  lines.push(`<!-- Open Graph / Facebook -->`);
  lines.push(`<meta property="og:type" content="website" />`);
  if (v.url) lines.push(`<meta property="og:url" content="${esc(v.url)}" />`);
  lines.push(`<meta property="og:title" content="${esc(v.title)}" />`);
  lines.push(`<meta property="og:description" content="${esc(v.description)}" />`);
  if (v.image) lines.push(`<meta property="og:image" content="${esc(v.image)}" />`);
  if (v.siteName) lines.push(`<meta property="og:site_name" content="${esc(v.siteName)}" />`);
  lines.push(``);
  lines.push(`<!-- Twitter -->`);
  lines.push(`<meta name="twitter:card" content="${v.card}" />`);
  if (v.url) lines.push(`<meta name="twitter:url" content="${esc(v.url)}" />`);
  lines.push(`<meta name="twitter:title" content="${esc(v.title)}" />`);
  lines.push(`<meta name="twitter:description" content="${esc(v.description)}" />`);
  if (v.image) lines.push(`<meta name="twitter:image" content="${esc(v.image)}" />`);
  return lines.join("\n");
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  max,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
  max?: number;
  textarea?: boolean;
}) {
  const over = max !== undefined && value.length > max;
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        {max !== undefined && (
          <span className={`font-mono ${over ? "text-red-500" : "text-muted"}`}>
            {value.length}/{max}
          </span>
        )}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="resize-none rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-accent/50"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-accent/50"
        />
      )}
      {hint && <span className="text-[11px] text-muted">{hint}</span>}
    </label>
  );
}

export default function OgMetaGenerator() {
  const [title, setTitle] = useState("Your page title — clear and specific");
  const [description, setDescription] = useState(
    "A one-sentence summary of the page. This is what people read under the title in a search result or a shared link."
  );
  const [url, setUrl] = useState("https://example.com/my-page");
  const [image, setImage] = useState("https://example.com/preview.png");
  const [siteName, setSiteName] = useState("My Site");
  const [card, setCard] = useState<Card>("summary_large_image");

  const values = { title, description, url, image, siteName, card };
  const code = buildTags(values);
  const host = hostOf(url);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Form */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5">
        <Field label="Title" value={title} onChange={setTitle} placeholder="Page title" max={60} hint="Search engines show ~60 characters." />
        <Field label="Description" value={description} onChange={setDescription} placeholder="Short summary" max={160} textarea hint="Aim for 150–160 characters." />
        <Field label="Page URL" value={url} onChange={setUrl} placeholder="https://example.com/page" />
        <Field label="Preview image URL" value={image} onChange={setImage} placeholder="https://example.com/preview.png" hint="1200×630px works everywhere." />
        <Field label="Site name" value={siteName} onChange={setSiteName} placeholder="My Site" />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Twitter card</span>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: "summary_large_image", label: "Large image" },
              { id: "summary", label: "Small / square" },
            ] as { id: Card; label: string }[]).map((c) => (
              <button
                key={c.id}
                onClick={() => setCard(c.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  card === c.id
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview + code */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Live preview</p>
          <div className="overflow-hidden rounded-2xl border border-line bg-background">
            {/* Image area */}
            {card === "summary_large_image" ? (
              <div className="aspect-[1200/630] w-full bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Social preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget.style.display = "none");
                  }}
                />
              </div>
            ) : null}
            <div className="flex items-start gap-3 p-4">
              {card === "summary" && (
                <div className="aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Social preview thumbnail"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget.style.display = "none");
                    }}
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted">{host}</p>
                <p className="mt-0.5 truncate font-semibold">{title || "Untitled"}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted">
            Approximation of how the link looks shared on social and in search. Real cards vary slightly per platform.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <code className="block max-h-72 overflow-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {code}
          </code>
          <div className="mt-3">
            <CopyButton text={code} label="Copy meta tags" />
          </div>
        </div>
      </div>
    </div>
  );
}
