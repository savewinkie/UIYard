export type ToolCategory =
  | "color"
  | "css"
  | "text"
  | "code"
  | "image"
  | "typography"
  | "generator"
  | "accessibility"
  | "convert"
  | "social";

export type ToolStatus = "live" | "soon";

export type FAQ = { q: string; a: string };

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  status: ToolStatus;
  seoTitle: string;
  seoDescription: string;
  addedAt: string; // ISO date — powers the "New" badge
  featured?: boolean; // shown in the /tools stacked deck
  about?: string;
  howTo?: string[];
  faqs?: FAQ[];
};

export const categories: Record<
  ToolCategory,
  { label: string; blurb: string; color: string }
> = {
  color: { label: "Color", blurb: "Palettes, shades and everything hue.", color: "#f5643c" },
  css: { label: "CSS", blurb: "Copy-paste effects for your UI.", color: "#ef8a34" },
  text: { label: "Text", blurb: "Clean, count and convert text.", color: "#d9822b" },
  code: { label: "Coding", blurb: "Format, encode and inspect.", color: "#5b8bb2" },
  image: { label: "Image", blurb: "Resize, convert and extract.", color: "#7fa650" },
  typography: { label: "Typography", blurb: "Type that looks right together.", color: "#d85e86" },
  generator: { label: "Generators", blurb: "Make assets in seconds.", color: "#e7a93a" },
  accessibility: { label: "Accessibility", blurb: "Build UIs everyone can use.", color: "#e2604e" },
  convert: { label: "Converters", blurb: "Quick value conversions.", color: "#c77a52" },
  social: { label: "Social Media", blurb: "Ship better posts and previews.", color: "#c95d9a" },
};

export const categoryOrder: ToolCategory[] = [
  "color",
  "css",
  "text",
  "code",
  "image",
  "typography",
  "accessibility",
  "generator",
  "convert",
  "social",
];

