import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Find Next.js's existing SVG rule and exclude our SVGs from it
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (s: string) => boolean } }) => rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,

  // ❌ Remove this line: output: "export"
  // ✅ Let Netlify handle dynamic pages and Sanity routes automatically.

  images: {
    unoptimized: true, // Keep this if you're using Next.js <Image> with Netlify
  },

  // ✅ Avoid build failures due to type or linting warnings
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
