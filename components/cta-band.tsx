import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { contact } from "@/lib/site-data";

export function CtaBand({
  title = "Tell us what the road ahead requires."
}: {
  title?: string;
}) {
  return (
    <section className="section section--orange cta-band">
      <div className="container cta-band__inner">
        <div>
          <p className="eyebrow">Same-business-day response</p>
          <h2>{title}</h2>
        </div>
        <div className="button-row">
          <Link className="button" href="/request-a-quote">
            Request a quote
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
          <a className="button button--outline" href={contact.phoneHref}>
            <Phone aria-hidden="true" size={18} />
            Call us
          </a>
        </div>
      </div>
    </section>
  );
}
