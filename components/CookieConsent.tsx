"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = document.cookie.includes("uiyard-consent=");
    if (!seen) setShow(true);
  }, []);

  function accept() {
    document.cookie = "uiyard-consent=1;path=/;max-age=31536000;samesite=lax";
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-4 shadow-[var(--card-shadow-hover)] sm:flex sm:items-center sm:gap-4">
      <p className="flex-1 text-sm leading-relaxed text-muted">
        UIYard uses a couple of small cookies — just to remember your theme and
        that you&apos;ve seen this. No tracking, no ads, nothing sold.
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <a
          href="/about"
          className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Learn more
        </a>
        <button
          onClick={accept}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-ink"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
