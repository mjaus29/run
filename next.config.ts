import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  // PWA configuration requires webpack

  // TypeScript build error handling
  typescript: {
    // Allow builds to complete even with TypeScript errors
    ignoreBuildErrors: false, // Set to true to ignore TS errors during builds
  },

  // Additional build optimizations
  experimental: {
    // Enable faster builds by skipping type checking in production
    typedRoutes: false,
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
