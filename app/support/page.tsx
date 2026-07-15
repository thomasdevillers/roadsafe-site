import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Settings, Truck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { contact } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Road Safety Equipment Support",
  description:
    "Get nationwide Roadsafe rental equipment support, including delivery coordination, installation, setup, maintenance and collection.",
  path: "/support",
  image: "/images/field-service.jpg",
  imageAlt: "Roadsafe equipment support vehicle deployed beside a road"
});

export default function SupportPage() {
  return (
    <>
      <PageHero
        title="Support that stays with the equipment."
        description="From first configuration to final collection, Roadsafe remains accountable for keeping rental equipment ready for the site."
        image="/images/field-service.jpg"
        imageAlt="Roadsafe support vehicle and equipment deployed beside a road"
        eyebrow="Deployment & maintenance"
        currentHref="/support"
      />
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Roadsafe support"
            title="Practical help at every operating stage."
          />
          <div className="support-steps">
            {[
              {
                icon: Truck,
                title: "Delivery coordination",
                copy: "We plan dispatch and site arrival around the agreed project date."
              },
              {
                icon: Settings,
                title: "Installation & setup",
                copy: "Equipment is positioned, configured and checked for the intended use."
              },
              {
                icon: Wrench,
                title: "Maintenance",
                copy: "Rental units remain supported so equipment issues do not become site delays."
              },
              {
                icon: Truck,
                title: "Collection",
                copy: "When the work changes or ends, we coordinate safe removal from site."
              }
            ].map(({ icon: Icon, title, copy }, index) => (
              <Reveal className="support-step" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark section--grid">
        <div className="container split">
          <Reveal className="split-copy">
            <Eyebrow light index="24/7">Direct contact</Eyebrow>
            <h2>Site issue? Reach Roadsafe directly.</h2>
            <p>
              Call or send a WhatsApp message at any time. Include the project
              location, equipment type and a short description so the right response
              can be coordinated quickly.
            </p>
            <div className="button-row">
              <a className="button button--light" href={contact.phoneHref}>
                <Phone aria-hidden="true" size={18} />
                {contact.phoneDisplay}
              </a>
              <a
                className="button button--outline-light"
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" size={18} />
                WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal className="support-callout">
            <p>For new projects</p>
            <h3>Need equipment rather than support?</h3>
            <Link href="/request-a-quote">
              Request a quote
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Put dependable support behind the deployment." />
    </>
  );
}
