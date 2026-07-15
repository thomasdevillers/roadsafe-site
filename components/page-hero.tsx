import Image from "next/image";
import Link from "next/link";

export function PageHero({
  title,
  description,
  image,
  imageAlt,
  eyebrow,
  parent
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  parent?: { label: string; href: string };
}) {
  return (
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
  );
}
