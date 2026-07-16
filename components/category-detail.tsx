import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/lib/site-data";
import { productsForCategory } from "@/lib/site-data";
import { PageHero } from "@/components/page-hero";
import { ProductCard, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/seo";

export function CategoryDetail({ category }: { category: ProductCategory }) {
  const categoryProducts = productsForCategory(category);
  const purchaseOnly = categoryProducts.every(
    (product) => product.availability === "purchase"
  );
  const rentOrPurchase = categoryProducts.some(
    (product) => product.availability === "both"
  );

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.description,
          url: absoluteUrl(`/products/${category.path}`),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: categoryProducts.length,
            itemListElement: categoryProducts.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: absoluteUrl(`/products/${product.path}`)
            }))
          }
        }}
      />
      <PageHero
        title={category.name}
        description={category.description}
        image={category.image}
        imageAlt={category.imageAlt}
        eyebrow={category.kicker}
        parent={{ label: "Products", href: "/products" }}
        currentHref={`/products/${category.path}`}
      />
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Equipment range"
              title="Choose the right format for the road ahead."
              copy="Every project is different. Select a model to review its role and technical profile, or include multiple systems in one quote."
            />
          </Reveal>
          <div className="product-grid">
            {categoryProducts.map((product, index) => (
              <ProductCard
                key={product.path}
                product={product}
                index={index}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container split">
          <Reveal className={`split-image ${purchaseOnly ? "split-image--contain" : ""}`}>
            <Image
              src={purchaseOnly ? category.image : "/images/field-service.jpg"}
              alt={
                purchaseOnly
                  ? category.imageAlt
                  : "Roadsafe service vehicle supporting roadside equipment"
              }
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="split-image__label">
              {purchaseOnly
                ? "Purchase-only range"
                : rentOrPurchase
                  ? "Rent or purchase"
                  : "Nationwide rental support"}
            </span>
          </Reveal>
          <Reveal className="split-copy">
            <p className="eyebrow eyebrow--light">
              {purchaseOnly
                ? "Purchase made practical"
                : rentOrPurchase
                  ? "Flexible supply options"
                  : "Rental made practical"}
            </p>
            <h2>
              {purchaseOnly
                ? "One supplier for a complete warning-light order."
                : rentOrPurchase
                  ? "Rent for the project or purchase for ongoing use."
                  : "One supplier from dispatch to collection."}
            </h2>
            <p>
              {purchaseOnly
                ? "Select the warning and delineation products your site needs, combine them in one quote and arrange delivery across South Africa."
                : rentOrPurchase
                  ? "Choose rent or purchase for each item, combine both in one quote and let Roadsafe coordinate delivery across South Africa."
                  : "Roadsafe handles delivery, installation, maintenance and collection around the needs of active construction sites."}
            </p>
            <Link
              className="button button--light"
              href={
                purchaseOnly
                  ? "/request-a-quote?type=purchase"
                  : rentOrPurchase
                    ? "/request-a-quote"
                    : "/rentals"
              }
            >
              {purchaseOnly
                ? "Request purchase quote"
                : rentOrPurchase
                  ? "Build an equipment quote"
                  : "How rentals work"}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand
        title={
          purchaseOnly
            ? "Build a warning-light order around the site."
            : rentOrPurchase
              ? "Choose the supply model that fits the project."
            : undefined
        }
      />
    </>
  );
}
