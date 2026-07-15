"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { contact } from "@/lib/site-data";

export function FloatingActions() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/request-a-quote") ||
    pathname.startsWith("/quote-confirmation") ||
    pathname.startsWith("/contact")
  ) {
    return null;
  }

  return (
    <div className="floating-actions" aria-label="Quick contact">
      <a href={contact.phoneHref} aria-label={`Call Roadsafe Traffic on ${contact.phoneDisplay}`}>
        <Phone aria-hidden="true" />
      </a>
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Roadsafe Traffic on WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
      </a>
    </div>
  );
}
