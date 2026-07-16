"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { featuredTools, categories, type Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

const ring = (tool: Tool) => categories[tool.category].color;
const label = (tool: Tool) => categories[tool.category].label;

function ToolVisual({ tool }: { tool: Tool }) {
  if (tool.slug === "color-palette-generator") {
    return (
      <div className="flex h-full w-full gap-2 p-5">
        {["#f5643c", "#f8845f", "#f2a63d", "#f6c65a", "#fbf1e8"].map((c) => (
          <div key={c} className="flex-1 rounded-xl border border-line/50" style={{ backgroundColor: c }} />
        ))}
      </div>
    );
  }
  if (tool.slug === "color-shades") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-1.5 p-5">
        {[0.16, 0.34, 0.52, 0.7, 0.88].map((a) => (
          <div key={a} className="h-4 rounded-md" style={{ background: `rgb(245 100 60 / ${a})` }} />
        ))}
      </div>
    );
  }
  if (tool.slug === "css-gradient-maker") {
    return (
      <div className="h-full w-full p-5">
        <div
          className="gradient-live h-full w-full rounded-2xl"
          style={{ backgroundImage: "linear-gradient(120deg, #f5643c, #f2853f 45%, #f6c65a)" }}
        />
      </div>
    );
  }
  if (tool.slug === "border-radius") {
    return (
      <div className="grid h-full w-full place-items-center p-5">
        <div
          className="h-28 w-40 border-2 border-dashed"
          style={{ borderColor: "#ef8a34", borderRadius: "38px 12px 38px 12px", background: "rgb(239 138 52 / 0.12)" }}
        />
      </div>
    );
  }
  if (tool.slug === "shadow-glassmorphism") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl p-5">
        <div className="blob left-6 top-4 h-24 w-24" style={{ background: "rgb(245 100 60 / 0.5)" }} />
        <div className="blob bottom-2 right-8 h-20 w-20" style={{ background: "rgb(242 166 61 / 0.45)", animationDelay: "-6s" }} />
        <div className="glass-card absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl" />
      </div>
    );
  }
  if (tool.slug === "case-converter") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 font-mono text-sm">
        <span className="text-muted">hello yard</span>
        <span className="text-lg">↓</span>
        <span className="font-semibold" style={{ color: "#d9822b" }}>HELLO YARD</span>
        <span className="font-semibold" style={{ color: "#c77a52" }}>helloYard</span>
      </div>
    );
  }
  if (tool.slug === "json-formatter") {
    return (
      <div className="flex h-full w-full items-center justify-center p-5">
        <pre className="font-mono text-xs leading-relaxed text-muted">
{`{
  `}<span style={{ color: "#5b8bb2" }}>&quot;yard&quot;</span>{`: `}<span style={{ color: "#7fa650" }}>&quot;tidy&quot;</span>{`,
  `}<span style={{ color: "#5b8bb2" }}>&quot;valid&quot;</span>{`: `}<span style={{ color: "#f5643c" }}>true</span>{`
}`}
        </pre>
      </div>
    );
  }
  if (tool.slug === "contrast-checker") {
    return (
      <div className="grid h-full w-full grid-cols-2 gap-3 p-5">
        <div className="grid place-items-center rounded-2xl bg-[#2a1d18] text-center text-sm font-semibold text-white">Aa 7:1</div>
        <div className="grid place-items-center rounded-2xl bg-[#f2a63d] text-center text-sm font-semibold text-[#2a1d18]">Aa AA</div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-5">
      <span className="text-5xl font-semibold tracking-tight">Aa</span>
      <span className="text-sm text-muted">Heading meets body text</span>
    </div>
  );
}

/** Document-flow top of an element (immune to sticky offsets). */
function docTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function StackCard({ tool, index, total }: { tool: Tool; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targetScale = 1 - (total - index) * 0.045;
    let top = docTop(container);
    let height = container.offsetHeight;

    const update = () => {
      const progress = Math.min(Math.max((window.scrollY - top) / height, 0), 1);
      const scale = 1 + (targetScale - 1) * progress;
      card.style.transform = `scale(${scale})`;
      card.style.transformOrigin = "center top";
    };

    const onResize = () => {
      top = docTop(container);
      height = container.offsetHeight;
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [index, total]);

  return (
    <div ref={containerRef} className="sticky top-0 flex h-[92vh] items-center justify-center">
      <div
        ref={cardRef}
        className="relative w-[min(880px,92vw)] rounded-[26px]"
        style={{ marginTop: `calc(-4vh + ${index * 26}px)` }}
      >
        <div className="electric-ring rounded-[26px]" style={{ ["--ring" as string]: ring(tool) }} />
        <div className="glass-card overflow-hidden rounded-[26px] p-7 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: `${ring(tool)}1a`, color: ring(tool) }}
              >
                <ToolIcon category={tool.category} className="h-3.5 w-3.5" />
                {label(tool)}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{tool.name}</h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted sm:text-lg">{tool.tagline}</p>
              <Link
                href={`/tools/${tool.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(245_100_60_/_0.5)] transition-all hover:-translate-y-0.5"
              >
                Open tool →
              </Link>
            </div>
            <div className="h-48 rounded-2xl border border-line/60 bg-surface/50 sm:h-64">
              <ToolVisual tool={tool} />
            </div>
          </div>
          <p className="mt-6 text-right font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ToolShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <div ref={rootRef}>
      {featuredTools.map((tool, i) => (
        <StackCard key={tool.slug} tool={tool} index={i} total={featuredTools.length} />
      ))}
    </div>
  );
}
