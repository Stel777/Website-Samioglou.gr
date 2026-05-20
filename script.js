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

  /* ── Business hours pill (Athens time, Mon-Fri 09:00-18:00) ── */
  function initBusinessStatus() {
    const status = $('[data-business-status]');
    if (!status) return;

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Athens',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const update = () => {
      const parts = formatter.formatToParts(new Date());
      const weekday = parts.find((p) => p.type === 'weekday')?.value;
      const hour = Number(parts.find((p) => p.type === 'hour')?.value || 0);
      const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0);
      const minutes = (hour % 24) * 60 + minute;
      const isWeekday = !['Sat', 'Sun'].includes(weekday);
      const isOpen = isWeekday && minutes >= 9 * 60 && minutes < 18 * 60;

      status.dataset.state = isOpen ? 'open' : 'closed';
      status.textContent = isOpen ? 'Ανοιχτά τώρα' : 'Κλειστά τώρα';
      status.setAttribute(
        'aria-label',
        `${status.textContent}. Ωράριο Δευτέρα έως Παρασκευή, 09:00 έως 18:00, ώρα Αθήνας.`
      );
      status.title = 'Ωράριο: Δευτέρα έως Παρασκευή, 09:00-18:00 (ώρα Αθήνας)';
    };

    update();
    window.setInterval(update, 60 * 1000);
  }

  /* ── Hero anchors: fixed-header offsets are for sections, not the hero ── */
  function initHeroAnchors() {
    $$('a[href="#top"], a[href="#quote"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        history.replaceState(null, '', `${location.pathname}${location.search}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
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
      gsap.set('.hero .eyebrow, .hero-status, .hero-lead, .hero-actions', { y: 24, autoAlpha: 0 });
      gsap.set('.hero h1 .word', { yPercent: 110, autoAlpha: 0 });
      gsap.set('.box', {
        x: (i) => [220, 150, 180, 110, 140][i] || 160,
        y: (i) => [-520, -610, -470, -560, -640][i] || -540,
        rotation: (i) => [-24, 18, -16, 28, -20][i] || 0,
        autoAlpha: 0,
        transformOrigin: '50% 100%',
      });
      gsap.set('.scroll-cue', { autoAlpha: 0, y: 10 });

      /* Hero entrance */
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero .eyebrow, .hero-status', { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.3)
        .to('.hero h1 .word', {
          yPercent: 0, autoAlpha: 1,
          duration: 0.95, stagger: 0.07, ease: 'power4.out',
        }, 0.45)
        .to('.hero-lead', { autoAlpha: 1, y: 0, duration: 0.7 }, 1.0)
        .to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.25)
        .to('.box', {
          x: 0,
          y: 0,
          rotation: (i) => [-6, 8, -3, 10, -5][i] || 0,
          autoAlpha: 1,
          duration: 1.25,
          stagger: { each: 0.1, from: 'end' },
          ease: 'bounce.out',
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
        { sel: '.popular-chip',            from: 'start', amount: 0.35 },
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
        const strength = 0.08;
        const maxShift = 5;
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const rawX = (e.clientX - r.left - r.width / 2) * strength;
          const rawY = (e.clientY - r.top - r.height / 2) * strength;
          const x = Math.max(-maxShift, Math.min(maxShift, rawX));
          const y = Math.max(-maxShift, Math.min(maxShift, rawY));
          gsap.to(btn, { x, y, duration: 0.24, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
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
      gsap.set('.hero .eyebrow, .hero-status, .hero-lead, .hero-actions, .scroll-cue', { autoAlpha: 1, y: 0 });
      gsap.set('.hero h1 .word', { yPercent: 0, autoAlpha: 1 });
      gsap.set('.box', { xPercent: 0, autoAlpha: 1 });
      gsap.set('.reveal', { opacity: 1, y: 0 });
    });
  }

  /* ── Areas: search + live answer card + popular chips + region pills ── */
  function initAreas() {
    const container = $('[data-area-regions]');
    const filter    = $('[data-area-filter]');
    const clearBtn  = $('[data-area-clear]');
    const answer    = $('[data-area-answer]');
    const browse    = $('[data-area-browse]');
    const popular   = $$('.popular-chip');
    if (!container || !filter) return;

    const ICONS = {
      info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>',
      warn:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 22h20L12 2z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    };

    function regionOf(area) {
      for (const r of AREA_REGIONS) if (r.items.includes(area)) return r.label;
      return '';
    }

    const totalAreas = AREA_REGIONS.reduce((s, r) => s + r.items.length, 0);

    /* ── Answer card ─── */
    function updateAnswer(q) {
      const nq = normalize(q);
      let state, html;

      if (!nq) {
        state = 'info';
        html = `
          <div class="answer-icon">${ICONS.info}</div>
          <div class="answer-content">
            <strong>Καλύπτουμε ${totalAreas} περιοχές στην Αττική</strong>
            <span>Πληκτρολογήστε την περιοχή σας ή διαλέξτε από τις δημοφιλείς.</span>
          </div>`;
      } else {
        const matches = (window.SAMIOGLOU_ALL_AREAS || [])
          .filter((a) => normalize(a).includes(nq));

        if (matches.length === 0) {
          state = 'warn';
          html = `
            <div class="answer-icon">${ICONS.warn}</div>
            <div class="answer-content">
              <strong>Δεν εντοπίσαμε «${escapeHtml(q)}»</strong>
              <span>Ίσως γράφεται διαφορετικά. Εξυπηρετούμε όλη την Αττική — μιλήστε μας.</span>
            </div>
            <a class="btn btn-primary" href="tel:+302108611507">Καλέστε μας</a>`;
        } else if (matches.length === 1) {
          state = 'success';
          html = `
            <div class="answer-icon">${ICONS.success}</div>
            <div class="answer-content">
              <strong>Καλύπτουμε ${escapeHtml(matches[0])}!</strong>
              <span class="answer-region">${escapeHtml(regionOf(matches[0]))}</span>
            </div>
            <a class="btn btn-primary" href="#quote">Λάβετε προσφορά</a>`;
        } else {
          state = 'success';
          html = `
            <div class="answer-icon">${ICONS.success}</div>
            <div class="answer-content">
              <strong>${matches.length} περιοχές ταιριάζουν</strong>
              <span>Όλες καλύπτονται — δείτε τις παρακάτω.</span>
            </div>
            <a class="btn btn-primary" href="#quote">Λάβετε προσφορά</a>`;
        }
      }

      answer.dataset.state = state;
      answer.innerHTML = html;

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(answer,
          { scale: 0.97, autoAlpha: 0.55 },
          { scale: 1, autoAlpha: 1, duration: 0.32, ease: 'back.out(1.4)', clearProps: 'transform' }
        );
      }
    }

    function escapeHtml(s) {
      return String(s == null ? '' : s)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
    }

    /* ── Region pills ─── */
    function renderRegions(q) {
      const nq = normalize(q);
      const frag = document.createDocumentFragment();

      AREA_REGIONS.forEach((region) => {
        const matching = region.items.filter((a) => normalize(a).includes(nq));
        if (matching.length === 0 && nq !== '') return;

        const details = document.createElement('details');
        details.className = 'area-region';
        if (nq !== '') details.open = true;

        const summary = document.createElement('summary');
        summary.innerHTML =
          `${region.label}<span class="area-region-count">${matching.length}</span>`;
        details.appendChild(summary);

        const list = document.createElement('div');
        list.className = 'area-list';
        matching.forEach((a) => {
          const span = document.createElement('span');
          if (!nq) {
            span.textContent = a;
          } else {
            const idx = normalize(a).indexOf(nq);
            span.innerHTML = idx >= 0
              ? `${escapeHtml(a.slice(0, idx))}<mark>${escapeHtml(a.slice(idx, idx + nq.length))}</mark>${escapeHtml(a.slice(idx + nq.length))}`
              : escapeHtml(a);
          }
          list.appendChild(span);
        });
        details.appendChild(list);
        frag.appendChild(details);
      });

      container.innerHTML = '';
      container.appendChild(frag);

      // GSAP stagger reveal on the new pills
      if (typeof gsap !== 'undefined') {
        const pills = container.querySelectorAll('.area-list span');
        gsap.fromTo(pills,
          { autoAlpha: 0, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: { each: 0.008, from: 'start' }, ease: 'power3.out' }
        );
      }
    }

    function update(q) {
      if (clearBtn) clearBtn.hidden = !q;
      // Auto-open the browse section when there's a search query
      if (browse && q) browse.open = true;
      updateAnswer(q);
      renderRegions(q);
    }

    filter.addEventListener('input', (e) => update(e.target.value));

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        filter.value = '';
        update('');
        filter.focus();
      });
    }

    popular.forEach((chip) => {
      chip.addEventListener('click', () => {
        const area = chip.dataset.areaPick || chip.textContent.trim();
        filter.value = area;
        update(area);
        filter.focus();
        // Reveal feedback on the chip
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(chip, { scale: 0.95 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
        }
      });
    });

    update('');
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

    // Municipalities (326): mark by GEOGRAPHIC BOUNDING BOX (Attica window).
    // Name matching kept failing on the genitive forms; this is reliable —
    // every Attica muni's first path point falls in this SVG-coord window.
    // Projection: x = (lng - 19.3) * 0.785 * 139.93 ; y = (41.8 - lat) * 139.93
    // Window: roughly lng 22.85–24.30, lat 37.40–38.45 → x 386–569 , y 462–615
    const ATTICA_BBOX = { xMin: 386, xMax: 569, yMin: 462, yMax: 615 };
    function isInAttica(feat) {
      if (!feat || !feat.d) return false;
      const m = feat.d.match(/^M\s*([-\d.]+)[,\s]+([-\d.]+)/);
      if (!m) return false;
      const x = parseFloat(m[1]);
      const y = parseFloat(m[2]);
      return x >= ATTICA_BBOX.xMin && x <= ATTICA_BBOX.xMax
          && y >= ATTICA_BBOX.yMin && y <= ATTICA_BBOX.yMax;
    }
    const munisData = {};
    (window.GREECE_MUNICIPALITIES || []).forEach((m) => {
      if (isInAttica(m)) munisData[m.id] = 1.0;
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
      title: '',
      valueLabel: 'κάλυψη',
      valueFormat: (v) => (v >= 0.85 ? 'Καλύπτεται' : '—'),
      showToggle: false,
      showLegend: false,
      autoExtent: false,
      min: 0,
      max: 1,
    });

    if (!map) return;

    /* Start wide, then camera-zoom into the covered Attica area. */
    const START_VIEWBOX = '290 340 430 370';
    const COVERAGE_VIEWBOX = '335 425 310 245';
    const parseViewBox = (value) => value.split(/\s+/).map(Number);
    const startBox = parseViewBox(START_VIEWBOX);
    const targetBox = parseViewBox(COVERAGE_VIEWBOX);

    requestAnimationFrame(() => {
      const svg = host.querySelector('svg');
      if (!svg) return;

      svg.setAttribute('viewBox', START_VIEWBOX);
      const coveredPaths = Array.from(host.querySelectorAll('path.gmap-covered'));
      if (!coveredPaths.length) return;

      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        svg.setAttribute('viewBox', COVERAGE_VIEWBOX);
        coveredPaths.forEach((path) => { path.setAttribute('fill-opacity', '1'); });
        return;
      }

      gsap.set(coveredPaths, { fillOpacity: 0 });
      ScrollTrigger.create({
        trigger: host,
        start: 'top 68%',
        once: true,
        onEnter: () => {
          const camera = { t: 0 };
          gsap.timeline()
            .to(camera, {
              t: 1,
              duration: 2.15,
              ease: 'power3.inOut',
              onUpdate: () => {
                const current = startBox.map((start, index) =>
                  start + (targetBox[index] - start) * camera.t
                );
                svg.setAttribute('viewBox', current.join(' '));
              },
            })
            .to(coveredPaths, {
              fillOpacity: 1,
              duration: 1.05,
              ease: 'power2.out',
              stagger: { each: 0.028, from: 'random' },
            }, '-=0.55');
        },
      });
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  function boot() {
    initMobileNav();
    initHeaderScroll();
    initBusinessStatus();
    initHeroAnchors();
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
