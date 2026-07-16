import { GOOGLE_ANALYTICS_ID } from "@/lib/analytics";

export function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
      <script
        id="roadsafe-google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `
        }}
      />
    </>
  );
}
