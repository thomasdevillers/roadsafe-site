"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters: Record<string, unknown>) => void;
};

export function ContactTracking() {
  useEffect(() => {
    function trackContactClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const method = href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
          ? "email"
          : href.includes("wa.me/")
            ? "whatsapp"
            : undefined;

      if (!method) return;

      (window as AnalyticsWindow).gtag?.("event", "contact_click", {
        contact_method: method,
        page_path: window.location.pathname
      });
    }

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  return null;
}
