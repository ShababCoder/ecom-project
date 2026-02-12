import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    // We set the root to the directory where next.config.ts is located (__dirname)
    root: path.join(__dirname),
  },
};

export default nextConfig;
