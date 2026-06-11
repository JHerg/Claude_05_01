// Eingebaute Inhalte für den Alltagshelfer — alles offline, keine API.

// ---------- Rezepte ----------
// tags: vegetarisch | schnell | klassiker | süß

export const RECIPES = [
  { name: "Spaghetti Bolognese", emoji: "🍝", zeit: 35, tags: ["klassiker"],
    zutaten: [["Spaghetti", "500 g"], ["Hackfleisch (gemischt)", "400 g"], ["Zwiebel", "1"], ["Knoblauchzehe", "1"], ["Passierte Tomaten", "500 g"], ["Tomatenmark", "2 EL"], ["Parmesan", "nach Belieben"]],
    schritte: ["Zwiebel und Knoblauch fein würfeln, in Öl glasig dünsten.", "Hack dazu, krümelig braun braten, mit Tomatenmark kurz rösten.", "Passierte Tomaten dazu, salzen, pfeffern, 15 Min. köcheln.", "Spaghetti nach Packung kochen, mit Soße und Parmesan servieren."] },
  { name: "Gemüse-Curry mit Reis", emoji: "🍛", zeit: 30, tags: ["vegetarisch"],
    zutaten: [["Reis", "300 g"], ["Gemüse nach Wahl (z. B. Brokkoli, Möhre, Paprika)", "600 g"], ["Kokosmilch", "400 ml"], ["Currypaste oder -pulver", "1–2 EL"], ["Zwiebel", "1"]],
    schritte: ["Reis kochen.", "Zwiebel anbraten, Gemüse in Stücken 5 Min. mitbraten.", "Curry einrühren, Kokosmilch angießen, 10 Min. köcheln.", "Abschmecken und mit Reis servieren."] },
  { name: "Pfannkuchen", emoji: "🥞", zeit: 25, tags: ["vegetarisch", "klassiker", "süß", "schnell"],
    zutaten: [["Mehl", "250 g"], ["Milch", "500 ml"], ["Eier", "3"], ["Zucker", "1 EL"], ["Salz", "1 Prise"], ["Butter zum Braten", "etwas"]],
    schritte: ["Alle Zutaten zu einem glatten Teig verrühren, 10 Min. quellen lassen.", "Nacheinander dünne Pfannkuchen in Butter goldgelb ausbacken.", "Mit Apfelmus, Zimtzucker oder herzhaft füllen."] },
  { name: "Ofenkartoffeln mit Quark", emoji: "🥔", zeit: 45, tags: ["vegetarisch", "klassiker"],
    zutaten: [["Kartoffeln (festkochend)", "1 kg"], ["Quark", "500 g"], ["Schnittlauch", "1 Bund"], ["Leinöl oder Olivenöl", "2 EL"], ["Salz, Pfeffer, Paprikapulver", ""]],
    schritte: ["Kartoffeln in Spalten schneiden, mit Öl und Gewürzen mischen.", "Bei 200 °C ca. 35 Min. backen, einmal wenden.", "Quark mit Schnittlauch, Salz und einem Schuss Milch cremig rühren."] },
  { name: "Hähnchen-Geschnetzeltes mit Nudeln", emoji: "🍗", zeit: 30, tags: [],
    zutaten: [["Hähnchenbrust", "500 g"], ["Bandnudeln", "400 g"], ["Champignons", "250 g"], ["Sahne", "200 ml"], ["Zwiebel", "1"], ["Gemüsebrühe", "100 ml"]],
    schritte: ["Hähnchen in Streifen scharf anbraten, herausnehmen.", "Zwiebel und Pilze anbraten, mit Brühe und Sahne ablöschen.", "Fleisch zurückgeben, 5 Min. köcheln, abschmecken.", "Mit Nudeln servieren."] },
  { name: "Tomatensuppe mit Grilled-Cheese", emoji: "🍅", zeit: 25, tags: ["vegetarisch", "schnell"],
    zutaten: [["Passierte Tomaten", "700 g"], ["Zwiebel", "1"], ["Gemüsebrühe", "300 ml"], ["Sahne", "100 ml"], ["Toastbrot", "8 Scheiben"], ["Käsescheiben", "8"], ["Butter", "etwas"]],
    schritte: ["Zwiebel dünsten, Tomaten und Brühe dazu, 10 Min. köcheln, Sahne einrühren, pürieren.", "Toast mit Käse füllen, in Butter goldbraun braten.", "Suppe mit Käse-Sandwiches servieren."] },
  { name: "Chili con Carne", emoji: "🌶️", zeit: 40, tags: ["klassiker"],
    zutaten: [["Hackfleisch", "500 g"], ["Kidneybohnen (Dose)", "2"], ["Mais (Dose)", "1"], ["Gehackte Tomaten", "800 g"], ["Zwiebel", "2"], ["Paprika", "1"], ["Chili, Kreuzkümmel", "je nach Mut"]],
    schritte: ["Zwiebeln und Paprika anbraten, Hack dazu, krümelig braten.", "Tomaten, Bohnen, Mais und Gewürze dazu.", "Mindestens 20 Min. köcheln — je länger, desto besser.", "Mit Brot, Reis oder Nachos servieren."] },
  { name: "Käsespätzle", emoji: "🧀", zeit: 30, tags: ["vegetarisch", "klassiker"],
    zutaten: [["Spätzle (frisch oder getrocknet)", "600 g"], ["Bergkäse, gerieben", "250 g"], ["Zwiebeln", "3"], ["Butter", "2 EL"], ["Schnittlauch", "etwas"]],
    schritte: ["Zwiebeln in Ringen in Butter langsam goldbraun braten.", "Spätzle kochen, abtropfen.", "Spätzle und Käse in Schichten in eine Schüssel geben, kurz ziehen lassen.", "Mit Röstzwiebeln und Schnittlauch servieren."] },
  { name: "Fischstäbchen mit Kartoffelpüree & Erbsen", emoji: "🐟", zeit: 25, tags: ["schnell", "klassiker"],
    zutaten: [["Fischstäbchen", "16"], ["Kartoffeln (mehlig)", "800 g"], ["Milch", "150 ml"], ["Butter", "2 EL"], ["TK-Erbsen", "300 g"], ["Muskat", "1 Prise"]],
    schritte: ["Kartoffeln kochen, mit Milch, Butter und Muskat stampfen.", "Fischstäbchen in der Pfanne oder im Ofen knusprig garen.", "Erbsen kurz in Salzwasser kochen."] },
  { name: "Gemüse-Lasagne", emoji: "🥬", zeit: 60, tags: ["vegetarisch"],
    zutaten: [["Lasagneplatten", "12"], ["Zucchini", "1"], ["Möhren", "2"], ["Passierte Tomaten", "700 g"], ["Béchamel (oder Sahne + Frischkäse)", "400 ml"], ["Geriebener Käse", "150 g"], ["Zwiebel", "1"]],
    schritte: ["Gemüse fein würfeln, mit Zwiebel anbraten, Tomaten dazu, 10 Min. köcheln.", "Abwechselnd Soße, Platten und Béchamel schichten, mit Käse abschließen.", "Bei 180 °C ca. 35 Min. backen."] },
  { name: "Wraps mit Hähnchen & Salat", emoji: "🌯", zeit: 20, tags: ["schnell"],
    zutaten: [["Tortilla-Wraps", "8"], ["Hähnchenbrust", "400 g"], ["Salat", "1 Kopf"], ["Tomaten", "2"], ["Mais", "1 kleine Dose"], ["Joghurt-Dressing", "150 g"]],
    schritte: ["Hähnchen würzen, braten, in Streifen schneiden.", "Alle Zutaten in Schälchen stellen — jeder rollt seinen eigenen Wrap.", "Tipp: Reste vom Vortag passen fast immer auch hinein."] },
  { name: "Kartoffelsuppe mit Würstchen", emoji: "🥣", zeit: 35, tags: ["klassiker"],
    zutaten: [["Kartoffeln", "800 g"], ["Möhren", "2"], ["Lauch", "1 Stange"], ["Gemüsebrühe", "1,2 l"], ["Wiener Würstchen", "4"], ["Majoran", "etwas"]],
    schritte: ["Gemüse würfeln, in Brühe ca. 20 Min. weich kochen.", "Grob pürieren (ein paar Stücke lassen!), abschmecken.", "Würstchen in Scheiben darin erwärmen."] },
  { name: "Pizza-Toast", emoji: "🍕", zeit: 15, tags: ["vegetarisch", "schnell"],
    zutaten: [["Toastbrot", "8 Scheiben"], ["Tomatenmark", "4 EL"], ["Geriebener Käse", "150 g"], ["Belieb. Belag (Mais, Paprika, Salami …)", ""], ["Oregano", "etwas"]],
    schritte: ["Toast mit Tomatenmark bestreichen, würzen.", "Belegen, Käse darüber.", "Bei 200 °C ca. 8 Min. überbacken, bis der Käse blubbert."] },
  { name: "Reispfanne mit Ei & Gemüse", emoji: "🍳", zeit: 20, tags: ["vegetarisch", "schnell"],
    zutaten: [["Reis (gern vom Vortag)", "400 g gekocht"], ["Eier", "3"], ["TK-Erbsen & Möhren", "300 g"], ["Sojasoße", "3 EL"], ["Frühlingszwiebeln", "2"]],
    schritte: ["Gemüse in heißem Öl anbraten, Reis dazu, kräftig rösten.", "Eier verquirlen, über den Reis geben und stocken lassen.", "Mit Sojasoße abschmecken, Frühlingszwiebeln darüber."] },
  { name: "Frikadellen mit Kartoffelsalat", emoji: "🍔", zeit: 40, tags: ["klassiker"],
    zutaten: [["Hackfleisch", "500 g"], ["Brötchen vom Vortag", "1"], ["Ei", "1"], ["Zwiebel", "1"], ["Kartoffeln (festkochend)", "1 kg"], ["Essig, Öl, Senf, Brühe", "für den Salat"], ["Gurke", "1"]],
    schritte: ["Brötchen einweichen, mit Hack, Ei, Zwiebel und Gewürzen verkneten.", "Frikadellen formen, langsam braten.", "Gekochte Kartoffelscheiben mit warmem Brühe-Dressing und Gurke mischen."] },
  { name: "Milchreis mit Zimt & Apfelmus", emoji: "🍚", zeit: 35, tags: ["vegetarisch", "süß", "klassiker"],
    zutaten: [["Milchreis", "250 g"], ["Milch", "1 l"], ["Zucker", "3 EL"], ["Vanillezucker", "1 Pck."], ["Zimt", "etwas"], ["Apfelmus", "1 Glas"]],
    schritte: ["Milch mit Zucker aufkochen, Reis einrühren.", "Bei kleinster Hitze 25–30 Min. quellen lassen, oft umrühren.", "Mit Zimtzucker und Apfelmus servieren."] },
  { name: "Couscous-Salat mit Feta", emoji: "🥗", zeit: 20, tags: ["vegetarisch", "schnell"],
    zutaten: [["Couscous", "300 g"], ["Gemüsebrühe", "400 ml"], ["Gurke", "1"], ["Tomaten", "3"], ["Feta", "200 g"], ["Zitrone & Olivenöl", "für das Dressing"], ["Minze oder Petersilie", "optional"]],
    schritte: ["Couscous mit heißer Brühe übergießen, 5 Min. quellen lassen.", "Gemüse würfeln, Feta zerbröseln, alles mischen.", "Mit Zitrone, Öl, Salz und Kräutern abschmecken."] },
  { name: "Schupfnudel-Pfanne", emoji: "🥟", zeit: 20, tags: ["vegetarisch", "schnell"],
    zutaten: [["Schupfnudeln (Kühlregal)", "800 g"], ["Sauerkraut oder Spinat", "400 g"], ["Zwiebel", "1"], ["Butter", "2 EL"], ["Schmand", "150 g"]],
    schritte: ["Schupfnudeln in Butter goldbraun braten.", "Zwiebel und Sauerkraut/Spinat dazu, heiß werden lassen.", "Mit Schmand und Pfeffer servieren."] },
];

