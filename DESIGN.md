# UIYard colour system

Researched 2026-07-17 from live computed-style scans of 10015.io and coolors.co,
validated with WCAG contrast math (all pairs AA, most AAA). Full evidence in the
git history (`Bake researched colour system`).

## The law

Neutral chrome. Ink text. One action colour. Colour variety comes from
categories and tool content — **never from the theme**.

| Role | Token | Light | Dark | Allowed on |
|---|---|---|---|---|
| Chrome | `--background` / `--surface` / `--surface-2` | `#fafafa` / `#ffffff` / `#f4f4f5` | `#0d0d10` / `#18181d` / `#1f1f25` | everything structural |
| Text | `--foreground` / `--muted` | `#1a1a1e` / `#6b7280` | `#ececee` / `#a2a2ab` | all content text |
| Action | `--accent` (+ `-ink`, `-soft`) | `#2563eb` | `#3b82f6` | buttons, links, focus rings — **only** |
| Highlight | `--warm` (+ `-ink`, `-soft`) | `#f2a63d` | `#f4b45e` | badges, small accents |
| Brand | `--brand` (+ `-ink`, `-soft`) | `#f5643c` | `#fb7a54` | logo, Sprout, squiggle, kicker dot — **only** |
| Categories | `categories[cat].color` in `lib/tools.ts` | 10 hues | same | category icons, chips, tool previews |

## Hard rules

1. **Content text is never theme-coloured.** Headings, paragraphs, labels use
   `--foreground` / `--muted`. `text-accent` is allowed only inside something
   clickable (`a`, `button`, `summary`, form controls).
2. **Coral is brand, not UI.** If it isn't the logo, the mascot, the squiggle
   or the kicker dot, it doesn't get `--brand`.
3. **Shadows are neutral ink** (`rgb(17 24 39 / 0.2-0.32)`), never accent-tinted
   — except decorative glows, which may use cobalt/amber at low opacity.
4. **No `transition-all`.** It stalls on CSS-variable colour changes (stale
   colours on OS theme flips). Use
   `transition-[transform,box-shadow,border-color,color]` — colour *values*
   must snap, hover motion may animate.
5. **Tool previews/content may use any colour** — that's the variety the system
   wants. The coral swatches in tool demos are content, not theme.

## Why (the scans)

- 10015.io: white bg ×54 vs indigo ×9 (buttons only); ink text ×58, zero
  theme-coloured content text.
- coolors.co: near-black text ×57; action colour = `#2563eb`, used ~5 times.
- Post-repaint UIYard matches: muted/ink text 41× vs cobalt text 3× (links),
  26-28 distinct background colours on the homepage (variety preserved).

History: violet rejected ("purple isn't hitting"), coral rejected as chrome
("not professioneel") — coral survives as brand pop only.
