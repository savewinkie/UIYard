/**
 * The UIYard blog — a simple data-driven journal.
 *
 * A post is one entry in the `posts` array below; write its body as an ordered
 * list of blocks. No CMS, no markdown dependency — add an entry, `git push`,
 * and it's live (and in the sitemap). Newest post first is handled by helpers.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO — YYYY-MM-DD
  category: string;
  excerpt: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "six-new-tools-and-why-the-yard-keeps-growing",
    title: "Six new tools, and why the yard keeps growing",
    date: "2026-07-21",
    category: "Update",
    excerpt:
      "A transparent-background maker, an OG meta generator, an SVG-to-PNG converter and more — plus a look at how UIYard decides what to plant next.",
    body: [
      { type: "p", text: "The whole idea behind UIYard is that it's never finished. It's a yard, not a product launch — things get planted, they grow, and there's always something new coming up. This week six more tools opened up, so here's a quick tour." },
      { type: "h2", text: "What's new" },
      { type: "ul", items: [
        "Transparent Background — click a background colour and it's erased to transparent, then drop in a new colour or image behind your subject. All in your browser.",
        "OG Meta Generator — fill in a title, description and image and copy ready-to-paste Open Graph and Twitter tags, with a live preview of the share card.",
        "SVG to PNG — paste or upload an SVG and export a crisp PNG at up to 4×.",
        "Image to Base64 — inline a small image as a data URI for your HTML or CSS.",
        "Background Patterns — pure-CSS dots, grids, stripes and cross-hatch you can recolour and copy.",
        "CSS Switch Generator — a real toggle switch, built from a checkbox and a little CSS, no library.",
      ] },
      { type: "h2", text: "How we pick what to grow next" },
      { type: "p", text: "There's no roadmap committee. What gets built next is decided almost entirely by requests — the small jobs people tell us they keep opening another website for. If enough people need the same thing, it moves to the front of the queue." },
      { type: "quote", text: "The work is small; the friction is not. UIYard exists to take the friction out." },
      { type: "p", text: "If there's a tool you keep wishing existed, that's exactly the kind of thing that gets planted. Tell us what job you need done and it goes in the ground." },
    ],
  },
  {
    slug: "make-an-image-background-transparent-no-upload",
    title: "How to make an image background transparent — with nothing uploaded",
    date: "2026-07-14",
    category: "Guide",
    excerpt:
      "You don't need Photoshop or a sketchy upload site to knock out a background. Here's how to do it in your browser in about thirty seconds.",
    body: [
      { type: "p", text: "Removing the background from an image usually means one of two things: firing up Photoshop, or uploading your picture to some site that promises to \"process\" it for free. Neither is great when you just want a quick transparent PNG. Here's the faster, private way." },
      { type: "h2", text: "The thirty-second version" },
      { type: "ul", items: [
        "Open the Transparent Background tool and drop your image in.",
        "Click anywhere on the background — that colour is erased to transparent instantly.",
        "For an uneven background, click a few different spots, and nudge the Tolerance slider up until the whole background is gone.",
        "Pick a new backdrop if you want one — a solid colour or another image — or leave it transparent.",
        "Download the PNG.",
      ] },
      { type: "h2", text: "Why nothing is uploaded" },
      { type: "p", text: "The tool works by reading your image onto a canvas inside your own browser tab and erasing pixels that match the colour you clicked. Your file never travels to a server, which means there's nothing to leak, store or lose — and it's fast, because there's no round trip." },
      { type: "h2", text: "When it works best" },
      { type: "p", text: "Because it erases by colour, it shines on images with a solid, even background — product shots, logos, icons. Busy or gradient backgrounds have many colours, so you'll click a few areas and lean on the tolerance and edge-softness sliders. It's not an AI cut-out; it's a fast, honest colour key that handles most real-world cases in seconds." },
      { type: "quote", text: "Open a tool, get your answer, get back to work. That's the whole deal." },
    ],
  },
];

export const allPosts = (): Post[] =>
  [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

/** "July 21, 2026" — absolute so statically-built pages never go stale. */
export function postDate(post: Post): string {
  return new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function readingMinutes(post: Post): number {
  const words = post.body.reduce((n, b) => {
    if (b.type === "ul") return n + b.items.join(" ").split(/\s+/).length;
    return n + b.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
