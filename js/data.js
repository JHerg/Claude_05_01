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
  { name: "One-Pot-Nudeln Tomate-Mozzarella", emoji: "🍲", zeit: 20, tags: ["vegetarisch", "schnell"],
    zutaten: [["Nudeln (kurze Sorte)", "500 g"], ["Gehackte Tomaten", "800 g"], ["Gemüsebrühe", "500 ml"], ["Mozzarella", "2 Kugeln"], ["Zwiebel", "1"], ["Basilikum", "optional"]],
    schritte: ["Zwiebel anbraten, Nudeln, Tomaten und Brühe in EINEN Topf.", "10–12 Min. köcheln, oft umrühren, bis die Nudeln gar sind.", "Mozzarella in Stücken unterheben, schmelzen lassen — fertig, nur ein Topf zu spülen!"] },
  { name: "Linsensuppe", emoji: "🍛", zeit: 40, tags: ["vegetarisch", "klassiker"],
    zutaten: [["Tellerlinsen", "300 g"], ["Kartoffeln", "300 g"], ["Möhren", "2"], ["Lauch", "1/2 Stange"], ["Gemüsebrühe", "1,5 l"], ["Essig & Senf", "zum Abschmecken"], ["Würstchen (optional)", "4"]],
    schritte: ["Gemüse würfeln und mit den Linsen in der Brühe ca. 30 Min. kochen.", "Mit einem Schuss Essig, Senf, Salz und Pfeffer abschmecken (macht den Geschmack!).", "Wer mag: Würstchenscheiben darin erwärmen."] },
  { name: "Ofen-Hähnchenschenkel mit Gemüse", emoji: "🍗", zeit: 55, tags: ["klassiker"],
    zutaten: [["Hähnchenschenkel", "4"], ["Kartoffeln", "800 g"], ["Paprika", "2"], ["Zucchini", "1"], ["Olivenöl", "4 EL"], ["Paprikapulver, Rosmarin", ""]],
    schritte: ["Gemüse und Kartoffeln grob schneiden, mit Öl und Gewürzen aufs Blech.", "Gewürzte Schenkel obendrauf legen.", "Bei 200 °C ca. 45 Min. backen — das Fleisch würzt das Gemüse von ganz allein."] },
  { name: "Quesadillas", emoji: "🫓", zeit: 15, tags: ["vegetarisch", "schnell"],
    zutaten: [["Tortilla-Wraps", "8"], ["Geriebener Käse", "250 g"], ["Mais (Dose)", "1"], ["Paprika", "1"], ["Frühlingszwiebeln", "2"], ["Salsa oder Joghurt-Dip", "zum Tunken"]],
    schritte: ["Wraps zur Hälfte mit Käse, Mais und kleingeschnittenem Gemüse belegen, zuklappen.", "In der Pfanne ohne Fett pro Seite 2–3 Min. goldbraun braten.", "In Ecken schneiden und dippen — perfekt auch für Reste aller Art."] },
  { name: "Kürbissuppe", emoji: "🎃", zeit: 35, tags: ["vegetarisch"],
    zutaten: [["Hokkaido-Kürbis", "1 (ca. 1 kg)"], ["Kartoffeln", "2"], ["Zwiebel", "1"], ["Gemüsebrühe", "800 ml"], ["Sahne oder Kokosmilch", "150 ml"], ["Kürbiskerne", "zum Bestreuen"]],
    schritte: ["Hokkaido waschen (Schale kann dran!), würfeln, mit Zwiebel und Kartoffeln anbraten.", "Brühe angießen, 20 Min. weich kochen, fein pürieren.", "Sahne einrühren, abschmecken, mit Kernen servieren."] },
  { name: "Apfel-Crumble", emoji: "🍎", zeit: 35, tags: ["vegetarisch", "süß"],
    zutaten: [["Äpfel", "5"], ["Mehl", "150 g"], ["Butter (kalt)", "100 g"], ["Zucker", "80 g"], ["Zimt", "1 TL"], ["Haferflocken", "50 g"], ["Vanilleeis", "zum Servieren"]],
    schritte: ["Äpfel würfeln, mit Zimt in eine Auflaufform geben.", "Mehl, Butter, Zucker und Haferflocken zu Streuseln verkneten, darüber verteilen.", "Bei 180 °C ca. 25 Min. goldbraun backen — am besten lauwarm mit Eis."] },
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
  {
    id: "krankmeldung", emoji: "🤒", title: "Krankmeldung (Arbeitgeber)",
    fields: [
      { id: "firma", label: "Arbeitgeber / Ansprechperson", ph: "Personalabteilung der Muster GmbH" },
      { id: "seit", label: "Krank seit", ph: "heute, 11.06." },
      { id: "dauer", label: "Voraussichtlich bis", ph: "einschließlich Freitag, 13.06." },
      { id: "vertretung", label: "Übergabe / Vertretung (optional)", ph: "Frau Klein übernimmt meine Termine" },
    ],
    build: (v) => `Krankmeldung

Sehr geehrte Damen und Herren,

hiermit melde ich mich ab ${v.seit} arbeitsunfähig krank. Voraussichtlich werde ich ${v.dauer} ausfallen; sollte sich daran etwas ändern, informiere ich Sie umgehend.

Die ärztliche Arbeitsunfähigkeitsbescheinigung reiche ich nach bzw. sie liegt der Krankenkasse elektronisch vor.${v.vertretung ? `

Zur Übergabe: ${v.vertretung}.` : ""}

Mit freundlichen Grüßen
[Name]

💡 Tipp: Die Krankmeldung muss VOR Arbeitsbeginn beim Arbeitgeber sein — im Zweifel zusätzlich kurz anrufen.`,
  },
  {
    id: "widerruf", emoji: "↩️", title: "Widerruf (Online-Kauf)",
    fields: [
      { id: "firma", label: "Händler", ph: "Online-Shop XY GmbH" },
      { id: "produkt", label: "Artikel", ph: "Bluetooth-Lautsprecher „BoomBox“" },
      { id: "bestellung", label: "Bestellt am / Bestellnummer", ph: "05.06.2026, Bestell-Nr. 12345" },
      { id: "erhalten", label: "Erhalten am", ph: "09.06.2026" },
    ],
    build: (v) => `${v.firma}

Widerruf meiner Bestellung ${v.bestellung}

Sehr geehrte Damen und Herren,

hiermit widerrufe ich den von mir abgeschlossenen Kaufvertrag über ${v.produkt} (Bestellung: ${v.bestellung}, erhalten am ${v.erhalten}).

Bitte bestätigen Sie den Eingang dieses Widerrufs und teilen Sie mir mit, wie die Rücksendung ablaufen soll. Den Kaufpreis erstatten Sie bitte auf das ursprünglich verwendete Zahlungsmittel.

Mit freundlichen Grüßen
[Name, Anschrift]

💡 Tipp: Bei Online-Käufen gilt in der Regel ein 14-tägiges Widerrufsrecht ab Erhalt der Ware — Frist im Blick behalten und Versandbeleg aufheben.`,
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
  {
    id: "klassenfahrt", emoji: "🚌", title: "Klassenfahrt packen",
    groups: [
      { title: "Unbedingt (Eltern-Check!)", items: ["Krankenkassenkarte & Impfpass-Kopie", "Einverständniserklärungen unterschrieben", "Notfall-Telefonnummern-Zettel in den Koffer", "Taschengeld (abgezählt, in Portionen)", "Medikamente mit Anleitung für die Lehrkraft", "Lunchpaket & Trinkflasche für die Fahrt"] },
      { title: "Kleidung", items: ["Unterwäsche & Socken (Tage + 2)", "T-Shirts & Pullover", "Regenjacke (immer!)", "Feste Schuhe + Hausschuhe", "Schlafanzug", "Sportsachen, falls verlangt"] },
      { title: "Sonstiges", items: ["Kulturbeutel mit allem Drum und Dran", "Handtuch", "Kleines Spiel / Karten für den Abend", "Buch oder Hörspiel", "Müdes Kuscheltier (unten im Koffer, psst)", "Beutel für Schmutzwäsche"] },
    ],
  },
  {
    id: "camping", emoji: "⛺", title: "Camping-Wochenende",
    groups: [
      { title: "Schlafen & Wohnen", items: ["Zelt (vorher einmal probeaufbauen!)", "Heringe, Hammer, Ersatzschnur", "Isomatten / Luftmatratzen + Pumpe", "Schlafsäcke (Temperatur checken)", "Campingstühle & -tisch", "Stirnlampen + Ersatzbatterien"] },
      { title: "Küche", items: ["Gaskocher + Gaskartuschen", "Töpfe, Pfanne, Brettchen, Messer", "Geschirr & Besteck (bruchfest)", "Spülschüssel, Spülmittel, Lappen", "Kühlbox mit Akkus", "Müllbeutel", "Wasserkanister"] },
      { title: "Gut zu haben", items: ["Verlängerungsleine & Panzertape (repariert ALLES)", "Erste-Hilfe-Set & Zeckenzange", "Mückenspray & Sonnencreme", "Regenplane / Tarp", "Spiele für den Abend, Taschenmesser", "Feuchttücher (Gold wert)"] },
    ],
  },
  {
    id: "weihnachten", emoji: "🎄", title: "Entspannte Weihnachten",
    groups: [
      { title: "Bis 1. Advent", items: ["Geschenkliste schreiben (wer bekommt was?)", "Budget festlegen", "Adventskalender besorgen/befüllen", "Termine klären: Wer feiert wann wo?", "Bastel-/Wunschzettel-Nachmittag mit den Kindern"] },
      { title: "Bis 3. Advent", items: ["Geschenke kaufen oder basteln", "Geschenkpapier & Klebeband checken", "Weihnachtskarten / Grüße verschicken", "Festtagsessen planen + Einkaufsliste", "Baum bestellen oder Kauf einplanen"] },
      { title: "Letzte Woche", items: ["Geschenke einpacken (Versteck nicht vergessen!)", "Großeinkauf erledigen (nicht am 23.!)", "Baum aufstellen & schmücken", "Plätzchen backen", "Akkus & Batterien für Geschenke besorgen", "Einen Abend NICHTS planen — Punsch & Füße hoch 🎄"] },
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
  {
    id: "koerper", emoji: "💪", title: "Körper / Body",
    words: [["head", "Kopf"], ["hair", "Haare"], ["eye", "Auge"], ["ear", "Ohr"], ["nose", "Nase"], ["mouth", "Mund"], ["tooth", "Zahn"], ["shoulder", "Schulter"], ["arm", "Arm"], ["hand", "Hand"], ["finger", "Finger"], ["leg", "Bein"], ["knee", "Knie"], ["foot", "Fuß"], ["back", "Rücken"], ["tummy", "Bauch"]],
  },
  {
    id: "freizeit", emoji: "🎮", title: "Freizeit / Free time",
    words: [["to play", "spielen"], ["to read", "lesen"], ["to swim", "schwimmen"], ["to ride a bike", "Fahrrad fahren"], ["to draw", "zeichnen"], ["to sing", "singen"], ["to dance", "tanzen"], ["hobby", "Hobby"], ["football", "Fußball"], ["game", "Spiel"], ["music", "Musik"], ["movie", "Film"], ["playground", "Spielplatz"], ["holiday", "Ferien/Urlaub"], ["friend", "Freund/in"], ["fun", "Spaß"]],
  },
];

// ---------- Wissens-Quiz (für Kinder ca. 9–13) ----------
// a = Index der richtigen Antwort, info = kurze Erklärung danach.

export const QUIZ_FRAGEN = [
  { q: "Welcher Planet ist der größte in unserem Sonnensystem?", o: ["Jupiter", "Saturn", "Erde", "Mars"], a: 0, info: "In Jupiter würde die Erde über 1300-mal hineinpassen!" },
  { q: "Wie viele Herzen hat ein Oktopus?", o: ["3", "1", "2", "8"], a: 0, info: "Zwei pumpen Blut durch die Kiemen, eines durch den Körper." },
  { q: "Was ist das schnellste Landtier der Welt?", o: ["Gepard", "Löwe", "Pferd", "Strauß"], a: 0, info: "Bis zu 110 km/h — aber nur für wenige Sekunden." },
  { q: "Wie lange braucht das Licht von der Sonne zur Erde?", o: ["Etwa 8 Minuten", "1 Sekunde", "12 Stunden", "3 Tage"], a: 0, info: "Rund 150 Millionen Kilometer in 8 Minuten und 20 Sekunden." },
  { q: "Welches ist das längste Fluss der Welt (nach den meisten Messungen)?", o: ["Der Nil", "Der Rhein", "Die Donau", "Der Mississippi"], a: 0, info: "Der Nil ist etwa 6650 km lang — der Amazonas ist knapp dahinter und führt viel mehr Wasser." },
  { q: "Woraus besteht ein Regenbogen?", o: ["Sonnenlicht, das in Wassertropfen gebrochen wird", "Buntem Nebel", "Gefärbten Wolken", "Polarlicht"], a: 0, info: "Jeder Tropfen wirkt wie ein winziges Prisma und zerlegt das Licht in Farben." },
  { q: "Wie viele Knochen hat ein erwachsener Mensch ungefähr?", o: ["206", "86", "412", "1000"], a: 0, info: "Babys haben sogar über 300 — viele wachsen später zusammen." },
  { q: "Welches Tier kann seinen Kopf fast komplett herumdrehen?", o: ["Die Eule", "Die Katze", "Der Hund", "Das Pferd"], a: 0, info: "Eulen drehen den Kopf bis zu 270 Grad — ihre Augen sind nämlich unbeweglich." },
  { q: "Was ist die Hauptstadt von Frankreich?", o: ["Paris", "Lyon", "Marseille", "Brüssel"], a: 0, info: "Paris liegt an der Seine und hat über 2 Millionen Einwohner." },
  { q: "Wie nennt man ein Tier, das nur Pflanzen frisst?", o: ["Pflanzenfresser (Herbivore)", "Fleischfresser (Karnivore)", "Allesfresser (Omnivore)", "Insektenfresser"], a: 0, info: "Kühe, Pferde und Kaninchen sind typische Pflanzenfresser." },
  { q: "Welches Gas atmen wir hauptsächlich ein, um zu leben?", o: ["Sauerstoff", "Kohlendioxid", "Helium", "Wasserstoff"], a: 0, info: "Die Luft besteht aber zum größten Teil aus Stickstoff (78 %)." },
  { q: "Wie viele Minuten hat ein ganzer Tag?", o: ["1440", "960", "1200", "2400"], a: 0, info: "24 Stunden × 60 Minuten = 1440 Minuten." },
  { q: "Welcher Kontinent ist der kälteste?", o: ["Antarktis", "Europa", "Asien", "Australien"], a: 0, info: "Dort wurden schon −89 °C gemessen — kälter als jede Tiefkühltruhe." },
  { q: "Was passiert mit Wasser bei 100 °C?", o: ["Es kocht und verdampft", "Es gefriert", "Es wird schwerer", "Nichts"], a: 0, info: "Auf hohen Bergen kocht Wasser übrigens schon bei niedrigeren Temperaturen." },
  { q: "Welches Tier ist KEIN Säugetier?", o: ["Pinguin", "Delfin", "Fledermaus", "Wal"], a: 0, info: "Pinguine sind Vögel — Delfine und Wale dagegen echte Säugetiere." },
  { q: "Wie heißt der höchste Berg der Erde?", o: ["Mount Everest", "Zugspitze", "Mont Blanc", "Kilimandscharo"], a: 0, info: "8849 Meter hoch — die Zugspitze schafft nur 2962." },
  { q: "Was ist ein Vulkan?", o: ["Ein Berg, aus dem geschmolzenes Gestein kommen kann", "Ein erloschener Stern", "Ein tiefer See", "Eine Wüstenform"], a: 0, info: "Das flüssige Gestein heißt unterirdisch Magma — draußen Lava." },
  { q: "Wie viele Beine hat eine Spinne?", o: ["8", "6", "10", "12"], a: 0, info: "Insekten haben 6 Beine — deshalb sind Spinnen keine Insekten." },
  { q: "Welche Farben haben die Ampeln in Deutschland von oben nach unten?", o: ["Rot, Gelb, Grün", "Grün, Gelb, Rot", "Rot, Grün, Gelb", "Gelb, Rot, Grün"], a: 0, info: "Rot oben — damit man es auch sieht, wenn die Sonne blendet." },
  { q: "Was machen Bienen mit Nektar?", o: ["Sie machen daraus Honig", "Sie bauen damit Waben", "Sie füttern damit Vögel", "Sie trinken ihn nur"], a: 0, info: "Für ein Glas Honig fliegen Bienen zusammen etwa dreimal um die Erde." },
  { q: "Wie heißt unsere Galaxie?", o: ["Milchstraße", "Andromeda", "Orion", "Alpha Centauri"], a: 0, info: "Sie enthält über 100 Milliarden Sterne — unsere Sonne ist nur einer davon." },
  { q: "Welches Organ pumpt das Blut durch deinen Körper?", o: ["Das Herz", "Die Lunge", "Die Leber", "Das Gehirn"], a: 0, info: "Es schlägt etwa 100.000-mal am Tag — ganz ohne Pause." },
  { q: "Was ist der größte Ozean der Erde?", o: ["Der Pazifik", "Der Atlantik", "Der Indische Ozean", "Das Mittelmeer"], a: 0, info: "Der Pazifik ist größer als alle Kontinente zusammen." },
  { q: "Warum schwimmt Eis auf Wasser?", o: ["Es ist leichter (weniger dicht) als Wasser", "Es ist kälter als Wasser", "Es ist härter als Wasser", "Wegen des Windes"], a: 0, info: "Beim Gefrieren dehnt sich Wasser aus — deshalb schwimmen Eiswürfel oben." },
  { q: "Wie nennt man Tiere, die im Winter schlafen?", o: ["Winterschläfer", "Frostbeulen", "Schneetiere", "Polartiere"], a: 0, info: "Igel und Murmeltiere senken dabei sogar ihre Körpertemperatur stark ab." },
  { q: "Welches Land hat die meisten Einwohner?", o: ["Indien", "China", "USA", "Russland"], a: 0, info: "Indien hat China vor wenigen Jahren überholt — über 1,4 Milliarden Menschen." },
  { q: "Was ist ein Komet?", o: ["Ein Brocken aus Eis und Staub mit leuchtendem Schweif", "Ein kleiner Planet", "Eine Sternschnuppe", "Ein Mond"], a: 0, info: "Der Schweif entsteht, wenn die Sonne das Eis verdampfen lässt." },
  { q: "Wie viele Spieler stehen beim Fußball pro Team auf dem Platz?", o: ["11", "10", "12", "9"], a: 0, info: "10 Feldspieler plus Torwart — seit über 150 Jahren." },
  { q: "Welcher Stoff macht Pflanzenblätter grün?", o: ["Chlorophyll", "Karotin", "Zucker", "Sauerstoff"], a: 0, info: "Damit fangen Pflanzen Sonnenlicht ein und machen daraus Energie — Fotosynthese!" },
  { q: "Wie lange dauert es, bis die Erde sich einmal um die Sonne gedreht hat?", o: ["Ein Jahr", "Ein Tag", "Ein Monat", "Eine Woche"], a: 0, info: "Genau genommen 365 Tage und etwa 6 Stunden — deshalb gibt es Schaltjahre." },
  { q: "Was ist das größte Tier, das jemals gelebt hat?", o: ["Der Blauwal", "Der T-Rex", "Der Elefant", "Das Mammut"], a: 0, info: "Bis zu 33 Meter lang — größer als jeder Dinosaurier." },
  { q: "Woher kommt der Strom aus einer Solarzelle?", o: ["Aus Sonnenlicht", "Aus Wind", "Aus Wasser", "Aus Erdwärme"], a: 0, info: "Solarzellen wandeln Licht direkt in elektrischen Strom um." },
  { q: "Welcher Ritter-Begriff bezeichnet die Eisenkleidung?", o: ["Rüstung", "Wappen", "Lanze", "Banner"], a: 0, info: "Eine volle Ritterrüstung wog 20–30 Kilo — wie ein voller Reisekoffer." },
  { q: "Wie nennt man gefrorenen Regen, der als Kugeln vom Himmel fällt?", o: ["Hagel", "Schnee", "Graupel", "Tau"], a: 0, info: "Hagelkörner können in Gewitterwolken mehrmals hoch- und runtergeschleudert werden, bis sie schwer genug sind." },
  { q: "Was zeigt ein Kompass an?", o: ["Die Himmelsrichtung Norden", "Die Uhrzeit", "Die Temperatur", "Die Höhe"], a: 0, info: "Die Nadel richtet sich am Magnetfeld der Erde aus." },
  { q: "Welches dieser Tiere kann am längsten ohne Wasser auskommen?", o: ["Das Kamel", "Das Pferd", "Der Hund", "Die Kuh"], a: 0, info: "Kamele speichern aber kein Wasser im Höcker — da ist Fett drin!" },
];
