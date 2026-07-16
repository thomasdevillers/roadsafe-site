export const GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
  (process.env.NODE_ENV === "production" ? "G-1JDQ1XH0VS" : "");

export const PENDING_QUOTE_CONVERSION_KEY = "roadsafe_pending_quote_conversion";
