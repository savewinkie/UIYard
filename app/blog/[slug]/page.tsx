import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allPosts,
  getPost,
  postDate,
  readingMinutes,
  type PostBlock,
} from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | UIYard`,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-semibold tracking-tight">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-2 border-l-2 border-brand py-1 pl-6 font-display text-xl font-semibold leading-snug">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="flex flex-col gap-2.5 pl-1">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="leading-relaxed text-muted">{block.text}</p>;
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Link" },
    publisher: { "@type": "Organization", name: "UIYard", url: SITE_URL },
    mainEntityOfPage: url,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="hero-glow border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <nav className="text-sm text-muted">
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent">{post.category}</span>
          </nav>
          <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <time dateTime={post.date}>{postDate(post)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(post)} min read</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <Reveal>
          <div className="flex flex-col gap-5 text-[17px]">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </Reveal>

        <div className="mt-14 border-t border-line pt-8">
          <Link href="/blog" className="text-sm font-medium text-accent transition-opacity hover:opacity-75">
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
