const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const areas = [
  "Νότια Προάστια", "Βόρεια Προάστια", "Ανατολικά Προάστια", "Δυτικά Προάστια", "Αθήνα Κέντρο", "Αττική",
  "Ακρόπολη", "Αγία Βαρβάρα", "Αγία Παρασκευή", "Άγιοι Ανάργυροι", "Άγιοι Απόστολοι", "Άγιος Αρτέμιος",
  "Άγιος Δημήτριος", "Άγιος Ελευθέριος", "Άγιος Ιωάννης Ρέντης", "Άγιος Στέφανος", "Αιγάλεω", "Άλιμος",
  "Αμπελόκηποι", "Αμφιάλη", "Ανάβυσσος", "Ανθούσα", "Άνοιξη", "Άνω Λιόσια", "Άνω Γλυφάδα", "Αργυρούπολη",
  "Αρτέμιδα (Λούτσα)", "Ασπρόπυργος", "Αυλώνα", "Αφίδνες", "Αχαρνές", "Βάρη", "Βάρκιζα", "Βαρνάβας",
  "Βαρυμπόμπη", "Βοτανικός", "Βούλα", "Βουλιαγμένη", "Βριλήσσια", "Βύρωνας", "Γαλάτσι", "Γέρακας",
  "Γουδί", "Γκάζι", "Γκύζη", "Γλυκά Νερά", "Γλυφάδα", "Γραμματικό", "Δάφνη", "Διόνυσος", "Δραπετσώνα",
  "Δροσιά", "Εκάλη", "Ελευσίνα", "Ελληνικό", "Ελληνορώσων", "Εξάρχεια", "Ζωγράφου", "Ζεφύρι", "Ηλιούπολη",
  "Νέο Ηράκλειο", "Θησείο", "Θρακομακεδόνες", "Ίλιον", "Ιλίσια", "Καισαριανή", "Καβούρι", "Καλαμάκι",
  "Κάλαμος", "Καλλιθέα", "Καλύβια", "Καλλίπολη", "Καλογρέζα", "Καματερό", "Καμίνια", "Κάντζα",
  "Καπανδρίτι", "Καρέας", "Καστέλλα", "Κεραμεικός", "Κερατέα", "Κερατσίνι", "Κεφαλάρι", "Κηφισιά",
  "Κινέτα", "Κόκκινος Μύλος", "Κολωνάκι", "Κολωνός", "Κορυδαλλός", "Κορωπί", "Κουβαράς", "Κουκάκι",
  "Κρυονέρι", "Κυψέλη", "Λαγονήσι", "Λαύριο", "Λυκόβρυση", "Λυκαβηττός", "Μαλακάσα", "Μάνδρα",
  "Μαραθώνας", "Μαρκόπουλο", "Μαρούσι", "Μέγαρα", "Μελίσσια", "Μενίδι", "Μεταμόρφωση", "Μεταξουργείο",
  "Μετς", "Μικρολίμανο", "Μοναστηράκι", "Μοσχάτο", "Νέα Ερυθραία", "Νέα Ελβετία", "Νέα Ιωνία",
  "Νέα Κηφισιά", "Νέα Μάκρη", "Νεάπολη Εξαρχείων", "Νέα Πεντέλη", "Νέα Πέραμος", "Νέα Σμύρνη",
  "Νέα Φιλαδέλφεια", "Νέα Χαλκηδόνα", "Νέος Κόσμος", "Νέο Φάληρο", "Νέο Ψυχικό", "Νίκαια", "Ομόνοια",
  "Παγκράτι", "Παιανία", "Παλαιό Φάληρο", "Παλαιά Φώκαια", "Παλλήνη", "Παπάγου", "Πατήσια", "Πειραιάς",
  "Πεντέλη", "Πέραμα", "Περιστέρι", "Πετράλωνα", "Πετρούπολη", "Πεύκη", "Περισσός", "Πικέρμι", "Πλάκα",
  "Πλατεία Αμερικής", "Πολυδένδρι", "Πολύγωνο", "Πόρτο Ράφτη", "Ραφήνα", "Ροδόπολη", "Σαλαμίνα",
  "Σαρωνίδα", "Σούρμενα", "Σούνιο", "Σπάτα", "Σταμάτα", "Σταθμός Λαρίσης", "Σεπόλια", "Σύνταγμα",
  "Ταύρος", "Υμηττός", "Φιλοθέη", "Φυλή", "Χαϊδάρι", "Χαλάνδρι", "Χατζηκυριάκειο", "Χολαργός",
  "Ψυρρή", "Ψυχικό", "Ωρωπός"
];

const areaList = document.querySelector("[data-area-list]");
const areaFilter = document.querySelector("[data-area-filter]");

function normalize(value) {
  return value
    .toLocaleLowerCase("el-GR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderAreas(filter = "") {
  if (!areaList) return;

  const normalizedFilter = normalize(filter);
  const visibleAreas = areas.filter((area) => normalize(area).includes(normalizedFilter));
  areaList.innerHTML = visibleAreas.map((area) => `<span>${area}</span>`).join("");
}

renderAreas();

if (areaFilter) {
  areaFilter.addEventListener("input", (event) => {
    renderAreas(event.target.value);
  });
}

const quoteForm = document.querySelector("[data-quote-form]");
const formNote = document.querySelector("[data-form-note]");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const subject = encodeURIComponent("Αίτημα προσφοράς από το νέο site");
    const body = encodeURIComponent(
      [
        `Ονοματεπώνυμο: ${formData.get("name") || ""}`,
        `Τηλέφωνο: ${formData.get("phone") || ""}`,
        `Υπηρεσία: ${formData.get("service") || ""}`,
        `Αφετηρία - προορισμός: ${formData.get("route") || ""}`
      ].join("\n")
    );

    window.location.href = `mailto:info@samioglou.gr?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Το email ετοιμάστηκε. Μπορείτε επίσης να καλέσετε στο 210 861 1507.";
    }
  });
}
