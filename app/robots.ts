import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.roadsafe.co.za";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/quote-confirmation"]
    },
    sitemap: `${base}/sitemap.xml`
  };
}
