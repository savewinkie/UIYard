import type { Metadata } from "next";
import Link from "next/link";
import { allPosts, postDate, readingMinutes } from "@/lib/posts";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The UIYard blog — quick guides, design notes and opinions for designers and developers. Practical reads, a fresh post most weeks.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = allPosts();

  return (
    <div>
      <header className="hero-glow border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rise flex items-center gap-3 text-sm font-medium text-muted" style={{ ["--i" as string]: 0 }}>
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>Notes from the yard</span>
          </div>
          <h1 className="rise mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.06] tracking-tight" style={{ ["--i" as string]: 1 }}>
            The UIYard blog
          </h1>
          <p className="rise mt-7 max-w-2xl text-xl leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
            Quick guides, design notes and the odd opinion — practical reads for designers and
            developers, and the thinking behind the yard. A fresh post most weeks.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-b border-line py-8 transition-colors first:pt-0 hover:border-accent/30"
                >
                  <div className="flex items-center gap-3 text-xs font-medium text-muted">
                    <span className="text-accent">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{postDate(post)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{readingMinutes(post)} min read</span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
