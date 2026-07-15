import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/lib/site-data";
import { productsForCategory } from "@/lib/site-data";
import { PageHero } from "@/components/page-hero";
import { ProductCard, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export function CategoryDetail({ category }: { category: ProductCategory }) {
  const categoryProducts = productsForCategory(category);
  const purchaseOnly = categoryProducts.every(
    (product) => product.availability === "purchase"
  );

  return (
    <>
      <PageHero
        title={category.name}
        description={category.description}
        image={category.image}
        imageAlt={category.imageAlt}
        eyebrow={category.kicker}
        parent={{ label: "Products", href: "/products" }}
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
              {purchaseOnly ? "Purchase-only range" : "Nationwide support"}
            </span>
          </Reveal>
          <Reveal className="split-copy">
            <p className="eyebrow eyebrow--light">
              {purchaseOnly ? "Purchase made practical" : "Rental made practical"}
            </p>
            <h2>
              {purchaseOnly
                ? "One supplier for a complete warning-light order."
                : "One supplier from dispatch to collection."}
            </h2>
            <p>
              {purchaseOnly
                ? "Select the warning and delineation products your site needs, combine them in one quote and arrange delivery across South Africa."
                : "Roadsafe handles delivery, installation, maintenance and collection around the needs of active construction sites."}
            </p>
            <Link
              className="button button--light"
              href={purchaseOnly ? "/request-a-quote?type=purchase" : "/rentals"}
            >
              {purchaseOnly ? "Request purchase quote" : "How rentals work"}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand
        title={
          purchaseOnly
            ? "Build a warning-light order around the site."
            : undefined
        }
      />
    </>
  );
}
