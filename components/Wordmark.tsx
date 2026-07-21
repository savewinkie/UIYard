import { existsSync } from "fs";
import { join } from "path";

/**
 * The UIYard wordmark.
 *
 * Uses Link's real logo at /public/logo.png (a transparent PNG) when that file
 * is present — checked once at build time, so there's no client JS and no
 * broken-image flash. Until the file exists, it falls back to the wordmark set
 * in the display face, so the header is never broken.
 *
 * `dark:invert` flips the (near-black) logo to white in dark mode — remove it
 * if the logo ever stops being black.
 */
const HAS_LOGO = existsSync(join(process.cwd(), "public", "logo.png"));

export default function Wordmark({ className = "" }: { className?: string }) {
  if (HAS_LOGO) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logo.png" alt="UIYard" className={`h-7 w-auto sm:h-8 dark:invert ${className}`} />
    );
  }

  return (
    <span
      className={`font-display text-xl font-bold tracking-tight text-foreground sm:text-[1.6rem] ${className}`}
      aria-label="UIYard"
    >
      UIYard
    </span>
  );
}
