import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Cần thiết cho Docker
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
