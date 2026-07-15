import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Draft privacy policy for Roadsafe Traffic.",
  robots: { index: false, follow: true }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="This draft explains how Roadsafe Traffic intends to handle personal information submitted through this website."
      sections={[
        {
          title: "Information we collect",
          body: "We may collect contact details, company information, project requirements and correspondence when you submit a quote request, contact us directly or communicate about a rental."
        },
        {
          title: "How information is used",
          body: "Information is used to respond to enquiries, prepare quotations, coordinate equipment rentals, provide support and maintain business records."
        },
        {
          title: "Sharing and service providers",
          body: "Information may be processed by service providers used for website hosting, email delivery and business administration. Roadsafe Traffic does not intend to sell personal information."
        },
        {
          title: "Retention and security",
          body: "Personal information should only be retained for as long as required for the purpose collected, contractual obligations and applicable legal requirements. Reasonable safeguards should be used to protect it."
        },
        {
          title: "Your rights",
          body: "You may request access to, correction of or deletion of personal information, subject to applicable South African law and legitimate record-keeping requirements."
        },
        {
          title: "Contact",
          body: "Privacy enquiries can be sent to info@roadsafe.co.za. The responsible party and formal legal entity details must be inserted before publication."
        }
      ]}
    />
  );
}
