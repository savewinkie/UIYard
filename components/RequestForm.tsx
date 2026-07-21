"use client";

import { useState } from "react";

const CATEGORIES = [
  "Color", "CSS", "Text", "Coding", "Image",
  "Typography", "Accessibility", "Generator", "Converter", "Social", "Not sure",
];

export default function RequestForm() {
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("Not sure");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  const ready = tool.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const subject = `UIYard tool request: ${tool.trim()}`;
    const body = [
      `Tool I'd like: ${tool.trim()}`,
      `Best-fit category: ${category}`,
      "",
      "What I'd use it for:",
      job.trim() || "(not specified)",
      "",
      email.trim() ? `Reach me at: ${email.trim()}` : "(no email left — that's fine)",
    ].join("\n");
    window.location.href = `mailto:link.bernath5@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
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

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">
          Your email{" "}
          <span className="font-normal text-muted">— optional, so we can tell you when it&apos;s planted</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-xl border border-line bg-background px-4 py-3 text-[15px] outline-none focus:border-accent/50"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send request →
        </button>
        {opened && (
          <span className="text-sm text-muted">
            Your email app should have opened with everything filled in — just hit send. 🌱
          </span>
        )}
      </div>

      <p className="text-xs text-muted">
        This opens your own email app with the request pre-written — nothing is sent automatically, and
        you can edit it first. No account, no tracking.
      </p>
    </form>
  );
}
