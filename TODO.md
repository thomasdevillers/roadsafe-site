# Roadsafe Launch TODO

Complete these items before the production site replaces the current website.

## Product Catalogue

- Confirm that the approved speed-radar names are:
  - Speed Sentinel Classic
  - Speed Sentinel Compact
  - Speed Sentinel Advanced
  - Speed Sentinel Essential
  - FlashGuard Dummy Camera
- Verify every specification marked `needsConfirmation` in `lib/site-data.ts`.
- Confirm whether the Advanced, Compact, Classic and Essential models should
  share one specification document. They currently point to the same Google
  document.
- Confirm the Solar Light Tower coverage claim of up to 27,000 square feet.
- Confirm the Double Arrow Light specifications and approved product image.
- Confirm that all six Warning Lights products remain purchase-only in the
  final commercial catalogue.
- Replace low-resolution legacy product images with approved high-resolution
  photography where available.
- Add descriptive alt text when final photography is supplied.

## Resources

- Export approved specification sheets as branded, accessible PDFs.
- Store final PDFs on the Roadsafe domain and replace Google Drive/Docs URLs.
- Add document version numbers and revision dates.

## Trust Content

- Replace the four homepage client-logo placeholders with approved logos.
- Add approved testimonials or case studies with names, companies and outcomes.
- Add relevant certifications, warranties and service commitments.

## Email and Vercel

- Create a Brevo account and verify `BREVO_SENDER_EMAIL` or the Roadsafe
  sending domain.
- Create a Brevo transactional API key.
- Add `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`,
  `QUOTE_TO_EMAIL`, and `NEXT_PUBLIC_SITE_URL` to the Vercel project.
- Keep `QUOTE_TO_EMAIL=nicki@roadsafe.co.za`.
- Submit test quotes from desktop and mobile and verify:
  - Roadsafe receives the full request.
  - The customer receives the confirmation email.
  - Reply-to addresses work in both directions.
  - Spam filtering does not quarantine messages.

## Legal

- Replace placeholder legal entity details in the Privacy Policy and Terms.
- Have both documents reviewed for South African law and POPIA compliance.
- Confirm the responsible-party contact and data-retention period.
- Remove `noindex` from legal-page metadata after approval if indexing is wanted.

## Contact and Operations

- Confirm the exact map pin for 113 Louisa Road, Colleen Glen, Gqeberha.
- Confirm that delivery, installation, maintenance and collection apply to every
  rental category nationwide.
- Confirm that direct phone and WhatsApp contact may be described as available
  at any time.

## Migration

- Connect the production domain to Vercel.
- Verify all legacy redirects in `next.config.ts`.
- Submit `/sitemap.xml` in Google Search Console.
- Retire or block the old WordPress author archive at `/author/admin/`.
- Run final accessibility, performance and browser testing against production.
