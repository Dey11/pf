import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { ASSET_BASE_URL } from "./src/lib/assets";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["codevps.tailc7cd0f.ts.net"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [new URL(`${ASSET_BASE_URL}/**`)],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
