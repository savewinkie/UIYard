import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
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
  metadataBase: new URL("https://uiyard.com"),
  title: {
    default: "UIYard — Free tools for designers & developers",
    template: "%s | UIYard",
  },
  description:
    "A growing yard of free design tools: color palettes, CSS gradients, shadows, glassmorphism, font pairings and more. No signup, everything runs in your browser.",
  openGraph: {
    siteName: "UIYard",
    type: "website",
    url: "https://uiyard.com",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Light is the default (like 10015). Dark is opt-in and remembered in a cookie.
  const theme = (await cookies()).get("uiyard-theme")?.value;
  const isDark = theme === "dark";

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased ${isDark ? "dark" : ""}`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookiePanel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "UIYard",
              url: "https://uiyard.com",
              description:
                "Free design & developer tools that run entirely in your browser — color palettes, CSS generators, text utilities, converters and more. No signup, no ads, no uploads.",
            }),
          }}
        />
      </body>
    </html>
  );
}
