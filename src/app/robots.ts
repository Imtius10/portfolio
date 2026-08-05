import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cv/lecturer", "/lecturer", "/dashboard"],
      },
    ],
    sitemap: "https://imtiusahmad.com/sitemap.xml",
  };
}
