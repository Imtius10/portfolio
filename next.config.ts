import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  // the brotli-compressed chromium binaries are not JS, so tracing skips them
  outputFileTracingIncludes: {
    "/resume.pdf": ["./node_modules/@sparticuz/chromium/bin/**/*"],
    "/cv-lecturer.pdf": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