// ---------- Brief-Vorlagen ----------

const heute = () => new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

export const LETTERS = [
  {
    id: "entschuldigung", emoji: "🏫", title: "Entschuldigung für die Schule",
    fields: [
      { id: "kind", label: "Name des Kindes", ph: "Tom Beispiel" },
      { id: "klasse", label: "Klasse", ph: "6b" },
      { id: "lehrkraft", label: "Lehrkraft", ph: "Frau Müller" },
      { id: "zeitraum", label: "Gefehlt am / von–bis", ph: "Montag, 09.06. bis Dienstag, 10.06." },
      { id: "grund", label: "Grund", ph: "einer fiebrigen Erkältung" },
    ],
    build: (v, ton) => `Entschuldigung

Sehr geehrte${v.lehrkraft.trim().startsWith("Herr") ? "r Herr" : " " + (v.lehrkraft.trim().startsWith("Frau") ? "Frau" : "")} ${v.lehrkraft.replace(/^(Frau|Herr)\s*/i, "")},

hiermit entschuldige ich das Fehlen meines Kindes ${v.kind} (Klasse ${v.klasse}) am ${v.zeitraum}. ${v.kind.split(" ")[0]} konnte wegen ${v.grund} nicht am Unterricht teilnehmen.

Versäumte Aufgaben werden selbstverständlich nachgeholt.${ton === "freundlich" ? " Vielen Dank für Ihr Verständnis!" : ""}

Mit freundlichen Grüßen
[Unterschrift]
${heute()}`,
  },
  {
    id: "kuendigung", emoji: "📄", title: "Kündigung (Vertrag / Abo)",
    fields: [
      { id: "firma", label: "Firma / Anbieter", ph: "Fitnessstudio FitMax GmbH" },
      { id: "vertrag", label: "Was wird gekündigt?", ph: "meine Mitgliedschaft" },
      { id: "nummer", label: "Vertrags-/Kundennummer", ph: "123456" },
      { id: "termin", label: "Zum Termin (oder leer lassen)", ph: "31.12.2026 — leer = nächstmöglich" },
    ],
    build: (v) => `${v.firma}

Kündigung — ${v.vertrag}, Vertragsnummer ${v.nummer || "[Vertragsnummer]"}

Sehr geehrte Damen und Herren,

hiermit kündige ich ${v.vertrag} (Vertrags-/Kundennummer: ${v.nummer || "[Nummer]"}) fristgerecht ${v.termin ? `zum ${v.termin}` : "zum nächstmöglichen Zeitpunkt"}.

Bitte bestätigen Sie mir den Erhalt dieser Kündigung sowie das Vertragsende schriftlich. Einer stillschweigenden Verlängerung widerspreche ich ausdrücklich. Eine eventuell erteilte Einzugsermächtigung erlischt mit Vertragsende.

Mit freundlichen Grüßen
[Name, Anschrift]
[Unterschrift]
${heute()}

💡 Tipp: Kündigungen am besten per Einschreiben mit Rückschein oder über das gesetzliche Kündigungsformular auf der Website des Anbieters senden — und eine Kopie aufheben.`,
  },
  {
    id: "reklamation", emoji: "📦", title: "Reklamation / Beschwerde",
    fields: [
      { id: "firma", label: "Firma", ph: "Elektro-Versand24" },
      { id: "produkt", label: "Produkt / Leistung", ph: "Kopfhörer „SoundPro X“" },
      { id: "kauf", label: "Gekauft am / Bestellnummer", ph: "02.06.2026, Bestell-Nr. 98765" },
      { id: "mangel", label: "Was ist das Problem?", ph: "die linke Seite bleibt stumm" },
      { id: "wunsch", label: "Was möchtest du?", ph: "Ersatzlieferung", select: ["Ersatzlieferung", "Reparatur", "Geld zurück"] },
    ],
    build: (v) => `${v.firma}

Reklamation — ${v.produkt} (${v.kauf})

Sehr geehrte Damen und Herren,

am ${v.kauf.split(",")[0]} habe ich bei Ihnen ${v.produkt} gekauft (${v.kauf}). Leider weist der Artikel folgenden Mangel auf: ${v.mangel}.

Ich mache hiermit meine gesetzlichen Gewährleistungsrechte geltend und bitte um ${v.wunsch} innerhalb von 14 Tagen nach Erhalt dieses Schreibens.

Sollte ich bis dahin nichts von Ihnen hören, behalte ich mir weitere Schritte vor.

Mit freundlichen Grüßen
[Name, Anschrift]
${heute()}`,
  },
  {
    id: "glueckwunsch", emoji: "🎂", title: "Glückwunsch / Dankeskarte",
    fields: [
      { id: "anlass", label: "Anlass", ph: "Geburtstag", select: ["Geburtstag", "bestandene Prüfung", "Hochzeit", "Geburt", "Danke sagen"] },
      { id: "name", label: "Für wen?", ph: "Oma Helga" },
      { id: "persoenlich", label: "Persönliche Note (optional)", ph: "deine Apfelkuchen sind die besten der Welt" },
    ],
    build: (v, ton) => {
      const intros = {
        "Geburtstag": `alles, alles Gute zu deinem Geburtstag! Wir wünschen dir Gesundheit, Glück und ein Jahr voller schöner Momente.`,
        "bestandene Prüfung": `herzlichen Glückwunsch zur bestandenen Prüfung! Wir sind mächtig stolz auf dich — das hast du dir hart erarbeitet.`,
        "Hochzeit": `von Herzen alles Gute zu eurer Hochzeit! Möge euer gemeinsamer Weg voller Liebe, Lachen und kleiner Alltagswunder sein.`,
        "Geburt": `herzlichen Glückwunsch zur Geburt eures kleinen Wunders! Wir wünschen euch ganz viel Freude, Gelassenheit und ausreichend Schlaf.`,
        "Danke sagen": `wir möchten einfach mal Danke sagen — für alles, was du für uns tust. Das ist nicht selbstverständlich, und wir wissen es sehr zu schätzen.`,
      };
      return `Liebe/r ${v.name},

${intros[v.anlass] || intros["Geburtstag"]}${v.persoenlich ? `

Und weil es gesagt werden muss: ${v.persoenlich}! ❤️` : ""}

${ton === "formell" ? "Herzliche Grüße" : "Ganz liebe Grüße und feste Umarmungen"}
[Deine Namen]`;
    },
  },
  {
    id: "einladung", emoji: "🎉", title: "Einladung (z. B. Kindergeburtstag)",
    fields: [
      { id: "kind", label: "Wer lädt ein?", ph: "Max" },
      { id: "alter", label: "Wievielter Geburtstag?", ph: "11." },
      { id: "datum", label: "Wann?", ph: "Samstag, 20.06., 14–18 Uhr" },
      { id: "ort", label: "Wo?", ph: "bei uns zu Hause, Musterweg 3" },
      { id: "motto", label: "Motto / Programm (optional)", ph: "Fußballturnier im Garten — Sportsachen mitbringen!" },
      { id: "rsvp", label: "Zusage bis / an", ph: "bis 14.06. an 0151 2345678" },
    ],
    build: (v) => `🎉 EINLADUNG 🎉

Ich werde ${v.alter ? v.alter + " " : ""}— und das muss gefeiert werden!

Lieber Gast, hiermit lade ich dich herzlich zu meinem Geburtstag ein:

📅 Wann?  ${v.datum}
📍 Wo?    ${v.ort}${v.motto ? `
🎈 Motto: ${v.motto}` : ""}

Bitte gib ${v.rsvp ? v.rsvp : "rechtzeitig"} Bescheid, ob du kommen kannst.

Ich freue mich riesig auf dich!
Dein ${v.kind}`,
  },
  {
    id: "nachbarn", emoji: "🏡", title: "Nachricht an Nachbarn",
    fields: [
      { id: "anlass", label: "Worum geht es?", ph: "Party am Samstag", select: ["Wir feiern eine Party", "Bitte um Paketannahme", "Lärm-Entschuldigung", "Danke für die Hilfe"] },
      { id: "details", label: "Details", ph: "Samstag ab 19 Uhr, wir geben uns Mühe, ab 22 Uhr leise zu sein" },
    ],
    build: (v) => {
      const bodies = {
        "Wir feiern eine Party": `wir möchten euch kurz vorwarnen: ${v.details}. Es könnte also etwas lebhafter werden als sonst — wir geben unser Bestes, dass es im Rahmen bleibt. Und wer mag: Kommt gern auf ein Getränk vorbei!`,
        "Bitte um Paketannahme": `dürften wir euch um einen kleinen Gefallen bitten? ${v.details}. Falls ein Paket für uns kommt, wäre es wunderbar, wenn ihr es annehmen könntet. Wir revanchieren uns natürlich gern!`,
        "Lärm-Entschuldigung": `wir möchten uns für den Lärm entschuldigen: ${v.details}. Wir wissen, dass das nervig war, und geben uns Mühe, dass es nicht wieder vorkommt. Danke für eure Geduld!`,
        "Danke für die Hilfe": `wir möchten einfach mal Danke sagen: ${v.details}. Es ist ein gutes Gefühl, solche Nachbarn zu haben!`,
      };
      return `Liebe Nachbarn,

${bodies[v.anlass] || v.details}

Herzliche Grüße aus ${"[Hausnummer/Etage]"}
[Eure Namen]`;
    },
  },
];

