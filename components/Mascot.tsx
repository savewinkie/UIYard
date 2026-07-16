export default function Mascot({
  className = "h-32 w-auto",
  mood = "happy",
}: {
  className?: string;
  mood?: "happy" | "search" | "sleep";
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-label="Sprout, the UIYard mascot"
      fill="none"
    >
      {/* leaves */}
      <line x1="60" y1="46" x2="60" y2="24" stroke="#3c6a24" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="45" cy="26" rx="12" ry="6.5" transform="rotate(-32 45 26)" fill="#8fc24a" stroke="#3c6a24" strokeWidth="3" />
      <ellipse cx="75" cy="23" rx="12" ry="6.5" transform="rotate(28 75 23)" fill="#9bce54" stroke="#3c6a24" strokeWidth="3" />

      {/* pot body */}
      <path d="M35 100 L85 100 L79 132 Q78.5 135 75.5 135 L44.5 135 Q41.5 135 41 132 Z" fill="#ef5f33" stroke="#b83f20" strokeWidth="3.5" strokeLinejoin="round" />
      {/* head/body */}
      <ellipse cx="60" cy="66" rx="26" ry="28" fill="#9ccc54" stroke="#3c6a24" strokeWidth="3.5" />
      {/* pot rim (in front, hides body bottom) */}
      <rect x="27" y="85" width="66" height="15" rx="6" fill="#f5643c" stroke="#b83f20" strokeWidth="3.5" />

      {/* blush */}
      <ellipse cx="46" cy="72" rx="3.4" ry="2.2" fill="#f5643c" opacity="0.45" />
      <ellipse cx="74" cy="72" rx="3.4" ry="2.2" fill="#f5643c" opacity="0.45" />

      {/* eyes */}
      {mood === "search" ? (
        <>
          <path d="M48 63 q4 -4 8 0" stroke="#2a1d18" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M64 63 q4 -4 8 0" stroke="#2a1d18" strokeWidth="3.4" strokeLinecap="round" />
        </>
      ) : mood === "sleep" ? (
        <>
          <path d="M48 64 q4 3 8 0" stroke="#2a1d18" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M64 64 q4 3 8 0" stroke="#2a1d18" strokeWidth="3.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="52" cy="63" r="3.1" fill="#2a1d18" />
          <circle cx="68" cy="63" r="3.1" fill="#2a1d18" />
        </>
      )}

      {/* mouth */}
      {mood === "sleep" ? (
        <ellipse cx="60" cy="73" rx="3" ry="4" fill="#2a1d18" />
      ) : (
        <path d="M53 71 Q60 79 67 71 Q60 76 53 71 Z" fill="#2a1d18" />
      )}

      {/* zzz */}
      {mood === "sleep" && (
        <g fill="none" stroke="#b98a5a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M88 40h9l-9 9h9" />
          <path d="M100 24h7l-7 7h7" />
        </g>
      )}
    </svg>
  );
}
