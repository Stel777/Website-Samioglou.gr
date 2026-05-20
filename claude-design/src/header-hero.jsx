/* Header + Hero variants + QuoteForm. */

/* ── Shared bits ──────────────────────────────────────────── */

function Phone({ children, className = '', as = 'a' }) {
  const props = { href: `tel:${BUSINESS.phoneTel}`, className };
  return as === 'a' ? <a {...props}>{children || BUSINESS.phoneDisplay}</a>
                    : React.createElement(as, { className }, children || BUSINESS.phoneDisplay);
}

function Button({ kind = 'primary', href, onClick, type, children, full, block, className = '', ...rest }) {
  const cls = ['btn', `btn-${kind}`, full && 'btn-full', block && 'btn-block', className].filter(Boolean).join(' ');
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>;
  return <button className={cls} type={type || 'button'} onClick={onClick} {...rest}>{children}</button>;
}

function Logo({ tone = 'dark' }) {
  // Image logo + brand wordmark; wordmark for accessibility + small-screen clarity.
  return (
    <a className={`logo logo-${tone}`} href="#top" aria-label={`${BUSINESS.brandLong} — αρχική`}>
      <img src="assets/samioglou-logo.png" alt="" width="44" height="44" />
      <span className="logo-text">
        <strong>{BUSINESS.brand}</strong>
        <em>{BUSINESS.tagline}</em>
      </span>
    </a>
  );
}

/* ── QuoteForm ────────────────────────────────────────────── */

function QuoteForm({ variant = 'full', tone = 'light', id = 'quote' }) {
  // 'full': all fields. 'quick': name + phone + service only + a phone-first CTA.
  const [sent, setSent] = React.useState(false);
  const formRef = React.useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    const lines = [
      `Ονοματεπώνυμο: ${fd.get('name') || ''}`,
      `Τηλέφωνο: ${fd.get('phone') || ''}`,
      `Υπηρεσία: ${fd.get('service') || ''}`,
    ];
    if (variant === 'full') {
      lines.push(`Αφετηρία → προορισμός: ${fd.get('route') || ''}`);
      lines.push(`Σημειώσεις: ${fd.get('notes') || ''}`);
    }
    const subject = encodeURIComponent('Αίτημα προσφοράς από το νέο site');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form ref={formRef} className={`quote-form quote-${variant} quote-${tone}`}
          id={id} onSubmit={onSubmit} aria-label="Φόρμα γρήγορης προσφοράς">
      <div className="quote-head">
        <p className="kicker">Γρήγορη προσφορά</p>
        <h2>{variant === 'quick' ? 'Πέστε μας το αίτημά σας.' : 'Πείτε μας τι μεταφέρετε.'}</h2>
      </div>

      <div className="quote-grid">
        <label className="field">
          <span>Ονοματεπώνυμο</span>
          <input name="name" autoComplete="name" required placeholder="π.χ. Μαρία Παπαδοπούλου" />
        </label>
        <label className="field">
          <span>Τηλέφωνο</span>
          <input name="phone" autoComplete="tel" inputMode="tel" required placeholder="210 …" />
        </label>
        <label className="field field-wide">
          <span>Υπηρεσία</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>Επιλέξτε υπηρεσία</option>
            {QUOTE_SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>

        {variant === 'full' && (
          <label className="field field-wide">
            <span>Αφετηρία → προορισμός</span>
            <input name="route" placeholder="π.χ. Κυψέλη → Γλυφάδα" />
          </label>
        )}
        {variant === 'full' && (
          <label className="field field-wide">
            <span>Σύντομη περιγραφή</span>
            <textarea name="notes" rows="3" placeholder="π.χ. 1 καναπές 3θέσιος, 4 κούτες, ψυγείο" />
          </label>
        )}
      </div>

      <div className="quote-actions">
        <Button kind="primary" type="submit" full>
          {variant === 'quick' ? 'Στείλτε το αίτημα' : 'Αποστολή αιτήματος'}
        </Button>
        {variant === 'quick' && (
          <Phone className="quote-phone-cta">
            <span aria-hidden="true">☎</span>
            <em>ή καλέστε</em>
            <strong>{BUSINESS.phoneDisplay}</strong>
          </Phone>
        )}
      </div>

      <p className="form-note">
        {sent
          ? `Έτοιμο! Άνοιξε email προς ${BUSINESS.email}. Μπορείτε να καλέσετε στο ${BUSINESS.phoneDisplay}.`
          : `Θα ανοίξει έτοιμο email προς ${BUSINESS.email}. Καμία αυτόματη αποθήκευση δεδομένων.`}
      </p>
    </form>
  );
}

/* ── Header variants ──────────────────────────────────────── */