// ---------- Checklisten-Vorlagen ----------

export const CHECKLISTS = [
  {
    id: "geburtstag", emoji: "🎂", title: "Kindergeburtstag",
    groups: [
      { title: "2–3 Wochen vorher", items: ["Termin festlegen & mit Kind Gästeliste schreiben", "Einladungen basteln/verschicken (Zusage-Frist!)", "Motto & Programm überlegen (2–3 Spiele reichen)", "Ggf. Location/Ausflug buchen"] },
      { title: "1 Woche vorher", items: ["Zusagen einsammeln, Endzahl klären", "Kuchen planen, Rezept & Zutaten notieren", "Mitgebsel-Tütchen besorgen", "Deko & Kerzen kaufen", "Schlechtwetter-Plan B überlegen"] },
      { title: "1 Tag vorher", items: ["Kuchen backen", "Deko aufhängen, Tisch eindecken", "Spiele vorbereiten (Material bereitlegen)", "Handy/Kamera laden", "Snacks & Getränke kalt stellen"] },
      { title: "Am Tag selbst", items: ["Kerzen & Streichhölzer bereitlegen", "Notfall-Pflaster & Telefonnummern der Eltern griffbereit", "Fotos machen (aber nicht nur!)", "Abholzeit den Eltern bestätigen", "Durchatmen — es wird sowieso lauter als gedacht 😄"] },
    ],
  },
  {
    id: "urlaub", emoji: "✈️", title: "Urlaub vorbereiten",
    groups: [
      { title: "4 Wochen vorher", items: ["Ausweise/Pässe auf Gültigkeit prüfen (auch Kinder!)", "Auslandskrankenversicherung checken", "Ggf. Haustier-/Blumen-Betreuung organisieren", "Medikamente & Reiseapotheke prüfen"] },
      { title: "1 Woche vorher", items: ["Packliste schreiben (→ Vorlage „Packliste“)", "Wichtige Dokumente kopieren/fotografieren", "Nachbarn informieren, Briefkasten-Leerung klären", "Wettervorhersage am Ziel checken"] },
      { title: "1 Tag vorher", items: ["Koffer fertig packen & wiegen", "Handys, Powerbanks, Kopfhörer laden", "Snacks & Beschäftigung für die Fahrt einpacken", "Müll rausbringen, Kühlschrank checken"] },
      { title: "Beim Verlassen", items: ["Herd & Bügeleisen aus?", "Fenster zu, Heizung runter", "Wasser ggf. abdrehen", "Schlüssel an Betreuungsperson übergeben", "Türe abschließen — Urlaub! 🌴"] },
    ],
  },
  {
    id: "packliste", emoji: "🎒", title: "Packliste (Familie)",
    groups: [
      { title: "Dokumente & Geld", items: ["Ausweise / Reisepässe", "Krankenkassenkarten & Impfpässe", "Buchungsunterlagen / Tickets", "EC-/Kreditkarte & etwas Bargeld", "Führerschein"] },
      { title: "Kleidung (pro Person)", items: ["Unterwäsche & Socken (Tage + 2)", "T-Shirts / Oberteile", "Pullover/Jacke (auch im Sommer!)", "Lange & kurze Hosen", "Schlafanzug", "Badesachen", "Feste Schuhe + Sandalen", "Regenjacke"] },
      { title: "Hygiene & Gesundheit", items: ["Zahnbürsten & Zahnpasta", "Duschgel/Shampoo", "Sonnencreme & After-Sun", "Insektenschutz", "Reiseapotheke (Fieber, Durchfall, Pflaster, Zeckenkarte)", "Persönliche Medikamente"] },
      { title: "Kinder & Unterwegs", items: ["Kuscheltier!", "Spiele/Bücher/Hörspiele", "Trinkflaschen & Snacks", "Ladekabel & Powerbank", "Kopfhörer", "Sonnenhut/Kappe", "Schwimmflügel o. Ä."] },
    ],
  },
  {
    id: "schulstart", emoji: "📚", title: "Schulstart nach den Ferien",
    groups: [
      { title: "Material", items: ["Hefte & Blöcke nach Materialliste", "Stifte auffüllen, Patronen kaufen", "Füller/Bleistifte testen", "Mäppchen ausmisten", "Schulranzen auswaschen/checken"] },
      { title: "Organisation", items: ["Stundenplan ausdrucken/aufhängen", "Sportbeutel & Sportschuhe prüfen (passen sie noch?)", "Brotdose & Trinkflasche checken", "Schulweg/Bus-Zeiten checken", "AGs & Termine in den Familienkalender"] },
      { title: "Die Woche davor", items: ["Früher ins Bett — Rhythmus umstellen", "Gemeinsam Schreibtisch aufräumen", "Erste Schulwoche planen (wer holt ab?)", "Lieblingsfrühstück für Tag 1 einkaufen 🥐"] },
    ],
  },
  {
    id: "umzug", emoji: "📦", title: "Umzug",
    groups: [
      { title: "8 Wochen vorher", items: ["Alte Wohnung kündigen", "Umzugsunternehmen anfragen oder Transporter reservieren", "Nachsendeauftrag stellen", "Kartons & Packmaterial sammeln", "Ausmisten: 3 Stapel (behalten/verschenken/weg)"] },
      { title: "2 Wochen vorher", items: ["Helfer organisieren (+ Verpflegung planen!)", "Strom/Gas/Internet ummelden", "Versicherungen & Bank informieren", "Kartons beschriften (Raum + Inhalt)", "Erste-Tage-Kiste packen (Werkzeug, Kaffee, Klopapier!)"] },
      { title: "Umzugstag", items: ["Zählerstände ablesen & fotografieren", "Wohnungsübergabe-Protokoll machen", "Helfer einweisen, Pizza bestellen 🍕", "Kühlschrank zuletzt — und erst nach 12 h wieder anschalten"] },
      { title: "Danach", items: ["Ummelden beim Einwohnermeldeamt (Frist: 2 Wochen!)", "Kita/Schule informieren", "Neue Hausordnung lesen", "Nachbarn Hallo sagen 👋"] },
    ],
  },
  {
    id: "notfall", emoji: "🧯", title: "Notfall-Infos fürs Zuhause",
    groups: [
      { title: "Einmal ausfüllen & aufhängen", items: ["Notruf: 112 (Feuer/Rettung), 110 (Polizei) — Kinder erklären!", "Giftnotruf der Region heraussuchen & notieren", "Ärztlicher Bereitschaftsdienst: 116 117 notieren", "Adresse der Wohnung gut sichtbar notieren (für Anrufe)", "Telefonnummern: Eltern, Großeltern, Nachbarn", "Sammelpunkt bei Feueralarm vereinbaren"] },
      { title: "Regelmäßig prüfen", items: ["Rauchmelder-Test (1× im Monat Knopf drücken)", "Erste-Hilfe-Kasten auffüllen", "Taschenlampe & Ersatzbatterien", "Feuerlöscher/Löschdecke in der Küche", "Wichtige Dokumente an einem Ort"] },
    ],
  },
];

