import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    // Configuration options go here
    remotePatterns: [
      // Required for external images
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
    ],
  },
};

export default nextConfig;
