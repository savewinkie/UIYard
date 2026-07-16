/**
 * The UIYard mark: a sun rising over stacked garden beds.
 * Drawn in currentColor so it recolours with text utilities.
 */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="UIYard"
    >
      {/* sun */}
      <path d="M34 36 A16 16 0 0 1 66 36 L50 43 Z" />
      {/* upper bed */}
      <path d="M28 38 L50 48 L72 38 L72 50 L50 60 L28 50 Z" />
      {/* lower bed */}
      <path d="M28 54 L50 64 L72 54 L72 66 L50 76 L28 66 Z" />
    </svg>
  );
}