// ---------- Englisch-Vokabeln (5./6. Klasse) ----------

export const VOCAB_SETS = [
  {
    id: "tiere", emoji: "🐾", title: "Tiere / Animals",
    words: [["dog", "Hund"], ["cat", "Katze"], ["horse", "Pferd"], ["bird", "Vogel"], ["fish", "Fisch"], ["rabbit", "Kaninchen"], ["mouse", "Maus"], ["bear", "Bär"], ["lion", "Löwe"], ["monkey", "Affe"], ["snake", "Schlange"], ["spider", "Spinne"], ["sheep", "Schaf"], ["cow", "Kuh"], ["pig", "Schwein"], ["fox", "Fuchs"]],
  },
  {
    id: "schule", emoji: "🏫", title: "Schule / School",
    words: [["teacher", "Lehrer/in"], ["pupil", "Schüler/in"], ["classroom", "Klassenzimmer"], ["pencil", "Bleistift"], ["rubber", "Radiergummi"], ["scissors", "Schere"], ["timetable", "Stundenplan"], ["break", "Pause"], ["homework", "Hausaufgaben"], ["subject", "Schulfach"], ["maths", "Mathe"], ["science", "Naturwissenschaften"], ["history", "Geschichte"], ["art", "Kunst"], ["P.E.", "Sport(unterricht)"], ["library", "Bücherei"]],
  },
  {
    id: "essen", emoji: "🍎", title: "Essen / Food",
    words: [["apple", "Apfel"], ["bread", "Brot"], ["cheese", "Käse"], ["chicken", "Hähnchen"], ["potato", "Kartoffel"], ["vegetables", "Gemüse"], ["fruit", "Obst"], ["breakfast", "Frühstück"], ["lunch", "Mittagessen"], ["dinner", "Abendessen"], ["hungry", "hungrig"], ["thirsty", "durstig"], ["delicious", "lecker"], ["sweets", "Süßigkeiten"], ["juice", "Saft"], ["egg", "Ei"]],
  },
  {
    id: "zuhause", emoji: "🏠", title: "Zuhause / At home",
    words: [["kitchen", "Küche"], ["bathroom", "Badezimmer"], ["bedroom", "Schlafzimmer"], ["living room", "Wohnzimmer"], ["garden", "Garten"], ["stairs", "Treppe"], ["window", "Fenster"], ["door", "Tür"], ["table", "Tisch"], ["chair", "Stuhl"], ["cupboard", "Schrank"], ["fridge", "Kühlschrank"], ["mirror", "Spiegel"], ["carpet", "Teppich"], ["lamp", "Lampe"], ["key", "Schlüssel"]],
  },
];
