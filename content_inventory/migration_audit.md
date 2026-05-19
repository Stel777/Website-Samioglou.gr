# Samioglou Migration Audit

This folder is now the source-of-truth capture for the current Samioglou site.
Nothing has been intentionally discarded: raw HTML, cleaned Markdown, sitemap XML,
WordPress REST data, and downloaded internal assets are all saved locally.

## Capture Summary

- Source site: https://www.samioglou.gr/
- Sitemap indexes discovered: 14
- Sitemap URLs captured: 95
- Raw HTML pages saved: 95
- Cleaned Markdown pages saved: 95
- Unique internal image/file assets found by the HTML scrape: 35
- WordPress REST records captured:
  - Posts: 11
  - Pages: 27
  - Media: 50
  - Types: captured
  - Menu items: not public through REST API; returned 401 Unauthorized

## Primary Files

- `content_inventory/samioglou_scrape.json` - full structured scrape from public sitemap pages.
- `content_inventory/sitemap_urls.txt` - every URL discovered from the sitemap.
- `content_inventory/pages/` - cleaned Markdown text for each scraped page.
- `content_inventory/raw_html/` - raw HTML snapshots for lossless reference.
- `content_inventory/downloaded_assets/` - downloaded internal image/file assets found in pages.
- `content_inventory/assets_index.json` - image/file references and local downloaded paths.
- `content_inventory/wp_rest/` - WordPress REST API captures for posts, pages, media, and types.

## Samioglou-Specific Content To Migrate

These pages contain the business-specific content that should feed the redesigned site.

| Source URL | Local Markdown | Local Raw HTML | Notes |
| --- | --- | --- | --- |
| https://www.samioglou.gr/ | `content_inventory/pages/home.md` | `content_inventory/raw_html/home.html` | Main homepage copy, navigation labels, services, FAQs, area list, CTA copy, contact details. |
| https://www.samioglou.gr/contacts/ | `content_inventory/pages/contacts.md` | `content_inventory/raw_html/contacts.html` | Contact page, address, phone, email, hours. |
| https://www.samioglou.gr/request-a-quote/ | `content_inventory/pages/request-a-quote.md` | `content_inventory/raw_html/request-a-quote.html` | Quote request page/form text. |
| https://www.samioglou.gr/φορτοταξί/ | `content_inventory/pages/cf-86-ce-bf-cf-81-cf-84-ce-bf-cf-84-ce-b1-ce-be-ce-af.md` | `content_inventory/raw_html/cf-86-ce-bf-cf-81-cf-84-ce-bf-cf-84-ce-b1-ce-be-ce-af.html` | Main φορτοταξί/microtransport content, object categories, area coverage, FAQ-style copy. |
| https://www.samioglou.gr/μεταφορά-γραφείου/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b3-cf-81-ce-b1-cf-86-ce-b5-ce-af-ce-bf-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b3-cf-81-ce-b1-cf-86-ce-b5-ce-af-ce-bf-.html` | Dedicated service landing page for office moving. |
| https://www.samioglou.gr/μεταφορά-ηλεκτρικής-κουζίνας/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b7-ce-bb-ce-b5-ce-ba-cf-84-cf-81-ce-b9-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b7-ce-bb-ce-b5-ce-ba-cf-84-cf-81-ce-b9-.html` | Dedicated service landing page for electric oven/stove moving. |
| https://www.samioglou.gr/μεταφορά-καναπέ/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-ce-b1-ce-bd-ce-b1-cf-80-ce-ad.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-ce-b1-ce-bd-ce-b1-cf-80-ce-ad.html` | Dedicated service landing page for sofa moving. |
| https://www.samioglou.gr/μεταφορά-κρεβατιού/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-cf-81-ce-b5-ce-b2-ce-b1-cf-84-ce-b9-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-cf-81-ce-b5-ce-b2-ce-b1-cf-84-ce-b9-.html` | Dedicated service landing page for bed moving. |
| https://www.samioglou.gr/μεταφορά-πλυντηρίου/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-80-ce-bb-cf-85-ce-bd-cf-84-ce-b7-cf-81-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-80-ce-bb-cf-85-ce-bd-cf-84-ce-b7-cf-81-.html` | Dedicated service landing page for washing machine moving. |
| https://www.samioglou.gr/μεταφορά-στρώματος/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-83-cf-84-cf-81-cf-8e-ce-bc-ce-b1-cf-84-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-83-cf-84-cf-81-cf-8e-ce-bc-ce-b1-cf-84-.html` | Dedicated service landing page for mattress moving. |
| https://www.samioglou.gr/μεταφορά-τραπεζαρίας/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-84-cf-81-ce-b1-cf-80-ce-b5-ce-b6-ce-b1-.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-84-cf-81-ce-b1-cf-80-ce-b5-ce-b6-ce-b1-.html` | Dedicated service landing page for dining table/furniture moving. |
| https://www.samioglou.gr/μεταφορά-ψυγείου/ | `content_inventory/pages/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-88-cf-85-ce-b3-ce-b5-ce-af-ce-bf-cf-85.md` | `content_inventory/raw_html/ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-88-cf-85-ce-b3-ce-b5-ce-af-ce-bf-cf-85.html` | Dedicated service landing page for refrigerator moving. |

## Key Business Facts Captured

- Business name/brand: Σαμιόγλου Χάρης / Μεταφορές Μετακομίσεις.
- Main phone: 2108 611 507 / +30 210 861 1507.
- Email: info@samioglou.gr.
- Address: Πυρσόγιαννης 5, 104 46, Αθήνα.
- Hours shown on site: Δευ - Παρ, 9Π.Μ. - 6Μ.Μ.
- Core services: μεταφορές, μετακομίσεις, φορτοταξί, μικρομεταφορές, συσκευασία, αποθήκευση οικοσκευών, ειδικές μεταφορές.
- Highlighted object moves: γραφείο, ηλεκτρική κουζίνα, καναπές, κρεβάτι, πλυντήριο, στρώμα, τραπεζαρία, ψυγείο.
- Coverage: Αθήνα, Αττική, πολλές επιμέρους περιοχές, και όλη η Ελλάδα κατόπιν συνεννόησης.
- Repeated positioning: προσοχή, αξιοπιστία, ταχύτητα, σεβασμός, οικονομική λύση, απαλλαγή από το άγχος της μετακόμισης.

## Likely Theme/Demo Content

The sitemap includes many pages that appear to come from the original WordPress theme/demo setup.
They are preserved in the inventory, but should not be migrated into the final site unless the business confirms otherwise.

- Generic logistics posts under `/news/` and individual English article URLs.
- `/about-us/`, `/incoterms/`, `/track-your-shipment/`, `/vacancies/`, `/our-team-list/`, `/our-team-grid/`.
- `/gallery-grid/`, `/gallery-masonry/`, `/services-icon/`, `/services-grid/`, `/home-boxed/`, `/sample-page/`.
- `/services/freight-forwarding/`, `/services/supply-chain-solutions/`, `/services/packaging-and-storage/`.
- Demo testimonials: Jonathan Adams, Anna Briggs, Steve McDonald.
- Demo staff profiles and careers archive entries.
- Category/tag archive pages for generic freight/logistics topics.

## Recommended Migration Shape

- Use the homepage as the main content spine.
- Convert φορτοταξί and the eight object-specific moving pages into service cards and SEO landing sections/pages.
- Keep contact and quote data visible globally.
- Preserve the complete area list, but make it searchable/collapsible so it does not overwhelm mobile users.
- Do not publish the generic logistics demo pages in the new information architecture.
