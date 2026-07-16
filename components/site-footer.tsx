import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contact, navigation } from "@/lib/site-data";

const marqueeItems = [
  "INFORMING THE MOTORIST",
  "RENTAL READY",
  "NATIONWIDE DELIVERY",
  "INFORMING THE MOTORIST"
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee__track">
          {[0, 1].map((group) => (
            <div className="footer-marquee__group" key={group}>
              {marqueeItems.map((item, index) => (
                <span key={`${group}-${index}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <Image
            src="/images/roadsafe-logo-nobg.png"
            alt="Roadsafe Traffic"
            width={776}
            height={156}
          />
          <p>
            Reliable road safety equipment, delivered and supported across South Africa.
          </p>
          <Link className="text-link text-link--light" href="/request-a-quote">
            Start a quote
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">Navigate</p>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <p className="footer-label">Contact</p>
          <a href={contact.phoneHref}>
            <Phone aria-hidden="true" size={16} />
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.publicEmail}`}>
            <Mail aria-hidden="true" size={16} />
            {contact.publicEmail}
          </a>
          <Link href="/contact">
            <MapPin aria-hidden="true" size={16} />
            Gqeberha, South Africa
          </Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">Legal</p>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Roadsafe Traffic. All rights reserved.</p>
        <p>Informing the motorist.</p>
      </div>
    </footer>
  );
}
