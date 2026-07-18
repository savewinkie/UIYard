import type { Metadata } from "next";
import Link from "next/link";
import { liveTools, tools, categories, categoryOrder, liveCountIn } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import Mascot from "@/components/Mascot";
import Squiggle from "@/components/Squiggle";

export const metadata: Metadata = {
  title: "What is UIYard? The bookmark mess, and how we're fixing it",
  description:
    "Every small design job means another website, another signup, another upload. UIYard is the fix: one growing yard of free tools that run entirely in your browser.",
  alternates: { canonical: "/about" },
};

const PUBLISHED = "July 17, 2026";

const FAQS = [
  {
    q: "Is UIYard really free?",
    a: `Yes — every tool, completely free, no account needed. UIYard currently has ${liveTools.length} live tools and new ones are planted all the time.`,
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Every tool runs entirely in your browser — your text, colors and passwords are never uploaded, stored or seen by anyone.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There are no accounts, no logins and no paywalls. Open a tool, use it, done.",
  },
  {
    q: "How often do new tools come out?",
    a: "Constantly — that's the whole idea of the yard. Tools marked “Soon” are already planted and open up as they're ready.",
  },
  {
    q: "Can I request a tool?",
    a: "Please do! Use the “Request a tool” link in the header or footer and describe the job you need done — real requests decide what grows next.",
  },
];

