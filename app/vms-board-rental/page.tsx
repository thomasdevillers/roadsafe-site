import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarClock,
  MapPinned,
  MessageSquareText,
  RadioTower,
  ShieldCheck,
  Sun
} from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "VMS Board Rental & Sales South Africa",
  description:
    "Rent or purchase solar-powered VMS boards with remote message control, nationwide delivery and project support from Roadsafe Traffic.",
  path: "/vms-board-rental",
  image: "/images/vms-field.jpg",
  imageAlt: "Roadsafe variable message sign displaying a roadside safety message"
});

const faqs = [
  {
    question: "Can VMS boards be rented or purchased?",
    answer:
      "Yes. Roadsafe offers VMS boards for project rental or purchase. Select the preferred option in the quote form and we will respond around the intended use and project duration."
  },
  {
    question: "Can the message be changed remotely?",
    answer:
      "Yes. Messages can be managed from a phone or desktop, allowing the displayed information to change as the work zone, diversion or traffic condition changes."
  },
  {
    question: "Does Roadsafe deliver VMS boards nationwide?",
    answer:
      "Yes. Roadsafe coordinates delivery across South Africa, with setup and practical project support included for rental deployments."
  },
  {
    question: "What rental periods are available?",
    answer:
      "Rental periods are structured around the project. Share the expected dates if known, or select that you are not sure yet and Roadsafe will help define the requirement."
  }
];

const caseStudies = [
  {
    route: "N3 · Pietermaritzburg to Durban",
    contractor: "WBHO",
    duration: "13 months",
    equipment: "VMS boards + speed radars",
    href: "/case-studies#n3-wbho"
  },
  {
    route: "N4 · Nelspruit to Komatipoort",
    contractor: "Tau Pele",
    duration: "9 months",
    equipment: "VMS boards + dummy speed cameras",
    href: "/case-studies#n4-tau-pele"
  }
];

export default function VmsBoardLandingPage() {
  return (
    <>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "VMS board rental and sales",
            serviceType: "Variable message sign rental and sales",
            provider: { "@type": "Organization", name: "Roadsafe Traffic" },
            areaServed: { "@type": "Country", name: "South Africa" },
            url: absoluteUrl("/vms-board-rental")
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer }
            }))
          }
        ]}
      />

      <section className="vms-landing-hero">
        <div className="container vms-landing-hero__grid">
          <div className="vms-landing-hero__copy">
            <p className="eyebrow eyebrow--light">VMS board rental & sales · South Africa</p>
            <h1>Put the right message ahead of the work zone.</h1>
            <p>
              Rent or purchase trailer-mounted, solar-powered variable message signs
              with remote control, nationwide delivery and Roadsafe project support.
            </p>
            <div className="button-row">
              <a className="button" href="#vms-quote">
                Request a VMS quote
                <ArrowDown aria-hidden="true" size={18} />
              </a>
              <Link className="button button--outline-light" href="/case-studies">
                See project experience
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <div className="vms-landing-hero__visual">
            <Image
              src="/images/vms-field.jpg"
              alt="Roadsafe variable message sign displaying a roadside safety message"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span>20 VMS BOARDS IN THE FLEET</span>
          </div>
        </div>
        <div className="vms-proof-bar">
          <div className="container">
            <span><strong>20</strong> VMS boards</span>
            <span>Rent or purchase</span>
            <span>Nationwide delivery</span>
            <span>Same-business-day response</span>
          </div>
        </div>
      </section>

      <section className="section section--white vms-benefits">
        <div className="container">
          <div className="vms-landing-heading">
            <div>
              <p className="eyebrow">Built for changing conditions</p>
              <h2>One board. A message that moves with the project.</h2>
            </div>
            <p>
              Give approaching motorists clear, current information without waiting
              for permanent infrastructure or replacing static signs every time the
              traffic arrangement changes.
            </p>
          </div>
          <div className="vms-benefit-grid">
            <article>
              <MessageSquareText aria-hidden="true" />
              <h3>Change messages remotely</h3>
              <p>Update warnings, directions and project notices from phone or desktop.</p>
            </article>
            <article>
              <Sun aria-hidden="true" />
              <h3>Solar-powered operation</h3>
              <p>Operate off-grid with AC charging backup available when required.</p>
            </article>
            <article>
              <MapPinned aria-hidden="true" />
              <h3>Ready for the road</h3>
              <p>Mobile, road-legal trailers support changing work fronts and deployments.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--dark vms-equipment-proof">
        <div className="container vms-equipment-proof__grid">
          <div className="vms-equipment-proof__visual">
            <Image
              src="/images/vms-board.png"
              alt="Trailer-mounted Roadsafe variable message sign"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="vms-equipment-proof__copy">
            <p className="eyebrow eyebrow--light">Roadsafe VMS platform</p>
            <h2>Clear communication, configured for the site.</h2>
            <p>
              A five-colour optical LED display, remote message management and a
              mobile solar platform give project teams a practical communication
              system for roadworks, diversions and incident response.
            </p>
            <ul className="feature-list">
              <li>112 × 56 pixel display matrix</li>
              <li>Phone and desktop message control</li>
              <li>Solar power with AC charging backup</li>
              <li>Road-legal trailer with 360-degree board rotation</li>
              <li>Optional radar speed display</li>
            </ul>
            <a className="text-link text-link--light" href="#vms-quote">
              Get a project quote
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--light vms-quote-section" id="vms-quote">
        <div className="container">
          <div className="vms-quote-intro">
            <div>
              <p className="eyebrow">Preselected VMS quote</p>
              <h2>Tell us where the board needs to work.</h2>
            </div>
            <div className="vms-quote-assurances">
              <span><CalendarClock aria-hidden="true" /> Same-business-day response</span>
              <span><ShieldCheck aria-hidden="true" /> Rent or purchase</span>
              <span><RadioTower aria-hidden="true" /> Remote message control</span>
            </div>
          </div>
          <QuoteForm initialProduct="variable-message-signs" />
        </div>
      </section>

      <section className="section section--white vms-project-proof">
        <div className="container">
          <div className="vms-landing-heading">
            <div>
              <p className="eyebrow">Selected project experience</p>
              <h2>Used where the message needs to stay relevant.</h2>
            </div>
            <p>
              Roadsafe VMS boards have supported extended contractor deployments on
              major South African road corridors.
            </p>
          </div>
          <div className="vms-project-grid">
            {caseStudies.map((study) => (
              <Link href={study.href} key={study.href}>
                <span>{study.duration}</span>
                <p>{study.contractor} / {study.equipment}</p>
                <h3>{study.route}</h3>
                <strong>Read case study <ArrowUpRight aria-hidden="true" /></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light vms-faq">
        <div className="container">
          <div className="vms-landing-heading">
            <div>
              <p className="eyebrow">VMS board questions</p>
              <h2>Useful answers before the quote.</h2>
            </div>
          </div>
          <div className="vms-faq__grid">
            {faqs.map((faq, index) => (
              <article key={faq.question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{faq.question}</h3><p>{faq.answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
