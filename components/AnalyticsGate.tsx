"use client";

/**
 * Consent-gated analytics. Vercel Web Analytics is privacy-friendly and
 * cookieless, but we still only switch it on once a visitor has allowed the
 * "analytics" category — so the cookie panel's toggle actually controls
 * something real. It reacts live: the instant someone clicks Accept, tracking
 * turns on without a page reload.
 */

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { hasConsent, CONSENT_CHANGED_EVENT } from "@/lib/consent";

export default function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(hasConsent("analytics"));
    sync(); // read the saved choice on load
    document.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => document.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  return allowed ? <Analytics /> : null;
}
