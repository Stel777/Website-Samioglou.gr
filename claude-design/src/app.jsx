/* Samioglou App — root component, tweaks state, font swaps, body class for floating header. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "classicTrust",
  "density": "regular",
  "heroVariant": "imageOverlay",
  "headerVariant": "sticky",
  "servicesVariant": "mosaic",
  "formVariant": "full",
  "stickyMobileCall": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS variables for theme + density on every change.
  React.useEffect(() => { applyTheme(t.theme, t.density); }, [t.theme, t.density]);

  // The floating header is position: fixed, so the body needs top padding.
  React.useEffect(() => {
    document.body.classList.toggle('hdr-floating-active', t.headerVariant === 'floating');
  }, [t.headerVariant]);

  return (
    <>
      <a href="#main" className="skip-link">Μετάβαση στο περιεχόμενο</a>
      <Header variant={t.headerVariant} />
      <main id="main">
        <Hero variant={t.heroVariant} formVariant={t.formVariant} />
        {t.heroVariant !== 'compact' && <TrustStrip />}
        <Intro />
        <Services variant={t.servicesVariant} />
        <Process />
        <Why />
        <SpecificMoves />
        <Areas />
        <FAQSection />
        <ContactCTA formVariant={t.formVariant} />
      </main>
      <Footer />
      <MobileCall enabled={t.stickyMobileCall} />

      <TweaksPanel title="Design tweaks">
        <TweakSection label="Θέμα" />
        <TweakSelect
          label="Παλέτα"
          value={t.theme}
          options={Object.entries(THEMES).map(([v, x]) => ({ value: v, label: x.label }))}
          onChange={(v) => setTweak('theme', v)} />
        <TweakRadio
          label="Πυκνότητα"
          value={t.density}
          options={[
            { value: 'compact', label: 'Πυκνό' },
            { value: 'regular', label: 'Κανονικό' },
            { value: 'comfortable', label: 'Άνετο' },
          ]}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Hero" />
        <TweakSelect
          label="Στυλ hero"
          value={t.heroVariant}
          options={[
            { value: 'imageOverlay', label: 'Full image + φόρμα' },
            { value: 'split', label: 'Split (copy + φωτό)' },
            { value: 'compact', label: 'Compact + trust strip' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)} />

        <TweakSection label="Header" />
        <TweakRadio
          label="Τύπος"
          value={t.headerVariant}
          options={[
            { value: 'sticky', label: 'Sticky' },
            { value: 'floating', label: 'Floating' },
          ]}
          onChange={(v) => setTweak('headerVariant', v)} />

        <TweakSection label="Υπηρεσίες" />
        <TweakSelect
          label="Στυλ"
          value={t.servicesVariant}
          options={[
            { value: 'mosaic', label: 'Mosaic (Safebound)' },
            { value: 'grid', label: 'Uniform grid' },
            { value: 'list', label: 'List (SEO)' },
          ]}
          onChange={(v) => setTweak('servicesVariant', v)} />

        <TweakSection label="Φόρμα προσφοράς" />
        <TweakRadio
          label="Μέγεθος"
          value={t.formVariant}
          options={[
            { value: 'full', label: 'Πλήρης' },
            { value: 'quick', label: 'Γρήγορη' },
          ]}
          onChange={(v) => setTweak('formVariant', v)} />

        <TweakSection label="Mobile" />
        <TweakToggle
          label="Sticky call button"
          value={t.stickyMobileCall}
          onChange={(v) => setTweak('stickyMobileCall', v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
