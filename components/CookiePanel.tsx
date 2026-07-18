"use client";

/**
 * Cookie consent panel — UX designed by Link (bottom-right card, customize
 * drawer with per-category checkboxes), ported to UIYard's stack: our design
 * tokens instead of shadcn's, inline SVGs instead of lucide-react, and real
 * cookie storage via lib/consent instead of localStorage.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type ConsentPrefs,
  defaultPrefs,
  readConsent,
  writeConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
} from "@/lib/consent";

const ICON = {
  cookie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-9.6-8.98 3.5 3.5 0 0 0 4.03 4.03A3.5 3.5 0 0 0 21 12Z" />
      <circle cx="9" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8.4" cy="14.6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="15.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  chevron: (open: boolean) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
};

function PrefRow({
  title,
  desc,
  checked,
  locked,
  onToggle,
}: {
  title: string;
  desc: string;
  checked: boolean;
  locked?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-line p-2.5">
      <button
        type="button"
        disabled={locked}
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={`${title} cookie preference`}
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          locked
            ? "cursor-not-allowed border-line bg-surface-2 text-muted"
            : checked
              ? "border-accent bg-accent text-white"
              : "border-line bg-surface hover:border-accent/50"
        }`}
      >
        {checked && ICON.check}
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold">
          {title}{" "}
          {locked && <span className="font-medium text-muted">(required)</span>}
        </p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}

export default function CookiePanel() {
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(defaultPrefs);
  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState(0);

  const open = useCallback(() => {
    setPrefs(readConsent() ?? defaultPrefs);
    setRender(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (!readConsent()) open();
    const reopen = () => open();
    document.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => document.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, [open]);

  useEffect(() => {
    setPrefsHeight(showPrefs && prefsRef.current ? prefsRef.current.scrollHeight : 0);
  }, [showPrefs, prefs]);

  function close() {
    setVisible(false);
    setTimeout(() => {
      setRender(false);
      setShowPrefs(false);
    }, 300);
  }

  function acceptAll() {
    writeConsent({ necessary: true, functional: true, analytics: true, marketing: true });
    close();
  }

  function savePreferences() {
    writeConsent({ ...prefs, necessary: true });
    close();
  }

  if (!render) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 right-4 z-[90] w-[360px] max-w-[90vw] md:bottom-6 md:right-6"
    >
      <div
        className={`flex flex-col gap-3 rounded-xl border border-line bg-surface/95 p-4 shadow-[0_20px_50px_-16px_rgb(17_24_39_/_0.35)] backdrop-blur transition-[opacity,transform] duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
            {ICON.cookie}
          </span>
          <h2 className="text-sm font-semibold leading-5">This site uses cookies</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cookie banner"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            {ICON.x}
          </button>
        </div>

        <p className="text-xs leading-5 text-muted">
          A couple of small cookies remember your choices — nothing is tracked,
          sold or shared. Read more{" "}
          <a
            href="/about"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            about UIYard
          </a>
          .
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((p) => !p)}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
            className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            Customize {ICON.chevron(showPrefs)}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-ink"
          >
            Accept all
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className="overflow-hidden transition-[height] duration-300 ease-out"
        >
          {showPrefs && (
            <div className="mt-1 flex flex-col gap-2">
              <PrefRow
                title="Strictly necessary"
                desc="Remembers this consent choice itself. Can't be switched off."
                checked
                locked
                onToggle={() => {}}
              />
              <PrefRow
                title="Functional"
                desc="Remembers preferences like your light/dark theme between visits."
                checked={prefs.functional}
                onToggle={() => setPrefs((p) => ({ ...p, functional: !p.functional }))}
              />
              <PrefRow
                title="Analytics"
                desc="UIYard runs no analytics today; your choice is saved in case that ever changes."
                checked={prefs.analytics}
                onToggle={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
              />
              <PrefRow
                title="Marketing"
                desc="UIYard shows no ads and never will sell data; saved for completeness."
                checked={prefs.marketing}
                onToggle={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
              />
              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-accent-ink"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
