# Claude Design Brief: Samioglou Website Inspiration

Use this document as structural and visual inspiration for building a prototype for the new Samioglou moving-company website.

Do not use competitor copy, claims, testimonials, pricing, contact details, or service wording. The real Samioglou content source is `samioglou_scraped_MD.md`.

## Project Goal

Build a modern Greek moving-company website for Σαμιόγλου Χάρης using the scraped Samioglou content, while borrowing only layout/UX patterns from the inspiration sites.

The new site should feel:

- Trustworthy and practical.
- Local to Athens/Attica.
- Fast to understand on mobile.
- Conversion-focused without feeling aggressive.
- More polished than the current WordPress site.

## Primary Content Source

Use:

- `samioglou_scraped_MD.md`
- `content_inventory/migration_audit.md`

Those files contain the actual business content to migrate.

## Inspiration Sources

- VIP Pro Moving: https://vippromoving.com/
- SOS Moving LA: https://www.sosmovingla.net/
- Central Coast Moving: https://centralcoastmoving.com/
- Safebound Moving: https://www.safeboundmoving.com/

Supporting analysis:

- `inspiration/layout_signals.json`
- `inspiration/inspiration_layout_audit.md`
- Per-site notes in this folder.

## Core Layout Recommendation

1. Top contact bar with phone, email, and hours.
2. Header with logo, services, areas, FAQ, contact, and quote CTA.
3. Hero with real moving image, direct Greek headline, phone CTA, and quote form.
4. Trust strip with simple operational proof points.
5. Visual service mosaic inspired by Safebound.
6. Company intro using Samioglou homepage copy.
7. Process section: call, estimate, pack/move, delivery.
8. Specific moves section for sofa, fridge, washing machine, bed, office, etc.
9. Service areas section with searchable/collapsible area list.
10. FAQ section using Samioglou questions and answers.
11. Final contact/quote section.
12. Footer with business details and useful links.

## Mobile Rules

- No horizontal overflow at any breakpoint.
- Collapse nav early before menu items squeeze or overlap.
- Keep phone/quote actions visible.
- Service mosaic becomes a single-column image-card stack.
- Quote form must be usable with large tap targets.
- Avoid giant unbroken area lists on mobile; use search, collapse, or segmented display.

## Visual Direction

- Base: white and light neutral sections.
- Primary: trustworthy blue.
- Accent: Samioglou red.
- Secondary: restrained yellow/gold highlights.
- Typography: modern sans-serif that handles Greek cleanly.
- Cards: image-led, 8px radius, clear hover/focus states.
- Avoid: fake counters, copied competitor phrasing, stock-heavy generic look, oversized sliders, one-note dark-blue palette.

## What To Borrow

- From Safebound: varied image service mosaic and polished card hierarchy.
- From SOS Moving LA: full-page flow and FAQ/CTA rhythm.
- From Central Coast Moving: practical quote form and local-service clarity.
- From VIP Pro Moving: trust/CTA density and mobile sticky call pattern.

## What Not To Borrow

- Competitor body text.
- Review quotes.
- Exact service names/copy.
- Pricing, claims, guarantees, or statistics.
- Phone numbers, addresses, or business details.
- Exact brand styling.

## Suggested Prototype Sections

### Header

Use Samioglou logo. Include visible call action and quote action. Mobile nav should be clean and stable.

### Hero

Use a Samioglou moving/packing image from the scraped assets. Put the quote form in the first viewport on desktop. On mobile, stack hero copy and form without overlap.

### Service Mosaic

Create a Safebound-inspired mosaic with varied card sizes on desktop:

- Μεταφορές / Μετακομίσεις
- Φορτοταξί / Μικρομεταφορές
- Συσκευασία
- Αποθήκευση οικοσκευών
- Μεταφορά γραφείου
- Μεταφορά καναπέ
- Μεταφορά ψυγείου
- Μεταφορά πλυντηρίου

On mobile, make all cards equal-width stacked tiles.

### Trust / Why Choose Us

Use real Samioglou concepts:

- Προσοχή
- Αξιοπιστία
- Ταχύτητα
- Σεβασμός
- Έμπειρο προσωπικό
- Σύγχρονος εξοπλισμός
- Ασφαλής συσκευασία

### Area Coverage

Keep Athens/Attica prominent. Include the full area list from Samioglou, but make it usable.

### FAQ

Use the actual Samioglou FAQ material. Keep answers concise in the visible UI.

## Deliverable Standard

The prototype should be a usable website screen, not a marketing mockup. It should be responsive, mobile-first, and suitable for a real moving company.

