import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { products, productHref } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Equipment Resources & Specifications",
  description:
    "Access Roadsafe Traffic equipment specifications and product information without registration.",
  alternates: { canonical: "/resources" }
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Specifications, without a gate."
        description="Review product information freely. Current external files remain available while Roadsafe prepares a complete branded resource library."
        image="/images/hero-roadworks.jpg"
        imageAlt="Road construction crew working on newly laid asphalt at sunset"
        eyebrow="Free equipment resources"
      />
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Equipment library"
            title="Technical information for planning and procurement."
            copy="Where a verified specification document is not yet available, the product page clearly identifies details awaiting confirmation."
          />
          <div className="resource-list">
            {products.map((product, index) => (
              <article className="resource-row" key={product.path}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <FileText aria-hidden="true" />
                <div>
                  <p>
                    {product.availability === "purchase"
                      ? `Purchase only · ${product.categoryLabel}`
                      : product.categoryLabel}
                  </p>
                  <h2>{product.name}</h2>
                </div>
                <div className="resource-row__actions">
                  <Link href={productHref(product)}>
                    Product details
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                  {product.specUrl ? (
                    <a href={product.specUrl} target="_blank" rel="noreferrer">
                      <Download aria-hidden="true" />
                      Open specification
                    </a>
                  ) : (
                    <Link href={`/request-a-quote?product=${product.slug}`}>
                      Request specification
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
