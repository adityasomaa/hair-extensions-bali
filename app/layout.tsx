import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { brand } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransitionLoader from "@/components/loaders/PageTransitionLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — Premium Hair Extensions in Bali`,
  description: brand.tagline,
  metadataBase: new URL("https://thehairextensionsbali.com"),
  openGraph: {
    title: `${brand.name} — Premium Hair Extensions in Bali`,
    description: brand.tagline,
    locale: "en_US",
    type: "website",
  },
  verification: {
    // Bing Webmaster Tools site verification — proves we own this domain
    // so Bing (and ChatGPT, which uses Bing for live web search) can
    // index our content and surface us in AI answers.
    other: {
      "msvalidate.01": "DFBB7F42F864C6D1D8F74B9E5AC28C50",
    },
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
      className={`${inter.variable} ${playfair.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0e0b09] text-[#f6e9ec]">
        {/* Google tag (gtag.js) — Google Ads conversion tracking. Loaded
            via next/script afterInteractive so it never blocks paint. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16655338849"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16655338849');
          `}
        </Script>

        <PageTransitionLoader />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
