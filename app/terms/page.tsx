import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms governing use of the Roadsafe Traffic website and its product information.",
  path: "/terms",
  noIndex: true
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      intro="These draft terms govern use of the Roadsafe Traffic website. Rental and purchase transactions remain subject to the terms issued with a formal quotation or agreement."
      sections={[
        {
          title: "Website information",
          body: "Website content is provided for general product and service information. Specifications, availability and imagery may change and must be confirmed in a formal Roadsafe quotation."
        },
        {
          title: "Quotations",
          body: "Submitting an enquiry does not create a contract or reserve equipment. A transaction only proceeds once Roadsafe issues a quotation and the applicable acceptance requirements are met."
        },
        {
          title: "Specifications and suitability",
          body: "Customers remain responsible for confirming that selected equipment is suitable for the intended site, regulatory environment and operating conditions."
        },
        {
          title: "Intellectual property",
          body: "Unless otherwise stated, website copy, branding, layouts and Roadsafe-owned media may not be reproduced without permission."
        },
        {
          title: "External resources",
          body: "The website may link to externally hosted specification documents and mapping services. Roadsafe is not responsible for the availability or privacy practices of third-party services."
        },
        {
          title: "Governing law",
          body: "These terms are intended to be governed by the laws of South Africa. Formal legal entity, jurisdiction and dispute details must be confirmed before publication."
        }
      ]}
    />
  );
}
