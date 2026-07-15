import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.roadsafe.co.za";
  const staticPaths = [
    "",
    "/products",
    "/rentals",
    "/support",
    "/resources",
    "/about",
    "/contact",
    "/request-a-quote",
    "/privacy-policy",
    "/terms"
  ];
  const productPaths = new Set([
    ...categories.map((category) => `/products/${category.path}`),
    ...products.map((product) => `/products/${product.path}`)
  ]);

  return [...staticPaths, ...productPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.6
  }));
}
