import type { Metadata } from "next";
import { Clock3, Mail, Phone } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a same-business-day rental or purchase quote for Roadsafe Traffic equipment anywhere in South Africa.",
  alternates: { canonical: "/request-a-quote" }
};

export default async function RequestQuotePage({
  searchParams
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <section className="quote-hero">
        <div className="container quote-hero__grid">
          <div>
            <p className="eyebrow eyebrow--light">Equipment quote</p>
            <h1>Build the requirement.</h1>
            <p>
              Add rental equipment, purchase products or both. Tell us where and
              when they are needed, and Roadsafe will respond the same business day.
            </p>
          </div>
          <div className="quote-hero__facts">
            <div>
              <Clock3 aria-hidden="true" />
              <span>Response target</span>
              <strong>Same business day</strong>
            </div>
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" />
              <span>Prefer to call?</span>
              <strong>{contact.phoneDisplay}</strong>
            </a>
            <a href={`mailto:${contact.quoteEmail}`}>
              <Mail aria-hidden="true" />
              <span>Quote email</span>
              <strong>{contact.quoteEmail}</strong>
            </a>
          </div>
        </div>
      </section>
      <section className="section section--light quote-section">
        <div className="container">
          <QuoteForm initialProduct={product} />
        </div>
      </section>
    </>
  );
}
