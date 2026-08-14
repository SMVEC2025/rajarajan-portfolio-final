import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
