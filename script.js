/* ============================================================
   Σαμιόγλου · script.js
   Setup · Mobile nav · Header scroll · Hero entrance/exit
   Section reveals · Stagger grids · Magnetic CTAs · Parallax
   Areas (search + render) · Font picker · Quote form
   ============================================================ */

(function () {
  'use strict';

  /* ── Areas data ──────────────────────────────────────────────
     Source: samioglou_scraped_MD.md (lines 194–610 of the live-site scrape).
     165 covered areas, grouped into 7 regions, proper Greek diacritics added
     back (the live site stripped tonos marks via WordPress mis-encoding).
     ────────────────────────────────────────────────────────── */
  const AREA_REGIONS = [
    { label: 'Κέντρο Αθήνας', items: [
      'Ακρόπολη','Αμπελόκηποι','Βοτανικός','Γκάζι','Γκύζη','Εξάρχεια','Θησείο','Ιλίσια',
      'Κεραμεικός','Κολωνάκι','Κολωνός','Κουκάκι','Κυψέλη','Λυκαβηττός','Μεταξουργείο',
      'Μετς','Μοναστηράκι','Νεάπολη Εξαρχείων','Νέος Κόσμος','Ομόνοια','Παγκράτι','Πατήσια',
      'Πετράλωνα','Πλάκα','Πλατεία Αμερικής','Πολύγωνο','Σεπόλια','Σταθμός Λαρίσης','Σύνταγμα','Ψυρρή',
    ]},
    { label: 'Νότια Προάστια', items: [
      'Άγιος Δημήτριος','Άλιμος','Άνω Γλυφάδα','Αργυρούπολη','Βάρη','Βάρκιζα','Βούλα',
      'Βουλιαγμένη','Γλυφάδα','Δάφνη','Ελληνικό','Ηλιούπολη','Καβούρι','Καλαμάκι','Καλλιθέα',
      'Νέα Σμύρνη','Νέο Φάληρο','Παλαιό Φάληρο','Σαρωνίδα','Σούρμενα','Υμηττός',
    ]},
    { label: 'Βόρεια Προάστια', items: [
      'Άγιος Στέφανος','Άνοιξη','Βριλήσσια','Γαλάτσι','Διόνυσος','Δροσιά','Εκάλη','Καλογρέζα',
      'Κεφαλάρι','Κηφισιά','Λυκόβρυση','Μαρούσι','Μελίσσια','Νέα Ερυθραία','Νέα Ιωνία',
      'Νέα Κηφισιά','Νέα Πεντέλη','Νέο Ηράκλειο','Νέο Ψυχικό','Παπάγου','Πεντέλη','Περισσός',
      'Πεύκη','Σταμάτα','Φιλοθέη','Χαλάνδρι','Χολαργός','Ψυχικό',
    ]},
    { label: 'Ανατολικά Προάστια', items: [
      'Αγία Παρασκευή','Άγιοι Απόστολοι','Άγιος Αρτέμιος','Άγιος Ελευθέριος','Ανθούσα',
      'Αρτέμιδα (Λούτσα)','Βύρωνας','Γέρακας','Γλυκά Νερά','Γουδί','Ελληνορώσων','Ζωγράφου',
      'Καισαριανή','Κάντζα','Καρέας','Μαραθώνας','Νέα Ελβετία','Νέα Μάκρη','Παιανία','Παλλήνη',
      'Πικέρμι','Πόρτο Ράφτη','Ραφήνα','Σπάτα',
    ]},
    { label: 'Δυτικά Προάστια', items: [
      'Αγία Βαρβάρα','Άγιοι Ανάργυροι','Αιγάλεω','Άνω Λιόσια','Αχαρνές','Ζεφύρι','Ίλιον',
      'Καματερό','Μενίδι','Μεταμόρφωση','Νέα Φιλαδέλφεια','Νέα Χαλκηδόνα','Περιστέρι','Πετρούπολη',
      'Φυλή','Χαϊδάρι',
    ]},
    { label: 'Πειραιάς & Δυτικά Παράλια', items: [
      'Άγιος Ιωάννης Ρέντης','Αμφιάλη','Ασπρόπυργος','Δραπετσώνα','Ελευσίνα','Καλλίπολη',
      'Καμίνια','Καστέλλα','Κερατσίνι','Κινέτα','Κόκκινος Μύλος','Κορυδαλλός','Μάνδρα','Μέγαρα',
      'Μικρολίμανο','Μοσχάτο','Νέα Πέραμος','Νίκαια','Πειραιάς','Πέραμα','Σαλαμίνα','Ταύρος',
      'Χατζηκυριάκειο',
    ]},
    { label: 'Λοιπή Αττική', items: [
      'Ανάβυσσος','Αυλώνα','Αφίδνες','Βαρνάβας','Βαρυμπόμπη','Γραμματικό','Θρακομακεδόνες',
      'Κάλαμος','Καλύβια','Καπανδρίτι','Κερατέα','Κορωπί','Κουβαράς','Κρυονέρι','Λαγονήσι',
      'Λαύριο','Μαλακάσα','Μαρκόπουλο','Παλαιά Φώκαια','Πολυδένδρι','Ροδόπολη','Σούνιο','Ωρωπός',
    ]},
  ];

  /* Flat list of every covered area (for the future GreeceMap data input). */
  const ALL_COVERED_AREAS = AREA_REGIONS.reduce((acc, r) => acc.concat(r.items), []);

  /* Expose for the GreeceMap integration step. */
  if (typeof window !== 'undefined') {
    window.SAMIOGLOU_AREA_REGIONS = AREA_REGIONS;
    window.SAMIOGLOU_ALL_AREAS = ALL_COVERED_AREAS;
  }

  /* ── Utilities ────────────────────────────────────────────── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function normalize(value) {
    return (value || '')
      .toLocaleLowerCase('el-GR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /* ── Mobile nav ───────────────────────────────────────────── */
  function initMobileNav() {
    const toggle = $('[data-nav-toggle]');
    const menu = $('[data-nav-menu]');
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
    });
  }

  /* ── Header scroll state ──────────────────────────────────── */
  function initHeaderScroll() {
    const header = $('[data-header]');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Headline word split (used by hero entrance) ─────────── */
  function splitHeadline() {
    const el = document.getElementById('hero-headline');
    if (!el || el.dataset.split === '1') return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      const word = document.createElement('span');
      word.className = 'word';
      word.textContent = w;
      wrap.appendChild(word);
      el.appendChild(wrap);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.split = '1';
  }

  /* ── GSAP setup ───────────────────────────────────────────── */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    splitHeadline();

    const mm = gsap.matchMedia();

    /* ── Full motion (no reduced-motion preference) ────── */
    mm.add('(prefers-reduced-motion: no-preference)', () => {

      /* Initial states (avoid CSS/JS transform conflicts) */
      gsap.set('.hero .eyebrow, .hero-lead, .hero-actions', { y: 24, autoAlpha: 0 });
      gsap.set('.hero h1 .word', { yPercent: 110, autoAlpha: 0 });
      gsap.set('.box', {
        xPercent: 180,
        rotation: (i) => [-8, 12, -4, 16, -10][i] || 0,
        autoAlpha: 0,
      });
      gsap.set('.scroll-cue', { autoAlpha: 0, y: 10 });

      /* Hero entrance */
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero .eyebrow', { autoAlpha: 1, y: 0, duration: 0.6 }, 0.3)
        .to('.hero h1 .word', {
          yPercent: 0, autoAlpha: 1,
          duration: 0.95, stagger: 0.07, ease: 'power4.out',
        }, 0.45)
        .to('.hero-lead', { autoAlpha: 1, y: 0, duration: 0.7 }, 1.0)
        .to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.25)
        .to('.box', {
          xPercent: 0,
          rotation: (i) => [-6, 8, -3, 10, -5][i] || 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: { each: 0.12, from: 'random' },
          ease: 'back.out(1.3)',
        }, 1.0)
        .to('.scroll-cue', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.8);

      /* Hero scroll-driven exit (pin + scrub) — DESKTOP ONLY.
         Video plays its own autoplay-loop; scroll only drives the overlays.
         (Tried scrubbing video.currentTime — needs every-frame-keyframe encode,
         which AI-generated mp4s don't have, so frames drop. Not worth it.) */
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      /* Removed pin — was causing a white-space artifact on scroll-up
         (pin-spacer height mismatched the hero on transitions). The hero now
         scrolls naturally; the overlays still fade as the user scrolls through. */
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      })
        .to('.hero-copy', { y: -50, autoAlpha: 0.5, ease: 'none' }, 0)
        .to('.hero-boxes', { y: 30, autoAlpha: 0.5, ease: 'none' }, 0)
        .to('.scroll-cue', { autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero-vignette', { opacity: 1, ease: 'none' }, 0);

      /* Section reveals (.reveal elements fade-up on enter) */
      ScrollTrigger.batch('.reveal', {
        start: 'top 85%',
        onEnter: (els) => gsap.to(els, {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: 'auto',
        }),
        onEnterBack: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, overwrite: 'auto' }),
      });

      /* Stagger reveal for grid cards */
      const staggerTargets = [
        { sel: '.mosaic .tile',            from: 'start', amount: 0.6 },
        { sel: '.service-icons li',        from: 'start', amount: 0.4 },
        { sel: '.stats-strip .stat',       from: 'start', amount: 0.5 },
        { sel: '.faq-list .faq-item',      from: 'start', amount: 0.4 },
      ];

      /* Process timeline: line draws, markers pop in, content fades up */
      const timeline = document.querySelector('[data-timeline]');
      if (timeline) {
        gsap.set('.timeline-marker', { scale: 0, autoAlpha: 0 });
        gsap.set('.timeline-content', { y: 16, autoAlpha: 0 });
        gsap.set('.timeline-progress', { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: timeline, start: 'top 78%', once: true },
        });
        tl.to('.timeline-progress', {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
          })
          .to('.timeline-marker', {
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.18,
            ease: 'back.out(1.7)',
          }, '-=0.85')
          .to('.timeline-content', {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.15,
            ease: 'power2.out',
          }, '-=0.45');
      }

      /* Count-up animation for stats — triggers once on scroll-into-view */
      const nfmt = new Intl.NumberFormat('el-GR');
      $$('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        if (!isFinite(target)) return;
        el.textContent = nfmt.format(0);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => { el.textContent = nfmt.format(Math.round(counter.val)); },
        });
      });

      staggerTargets.forEach(({ sel, from, amount }) => {
        const items = $$(sel);
        if (!items.length) return;
        gsap.set(items, { y: 28, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          onEnter: (els) => gsap.to(els, {
            y: 0, autoAlpha: 1,
            duration: 0.7,
            stagger: { from, amount },
            ease: 'power3.out',
            overwrite: 'auto',
          }),
        });
      });

      /* Magnetic primary CTAs (skip the small nav CTA — it jitters in the sticky header) */
      $$('.btn-primary:not(.nav-cta)').forEach((btn) => {
        const strength = 0.28;
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * strength;
          const y = (e.clientY - r.top - r.height / 2) * strength;
          gsap.to(btn, { x, y, duration: 0.4, ease: 'power3.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });

      /* Refresh ScrollTrigger after fonts load (font swap can shift the pinned hero) */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      /* Subtle parallax on the team image (desktop only — pointless cost on mobile) */
      const whyImg = $('.why-media img');
      if (whyImg && !isMobile) {
        gsap.to(whyImg, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.why',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      /* Service tile shimmer on hover (subtle gradient sweep) */
      $$('.tile').forEach((tile) => {
        tile.addEventListener('mouseenter', () => {
          gsap.fromTo(tile, { '--shine': '-100%' }, { '--shine': '150%', duration: 0.9, ease: 'power2.out' });
        });
      });
    });

    /* ── Reduced motion: skip everything cinematic ─────── */
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero .eyebrow, .hero-lead, .hero-actions, .scroll-cue', { autoAlpha: 1, y: 0 });
      gsap.set('.hero h1 .word', { yPercent: 0, autoAlpha: 1 });
      gsap.set('.box', { xPercent: 0, autoAlpha: 1 });
      gsap.set('.reveal', { opacity: 1, y: 0 });
    });
  }

  /* ── Areas: render grouped regions + search filter ──────── */
  function initAreas() {
    const container = $('[data-area-regions]');
    const filter = $('[data-area-filter]');
    const counter = $('[data-area-count]');
    if (!container) return;

    function render(q = '') {
      const nq = normalize(q);
      container.innerHTML = '';
      let total = 0;

      AREA_REGIONS.forEach((region) => {
        const matching = region.items.filter((a) => normalize(a).includes(nq));
        if (matching.length === 0 && nq !== '') return;
        total += matching.length;

        const details = document.createElement('details');
        details.className = 'area-region';
        if (nq !== '' || region.label === 'Κέντρο Αθήνας') details.open = true;

        const summary = document.createElement('summary');
        summary.innerHTML = `${region.label}<span class="area-region-count">${matching.length}</span>`;
        details.appendChild(summary);

        const list = document.createElement('div');
        list.className = 'area-list';
        matching.forEach((a) => {
          const span = document.createElement('span');
          if (nq === '') {
            span.textContent = a;
          } else {
            // Highlight match
            const idx = normalize(a).indexOf(nq);
            if (idx >= 0) {
              span.innerHTML =
                a.slice(0, idx) +
                '<mark>' + a.slice(idx, idx + nq.length) + '</mark>' +
                a.slice(idx + nq.length);
            } else {
              span.textContent = a;
            }
          }
          list.appendChild(span);
        });
        details.appendChild(list);
        container.appendChild(details);
      });

      if (counter) {
        if (nq === '') {
          counter.textContent = `Συνολικά ${AREA_REGIONS.reduce((s, r) => s + r.items.length, 0)} περιοχές καλύπτονται.`;
        } else {
          counter.textContent = total === 0
            ? `Δεν βρέθηκε κάποια περιοχή για «${q}». Επικοινωνήστε μαζί μας — εξυπηρετούμε όλη την Αττική.`
            : `${total} ${total === 1 ? 'περιοχή ταιριάζει' : 'περιοχές ταιριάζουν'} με «${q}».`;
        }
      }
    }

    render();
    if (filter) filter.addEventListener('input', (e) => render(e.target.value));
  }

  /* ── Font picker (dev-only — show with ?dev=1) ───────────── */
  function initFontPicker() {
    const picker = $('[data-font-picker]');
    if (!picker) return;
    const isDev = new URLSearchParams(location.search).has('dev');
    if (!isDev) { picker.remove(); return; }
    const toggle = $('[data-font-toggle]');
    const panel = $('.font-picker-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const hidden = panel.hasAttribute('hidden');
      if (hidden) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', String(hidden));
    });

    const presets = $$('.font-preset');
    const current = document.body.dataset.fontPreset || 'default';
    presets.forEach((b) => {
      if (b.dataset.preset === current) b.classList.add('is-active');
      b.addEventListener('click', () => {
        document.body.dataset.fontPreset = b.dataset.preset;
        presets.forEach((p) => p.classList.toggle('is-active', p === b));
      });
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) {
        panel.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Quote form ───────────────────────────────────────────── */
  function initQuoteForm() {
    const form = $('[data-quote-form]');
    const note = $('[data-form-note]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const lines = [
        `Ονοματεπώνυμο: ${fd.get('name') || ''}`,
        `Τηλέφωνο: ${fd.get('phone') || ''}`,
        `Υπηρεσία: ${fd.get('service') || ''}`,
        `Αφετηρία: ${fd.get('from') || ''}`,
        `Προορισμός: ${fd.get('to') || ''}`,
      ];
      const subject = encodeURIComponent('Αίτημα προσφοράς από το νέο site');
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:info@samioglou.gr?subject=${subject}&body=${body}`;
      if (note) note.textContent = 'Το email ετοιμάστηκε. Μπορείτε επίσης να καλέσετε στο 210 861 1507.';
    });
  }

  /* ── Hero video sequence: drives → doors open → loops back ─ */
  function initHeroVideoSequence() {
    const v1 = document.querySelector('.hero-vid-1');
    const v2 = document.querySelector('.hero-vid-2');
    if (!v1 || !v2) return;

    // Clip 1 ended → fade in clip 2 and play it
    v1.addEventListener('ended', () => {
      v1.classList.add('is-faded');
      v2.classList.add('is-active');
      v2.currentTime = 0;
      v2.play().catch(() => {});
    });

    // Clip 2 ended → fade back to clip 1, restart
    v2.addEventListener('ended', () => {
      v2.classList.remove('is-active');
      v1.classList.remove('is-faded');
      v1.currentTime = 0;
      v1.play().catch(() => {});
    });
  }

  /* ── Coverage map (GreeceMap from frontendmaxxing) ───────── */
  function initCoverageMap() {
    if (typeof GreeceMap === 'undefined') return;
    if (typeof window.GREECE_REGIONS === 'undefined') return;
    const host = document.getElementById('coverage-map');
    if (!host) return;

    /* Build per-layer data. Feature IDs differ per layer so we can union them
       into one master object and let the component pick the right keys per mode. */

    // Regions (13): Attica primary, rest of Greece "by arrangement"
    const regionsData = {};
    (window.GREECE_REGIONS || []).forEach((r) => {
      regionsData[r.id] = r.id === 'EL30' ? 1.0 : 0.35;
    });

    // Municipalities (326): match each feature against our 165 covered areas.
    // Two strategies, applied in order:
    //   (a) Greek common-prefix on m.el (handles genitive: Κηφισιάς → Κηφισιά)
    //   (b) Latin transliteration on m.en (Glyfada / Kifisia / Kallithea / Pireas …)
    const GR2LAT = {
      'α':'a','β':'v','γ':'g','δ':'d','ε':'e','ζ':'z','η':'i','θ':'th',
      'ι':'i','κ':'k','λ':'l','μ':'m','ν':'n','ξ':'x','ο':'o','π':'p',
      'ρ':'r','σ':'s','τ':'t','υ':'y','φ':'f','χ':'ch','ψ':'ps','ω':'o','ς':'s',
    };
    function translit(s) {
      if (!s) return '';
      let out = '';
      const lower = normalize(s);
      for (let i = 0; i < lower.length; i++) {
        const c = lower[i];
        out += GR2LAT[c] || c;
      }
      return out;
    }

    const coveredArr = (window.SAMIOGLOU_ALL_AREAS || []).map(normalize);
    const coveredSet = new Set(coveredArr);
    const coveredLatin = coveredArr.map(translit);

    function prefixMatch(needle, haystack, minMatch) {
      const max = Math.min(needle.length, haystack.length);
      let k = 0;
      while (k < max && needle.charCodeAt(k) === haystack.charCodeAt(k)) k++;
      return k >= minMatch && k >= needle.length - 2;
    }

    function tryMatch(elName, enName) {
      const el = normalize(elName);
      // 1. exact Greek match
      if (el && coveredSet.has(el)) return true;
      // 2. Greek common-prefix (handles genitive endings)
      if (el.length >= 5) {
        for (let i = 0; i < coveredArr.length; i++) {
          const c = coveredArr[i];
          if (c.length < 5) continue;
          if (prefixMatch(c, el, 5)) return true;
        }
      }
      // 3. Latin common-prefix on m.en
      if (enName) {
        const en = enName.toLowerCase().replace(/[^a-z ]/g, '');
        if (en.length >= 4) {
          for (let i = 0; i < coveredLatin.length; i++) {
            const c = coveredLatin[i];
            if (c.length < 4) continue;
            if (prefixMatch(c, en, 4)) return true;
          }
        }
      }
      return false;
    }
    const munisData = {};
    (window.GREECE_MUNICIPALITIES || []).forEach((m) => {
      if (tryMatch(m.el, m.en)) munisData[m.id] = 1.0;
    });

    // Neighborhoods (Athens-central Voronoi cells, 20): all are within central Athens which is covered
    const hoodsData = {};
    (window.GREECE_NEIGHBORHOODS || []).forEach((n) => { hoodsData[n.id] = 1.0; });

    // Prefectures (74): mark Attica prefectures via name match
    const atticaTokens = ['αττικ','αθην','πειραι'];
    const prefData = {};
    (window.GREECE_PREFECTURES || []).forEach((p) => {
      const name = normalize((p.el || p.en || ''));
      if (atticaTokens.some((t) => name.includes(t))) prefData[p.id] = 1.0;
      else prefData[p.id] = 0.35;
    });

    const masterData = Object.assign({}, regionsData, prefData, munisData, hoodsData);

    // Diagnostic — open browser devtools console to verify matches landed.
    console.log('[Samioglou map]', {
      regions: Object.keys(regionsData).length,
      prefectures: Object.keys(prefData).length,
      municipalities: Object.keys(munisData).length,
      neighborhoods: Object.keys(hoodsData).length,
      totalKeys: Object.keys(masterData).length,
    });

    // Override the 'coverage' scale to drop the dark-grey low end — every value
    // we set is "covered" in some sense, so the whole gradient should read green.
    if (GreeceMap.SCALES) {
      GreeceMap.SCALES.coverage = ['#2f8f4f', '#4ade80', '#86efac'];
    }

    const map = GreeceMap.init('#coverage-map', {
      mode: 'municipalities',
      modes: ['municipalities'],   // lock to one layer — hides the toggle
      data: munisData,             // pass only muni data; cleaner
      scale: 'coverage',
      title: 'Πού εξυπηρετούμε στην Αττική',
      valueLabel: 'κάλυψη',
      valueFormat: (v) => (v >= 0.85 ? 'Καλύπτεται' : '—'),
      showToggle: false,
      showLegend: false,
      autoExtent: false,
      min: 0,
      max: 1,
    });

    if (!map) return;

    /* Zoom the SVG viewBox to Attica (component renders full-Greece by default) */
    const ATTICA_VIEWBOX = '380 470 220 130';
    requestAnimationFrame(() => {
      const svg = host.querySelector('svg');
      if (svg) svg.setAttribute('viewBox', ATTICA_VIEWBOX);
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  function boot() {
    initMobileNav();
    initHeaderScroll();
    initHeroVideoSequence();
    initAreas();
    initFontPicker();
    initQuoteForm();
    initGSAP();
    initCoverageMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
