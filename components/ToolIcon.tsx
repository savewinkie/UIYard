import type { ToolCategory } from "@/lib/tools";

const paths: Record<ToolCategory, React.ReactNode> = {
  color: (
    <>
      <path d="M12 3c-4.97 0-9 3.58-9 8 0 3.87 3.13 6.5 6.5 6.5.83 0 1.5.67 1.5 1.5 0 .4.16.77.44 1.03A9 9 0 0 0 21 11c0-4.42-4.03-8-9-8Z" />
      <circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  css: (
    <>
      <path d="m8 6-5 6 5 6" />
      <path d="m16 6 5 6-5 6" />
    </>
  ),
  typography: (
    <>
      <path d="M4 7V5h16v2" />
      <path d="M12 5v14" />
      <path d="M9 19h6" />
    </>
  ),
  text: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h7" />
    </>
  ),
  code: (
    <>
      <path d="m7 8-4 4 4 4" />
      <path d="m17 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="9" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <path d="m5 17 4.5-4.5 3 3L16 12l3 3" />
    </>
  ),
  social: (
    <>
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="17.5" cy="6" r="2.6" />
      <circle cx="17.5" cy="18" r="2.6" />
      <path d="m8.4 10.8 6.7-3.6M8.4 13.2l6.7 3.6" />
    </>
  ),
  generator: (
    <>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M5.6 5.6l2.1 2.1" />
      <path d="M16.3 16.3l2.1 2.1" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M4 8c2.6 1.2 5.2 1.7 8 1.7S17.4 9.2 20 8" />
      <path d="M12 9.7V15" />
      <path d="m9 20 3-5 3 5" />
    </>
  ),
  convert: (
    <>
      <path d="M4 8h13l-3-3" />
      <path d="M20 16H7l3 3" />
    </>
  ),
};

export default function ToolIcon({
  category,
  className = "h-5 w-5",
}: {
  category: ToolCategory;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[category]}
    </svg>
  );
}
