import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/seo";

export function PageHero({
  title,
  description,
  image,
  imageAlt,
  eyebrow,
  parent,
  currentHref
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  parent?: { label: string; href: string };
  currentHref: string;
}) {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    ...(parent ? [{ name: parent.label, href: parent.href }] : []),
    { name: title, href: currentHref }
  ];

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.href)
          }))
        }}
      />
      <section className="page-hero">
        <div className="page-hero__image">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container page-hero__content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            {parent && (
              <>
                <Link href={parent.href}>{parent.label}</Link>
                <span>/</span>
              </>
            )}
            <span aria-current="page">{eyebrow}</span>
          </nav>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
}
