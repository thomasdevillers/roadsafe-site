import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/site-data";
import { productHref } from "@/lib/site-data";

export function Eyebrow({
  children,
  index,
  light = false
}: {
  children: React.ReactNode;
  index?: string;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>
      {index && <span>{index}</span>}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading--light" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function ProductCard({
  product,
  index,
  priority = false
}: {
  product: Product;
  index: number;
  priority?: boolean;
}) {
  return (
    <article className="product-card">
      <Link href={productHref(product)} aria-label={`View ${product.name}`}>
        <div className="product-card__image">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
            priority={priority}
          />
          <span className="product-card__number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="product-card__body">
          <p>
            {product.availability === "purchase"
              ? `Purchase only · ${product.categoryLabel}`
              : product.availability === "both"
                ? `Rent or purchase · ${product.categoryLabel}`
                : `Rental only · ${product.categoryLabel}`}
          </p>
          <h3>{product.name}</h3>
          <span>
            View equipment
            <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  light = false
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  light?: boolean;
}) {
  const className = `text-link ${light ? "text-link--light" : ""}`;
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
        <ArrowUpRight aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
