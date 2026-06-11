// Handgeschriebene, verzweigte Abenteuer — laufen komplett offline.
//
// Knoten-Format:
//   { id, scene?, text(HTML), choices: [{label, to, take?, drop?, hp?, require?, lockHint?}] }
//   { id, dice: {text, win, lose, loseHp} }      → Würfelprobe (4-6 = Erfolg)
//   { id, riddle: {question, options?|answer, hint, win} }  → Rätsel (Retry mit Hinweis)
//   { id, end: "win", text }                      → Happy End

const SCENES_DRACHE = {
  dorf: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d_sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d93a8"/><stop offset="1" stop-color="#cfd3da"/></linearGradient></defs><rect width="400" height="240" fill="url(#d_sky)"/><circle cx="330" cy="50" r="24" fill="#e8e4d8"/><polygon points="0,180 70,90 140,180" fill="#6b7280"/><polygon points="90,180 180,70 270,180" fill="#7d8694"/><rect x="40" y="150" width="50" height="50" fill="#9c8a74"/><polygon points="35,150 65,120 95,150" fill="#7a6450"/><rect x="120" y="160" width="44" height="40" fill="#a89882"/><polygon points="115,160 142,134 169,160" fill="#7a6450"/><rect x="250" y="155" width="56" height="45" fill="#94846e"/><polygon points="244,155 278,124 312,155" fill="#6e5a46"/><rect x="0" y="198" width="400" height="42" fill="#8a8f7a"/><rect x="58" y="170" width="12" height="16" fill="#4a4036"/><circle cx="200" cy="40" r="2" fill="#fff"/><path d="M150 215 q50 -10 100 0" stroke="#6f7462" stroke-width="3" fill="none"/></svg>`,
  wald: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#2e3b33"/><circle cx="60" cy="45" r="18" fill="#d8d3c0" opacity=".7"/><rect x="0" y="190" width="400" height="50" fill="#24302a"/><rect x="60" y="110" width="16" height="85" fill="#4d3b2a"/><circle cx="68" cy="92" r="42" fill="#3f6648"/><rect x="170" y="95" width="18" height="100" fill="#54422f"/><circle cx="179" cy="74" r="50" fill="#467350"/><rect x="300" y="120" width="15" height="75" fill="#4d3b2a"/><circle cx="307" cy="100" r="38" fill="#3f6648"/><circle cx="250" cy="170" r="6" fill="#e2725b"/><circle cx="120" cy="180" r="5" fill="#e2a25b"/><ellipse cx="225" cy="205" rx="16" ry="8" fill="#c96f3f"/><circle cx="240" cy="198" r="7" fill="#c96f3f"/><polygon points="244,193 248,186 250,194" fill="#c96f3f"/></svg>`,
  see: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d_w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b7d9e"/><stop offset="1" stop-color="#33536f"/></linearGradient></defs><rect width="400" height="120" fill="#9fb4c4"/><circle cx="80" cy="50" r="20" fill="#eef0e8"/><rect y="120" width="400" height="120" fill="url(#d_w)"/><path d="M0 140 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#7e9cb6" stroke-width="4" fill="none"/><path d="M0 175 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#456c8c" stroke-width="4" fill="none"/><path d="M150 150 q50 -28 100 0 l-12 16 q-38 -18 -76 0 z" fill="#7a5a3a"/><rect x="196" y="108" width="6" height="42" fill="#5a4128"/><polygon points="202,110 240,128 202,140" fill="#ddd3b8"/><circle cx="320" cy="150" r="10" fill="#6f8a5e"/><circle cx="330" cy="142" r="6" fill="#6f8a5e"/></svg>`,
  berge: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d_b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c97a"/><stop offset="1" stop-color="#d99a5b"/></linearGradient></defs><rect width="400" height="240" fill="url(#d_b)"/><circle cx="200" cy="60" r="26" fill="#fbe7b2"/><polygon points="-20,240 110,60 240,240" fill="#8a6d54"/><polygon points="110,60 80,105 140,105" fill="#f5efe2"/><polygon points="160,240 290,90 400,240" fill="#75593f"/><polygon points="290,90 264,130 316,130" fill="#f5efe2"/><ellipse cx="90" cy="70" rx="30" ry="10" fill="#fff" opacity=".8"/><ellipse cx="320" cy="50" rx="36" ry="11" fill="#fff" opacity=".8"/><circle cx="252" cy="150" r="6" fill="#2d2a26"/><polygon points="252,150 270,142 268,156" fill="#2d2a26"/></svg>`,
  hoehle: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#191625"/><path d="M0 240 L0 60 Q200 -40 400 60 L400 240 Z" fill="#241f33"/><path d="M40 240 L60 140 L90 240 Z" fill="#191625"/><path d="M330 240 L350 120 L385 240 Z" fill="#191625"/><circle cx="200" cy="150" r="34" fill="#3a2f55"/><circle cx="188" cy="142" r="5" fill="#f4a83c"/><circle cx="214" cy="142" r="5" fill="#f4a83c"/><path d="M160 190 q40 24 80 0" stroke="#574a80" stroke-width="6" fill="none"/><path d="M120 110 q18 -30 40 -16 M280 110 q-18 -30 -40 -16" stroke="#3a2f55" stroke-width="10" fill="none"/><circle cx="100" cy="200" r="4" fill="#f4a83c"/><circle cx="300" cy="205" r="4" fill="#f4a83c"/></svg>`,
  fest: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d_f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff9d6b"/></linearGradient></defs><rect width="400" height="240" fill="url(#d_f)"/><circle cx="200" cy="58" r="30" fill="#fff3c4"/><rect x="0" y="190" width="400" height="50" fill="#7da05f"/><rect x="50" y="150" width="50" height="50" fill="#c9a06a"/><polygon points="44,150 75,118 106,150" fill="#a5552f"/><rect x="270" y="150" width="56" height="50" fill="#d3ab74"/><polygon points="264,150 298,116 332,150" fill="#a5552f"/><path d="M60 80 q60 50 120 18 q50 -26 90 6" stroke="#7a4ec9" stroke-width="9" fill="none"/><circle cx="270" cy="104" r="16" fill="#7a4ec9"/><circle cx="265" cy="100" r="3" fill="#fff"/><circle cx="276" cy="100" r="3" fill="#fff"/><path d="M262 110 q8 7 16 0" stroke="#fff" stroke-width="2" fill="none"/><circle cx="120" cy="60" r="5" fill="#e2535b"/><circle cx="150" cy="40" r="5" fill="#53a0e2"/><circle cx="330" cy="70" r="5" fill="#e2c153"/><line x1="100" y1="130" x2="220" y2="105" stroke="#b3463a" stroke-width="2"/><polygon points="120,126 132,123 126,134" fill="#e2535b"/><polygon points="160,118 172,115 166,126" fill="#53c06a"/></svg>`,
};

const DRACHENFEUER = {
  id: "drachenfeuer",
  emoji: "🐉",
  title: "Drachenfeuer",
  tagline: "Der Schattendrache hat alle Farben gestohlen. Hol sie zurück!",
  maxHp: 5,
  items: {
    seil: "🪢 Seil", laterne: "🏮 Laterne", brot: "🥖 Honigbrot",
    fuchs: "🦊 Funke der Fuchs", glitzerstein: "💎 Glitzerstein",
    k_rot: "🔴 Roter Kristall", k_blau: "🔵 Blauer Kristall", k_gold: "🟡 Goldener Kristall",
  },
  rescue: { text: "Alles wird schwarz … doch dann riechst du Kräutertee. Meisterin Lumina hat dich gefunden und gesund gepflegt. „Kopf hoch“, sagt sie. „Jede Heldin und jeder Held stolpert mal.“ Du bist wieder bei Kräften!", to: "gabelung" },
  achievements: [
    { id: "tierfreund", emoji: "🦊", label: "Tierfreund — Funke den Fuchs befreit", test: (s) => s.items.includes("fuchs") },
    { id: "friedensstifter", emoji: "🕊️", label: "Friedensstifter — nie wütend geworden", test: (s) => !s.visited.includes("dh2_fight") && !s.visited.includes("se3_fail") },
    { id: "hoehlenforscher", emoji: "🏮", label: "Höhlenforscher — die geheimen Zeichnungen entdeckt", test: (s) => s.visited.includes("dh1b") },
    { id: "unverwundbar", emoji: "💪", label: "Unverwundbar — mit vollen Herzen ins Ziel", test: (s) => s.hp >= 5 },
  ],
  start: "start",
  scenes: SCENES_DRACHE,
  nodes: [
    {
      id: "start", scene: "dorf",
      text: `Du wachst auf — und erschrickst: <em>Funkenfels ist grau.</em> Die roten Dächer, die blauen Fahnen, das goldene Kornfeld: alles farblos wie alter Nebel. Meisterin Lumina, die Drachenhüterin, wartet schon vor deiner Tür. „Der Schattendrache Umbra ist erwacht und hat alle Farben des Landes gestohlen", sagt sie ernst. „Nur die <strong>drei Farbkristalle</strong> können sie zurückbringen: der rote im Feuerwald, der blaue im See der Spiegel, der goldene in den Wolkenbergen. Du bist mein bester Lehrling — geh!"`,
      choices: [{ label: "Ich packe meine Tasche!", to: "packen" }],
    },
    {
      id: "packen", scene: "dorf",
      text: `Lumina hält dir drei Dinge hin: „Mehr kannst du nicht tragen — wähl <strong>eines</strong> weise."`,
      choices: [
        { label: "🪢 Das Seil (gut zum Klettern)", to: "gabelung", take: ["seil"] },
        { label: "🏮 Die Laterne (gegen die Dunkelheit)", to: "gabelung", take: ["laterne"] },
        { label: "🥖 Das Honigbrot (Tiere lieben es)", to: "gabelung", take: ["brot"] },
      ],
    },
    {
      id: "gabelung", scene: "dorf",
      text: `Hinter dem Dorf teilt sich der Weg an einem alten Wegweiser. Drei verwitterte Pfeile: <strong>Feuerwald</strong> 🌲, <strong>See der Spiegel</strong> 🌊, <strong>Wolkenberge</strong> ⛰️. Wo die Kristalle schon leuchten, musst du nicht mehr hin.`,
      choices: [
        { label: "🌲 In den Feuerwald (roter Kristall)", to: "fw1", hideIf: ["k_rot"] },
        { label: "🌊 Zum See der Spiegel (blauer Kristall)", to: "se1", hideIf: ["k_blau"] },
        { label: "⛰️ In die Wolkenberge (goldener Kristall)", to: "wb1", hideIf: ["k_gold"] },
        { label: "🐉 Zur Drachenhöhle!", to: "dh1", require: ["k_rot", "k_blau", "k_gold"], lockHint: "Du brauchst erst alle drei Kristalle." },
      ],
    },

    // ----- Feuerwald (rot) -----
    {
      id: "fw1", scene: "wald",
      text: `Der Feuerwald war einmal flammend rot — jetzt stehen die Bäume aschgrau da. Plötzlich hörst du ein Wimmern: Ein junger Fuchs hängt mit der Pfote in einer alten Schlingfalle und schaut dich mit großen Augen an.`,
      choices: [
        { label: "Den Fuchs vorsichtig befreien", to: "fw2", take: ["fuchs"] },
        { label: "Keine Zeit — leise weitergehen", to: "fw3" },
      ],
    },
    {
      id: "fw2", scene: "wald",
      text: `Du löst die Schlinge, der Fuchs schüttelt sich — und folgt dir auf Schritt und Tritt. „Ich nenne dich <strong>Funke</strong>", sagst du. Er scheint einverstanden. {hat:brot?Du teilst dein Honigbrot mit ihm, und er springt vor Freude im Kreis. Mit so einem Freund fühlst du dich gleich stärker! ❤️ +1 Herz}`,
      effectIf: { hat: "brot", hp: +1 },
      choices: [{ label: "Weiter, tiefer in den Wald", to: "fw3" }],
    },
    {
      id: "fw3", scene: "wald",
      text: `Eine tiefe Schlucht schneidet den Weg ab. Die Hängebrücke? Nur noch zwei traurige Seile und ein Brett. Auf der anderen Seite glimmt es schwach rot zwischen den Felsen — da musst du hin!`,
      choices: [
        { label: "🪢 Mit dem Seil sichern und hinüberhangeln", to: "fw4", require: ["seil"], lockHint: "Dafür bräuchtest du ein Seil." },
        { label: "Anlauf nehmen und springen!", to: "fw3_dice" },
      ],
    },
    {
      id: "fw3_dice",
      dice: { text: "Ein weiter Sprung über die Schlucht! Bei 4–6 landest du sicher, bei 1–3 schrammst du am Rand entlang (−1 Herz).", win: "fw4", lose: "fw4", loseHp: 1, loseText: "Autsch! Du rutschst ab, krallst dich an einer Wurzel fest und ziehst dich hoch. Das brennt — aber du lebst." },
    },
    {
      id: "fw4", scene: "wald",
      text: `Hinter der Schlucht: die <strong>Höhle der Glut</strong>. Der Eingang ist von einem steinernen Zahlenschloss versperrt. Eingemeißelt steht dort: <em>„Nenne mir das Ergebnis, so alt wie die Antwort auf alles: 6 × 7."</em>`,
      riddle: { question: "Was ist 6 × 7?", answer: "42", hint: "Rechne 6 × 7 — du kannst auch 6 × 5 und 6 × 2 zusammenzählen.", win: "fw5" },
    },
    {
      id: "fw5", scene: "wald",
      text: `<em>Krrrrk!</em> Das Schloss springt auf. In der Höhle schwebt der <strong>rote Kristall</strong> über einem Steinsockel und taucht alles in warmes Licht. Du nimmst ihn behutsam — und entdeckst daneben einen kleinen <strong>Glitzerstein</strong>, der wie ein Sternsplitter funkelt. Den steckst du auch ein, man weiß ja nie. Als du heraustrittst, schimmern die ersten Baumkronen wieder zartrosa!`,
      choices: [{ label: "Zurück zur Weggabelung", to: "gabelung", take: ["k_rot", "glitzerstein"] }],
    },

    // ----- See der Spiegel (blau) -----
    {
      id: "se1", scene: "see",
      text: `Der See der Spiegel liegt still und grau wie eine alte Münze. Am Steg sitzt <strong>Bodo der Biber</strong>, Bootsverleiher und Rätselfreund. „Mein Boot kost' normalerweise drei Taler", schnauft er. „Aber für Helden gilt: Ein Rätsel, eine Fahrt. Pass auf: <em>Was wird nasser, je mehr es trocknet?</em>"`,
      riddle: { question: "Was wird nasser, je mehr es trocknet?", options: ["Ein Handtuch", "Ein Schwamm", "Der Regen", "Ein Fisch"], answer: 0, hint: "Denk daran, was DU benutzt, um dich abzutrocknen …", win: "se2" },
    },
    {
      id: "se2", scene: "see",
      text: `„Haha, richtig! Ein Handtuch!" Bodo klatscht mit dem Schwanz aufs Wasser. Du ruderst los. In der Seemitte zieht plötzlich Nebel auf, und das Wasser beginnt sich zu drehen — ein <strong>Strudel</strong>!`,
      choices: [{ label: "Mit aller Kraft dagegen anrudern!", to: "se2_dice" }],
    },
    {
      id: "se2_dice",
      dice: { text: "Rudern gegen den Strudel! Bei 4–6 entkommst du elegant, bei 1–3 schluckst du ordentlich Seewasser (−1 Herz).", win: "se3", lose: "se3", loseHp: 1, loseText: "Das Boot dreht sich dreimal im Kreis, du gehst kurz über Bord — prustend ziehst du dich wieder hinein. Brrr!" },
    },
    {
      id: "se3", scene: "see",
      text: `Am anderen Ufer wartet eine Gestalt aus Wasser und Mondlicht: <strong>Marina, der Seegeist</strong>. In ihren Händen ruht der blaue Kristall. „Viele kamen und <em>forderten</em>", sagt sie leise. „Was tust du?"`,
      choices: [
        { label: "„Gib mir sofort den Kristall!“", to: "se3_fail" },
        { label: "Höflich bitten und ihre Geschichte anhören", to: "se4" },
      ],
    },
    {
      id: "se3_fail", scene: "see",
      text: `Marinas Augen werden dunkel wie ein Gewittersee. Eine Welle wirft dich von den Füßen (−1 Herz). „Versuch es noch einmal", rauscht sie, „aber diesmal … wie ein Freund."`,
      effect: { hp: -1 },
      choices: [{ label: "Tief durchatmen und es besser machen", to: "se4" }],
    },
    {
      id: "se4", scene: "see",
      text: `Du setzt dich zu ihr ans Ufer. Marina erzählt vom Drachen Umbra, der früher jeden Sommer am See spielte — bis die Menschen anfingen, ihn zu fürchten. „Seitdem ist er allein. Und Einsamkeit", sagt sie, „macht Herzen dunkel." Sie legt den <strong>blauen Kristall</strong> in deine Hände. „Bring die Farben zurück. Und wenn du Umbra triffst: <em>Hör ihm zu.</em>" Der See glitzert wieder tiefblau, als du gehst.`,
      choices: [{ label: "Zurück zur Weggabelung", to: "gabelung", take: ["k_blau"] }],
    },

    // ----- Wolkenberge (gold) -----
    {
      id: "wb1", scene: "berge",
      text: `Die Wolkenberge ragen vor dir auf wie schlafende Riesen. Der Pfad endet an einer steilen Felswand — hoch oben kreischt der Wind.`,
      choices: [
        { label: "🪢 Mit dem Seil einen sicheren Aufstieg bauen", to: "wb2", require: ["seil"], lockHint: "Ohne Seil bleibt nur freies Klettern." },
        { label: "Frei klettern — du schaffst das!", to: "wb1_dice" },
      ],
    },
    {
      id: "wb1_dice",
      dice: { text: "Freiklettern an der Felswand! Bei 4–6 findest du sichere Griffe, bei 1–3 schürfst du dir die Hände auf (−1 Herz).", win: "wb2", lose: "wb2", loseHp: 1, loseText: "Ein Stein bricht heraus! Du fängst dich auf einem Sims, die Handflächen brennen. Langsam, aber sicher geht es weiter nach oben." },
    },
    {
      id: "wb2", scene: "berge",
      text: `Auf dem Grat versperrt dir <strong>Karla die Krähe</strong> den Weg — groß wie ein Hund und doppelt so frech. „Hier kommt nur vorbei, wer mir was <em>Glänzendes</em> schenkt", krächzt sie und legt den Kopf schief.`,
      choices: [
        { label: "💎 Ihr den Glitzerstein schenken", to: "wb3", require: ["glitzerstein"], drop: ["glitzerstein"], lockHint: "Du hast gerade nichts Glänzendes dabei … (Tipp: Im Feuerwald soll es funkeln.)" },
        { label: "Versuchen, dich vorbeizuschleichen", to: "wb2_dice" },
        { label: "Umkehren und später wiederkommen", to: "gabelung" },
      ],
    },
    {
      id: "wb2_dice",
      dice: { text: "An einer Riesenkrähe vorbeischleichen … Bei 4–6 ist sie kurz abgelenkt, bei 1–3 erwischt dich ein Schnabelzwicker (−1 Herz).", win: "wb3", lose: "wb2", loseHp: 1, loseText: "„KRAAH! Schummeln gilt nicht!“ Karla zwickt dich in den Rucksack und stellt sich wieder mitten in den Weg." },
    },
    {
      id: "wb3", scene: "berge",
      text: `Der Gipfel! Zwischen den Wolken hängt eine <strong>Treppe aus Sonnenstrahlen</strong> — aber sie trägt nur den, der sie zählt. Eine Stimme im Wind raunt: <em>„Drei Absätze hat mein Weg: zwölf Stufen, dann neun, dann sechs. Wie viele trägst du insgesamt?"</em>`,
      riddle: { question: "12 + 9 + 6 = ?", answer: "27", hint: "Rechne erst 12 + 9, dann zähle 6 dazu.", win: "wb4" },
    },
    {
      id: "wb4", scene: "berge",
      text: `„Siebenundzwanzig", sagst du — und die Treppe wird fest unter deinen Füßen. Oben, in einem Nest aus Wolkenwatte, liegt der <strong>goldene Kristall</strong>, warm wie ein kleines Stück Sommer. Als du ihn aufhebst, bricht die Sonne durch und färbt die Gipfel wieder golden!`,
      choices: [{ label: "Zurück zur Weggabelung", to: "gabelung", take: ["k_gold"] }],
    },

    // ----- Finale -----
    {
      id: "dh1", scene: "hoehle",
      text: `Die drei Kristalle summen leise in deiner Tasche, als du den Eingang der <strong>Drachenhöhle</strong> erreichst. Drinnen: Dunkelheit, dick wie Tinte.`,
      choices: [
        { label: "🏮 Die Laterne anzünden und eintreten", to: "dh1b", require: ["laterne"], lockHint: "Ohne Licht bleibt nur das vorsichtige Tasten." },
        { label: "Im Dunkeln vorwärtstasten", to: "dh1_dice" },
      ],
    },
    {
      id: "dh1b", scene: "hoehle",
      text: `Im Laternenschein entdeckst du etwas Erstaunliches: Die Höhlenwände sind voller <strong>Kohlezeichnungen</strong>. Ein Drache, der mit Kindern spielt. Ein Drache, der Laternenfeste anzündet. Und dann: ein Drache, ganz allein, Bild um Bild um Bild. Dir wird das Herz schwer. <em>Marina hatte recht.</em>`,
      choices: [{ label: "Weiter, zur großen Halle", to: "dh2" }],
    },
    {
      id: "dh1_dice",
      dice: { text: "Blind durch die Drachenhöhle … Bei 4–6 findest du den Weg, bei 1–3 stolperst du laut über einen Knochenhaufen (−1 Herz).", win: "dh2", lose: "dh2", loseHp: 1, loseText: "SCHEPPER! Du fällst über etwas, das verdächtig nach altem Geschirr klingt. Ein tiefes Grollen rollt durch den Berg. Er weiß jetzt, dass du da bist." },
    },
    {
      id: "dh2", scene: "hoehle",
      text: `Die große Halle. Zwei Augen wie Bernsteinlampen öffnen sich in der Finsternis — <strong>Umbra</strong>, der Schattendrache, größer als das Rathaus von Funkenfels. Um ihn herum wirbeln alle gestohlenen Farben wie ein gefangener Regenbogen. „<em>Noch ein Mensch</em>", grollt er. „<em>Kommst du mit Fackeln und Mistgabeln, wie all die anderen?</em>"`,
      choices: [
        { label: "⚔️ Angreifen, solange er spricht!", to: "dh2_fight" },
        { label: "„Warum hast du die Farben genommen?“", to: "dh2b" },
        { label: "Ruhig die drei Kristalle zeigen", to: "dh3" },
      ],
    },
    {
      id: "dh2_fight", scene: "hoehle",
      text: `Du stürmst los — und Umbra pustet dich um wie eine Kerze (−1 Herz). Aber er tritt nicht nach. Er seufzt nur, tief und müde, und Asche rieselt von der Decke. „<em>Siehst du</em>", sagt er leise. „<em>So geht das immer.</em>" Irgendetwas sagt dir: Kämpfen ist hier die falsche Antwort.`,
      effect: { hp: -1 },
      choices: [
        { label: "„Warum hast du die Farben genommen?“", to: "dh2b" },
        { label: "Ruhig die drei Kristalle zeigen", to: "dh3" },
      ],
    },
    {
      id: "dh2b", scene: "hoehle",
      text: `Umbra blinzelt — mit dieser Frage hat er nicht gerechnet. „<em>Früher gehörte ich dazu</em>", grollt er leise. „<em>Ich habe die Laternen am Sommerfest entzündet. Dann kam die Angst in eure Köpfe, und niemand kam mehr. Da dachte ich: Wenn ihr mir die Freude nehmt … nehme ich eure Farben.</em>" Eine Träne, groß wie ein Kürbis, zischt auf dem Höhlenboden.`,
      choices: [{ label: "Die Kristalle zeigen — und ihm eine Hand reichen", to: "dh3" }],
    },
    {
      id: "dh3", scene: "hoehle",
      text: `Du legst die drei Kristalle in den alten Farbaltar in der Hallenmitte. Rot, Blau und Gold steigen auf und mischen sich mit Umbras gefangenem Regenbogen. „Die Farben gehören uns <strong>allen</strong>", sagst du. „Dir auch. Komm mit nach Funkenfels — als Gast. Ich lade dich ein." Umbra starrt dich lange an. Dann, ganz vorsichtig, nickt der riesige Kopf.`,
      choices: [{ label: "Gemeinsam zurück ins Dorf", to: "ende" }],
    },
    {
      id: "ende", scene: "fest", end: "win",
      text: `Als ihr Funkenfels erreicht, explodiert die Welt in Farben: rote Dächer, blaue Fahnen, goldenes Korn — und ein lila Drache mittendrin! Erst weichen die Leute zurück … doch dann zündet Umbra mit einem winzigen Feuerhauch die Festlaternen an, genau wie früher. Jemand lacht, jemand klatscht, und plötzlich ist es das schönste Sommerfest aller Zeiten. Meisterin Lumina legt dir die Hand auf die Schulter: „Du hast nicht den Drachen besiegt", sagt sie und zwinkert, „sondern die Einsamkeit. <strong>Das ist die hohe Kunst der Drachenhüter.</strong>"${""}`,
    },
  ],
};

const SCENES_RAUM = {
  korridor: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#10131f"/><polygon points="0,0 400,0 320,60 80,60" fill="#1b2233"/><polygon points="0,240 400,240 320,180 80,180" fill="#161c2b"/><polygon points="0,0 80,60 80,180 0,240" fill="#222b42"/><polygon points="400,0 320,60 320,180 400,240" fill="#222b42"/><rect x="80" y="60" width="240" height="120" fill="#0b0e18"/><circle cx="200" cy="120" r="40" fill="#0b0e18" stroke="#3b4a73" stroke-width="6"/><circle cx="185" cy="105" r="3" fill="#fff"/><circle cx="220" cy="130" r="2" fill="#fff"/><circle cx="205" cy="145" r="2" fill="#9fd4ff"/><rect x="95" y="100" width="14" height="40" rx="4" fill="#f4a83c"/><rect x="291" y="100" width="14" height="40" rx="4" fill="#53c06a"/><line x1="80" y1="120" x2="0" y2="120" stroke="#3b4a73" stroke-width="3"/><line x1="320" y1="120" x2="400" y2="120" stroke="#3b4a73" stroke-width="3"/></svg>`,
  bruecke: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#0b0e18"/><rect x="20" y="20" width="360" height="130" rx="10" fill="#060912" stroke="#3b4a73" stroke-width="4"/><circle cx="90" cy="70" r="3" fill="#fff"/><circle cx="160" cy="50" r="2" fill="#fff"/><circle cx="300" cy="90" r="3" fill="#fff"/><circle cx="250" cy="40" r="2" fill="#9fd4ff"/><circle cx="200" cy="85" r="22" fill="#7d8694"/><circle cx="193" cy="80" r="4" fill="#2d2a26"/><circle cx="230" cy="115" r="10" fill="#9aa3c0"/><circle cx="130" cy="110" r="14" fill="#847d72"/><rect x="40" y="160" width="320" height="50" rx="8" fill="#1b2233"/><rect x="60" y="172" width="60" height="26" rx="4" fill="#223455"/><rect x="130" y="172" width="60" height="26" rx="4" fill="#2a4a33"/><rect x="200" y="172" width="60" height="26" rx="4" fill="#4a2a33"/><circle cx="300" cy="185" r="12" fill="#f4a83c"/></svg>`,
  maschinenraum: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#141320"/><rect x="150" y="40" width="100" height="160" rx="14" fill="#202840" stroke="#3b4a73" stroke-width="4"/><circle cx="200" cy="120" r="32" fill="#0b0e18" stroke="#b3463a" stroke-width="5"/><path d="M200 96 v48 M176 120 h48" stroke="#b3463a" stroke-width="5"/><rect x="40" y="80" width="70" height="120" rx="8" fill="#1b2233"/><rect x="52" y="95" width="46" height="10" fill="#53c06a"/><rect x="52" y="115" width="46" height="10" fill="#f4a83c"/><rect x="52" y="135" width="46" height="10" fill="#b3463a"/><rect x="300" y="80" width="60" height="120" rx="8" fill="#1b2233"/><path d="M110 200 q90 26 190 0" stroke="#3b4a73" stroke-width="6" fill="none"/><circle cx="330" cy="110" r="9" fill="#f4a83c"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle></svg>`,
  lager: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#0d0f17"/><rect x="30" y="60" width="90" height="60" rx="6" fill="#2a3149"/><rect x="30" y="130" width="90" height="60" rx="6" fill="#222840"/><rect x="280" y="60" width="90" height="130" rx="6" fill="#2a3149"/><rect x="45" y="75" width="60" height="12" fill="#3b4a73"/><rect x="45" y="145" width="60" height="12" fill="#3b4a73"/><ellipse cx="200" cy="170" rx="48" ry="36" fill="#53c06a"/><ellipse cx="200" cy="178" rx="56" ry="26" fill="#46a85b"/><circle cx="184" cy="158" r="7" fill="#0d0f17"/><circle cx="216" cy="158" r="7" fill="#0d0f17"/><circle cx="186" cy="156" r="2.5" fill="#fff"/><circle cx="218" cy="156" r="2.5" fill="#fff"/><path d="M182 184 q18 14 36 0" stroke="#0d0f17" stroke-width="4" fill="none"/><circle cx="160" cy="120" r="3" fill="#9fd4ff"/><circle cx="245" cy="105" r="2" fill="#9fd4ff"/></svg>`,
  erde: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#060912"/><circle cx="120" cy="40" r="2" fill="#fff"/><circle cx="320" cy="60" r="3" fill="#fff"/><circle cx="60" cy="120" r="2" fill="#fff"/><circle cx="350" cy="160" r="2" fill="#9fd4ff"/><circle cx="200" cy="150" r="80" fill="#3b6fae"/><path d="M150 110 q30 -16 60 0 q20 12 44 4 q-8 36 -44 30 q-40 -6 -60 -34" fill="#53a05e"/><path d="M160 190 q40 18 80 0 q-20 22 -80 0" fill="#53a05e"/><ellipse cx="200" cy="150" rx="80" ry="80" fill="#9fd4ff" opacity=".12"/><polygon points="300,40 312,66 340,70 318,88 324,116 300,100 276,116 282,88 260,70 288,66" fill="#f4d35e"/><rect x="80" y="30" width="44" height="18" rx="9" fill="#7d8694"/><circle cx="124" cy="39" r="7" fill="#9fd4ff"/></svg>`,
};

const STERNENBASIS = {
  id: "sternenbasis",
  emoji: "🚀",
  title: "Sternenbasis 7",
  tagline: "Allein auf der Raumstation — bring sie sicher zur Erde zurück!",
  maxHp: 5,
  items: {
    lampe: "🔦 B0Bs Ersatzlampe", pudding: "🍮 Astronautenpudding",
    ersatzteil: "🔧 Energiekristall", glibbi: "🟢 Glibbi (Maskottchen)",
  },
  rescue: { text: "Piep-piep! B0B zieht dich mit seinem Greifarm in die MedBay und verpasst dir ein Pflaster mit Raketenmuster. „REPARATUR ABGESCHLOSSEN. BITTE NICHT MEHR KAPUTTGEHEN“, schnarrt er. Du bist wieder fit!", to: "s2" },
  achievements: [
    { id: "puddingdiplomat", emoji: "🍮", label: "Pudding-Diplomat — Glibbi friedlich überzeugt", test: (s) => s.items.includes("tausch") },
    { id: "lichtblick", emoji: "🔦", label: "Lichtblick — nie blind durchs Dunkel gestolpert", test: (s) => !s.visited.includes("l1_dice") },
    { id: "blitzpilot", emoji: "🚀", label: "Blitz-Pilot — in höchstens 14 Schritten heim", test: (s) => s.steps <= 14 },
    { id: "unverwundbar", emoji: "💪", label: "Unverwundbar — mit vollen Herzen ins Ziel", test: (s) => s.hp >= 5 },
  ],
  start: "s1",
  scenes: SCENES_RAUM,
  nodes: [
    {
      id: "s1", scene: "korridor",
      text: `<em>ALARM. ALARM.</em> Du schreckst aus der Schlafkoje hoch. Die Gänge der Sternenbasis 7 sind leer, das Licht flackert rot. Auf dem Bildschirm blinkt: „CREW EVAKUIERT". Alle weg — nur du hast die Durchsage verschlafen! Da rollt <strong>B0B</strong> um die Ecke, der alte Bord-Roboter. „GUTEN M-M-MORGEN, JUNIOR-KADETT", stottert er. „KLEINE LAGE-INFO: REAKTOR AUS. STATION TREIBT. ASTEROIDENFELD VORAUS. SONST ALLES BESTENS."`,
      choices: [{ label: "„B0B — was machen wir zuerst?“", to: "s2" }],
    },
    {
      id: "s2", scene: "korridor",
      text: `B0B rattert eine Liste herunter: „EMPFEHLUNG: ERSTENS REAKTOR IM <strong>MASCHINENRAUM</strong> STARTEN. ZWEITENS KURS AUF DER <strong>BRÜCKE</strong> SETZEN. REIHENFOLGE: EGAL. PANIK: NICHT HILFREICH."`,
      choices: [
        { label: "🔧 In den Maschinenraum", to: "m1", hideIf: ["ersatzteil_done"] },
        { label: "🧭 Auf die Brücke", to: "b1" },
      ],
    },

    // ----- Maschinenraum-Strang -----
    {
      id: "m1", scene: "maschinenraum",
      text: `Der Reaktor ist dunkel und kalt. In der Halterung, wo der <strong>Energiekristall</strong> stecken sollte: ein leeres Loch. B0B leuchtet hinein. „DIAGNOSE: KRISTALL FEHLT. LETZTE ORTUNG: <strong>LAGERRAUM 3</strong>. WARNUNG: DORT WURDEN … GERÄUSCHE GEMELDET."`,
      choices: [
        { label: "Ab in den Lagerraum 3!", to: "l1" },
        { label: "Erst in der Küche Proviant holen", to: "k1" },
      ],
    },
    {
      id: "k1", scene: "korridor",
      text: `In der Bordküche schwebt das Geschirr durcheinander — die Schwerkraft spinnt mal wieder. Du schnappst dir einen <strong>Astronautenpudding</strong> (Geschmacksrichtung: Galaktische Vanille). B0B piept: „GUTE WAHL. PUDDING LÖST 87 % ALLER PROBLEME."`,
      choices: [{ label: "Weiter zum Lagerraum 3", to: "l1", take: ["pudding"] }],
    },
    {
      id: "l1", scene: "lager",
      text: `Lagerraum 3 ist stockdunkel. Zwischen den Kisten: ein Glucksen. Ein Schmatzen. Und zwei große Augen, die im Dunkeln leuchten …`,
      choices: [
        { label: "🔦 B0Bs Ersatzlampe holen und anknipsen", to: "l2", take: ["lampe"] },
        { label: "Mutig im Dunkeln auf die Augen zugehen", to: "l1_dice" },
      ],
    },
    {
      id: "l1_dice",
      dice: { text: "Im Dunkeln durch den Kistenstapel … Bei 4–6 kommst du elegant durch, bei 1–3 kracht dir eine Kiste Schraubenmüsli auf den Fuß (−1 Herz).", win: "l2", lose: "l2", loseHp: 1, loseText: "RUMMS! Eine Kiste kippt, tausend Schräubchen kullern. Der Fuß tut weh, aber jetzt bist du nah genug dran." },
    },
    {
      id: "l2", scene: "lager",
      text: `Vor dir sitzt ein Wesen wie ein riesiger grüner Wackelpudding mit Kulleraugen — ein <strong>Glibber</strong>! Er ist als blinder Passagier an Bord gekommen und sieht kein bisschen gefährlich aus. Eher … satt. In seinem durchsichtigen Bauch schimmert etwas Kantiges: <em>der Energiekristall!</em> Er hat ihn verschluckt, weil er so schön geglitzert hat.`,
      choices: [
        { label: "🍮 Den Pudding als Tauschgeschäft anbieten", to: "l3", require: ["pudding"], drop: ["pudding"], take: ["tausch"], lockHint: "Du hast nichts Leckeres dabei. (In der Küche gäbe es was …)" },
        { label: "Ihn vorsichtig durchkitzeln", to: "l2_dice" },
        { label: "Zurück zur Küche, Pudding holen", to: "k1" },
      ],
    },
    {
      id: "l2_dice",
      dice: { text: "Glibber-Kitzeln ist Glückssache: Bei 4–6 prustet er den Kristall heraus, bei 1–3 verschluckt er aus Versehen auch noch deinen Ärmel (−1 Herz).", win: "l3", lose: "l2", loseHp: 1, loseText: "„Glllrrp!“ Der Glibber hickst und zieht dir den halben Ärmel ein. Du bekommst ihn zurück — voller Glibberschleim. Neuer Versuch?" },
    },
    {
      id: "l3", scene: "lager",
      text: `<em>Plöpp!</em> Der Glibber spuckt den Energiekristall aus (zum Glück völlig sauber — Glibber verdauen nur Süßes) und kullert dir hinterher wie ein glücklicher Gummiball. „ANALYSE", piept B0B: „DAS WESEN HAT DICH ADOPTIERT." Du taufst ihn <strong>Glibbi</strong>. Im Maschinenraum rastet der Kristall mit einem satten <em>KLONK</em> ein — die Lichter der Station flammen auf!`,
      choices: [{ label: "Jetzt zur Brücke!", to: "b1", take: ["ersatzteil", "glibbi", "ersatzteil_done"] }],
    },

    // ----- Brücken-Strang -----
    {
      id: "b1", scene: "bruecke",
      text: `Die Brücke. Durch das Panoramafenster siehst du sie: <strong>Asteroiden</strong>, groß wie Schulturnhallen, und die Station treibt mitten hinein! {hat:ersatzteil_done?Die Konsolen leuchten — volle Energie. Zeit für ein Ausweichmanöver!:Die Konsolen sind dunkel — ohne Reaktor gibt es nur die Not-Steuerdüsen. Das wird wackelig!}`,
      choices: [{ label: "🕹️ Ans Steuer — Ausweichmanöver!", to: "b1_dice" }],
    },
    {
      id: "b1_dice",
      dice: { text: "Slalom durchs Asteroidenfeld! Bei 4–6 fliegst du wie ein Profi, bei 1–3 schrammt ein Brocken die Außenhaut (−1 Herz).", win: "b2", lose: "b2", loseHp: 1, loseText: "KLONG! Ein Asteroid küsst die Station. Funken sprühen, du wirst gegen den Sitz gedrückt — aber die Hülle hält. Weiter!" },
    },
    {
      id: "b2", scene: "bruecke",
      text: `Geschafft — freier Weltraum! Der Bordcomputer meldet sich mit blecherner Stimme: „KURS ERDE BEREIT. ZUR FREIGABE BITTE SICHERHEITSFRAGE BEANTWORTEN: <em>Was ist 9 × 8?</em>" B0B flüstert: „ICH DARF NICHT VORSAGEN. ABER ICH GLAUBE AN DICH."`,
      riddle: { question: "Was ist 9 × 8?", answer: "72", hint: "Tipp: 10 × 8 ist 80 — und dann ein Achterpack weniger.", win: "b3" },
    },
    {
      id: "b3", scene: "bruecke",
      text: `„FREIGABE ERTEILT", schnurrt der Computer. {hat:ersatzteil_done?Mit vollem Reaktorschub schwenkt die Sternenbasis 7 auf Heimatkurs.:„HINWEIS: OHNE REAKTOR KEIN HAUPTANTRIEB. BITTE ENERGIEKRISTALL EINSETZEN." B0B räuspert sich elektrisch: „MASCHINENRAUM. ICH SAGE ES NUR UNGERN."}`,
      choices: [
        { label: "🌍 Heimflug starten!", to: "ende", require: ["ersatzteil_done"], lockHint: "Erst muss der Reaktor laufen — der Kristall fehlt noch." },
        { label: "🔧 In den Maschinenraum", to: "m1", hideIf: ["ersatzteil_done"] },
      ],
    },
    {
      id: "ende", scene: "erde", end: "win",
      text: `Die Erde wächst im Fenster heran, blau und rund und wunderschön. Im Funkgerät jubelt die Crew, die mit ihren Rettungskapseln längst unten wartet: „Sternenbasis 7, wir sehen euch! Wer fliegt das Ding?!" — „Der Junior-Kadett", schnarrt B0B stolz, „MIT AUSZEICHNUNG." Glibbi wabbelt vor Freude. Bei der Landung steht die ganze Crew Spalier, und der Kommandant heftet dir einen funkelnden Orden an: <strong>„Junior-Kapitän der Sternenflotte"</strong>. Glibbi bekommt übrigens auch einen. Er isst ihn sofort auf.`,
    },
  ],
};

import { MORE_ADVENTURES } from "./adventures2.js";

export const ADVENTURES = [DRACHENFEUER, STERNENBASIS, ...MORE_ADVENTURES];

export function getAdventure(id) {
  return ADVENTURES.find((a) => a.id === id) || null;
}
