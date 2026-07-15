import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Quote Request Received",
  robots: { index: false, follow: false }
};

export default async function QuoteConfirmationPage({
  searchParams
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  return (
    <section className="confirmation-page">
      <div className="confirmation-mark">
        <Check aria-hidden="true" />
      </div>
      <p className="eyebrow">Request received</p>
      <h1>Roadsafe has the requirement.</h1>
      <p>
        We will review the details and respond the same business day.
        {ref && (
          <>
            {" "}
            Keep reference <strong>{ref}</strong> for follow-up.
          </>
        )}
      </p>
      <div className="button-row">
        <Link className="button" href="/products">
          Continue browsing
          <ArrowRight aria-hidden="true" />
        </Link>
        <a className="button button--outline" href={contact.phoneHref}>
          <Phone aria-hidden="true" />
          Call Roadsafe
        </a>
        <a
          className="button button--outline"
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
