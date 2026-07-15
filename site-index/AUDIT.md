# Conversion and UX Audit

## Executive Summary

The current site has useful product coverage, but its information architecture,
product naming, and quote journey create avoidable uncertainty. The redesign
should first make the catalogue trustworthy and navigable, then make every
product page feed a short, product-aware quote flow.

## Highest-Priority Fixes

### 1. Correct Product Routing and Naming

- The Speed Radars hub sends both **Dummy Speed Camera** and **Basic Speed
  Spy** to `/advanced-vasr/`.
- `/classic-vasr/` is titled **Classic VASR** in WordPress but displays
  **Emotional Speed Sentinel**.
- `/emotional-vasr/` displays **Dummy Speed Camera**, not an Emotional VASR.
- The Basic VASR breadcrumb/category text says **Advanced**.
- “Sentinal” and “Gaurdian” are misspelled on the speed-radar hub.
- Advanced, Basic, Classic, and Compact VASR pages link to the same Google
  specification document. Confirm whether that is intentional.
- The Lights hub labels product-detail links **Get A Quote**, even though they
  open product pages.

These errors affect buyer confidence and make analytics unreliable. Confirm a
single product catalogue with canonical names, model codes, photos, and spec
sheets before designing page templates.

### 2. Rebuild the Quote Journey

There are four form definitions:

| Form | Used on | Main fields |
|---|---|---|
| Short quote `895` | Home | Name, company, email |
| Contact `956` | Home, Contact | Name, company, email, phone, message |
| Email signup `985` | Not used | Email |
| Full quote `1030` | Get a Quote | Company, email, phone, free-text request |

The full quote form does not ask for a contact name and relies on free text for
the actual requirement. Replace it with one reusable flow that can be
pre-populated from every product page:

- Product/model and quantity
- Rent or purchase
- Project location and required date
- Contact name, company, email, and optional phone
- Optional notes

Keep the first step short. Show a clear success state, expected response time,
privacy link, and an event that can be tracked in analytics and the CRM.

### 3. Add Real Navigation

The rendered header has only the logo and **Get A Quote**. Footer labels such
as About, Equipment, Services, Team, FAQ, Privacy, and Terms are plain text,
not working links.

Add a predictable product-led navigation, category hubs, breadcrumbs, and
clickable phone/email details. Keep **Request a Quote** persistent across
desktop and mobile.

## Search and Accessibility

- All 19 pages have zero H1 elements.
- All 19 pages have no meta description.
- All 131 WordPress media items have empty alt text.
- Browser titles are generic, such as `VMS – Roadsafe`.
- The homepage “see more faqs” link points to `#` and goes nowhere.
- Several category/product pages have only 40-78 words of unique page copy.

Each page needs one descriptive H1, a specific title and meta description,
meaningful image alt text, and a logical heading outline. Product pages should
include use cases, key specifications, power/installation details, rent versus
buy availability, service coverage, and support information.

## Conversion Content

- Anonymous testimonials and unexplained `4.7`/`4.9` ratings are weak proof.
- The homepage says “Trusted by 110+ Clients” without supporting logos or case
  studies.
- Product specifications leave the site for Google Drive or Google Docs.
- Privacy Policy and Terms appear in the footer but have no public pages.
- Contact details are visible but are not clickable `tel:` or `mailto:` links.

Replace generic proof with approved client logos, named case studies, relevant
certifications, warranty/support terms, and measurable outcomes. Host branded,
versioned spec sheets on Roadsafe’s domain so downloads can be trusted and
measured.

## Recommended Page Pattern

Every product page should use the same decision-oriented structure:

1. Product name, clear photo, one-sentence purpose, and quote action
2. Best-fit use cases
3. Key benefits and technical specifications
4. Rent/purchase availability and deployment options
5. Product gallery or short demonstration
6. Related products and comparison
7. Support, maintenance, warranty, and service area
8. Product-aware quote form

## Technical Follow-Up

The site currently exposes WordPress, Elementor, ElementsKit, and MetForm, and
the server reports PHP `7.4.33`. PHP 7.4 is end-of-life and should be upgraded
or replaced as part of the rebuild plan. A separate performance pass should
measure Core Web Vitals, mobile behavior, form delivery, analytics events,
spam protection, and CRM integration; those cannot be verified from a static
public crawl alone.

## Suggested Delivery Order

1. Verify the product catalogue, names, URLs, photos, and specification files.
2. Approve the proposed sitemap and primary buyer journeys.
3. Define reusable product, category, and quote-form content models.
4. Design and build the shared navigation, homepage, product templates, and
   quote flow.
5. Migrate content, add redirects, and validate SEO/accessibility.
6. Instrument conversion events and test the complete lead-delivery path.
