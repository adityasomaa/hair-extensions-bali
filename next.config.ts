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
    ];
  },
};

export default nextConfig;
