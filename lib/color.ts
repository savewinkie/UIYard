export function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) =>
    light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

/** Relative luminance — used to decide black or white text on a swatch. */
export function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

const HARMONIES = [
  [0, 30, 60, 180, 210], // analogous + complement
  [0, 120, 240, 60, 180], // triadic spread
  [0, 150, 210, 30, 180], // split-complementary
  [0, 15, 30, 45, 60], // warm neighbors
  [0, 0, 0, 0, 0], // monochrome (lightness does the work)
];

// Saturation/lightness recipes so palettes feel designed, not random.
const RECIPES: [number, number][][] = [
  [
    [70, 20],
    [65, 45],
    [75, 60],
    [55, 75],
    [40, 92],
  ],
  [
    [60, 30],
    [70, 55],
    [80, 65],
    [45, 80],
    [30, 95],
  ],
  [
    [85, 55],
    [70, 65],
    [60, 40],
    [50, 85],
    [25, 15],
  ],
];

export function generatePalette(): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  const harmony = HARMONIES[Math.floor(Math.random() * HARMONIES.length)];
  const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  return harmony.map((offset, i) => {
    const [s, l] = recipe[i];
    const jitter = Math.random() * 8 - 4;
    return hslToHex((baseHue + offset) % 360, s, Math.min(96, Math.max(8, l + jitter)));
  });
}
