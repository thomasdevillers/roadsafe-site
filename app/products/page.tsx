import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, productsForCategory } from "@/lib/site-data";
import { PageHero } from "@/components/page-hero";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata = createPageMetadata({
  title: "Road Safety Equipment for Hire & Purchase",
  description:
    "Explore VMS boards, traffic control units, speed radar signs and solar light towers for hire, plus road warning equipment for purchase in South Africa.",
  path: "/products"
});

export default function ProductsPage() {
  const featured = categories.flatMap(productsForCategory).filter((product) => product.flagship);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Road Safety Equipment",
          description:
            "Roadsafe Traffic equipment for road communication, control, lighting and warning.",
          url: absoluteUrl("/products"),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: categories.length,
            itemListElement: categories.map((category, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: category.name,
              url: absoluteUrl(`/products/${category.path}`)
            }))
          }
        }}
      />
      <PageHero
        title="Equipment built to keep roads moving."
        description="Traffic communication, control, lighting and warning systems, supplied and supported nationwide."
        image="/images/hero-roadworks.jpg"
        imageAlt="Road construction crew working on newly laid asphalt at sunset"
        eyebrow="Roadsafe equipment"
        currentHref="/products"
      />
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Flagship fleet"
            title="Start with the systems road contractors rely on most."
            copy="Our VMS boards and traffic control units are configured for fast deployment, reliable operation and clear roadside communication."
          />
          <div className="flagship-grid">
            {featured.map((product) => (
              <article className="flagship-card" key={product.path}>
                <div className="flagship-card__image">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <div className="flagship-card__body">
                  <Eyebrow>Priority rental fleet</Eyebrow>
                  <h2>{product.name}</h2>
                  <p>{product.tagline}</p>
                  <Link className="text-link" href={`/products/${product.path}`}>
                    Explore equipment
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark section--grid">
        <div className="container">
          <SectionHeading
            light
            eyebrow="Complete catalogue"
            title="Five equipment families. One dependable rental partner."
          />
          <div className="category-list">
            {categories.map((category, index) => (
              <Reveal key={category.path}>
                <Link className="category-row" href={`/products/${category.path}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{category.kicker}</p>
                    <h3>{category.name}</h3>
                  </div>
                  <p>{category.description}</p>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