export default function AboutPage() {
  return (
    <article>
      {/* ---------- Article header ---------- */}
      <header className="hero-glow border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div
            className="rise flex items-center gap-3 text-sm font-medium text-muted"
            style={{ ["--i" as string]: 0 }}
          >
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>The yard</span>
            <span aria-hidden="true">·</span>
            <time dateTime="2026-07-17">{PUBLISHED}</time>
          </div>

          <h1
            className="rise mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.06] tracking-tight"
            style={{ ["--i" as string]: 1 }}
          >
            Fifty tabs for fifty tiny jobs — and how we&apos;re{" "}
            <span className="relative inline-block">
              fixing it
              <Squiggle className="draw-in absolute -bottom-1.5 left-0 h-3 w-full" />
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-2xl text-xl leading-relaxed text-muted"
            style={{ ["--i" as string]: 2 }}
          >
            Every small design job seems to need its own website, its own popups
            and its own “create an account” wall. UIYard is our answer: one
            growing yard of {liveTools.length} free tools that run entirely in
            your browser.
          </p>

          <dl
            className="rise mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            style={{ ["--i" as string]: 3 }}
          >
            {[
              { n: liveTools.length, l: "tools live" },
              { n: categoryOrder.length, l: "categories" },
              { n: 0, l: "signups needed" },
              { n: 0, l: "data collected" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-line bg-surface p-4">
                <dd className="font-display text-3xl font-bold tracking-tight">
                  {s.n}
                </dd>
                <dt className="mt-1 text-sm text-muted">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------- Article body ---------- */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-12">
          {/* The problem */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The problem: the bookmark mess
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                Think about the last time you needed something small — a colour
                palette, a quick gradient, a word count, a password. Chances are
                each job sent you to a different website. One had an ad between
                you and the answer. One wanted an account first. One quietly
                uploaded your file to “process” it.
              </p>
              <p>
                None of those jobs takes more than a minute. Yet makers end up
                with fifty bookmarks for fifty tiny tools, each with its own
                popups, paywalls and trust questions. The work is small; the
                friction is not.
              </p>
            </div>
          </section>

          {/* The fix */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The fix: one yard that grows
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                UIYard puts the small tools in one place and holds every one of
                them to the same three promises:
              </p>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {[
                {
                  title: "Free, no accounts",
                  body: "No signups, no paywalls, no “premium” tiers. Open a tool, use it, leave.",
                },
                {
                  title: "Everything runs in your browser",
                  body: "Your text, colours, images and passwords never leave your machine. There is no server to upload to.",
                },
                {
                  title: "One job, done fast",
                  body: "Each tool does a single thing and hands you the result — usually as copy-ready CSS or a one-click copy.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* What's in the yard */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s in the yard
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                The tools span {categoryOrder.length} categories — everything a
                designer or front-end developer reaches for between the big
                jobs. Here&apos;s the ground so far:
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categoryOrder.map((cat) => {
                const meta = categories[cat];
                const live = liveCountIn(cat);
                return (
                  <div
                    key={cat}
                    className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4"
                  >
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                      style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                    >
                      <ToolIcon category={cat} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold">
                        {meta.label}{" "}
                        <span className="font-normal text-muted">
                          · {live > 0 ? `${live} live` : "coming soon"}
                        </span>
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">
                        {meta.blurb}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Privacy, in depth */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why “runs in your browser” matters
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                Most online tools work by sending your data to a server, doing
                the work there, and sending it back. That means your file, your
                text or your colours briefly live on someone else&apos;s
                computer — and you have to trust what happens to them there.
              </p>
              <p>
                UIYard doesn&apos;t work that way. Every tool runs as code
                inside your own browser tab. Resize an image and the pixels
                never leave your laptop. Generate a password and it&apos;s
                created with your browser&apos;s built-in cryptography — never
                sent, stored or logged. There is simply no server to upload to,
                which means there&apos;s nothing to leak, sell or lose.
              </p>
            </div>
          </section>

          {/* Pull quote */}
          <aside className="border-l-2 border-brand py-1 pl-6">
            <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              Open a tool, get your answer, get back to work. That&apos;s the
              whole deal.
            </p>
          </aside>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How the yard works
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                The yard currently spans {categoryOrder.length} categories —
                colour, CSS, text, coding, images, typography, accessibility,
                generators, converters and social — with {liveTools.length}{" "}
                tools live and {tools.length - liveTools.length} more already
                planted. Cards marked <em>Soon</em> aren&apos;t placeholders for
                show; they&apos;re the actual queue, and they open up one by one.
              </p>
              <p>
                What grows next isn&apos;t decided by a roadmap committee.
                It&apos;s decided by requests: if you&apos;re missing a tool,{" "}
                <a
                  href="mailto:link.bernath5@gmail.com?subject=UIYard tool request"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  tell us what job you need done
                </a>{" "}
                and it goes in the ground. Everything that opens is logged in
                the{" "}
                <Link
                  href="/whats-growing"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  growth diary
                </Link>
                .
              </p>
            </div>
          </section>

          {/* The name */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why “UIYard”? And who&apos;s the sprout?
            </h2>
            <div className="mt-5 flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
              <Mascot className="h-32 w-auto shrink-0 sm:h-40" />
              <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
                <p>
                  A yard is the opposite of a product launch. Nothing arrives
                  finished — things get planted, they grow, and the yard is
                  never “done”. That&apos;s exactly how this site works, so the
                  name stuck.
                </p>
                <p>
                  The little sprout is the gardener. He shows up when you hit a
                  dead end — an empty search, a missing page — and he&apos;s
                  the reminder that this whole place is tended by a person:
                  UIYard is built and designed by Link, one tool at a time.
                </p>
              </div>
            </div>
          </section>

          {/* What's next */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s next
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed text-muted">
              <p>
                More tools, every week — that&apos;s the only roadmap. The
                fastest way to see the newest arrivals is the{" "}
                <Link
                  href="/whats-growing"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  growth diary
                </Link>
                ; the fastest way to get value out of the yard is to just start
                using it.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(17_24_39_/_0.28)] transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5"
              >
                Explore all {liveTools.length} tools →
              </Link>
              <Link
                href="/whats-growing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-surface px-6 py-3 text-[15px] font-semibold text-accent transition-[transform,box-shadow,border-color,color] hover:-translate-y-0.5 hover:border-accent/40"
              >
                See what&apos;s growing
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-line pt-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions people ask
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-line bg-surface px-5 py-4 transition-colors open:border-accent/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Structured data: the article itself + the FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Fifty tabs for fifty tiny jobs — and how we're fixing it",
              description:
                "Why every small design job costs a signup, an ad and an upload — and how UIYard fixes it with one growing yard of free, browser-only tools.",
              datePublished: "2026-07-17",
              author: { "@type": "Person", name: "Link" },
              publisher: { "@type": "Organization", name: "UIYard" },
              mainEntityOfPage: "https://uiyard.com/about",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </article>
  );
}
