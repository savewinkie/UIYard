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
    slug: "five-css-effects-you-can-copy-in-ten-seconds",
    title: "Five CSS effects you can copy in ten seconds",
    date: "2026-07-21",
    category: "Guide",
    excerpt:
      "Gradients, frosted glass, soft shadows, a loading spinner and a proper toggle — five effects you can generate, copy and paste before your coffee's cold.",
    body: [
      { type: "p", text: "Some CSS you write once and remember forever. The rest — the exact shadow values, the border trick for a triangle, the keyframes for a spinner — you look up every single time. Here are five of those, each with a tool that hands you the code so you never have to memorise it." },
      { type: "h2", text: "1. A gradient that doesn't look like 2014" },
      { type: "p", text: "Flat colour is fine, but a subtle gradient gives a hero or a button real depth. The CSS Gradient Maker lets you drag colour stops and the angle, preview it live, and copy clean linear, radial or conic CSS." },
      { type: "h2", text: "2. Frosted glass" },
      { type: "p", text: "Glassmorphism — that frosted, semi-transparent panel — is three or four properties you'll never remember in the right order. Tune it by eye in the Shadow & Glass Generator and copy the lot, backdrop-filter included." },
      { type: "h2", text: "3. A shadow with actual softness" },
      { type: "p", text: "Default box-shadows look stuck-on. The trick is a large blur, a little spread and a low-opacity colour. Drag those three sliders until the card lifts off the page, then copy." },
      { type: "h2", text: "4. A loading spinner, no library" },
      { type: "p", text: "You don't need a whole animation library for a spinner. The CSS Loader Generator has six built from pure CSS — pick one, set the colour and speed, and copy the keyframes." },
      { type: "h2", text: "5. A toggle switch from a checkbox" },
      { type: "p", text: "An iOS-style switch is just a checkbox and some CSS — no JavaScript. The CSS Switch Generator lets you size and colour it, and it toggles natively." },
      { type: "quote", text: "The work is small; the friction is not. A good tool takes the friction out and hands you the answer." },
      { type: "p", text: "All five run entirely in your browser, cost nothing and need no account. Bookmark the ones you reach for — or better, just remember the yard." },
    ],
  },
  {
    slug: "why-we-dont-make-you-sign-up",
    title: "Why we don't make you sign up",
    date: "2026-07-17",
    category: "Story",
    excerpt:
      "No accounts, no uploads, no “premium” wall. Here's the thinking behind keeping UIYard free and browser-only — and why it's genuinely better for you.",
    body: [
      { type: "p", text: "Think about the last time you needed something tiny online — a colour picked from an image, a quick word count, a password. Odds are the first result asked you to make an account before it would do the one small thing you came for." },
      { type: "h2", text: "The deal everywhere else" },
      { type: "p", text: "The usual bargain is: give us your email, watch these ads, or upload your file to our server and trust us with it. For a job that takes ten seconds, that's a lot of asking. And “upload your image to remove the background” quietly means your photo now lives on someone else's computer." },
      { type: "h2", text: "A different deal" },
      { type: "p", text: "UIYard makes the opposite bargain: nothing. Every tool runs as code inside your own browser tab. Your text, colours, images and passwords never leave your machine, because there's no server to send them to. That's not a privacy feature bolted on — it's just how the tools are built." },
      { type: "ul", items: [
        "No account, ever — open a tool, use it, leave.",
        "Nothing uploaded — the work happens on your device.",
        "No ads between you and the answer, and no “pro” tier that hides the useful bit.",
      ] },
      { type: "quote", text: "Open a tool, get your answer, get back to work. That's the whole deal." },
      { type: "p", text: "It also keeps us honest. There's no data to sell and no funnel to optimise, so the only thing worth doing is making the tools genuinely good — and planting the next one people ask for." },
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
