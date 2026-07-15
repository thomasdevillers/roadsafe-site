import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function LegalPage({
  title,
  intro,
  sections
}: {
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <Link className="back-link" href="/">
            <ArrowLeft aria-hidden="true" />
            Back to Roadsafe
          </Link>
          <p className="eyebrow eyebrow--light">Legal information</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="section section--white">
        <div className="container legal-layout">
          <aside className="draft-notice">
            <AlertTriangle aria-hidden="true" />
            <div>
              <strong>Draft for legal review</strong>
              <p>Do not publish until the legal entity details and wording are approved.</p>
            </div>
          </aside>
          <div className="legal-copy">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