function Header({ variant = 'sticky', onOpenQuote }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navItems = NAV.map((n) => (
    <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
  ));

  if (variant === 'floating') {
    return (
      <header className={`hdr hdr-floating ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="hdr-floating-bar">
          <Logo tone="dark" />
          <nav className="hdr-nav" aria-label="Κύρια πλοήγηση">{navItems}</nav>
          <div className="hdr-actions">
            <Phone className="hdr-phone-mini" aria-label={`Καλέστε ${BUSINESS.phoneDisplay}`}>
              <span aria-hidden="true">☎</span>
              <strong>{BUSINESS.phoneDisplay}</strong>
            </Phone>
            <Button kind="primary" href="#quote">Προσφορά</Button>
            <button className="hdr-toggle" aria-expanded={open}
                    aria-controls="hdr-mobile" onClick={() => setOpen(!open)}>
              <span /><span /><span />
              <span className="sr-only">Μενού</span>
            </button>
          </div>
        </div>
        <div className="hdr-mobile" id="hdr-mobile" data-open={open}>
          <nav aria-label="Πλοήγηση κινητού">{navItems}</nav>
          <div className="hdr-mobile-foot">
            <Phone className="hdr-mobile-phone">
              <span aria-hidden="true">☎</span>
              <strong>{BUSINESS.phoneDisplay}</strong>
              <em>{BUSINESS.hoursShort}</em>
            </Phone>
          </div>
        </div>
      </header>
    );
  }

  // sticky (default)
  return (
    <header className={`hdr hdr-sticky ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="hdr-topbar">
        <div className="hdr-topbar-inner">
          <Phone className="hdr-topbar-phone">
            <span aria-hidden="true">☎</span>
            <strong>ΚΑΛΕΣΤΕ ΤΩΡΑ:</strong> {BUSINESS.phoneDisplay}
          </Phone>
          <a className="hdr-topbar-mail" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <span className="hdr-topbar-hours">{BUSINESS.hours}</span>
        </div>
      </div>
      <div className="hdr-main">
        <div className="hdr-main-inner">
          <Logo tone="dark" />
          <nav className="hdr-nav" aria-label="Κύρια πλοήγηση">{navItems}</nav>
          <div className="hdr-actions">
            <Button kind="primary" href="#quote">Λάβετε προσφορά</Button>
            <button className="hdr-toggle" aria-expanded={open}
                    aria-controls="hdr-mobile" onClick={() => setOpen(!open)}>
              <span /><span /><span />
              <span className="sr-only">Μενού</span>
            </button>
          </div>
        </div>
        <div className="hdr-mobile" id="hdr-mobile" data-open={open}>
          <nav aria-label="Πλοήγηση κινητού">{navItems}</nav>
          <div className="hdr-mobile-foot">
            <Phone className="hdr-mobile-phone">
              <span aria-hidden="true">☎</span>
              <strong>{BUSINESS.phoneDisplay}</strong>
              <em>{BUSINESS.hoursShort}</em>
            </Phone>
            <a className="hdr-mobile-mail" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Hero variants ────────────────────────────────────────── */

function HeroProof() {
  return (
    <ul className="hero-proof" aria-label="Σημεία αξιοπιστίας">
      {HERO.proof.map((p) => <li key={p}>{p}</li>)}
    </ul>
  );
}

function HeroCopy({ compact }) {
  return (
    <div className={`hero-copy ${compact ? 'is-compact' : ''}`}>
      <p className="eyebrow eyebrow-gold">{HERO.eyebrow}</p>
      <h1>{HERO.title}</h1>
      <p className="lead">{HERO.lead}</p>
      <div className="hero-cta">
        <Button kind="primary" href="#quote">{HERO.ctaPrimary}</Button>
        <Button kind="ghost-light" href={`tel:${BUSINESS.phoneTel}`}>
          <span aria-hidden="true">☎</span> {HERO.ctaSecondary} · {BUSINESS.phoneDisplay}
        </Button>
      </div>
      <HeroProof />
    </div>
  );
}

function Hero({ variant = 'imageOverlay', formVariant = 'full' }) {
  if (variant === 'split') {
    return (
      <section className="hero hero-split" id="top" aria-labelledby="hero-title">
        <div className="hero-split-grid">
          <div className="hero-split-copy">
            <p className="eyebrow">{HERO.eyebrow}</p>
            <h1 id="hero-title">{HERO.title}</h1>
            <p className="lead">{HERO.lead}</p>
            <div className="hero-cta">
              <Button kind="primary" href="#quote">{HERO.ctaPrimary}</Button>
              <Button kind="ghost" href={`tel:${BUSINESS.phoneTel}`}>
                <span aria-hidden="true">☎</span> {BUSINESS.phoneDisplay}
              </Button>
            </div>
            <HeroProof />
          </div>
          <div className="hero-split-media" role="img" aria-label="Ομάδα Σαμιόγλου σε μεταφορά">
            <img src="assets/moving-hero.jpg" alt="" loading="eager" />
            <div className="hero-split-badge">
              <strong>{BUSINESS.brandLong}</strong>
              <em>Από το 2012 στην Αθήνα</em>
            </div>
          </div>
        </div>
        <div className="hero-split-form">
          <QuoteForm variant={formVariant} tone="light" />
        </div>
      </section>
    );
  }

  if (variant === 'compact') {
    return (
      <section className="hero hero-compact" id="top" aria-labelledby="hero-title">
        <div className="hero-compact-media" aria-hidden="true">
          <img src="assets/moving-hero.jpg" alt="" />
        </div>
        <div className="hero-compact-overlay" aria-hidden="true" />
        <div className="hero-compact-inner">
          <p className="eyebrow eyebrow-gold">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="hero-compact-title">{HERO.title}</h1>
          <p className="lead">{HERO.lead}</p>
          <div className="hero-cta">
            <Button kind="primary" href="#quote">{HERO.ctaPrimary}</Button>
            <Button kind="ghost-light" href={`tel:${BUSINESS.phoneTel}`}>
              <span aria-hidden="true">☎</span> {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
        <div className="hero-compact-trust">
          {TRUST_VALUES.slice(0, 6).map((v) => (
            <div key={v.k} className="hero-compact-trust-item">
              <strong>{v.k}</strong>
              <span>{v.d}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // default: imageOverlay
  return (
    <section className="hero hero-overlay" id="top" aria-labelledby="hero-title">
      <div className="hero-overlay-media" aria-hidden="true">
        <img src="assets/moving-hero.jpg" alt="" />
      </div>
      <div className="hero-overlay-tint" aria-hidden="true" />
      <div className="hero-overlay-inner">
        <HeroCopy />
        <div className="hero-overlay-form">
          <QuoteForm variant={formVariant} tone="light" />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Button, Phone, Logo, QuoteForm, Header, Hero });
