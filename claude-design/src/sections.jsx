/* All remaining page sections: Trust strip, Intro, Services (3 variants),
   Specific moves, Process, Why, Areas, FAQ, Final CTA, Footer. */

/* ── Trust strip (operational proof points) ───────────────── */

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Σημεία αξιοπιστίας">
      <div className="container trust-strip-inner">
        {TRUST_VALUES.map((v) =>
        <div key={v.k} className="trust-item">
            <strong>{v.k}</strong>
            <span>{v.d}</span>
          </div>
        )}
      </div>
    </section>);

}

/* ── Intro ────────────────────────────────────────────────── */

function Intro() {
  return (
    <section className="section intro" aria-labelledby="intro-title">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">{INTRO.eyebrow}</p>
          <h2 id="intro-title" className="display-h2">{INTRO.title}</h2>
        </header>
        <div className="intro-grid">
          {INTRO.paragraphs.map((p, i) =>
          <div key={i} className="intro-card">
              <p>{p}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ── Services (3 variants) ────────────────────────────────── */

function ServiceTile({ s, sizeOverride }) {
  return (
    <a className={`tile tile-${sizeOverride || s.size}`} href="#quote"
    style={{ '--tile-image': `url("${s.image}")` }}>
      <span className="tile-shade" aria-hidden="true" />
      <span className="tile-body">
        <span className="tile-label">
          {s.label.split('\n').map((line, i) =>
          <React.Fragment key={i}>{line}{i === 0 ? <br /> : null}</React.Fragment>
          )}
        </span>
        <span className="tile-desc">{s.desc}</span>
        <span className="tile-cta">Πάρτε προσφορά →</span>
      </span>
    </a>);

}

function Services({ variant = 'mosaic' }) {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Υπηρεσίες</p>
            <h2 id="services-title" className="display-h2">Επιλέξτε τον τύπο μεταφοράς που χρειάζεστε.</h2>
          </div>
          <p className="section-heading-aside">
            Από μια απλή μικρομεταφορά μέχρι μετακόμιση ολόκληρης οικίας ή γραφείου,
            έχουμε την εμπειρία, τον στόλο και τις ειδικές συσκευασίες για να τη φέρουμε εις πέρας.
          </p>
        </header>

        {variant === 'mosaic' &&
        <div className="mosaic">
            {SERVICES.map((s) => <ServiceTile key={s.id} s={s} />)}
          </div>
        }

        {variant === 'grid' &&
        <div className="srv-grid">
            {SERVICES.map((s) => <ServiceTile key={s.id} s={s} sizeOverride="normal" />)}
          </div>
        }

        {variant === 'list' &&
        <div className="srv-list">
            {SERVICES.map((s, i) =>
          <a key={s.id} className="srv-list-row" href="#quote">
                <span className="srv-list-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="srv-list-thumb" style={{ backgroundImage: `url("${s.image}")` }} />
                <div className="srv-list-body">
                  <strong>{s.label.replace(/\n/g, ' ')}</strong>
                  <span>{s.desc}</span>
                </div>
                <span className="srv-list-cta" aria-hidden="true">→</span>
              </a>
          )}
          </div>
        }
      </div>
    </section>);

}

/* ── Specific moves (the 8 SEO pages) ─────────────────────── */

function SpecificMoves() {
  return (
    <section className="section specifics" id="specifics" aria-labelledby="specifics-title">
      <div className="container">
        <header className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Συγκεκριμένες μεταφορές</p>
            <h2 id="specifics-title" className="display-h2">Ένα αντικείμενο; Καμία ανησυχία.</h2>
          </div>
          <p className="section-heading-aside">
            Φορτοταξί και μικρομεταφορές για κούτες, καναπέδες, κρεβάτια, γραφεία, ψυγεία,
            πλυντήρια και ηλεκτρικές κουζίνες — γρήγορα, οικονομικά, με ασφάλεια.
          </p>
        </header>
        <div className="specifics-grid">
          {SPECIFIC_MOVES.map((m) =>
          <a key={m.id} className="specific-card" href="#quote">
              <div className="specific-card-head">
                <span className="specific-dot" aria-hidden="true" />
                <strong>{m.title}</strong>
              </div>
              <p>{m.desc}</p>
              <span className="specific-card-cta">Δείτε λεπτομέρειες →</span>
            </a>
          )}
        </div>
      </div>
    </section>);

}

/* ── Process ──────────────────────────────────────────────── */

function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Πώς δουλεύουμε</p>
          <h2 id="process-title" className="display-h2">Καθαρή διαδικασία, γρήγορη εκτίμηση, ασφαλής μεταφορά.</h2>
        </header>
        <ol className="process-steps">
          {PROCESS.map((step, i) =>
          <li key={step.n} className="process-step">
              <div className="process-num"><span>{step.n}</span></div>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
              {i < PROCESS.length - 1 && <span className="process-line" aria-hidden="true" />}
            </li>
          )}
        </ol>
      </div>
    </section>);

}

/* ── Why us ───────────────────────────────────────────────── */

function Why() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why-grid">
        <div className="why-media">
          <img src="assets/team.jpg" alt="Ομάδα Σαμιόγλου σε μετακόμιση" />
          <div className="why-media-pill">
            <strong>{BUSINESS.brandLong}</strong>
            <em>Μεταφορική εταιρεία · Αθήνα</em>
          </div>
        </div>
        <div className="why-copy">
          <p className="eyebrow">{WHY.eyebrow}</p>
          <h2 id="why-title" className="display-h2">{WHY.title}</h2>
          <ul className="why-list">
            {WHY.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="why-actions">
            <Button kind="primary" href="#quote">Λάβετε δωρεάν προσφορά</Button>
            <Button kind="ghost" href={`tel:${BUSINESS.phoneTel}`}>
              <span aria-hidden="true">☎</span> {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </section>);

}

/* ── Service areas (searchable + collapsible) ─────────────── */

function normalize(value) {
  return String(value).
  toLocaleLowerCase('el-GR').
  normalize('NFD').
  replace(/[\u0300-\u036f]/g, '');
}

function CoverageMap() {
  // Real Greece silhouette (from mapsicon, MIT) with coverage zones layered on top.
  // The country is drawn twice:
  //   1. Light tint = "rest of Greece, by arrangement"
  //   2. Filled coverage circles clipped to the country shape = actual coverage zones
  // Final overlay layer is city dots + labels (NOT clipped, so labels can sit on water).
  //
  // Approx pixel coordinates (calibrated against the 1024×1024 viewBox via probe).
  const cities = [
    // [cx, cy, name, label-anchor, label-dx, label-dy, tier]
    // tier 1 = HQ (Athens), tier 2 = secondary coverage cities
    { x: 510, y: 530, name: 'Αθήνα',        align: 'start', dx:  14, dy: 5,  tier: 1, radius: 60 },
    { x: 495, y: 175, name: 'Θεσσαλονίκη',  align: 'start', dx:  14, dy: 5,  tier: 2, radius: 40 },
    { x: 225, y: 250, name: 'Ιωάννινα',     align: 'end',   dx: -12, dy: 5,  tier: 2, radius: 32 },
    { x: 330, y: 485, name: 'Πάτρα',        align: 'end',   dx: -12, dy: 5,  tier: 2, radius: 32 },
    { x: 365, y: 605, name: 'Καλαμάτα',     align: 'end',   dx: -12, dy: 5,  tier: 2, radius: 28 },
    { x: 580, y: 960, name: 'Ηράκλειο',     align: 'start', dx:  14, dy: 5,  tier: 2, radius: 30 },
  ];

  return (
    <svg viewBox={GREECE_VIEWBOX} className="coverage-svg" role="img"
         aria-label="Χάρτης κάλυψης Σαμιόγλου — Αθήνα, Αττική και όλη η Ελλάδα">
      <defs>
        {/* Clip path = the country silhouette. Any shape inside this group only
            shows where it lies inside Greece. */}
        <clipPath id="cov-country-clip">
          <g transform={GREECE_TRANSFORM}>
            {GREECE_PATHS.map((d, i) => <path key={i} d={d} />)}
          </g>
        </clipPath>
        <radialGradient id="cov-athens" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   style={{ stopColor: 'var(--primary)', stopOpacity: .85 }} />
          <stop offset="60%"  style={{ stopColor: 'var(--primary)', stopOpacity: .55 }} />
          <stop offset="100%" style={{ stopColor: 'var(--primary)', stopOpacity: .15 }} />
        </radialGradient>
        <radialGradient id="cov-secondary" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   style={{ stopColor: 'var(--accent)', stopOpacity: .5 }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: .05 }} />
        </radialGradient>
      </defs>

      {/* Base layer: country in light tint (= "rest of Greece by arrangement") */}
      <g transform={GREECE_TRANSFORM} className="cov-country">
        {GREECE_PATHS.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* Coverage circles, clipped to the country shape so they fill only land */}
      <g clipPath="url(#cov-country-clip)">
        {/* Athens / Attica — primary coverage radius */}
        <circle cx="510" cy="530" r="95" fill="url(#cov-athens)" />
        {/* Secondary cities — softer coverage halos */}
        {cities.filter(c => c.tier === 2).map(c => (
          <circle key={'h-' + c.name} cx={c.x} cy={c.y} r={c.radius + 10}
                  fill="url(#cov-secondary)" />
        ))}
      </g>

      {/* Routes from Athens to secondary cities — dashed lines */}
      {cities.filter(c => c.tier === 2).map(c => (
        <line key={'r-' + c.name} x1="510" y1="530" x2={c.x} y2={c.y} className="cov-route" />
      ))}

      {/* City markers + labels on top, unclipped so labels can sit on water */}
      {cities.map(c => (
        <g key={c.name} className={`cov-pin cov-pin-tier-${c.tier}`}>
          {c.tier === 1 && <circle cx={c.x} cy={c.y} r="14" className="cov-pin-halo" />}
          <circle cx={c.x} cy={c.y} r={c.tier === 1 ? 8 : 5} className="cov-pin-dot" />
          <text x={c.x + c.dx} y={c.y + c.dy} textAnchor={c.align} className="cov-pin-lbl">
            {c.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Areas() {
  const [q, setQ] = React.useState('');
  const nq = normalize(q);
  // Per-region open state. Single-region match auto-opens via match-count > 0.
  const [openRegion, setOpenRegion] = React.useState(null);

  return (
    <section className="section areas" id="areas" aria-labelledby="areas-title">
      <div className="container">
        <header className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Περιοχές εξυπηρέτησης</p>
            <h2 id="areas-title" className="display-h2">Όλη η Αττική και, κατόπιν συνεννόησης, όλη η Ελλάδα.</h2>
          </div>
          <p className="section-heading-aside">
            Αναζητήστε την περιοχή σας ή ξεδιπλώστε μια ζώνη.
            Δεν εμφανίζεται η δική σας; Καλέστε μας — βρίσκουμε λύση.
          </p>
        </header>

        <div className="coverage-card">
          <div className="coverage-card-map">
            <CoverageMap />
          </div>
          <aside className="coverage-card-meta">
            <h3>Πού φτάνουμε</h3>
            <ul>
              <li>
                <span className="cov-key cov-key-primary" aria-hidden="true" />
                <div>
                  <strong>Αθήνα · έδρα</strong>
                  <span>Πυρσόγιαννης 5, 104 46 — γραφεία και στόλος.</span>
                </div>
              </li>
              <li>
                <span className="cov-key cov-key-accent" aria-hidden="true" />
                <div>
                  <strong>Αττική · πλήρης κάλυψη</strong>
                  <span>Καθημερινές μεταφορές και μικρομεταφορές σε όλα τα προάστια και το κέντρο.</span>
                </div>
              </li>
              <li>
                <span className="cov-key cov-key-muted" aria-hidden="true" />
                <div>
                  <strong>Όλη η Ελλάδα</strong>
                  <span>Ηπειρωτική και νησιωτική, κατόπιν συνεννόησης.</span>
                </div>
              </li>
            </ul>
            <div className="coverage-card-cta">
              <Button kind="primary" href="#quote">Προσφορά για την περιοχή σας</Button>
              <a className="coverage-card-phone" href={`tel:${BUSINESS.phoneTel}`}>
                <span aria-hidden="true">☎</span> {BUSINESS.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>

        <div className="areas-list-block">
          <h3 className="areas-list-title">Λίστα περιοχών</h3>
          <p className="areas-list-sub">
            Πληκτρολογήστε μια περιοχή για άμεσο φιλτράρισμα, ή ανοίξτε μια ζώνη.
          </p>

          <div className="areas-search">
            <label className="field field-search">
              <span className="sr-only">Αναζήτηση περιοχής</span>
              <span className="field-icon" aria-hidden="true">⌕</span>
              <input
                type="search" value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="π.χ. Χαλάνδρι, Γλυφάδα, Πειραιάς…"
                aria-label="Αναζήτηση περιοχής" />
              {q &&
              <button type="button" className="field-clear" onClick={() => setQ('')} aria-label="Καθαρισμός">×</button>
              }
            </label>
          </div>

          <div className="areas-regions">
            {AREA_REGIONS.map((r) => {
              const matches = r.items.filter((a) => normalize(a).includes(nq));
              if (nq && matches.length === 0) return null;
              const isOpen = nq ? true : openRegion === r.label;
              return (
                <details key={r.label} className="area-region" open={isOpen}
                onToggle={(e) => {
                  if (nq) return;
                  setOpenRegion(e.currentTarget.open ? r.label : null);
                }}>
                  <summary>
                    <span className="area-region-name">{r.label}</span>
                    <span className="area-region-count">{matches.length}</span>
                    <span className="area-region-chev" aria-hidden="true">▾</span>
                  </summary>
                  <div className="area-tags">
                    {matches.map((a) => <span key={a} className="area-tag">{a}</span>)}
                  </div>
                </details>);

            })}
            {nq && AREA_REGIONS.every((r) => r.items.every((a) => !normalize(a).includes(nq))) &&
            <p className="areas-empty">
                Δεν βρήκαμε «{q}» στις λίστες μας. Καλέστε <a href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a>
                {' '}— πιθανότατα την εξυπηρετούμε κατόπιν συνεννόησης.
              </p>
            }
          </div>
        </div>
      </div>
    </section>);

}

/* ── FAQ ──────────────────────────────────────────────────── */

function FAQSection() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-head">
          <p className="eyebrow">Εσείς ρωτάτε — εμείς απαντάμε</p>
          <h2 id="faq-title" className="display-h2">Πριν ζητήσετε προσφορά.</h2>
          <p className="faq-aside">
            Δεν βρήκατε την απάντηση που ψάχνατε; Στείλτε μας email στο
            {' '}<a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            {' '}ή καλέστε στο <a href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a>.
          </p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) =>
          <details key={f.q} className="faq-item" open={i === 0}>
              <summary>
                <span className="faq-q">{f.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          )}
        </div>
      </div>
    </section>);

}

/* ── Final contact CTA ────────────────────────────────────── */

function ContactCTA({ formVariant }) {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow eyebrow-on-dark">{CONTACT_COPY.eyebrow}</p>
          <h2 id="contact-title" className="display-h2 on-dark">{CONTACT_COPY.title}</h2>
          <p className="contact-body">{CONTACT_COPY.body}</p>
          <ul className="contact-list">
            <li>
              <span className="contact-list-k">Διεύθυνση</span>
              <span className="contact-list-v">{BUSINESS.address1}<br />{BUSINESS.address2}</span>
            </li>
            <li>
              <span className="contact-list-k">Τηλέφωνο</span>
              <a className="contact-list-v contact-list-link" href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li>
              <span className="contact-list-k">Email</span>
              <a className="contact-list-v contact-list-link" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <span className="contact-list-k">Ωράριο</span>
              <span className="contact-list-v">{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
        <div className="contact-form-wrap">
          <QuoteForm variant={formVariant} tone="light" id="quote-bottom" />
        </div>
      </div>
    </section>);

}

/* ── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo tone="light" />
          <p>Μεταφορική εταιρεία στην Αθήνα. Εξυπηρετούμε όλη την Αττική και, κατόπιν συνεννόησης, όλη την Ελλάδα.</p>
        </div>
        <div className="footer-col">
          <h4>Υπηρεσίες</h4>
          <ul>
            {SERVICES.map((s) =>
            <li key={s.id}><a href="#services">{s.label.replace(/\n/g, ' ')}</a></li>
            )}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Πλοήγηση</h4>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Στοιχεία επικοινωνίας</h4>
          <ul className="footer-contact">
            <li>{BUSINESS.address1}</li>
            <li>{BUSINESS.address2}</li>
            <li><a href={`tel:${BUSINESS.phoneTel}`}>Τηλ.: {BUSINESS.phoneDisplay}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
            <li>{BUSINESS.hours}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} {BUSINESS.brandLong}. Όλα τα δικαιώματα διατηρούνται.</span>
          <span>Σχεδιασμός: ανανέωση 2026 · Πρωτότυπο</span>
        </div>
      </div>
    </footer>);

}

/* ── Sticky mobile call ───────────────────────────────────── */

function MobileCall({ enabled }) {
  if (!enabled) return null;
  return (
    <div className="mobile-call" role="region" aria-label="Γρήγορες ενέργειες">
      <a className="mobile-call-btn mobile-call-phone" href={`tel:${BUSINESS.phoneTel}`}>
        <span aria-hidden="true">☎</span> Καλέστε
      </a>
      <a className="mobile-call-btn mobile-call-quote" href="#quote">
        Πάρτε προσφορά
      </a>
    </div>);

}

Object.assign(window, {
  TrustStrip, Intro, Services, SpecificMoves, Process, Why, Areas,
  FAQSection, ContactCTA, Footer, MobileCall
});