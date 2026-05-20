/* Theme presets — each writes a set of CSS custom properties on :root.
   The visual identity of the entire site is controlled from here. */

const THEMES = {
  classicTrust: {
    label: 'Classic Trust',
    vars: {
      '--ink': '#0F1C2E',
      '--ink-2': '#2A3A4E',
      '--muted': '#5B6B7E',
      '--line': '#E4E8EF',
      '--paper': '#FFFFFF',
      '--soft': '#F5F7FA',
      '--card': '#FFFFFF',
      '--primary': '#D6402F',
      '--primary-hover': '#B5301F',
      '--primary-on': '#FFFFFF',
      '--accent': '#0E4F86',
      '--accent-hover': '#0A3558',
      '--accent-on': '#FFFFFF',
      '--gold': '#E9B23B',
      '--surface-hero-ink': '#FFFFFF',
      '--surface-hero-overlay':
        'linear-gradient(96deg, rgba(10,40,72,0.92) 0%, rgba(10,40,72,0.68) 42%, rgba(15,28,46,0.32) 100%), linear-gradient(0deg, rgba(15,28,46,0.45), transparent 38%)',
      '--radius-sm': '6px',
      '--radius': '10px',
      '--radius-lg': '16px',
      '--shadow-card': '0 1px 2px rgba(15,28,46,0.04), 0 10px 30px rgba(15,28,46,0.07)',
      '--shadow-float': '0 18px 50px rgba(15,28,46,0.16)',
      '--ring': '0 0 0 3px rgba(14,79,134,0.22)',
      '--font-display': '"Plus Jakarta Sans", "Manrope", system-ui, sans-serif',
      '--font-ui': '"Manrope", system-ui, sans-serif',
    },
  },
  premiumMoving: {
    label: 'Premium Moving',
    vars: {
      '--ink': '#0B1320',
      '--ink-2': '#1E2A3C',
      '--muted': '#6E7888',
      '--line': '#E6E2D8',
      '--paper': '#FBF7EF',
      '--soft': '#F2EBDD',
      '--card': '#FFFDF8',
      '--primary': '#B26A2C',
      '--primary-hover': '#8E5320',
      '--primary-on': '#FFFFFF',
      '--accent': '#0B1320',
      '--accent-hover': '#000000',
      '--accent-on': '#FBF7EF',
      '--gold': '#C39449',
      '--surface-hero-ink': '#FBF7EF',
      '--surface-hero-overlay':
        'linear-gradient(96deg, rgba(11,19,32,0.94) 0%, rgba(11,19,32,0.72) 46%, rgba(11,19,32,0.32) 100%), linear-gradient(0deg, rgba(11,19,32,0.4), transparent 40%)',
      '--radius-sm': '4px',
      '--radius': '6px',
      '--radius-lg': '10px',
      '--shadow-card': '0 1px 2px rgba(11,19,32,0.05), 0 18px 40px rgba(11,19,32,0.08)',
      '--shadow-float': '0 22px 60px rgba(11,19,32,0.22)',
      '--ring': '0 0 0 3px rgba(178,106,44,0.24)',
      '--font-display': '"Fraunces", "Plus Jakarta Sans", Georgia, serif',
      '--font-ui': '"Manrope", system-ui, sans-serif',
    },
  },
  localAthens: {
    label: 'Local Athens',
    vars: {
      '--ink': '#1A2238',
      '--ink-2': '#2F3A56',
      '--muted': '#6A7488',
      '--line': '#E9E3D6',
      '--paper': '#FBF6EC',
      '--soft': '#F3EDDD',
      '--card': '#FFFFFF',
      '--primary': '#2466A8',
      '--primary-hover': '#1A4E83',
      '--primary-on': '#FFFFFF',
      '--accent': '#C8442E',
      '--accent-hover': '#A23320',
      '--accent-on': '#FFFFFF',
      '--gold': '#E4A22A',
      '--surface-hero-ink': '#FBF6EC',
      '--surface-hero-overlay':
        'linear-gradient(96deg, rgba(26,34,56,0.84) 0%, rgba(36,102,168,0.56) 48%, rgba(200,68,46,0.32) 100%), linear-gradient(0deg, rgba(26,34,56,0.42), transparent 42%)',
      '--radius-sm': '8px',
      '--radius': '14px',
      '--radius-lg': '22px',
      '--shadow-card': '0 2px 4px rgba(26,34,56,0.05), 0 14px 36px rgba(26,34,56,0.09)',
      '--shadow-float': '0 22px 50px rgba(26,34,56,0.18)',
      '--ring': '0 0 0 3px rgba(36,102,168,0.24)',
      '--font-display': '"Plus Jakarta Sans", "Manrope", system-ui, sans-serif',
      '--font-ui': '"Manrope", system-ui, sans-serif',
    },
  },
};

const DENSITY_VARS = {
  compact:    { '--gap-section': 'clamp(2.6rem, 5vw, 4.2rem)', '--gap-block': '1rem',  '--type-scale': '0.94' },
  regular:    { '--gap-section': 'clamp(3.5rem, 7vw, 6rem)',   '--gap-block': '1.25rem','--type-scale': '1' },
  comfortable:{ '--gap-section': 'clamp(4.5rem, 9vw, 8rem)',   '--gap-block': '1.6rem', '--type-scale': '1.06' },
};

function applyTheme(themeId, density) {
  const t = THEMES[themeId] || THEMES.classicTrust;
  const d = DENSITY_VARS[density] || DENSITY_VARS.regular;
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  Object.entries(d).forEach(([k, v]) => root.style.setProperty(k, v));
}

Object.assign(window, { THEMES, DENSITY_VARS, applyTheme });
