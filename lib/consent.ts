/**
 * The real cookie-consent system.
 *
 * Consent is stored as an actual cookie (not localStorage) so the server can
 * read it too, and so it expires like consent should. Categories other than
 * "necessary" are only honoured elsewhere in the app if the visitor opted in —
 * e.g. the theme-preference cookie is only written with functional consent.
 */

export type ConsentPrefs = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_COOKIE = "uiyard-consent";
export const CONSENT_VERSION = 1;
/** Dispatch this on document to reopen the cookie panel (e.g. footer link). */
export const OPEN_COOKIE_SETTINGS_EVENT = "uiyard:cookie-settings";
/** Fired on document whenever consent is saved, so live features (e.g. the
 *  analytics gate) can react immediately without a page reload. */
export const CONSENT_CHANGED_EVENT = "uiyard:consent-changed";

const YEAR = 60 * 60 * 24 * 365;

export const defaultPrefs: ConsentPrefs = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export function readConsent(): ConsentPrefs | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw.split("=").slice(1).join("=")));
    if (parsed?.v !== CONSENT_VERSION) return null; // re-ask after policy changes
    return {
      necessary: true,
      functional: !!parsed.functional,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function writeConsent(prefs: ConsentPrefs): void {
  const payload = encodeURIComponent(
    JSON.stringify({ ...prefs, v: CONSENT_VERSION, ts: Date.now() })
  );
  document.cookie = `${CONSENT_COOKIE}=${payload};path=/;max-age=${YEAR};samesite=lax`;

  // Enforce immediately: revoking functional consent deletes the cookies it covers.
  if (!prefs.functional) {
    document.cookie = "uiyard-theme=;path=/;max-age=0";
  }

  // Let live features (analytics gate, etc.) respond without a reload.
  document.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
}

export function hasConsent(category: keyof ConsentPrefs): boolean {
  if (category === "necessary") return true;
  return readConsent()?.[category] ?? false;
}

export function openCookieSettings(): void {
  document.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
