import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Tool was renamed shortly after launch — keep the old URL working.
      {
        source: "/tools/background-remover",
        destination: "/tools/transparent-background",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
