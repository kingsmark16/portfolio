import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DEV_DIR ?? ".next",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
