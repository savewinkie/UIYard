import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The plain-language terms for using UIYard's free tools: what you can do with them, the no-warranty basis they're provided on, and who owns what.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "July 18, 2026";

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-muted">Last updated {UPDATED}</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight">
        Terms &amp; Conditions
      </h1>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold">The short version</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          UIYard is free to use for personal and commercial work. The tools are
          provided as-is, with no guarantee. Anything you create with them is
          yours. Don&apos;t attack or abuse the service. That&apos;s the whole
          deal.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10 text-[17px] leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Using the tools
          </h2>
          <p className="mt-3">
            Every tool on UIYard is free to use, for both personal and
            commercial projects, with no account required. You don&apos;t need
            our permission to use what you make — palettes, gradients, CSS,
            passwords and everything else the tools produce are yours to use
            however you like.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            No warranty
          </h2>
          <p className="mt-3">
            The tools are provided &ldquo;as is&rdquo;, without warranties of
            any kind. We work to keep them accurate and reliable, but we
            can&apos;t guarantee every result is perfect or fit for a particular
            purpose. For anything important — production code, security,
            accessibility compliance — please double-check the output before you
            rely on it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Your content
          </h2>
          <p className="mt-3">
            Because the tools run entirely in your browser, we never receive,
            store or see what you put into them. You keep all rights to your own
            content, and we claim nothing over it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Acceptable use
          </h2>
          <p className="mt-3">
            Please don&apos;t try to break, overload, scrape at scale, or
            attack the service, and don&apos;t use it for anything unlawful.
            We&apos;d like the yard to stay open and free for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Liability
          </h2>
          <p className="mt-3">
            To the extent allowed by law, UIYard isn&apos;t liable for any loss
            or damage arising from using (or being unable to use) the tools.
            You use them at your own discretion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changes &amp; contact
          </h2>
          <p className="mt-3">
            These terms may be updated as the yard grows; the latest version
            always lives here. Questions? Email{" "}
            <a
              href="mailto:link.bernath5@gmail.com?subject=UIYard terms question"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              link.bernath5@gmail.com
            </a>
            . See also our{" "}
            <Link
              href="/privacy"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
