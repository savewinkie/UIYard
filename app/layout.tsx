import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookiePanel from "@/components/CookiePanel";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UIYard — Free tools for designers & developers",
    template: "%s | UIYard",
  },
  description:
    "A growing yard of free design tools: color palettes, CSS gradients, shadows, glassmorphism, font pairings and more. No signup, everything runs in your browser.",
  openGraph: {
    siteName: "UIYard",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Runs synchronously in <head> before first paint: applies the saved theme so
// pages stay fully STATIC (no server-side cookie read) with no flash of the
// wrong theme. See node_modules/next/dist/docs/.../preventing-flash-before-hydration.md
const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)uiyard-theme=(dark|light)/);if(m&&m[1]==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookiePanel />
        {/* Cookieless, privacy-friendly visitor counting. Only collects on a
            live Vercel deployment — dormant while running locally. */}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "UIYard",
              url: SITE_URL,
              description:
                "Free design & developer tools that run entirely in your browser — color palettes, CSS generators, text utilities, converters and more. No signup, no ads, no uploads.",
            }),
          }}
        />
      </body>
    </html>
  );
}
