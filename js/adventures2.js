// Drei weitere handgeschriebene Abenteuer: Detektiv, Insel, Fußball.

const SCENES_DETEKTIV = {
  buero: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="t_sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc4e8"/><stop offset="1" stop-color="#d8ecf8"/></linearGradient></defs><rect width="400" height="240" fill="url(#t_sky)"/><circle cx="60" cy="48" r="22" fill="#fff3c4"/><rect x="175" y="110" width="22" height="130" fill="#6e4f33"/><circle cx="186" cy="80" r="62" fill="#4d7c4a"/><circle cx="140" cy="105" r="40" fill="#558a52"/><circle cx="236" cy="100" r="44" fill="#477246"/><rect x="148" y="118" width="80" height="56" rx="6" fill="#a5814f"/><polygon points="140,118 188,86 236,118" fill="#7a5a36"/><rect x="178" y="142" width="22" height="32" fill="#5c4326"/><rect x="156" y="128" width="18" height="14" fill="#cfe6f5"/><rect x="204" y="128" width="18" height="14" fill="#cfe6f5"/><rect x="150" y="174" width="8" height="66" fill="#7a5a36"/><rect x="220" y="174" width="8" height="66" fill="#7a5a36"/><circle cx="320" cy="180" r="5" fill="#e2725b"/><rect x="0" y="218" width="400" height="22" fill="#86a364"/></svg>`,
  schrank: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#e9e0cd"/><rect x="0" y="200" width="400" height="40" fill="#b59a6f"/><rect x="120" y="40" width="160" height="160" rx="8" fill="#8a6442"/><rect x="132" y="52" width="136" height="136" fill="#d9ecf2"/><line x1="200" y1="52" x2="200" y2="188" stroke="#8a6442" stroke-width="4"/><rect x="142" y="120" width="44" height="10" fill="#8a6442"/><rect x="214" y="120" width="44" height="10" fill="#8a6442"/><circle cx="164" cy="104" r="13" fill="#e2c153"/><rect x="158" y="116" width="12" height="8" fill="#c9a93a"/><rect x="226" y="96" width="22" height="26" rx="3" fill="#c0c8d4"/><ellipse cx="164" cy="160" rx="16" ry="5" fill="#c9b896"/><text x="156" y="166" font-size="11">?</text><rect x="40" y="60" width="50" height="80" fill="#cfe6f5" stroke="#8a6442" stroke-width="4" transform="rotate(-4 65 100)"/><polygon points="300,210 318,196 336,210" fill="#3a3a3a"/><circle cx="318" cy="192" r="7" fill="#3a3a3a"/></svg>`,
  hof: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="t_h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8cdec"/><stop offset="1" stop-color="#e2eef8"/></linearGradient></defs><rect width="400" height="240" fill="url(#t_h)"/><rect x="20" y="60" width="170" height="110" fill="#d98f6c"/><polygon points="10,60 105,20 200,60" fill="#a5552f"/><rect x="40" y="84" width="28" height="24" fill="#fdf6e3"/><rect x="86" y="84" width="28" height="24" fill="#fdf6e3"/><rect x="132" y="84" width="28" height="24" fill="#fdf6e3"/><rect x="88" y="126" width="34" height="44" fill="#6e4f33"/><rect x="0" y="170" width="400" height="70" fill="#b8b2a4"/><circle cx="300" cy="120" r="44" fill="#4d7c4a"/><rect x="292" y="150" width="16" height="50" fill="#6e4f33"/><circle cx="330" cy="96" r="4" fill="#2d2a26"/><polygon points="330,96 344,90 342,102" fill="#2d2a26"/><circle cx="250" cy="195" r="11" fill="#e2725b"/><path d="M243 192 h14 M250 188 v14" stroke="#fff" stroke-width="2"/></svg>`,
  baum: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="t_b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c98f"/><stop offset="1" stop-color="#f8e3c0"/></linearGradient></defs><rect width="400" height="240" fill="url(#t_b)"/><circle cx="330" cy="50" r="24" fill="#fff0b8"/><rect x="180" y="120" width="34" height="120" fill="#6e4f33"/><path d="M168 130 q-30 -16 -20 -50" stroke="#6e4f33" stroke-width="12" fill="none"/><path d="M222 124 q34 -20 28 -56" stroke="#6e4f33" stroke-width="12" fill="none"/><circle cx="197" cy="62" r="58" fill="#4d7c4a"/><circle cx="138" cy="84" r="38" fill="#558a52"/><circle cx="258" cy="80" r="40" fill="#477246"/><ellipse cx="252" cy="58" rx="22" ry="11" fill="#7a5a36"/><circle cx="246" cy="52" r="3" fill="#e2c153"/><circle cx="256" cy="54" r="2.5" fill="#cfe0ee"/><circle cx="262" cy="50" r="2.5" fill="#e2c153"/><circle cx="240" cy="40" r="5" fill="#2d2a26"/><polygon points="240,40 254,34 252,46" fill="#2d2a26"/><rect x="0" y="220" width="400" height="20" fill="#86a364"/></svg>`,
  schulfest: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="t_f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ffad7e"/></linearGradient></defs><rect width="400" height="240" fill="url(#t_f)"/><line x1="30" y1="60" x2="370" y2="50" stroke="#7a4ec9" stroke-width="3"/><polygon points="60,58 74,55 67,72" fill="#e2535b"/><polygon points="120,56 134,53 127,70" fill="#53c06a"/><polygon points="180,54 194,51 187,68" fill="#53a0e2"/><polygon points="240,53 254,50 247,67" fill="#e2c153"/><polygon points="300,52 314,49 307,66" fill="#e2725b"/><rect x="60" y="120" width="120" height="60" fill="#d3525b"/><polygon points="50,120 120,92 190,120" fill="#a53a42"/><rect x="250" y="130" width="100" height="50" fill="#5a9ad3"/><rect x="0" y="180" width="400" height="60" fill="#86a364"/><circle cx="200" cy="120" r="16" fill="#e2c153"/><rect x="192" y="134" width="16" height="12" fill="#c9a93a"/><circle cx="200" cy="92" r="6" fill="#2d2a26"/><polygon points="200,92 214,86 212,98" fill="#2d2a26"/><circle cx="120" cy="200" r="6" fill="#e2535b"/><circle cx="280" cy="206" r="6" fill="#53a0e2"/></svg>`,
};

const DETEKTIV = {
  id: "detektiv",
  emoji: "🕵️",
  title: "Detektivbüro Blitz",
  tagline: "Der Wanderpokal ist weg, jeder ist verdächtig — und eine Spur führt in die Irre.",
  maxHp: 5,
  items: {
    lupe: "🔍 Lupe", notizbuch: "📓 Notizbuch", folie: "✨ Glitzerfolie", leiter: "🪜 Krauses Leiter",
    kakao: "☕ Kakao für Krause", mia_freund: "🎨 Mias Hilfe",
    hinweis_kratzer: "🔎 Spur: Kratzer", hinweis_feder: "🔎 Spur: Feder", hinweis_folie: "🔎 Spur: Bonbonfolie",
    hinweis_kaugummi: "🔎 Spur: Kaugummi", hinweis_alibi: "🔎 Spur: Besucherbuch", hinweis_nest: "🔎 Spur: Glitzerndes Nest",
    theorie: "💡 Deine Theorie", geheim_fund: "🎺 Bolts Pfeife & Schlüssel",
  },
  rescue: { text: "Frau Sommer setzt dich ins Sekretariat, reicht dir Kakao und einen Keks. „Auch Meisterdetektive brauchen Pausen“, sagt sie. Frisch gestärkt geht es weiter!", to: "d3" },
  achievements: [
    { id: "meisterdetektiv", emoji: "🕵️", label: "Meisterdetektiv — alle sechs Spuren gefunden", test: (s) => ["hinweis_kratzer", "hinweis_feder", "hinweis_folie", "hinweis_kaugummi", "hinweis_alibi", "hinweis_nest"].every((h) => s.items.includes(h)) },
    { id: "scharfsinn", emoji: "🧠", label: "Scharfsinn — nie jemanden falsch beschuldigt", test: (s) => !s.visited.includes("d5_falsch") && !s.visited.includes("db_falsch") },
    { id: "elsterfluesterer", emoji: "🐦", label: "Elster-Flüsterer — Kira mit einem Tausch überzeugt", test: (s) => s.items.includes("freund_elster") },
    { id: "helferherz", emoji: "🤝", label: "Helferherz — Krause UND Mia geholfen", test: (s) => s.items.includes("freund_hausmeister") && s.items.includes("mia_freund") },
    { id: "geheimnisjaeger", emoji: "🎺", label: "Geheimnisjäger — das zweite Geheimnis des Nests entdeckt", test: (s) => s.items.includes("geheim_fund") },
  ],
  start: "d1",
  scenes: SCENES_DETEKTIV,
  nodes: [
    {
      id: "d1", scene: "buero",
      text: `Montagmorgen im Baumhaus — dem geheimen Hauptquartier des <strong>Detektivbüros Blitz</strong>. Da klettert tatsächlich Schulleiterin Frau Sommer die Strickleiter hoch, ganz außer Atem: „Ich brauche eure Hilfe! Der <strong>Wanderpokal</strong> ist aus der Aula verschwunden — und am Samstag ist das große Schulfest mit der Siegerehrung! Das Schloss ist heil, nichts ist aufgebrochen, niemand hat etwas gesehen. Die Polizei lacht mich aus. Ihr seid meine letzte Hoffnung.“`,
      choices: [{ label: `🔍 „Wir übernehmen den Fall!“ — Ausrüstung packen`, to: "d2v", take: ["lupe", "notizbuch"] }],
    },
    {
      id: "d2v", scene: "schrank",
      text: `Vor der Aula bleibt Frau Sommer stöhnend stehen: „Ach herrje — die Tür hat seit Neuestem ein <strong>Zahlenschloss</strong>, und ich habe den Code schon wieder vergessen! Ich weiß nur noch den Merksatz vom Hausmeister: <em>Nimm unser Gründungsjahr 1987 und bilde die Quersumme — also alle vier Ziffern zusammenzählen.</em>“`,
      riddle: { question: "Quersumme von 1987: 1 + 9 + 8 + 7 = ?", answer: "25", hint: "Rechne Schritt für Schritt: 1 + 9 = 10, dann + 8, dann + 7.", win: "d2" },
    },
    {
      id: "d2", scene: "schrank",
      text: `Die Aula. Der Trophäenschrank steht offen, auf dem leeren Pokal-Platz nur ein Staubring. Zeit für echte Detektivarbeit — und gründliche Detektive untersuchen <em>alles</em>.`,
      hints: [
        `Gute Detektive schauen überall hin — auch dorthin, wo es unappetitlich wird.`,
        `Es gibt hier VIER Stellen zu untersuchen: Schrank, Fenster, Boden … und den Mülleimer. Nicht jede Spur führt zum Täter — aber das weißt du erst hinterher.`,
        `Der richtige Schritt: Alle vier Stellen untersuchen, dann zur Befragung. Drei Spuren sind Pflicht, der Mülleimer ist die Kür (und eine Falle für voreilige Detektive).`,
      ],
      choices: [
        { label: "🔍 Den Schrank von oben bis unten", to: "d2a", hideIf: ["hinweis_kratzer"] },
        { label: "🔍 Das Fenster daneben", to: "d2b", hideIf: ["hinweis_feder"] },
        { label: "🔍 Den Boden vor dem Schrank", to: "d2c", hideIf: ["hinweis_folie"] },
        { label: "🔍 Den Mülleimer in der Ecke (igitt)", to: "d2d", hideIf: ["hinweis_kaugummi"] },
        { label: "✅ Genug gesehen — Verdächtige befragen!", to: "d3", require: ["hinweis_kratzer", "hinweis_feder", "hinweis_folie"], lockHint: "Untersuche mindestens Schrank, Fenster und Boden." },
      ],
    },
    {
      id: "d2a", scene: "schrank",
      text: `Mit der Lupe entdeckst du sie sofort: <strong>feine Kratzspuren</strong> — aber nicht am Schloss, sondern ganz <em>oben</em> auf dem Schrank, wie von dünnen Krallen. Wer klettert denn bitte ÜBER den Schrank? Du notierst es im Buch.`,
      choices: [{ label: "Weiter ermitteln", to: "d2", take: ["hinweis_kratzer"] }],
    },
    {
      id: "d2b", scene: "schrank",
      text: `Das Fenster ist nur angelehnt — und im Rahmen klemmt eine <strong>schwarz glänzende Feder</strong>, viel zu groß für eine Amsel. Draußen geht es zwei Stockwerke runter. Kein Mensch kommt hier rein … kein <em>Mensch</em>.`,
      choices: [{ label: "Weiter ermitteln", to: "d2", take: ["hinweis_feder"] }],
    },
    {
      id: "d2c", scene: "schrank",
      text: `Unter der Lupe glitzert etwas am Boden: eine <strong>silberne Bonbonfolie</strong>, ordentlich glattgestrichen, als hätte sie jemand gesammelt und verloren. Komisch: In der Aula ist Naschen streng verboten.`,
      choices: [{ label: "Weiter ermitteln", to: "d2", take: ["hinweis_folie"] }],
    },
    {
      id: "d2d", scene: "schrank",
      text: `Du überwindest dich und wühlst im Mülleimer. Zwischen Pausenbrot-Resten: ein frisch ausgespuckter <strong>Pfefferminz-Kaugummi</strong>. Du kennst nur EINE Person, die ununterbrochen Pfefferminz kaut: <em>Sportlehrer Bolt!</em> Was hatte DER hier am Freitag zu suchen? Dein Detektivherz schlägt schneller — aber Vorsicht: Eine Spur ist noch kein Beweis.`,
      choices: [{ label: "Hochinteressant. Weiter ermitteln", to: "d2", take: ["hinweis_kaugummi"] }],
    },
    {
      id: "d3", scene: "hof",
      text: `Auf dem Schulhof gehst du deine Liste durch. Am Freitagnachmittag waren noch im Gebäude: <strong>Hausmeister Krause</strong> (mürrisch, hat alle Schlüssel), die <strong>neue Schülerin Mia</strong> (huscht ständig heimlich umher), <strong>Sportlehrer Bolt</strong> (Pfefferminz-Kaugummi!) — und im Sekretariat sitzt <strong>Frau Specht</strong>, die das <em>Besucherbuch</em> führt. Irgendwann musst du Frau Sommer außerdem deine <strong>Theorie</strong> präsentieren. Aber Vorsicht: Eine falsche Anschuldigung wäre mehr als peinlich.`,
      hints: [
        `Keiner rennt mit dem Pokal unterm Arm herum — du brauchst Aussagen UND das Besucherbuch, um die Spuren zu sortieren.`,
        `Beim Hausmeister hilft Anpacken statt Verhören (oder ein warmer Kakao …), Mia hat zwei Geschenke für dich, Bolt weiß mehr, als er ahnt — und Frau Spechts Besucherbuch entlarvt, wer wann WIRKLICH in der Aula war.`,
        `Der richtige Weg: Spuren + Besucherbuch sammeln → im Notizbuch die Theorie bilden → dann erst anklagen. Wer wild rät, blamiert sich (und verliert ein Herz).`,
      ],
      choices: [
        { label: "🔑 Hausmeister Krause", to: "dk1", hideIf: ["freund_hausmeister"] },
        { label: "🎨 Die neue Schülerin Mia", to: "dm1", hideIf: ["mia_freund"] },
        { label: "🏃 Sportlehrer Bolt", to: "db1", hideIf: ["hinweis_nest"] },
        { label: "🗂️ Frau Specht im Sekretariat (Besucherbuch)", to: "dsp1", hideIf: ["hinweis_alibi"] },
        { label: "📓 Notizbuch: die Spuren sortieren", to: "d4log", require: ["hinweis_kratzer", "hinweis_feder"], hideIf: ["theorie"], lockHint: "Dafür brauchst du mindestens die Kratzer- und die Feder-Spur vom Tatort." },
        { label: "⚖️ Frau Sommer die Theorie präsentieren!", to: "d5", require: ["theorie"], lockHint: "Erst die Spuren im Notizbuch sortieren — eine Anklage ohne Theorie geht schief." },
      ],
    },

    // ----- Hausmeister Krause -----
    {
      id: "dk1", scene: "hof",
      text: `Hausmeister Krause wuchtet schwere Kisten aus dem Keller und schnauft wie eine alte Dampflok. Als er dich sieht, brummt er: „Ich hab nichts geklaut, falls du das denkst. Und ich hab zu tun!“`,
      choices: [
        { label: "🤝 Erstmal mit anpacken und Kisten tragen", to: "dk2" },
        { label: "☕ Ihm den Kakao von Frau Specht geben", to: "dk2", require: ["kakao"], drop: ["kakao"], lockHint: "Du hast nichts Warmes dabei … Frau Specht wüsste bestimmt, womit man Krause knackt." },
        { label: `„Wo waren Sie Freitagnacht?!“ — direkt verhören`, to: "dk3" },
      ],
    },
    {
      id: "dk2", scene: "hof",
      text: `Krause taut auf wie Butter in der Sonne. Er zeigt dir den Inhalt seiner Kisten: <strong>Lichterketten</strong>! „Mein Geheimnis. Ich schmücke nachts die Aula fürs Fest. Freitag war ich auch dort …“ Er senkt die Stimme: „… und da hab ich am Fenster was <em>Schwarzes flattern</em> sehen! Dachte erst, mir spinnt die Brille.“ Er drückt dir seine Leiter in die Hand: „Falls du irgendwo hoch musst. Und psst wegen der Lichterketten!“`,
      choices: [{ label: "Zurück zum Schulhof", to: "d3", take: ["freund_hausmeister", "leiter"] }],
    },
    {
      id: "dk3", scene: "hof",
      text: `Krause knallt die Kellertür zu. „Verhör mich doch, wenn du groß bist!“ Hm. Mit der Brechstange kommst du hier nicht weiter — vielleicht erstmal <em>helfen</em>? Oder ihn mit etwas Warmem besänftigen?`,
      choices: [
        { label: "🤝 Na gut — Kisten tragen", to: "dk2" },
        { label: "Erstmal zu den anderen", to: "d3" },
      ],
    },

    // ----- Mia -----
    {
      id: "dm1", scene: "hof",
      text: `Mia sitzt allein vor dem Kunstraum und versteckt hastig etwas hinter ihrem Rücken. Sie wird knallrot: „I-ich hab nichts gemacht!“ In ihrer Tasche glitzert es verdächtig — <em>silberne Folien</em>, genau wie am Tatort!`,
      choices: [
        { label: "Freundlich fragen, was sie da versteckt", to: "dm2" },
        { label: "🔎 Ihr die Bonbonfolie vom Tatort zeigen", to: "dm2", require: ["hinweis_folie"], lockHint: "Dafür müsstest du die Folie vom Tatort gefunden haben." },
      ],
    },
    {
      id: "dm2", scene: "hof",
      text: `Mia gibt auf und zeigt ihr Geheimnis: ein <strong>selbstgebasteltes Glitzer-Banner</strong> fürs Schulfest — aus hunderten gesammelten Bonbonfolien! „Ich bin neu hier. Ich dachte, dann mögen mich vielleicht alle“, murmelt sie. Freitag hat sie in der Aula heimlich Maß genommen — dabei muss sie die Folie verloren haben. „Das Fenster stand schon offen! Und auf dem Dach hat es die ganze Zeit <em>tack-tack-tack</em> gemacht.“ Sie schenkt dir eine ihrer schönsten Glitzerfolien.`,
      choices: [
        { label: "🎨 Ihr eine Stunde beim Banner helfen", to: "dm3", take: ["folie"] },
        { label: "Danke! Zurück zum Schulhof", to: "d3", take: ["folie"] },
      ],
    },
    {
      id: "dm3", scene: "hof",
      text: `Ihr klebt, schneidet und lacht — und Mia blüht richtig auf. Plötzlich stockt sie und zeigt aus dem Kunstraum-Fenster: „Schau mal! Von HIER sieht man den großen Kastanienbaum … und da oben <em>glitzert</em> doch was in den Ästen?!“ Tatsächlich — ein Funkeln im Geäst! Mia grinst: „Wenn du da hoch musst: Vom Kunstraum-Fenster kommt man aufs Vordach. Ich zeig dir den Weg, wir sind jetzt ein Team.“`,
      choices: [{ label: "📓 Notieren: Das Nest! Zurück zum Hof", to: "d3", take: ["mia_freund", "hinweis_nest"] }],
    },

    // ----- Sportlehrer Bolt -----
    {
      id: "db1", scene: "hof",
      text: `Herr Bolt pumpt Bälle auf und kaut — natürlich — <em>Pfefferminz-Kaugummi</em>. {hat:hinweis_kaugummi?Dein Fund aus dem Mülleimer brennt in der Tasche. Er war Freitag in der Aula, das ist jetzt klar. Aber WARUM?:}`,
      choices: [
        { label: `😤 „Sie waren es! Ihr Kaugummi lag am Tatort!“`, to: "db_falsch", showIf: ["hinweis_kaugummi"] },
        { label: "Erstmal fragen, warum er so schlecht gelaunt ist", to: "db2" },
      ],
    },
    {
      id: "db_falsch", scene: "hof",
      text: `Bolt läuft rot an wie eine Tomate im Trainingsanzug. „WAS?! Ich war Freitag in der Aula, um meine <em>gestohlene Trillerpfeife</em> zu suchen, du Schlaumeier! Erst die Pfeife, dann mein Schlüsselbund, jetzt der Pokal — und ICH soll der Dieb sein?!“ Die halbe Schule hat es gehört. Dir brennen die Ohren (−1 Herz). Merke: Eine Spur ist noch kein Beweis — der Kaugummi war eine <strong>falsche Fährte</strong>.`,
      effect: { hp: -1 },
      choices: [{ label: "😳 Entschuldigen und richtig zuhören", to: "db2" }],
    },
    {
      id: "db2", scene: "hof",
      text: `Bolt schnauft sich ab und zählt an den Fingern auf: „Erst verschwindet meine <em>silberne Trillerpfeife</em>. Dann mein <em>Schlüsselbund</em>. Jetzt der <em>Pokal</em>. Diese Schule wird ausgeraubt!“ Moment. Pfeife. Schlüssel. Pokal. Dein Detektivhirn rattert: <em>Was haben alle drei gemeinsam?</em>`,
      riddle: { question: "Trillerpfeife, Schlüsselbund, Pokal — was haben alle gestohlenen Dinge gemeinsam?", options: ["Sie glitzern und glänzen", "Sie gehören Herrn Bolt", "Sie waren in der Aula", "Sie sind aus Metall und schwer"], answer: 0, hint: "Denk an die schwarze Feder am Fenster … und woran Elstern ihr Herz verlieren. (Aus Metall sind sie auch — aber der Pokal ist riesig und die Pfeife winzig. Glänzen tun sie ALLE.)", win: "db3" },
    },
    {
      id: "db3", scene: "hof",
      text: `„Alles GLÄNZT!“, rufst du — und Bolt lässt vor Schreck den Ball fallen. Gemeinsam blickt ihr zum großen <strong>Kastanienbaum</strong> hinterm Sportplatz. Und tatsächlich: Hoch oben <em>blitzt und funkelt</em> es in der Sonne! „Na sowas“, staunt Bolt. „Da wohnt doch diese freche Elster …“`,
      choices: [{ label: "📓 Notieren: Das Nest! Zurück zum Hof", to: "d3", take: ["hinweis_nest"] }],
    },

    // ----- Sekretariat -----
    {
      id: "dsp1", scene: "buero",
      text: `Im Sekretariat klingelt das Telefon im Dauerton. Frau Specht jongliert drei Aktenstapel: „Das Besucherbuch? Gern, Kindchen — aber NUR, wenn du mir kurz hilfst. Diese vier Pakete müssen sortiert werden: Das <em>schwerste</em> zuerst. Ich weiß nur: Das rote ist schwerer als das blaue. Das blaue ist schwerer als das grüne. Und das gelbe ist leichter als das grüne.“`,
      riddle: { question: "Welches Paket ist das schwerste?", options: ["Das rote", "Das blaue", "Das grüne", "Das gelbe"], answer: 0, hint: "Bau eine Kette: rot > blau > grün > gelb. Ganz vorne steht das schwerste.", win: "dsp2" },
    },
    {
      id: "dsp2", scene: "buero",
      text: `„Na bitte, ein Logikprofi!“ Frau Specht schlägt das <strong>Besucherbuch</strong> auf. Freitag, 15–17 Uhr: <em>Krause (Keller, Lichterketten holen), Mia (Aula, nur 10 Minuten), Bolt (Aula, 16:30 — „Pfeife suchen“)</em>. „Und um 17 Uhr habe ich höchstpersönlich abgeschlossen — da stand der Pokal noch drin, ich hab ihn durchs Fenster glänzen sehen!“ Alle drei haben also ein Alibi … der Pokal verschwand NACH 17 Uhr, durch die <em>verschlossene</em> Tür. Oder eben: nicht durch die Tür. Sie drückt dir noch einen Becher in die Hand: „Bringst du dem Krause seinen Kakao mit? Der Brummbär taut sonst nie auf.“`,
      choices: [{ label: "📓 Alles notiert! Zurück zum Hof", to: "d3", take: ["hinweis_alibi", "kakao"] }],
    },

    // ----- Theorie & Anklage -----
    {
      id: "d4log", scene: "buero",
      text: `Du breitest das Notizbuch im Baumhaus aus und malst Pfeile: <em>Kratzer OBEN auf dem Schrank. Eine schwarze Feder am offenen Fenster im 2. Stock. Tack-tack auf dem Dach. {hat:hinweis_alibi?Alle Menschen haben ein Alibi — und die Tür war abgeschlossen.:}{hat:hinweis_kaugummi?Und der Kaugummi? Bolt suchte nur seine Pfeife — falsche Fährte!:}</em> Die Wahrheit liegt vor dir. Wer kommt durch ein Fenster im 2. Stock, klettert mit Krallen über Schränke und liebt Glänzendes?`,
      riddle: { question: "Deine Schlussfolgerung, Detektiv: Wer ist der Täter?", options: ["Ein Vogel mit Vorliebe für Glitzer — eine Elster!", "Hausmeister Krause mit seiner Leiter", "Mia, die Glitzerfolien sammelt", "Sportlehrer Bolt, der den Pokal „zurückholen“ wollte"], answer: 0, hint: "Krallen-Kratzer, Feder, Fenster im 2. Stock, abgeschlossene Tür — welcher TÄTER braucht keinen Schlüssel und keine Leiter?", win: "d4done" },
    },
    {
      id: "d4done", scene: "buero",
      text: `Natürlich! Alle Spuren zeigen in dieselbe Richtung: <strong>Der Täter ist kein Mensch.</strong> Du schreibst deine Theorie sauber ins Notizbuch — mit Beweisen, Alibis und einem dramatischen Schlusssatz, versteht sich. Jetzt fehlt nur noch: Frau Sommer überzeugen.`,
      choices: [{ label: "⚖️ Zur Anklage!", to: "d3", take: ["theorie"] }],
    },
    {
      id: "d5", scene: "hof",
      text: `Frau Sommer hat das halbe Kollegium zusammengetrommelt. „Nun, Detektivbüro Blitz — <strong>wer</strong> hat den Pokal gestohlen?“ Alle Augen ruhen auf dir. Ein falsches Wort, und du blamierst dich bis zu den Sommerferien. Deine Anklage lautet …`,
      hints: [
        `Geh deine Beweise durch: Wer kann durchs Fenster im 2. Stock kommen, wenn die Tür abgeschlossen ist?`,
        `Alle drei Menschen haben ein Alibi aus dem Besucherbuch. Die Kratzer stammen von Krallen, die Feder von einem großen schwarzen Vogel.`,
        `Der richtige Schritt: Klage die Elster an — der Täter ist kein Mensch!`,
      ],
      choices: [
        { label: "🐦 „Der Täter ist … KEIN Mensch. Es war die Elster!“", to: "d6" },
        { label: "🔑 „Es war Hausmeister Krause!“", to: "d5_falsch" },
        { label: "🎨 „Es war Mia, die Neue!“", to: "d5_falsch" },
        { label: "🏃 „Es war Sportlehrer Bolt!“", to: "d5_falsch" },
      ],
    },
    {
      id: "d5_falsch", scene: "hof",
      text: `Eisige Stille. Die beschuldigte Person schnappt nach Luft, Frau Sommer hebt eine Augenbraue: „Und die <em>Beweise</em>?“ Du stammelst — und merkst selbst: Das Alibi aus dem Besucherbuch zerlegt deine Anklage in der Luft. Wie peinlich (−1 Herz). „Noch ein Versuch“, sagt Frau Sommer streng, „aber diesmal mit Köpfchen.“`,
      effect: { hp: -1 },
      choices: [{ label: "Tief durchatmen — neue Anklage", to: "d5" }],
    },

    // ----- Showdown am Baum -----
    {
      id: "d6", scene: "baum",
      text: `Raunen in der Menge — und dann marschiert die ganze Gesellschaft zum <strong>Kastanienbaum</strong>. Hoch oben, gut versteckt, thront tatsächlich ein <strong>Nest voller Glitzerkram</strong>. Du erkennst sogar einen goldenen Henkel! „Beweise es“, sagt Frau Sommer leise. Jetzt heißt es: nach oben. Aber wie?`,
      hints: [
        `Es gibt drei Wege nach oben — zwei sichere und einen wackeligen.`,
        `{hat:leiter?Du hast Krauses Leiter!:Krauses Leiter (hilf ihm beim Tragen oder bring ihm Kakao)}{hat:mia_freund? — und Mia kennt den Weg übers Vordach.: oder Mias Vordach-Trick (hilf ihr beim Banner) wären sichere Wege.}`,
        `Der sicherste Plan: Hol dir Krauses Leiter (Kisten tragen oder Kakao bringen) oder Mias Vordach-Trick (hilf ihr beim Banner). Freiklettern klappt nur ab einer 5 — das ist was für Glückspilze.`,
      ],
      choices: [
        { label: "🪜 Krauses Leiter anlegen", to: "d7", require: ["leiter"], lockHint: "Eine Leiter wäre praktisch … wer hat hier nochmal eine? (Tipp: Hilf dem Hausmeister.)" },
        { label: "🎨 Mias Geheimweg: Kunstraum → Vordach → Ast", to: "d7", require: ["mia_freund"], lockHint: "Diesen Weg kennt nur Mia — und sie zeigt ihn nur Freunden." },
        { label: "🧗 Freiklettern (riskant: klappt nur ab einer 5!)", to: "d6_dice" },
      ],
    },
    {
      id: "d6_dice",
      dice: { text: "Freiklettern am Riesen-Kastanienbaum — das schaffst du nur bei 5 oder 6! Bei 1–4 rutschst du ab (−1 Herz).", threshold: 5, win: "d7", lose: "d6", loseHp: 1, loseText: "Ratsch! Ein Ast bricht, du landest im Laub — vor versammelter Schule. Das Knie brennt, die Ohren glühen. Vielleicht doch lieber einen sicheren Weg suchen?" },
    },
    {
      id: "d7", scene: "baum",
      text: `Du bist oben! Im Nest: Trillerpfeife, Schlüsselbund, drei Kronkorken — und mittendrin <strong>der Wanderpokal</strong>! Da rauscht es: Die Elster <strong>Kira</strong> landet auf dem Ast und plustert sich auf. „Krah! MEINS!“, scheint ihr Blick zu sagen. Unten halten alle den Atem an.`,
      hints: [
        `Eine Elster gibt nichts freiwillig her — außer, sie bekommt etwas Besseres. Oder du wartest einfach mal ab, was sie tut …`,
        `{hat:folie?Mias Glitzerfolie funkelt mehr als jeder Pokal — das perfekte Tauschgeschäft.:Mia sammelt Glitzerfolien — wer freundlich zu ihr ist, bekommt eine geschenkt.}`,
        `Der richtige Schritt: Tauschen statt schnappen. Und wer GANZ geduldig ist und erst beobachtet, entdeckt im Nest noch ein zweites Geheimnis …`,
      ],
      choices: [
        { label: "✨ Tauschgeschäft: die Glitzerfolie anbieten", to: "d8", require: ["folie"], drop: ["folie"], take: ["freund_elster"], lockHint: "Du bräuchtest etwas Glitzerndes zum Tauschen … Mia sammelt sowas." },
        { label: "🫳 Schnell zugreifen, bevor sie reagiert", to: "d7_dice" },
        { label: "Ganz still warten und Kira beobachten", to: "d7b", hideIf: ["geheim_fund"], secret: true },
      ],
    },
    {
      id: "d7_dice",
      dice: { text: "Blitzschnell nach dem Pokal greifen! Bei 4–6 bist du schneller, bei 1–3 erwischt dich Kiras Schnabel (−1 Herz).", win: "d8", lose: "d7", loseHp: 1, loseText: "ZACK! Kira ist schneller und zwickt dich in den Finger. Sie funkelt dich an: So wird das nichts. Vielleicht gibt es einen freundlicheren Weg?" },
    },
    {
      id: "d7b", scene: "baum",
      text: `Du rührst dich nicht. Eine Minute. Zwei. Kira beruhigt sich, hüpft zur Seite — und schiebt mit dem Schnabel ein Stück Rinde beiseite: <em>ein zweites, verstecktes Lager!</em> Darin: Bolts <strong>silberne Trillerpfeife</strong>, sein <strong>Schlüsselbund</strong> und eine Münzsammlung, die seit Wochen vermisst wird. Du packst alles vorsichtig ein — DAS wird Bolt freuen. Kira beäugt dich … fast schon freundlich. Geduld zahlt sich aus.`,
      choices: [{ label: "Und jetzt: der Pokal", to: "d7", take: ["geheim_fund"] }],
    },
    {
      id: "d8", scene: "schulfest", end: "win",
      text: `Samstag, Schulfest! Vor versammelter Schule löst du den Fall auf: „Kein Dieb, kein Einbrecher — sondern <strong>Kira die Elster</strong>! Die Kratzer: ihre Krallen. Die Feder: ihre. Das Fenster stand offen, die Tür war abgeschlossen — kein Mensch kommt da rein. {hat:hinweis_kaugummi?Und der Kaugummi war eine falsche Fährte: Herr Bolt suchte nur seine Pfeife!:}“ Frau Sommer strahlt, Krauses Lichterketten funkeln, Mias Glitzer-Banner hängt über der Bühne — plötzlich will jeder mit ihr basteln. {hat:geheim_fund?Herr Bolt fällt fast in Ohnmacht vor Freude, als du ihm Pfeife UND Schlüsselbund überreichst — er pfeift vor Glück ein ganzes Konzert.:} {hat:freund_elster?Und Kira? Die sitzt mit ihrer neuen Glitzerfolie auf dem Pokalschrank und wurde feierlich zum „Ehren-Wachvogel der Trophäensammlung“ ernannt.:} Frau Sommer überreicht dir eine Urkunde: <strong>„Meisterdetektiv des Detektivbüros Blitz“</strong>. Fall gelöst!`,
    },
  ],
};

const SCENES_INSEL = {
  strand: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="i_s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0e8"/><stop offset="1" stop-color="#c8ecf6"/></linearGradient></defs><rect width="400" height="150" fill="url(#i_s)"/><circle cx="330" cy="46" r="24" fill="#fff3c4"/><rect y="120" width="400" height="60" fill="#4a9bbf"/><path d="M0 130 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#7cc3dd" stroke-width="4" fill="none"/><path d="M0 175 Q200 150 400 180 L400 240 L0 240 Z" fill="#eed9a4"/><path d="M120 140 q30 -40 14 -90 l-14 16 l-4 -20 l-12 18 l-6 -16 q-22 50 6 92" fill="#4d8a4a"/><rect x="116" y="130" width="12" height="60" fill="#8a6442" transform="rotate(6 122 160)"/><path d="M250 190 q40 -22 80 0 l-10 14 q-30 -14 -60 0 z" fill="#7a5a3a"/><ellipse cx="180" cy="210" rx="10" ry="5" fill="#d3b886"/><circle cx="60" cy="200" r="7" fill="#e2725b"/><path d="M53 197 a7 7 0 0 1 14 0" fill="#fff"/></svg>`,
  lager: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#1d2a3e"/><circle cx="320" cy="50" r="20" fill="#e8e4d8"/><circle cx="100" cy="40" r="2" fill="#fff"/><circle cx="180" cy="60" r="2" fill="#fff"/><circle cx="250" cy="30" r="2" fill="#fff"/><path d="M0 190 Q200 170 400 195 L400 240 L0 240 Z" fill="#3a3a52"/><polygon points="80,190 130,120 180,190" fill="#6e5638"/><line x1="130" y1="120" x2="130" y2="190" stroke="#54422a" stroke-width="5"/><circle cx="260" cy="180" r="14" fill="#f4a83c"><animate attributeName="r" values="14;16;14" dur="1.4s" repeatCount="indefinite"/></circle><polygon points="246,196 274,196 268,178 252,178" fill="#54422a"/><circle cx="260" cy="166" r="7" fill="#e2725b" opacity=".8"><animate attributeName="cy" values="166;158;166" dur="1.4s" repeatCount="indefinite"/></circle><circle cx="330" cy="150" r="6" fill="#e2725b"/><circle cx="337" cy="144" r="4" fill="#53c06a"/></svg>`,
  dschungel: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#27402e"/><rect x="0" y="200" width="400" height="40" fill="#1d3023"/><rect x="50" y="80" width="18" height="125" fill="#4d3b2a"/><circle cx="59" cy="62" r="44" fill="#3f6648"/><rect x="320" y="70" width="20" height="135" fill="#54422f"/><circle cx="330" cy="52" r="48" fill="#467350"/><path d="M120 0 q14 80 -10 200" stroke="#365c40" stroke-width="9" fill="none"/><path d="M280 0 q-16 70 8 205" stroke="#365c40" stroke-width="9" fill="none"/><rect x="160" y="100" width="80" height="95" rx="10" fill="#7d8694"/><circle cx="185" cy="130" r="9" fill="#2d2a26"/><circle cx="215" cy="130" r="9" fill="#2d2a26"/><path d="M180 162 q20 12 40 0" stroke="#2d2a26" stroke-width="5" fill="none"/><polygon points="200,95 188,75 212,75" fill="#7d8694"/><circle cx="90" cy="170" r="6" fill="#e2535b"/><circle cx="300" cy="180" r="6" fill="#e2c153"/></svg>`,
  lagune: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="i_l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb6cf"/><stop offset="1" stop-color="#23607c"/></linearGradient></defs><rect width="400" height="80" fill="#aee0ef"/><circle cx="70" cy="40" r="18" fill="#fff3c4"/><rect y="80" width="400" height="160" fill="url(#i_l)"/><path d="M0 95 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#8fd0e8" stroke-width="4" fill="none"/><path d="M150 170 L150 120 L230 135 L230 180 Z" fill="#54422a" transform="rotate(-14 190 150)"/><line x1="180" y1="100" x2="180" y2="150" stroke="#3d3220" stroke-width="6" transform="rotate(-14 190 150)"/><circle cx="300" cy="200" r="9" fill="#f6f1da"/><circle cx="300" cy="200" r="4" fill="#9fd4ff"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle><path d="M60 200 q10 -14 20 0 q-10 14 -20 0" fill="#f4a83c"/><circle cx="64" cy="198" r="2" fill="#2d2a26"/><path d="M340 130 q8 -10 16 0" stroke="#2e6b50" stroke-width="5" fill="none"/></svg>`,
  ruine: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#2c2536"/><circle cx="80" cy="40" r="18" fill="#d8d3c0" opacity=".6"/><rect x="120" y="80" width="160" height="130" fill="#5c5346"/><polygon points="105,80 200,30 295,80" fill="#47402f"/><rect x="175" y="140" width="50" height="70" rx="22" fill="#191625"/><circle cx="200" cy="110" r="17" fill="#e8e0c8"/><circle cx="193" cy="106" r="5" fill="#2c2536"/><circle cx="207" cy="106" r="5" fill="#2c2536"/><rect x="190" y="118" width="20" height="4" fill="#2c2536"/><rect x="138" y="95" width="26" height="40" fill="#47402f"/><rect x="236" y="95" width="26" height="40" fill="#47402f"/><circle cx="320" cy="180" r="5" fill="#f4a83c"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="90" cy="190" r="5" fill="#f4a83c"><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite"/></circle><path d="M0 215 h400" stroke="#1f1a28" stroke-width="50"/></svg>`,
  heimkehr: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="i_h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb37e"/><stop offset="1" stop-color="#ffd98a"/></linearGradient></defs><rect width="400" height="150" fill="url(#i_h)"/><circle cx="200" cy="120" r="34" fill="#fff0b8"/><rect y="140" width="400" height="100" fill="#d3743f"/><path d="M0 150 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#f0975e" stroke-width="5" fill="none"/><path d="M140 170 q60 -26 120 0 l-14 20 q-46 -16 -92 0 z" fill="#7a5a3a"/><rect x="196" y="100" width="8" height="70" fill="#54422a"/><polygon points="204,104 258,134 204,150" fill="#2d2a26"/><circle cx="230" cy="92" r="7" fill="#e2725b"/><circle cx="237" cy="86" r="5" fill="#53c06a"/><circle cx="320" cy="60" r="3" fill="#fff" opacity=".8"/></svg>`,
};

const INSEL = {
  id: "insel",
  emoji: "🏝️",
  title: "Die vergessene Insel",
  tagline: "Schiffbruch! Überlebe, finde den Piratenschatz — und einen Weg nach Hause.",
  maxHp: 5,
  items: {
    coco: "🦜 Coco der Papagei", feuerstein: "🔥 Feuerstein", fackel: "🕯️ Fackel",
    karte1: "🗺️ Kartenstück 1", karte2: "🗺️ Kartenstück 2", karte3: "🗺️ Kartenstück 3",
    werkzeug: "🧰 Werkzeugkiste", perle: "🫧 Leuchtperle", tagebuch: "📜 Knochenbeins Tagebuch", saebel: "🗡️ Knochenbeins Säbel",
  },
  rescue: { text: "Du erwachst im warmen Sand des Lagers. {hat:coco?Coco hat so lange gekreischt, bis du wieder zu dir kamst, und tupft dir jetzt wichtig mit einem Blatt die Stirn ab.:Die Brandung hat dich sanft zurück ans Lager gespült.} Kokoswasser, tief durchatmen — weiter geht's!", to: "i4" },
  achievements: [
    { id: "papageienfreund", emoji: "🦜", label: "Papageienfreund — Coco aus dem Netz befreit", test: (s) => s.items.includes("coco") },
    { id: "perlentaucher", emoji: "🫧", label: "Perlentaucher — das Geheimnis der Lagune gefunden", test: (s) => s.items.includes("perle") },
    { id: "ehrenpirat", emoji: "🏴‍☠️", label: "Ehrenpirat — Knochenbeins letzten Wunsch erfüllt", test: (s) => s.items.includes("respekt") },
    { id: "unverwundbar", emoji: "💪", label: "Unverwundbar — mit vollen Herzen ins Ziel", test: (s) => s.hp >= 5 },
  ],
  start: "i1",
  scenes: SCENES_INSEL,
  nodes: [
    {
      id: "i1", scene: "strand",
      text: `Donner, Wellen, Dunkelheit — und dann: Stille. Du spuckst Sand aus und rappelst dich hoch. Um dich herum liegen die Trümmer deines kleinen Segelboots an einem fremden Strand. Hinter dir: dichter Dschungel. Vor dir: endloses Meer. Du bist gestrandet — auf einer Insel, die auf keiner Karte steht.`,
      choices: [{ label: "🏖️ Den Strand nach Brauchbarem absuchen", to: "i2" }],
    },
    {
      id: "i2", scene: "strand",
      text: `Zwischen den Planken findest du eine angespülte Kiste: ein <strong>Feuerstein</strong> und eine geteerte <strong>Fackel</strong> — Gold wert! Da hörst du ein klägliches Krächzen: In einem alten Fischernetz zappelt ein knallbunter <strong>Papagei</strong> und schaut dich mit schiefem Kopf an.`,
      choices: [
        { label: "🦜 Den Papagei vorsichtig befreien", to: "i3", take: ["feuerstein", "fackel", "coco"] },
        { label: "Keine Zeit für Vögel — weiter", to: "i3", take: ["feuerstein", "fackel"] },
      ],
    },
    {
      id: "i3", scene: "strand",
      text: `{hat:coco?Der Papagei schüttelt sich, landet auf deiner Schulter und kreischt: „Knochenbein! KNOCHENBEIN!“ Du taufst ihn <strong>Coco</strong>. Was er wohl meint?:Der Wind frischt auf und die Sonne sinkt.} Die Nacht naht — du brauchst ein Lager und vor allem: <strong>Feuer</strong>.`,
      choices: [
        { label: "🔥 Mit dem Feuerstein Funken schlagen", to: "i4", require: ["feuerstein"] },
      ],
    },
    {
      id: "i4", scene: "lager",
      text: `Das Lagerfeuer knistert, der Unterschlupf aus Palmwedeln hält — erste Nacht überstanden! Im Morgenlicht siehst du es klar: Diese Insel hat <strong>drei Geheimnisse</strong>. Ein <em>Schiffswrack</em> draußen in der Lagune, einen <em>Dschungelpfad</em> mit seltsamen Steinen und eine <em>dunkle Felshöhle</em> am Kliff. Irgendwo dort liegen die Kartenstücke des Piraten Knochenbein — erst alle drei zusammen zeigen den Weg zum Schatz.`,
      hints: [
        `Drei Orte, drei Kartenstücke — die Reihenfolge ist egal, du kannst nichts verpassen.`,
        `In der Lagune wartet mehr als nur ein Kartenstück: Werkzeug für später … und wer mutig genug ist, nochmal tief zu tauchen, findet etwas ganz Besonderes ✨.`,
        `Der richtige Weg: Lagune (Karte + Werkzeug + Geheimnis) → Dschungel → Felshöhle. Dann zeigt die Karte den Weg zur Piratenruine.`,
      ],
      choices: [
        { label: "🌊 Zum Wrack in der Lagune schwimmen", to: "il1", hideIf: ["karte1"] },
        { label: "🌿 Den Dschungelpfad erkunden", to: "id0", hideIf: ["karte2"] },
        { label: "🦇 In die Felshöhle steigen", to: "ih1", hideIf: ["karte3"] },
        { label: "🏴‍☠️ Mit der ganzen Karte zur Piratenruine!", to: "i5", require: ["karte1", "karte2", "karte3"], lockHint: "Erst alle drei Kartenstücke finden — Wrack, Dschungel und Höhle." },
      ],
    },

    // --- Lagune ---
    {
      id: "il1", scene: "lagune",
      text: `Die Lagune glitzert türkis — und mittendrin ragt das <strong>Wrack eines Piratenschiffs</strong> schief aus dem Wasser. {hat:coco?Coco kreist aufgeregt darüber: „Schatz! Schatz!“:} Zwischen dir und dem Wrack: eine ordentliche Strecke offenes Wasser mit glibberigen Quallen.`,
      choices: [{ label: "🏊 Hinschwimmen — Augen auf!", to: "il_dice" }],
    },
    {
      id: "il_dice",
      dice: { text: "Quallen-Slalom durch die Lagune! Bei 4–6 schlängelst du dich elegant durch, bei 1–3 erwischt dich ein brennender Tentakel (−1 Herz).", win: "il2", lose: "il2", loseHp: 1, loseText: "Autsch — das brennt wie Brennnessel XXL! Prustend erreichst du trotzdem das Wrack." },
    },
    {
      id: "il2", scene: "lagune",
      text: `Du kletterst die schräge Bordwand hoch. In der Kapitänskajüte: eine rostige, aber komplette <strong>Werkzeugkiste</strong> — und im Schreibtisch, in Wachstuch gewickelt, ein <strong>Stück einer Schatzkarte</strong>! Durch ein Loch im Rumpf siehst du unten in der Tiefe einen schwachen, <em>bläulich leuchtenden Schimmer</em> …`,
      choices: [
        { label: "🧰 Alles einpacken und zurück zum Lager", to: "i4", take: ["werkzeug", "karte1"] },
        { label: "Noch einmal tief hinabtauchen, zum Leuchten", to: "il3", take: ["werkzeug", "karte1"], secret: true },
      ],
    },
    {
      id: "il3", scene: "lagune",
      text: `Du holst tief Luft und tauchst. Unten, in einer Riesenmuschel zwischen Korallen, liegt sie: eine <strong>Leuchtperle</strong>, die wie ein kleiner Mond schimmert! Vorsichtig nimmst du sie und schießt zur Oberfläche. So etwas hat zu Hause garantiert noch niemand gesehen.`,
      choices: [{ label: "🫧 Zurück zum Lager — was für ein Fund!", to: "i4", take: ["perle"] }],
    },

    // --- Dschungel ---
    {
      id: "id1", scene: "dschungel",
      text: `Der Pfad führt unter Lianen hindurch zu einer moosbewachsenen <strong>Steinstatue</strong> mit grimmigem Gesicht. Als du näher trittst, knirscht es — und die Statue spricht mit Steinstimme: „WER PASSIEREN WILL, MUSS RECHNEN KÖNNEN. Auf meinen Schultern saßen einst 8 Affen. Jeder stibitzte 3 Bananen. Wie viele Bananen waren fort?“`,
      riddle: { question: "8 Affen × 3 Bananen = ?", answer: "24", hint: "Rechne 8 × 3 — oder zähle dreimal die 8.", win: "id2" },
    },
    {
      id: "id2", scene: "dschungel",
      text: `„VIERUNDZWANZIG. KORREKT.“ Die Statue rückt knirschend beiseite und gibt den Weg zu einem rauschenden <strong>Wasserfall</strong> frei. Hinter dem Wasservorhang erkennst du eine Nische — stockdunkel natürlich.`,
      choices: [
        { label: "🕯️ Fackel anzünden und hindurch", to: "id3", require: ["fackel", "feuerstein"], lockHint: "Ohne Licht siehst du da drin die Hand vor Augen nicht." },
      ],
    },
    {
      id: "id3", scene: "dschungel",
      text: `Im Fackelschein funkelt die Nische wie eine Schatzkammer aus Tropfsteinen. Auf einem Steinsims, ordentlich beschwert mit einem Kieselstein: das <strong>zweite Kartenstück</strong>! Jemand wollte, dass es gefunden wird — aber nur von jemandem, der bis hierher kommt.`,
      choices: [{ label: "🗺️ Einstecken und zurück zum Lager", to: "i4", take: ["karte2"] }],
    },

    // --- Höhle ---
    {
      id: "ih1", scene: "ruine",
      text: `Die Felshöhle am Kliff atmet kalte Luft aus. {hat:coco?Coco macht sich ganz klein auf deiner Schulter: „Dunkel! Duuunkel!“:} Drinnen hörst du es leise flattern — Fledermäuse, hunderte. Der Weg führt über glitschige Felsen steil nach unten.`,
      choices: [
        { label: "🧗 Vorsichtig hinabklettern", to: "ih_dice" },
      ],
    },
    {
      id: "ih_dice",
      dice: { text: "Klettern auf glitschigem Fels! Bei 4–6 findest du sicheren Halt, bei 1–3 rutschst du ein Stück ab (−1 Herz).", win: "ih2", lose: "ih1", loseHp: 1, loseText: "Deine Füße rutschen weg und du schlitterst auf dem Hosenboden zurück zum Eingang. Die Fledermaus-Zuschauer kichern. Bestimmt." },
    },
    {
      id: "ih2", scene: "ruine",
      text: `Unten öffnet sich eine Halle voller Glühwürmchen — wie ein Sternenhimmel unter der Erde! An der Wand lehnt eine verblichene <strong>Piratenflagge</strong>, und darunter, in einer Blechdose: das <strong>dritte Kartenstück</strong>. Auf die Dose hat jemand gekritzelt: „Für den, der keine Angst hat. — K.“`,
      choices: [
        { label: "🗺️ Kartenstück und Flagge mitnehmen", to: "i4", take: ["karte3"] },
        { label: "Den Glühwürmchen noch tiefer in den Berg folgen", to: "ih3", take: ["karte3"], hideIf: ["saebel"], secret: true },
      ],
    },

    {
      id: "id0", scene: "dschungel",
      text: `Der Dschungelpfad gabelt sich: Geradeaus wartet die moosbewachsene <strong>Steinstatue</strong> mit grimmigem Gesicht — Wächterin des Weges, heißt es. Rechts gluckert ein <strong>flacher Fluss</strong> talwärts, vermutlich Richtung Wasserfall. {hat:coco?Coco zupft an deinem Ohr: „Statue! Statue klug!“ — oder war das eine Warnung?:}`,
      hints: [
        `Beide Wege führen zum Wasserfall — die Statue prüft dein Köpfchen, der Fluss dein Glück.`,
        `Der Fluss klappt nur ab einer 5 (Kitzelfische!). Die Statue stellt dir dafür eine Rechenaufgabe.`,
      ],
      choices: [
        { label: "🗿 Zur Statue — ich stelle mich dem Rätsel", to: "id1" },
        { label: "🌊 Durch den Fluss waten (nur ab 5!)", to: "id_fluss" },
      ],
    },
    {
      id: "id_fluss",
      dice: { text: "Barfuß durch den Fluss voller kitzliger Putzerfische — das hält nur aus, wer eine 5 oder 6 würfelt! Bei 1–4 lachst du dich kraftlos (−1 Herz).", threshold: 5, win: "id2", lose: "id0", loseHp: 1, loseText: "Hihihi — hahaha — NEIN! Die Kitzelfische sind gnadenlos. Du rettest dich japsend ans Ufer zurück und brauchst erstmal eine Pause." },
    },
    {
      id: "ih3", scene: "ruine",
      text: `Die Glühwürmchen schwirren voraus, tiefer und tiefer — bis sich eine kleine Kammer öffnet: <strong>Knochenbeins alte Übungshöhle!</strong> An der Wand Kreidestriche von Fecht-Übungen, und in einem Felsspalt steckt sein <strong>alter Säbel</strong> — stumpf wie ein Butterbrotmesser, aber als Hebel unbezahlbar. Du ziehst ihn mit beiden Händen heraus. <em>Schhhrk!</em>`,
      choices: [{ label: "🗡️ Was für ein Fund! Zurück zum Lager", to: "i4", take: ["saebel"] }],
    },
    {
      id: "i6", scene: "ruine",
      text: `Drei Schritte nach Osten — du klopfst auf den Boden: <em>hohl!</em> Unter dem Moos: eine Steinplatte mit einem <strong>Zahlenschloss</strong> aus Drehringen … und an der Seite ein schmaler, verkeilter <strong>Spalt</strong>, wie gemacht für ein langes, flaches Stück Metall.`,
      hints: [
        `Zwei Wege unter die Platte: das Zahlenschloss knacken — oder kräftig hebeln, wenn du das richtige Werkzeug hast.`,
        `{hat:saebel?Der richtige Schritt: Knochenbeins Säbel in den Spalt und hebeln!:Mit Knochenbeins Säbel (versteckt bei den Glühwürmchen in der Felshöhle) könntest du die Platte einfach aufhebeln. Sonst: rechnen!}`,
      ],
      choices: [
        { label: "🔢 Das Zahlenschloss knacken (Rätsel)", to: "i6r" },
        { label: "🗡️ Mit Knochenbeins Säbel aufhebeln", to: "i7", require: ["saebel"], lockHint: "Dafür bräuchtest du etwas Langes, Flaches aus Metall … die Glühwürmchen in der Felshöhle wissen mehr." },
      ],
    },

    // --- Ruine & Finale ---
    {
      id: "i5", scene: "ruine",
      text: `Die zusammengesetzte Karte führt dich mitten in den Dschungel — zu einer überwucherten <strong>Piratenruine</strong> mit einem Tor in Form eines Totenkopfs. Auf der Karte steht in krakeliger Schrift: „Stell dich ins Tor. Geh dann 3 Schritte dorthin, wo die Sonne AUFGEHT. Dort klopfe an.“ Du stehst im Tor. Wohin gehst du?`,
      riddle: { question: "Wo geht die Sonne auf — in welche Himmelsrichtung gehst du?", options: ["Nach Osten", "Nach Westen", "Nach Norden", "Nach Süden"], answer: 0, hint: "Merksatz: Im OSTEN geht die Sonne auf, im Süden steigt sie hoch …", win: "i6" },
    },
    {
      id: "i6r", scene: "ruine",
      text: `Drei Schritte nach Osten — du klopfst auf den Boden: <em>hohl!</em> Unter dem Moos: eine Steinplatte mit eingemeißelten Zeichen und einem Drehschloss aus Zahlenringen. Darüber steht: „Knochenbeins Lieblingszahl: <strong>7 × 7 − 7</strong>“`,
      riddle: { question: "7 × 7 − 7 = ?", answer: "42", hint: "Erst 7 × 7 rechnen, dann 7 abziehen.", win: "i7" },
    },
    {
      id: "i7", scene: "ruine",
      text: `<em>Klonk. Krrrr.</em> Die Platte schwingt auf — eine kleine Kammer, und darin: <strong>die Schatztruhe!</strong> Goldmünzen, eine Schiffsglocke, ein Fernrohr … und obenauf ein ledergebundenes <strong>Tagebuch</strong>. {hat:coco?Coco hüpft auf die Truhe und ruft triumphierend: „Knochenbein! Knochenbein!“:}`,
      hints: [
        `Das Tagebuch zu lesen kostet nichts — und ein echter Pirat hat dir vielleicht noch etwas zu sagen.`,
        `Der richtige Schritt: Lies erst das Tagebuch! Knochenbeins letzter Wunsch verändert dein Ende — und bringt dir den Erfolg „Ehrenpirat“.`,
      ],
      choices: [
        { label: "📜 Erst das Tagebuch lesen", to: "i7b", take: ["tagebuch"] },
        { label: "💰 Schatz einpacken und los!", to: "i8" },
      ],
    },
    {
      id: "i7b", scene: "ruine",
      text: `Du blätterst durch vergilbte Seiten. Die letzte lautet: „<em>An den, der dies findet: Ich war Käpt'n Knochenbein, und diese Insel war mein einziger Freund. Nimm den Schatz — er hat mir kein Glück gebracht. Aber tu mir einen Gefallen: Lass die Insel schöner zurück, als du sie fandest. Und grüß meinen Papagei.</em>“ {hat:coco?Du schaust Coco an. Coco schaut dich an. „Krah“, sagt er leise. Jetzt ergibt alles einen Sinn.:} Du beschließt, den Wunsch zu erfüllen: Du räumst dein Lager auf, pflanzt die Kokosnuss-Setzlinge am Strand ein und legst die Schiffsglocke als Denkmal vor die Ruine.`,
      choices: [{ label: "🏴‍☠️ Knochenbein ehren — dann nach Hause", to: "i8", take: ["respekt"] }],
    },
    {
      id: "i8", scene: "strand",
      text: `Zurück am Strand. Aus Wrackplanken, Lianen und der alten Piratenflagge als Segel könnte man ein Boot bauen — wenn man das richtige Werkzeug hätte.`,
      choices: [
        { label: "🧰 Mit der Werkzeugkiste das Boot bauen", to: "i9", require: ["werkzeug"], lockHint: "Mit bloßen Händen wird das nichts. Im Wrack in der Lagune gab es Werkzeug …" },
      ],
    },
    {
      id: "i9", scene: "heimkehr", end: "win",
      text: `Drei Tage später sticht dein selbstgebautes Boot in See — die Schatztruhe sicher verzurrt, die Piratenflagge bläht sich im Wind. {hat:coco?Coco sitzt auf deiner Schulter und kommt natürlich mit. Ein Piratenpapagei gehört aufs Meer!:Vom Strand aus winkt dir der Papagei hinterher — er bleibt der Wächter der Insel.} {hat:respekt?Hinter dir leuchtet die Insel grüner als je zuvor, und in der Bucht — die du feierlich „Knochenbein-Bucht“ getauft hast — bimmelt leise die Schiffsglocke.} {hat:perle?Nachts weist dir die Leuchtperle den Kurs wie ein kleiner Leuchtturm in deiner Hand.} Und als am Horizont endlich die Lichter des Hafens auftauchen, weißt du: Das war nicht dein letztes Abenteuer. Aber es war dein größtes — <strong>bis jetzt</strong>.`,
    },
  ],
};

