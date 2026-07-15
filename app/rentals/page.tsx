import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ClipboardCheck, MapPinned, PackageCheck, RefreshCcw, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Road Safety Equipment Rentals",
  description:
    "Flexible road safety equipment rentals with nationwide delivery, installation, maintenance and collection.",
  alternates: { canonical: "/rentals" }
};

const inclusions = [
  {
    icon: MapPinned,
    title: "Nationwide delivery",
    copy: "Equipment is dispatched to road and construction sites throughout South Africa."
  },
  {
    icon: PackageCheck,
    title: "On-site installation",
    copy: "We place, configure and commission equipment for its intended role."
  },
  {
    icon: Wrench,
    title: "Maintenance support",
    copy: "Roadsafe remains available to keep rental equipment working reliably."
  },
  {
    icon: RefreshCcw,
    title: "Planned collection",
    copy: "Collection is coordinated when the work is complete or the rental changes."
  }
];

export default function RentalsPage() {
  return (
    <>
      <PageHero
        title="Rental equipment that arrives ready to work."
        description="Choose any rental duration, combine multiple products and let Roadsafe coordinate the deployment from delivery to collection."
        image="/images/roadsafe-fleet.jpg"
        imageAlt="Roadsafe service vehicle deployed beside road safety equipment"
        eyebrow="Flexible rental periods"
      />

      <section className="section section--white">
        <div className="container split">
          <Reveal className="split-copy">
            <Eyebrow index="01">Built around the programme</Eyebrow>
            <h2>Rent for the work, not a fixed package.</h2>
            <p>
              A short intervention and a long civil project should not be forced
              into the same rental structure. Tell us where, when and what the site
              needs. We will quote the equipment and rental period around it.
            </p>
            <ul className="feature-list">
              <li>Any rental duration</li>
              <li>Multiple products on one quote</li>
              <li>Nationwide site coordination</li>
              <li>Same-business-day response</li>
            </ul>
          </Reveal>
          <Reveal className="split-image">
            <Image
              src="/images/vms-hire.png"
              alt="Roadsafe trailer-mounted variable message sign available for hire"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "contain", padding: "42px" }}
            />
            <span className="split-image__label">Rental-ready fleet</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark section--grid">
        <div className="container">
          <SectionHeading
            light
            eyebrow="Included with the rental"
            title="One accountable partner around the equipment."
          />
          <div className="icon-feature-grid">
            {inclusions.map(({ icon: Icon, title, copy }, index) => (
              <Reveal className="icon-feature" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--concrete">
        <div className="container">
          <SectionHeading
            eyebrow="The rental path"
            title="A direct route from requirement to deployment."
          />
          <div className="rental-timeline">
            <div>
              <ClipboardCheck aria-hidden="true" />
              <span>01</span>
              <h3>Build the requirement</h3>
              <p>Select equipment, quantities, location and the intended rental period.</p>
            </div>
            <div>
              <CalendarDays aria-hidden="true" />
              <span>02</span>
              <h3>Confirm the programme</h3>
              <p>We align availability, logistics and installation with your required date.</p>
            </div>
            <div>
              <PackageCheck aria-hidden="true" />
              <span>03</span>
              <h3>Deploy and support</h3>
              <p>Roadsafe delivers, sets up, maintains and later collects the fleet.</p>
            </div>
          </div>
          <div className="section-action">
            <Link className="button" href="/request-a-quote">
              Build a rental quote
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand title="Build a rental around your next project." />
    </>
  );
}
