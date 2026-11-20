import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old design-preview URLs collapse to the homepage now that the client
  // has chosen the Luxe Minimal direction.
  async redirects() {
    return [
      {
        source: "/design-1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/design-2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/design-3",
        destination: "/",
        permanent: true,
      },
      {
        // Micro Ring discontinued — point the old (indexed) URL at the
        // closest equivalent so it doesn't 404 for search/AI crawlers.
        source: "/products/micro-ring",
        destination: "/products/nano-ring",
        permanent: true,
      },
      {
        // Tape-In discontinued (Nov 2026) — the old product page goes to the
        // price overview of the methods we still offer.
        source: "/products/tape-in",
        destination: "/products",
        permanent: true,
      },
      {
        // One address for Google: www lands on the bare domain.
        source: "/:path*",
        has: [{ type: "host", value: "www.thehairextensionsbali.com" }],
        destination: "https://thehairextensionsbali.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
