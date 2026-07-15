import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { contact } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Roadsafe Traffic",
  description:
    "Contact Roadsafe Traffic in Gqeberha for road safety equipment rentals, project quotes and nationwide equipment support across South Africa.",
  path: "/contact"
});

export default function ContactPage() {
  const mapQuery = encodeURIComponent(contact.address);

  return (
    <>
      <PageHero
        title="Start the conversation."
        description="Request a quote, discuss a project requirement or contact Roadsafe directly for equipment support."
        image="/images/hero-roadworks.jpg"
        imageAlt="Road construction crew working on newly laid asphalt at sunset"
        eyebrow="Contact Roadsafe"
        currentHref="/contact"
      />
      <section className="section section--white contact-section">
        <div className="container contact-grid">
          <div className="contact-details">
            <p className="eyebrow">Direct contact</p>
            <h2>Reach the right channel.</h2>
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" />
              <span>
                <small>Call anytime</small>
                {contact.phoneDisplay}
              </span>
            </a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              <span>
                <small>WhatsApp</small>
                {contact.phoneDisplay}
              </span>
            </a>
            <a href={`mailto:${contact.publicEmail}`}>
              <Mail aria-hidden="true" />
              <span>
                <small>General enquiries</small>
                {contact.publicEmail}
              </span>
            </a>
            <div>
              <MapPin aria-hidden="true" />
              <span>
                <small>Roadsafe Traffic</small>
                {contact.address}
              </span>
            </div>
            <Link className="button" href="/request-a-quote">
              Request a quote
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="map-frame">
            <iframe
              title="Roadsafe Traffic location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
