import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <section className="confirmation-page">
      <p className="eyebrow">404 / Route not found</p>
      <h1>This road does not continue.</h1>
      <p>The page may have moved as part of the Roadsafe catalogue rebuild.</p>
      <div className="button-row">
        <Link className="button" href="/products">
          Browse equipment
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="button button--outline" href="/">
          <ArrowLeft aria-hidden="true" />
          Back home
        </Link>
      </div>
    </section>
  );
}
