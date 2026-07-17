import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaletteSwitcher from "@/components/PaletteSwitcher";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "development" && <PaletteSwitcher />}
        {/* Site-level structured data for search engines & AI assistants */}
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