const SCENES_FUSSBALL = {
  stadion: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="f_s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc4e8"/><stop offset="1" stop-color="#d8ecf8"/></linearGradient></defs><rect width="400" height="140" fill="url(#f_s)"/><rect y="140" width="400" height="100" fill="#5a9b4f"/><rect y="140" width="400" height="100" fill="none"/><line x1="200" y1="140" x2="200" y2="240" stroke="#e8f5e4" stroke-width="3"/><circle cx="200" cy="195" r="28" stroke="#e8f5e4" stroke-width="3" fill="none"/><rect x="20" y="160" width="50" height="60" stroke="#e8f5e4" stroke-width="3" fill="none"/><rect x="330" y="160" width="50" height="60" stroke="#e8f5e4" stroke-width="3" fill="none"/><rect x="30" y="80" width="340" height="40" fill="#7d8694"/><rect x="30" y="80" width="340" height="14" fill="#a8b2c0"/><circle cx="120" cy="205" r="9" fill="#fff"/><path d="M115 201 l5 3 l5 -3 M120 204 v6" stroke="#2d2a26" stroke-width="1.5" fill="none"/><polygon points="350,40 362,66 390,70 368,88 374,116 350,100 326,116 332,88 310,70 338,66" fill="#f4d35e"/></svg>`,
  kabine: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#3a4356"/><rect x="0" y="190" width="400" height="50" fill="#2c3342"/><rect x="30" y="50" width="100" height="90" rx="6" fill="#4a5468"/><rect x="150" y="50" width="100" height="90" rx="6" fill="#4a5468"/><rect x="270" y="50" width="100" height="90" rx="6" fill="#4a5468"/><rect x="55" y="62" width="50" height="62" fill="#e2725b"/><rect x="175" y="62" width="50" height="62" fill="#53a0e2"/><rect x="295" y="62" width="50" height="62" fill="#53c06a"/><text x="68" y="100" font-size="26" fill="#fff">7</text><text x="186" y="100" font-size="26" fill="#fff">10</text><text x="310" y="100" font-size="26" fill="#fff">1</text><circle cx="90" cy="170" r="12" fill="#fff"/><path d="M84 165 l6 4 l6 -4 M90 169 v8" stroke="#2d2a26" stroke-width="2" fill="none"/><rect x="160" y="155" width="80" height="30" rx="6" fill="#6e7a92"/><line x1="170" y1="170" x2="230" y2="170" stroke="#8fd0e8" stroke-width="3"/><polygon points="230,162 240,170 230,178" fill="#8fd0e8"/></svg>`,
  nebel: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#2a3142"/><rect y="150" width="400" height="90" fill="#3c5a3e"/><circle cx="80" cy="40" r="14" fill="#f4f1e4"/><rect x="60" y="20" width="40" height="8" fill="#5a6478"/><circle cx="320" cy="40" r="14" fill="#f4f1e4"/><rect x="300" y="20" width="40" height="8" fill="#5a6478"/><ellipse cx="120" cy="170" rx="90" ry="22" fill="#c8cfd8" opacity=".55"><animate attributeName="cx" values="120;160;120" dur="6s" repeatCount="indefinite"/></ellipse><ellipse cx="290" cy="195" rx="110" ry="26" fill="#c8cfd8" opacity=".5"><animate attributeName="cx" values="290;240;290" dur="7s" repeatCount="indefinite"/></ellipse><ellipse cx="200" cy="150" rx="120" ry="18" fill="#c8cfd8" opacity=".4"><animate attributeName="cx" values="200;230;200" dur="5s" repeatCount="indefinite"/></ellipse><circle cx="200" cy="190" r="9" fill="#fff"/><circle cx="150" cy="120" r="10" fill="#e6e9f2" opacity=".8"/><ellipse cx="150" cy="142" rx="8" ry="14" fill="#e6e9f2" opacity=".7"/><circle cx="260" cy="115" r="10" fill="#e6e9f2" opacity=".7"/><ellipse cx="260" cy="137" rx="8" ry="14" fill="#e6e9f2" opacity=".6"/></svg>`,
  finale: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#1d2436"/><rect y="150" width="400" height="90" fill="#3c6a44"/><line x1="200" y1="150" x2="200" y2="240" stroke="#dfe9dd" stroke-width="3"/><circle cx="200" cy="200" r="26" stroke="#dfe9dd" stroke-width="3" fill="none"/><polygon points="40,20 70,20 90,70 20,70" fill="#fff8d8" opacity=".25"/><polygon points="330,20 360,20 380,70 310,70" fill="#fff8d8" opacity=".25"/><circle cx="55" cy="18" r="10" fill="#fff3c4"/><circle cx="345" cy="18" r="10" fill="#fff3c4"/><rect x="150" y="90" width="100" height="34" rx="8" fill="#2c3342"/><text x="166" y="114" font-size="20" fill="#f4d35e">1 : 1</text><circle cx="200" cy="194" r="9" fill="#fff"/><circle cx="120" cy="175" r="9" fill="#e2725b"/><ellipse cx="120" cy="196" rx="7" ry="13" fill="#e2725b"/><circle cx="280" cy="172" r="9" fill="#9a3d8f"/><ellipse cx="280" cy="193" rx="7" ry="13" fill="#9a3d8f"/></svg>`,
  podium: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="f_p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff9d6b"/></linearGradient></defs><rect width="400" height="240" fill="url(#f_p)"/><circle cx="120" cy="36" r="5" fill="#e2535b"/><circle cx="200" cy="24" r="5" fill="#53a0e2"/><circle cx="290" cy="40" r="5" fill="#53c06a"/><circle cx="60" cy="56" r="4" fill="#7a4ec9"/><circle cx="340" cy="60" r="4" fill="#e2c153"/><rect x="140" y="130" width="120" height="80" fill="#c9a06a"/><rect x="40" y="160" width="100" height="50" fill="#d8b683"/><rect x="260" y="175" width="100" height="35" fill="#d8b683"/><text x="186" y="180" font-size="28" fill="#7a5a36">1</text><circle cx="200" cy="98" r="13" fill="#ffd9b8"/><ellipse cx="200" cy="122" rx="11" ry="16" fill="#e2725b"/><path d="M178 104 q-10 8 -8 20 M222 104 q10 8 8 20" stroke="#e2725b" stroke-width="6" fill="none"/><circle cx="200" cy="74" r="11" fill="#e2c153"/><rect x="193" y="83" width="14" height="7" fill="#c9a93a"/><path d="M186 74 a14 9 0 0 0 28 0" stroke="#c9a93a" stroke-width="3" fill="none"/></svg>`,
};

const FUSSBALL = {
  id: "fussball",
  emoji: "⚽",
  title: "Pokal der Legenden",
  tagline: "Führe den FC Wirbelwind durch das magischste Turnier aller Zeiten.",
  maxHp: 5,
  items: {
    training_schuss: "⚽ Spezialschuss", training_pass: "🎯 Pass-Magie", training_kondition: "🏃 Turbo-Kondition",
    teamgeist: "🤝 Teamgeist", fairplay: "🏵️ Fairplay-Herz", spion1: "🕵️ Roboter-Spielanalyse",
  },
  rescue: { text: "Trainerin Tante Resi drückt dir Tee und eine Banane in die Hand. „Champions fallen hin und stehen wieder auf“, sagt sie und klopft dir auf die Schulter. Du fühlst dich wie neu!", to: "f3" },
  achievements: [
    { id: "fairplay", emoji: "🏵️", label: "Fairplay-Legende — Sieg ist nicht alles", test: (s) => s.items.includes("fairplay") },
    { id: "teamplayer", emoji: "🤝", label: "Teamplayer — den Streit geschlichtet", test: (s) => s.items.includes("teamgeist") },
    { id: "glueckskind", emoji: "🍀", label: "Glückskind — kein einziger Pechwurf", test: (s) => s.diceLost === 0 },
    { id: "unverwundbar", emoji: "💪", label: "Unverwundbar — mit vollen Herzen ins Ziel", test: (s) => s.hp >= 5 },
  ],
  start: "f1",
  scenes: SCENES_FUSSBALL,
  nodes: [
    {
      id: "f1", scene: "stadion",
      text: `Ein Brief mit goldenem Wappen liegt im Vereinsheim des <strong>FC Wirbelwind</strong> — eurem kleinen Club mit dem buckligen Bolzplatz: „<em>Hiermit laden wir euch zum POKAL DER LEGENDEN ein — dem geheimsten Turnier der Welt. Es zählt nicht, wer am besten kickt. Es zählt, wer das größte Herz hat.</em>“ Deine Mannschaft starrt dich an. Du bist die Kapitänin beziehungsweise der Kapitän. Na dann!`,
      choices: [{ label: "📣 „Leute … wir fahren zum Turnier!“", to: "f2" }],
    },
    {
      id: "f2", scene: "kabine",
      text: `Eine Woche bis zum Turnier — Zeit für <strong>ein</strong> Spezialtraining. Tante Resi, eure Trainerin (und Weltmeisterin im Tee-Kochen), lässt dich wählen: „Was schleifen wir, Käpt'n?“`,
      hints: [
        `Es gibt keine falsche Wahl — aber jedes Training öffnet später in einem anderen Spiel einen sicheren Weg ohne Würfeln.`,
        `Pass-Magie hilft gegen die Roboter, Kondition gegen die Nebelgeister, der Spezialschuss im großen Finale. Der Rest ist Würfelglück — und das geht auch!`,
      ],
      choices: [
        { label: "⚽ Schusstraining — der Unhaltbare", to: "f3", take: ["training_schuss"] },
        { label: "🎯 Passtraining — blindes Verständnis", to: "f3", take: ["training_pass"] },
        { label: "🏃 Kondition — laufen, bis der Rasen glüht", to: "f3", take: ["training_kondition"] },
      ],
    },
    {
      id: "f3", scene: "stadion",
      text: `Das Turnierstadion liegt versteckt in einem Tal und ist … nun ja: <em>magisch</em>. Die Eckfahnen flüstern, der Anstoßkreis leuchtet, und die Anzeigetafel zwinkert dir zu. Die Auslosung: Im Viertelfinale wartet <strong>Robo-Kick 04</strong> — elf höfliche Roboter, die noch nie einen Fehlpass gespielt haben.`,
      choices: [
        { label: "🤖 Anpfiff!", to: "m1" },
        { label: "🕵️ Vorher die Roboter heimlich beim Aufwärmen beobachten", to: "sp1", hideIf: ["spion1"] },
      ],
    },
    {
      id: "m1", scene: "stadion",
      text: `Die Roboter passen sich den Ball zu wie ein Uhrwerk: <em>tak-tak-tak</em>. Nach zehn Minuten habt ihr den Ball noch kaum berührt! In der Trinkpause schaut dich das Team hilfesuchend an. Dein Plan, Käpt'n?`,
      hints: [
        `Roboter sind perfekt — aber nur bei Dingen, die man berechnen kann.`,
        `{hat:training_pass?Der richtige Schritt: Eure Pass-Magie ist schneller als jeder Prozessor — nutzt sie!:Ohne Pass-Training bleibt das Chaos-Spiel mit hohen Bällen und Würfelglück. Und falls es schiefgeht: Tante Resis Taktiktafel rettet euch.}`,
      ],
      choices: [
        { label: "🎯 Pass-Magie auspacken: schneller als ihr Prozessor!", to: "m1b", require: ["training_pass"], lockHint: "Dafür hättet ihr Passtraining gebraucht." },
        { label: "🚀 Mit hohen, wilden Bällen Chaos stiften", to: "m1_dice" },
        { label: "🕵️ Eure Spielanalyse ausnutzen: Ihr kennt ihr Muster!", to: "m1b", showIf: ["spion1"] },
      ],
    },
    {
      id: "m1_dice",
      dice: { text: "Wilde hohe Bälle gegen Roboter-Logik! Bei 4–6 rechnet ihr Mittelfeld sich heiß, bei 1–3 fängt ihr Torwart-Roboter alles ab und ihr rennt euch müde (−1 Herz).", win: "m1b", lose: "m1c", loseHp: 1, loseText: "Der Torwart-Roboter pflückt jeden Ball aus der Luft und sagt höflich „DANKE FÜR DIE SPENDE“. Rückstand 0:1 — Auszeit!" },
    },
    {
      id: "m1c", scene: "kabine",
      text: `Auszeit. Tante Resi malt wilde Pfeile auf ihre Tafel: „Diese Blechkameraden <em>berechnen</em> jeden eurer Pässe im Voraus. Also, Schlaukopf: Was bringt einen Computer durcheinander?“`,
      riddle: { question: "Was bringt die Roboter aus dem Takt?", options: ["Überraschende Richtungswechsel, die keiner Logik folgen", "Noch schnellere Pässe", "Härtere Schüsse", "Lautes Rufen"], answer: 0, hint: "Was man nicht berechnen kann, kann man nicht abfangen …", win: "m1b" },
    },
    {
      id: "m1b", scene: "stadion",
      text: `Ihr spielt plötzlich <em>verrückt</em>: Hackentricks, Drehungen, Pässe ohne hinzusehen! Die Roboter-Augen blinken rot: „FEHLER. FEHLER. UNLOGISCH.“ Zweimal schlägt es hinter ihrem verdutzten Torwart ein — <strong>2:1, Sieg!</strong> Die Roboter gratulieren höflich und ölen sich die Tränen weg. Doch abends in der Kabine fliegen die Fetzen: Stürmer <strong>Ben</strong> brüllt Torhüterin <strong>Lena</strong> an, sie sei am Gegentor schuld. Lena schreit zurück. Das Team schaut zu dir.`,
      choices: [
        { label: "🤝 Beide an einen Tisch holen und zuhören", to: "f4" },
        { label: "😤 Machtwort: „Schluss jetzt, ihr spielt beide!“", to: "f4b" },
      ],
    },
    {
      id: "f4b", scene: "kabine",
      text: `Es wird still — aber es ist die <em>falsche</em> Stille. Ben und Lena schauen aneinander vorbei, und beim Frühstück sitzt das Team in zwei Grüppchen. So gewinnt man kein Turnier der Herzen. Vielleicht solltest du es nochmal anders versuchen.`,
      choices: [{ label: "🤝 Okay. Reden. Richtig.", to: "f4" }],
    },
    {
      id: "f4", scene: "kabine",
      text: `Du setzt dich mit beiden hin. Ben gesteht: Er hat Angst, dass er nicht gut genug ist — sein großer Bruder lacht über den „Mini-Club“. Lena gibt zu: Der hohe Ball war wirklich schwer zu halten, aber das Anschreien tat weh. Am Ende klatschen sie ein. „Für den Wirbelwind“, sagt Ben leise. „Für uns alle“, sagt Lena. Das Team rückt zusammen wie nie zuvor.`,
      choices: [{ label: "🌫️ Weiter zum Halbfinale — gegen die Nebelgeister!", to: "f5", take: ["teamgeist"] }],
    },
    {
      id: "f5", scene: "nebel",
      text: `Flutlicht, Flügelrauschen — und dann rollt dichter <strong>Nebel</strong> übers Feld: Die <strong>Nebelgeister</strong> sind da. Man sieht kaum die eigene Schuhspitze, und die Geister tauchen mal hier, mal dort aus dem Dunst auf. Wie wollt ihr DAS gewinnen?`,
      hints: [
        `Wenn man nichts SIEHT, müssen andere Sinne übernehmen … oder ganz viel Puste.`,
        `{hat:training_kondition?Der richtige Schritt: Mit eurer Turbo-Kondition lauft ihr die Geister in der zweiten Halbzeit einfach schwindelig!:Ohne Konditionstraining hilft Lenas Zuruf-System — mit etwas Würfelglück. Und falls es schiefgeht, gibt es eine zweite Chance mit einem Zahlen-Trick.}`,
      ],
      choices: [
        { label: "🏃 Turbo-Kondition: lauft sie in Halbzeit zwei schwindelig!", to: "m2win", require: ["training_kondition"], lockHint: "Dafür hättet ihr Konditionstraining gebraucht." },
        { label: "🗣️ Blind-Pass-Trick: Lena dirigiert euch mit Rufen", to: "m2_dice" },
      ],
    },
    {
      id: "m2_dice",
      dice: { text: "Blindpässe nach Lenas Kommandos durch den Nebel! Bei 4–6 klappt das Zuruf-System, bei 1–3 lauft ihr gegeneinander (−1 Herz, autsch).", win: "m2win", lose: "m2c", loseHp: 1, loseText: "RUMMS — du und Ben, Stirn an Stirn. Ihr seht Sternchen, die Nebelgeister kichern wie zugige Fenster. Lena pfeift euch zur Auszeit." },
    },
    {
      id: "m2c", scene: "nebel",
      text: `Lena hat das Zuruf-System verbessert: „Hört GENAU hin! Ich rufe Zahlen. <strong>Ungerade Zahl = Pass nach links. Gerade Zahl = Pass nach rechts.</strong>“ Der Nebel wird dichter, das Spiel läuft wieder — und da ruft Lena aus dem Tor: „SIEBEN!“`,
      riddle: { question: "Lena ruft „SIEBEN!“ — wohin spielst du den Pass?", options: ["Nach links (7 ist ungerade)", "Nach rechts (7 ist gerade)"], answer: 0, hint: "Gerade Zahlen kann man durch 2 teilen: 2, 4, 6, 8 … die 7 nicht.", win: "m2win" },
    },
    {
      id: "m2win", scene: "nebel",
      text: `Es funktioniert! Ihr spielt wie ein einziger Organismus mit zwanzig Beinen — die Nebelgeister wabern ratlos hin und her, und kurz vor Schluss schlenzt Ben das <strong>2:1</strong> ins Netz! Als sich der Nebel hebt, applaudieren die Geister mit leisem Heulen. Ihr steht im <strong>FINALE</strong> — gegen den haushohen Favoriten: <strong>Drachenherz FC</strong>.`,
      choices: [{ label: "🐉 Finale. Anpfiff!", to: "m3" }],
    },
    {
      id: "m3", scene: "finale",
      text: `Das Finale ist ein Krimi: <strong>1:1</strong>, letzte Minute. Da passiert es — <strong>Feuerlilie</strong>, die Kapitänin von Drachenherz, knickt im Mittelfeld um und bleibt liegen. Der Schiedsrichter sieht es nicht! Der Ball ist bei DIR, das Tor ist frei, alle schreien „SCHIESS!“ …`,
      hints: [
        `Was zählt bei diesem Turnier nochmal am allermeisten? Es stand im Einladungsbrief …`,
        `Der richtige Schritt: Schieß den Ball ins Aus, damit Feuerlilie geholfen wird. Fairplay wird in diesem Stadion belohnt — versprochen. (Und es bringt den schönsten Erfolg des Spiels.)`,
      ],
      choices: [
        { label: "🏵️ Ball ins Aus schießen, damit ihr geholfen wird", to: "m3b", take: ["fairplay"] },
        { label: "⚽ Weiterspielen — Regeln sind Regeln", to: "m3c" },
      ],
    },
    {
      id: "m3c", scene: "finale",
      text: `Du ziehst ab — aber der Ball will nicht: Er trudelt lasch am Tor vorbei, als hätte er keine Lust. Das magische Stadion <em>raunt</em> missbilligend, die Eckfahnen schauen weg, und dir wird flau im Magen. Feuerlilie liegt immer noch am Boden. Es ist nicht zu spät, das Richtige zu tun.`,
      choices: [{ label: "🏵️ Spiel unterbrechen und Hilfe holen", to: "m3b", take: ["fairplay"] }],
    },
    {
      id: "m3b", scene: "finale",
      text: `Du schießt den Ball ins Aus und winkst die Betreuer aufs Feld. Das ganze Stadion erhebt sich und <strong>applaudiert</strong> — sogar die Drachenherz-Fans! Feuerlilie wird verarztet, humpelt zurück und klopft dir auf die Schulter: „Jetzt verstehe ich, warum dieses Turnier euch eingeladen hat.“ Dann gibt Drachenherz den Ball fair an euch zurück. Verlängerung? Nein: <strong>Elfmeterschießen!</strong> Und der letzte, alles entscheidende Elfer gehört … dir.`,
      hints: [
        `{hat:training_schuss?Der richtige Schritt: Jetzt zahlt sich das Schusstraining aus — der Unhaltbare!:Ohne Spezialschuss bleibt nur Mut und Würfelglück. Aber keine Angst: Verlieren kannst du hier nicht endgültig — Lena hält dir den Rücken frei.}`,
      ],
      choices: [
        { label: "⚽ Der Unhaltbare — dein Spezialschuss!", to: "ende", require: ["training_schuss"], lockHint: "Den Spezialschuss hättet ihr im Training üben müssen." },
        { label: "🍀 Anlauf, Augen zu und volles Risiko", to: "m3_dice" },
      ],
    },
    {
      id: "m3_dice",
      dice: { text: "Der entscheidende Elfmeter! Bei 4–6 schlägt der Ball unhaltbar ein, bei 1–3 hält der Drachen-Torwart — aber Lena hält danach auch (−1 Herz vor Aufregung) und du darfst nochmal.", win: "ende", lose: "m3b2", loseHp: 1, loseText: "Gehalten! Doch dann fliegt LENA wie ein Luchs durchs Bild und hält den Gegen-Elfer! Es geht in die nächste Runde — und wieder liegt der Ball vor dir." },
    },
    {
      id: "m3b2", scene: "finale",
      text: `Das Stadion hält den Atem an. Ben flüstert: „Du schaffst das, Käpt'n.“ {hat:teamgeist?Hinter dir steht das ganze Team Schulter an Schulter — und plötzlich fühlt sich der Ball ganz leicht an.:}`,
      choices: [{ label: "⚽ Noch einmal anlaufen!", to: "m3_dice" }],
    },
    {
      id: "sp1", scene: "stadion",
      text: `Vom Zaun aus beobachtet ihr das Aufwärmen der Roboter — und Lena notiert mit: Sie spielen ihre Pässe in einem festen Muster! <em>Links, links, rechts. Links, links, rechts. Links, links, …</em>`,
      riddle: { question: "Links, links, rechts — links, links, rechts — links, links, … Wohin geht der nächste Pass?", options: ["Nach rechts", "Noch einmal links", "Geradeaus", "Das Muster wechselt jetzt"], answer: 0, hint: "Das Muster ist ein Dreierpack: links, links, RECHTS. Zähl nach, wo ihr gerade steht: zwei „links“ sind schon vorbei …", win: "sp2" },
    },
    {
      id: "sp2", scene: "kabine",
      text: `„Dreierpack-Muster, immer gleich!“, flüstert Lena und malt es ins Spielheft. Ben grinst: „Wenn wir wissen, wohin sie passen, BEVOR sie passen …“ Das Team nickt sich zu. Mit dieser <strong>Spielanalyse</strong> könnt ihr die Roboter abfangen wie ein Uhrwerk.`,
      choices: [{ label: "Jetzt aber: Anpfiff!", to: "f3", take: ["spion1"] }],
    },
    {
      id: "ende", scene: "podium", end: "win",
      text: `<strong>TOOOOR!</strong> Der Ball zappelt im Netz, und das magische Stadion explodiert in Gold und Konfetti! Der FC Wirbelwind — der kleine Club mit dem buckligen Bolzplatz — gewinnt den <strong>Pokal der Legenden</strong>! {hat:fairplay?Feuerlilie humpelt aufs Podium und hängt dir ihre eigene Kapitänsbinde um: „Für das größte Herz des Turniers.“ Die flüsternden Eckfahnen singen deinen Namen.} {hat:teamgeist?Ben und Lena stemmen den Pokal gemeinsam in den Himmel — und keiner erinnert sich mehr, worüber sie sich je gestritten haben.} Auf der Heimfahrt schlaft ihr alle im Bus ein, den Pokal in der Mitte festgeschnallt wie ein Teammitglied. Und das ist er ja jetzt auch.`,
    },
  ],
};

export const MORE_ADVENTURES = [DETEKTIV, INSEL, FUSSBALL];
