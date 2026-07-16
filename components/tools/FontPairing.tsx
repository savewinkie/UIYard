"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";

type Pair = { heading: string; body: string; vibe: string };

const PAIRS: Pair[] = [
  { heading: "Playfair Display", body: "Source Sans 3", vibe: "Editorial & classy" },
  { heading: "Inter", body: "Lora", vibe: "Modern meets literary" },
  { heading: "Poppins", body: "Merriweather", vibe: "Friendly & trustworthy" },
  { heading: "DM Serif Display", body: "DM Sans", vibe: "Elegant one-family duo" },
  { heading: "Space Grotesk", body: "Inter", vibe: "Techy & clean" },
  { heading: "Fraunces", body: "Work Sans", vibe: "Warm & characterful" },
  { heading: "Montserrat", body: "Open Sans", vibe: "Safe, corporate, solid" },
  { heading: "Libre Baskerville", body: "Nunito Sans", vibe: "Bookish & soft" },
  { heading: "Sora", body: "Source Serif 4", vibe: "Startup with substance" },
  { heading: "Archivo Black", body: "Archivo", vibe: "Bold poster energy" },
  { heading: "Raleway", body: "PT Serif", vibe: "Light & refined" },
  { heading: "Bricolage Grotesque", body: "Figtree", vibe: "Playful contemporary" },
];

const SERIF_FONTS = new Set([
  "Playfair Display",
  "Lora",
  "Merriweather",
  "DM Serif Display",
  "Fraunces",
  "Libre Baskerville",
  "Source Serif 4",
  "PT Serif",
]);

const fallback = (font: string) =>
  SERIF_FONTS.has(font) ? "serif" : "sans-serif";

const loaded = new Set<string>();

function loadFonts(pair: Pair) {
  const families = [pair.heading, pair.body]
    .filter((f) => !loaded.has(f))
    .map((f) => `family=${f.replaceAll(" ", "+")}:wght@400;700`);
  if (families.length === 0) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
  document.head.appendChild(link);
  loaded.add(pair.heading);
  loaded.add(pair.body);
}

export default function FontPairing() {
  const [index, setIndex] = useState(0);
  const pair = PAIRS[index];

  useEffect(() => {
    loadFonts(pair);
  }, [pair]);

  function step(dir: 1 | -1) {
    setIndex((i) => (i + dir + PAIRS.length) % PAIRS.length);
  }

  function shuffle() {
    setIndex((i) => {
      let next = i;
      while (next === i) next = Math.floor(Math.random() * PAIRS.length);
      return next;
    });
  }

  const css = [
    `@import url('https://fonts.googleapis.com/css2?family=${pair.heading.replaceAll(" ", "+")}:wght@700&family=${pair.body.replaceAll(" ", "+")}:wght@400&display=swap');`,
    ``,
    `h1, h2, h3 { font-family: '${pair.heading}', ${fallback(pair.heading)}; }`,
    `body { font-family: '${pair.body}', ${fallback(pair.body)}; }`,
  ].join("\n");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          {pair.vibe}
        </p>
        <h2
          className="mt-4 text-3xl font-bold leading-tight sm:text-5xl"
          style={{ fontFamily: `'${pair.heading}', ${fallback(pair.heading)}` }}
        >
          Design is thinking made visual.
        </h2>
        <p
          className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          style={{ fontFamily: `'${pair.body}', ${fallback(pair.body)}` }}
        >
          Good typography does its job quietly. It guides the eye, sets the
          mood, and gets out of the way — so the reader remembers what you
          said, not what font you used. This paragraph is set in {pair.body};
          the headline above is {pair.heading}.
        </p>
        <button
          className="mt-8 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          style={{ fontFamily: `'${pair.body}', ${fallback(pair.body)}` }}
        >
          Sample button
        </button>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Pairing {index + 1} / {PAIRS.length}
          </p>
          <p className="mt-2 text-sm font-semibold">{pair.heading}</p>
          <p className="text-sm text-muted">+ {pair.body}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => step(-1)}
            className="flex-1 rounded-lg border border-line py-2 text-sm font-medium transition-colors hover:bg-background"
          >
            ← Prev
          </button>
          <button
            onClick={() => step(1)}
            className="flex-1 rounded-lg border border-line py-2 text-sm font-medium transition-colors hover:bg-background"
          >
            Next →
          </button>
        </div>
        <button
          onClick={shuffle}
          className="rounded-lg border border-line py-2 text-sm font-medium transition-colors hover:bg-background"
        >
          🎲 Surprise me
        </button>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <code className="block overflow-x-auto whitespace-pre rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted">
            {css}
          </code>
          <CopyButton text={css} />
        </div>
      </div>
    </div>
  );
}
