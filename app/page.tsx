import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Clock3, MapPinned, Wrench } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Road Safety Equipment Rental & Sales South Africa | Roadsafe Traffic",
  description:
    "Rent or purchase VMS boards, traffic control units and speed radars, or hire solar light towers, with nationwide delivery and support from Roadsafe Traffic.",
  path: "/"
});

const featuredEquipment = [
  {
    name: "Variable Message Signs",
    label: "Rent or purchase · Traffic communication",
    image: "/images/vms-board.png",
    imageAlt: "Trailer-mounted Roadsafe variable message sign",
    href: "/products/variable-message-signs"
  },
  {
    name: "Traffic Control Units",
    label: "Rent or purchase · Temporary traffic control",
    image: "/images/traffic-control-unit-nobg.png",
    imageAlt: "Roadsafe mobile traffic control units",
    href: "/products/traffic-control-units"
  },
  {
    name: "Solar Light Towers",
    label: "Rental only · Worksite lighting",
    image: "/images/solar-light-tower-nobg.png",
    imageAlt: "Roadsafe mobile solar light tower",
    href: "/products/solar-light-towers"
  },
  {
    name: "Speed Radars",
    label: "Rent or purchase · Speed management",
    image: "/images/speed-sentinel-advanced.png",
    imageAlt: "Roadsafe vehicle-activated speed radar display",
    href: "/products/speed-radars"
  },
  {
    name: "Warning Lights",
    label: "Purchase only · Warning and delineation",
    image: "/images/solar-warning-light-nobg.png",
    imageAlt: "Roadsafe solar warning light",
    href: "/products/warning-lights"
  }
];

const featuredCaseStudies = [
  {
    corridor: "N3",
    route: "Pietermaritzburg to Durban",
    contractor: "WBHO",
    duration: "13 months",
    equipment: "VMS boards + speed radars",
    description:
      "Adaptable advance messaging and live speed feedback supported a long-running programme on one of KwaZulu-Natal’s busiest corridors.",
    image: "/images/vms-field.jpg",
    imageAlt: "Variable message sign used for a long-term road project",
    href: "/case-studies#n3-wbho"
  },
  {
    corridor: "R556",
    route: "Bela-Bela to Tweespruit",
    contractor: "Jodan Construction",
    duration: "24 months",
    equipment: "VMS boards + traffic huts",
    description:
      "A two-year deployment paired changing roadside information with practical operating points for traffic personnel.",
    image: "/images/roadsafe-fleet.jpg",
    imageAlt: "Roadsafe fleet supporting a regional road project",
    href: "/case-studies#r556-jodan"
  }
];

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
          <div className="fleet-capacity" aria-label="Roadsafe rental fleet capacity">
            <div>
              <strong>20</strong>
              <span>VMS boards in the fleet</span>
            </div>
            <div>
              <strong>28</strong>
              <span>Traffic control units in the fleet</span>
            </div>
          </div>
          <div className="product-grid product-grid--featured">
            {featuredEquipment.map((item, index) => (
              <article className="product-card" key={item.href}>
                <Link href={item.href} aria-label={`View ${item.name}`}>
                  <div className="product-card__image">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      priority={index < 2}
                    />
                    <span className="product-card__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="product-card__body">
                    <p>{item.label}</p>
                    <h3>{item.name}</h3>
                    <span>
                      View equipment
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
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

      <section className="section section--dark home-cases">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Proven on the road"
              title="Long-term deployments. Recognised contractors."
              copy="See how Roadsafe equipment supported changing traffic requirements across national and regional road projects."
              light
            />
          </Reveal>
          <div className="home-case-grid">
            {featuredCaseStudies.map((study) => (
              <article className="home-case-card" key={study.href}>
                <Link href={study.href} aria-label={`Read the ${study.corridor} case study`}>
                  <div className="home-case-card__image">
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                    <span>{study.duration}</span>
                  </div>
                  <div className="home-case-card__body">
                    <p>{study.contractor} / {study.equipment}</p>
                    <h3>{study.corridor}: {study.route}</h3>
                    <p>{study.description}</p>
                    <span>
                      Read case study
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="section-action home-cases__action">
            <Link className="button button--light" href="/case-studies">
              View all case studies
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Make the next work zone easier to read." />
    </>
  );
}
