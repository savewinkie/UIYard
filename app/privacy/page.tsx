import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "UIYard is privacy-first: tools run entirely in your browser, there are no accounts and no tracking. Read exactly what data is and isn't collected, and which cookies are used.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "July 18, 2026";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-muted">
        Last updated {UPDATED}
      </p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight">
        Privacy &amp; Cookie Policy
      </h1>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold">The short version</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          UIYard&apos;s tools run entirely in your browser. There are no
          accounts, no analytics and no advertising. Nothing you type, paste or
          upload ever leaves your device. The only cookies we set remember your
          cookie choice and your light/dark theme — nothing else.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10 text-[17px] leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            What we collect
          </h2>
          <p className="mt-3">
            Nothing personal. UIYard has no sign-up, no login and no user
            accounts, so there is no name, email or profile to collect. Every
            tool does its work as code inside your browser tab — your text,
            colours, images, passwords and files are processed on your own
            device and are never sent to us or anyone else.
          </p>
          <p className="mt-3">
            We do not run analytics, fingerprinting or advertising scripts. We
            do not build profiles or track you across sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Cookies we use
          </h2>
          <p className="mt-3">
            A cookie is a small text file a site stores in your browser. UIYard
            uses only two, and only for the site to work the way you asked:
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <th className="py-2.5 pr-4 font-semibold">Cookie</th>
                  <th className="py-2.5 pr-4 font-semibold">Type</th>
                  <th className="py-2.5 pr-4 font-semibold">Purpose</th>
                  <th className="py-2.5 font-semibold">Lifetime</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-line">
                  <td className="py-3 pr-4 font-mono text-sm">uiyard-consent</td>
                  <td className="py-3 pr-4">Necessary</td>
                  <td className="py-3 pr-4">Remembers your cookie choice so we don&apos;t ask again.</td>
                  <td className="py-3">1 year</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-sm">uiyard-theme</td>
                  <td className="py-3 pr-4">Functional</td>
                  <td className="py-3 pr-4">Remembers whether you chose light or dark mode.</td>
                  <td className="py-3">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5">
            There are no analytics, marketing or third-party tracking cookies.
            The <span className="font-mono text-[15px]">uiyard-theme</span> cookie
            is only stored if you allow functional cookies — otherwise your
            theme choice simply lasts for the current visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Third parties
          </h2>
          <p className="mt-3">
            The site is served by a hosting provider, which may keep standard
            server logs (such as IP addresses) for security and reliability, as
            almost all websites do. Fonts are bundled and served from UIYard
            itself, so no third-party font or CDN request is made from your
            browser. We do not embed advertising networks or social trackers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Your choices
          </h2>
          <p className="mt-3">
            You can change your cookie preferences at any time —{" "}
            <CookieSettingsLink className="cursor-pointer font-medium text-accent underline-offset-4 hover:underline" />{" "}
            reopens the consent panel. You can also delete UIYard&apos;s cookies
            from your browser settings at any point; the site keeps working
            without them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changes &amp; contact
          </h2>
          <p className="mt-3">
            If this policy changes in a way that affects you, the consent panel
            will ask again. Questions about privacy? Email{" "}
            <a
              href="mailto:link.bernath5@gmail.com?subject=UIYard privacy question"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              link.bernath5@gmail.com
            </a>
            . See also our{" "}
            <Link
              href="/terms"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
