import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/products",
    "/rentals",
    "/support",
    "/resources",
    "/about",
    "/contact",
    "/request-a-quote"
  ];
  const productPaths = new Set([
    ...categories.map((category) => `/products/${category.path}`),
    ...products.map((product) => `/products/${product.path}`)
  ]);

  return [...staticPaths, ...productPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-07-15"),
    changeFrequency:
      path === "" || path === "/products" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/products" || path === "/rentals"
          ? 0.9
          : path.startsWith("/products")
            ? 0.8
            : path === "/request-a-quote" || path === "/contact"
              ? 0.7
              : 0.6
  }));
}
