import Image from "next/image";
import { Gauge, Map, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how Roadsafe Traffic supplies and supports reliable road safety equipment for roadworks and construction projects across South Africa.",
  path: "/about",
  image: "/images/roadsafe-fleet.jpg",
  imageAlt: "Roadsafe Traffic service vehicle supporting roadside equipment"
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Reliable equipment. Clear accountability."
        description="Roadsafe Traffic helps road construction teams communicate hazards, control movement and maintain visibility with equipment selected for real site conditions."
        image="/images/roadsafe-fleet.jpg"
        imageAlt="Roadsafe Traffic vehicle supporting roadside equipment"
        eyebrow="Roadsafe Traffic"
        currentHref="/about"
      />
      <section className="section section--white">
        <div className="container split">
          <Reveal className="split-copy">
            <Eyebrow index="01">What we stand for</Eyebrow>
            <h2>Quality and reliability are operating requirements.</h2>
            <p>
              Road construction environments are exposed, mobile and time-sensitive.
              Equipment has to be visible, practical to deploy and supported when the
              programme changes. That is the standard Roadsafe brings to every rental.
            </p>
            <ul className="feature-list">
              <li>Equipment chosen for demanding road environments</li>
              <li>Direct, practical project communication</li>
              <li>Flexible rental durations</li>
              <li>Support across South Africa</li>
            </ul>
          </Reveal>
          <Reveal className="split-image">
            <Image
              src="/images/roadworks.jpg"
              alt="Road construction operation protected by high-visibility barriers"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="split-image__label">Built around roadworks</span>
          </Reveal>
        </div>
      </section>
      <section className="section section--dark section--grid">
        <div className="container">
          <SectionHeading
            light
            eyebrow="The Roadsafe standard"
            title="Four commitments behind every deployment."
          />
          <div className="principle-grid">
            {[
              { icon: ShieldCheck, title: "Dependable", copy: "Equipment and support structured to reduce uncertainty on site." },
              { icon: Gauge, title: "Responsive", copy: "Quote requests reviewed the same business day." },
              { icon: Map, title: "Nationwide", copy: "Delivery and project coordination across South Africa." },
              { icon: Wrench, title: "Supported", copy: "Installation, maintenance and collection handled by Roadsafe." }
            ].map(({ icon: Icon, title, copy }, index) => (
              <Reveal className="principle" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Bring Roadsafe into the project plan." />
    </>
  );
}
