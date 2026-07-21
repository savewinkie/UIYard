/**
 * The UIYard wordmark — a clean bold logotype (Link's design).
 * Rendered as text in the display face so it scales crisply and recolours
 * with text utilities. Size is controlled by the caller's className.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-bold tracking-tight text-foreground ${className}`}
      aria-label="UIYard"
    >
      UIYard
    </span>
  );
}
