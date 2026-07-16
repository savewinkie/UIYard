export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 15C48 7 98 6 143 9c40 2.6 80 8 154 3.5C312 12 296 18 270 19c-70 3-140-4-210-2-30 .8-52 2.4-54 2.5"
        stroke="var(--warm)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
