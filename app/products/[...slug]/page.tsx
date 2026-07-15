import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetail } from "@/components/category-detail";
import { ProductDetail } from "@/components/product-detail";
import { categories, getCategory, getProduct, products } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  const paths = new Set([
    ...categories.map((category) => category.path),
    ...products.map((product) => product.path)
  ]);
  return [...paths].map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const product = getProduct(path);
  const category = getCategory(path);
  const entry = product || category;

  if (!entry) return { robots: { index: false, follow: false } };

  const description =
    "tagline" in entry
      ? `${entry.tagline} Available to rent with nationwide delivery and Roadsafe support.`
      : entry.description;

  return createPageMetadata({
    title: entry.name,
    description,
    path: `/products/${path}`,
    image: entry.image,
    imageAlt: entry.imageAlt
  });
}

export default async function ProductRoute({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  const product = getProduct(path);
  const category = getCategory(path);

  if (category && category.productPaths.length > 1) {
    return <CategoryDetail category={category} />;
  }

  if (product) {
    return <ProductDetail product={product} />;
  }

  notFound();
}
