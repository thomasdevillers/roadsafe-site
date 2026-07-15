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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.roadsafe.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roadsafe Traffic | Informing the Motorist",
    template: "%s | Roadsafe Traffic"
  },
  description:
    "Reliable road safety equipment rentals, delivered and supported across South Africa. Request a same-business-day quote from Roadsafe Traffic.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Roadsafe Traffic",
    images: [{ url: "/images/hero-roadworks.jpg", width: 1797, height: 980 }]
  },
  twitter: {
    card: "summary_large_image"
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
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
