"use client";

import { useState } from "react";

const CATEGORIES = [
  "Color", "CSS", "Text", "Coding", "Image",
  "Typography", "Accessibility", "Generator", "Converter", "Social", "Not sure",
];

/**
 * No <form>, no email/PII field, no JS redirect — the "send" control is a plain
 * click-to-email link. This keeps the page from tripping phishing heuristics
 * (which flag PII-collecting forms on new domains), and it's simpler: the reply
 * address comes for free from the visitor's own email client.
 */
export default function RequestForm() {
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("Not sure");
  const [job, setJob] = useState("");

  const ready = tool.trim().length > 0;
  const subject = `UIYard tool request: ${tool.trim()}`;
  const body = [
    `Tool I'd like: ${tool.trim()}`,
    `Best-fit category: ${category}`,
    "",
    "What I'd use it for:",
    job.trim() || "(not specified)",
  ].join("\n");
  const mailto = `mailto:link.bernath5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">
          What tool do you need? <span className="text-brand">*</span>
        </span>
        <input
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          placeholder="e.g. a favicon generator, an SVG optimiser…"
          className="rounded-xl border border-line bg-background px-4 py-3 text-[15px] outline-none focus:border-accent/50"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Which corner of the yard?</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-accent/50"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">
          What&apos;s the job?{" "}
          <span className="font-normal text-muted">— what you&apos;d actually do with it</span>
        </span>
        <textarea
          value={job}
          onChange={(e) => setJob(e.target.value)}
          rows={4}
          placeholder="Describe the small thing you keep opening another website for."
          className="resize-y rounded-xl border border-line bg-background px-4 py-3 text-[15px] leading-relaxed outline-none focus:border-accent/50"
        />
      </label>

      <div className="flex flex-col gap-3">
        <a
          href={ready ? mailto : undefined}
          aria-disabled={!ready}
          className={`inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] ${
            ready ? "" : "pointer-events-none opacity-40"
          }`}
        >
          Write the email →
        </a>
        <p className="text-xs text-muted">
          This opens your own email app with the request already written — you send it from your
          address (that&apos;s how we reply). Nothing is submitted, collected or stored on this page.
        </p>
      </div>
    </div>
  );
}
