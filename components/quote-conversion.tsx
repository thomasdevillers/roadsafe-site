"use client";

import { useEffect } from "react";
import { PENDING_QUOTE_CONVERSION_KEY } from "@/lib/analytics";

type PendingConversion = {
  reference: string;
  productCount: number;
  hasRental: boolean;
  hasPurchase: boolean;
};

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters: Record<string, unknown>) => void;
};

export function QuoteConversion({ reference }: { reference?: string }) {
  useEffect(() => {
    if (!reference) return;

    let conversion: PendingConversion | undefined;
    try {
      const stored = sessionStorage.getItem(PENDING_QUOTE_CONVERSION_KEY);
      if (stored) conversion = JSON.parse(stored) as PendingConversion;
    } catch {
      return;
    }

    if (!conversion || conversion.reference !== reference) return;

    let attempts = 0;
    const sendConversion = () => {
      const analyticsWindow = window as AnalyticsWindow;
      if (!analyticsWindow.gtag) {
        attempts += 1;
        if (attempts < 10) window.setTimeout(sendConversion, 300);
        return;
      }

      analyticsWindow.gtag("event", "generate_lead", {
        currency: "ZAR",
        transaction_id: conversion.reference,
        product_count: conversion.productCount,
        includes_rental: conversion.hasRental,
        includes_purchase: conversion.hasPurchase
      });
      sessionStorage.removeItem(PENDING_QUOTE_CONVERSION_KEY);
    };

    sendConversion();
  }, [reference]);

  return null;
}
