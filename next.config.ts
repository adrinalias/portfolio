import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable type checking during builds to catch errors early
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Enable Next.js image optimization for better performance
    // Specify formats for modern browsers
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
