import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // @ts-ignore - Next.js 15+ specific property for dev safety
  allowedDevOrigins: ['127.0.0.1', 'localhost:*'],
};

export default nextConfig;
