import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, MapPinned, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import type { Product } from "@/lib/site-data";
import { products } from "@/lib/site-data";
import { Eyebrow, ProductCard, SectionHeading, TextLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export function ProductDetail({ product }: { product: Product }) {
  const isPurchase = product.availability === "purchase";
  const preferredRelated = products
    .filter(
      (item) =>
        item.path !== product.path &&
        (item.category === product.category || item.flagship)
    );
  const related = [
    ...preferredRelated,
    ...products.filter(
      (item) =>
        item.path !== product.path &&
        !preferredRelated.some((preferred) => preferred.path === item.path)
    )
  ].slice(0, 3);
  const productUrl = `/products/${product.path}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: absoluteUrl("/products")
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.categoryLabel,
          item: absoluteUrl(product.categoryPath)
        },
        {
          "@type": "ListItem",
          position: 4,
          name: product.name,
          item: absoluteUrl(productUrl)
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${absoluteUrl(productUrl)}#product`,
      name: product.name,
      alternateName: product.shortName,
      description: product.description,
      url: absoluteUrl(productUrl),
      image: [absoluteUrl(product.image)],
      sku: product.slug,
      category: product.categoryLabel,
      brand: { "@type": "Brand", name: "Roadsafe Traffic" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Road construction and traffic management teams"
      },
      additionalProperty: product.specs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value
      }))
    }
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <section className="product-hero">
        <div className="container product-hero__grid">
          <div className="product-hero__copy">
            <Link className="back-link" href={product.categoryPath}>
              <ArrowLeft aria-hidden="true" />
              {product.categoryLabel}
            </Link>
            <Eyebrow>
              {isPurchase
                ? "Purchase-only range"
                : product.flagship
                  ? "Flagship rental fleet"
                  : product.categoryLabel}
            </Eyebrow>
            <h1>{product.name}</h1>
            <p>{product.tagline}</p>
            <div className="button-row">
              <Link className="button" href={`/request-a-quote?product=${product.slug}`}>
                {isPurchase ? "Request purchase quote" : "Request this equipment"}
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              {product.specUrl && (
                <a
                  className="button button--outline"
                  href={product.specUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download aria-hidden="true" size={18} />
                  Spec sheet
                </a>
              )}
            </div>
          </div>
          <div className="product-hero__visual">
            <div className="product-hero__coordinates" aria-hidden="true">
              <span>{isPurchase ? "ZA / PURCHASE RANGE" : "ZA / RENTAL FLEET"}</span>
              <span>{isPurchase ? "AVAILABLE TO ORDER" : "READY TO DEPLOY"}</span>
            </div>
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="product-hero__rail">
          <div className="container">
            <span>{isPurchase ? "Available for purchase" : "Rental durations to suit the project"}</span>
            <span>Nationwide delivery</span>
            <span>{isPurchase ? "Product support included" : "Installation & maintenance included"}</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container split">
          <Reveal className="split-copy">
            <Eyebrow index="01">Built for site conditions</Eyebrow>
            <h2>{product.tagline}</h2>
            <p>{product.description}</p>
            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <TextLink href={`/request-a-quote?product=${product.slug}`}>
              {isPurchase ? "Add to purchase quote" : "Add to quote"}
            </TextLink>
          </Reveal>
          <Reveal className="service-panel">
            <p className="service-panel__label">
              {isPurchase ? "Purchase support" : "Rental support included"}
            </p>
            <div>
              <MapPinned aria-hidden="true" />
              <h3>Delivered nationwide</h3>
              <p>
                {isPurchase
                  ? "Roadsafe coordinates delivery to your project location."
                  : "We coordinate delivery and collection around your project programme."}
              </p>
            </div>
            <div>
              {isPurchase ? <PackageCheck aria-hidden="true" /> : <Wrench aria-hidden="true" />}
              <h3>{isPurchase ? "Specified for the job" : "Installed and maintained"}</h3>
              <p>
                {isPurchase
                  ? "We help confirm the right warning-light format for the intended use."
                  : "Roadsafe configures the equipment and keeps it operating reliably."}
              </p>
            </div>
            <div>
              <ShieldCheck aria-hidden="true" />
              <h3>Quality first</h3>
              <p>Equipment selected for demanding road and construction environments.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark section--grid">
        <div className="container">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Technical profile"
              title="The details your project team needs."
              copy="Specifications below are based on the current Roadsafe catalogue. Items marked for confirmation are tracked in the project TODO."
            />
          </Reveal>
          <div className="spec-grid">
            {product.specs.map((spec) => (
              <div className="spec-item" key={spec.label}>
                <p>{spec.label}</p>
                <strong>{spec.value}</strong>
                {spec.needsConfirmation && <span>Pending final verification</span>}
              </div>
            ))}
          </div>
          {product.specUrl && (
            <div className="spec-download">
              <TextLink href={product.specUrl} external light>
                Open current specification
              </TextLink>
            </div>
          )}
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <SectionHeading
            eyebrow="Complete the site"
            title="Related equipment."
            copy={
              isPurchase
                ? "Combine warning-light products in one purchase quote and let Roadsafe coordinate delivery."
                : "Combine systems in a single quote and let Roadsafe coordinate delivery, setup and collection."
            }
          />
          <div className="product-grid">
            {related.map((item, index) => (
              <ProductCard key={item.path} product={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          isPurchase
            ? `Add ${product.shortName} to your equipment order.`
            : `Put ${product.shortName} on your next project.`
        }
      />
    </>
  );
}
