# Website-Samioglou.gr

Redesign workspace for the Samioglou moving-company website.

Current live site used as source content:

- https://www.samioglou.gr/

GitHub repo:

- https://github.com/Stel777/Website-Samioglou.gr

## What Is In This Repo

- `index.html`, `styles.css`, `script.js` - first static prototype of the new responsive site.
- `assets/` - local images used by the prototype.
- `samioglou_scraped_MD.md` - main cleaned content bank for the new site.
- `content_inventory/` - full public scrape archive from the current WordPress site.
- `content_inventory/migration_audit.md` - notes separating real Samioglou content from old WordPress theme/demo content.
- `inspiration/` - Claude-ready design inspiration notes from reference moving-company sites.
- `tools/` - repeatable scraping and analysis scripts.

## Open The Prototype

Open `index.html` directly in a browser.

No build step is required for the current static prototype.

## Main Content Source

Use this file when building the final site:

- `samioglou_scraped_MD.md`

It includes the actual Samioglou content from:

- Homepage
- Contact page
- Quote page
- Φορτοταξί page
- Dedicated moving-service pages such as καναπές, ψυγείο, πλυντήριο, κρεβάτι, γραφείο, στρώμα, τραπεζαρία, ηλεκτρική κουζίνα

## Design Handoff For Claude

Give Claude these files:

- `samioglou_scraped_MD.md`
- `content_inventory/migration_audit.md`
- `inspiration/CLAUDE_DESIGN_BRIEF.md`
- `inspiration/safebound_moving_inspiration.md`
- `inspiration/sos_moving_la_inspiration.md`
- `inspiration/central_coast_moving_inspiration.md`
- `inspiration/vippro_moving_inspiration.md`

Important: use the inspiration files for layout and UX patterns only. Do not copy competitor text, claims, reviews, prices, contact details, or branding.

## Recommended Final Site Direction

- Modern Greek moving-company website.
- Mobile-first and responsive with no horizontal overflow.
- Fast quote and phone actions visible early.
- Visual service mosaic inspired by the reference sites, especially Safebound.
- Real Samioglou content and contact details only.
- Searchable/collapsible service-area section.
- Clean FAQ and final contact CTA.

## Key Business Details

- Brand: Σαμιόγλου Χάρης / Μεταφορές Μετακομίσεις
- Phone: +30 210 861 1507
- Email: info@samioglou.gr
- Address: Πυρσόγιαννης 5, 104 46, Αθήνα
- Hours shown on current site: Δευ - Παρ, 9Π.Μ. - 6Μ.Μ.

## Scraping Notes

The current site was captured from public sources only:

- Sitemap crawl
- Raw HTML snapshots
- Cleaned Markdown pages
- Public WordPress REST data
- Scrapling-rendered homepage check

Private WordPress admin data, unpublished drafts, plugin settings, form backend settings, and restricted REST menu data are not included.