export const tools: Tool[] = [
  // ======================= COLOR =======================
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    tagline: "Press space, get a palette you'd actually use.",
    category: "color",
    status: "live",
    featured: true,
    seoTitle: "Color Palette Generator — Free & Instant",
    seoDescription:
      "Generate beautiful color palettes in one keypress. Lock colors you like, copy hex codes and export CSS variables. Free, no signup, runs in your browser.",
    addedAt: "2026-07-15",
    about:
      "A fast way to find a colour scheme that actually works together. Hit the space bar to roll a fresh palette, lock the colours you like, and keep rolling until the rest fall into place.",
    howTo: [
      "Press the space bar (or the shuffle button) to generate a new palette.",
      "Click the lock on any colour you want to keep between rolls.",
      "Click a hex code to copy it, or export all five as CSS variables.",
    ],
    faqs: [
      { q: "Are the palettes random?", a: "They're generated with colour-theory rules so the five colours stay balanced — not pure random noise." },
      { q: "Can I keep a colour I like?", a: "Yes. Lock it and it stays put while you re-roll the others." },
    ],
  },
  {
    slug: "color-shades",
    name: "Color Shades & Tints",
    tagline: "One color in, a full tint-to-shade ramp out.",
    category: "color",
    status: "live",
    seoTitle: "Color Shades & Tints Generator — Build a Color Ramp",
    seoDescription:
      "Turn any color into a full 11-step ramp of tints and shades, ready for design tokens. Copy any step as hex. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Design systems need more than one shade of each colour. Drop in a base colour and get a clean 11-step scale you can wire straight into your tokens.",
    howTo: [
      "Pick or paste your base colour.",
      "See the ramp update instantly from lightest tint to darkest shade.",
      "Click any step to copy its hex.",
    ],
  },
  {
    slug: "color-mixer",
    name: "Color Mixer",
    tagline: "Blend two colors, grab the steps between.",
    category: "color",
    status: "live",
    seoTitle: "Color Mixer — Blend Two Colors Online",
    seoDescription:
      "Mix two colors and copy any of the blended steps between them. Great for gradients, hover states and in-between tones. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Pick two colours and get the smooth steps between them — handy for hover states, chart series, or finding the perfect in-between tone.",
    howTo: [
      "Choose your two end colours.",
      "Set how many steps you want between them.",
      "Click any step to copy its hex.",
    ],
  },
  {
    slug: "palette-from-image",
    name: "Palette From Image",
    tagline: "Pull a color scheme out of any photo.",
    category: "color",
    status: "soon",
    seoTitle: "Extract Color Palette From Image",
    seoDescription: "Upload an image and extract its dominant colors as a palette.",
    addedAt: "2026-07-16",
  },

  // ======================= CSS =======================
  {
    slug: "css-gradient-maker",
    name: "CSS Gradient Maker",
    tagline: "Dial in the perfect gradient, copy the CSS.",
    category: "css",
    status: "live",
    featured: true,
    seoTitle: "CSS Gradient Generator — Linear, Radial & Conic",
    seoDescription:
      "Create linear, radial and conic CSS gradients with a live preview. Adjust colors, stops and angle, then copy clean CSS. Free, no signup.",
    addedAt: "2026-07-15",
    about:
      "Gradients make flat UIs feel alive — but hand-writing the CSS is fiddly. Pick your colours and angle, watch it update live, and copy production-ready CSS.",
    howTo: [
      "Choose linear, radial or conic.",
      "Add colour stops and drag the angle until it looks right.",
      "Copy the generated CSS straight into your stylesheet.",
    ],
  },
  {
    slug: "shadow-glassmorphism",
    name: "Shadow & Glass Generator",
    tagline: "Soft shadows and frosted glass, tuned by eye.",
    category: "css",
    status: "live",
    featured: true,
    seoTitle: "Box Shadow & Glassmorphism CSS Generator",
    seoDescription:
      "Design smooth box-shadows and glassmorphism (frosted glass) effects with live preview sliders, then copy the CSS. Free, no signup.",
    addedAt: "2026-07-15",
    about:
      "Good shadows are the difference between a flat UI and one with depth. Tune blur, spread and colour by eye, switch on frosted glass, and copy the CSS.",
    howTo: [
      "Drag the sliders for offset, blur, spread and opacity.",
      "Toggle glassmorphism for a frosted-glass look.",
      "Copy the CSS when the preview looks right.",
    ],
  },
  {
    slug: "border-radius",
    name: "Border Radius Generator",
    tagline: "Round every corner just how you like it.",
    category: "css",
    status: "live",
    seoTitle: "CSS Border Radius Generator — Per-Corner Control",
    seoDescription:
      "Visually set CSS border-radius on each corner with live preview and copy the code. Make pills, blobs and cards. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Border-radius is more than one number — each corner can be its own. Shape a card, a pill or an organic blob visually and copy the exact CSS.",
    howTo: [
      "Drag each corner slider (or link all four).",
      "Watch the shape update live.",
      "Copy the border-radius CSS.",
    ],
  },
  {
    slug: "css-loader-generator",
    name: "CSS Loader Generator",
    tagline: "Pure-CSS spinners, ready to paste.",
    category: "css",
    status: "live",
    seoTitle: "CSS Loader Generator — Pure CSS Spinners",
    seoDescription:
      "Pick from six pure-CSS loading spinners, tune color, size and speed, and copy ready-to-paste CSS with keyframes. No libraries, no signup.",
    addedAt: "2026-07-16",
    about:
      "Six loading spinners built from pure CSS — no GIFs, no libraries. Tune the color, size and speed live, click the one you like, and copy CSS that includes everything (keyframes and, where needed, the HTML snippet).",
    howTo: [
      "Set your color, size and speed.",
      "Click the spinner you like.",
      "Copy the CSS — the HTML tag is in a comment when one is needed.",
    ],
  },
  { slug: "css-switch-generator", name: "CSS Switch Generator", tagline: "Toggle switches without a library.", category: "css", status: "soon", seoTitle: "CSS Toggle Switch Generator", seoDescription: "Design an on/off switch and copy the pure CSS.", addedAt: "2026-07-16" },
  { slug: "css-clip-path", name: "Clip-Path Maker", tagline: "Cut shapes out of any element.", category: "css", status: "soon", seoTitle: "CSS Clip-Path Generator", seoDescription: "Visually build polygon clip-paths and copy the CSS.", addedAt: "2026-07-16" },
  { slug: "css-background-pattern", name: "Background Patterns", tagline: "Subtle CSS-only page textures.", category: "css", status: "soon", seoTitle: "CSS Background Pattern Generator", seoDescription: "Pick a repeating CSS background pattern and copy the code.", addedAt: "2026-07-16" },
  { slug: "css-triangle", name: "CSS Triangle Generator", tagline: "Arrows and carets from pure CSS.", category: "css", status: "soon", seoTitle: "CSS Triangle Generator", seoDescription: "Generate triangles and carets with the border trick.", addedAt: "2026-07-16" },
  { slug: "cubic-bezier", name: "Easing Editor", tagline: "Draw the perfect cubic-bezier curve.", category: "css", status: "soon", seoTitle: "CSS Cubic Bezier Easing Editor", seoDescription: "Design custom CSS easing curves and copy the cubic-bezier.", addedAt: "2026-07-16" },
  { slug: "css-grid-generator", name: "CSS Grid Generator", tagline: "Lay out a grid, copy the CSS.", category: "css", status: "soon", seoTitle: "CSS Grid Generator", seoDescription: "Build a CSS grid visually and copy the code.", addedAt: "2026-07-16" },

  // ======================= TEXT =======================
  {
    slug: "case-converter",
    name: "Case Converter",
    tagline: "UPPER, lower, Title, camel — one click each.",
    category: "text",
    status: "live",
    featured: true,
    seoTitle: "Case Converter — UPPERCASE, lowercase, Title & camelCase",
    seoDescription:
      "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case and kebab-case. Free, instant, no signup.",
    addedAt: "2026-07-16",
    about:
      "Paste any text and flip it between seven cases — including the developer ones like camelCase, snake_case and kebab-case that normal editors can't do.",
    howTo: [
      "Paste or type your text.",
      "Click the case you want — the result updates instantly.",
      "Copy the converted text.",
    ],
  },
  {
    slug: "word-counter",
    name: "Word & Letter Counter",
    tagline: "Words, characters, sentences — live.",
    category: "text",
    status: "live",
    seoTitle: "Word Counter & Character Counter — Live Count",
    seoDescription:
      "Count words, characters (with and without spaces), sentences, paragraphs and reading time as you type. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "For essays, tweets, meta descriptions and anywhere with a limit. Counts update live as you type — words, characters, sentences, paragraphs and estimated reading time.",
    howTo: [
      "Paste or type your text.",
      "Read the live counts above the box.",
    ],
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    tagline: "Placeholder text in exactly the amount you need.",
    category: "text",
    status: "live",
    seoTitle: "Lorem Ipsum Generator — Placeholder Text",
    seoDescription:
      "Generate lorem ipsum placeholder text by paragraphs, sentences or words. Copy with one click. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Classic placeholder text, generated in the exact shape you need — by paragraphs, sentences or words.",
    howTo: [
      "Choose paragraphs, sentences or words.",
      "Set the amount.",
      "Generate and copy.",
    ],
  },
  {
    slug: "whitespace-remover",
    name: "Whitespace Remover",
    tagline: "Kill double spaces, stray tabs and empty lines.",
    category: "text",
    status: "live",
    seoTitle: "Remove Extra Spaces & Line Breaks From Text",
    seoDescription:
      "Clean pasted text: collapse double spaces, trim lines, remove empty lines and line breaks. Free, instant, no signup.",
    addedAt: "2026-07-16",
    about:
      "Text pasted from PDFs and emails comes full of double spaces, stray tabs and broken lines. Tick what to clean and get tidy text back.",
    howTo: [
      "Paste your messy text.",
      "Tick the clean-ups you want.",
      "Copy the cleaned result.",
    ],
  },
  { slug: "text-diff", name: "Text Diff Checker", tagline: "Spot every change between two texts.", category: "text", status: "soon", seoTitle: "Text Difference Checker", seoDescription: "Compare two texts and highlight the differences.", addedAt: "2026-07-16" },

  // ======================= CODE =======================
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    tagline: "Pretty-print or minify JSON, with real errors.",
    category: "code",
    status: "live",
    featured: true,
    seoTitle: "JSON Formatter & Validator — Pretty Print Online",
    seoDescription:
      "Format, validate and minify JSON in your browser with clear error messages. Nothing uploaded. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Paste JSON, get it beautifully indented — or minified for production. Invalid JSON gets a clear error message with the exact problem, and nothing ever leaves your browser.",
    howTo: [
      "Paste your JSON.",
      "Choose pretty or minify (and your indent size).",
      "Copy the result.",
    ],
    faqs: [
      { q: "Is my JSON uploaded anywhere?", a: "No. The formatting happens entirely in your browser — your data never leaves your machine." },
    ],
  },
  {
    slug: "base64",
    name: "Base64 Encode / Decode",
    tagline: "Text to Base64 and back, UTF-8 safe.",
    category: "code",
    status: "live",
    seoTitle: "Base64 Encoder & Decoder Online",
    seoDescription:
      "Encode text to Base64 or decode Base64 back to text, with full UTF-8 support (emoji included). Free, in-browser, no signup.",
    addedAt: "2026-07-16",
    about:
      "Encode any text to Base64 or decode it back — with proper UTF-8 handling, so accents and emoji survive the round trip.",
    howTo: [
      "Pick encode or decode.",
      "Paste your text.",
      "Copy the result.",
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encode / Decode",
    tagline: "Make any string safe for a URL.",
    category: "code",
    status: "live",
    seoTitle: "URL Encoder & Decoder Online",
    seoDescription:
      "Percent-encode text for URLs or decode encoded URLs back to readable text. Free, instant, no signup.",
    addedAt: "2026-07-16",
    about:
      "Spaces, accents and symbols break URLs. Encode any string so it's safe to put in a link, or decode a %-soup URL back into something readable.",
    howTo: [
      "Pick encode or decode.",
      "Paste your text or URL.",
      "Copy the result.",
    ],
  },
  {
    slug: "hash-generator",
    name: "SHA Hash Generator",
    tagline: "SHA-1, 256, 384 & 512 from any text.",
    category: "code",
    status: "live",
    seoTitle: "SHA Hash Generator — SHA-1, SHA-256, SHA-512",
    seoDescription:
      "Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text, computed locally in your browser. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Type or paste text and get its SHA-1, SHA-256, SHA-384 and SHA-512 hashes instantly — computed with your browser's built-in crypto, so nothing is sent anywhere.",
    howTo: [
      "Paste your text.",
      "All four hashes update live.",
      "Click any hash to copy it.",
    ],
  },
  { slug: "code-to-image", name: "Code to Image", tagline: "Pretty screenshots of your snippets.", category: "code", status: "soon", seoTitle: "Code Snippet to Image", seoDescription: "Turn code snippets into shareable images.", addedAt: "2026-07-16" },
  { slug: "html-formatter", name: "HTML Formatter", tagline: "Untangle minified markup.", category: "code", status: "soon", seoTitle: "HTML Formatter & Beautifier", seoDescription: "Format and indent HTML in your browser.", addedAt: "2026-07-16" },
  { slug: "css-minifier", name: "CSS Minifier", tagline: "Squeeze your stylesheet for production.", category: "code", status: "soon", seoTitle: "CSS Minifier Online", seoDescription: "Minify CSS in your browser and copy the result.", addedAt: "2026-07-16" },
  { slug: "jwt-decoder", name: "JWT Decoder", tagline: "See what's inside a token, locally.", category: "code", status: "soon", seoTitle: "JWT Decoder — Inspect Tokens Locally", seoDescription: "Decode JWT headers and payloads in your browser.", addedAt: "2026-07-16" },
  {
    slug: "url-slug-generator",
    name: "URL Slug Generator",
    tagline: "Turn titles into clean-url-slugs.",
    category: "code",
    status: "live",
    seoTitle: "URL Slug Generator — Title to Clean Slug",
    seoDescription:
      "Convert any title into a clean, SEO-friendly URL slug. Handles accents, symbols and spacing. Free, instant, no signup.",
    addedAt: "2026-07-16",
    about:
      "Turns any headline into a clean slug for URLs — lowercased, accents converted, symbols stripped, spaces hyphenated. Paste a title, copy the slug.",
    howTo: [
      "Paste your title.",
      "Pick hyphens or underscores.",
      "Copy the slug.",
    ],
  },

  // ======================= IMAGE =======================
  {
    slug: "image-resizer",
    name: "Image Resizer",
    tagline: "Exact dimensions, right in your browser.",
    category: "image",
    status: "live",
    seoTitle: "Image Resizer — Resize Images Online, Nothing Uploaded",
    seoDescription:
      "Resize any image to exact pixel dimensions with aspect-ratio lock, and export as PNG, JPG or WebP. Runs fully in your browser — files are never uploaded.",
    addedAt: "2026-07-16",
    about:
      "Drop in an image, set the exact size you need — with the aspect ratio locked so nothing gets squished — and download it as PNG, JPG or WebP. Your file never leaves your browser.",
    howTo: [
      "Drop an image or click to browse.",
      "Set width or height (the lock keeps proportions).",
      "Pick a format and download.",
    ],
    faqs: [
      { q: "Is my image uploaded?", a: "No. The resizing happens on a canvas inside your browser — the file never touches a server." },
    ],
  },
  { slug: "image-compressor", name: "Image Compressor", tagline: "Smaller files, same look.", category: "image", status: "soon", seoTitle: "Image Compressor Online", seoDescription: "Compress images in your browser. Nothing uploaded.", addedAt: "2026-07-16" },
  { slug: "image-color-extractor", name: "Image Color Extractor", tagline: "The exact hex of any pixel.", category: "image", status: "soon", seoTitle: "Image Color Picker & Extractor", seoDescription: "Pick colors straight from an uploaded image.", addedAt: "2026-07-16" },
  { slug: "image-to-base64", name: "Image to Base64", tagline: "Inline any image as a data URI.", category: "image", status: "soon", seoTitle: "Image to Base64 Converter", seoDescription: "Convert images to Base64 data URIs in your browser.", addedAt: "2026-07-16" },
  { slug: "svg-to-png", name: "SVG to PNG", tagline: "Rasterize vectors at any size.", category: "image", status: "soon", seoTitle: "SVG to PNG Converter", seoDescription: "Convert SVG files to PNG at any resolution, in-browser.", addedAt: "2026-07-16" },

  // ======================= TYPOGRAPHY =======================
  {
    slug: "font-pairing",
    name: "Font Pairing Tool",
    tagline: "Heading + body combos that just work.",
    category: "typography",
    status: "live",
    featured: true,
    seoTitle: "Font Pairing Tool — Google Font Combinations",
    seoDescription:
      "Preview curated Google Font pairings for headings and body text. Shuffle combinations, see them live, copy the CSS imports. Free, no signup.",
    addedAt: "2026-07-15",
    about:
      "Picking two fonts that sit well together is hard. Shuffle through curated heading-and-body pairings, preview them on real text, and copy the imports when one clicks.",
    howTo: [
      "Shuffle to see a new heading + body pairing on sample text.",
      "Lock the one you like.",
      "Copy the Google Fonts import and CSS.",
    ],
  },
  {
    slug: "type-scale",
    name: "Type Scale",
    tagline: "A harmonious font-size scale in seconds.",
    category: "typography",
    status: "live",
    seoTitle: "Modular Type Scale Generator — Font Size Scale",
    seoDescription:
      "Generate a modular typographic scale from a base size and ratio (major third, golden ratio and more), preview it live and copy the CSS variables.",
    addedAt: "2026-07-16",
    about:
      "Font sizes look best when they follow a musical ratio instead of round numbers. Pick a base size and a ratio, preview the whole scale on real text, and copy it as CSS variables.",
    howTo: [
      "Set your base font size (usually 16px).",
      "Pick a ratio — bigger ratios give more dramatic headings.",
      "Copy the CSS variables into your project.",
    ],
  },

  // ======================= ACCESSIBILITY =======================
  {
    slug: "contrast-checker",
    name: "Contrast Checker",
    tagline: "Is your text readable? Know for sure.",
    category: "accessibility",
    status: "live",
    featured: true,
    seoTitle: "Color Contrast Checker — WCAG AA & AAA",
    seoDescription:
      "Check text and background color contrast against WCAG AA and AAA standards with a live preview and ratio. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Low-contrast text locks people out — and fails accessibility audits. Enter your text and background colours to get the exact contrast ratio and see instantly whether it passes WCAG AA and AAA.",
    howTo: [
      "Set your text colour and background colour.",
      "Read the contrast ratio and the AA / AAA pass badges.",
      "Nudge the colours until it passes for your text size.",
    ],
    faqs: [
      { q: "What ratio do I need?", a: "WCAG AA needs 4.5:1 for normal text and 3:1 for large text. AAA needs 7:1 and 4.5:1." },
      { q: "What counts as large text?", a: "Roughly 24px, or 19px if bold. Large text is allowed a lower contrast ratio." },
    ],
  },
  {
    slug: "color-blindness",
    name: "Color-Blindness Sim",
    tagline: "See your palette as others do.",
    category: "accessibility",
    status: "live",
    seoTitle: "Color Blindness Simulator — Test Your Palette",
    seoDescription:
      "Preview your colors through 8 types of color blindness (protanopia, deuteranopia, tritanopia and more) side by side. Free, in-browser, no signup.",
    addedAt: "2026-07-16",
    about:
      "Around 1 in 12 men and 1 in 200 women see color differently. Add your palette and see it through eight kinds of color vision, side by side — if two colors merge in any row, your design needs more than color to tell them apart.",
    howTo: [
      "Add the colors from your design.",
      "Scan the rows — each simulates one type of color blindness.",
      "If two swatches look identical in a row, add labels or icons to your UI.",
    ],
  },

  // ======================= GENERATORS =======================
  {
    slug: "password-generator",
    name: "Password Generator",
    tagline: "Strong, random, yours in one click.",
    category: "generator",
    status: "live",
    seoTitle: "Strong Random Password Generator",
    seoDescription:
      "Generate strong random passwords with custom length and character sets, created locally in your browser and never sent anywhere.",
    addedAt: "2026-07-16",
    about:
      "Generates truly random passwords locally using your browser's crypto — they're never sent, stored or seen by anyone, including us.",
    howTo: [
      "Set the length and which character types to include.",
      "Generate until you get one you like.",
      "Copy it straight into your password manager.",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    tagline: "Any link or text as a scannable code.",
    category: "generator",
    status: "live",
    seoTitle: "QR Code Generator — Free, Custom Colors, PNG Download",
    seoDescription:
      "Generate QR codes from any link or text with custom colors and size, then download as PNG. Created locally in your browser — nothing uploaded.",
    addedAt: "2026-07-16",
    about:
      "Turn any link or text into a scannable QR code. Pick your colors, choose how damage-resistant it should be, and download a crisp PNG — all generated locally, so your link is never sent anywhere.",
    howTo: [
      "Paste your link or text.",
      "Adjust size, colors and error-correction level.",
      "Download the PNG.",
    ],
    faqs: [
      { q: "What does error correction do?", a: "It adds redundancy so the code still scans when partially covered or damaged. Higher levels are denser but survive stickers and print wear." },
      { q: "Do my links get stored?", a: "No — the QR code is generated entirely in your browser." },
    ],
  },
  { slug: "favicon-generator", name: "Favicon Generator", tagline: "Emoji or text to a ready favicon.", category: "generator", status: "soon", seoTitle: "Favicon Generator", seoDescription: "Turn an emoji or letter into a favicon.", addedAt: "2026-07-16" },
  {
    slug: "blob-generator",
    name: "Blob Generator",
    tagline: "Organic SVG blobs for backgrounds.",
    category: "generator",
    status: "live",
    seoTitle: "SVG Blob Generator — Random Organic Shapes",
    seoDescription:
      "Generate smooth organic SVG blob shapes with adjustable complexity and randomness, then copy the SVG code. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Blobs soften a page instantly — behind heroes, avatars or feature art. Dial in how many points and how wild the shape gets, pick a colour, and copy the ready-to-paste SVG.",
    howTo: [
      "Drag the sliders until the shape feels right.",
      "Hit “New blob” to reroll the randomness.",
      "Copy the SVG and paste it into your page.",
    ],
  },

  // ======================= CONVERTERS =======================
  {
    slug: "px-rem-converter",
    name: "PX ↔ REM Converter",
    tagline: "Swap pixels and rem, instantly.",
    category: "convert",
    status: "live",
    seoTitle: "PX to REM Converter (and REM to PX)",
    seoDescription:
      "Convert between px and rem based on your root font size, both directions, with a handy reference table. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Type a pixel value, get rem — or the other way round — based on whatever root font size your project uses.",
    howTo: [
      "Set your root font size (16px for most sites).",
      "Type a value on either side.",
      "Copy the converted value.",
    ],
  },
  {
    slug: "hex-rgb-converter",
    name: "HEX ↔ RGB Converter",
    tagline: "HEX, RGB and HSL — all in sync.",
    category: "convert",
    status: "live",
    seoTitle: "HEX to RGB Converter (and HSL)",
    seoDescription:
      "Convert colors between HEX, RGB and HSL formats with a live swatch preview. Copy any format. Free, no signup.",
    addedAt: "2026-07-16",
    about:
      "Paste a colour in any format — HEX, RGB or HSL — and read it back in all three, with a live swatch so you can see what you're converting.",
    howTo: [
      "Type or paste a colour in any of the three fields.",
      "The other formats update instantly.",
      "Click any field's copy button.",
    ],
  },

  // ======================= SOCIAL =======================
  { slug: "og-meta-generator", name: "OG Meta Generator", tagline: "Perfect link previews for every share.", category: "social", status: "soon", seoTitle: "Open Graph Meta Tag Generator", seoDescription: "Generate Open Graph and Twitter meta tags for your site.", addedAt: "2026-07-16" },
  { slug: "social-image-resizer", name: "Social Image Resizer", tagline: "Every platform's sizes, one upload.", category: "social", status: "soon", seoTitle: "Social Media Image Resizer", seoDescription: "Resize one image to every social platform's dimensions.", addedAt: "2026-07-16" },
  { slug: "youtube-thumbnail-tester", name: "Thumbnail Tester", tagline: "Preview your thumbnail like a real feed.", category: "social", status: "soon", seoTitle: "YouTube Thumbnail Preview Tester", seoDescription: "Preview your thumbnail at real YouTube sizes.", addedAt: "2026-07-16" },
];

export const liveTools = tools.filter((t) => t.status === "live");
export const featuredTools = tools.filter((t) => t.status === "live" && t.featured);

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function toolsInCategory(cat: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === cat);
}

export function liveCountIn(cat: ToolCategory): number {
  return tools.filter((t) => t.category === cat && t.status === "live").length;
}

const NEW_BADGE_DAYS = 30;

export function isNew(tool: Tool): boolean {
  if (tool.status !== "live") return false;
  const added = new Date(tool.addedAt).getTime();
  return Date.now() - added < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

/** Live tools, newest planting first — powers the What's-new strip & diary. */
export function recentTools(limit?: number): Tool[] {
  const sorted = [...liveTools].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** "July 16, 2026" — absolute dates so statically-built pages never go stale. */
export function plantedOn(tool: Tool): string {
  return new Date(tool.addedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
