import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Clock3, MapPinned, Wrench } from "lucide-react";
import { getProduct } from "@/lib/site-data";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Eyebrow, ProductCard, SectionHeading, TextLink } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Road Safety Equipment Rental & Sales South Africa | Roadsafe Traffic",
  description:
    "Rent or purchase VMS boards, traffic control units and speed radars, or hire solar light towers, with nationwide delivery and support from Roadsafe Traffic.",
  path: "/"
});

const featuredProducts = [
  getProduct("variable-message-signs"),
  getProduct("traffic-control-units"),
  getProduct("solar-light-towers"),
  getProduct("speed-radars/speed-sentinel-advanced"),
  getProduct("speed-radars/speed-sentinel-classic"),
  getProduct("speed-radars/speed-sentinel-compact")
].filter((product) => Boolean(product));

const clients = [
  {
    name: "WBHO",
    image: "/images/client-wbho.jpeg",
    width: 200,
    height: 200
  },
  {
    name: "Tau Pele Infrastructure",
    image: "/images/client-tau-pele.jpeg",
    width: 447,
    height: 447
  },
  {
    name: "South African National Roads Agency",
    image: "/images/client-sanral.jpeg",
    width: 447,
    height: 447
  },
  {
    name: "Raubex",
    image: "/images/client-raubex.jpg",
    width: 200,
    height: 200
  }
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image
          className="home-hero__image"
          src="/images/hero-roadworks.jpg"
          alt="Road construction crew working on newly laid asphalt at sunset"
          fill
          priority
          sizes="100vw"
        />
        <div className="home-hero__shade" />
        <div className="home-hero__mark" aria-hidden="true">
          RT / ZA
        </div>
        <div className="container home-hero__content">
          <Eyebrow light>Road safety equipment supply</Eyebrow>
          <h1>Informing the motorist.</h1>
          <p>
            Reliable traffic communication and control equipment, delivered,
            installed and supported anywhere in South Africa.
          </p>
          <div className="button-row">
            <Link className="button" href="/request-a-quote">
              Request a quote
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button--outline-light" href="/products">
              Explore equipment
              <ArrowDown aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <div className="home-hero__rail">
          <div className="container">
            <span>01 / RENT OR PURCHASE</span>
            <span>02 / NATIONWIDE DELIVERY</span>
            <span>03 / SAME-DAY RESPONSE</span>
          </div>
        </div>
      </section>

      <section className="section section--white flagship-intro">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Flagship road safety equipment"
              title="Clear communication. Controlled traffic. Fewer unknowns."
              copy="Road construction does not wait for perfect conditions. Roadsafe supplies the systems contractors need to communicate changes, control movement and keep works visible."
            />
          </Reveal>
          <div className="flagship-editorial">
            <Reveal className="flagship-editorial__visual">
              <Image
                src="/images/vms-board.png"
                alt="Trailer-mounted Roadsafe variable message sign"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <span>VMS / REMOTE CONTROL</span>
            </Reveal>
            <Reveal className="flagship-editorial__copy">
              <Eyebrow index="01">Variable message signs</Eyebrow>
              <h2>Change the message as the road changes.</h2>
              <p>
                Solar-powered VMS boards give project teams direct control over
                roadside messaging, from diversions and lane closures to safety
                notices and incident response.
              </p>
              <ul className="feature-list">
                <li>Remote phone and desktop management</li>
                <li>Five-colour optical LED display</li>
                <li>Road-legal mobile platform</li>
              </ul>
              <TextLink href="/products/variable-message-signs">
                Explore VMS boards
              </TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark section--grid">
        <div className="container flagship-editorial flagship-editorial--reverse">
          <Reveal className="flagship-editorial__copy">
            <Eyebrow light index="02">Traffic control units</Eyebrow>
            <h2>Keep alternating traffic moving safely.</h2>
            <p>
              Solar power, signal lighting and radio communication combine in a
              mobile control system designed for temporary works and changing site
              layouts.
            </p>
            <ul className="feature-list">
              <li>Linked red, green and amber signalling</li>
              <li>Off-grid solar operation</li>
              <li>Delivered, installed and maintained</li>
            </ul>
            <TextLink href="/products/traffic-control-units" light>
              Explore traffic control units
            </TextLink>
          </Reveal>
          <Reveal className="flagship-editorial__visual flagship-editorial__visual--dark">
            <Image
              src="/images/traffic-control-unit-nobg.png"
              alt="Roadsafe mobile traffic control units"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span>TCU / SOLAR POWERED</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Rental fleet"
              title="The right equipment for every point of risk."
              copy="Build one quote across multiple product families. We will help coordinate delivery, setup and support."
            />
          </Reveal>
          <div className="product-grid">
            {featuredProducts.map((product, index) =>
              product ? (
                <ProductCard
                  key={product.path}
                  product={product}
                  index={index}
                  priority={index < 2}
                />
              ) : null
            )}
          </div>
          <div className="section-action">
            <TextLink href="/products">View the full equipment range</TextLink>
          </div>
        </div>
      </section>

      <section className="section section--concrete rental-process">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Rental, without the uncertainty"
              title="From requirement to roadside."
            />
          </Reveal>
          <div className="process-grid">
            <div className="process-step">
              <span>01</span>
              <Clock3 aria-hidden="true" />
              <h3>Tell us what the project needs</h3>
              <p>Select one or more products, choose rent or purchase, and add the details you know.</p>
            </div>
            <div className="process-step">
              <span>02</span>
              <MapPinned aria-hidden="true" />
              <h3>We coordinate the deployment</h3>
              <p>Roadsafe plans delivery and installation around your site location.</p>
            </div>
            <div className="process-step">
              <span>03</span>
              <Wrench aria-hidden="true" />
              <h3>Equipment stays supported</h3>
              <p>Rentals stay maintained through collection, while purchases include practical product support.</p>
            </div>
          </div>
          <div className="section-action">
            <TextLink href="/rentals">See how rentals work</TextLink>
          </div>
        </div>
      </section>

      <section className="section section--white trust-section">
        <div className="container">
          <div className="trust-intro">
            <div>
              <Eyebrow>Quality & reliability</Eyebrow>
              <h2>Chosen for the work that cannot be left unclear.</h2>
            </div>
            <p>
              Roadsafe supports road construction teams with dependable equipment,
              practical deployment and responsive service.
            </p>
          </div>
          <div className="client-logo-grid" aria-label="Roadsafe clients">
            {clients.map((client) => (
              <div className="client-logo" key={client.name}>
                <Image
                  src={client.image}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  sizes="(max-width: 680px) 70vw, (max-width: 1120px) 35vw, 220px"
                />
              </div>
            ))}
          </div>
          <div className="quality-points">
            {[
              "Equipment selected for demanding sites",
              "Flexible rental and purchase options",
              "Nationwide delivery and collection",
              "Same-business-day quote response"
            ].map((point) => (
              <div key={point}>
                <Check aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Make the next work zone easier to read." />
    </>
  );
}
