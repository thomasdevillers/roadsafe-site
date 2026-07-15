# Roadsafe Live-Site Index

Snapshot date: **15 July 2026**

Source: <https://www.roadsafe.co.za/>

## Coverage

| Item | Count |
|---|---:|
| Public pages | 19 |
| Public MetForm definitions | 4 |
| WordPress media items | 131 |
| Link occurrences | 97 |
| Unique link targets | 42 |
| Extracted page images | 15 |

The inventory combines the WordPress sitemap and REST API with all 19 rendered
public pages. It covers the public content model; it does not include WordPress
admin data, form submissions, analytics, search-console data, CRM behavior, or
server-side form delivery.

## Files

- `AUDIT.md`: prioritized UX, content, SEO, and conversion findings.
- `SITEMAP.md`: current inventory and proposed information architecture.
- `pages.csv` / `pages.json`: page metadata, headings, CTAs, forms, images, and copy.
- `content/*.md`: extracted visitor-visible copy for each page.
- `links.csv`: every rendered link occurrence with source, area, and target.
- `forms.csv`: form IDs, fields, prompts, endpoints, and page usage.
- `assets.csv`: WordPress media inventory and detected page usage.
- `image-usage.csv`: rendered `<img>` usage and alt text.
- `summary.json`: crawl totals and automated quality checks.
- `source/`: source WordPress API responses used to build the index.

## Important Limits

Product photography is often applied as CSS backgrounds, so
`image-usage.csv` only represents rendered `<img>` elements. The complete
media library is in `assets.csv`. External specification links were checked
and returned HTTP 200 on the snapshot date.
