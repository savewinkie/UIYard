import Link from "next/link";
import { categories, getTool, liveTools } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/ToolIcon";
import Reveal from "@/components/Reveal";

const FACTS = ["Free", "No signup", "Runs in your browser", "Nothing uploaded"];

export default function ToolPageShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const tool = getTool(slug);
  if (!tool) return null;
  const meta = categories[tool.category];

  const related = [
    ...liveTools.filter((t) => t.slug !== slug && t.category === tool.category),
    ...liveTools.filter((t) => t.slug !== slug && t.category !== tool.category),
  ].slice(0, 3);

  // Structured data (JSON-LD) for richer Google results — a free web app,
  // its breadcrumb trail, and its FAQ (when the tool has one). All @graph nodes
  // share the single @context above.
  const canonical = `${SITE_URL}/tools/${slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: "DesignApplication",
      operatingSystem: "Any (runs in a web browser)",
      url: canonical,
      description: tool.seoDescription,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "UIYard", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UIYard", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${meta.label} Tools`, item: `${SITE_URL}/tools?q=${tool.category}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: canonical },
      ],
    },
  ];
  if (tool.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header band */}
      <div className="hero-glow border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <nav className="text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-foreground">
              UIYard
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/tools?q=${tool.category}`} className="transition-colors hover:text-foreground">
              {meta.label} Tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <div className="mt-6 flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
              style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
            >
              <ToolIcon category={tool.category} className="h-7 w-7" />
            </span>
            <div>
              <span
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: meta.color }}
              >
                {meta.label}
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {tool.name}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-muted">{tool.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {FACTS.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The tool */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {children}

        {/* About + how-to */}
        {(tool.about || tool.howTo) && (
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {tool.about && (
              <Reveal>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    About this tool
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">{tool.about}</p>
                </div>
              </Reveal>
            )}
            {tool.howTo && (
              <Reveal delay={100}>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    How to use it
                  </h2>
                  <ol className="mt-4 flex flex-col gap-3">
                    {tool.howTo.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-semibold"
                          style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            )}
          </div>
        )}

        {/* FAQ */}
        {tool.faqs && tool.faqs.length > 0 && (
          <Reveal>
            <div className="mt-16">
              <h2 className="text-xl font-semibold tracking-tight">
                Good to know
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tool.faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-line bg-surface p-5"
                  >
                    <p className="font-semibold">{faq.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Related */}
        <section className="mt-20">
          <h2 className="text-lg font-semibold tracking-tight">More tools</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
