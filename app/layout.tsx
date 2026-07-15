import type { Metadata } from "next";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { StructuredData } from "@/components/structured-data";
import { contact } from "@/lib/site-data";
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Roadsafe Traffic | Road Safety Equipment Rental South Africa",
    template: "%s | Roadsafe Traffic"
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "road safety equipment South Africa",
    "traffic equipment rental",
    "variable message signs",
    "VMS board rental",
    "traffic control units",
    "speed radar signs",
    "solar light towers",
    "roadworks equipment"
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Road safety equipment rental",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Roadsafe Traffic | Road Safety Equipment Rental South Africa",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadsafe Traffic | Road Safety Equipment Rental South Africa",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url]
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png"
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/roadsafe-logo.png"),
        width: 388,
        height: 78
      },
      image: absoluteUrl(DEFAULT_OG_IMAGE.url),
      description: DEFAULT_DESCRIPTION,
      email: contact.publicEmail,
      telephone: "+27 66 000 8887",
      address: {
        "@type": "PostalAddress",
        streetAddress: "113 Louisa Road, Colleen Glen",
        addressLocality: "Gqeberha",
        addressRegion: "Eastern Cape",
        postalCode: "6018",
        addressCountry: "ZA"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+27 66 000 8887",
        email: contact.publicEmail,
        contactType: "customer service",
        areaServed: "ZA",
        availableLanguage: "English"
      },
      areaServed: { "@type": "Country", name: "South Africa" }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-ZA",
      publisher: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StructuredData data={globalStructuredData} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
