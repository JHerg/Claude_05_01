// Große Offline-Vokabeldatenbank, nach Klassenstufen sortiert.
// Format: [englisch, deutsch]

export const VOCAB_LEVELS = [
  {
    id: "56", emoji: "🟢", title: "Klasse 5/6",
    desc: "Grundwortschatz: Alltag, Schule, Tiere, Familie & die wichtigsten Verben.",
    sets: [
      {
        id: "tiere", emoji: "🐾", title: "Tiere / Animals",
        words: [["dog", "Hund"], ["cat", "Katze"], ["horse", "Pferd"], ["bird", "Vogel"], ["fish", "Fisch"], ["rabbit", "Kaninchen"], ["mouse", "Maus"], ["bear", "Bär"], ["lion", "Löwe"], ["monkey", "Affe"], ["snake", "Schlange"], ["spider", "Spinne"], ["sheep", "Schaf"], ["cow", "Kuh"], ["pig", "Schwein"], ["fox", "Fuchs"], ["duck", "Ente"], ["frog", "Frosch"], ["butterfly", "Schmetterling"], ["turtle", "Schildkröte"]],
      },
      {
        id: "schule", emoji: "🏫", title: "Schule / School",
        words: [["teacher", "Lehrer/in"], ["pupil", "Schüler/in"], ["classroom", "Klassenzimmer"], ["pencil", "Bleistift"], ["rubber", "Radiergummi"], ["scissors", "Schere"], ["timetable", "Stundenplan"], ["break", "Pause"], ["homework", "Hausaufgaben"], ["subject", "Schulfach"], ["maths", "Mathe"], ["science", "Naturwissenschaften"], ["history", "Geschichte"], ["art", "Kunst"], ["P.E.", "Sport(unterricht)"], ["library", "Bücherei"], ["exercise book", "Heft"], ["schoolbag", "Schulranzen"], ["blackboard", "Tafel"], ["grade", "Note"]],
      },
      {
        id: "essen", emoji: "🍎", title: "Essen & Trinken / Food & drinks",
        words: [["apple", "Apfel"], ["bread", "Brot"], ["cheese", "Käse"], ["chicken", "Hähnchen"], ["potato", "Kartoffel"], ["vegetables", "Gemüse"], ["fruit", "Obst"], ["breakfast", "Frühstück"], ["lunch", "Mittagessen"], ["dinner", "Abendessen"], ["hungry", "hungrig"], ["thirsty", "durstig"], ["delicious", "lecker"], ["sweets", "Süßigkeiten"], ["juice", "Saft"], ["egg", "Ei"], ["butter", "Butter"], ["strawberry", "Erdbeere"], ["sausage", "Wurst"], ["water", "Wasser"]],
      },
      {
        id: "zuhause", emoji: "🏠", title: "Zuhause / At home",
        words: [["kitchen", "Küche"], ["bathroom", "Badezimmer"], ["bedroom", "Schlafzimmer"], ["living room", "Wohnzimmer"], ["garden", "Garten"], ["stairs", "Treppe"], ["window", "Fenster"], ["door", "Tür"], ["table", "Tisch"], ["chair", "Stuhl"], ["cupboard", "Schrank"], ["fridge", "Kühlschrank"], ["mirror", "Spiegel"], ["carpet", "Teppich"], ["lamp", "Lampe"], ["key", "Schlüssel"], ["bed", "Bett"], ["shower", "Dusche"], ["floor", "Boden / Stockwerk"], ["wall", "Wand"]],
      },
      {
        id: "koerper", emoji: "💪", title: "Körper / Body",
        words: [["head", "Kopf"], ["hair", "Haare"], ["eye", "Auge"], ["ear", "Ohr"], ["nose", "Nase"], ["mouth", "Mund"], ["tooth", "Zahn"], ["shoulder", "Schulter"], ["arm", "Arm"], ["hand", "Hand"], ["finger", "Finger"], ["leg", "Bein"], ["knee", "Knie"], ["foot", "Fuß"], ["back", "Rücken"], ["tummy", "Bauch"], ["face", "Gesicht"], ["neck", "Hals"], ["toe", "Zeh"], ["skin", "Haut"]],
      },
      {
        id: "freizeit", emoji: "🎮", title: "Freizeit / Free time",
        words: [["to play", "spielen"], ["to read", "lesen"], ["to swim", "schwimmen"], ["to ride a bike", "Fahrrad fahren"], ["to draw", "zeichnen"], ["to sing", "singen"], ["to dance", "tanzen"], ["hobby", "Hobby"], ["football", "Fußball"], ["game", "Spiel"], ["music", "Musik"], ["movie", "Film"], ["playground", "Spielplatz"], ["holiday", "Ferien/Urlaub"], ["friend", "Freund/in"], ["fun", "Spaß"], ["to collect", "sammeln"], ["team", "Mannschaft"], ["to win", "gewinnen"], ["to lose", "verlieren"]],
      },
      {
        id: "familie", emoji: "👨‍👩‍👧‍👦", title: "Familie & Menschen / Family & people",
        words: [["mother", "Mutter"], ["father", "Vater"], ["parents", "Eltern"], ["brother", "Bruder"], ["sister", "Schwester"], ["grandma", "Oma"], ["grandpa", "Opa"], ["aunt", "Tante"], ["uncle", "Onkel"], ["cousin", "Cousin/Cousine"], ["baby", "Baby"], ["child", "Kind"], ["children", "Kinder"], ["boy", "Junge"], ["girl", "Mädchen"], ["man", "Mann"], ["woman", "Frau"], ["neighbour", "Nachbar/in"], ["twins", "Zwillinge"], ["family", "Familie"]],
      },
      {
        id: "kleidung", emoji: "👕", title: "Kleidung & Farben / Clothes & colours",
        words: [["T-shirt", "T-Shirt"], ["trousers", "Hose"], ["skirt", "Rock"], ["dress", "Kleid"], ["jumper", "Pullover"], ["jacket", "Jacke"], ["shoes", "Schuhe"], ["socks", "Socken"], ["cap", "Kappe"], ["scarf", "Schal"], ["gloves", "Handschuhe"], ["to wear", "tragen (Kleidung)"], ["red", "rot"], ["blue", "blau"], ["green", "grün"], ["yellow", "gelb"], ["black", "schwarz"], ["white", "weiß"], ["purple", "lila"], ["grey", "grau"]],
      },
      {
        id: "wetter", emoji: "🌦️", title: "Wetter & Jahreszeiten / Weather & seasons",
        words: [["sun", "Sonne"], ["sunny", "sonnig"], ["rain", "Regen"], ["rainy", "regnerisch"], ["cloud", "Wolke"], ["cloudy", "bewölkt"], ["wind", "Wind"], ["windy", "windig"], ["snow", "Schnee"], ["storm", "Sturm"], ["fog", "Nebel"], ["hot", "heiß"], ["cold", "kalt"], ["warm", "warm"], ["spring", "Frühling"], ["summer", "Sommer"], ["autumn", "Herbst"], ["winter", "Winter"], ["sky", "Himmel"], ["rainbow", "Regenbogen"]],
      },
      {
        id: "zeit", emoji: "🕐", title: "Zeit & Kalender / Time & calendar",
        words: [["Monday", "Montag"], ["Tuesday", "Dienstag"], ["Wednesday", "Mittwoch"], ["Thursday", "Donnerstag"], ["Friday", "Freitag"], ["Saturday", "Samstag"], ["Sunday", "Sonntag"], ["today", "heute"], ["tomorrow", "morgen"], ["yesterday", "gestern"], ["week", "Woche"], ["month", "Monat"], ["year", "Jahr"], ["hour", "Stunde"], ["minute", "Minute"], ["morning", "Morgen/Vormittag"], ["afternoon", "Nachmittag"], ["evening", "Abend"], ["night", "Nacht"], ["o'clock", "Uhr (bei Uhrzeiten)"]],
      },
      {
        id: "stadt", emoji: "🚦", title: "Stadt & Verkehr / Town & traffic",
        words: [["town", "Stadt"], ["village", "Dorf"], ["street", "Straße"], ["shop", "Geschäft"], ["supermarket", "Supermarkt"], ["bakery", "Bäckerei"], ["church", "Kirche"], ["bridge", "Brücke"], ["car", "Auto"], ["bus", "Bus"], ["train", "Zug"], ["bike", "Fahrrad"], ["station", "Bahnhof"], ["airport", "Flughafen"], ["traffic lights", "Ampel"], ["to turn left", "links abbiegen"], ["to turn right", "rechts abbiegen"], ["straight on", "geradeaus"], ["map", "Karte/Stadtplan"], ["corner", "Ecke"]],
      },
      {
        id: "verben56", emoji: "🏃", title: "Wichtige Verben / Important verbs",
        words: [["to go", "gehen"], ["to come", "kommen"], ["to make / to do", "machen, tun"], ["to say", "sagen"], ["to get", "bekommen"], ["to take", "nehmen"], ["to give", "geben"], ["to see", "sehen"], ["to look", "schauen"], ["to like", "mögen"], ["to live", "wohnen, leben"], ["to eat", "essen"], ["to drink", "trinken"], ["to sleep", "schlafen"], ["to run", "rennen"], ["to help", "helfen"], ["to learn", "lernen"], ["to buy", "kaufen"], ["to open", "öffnen"], ["to close", "schließen"]],
      },
      {
        id: "adjektive56", emoji: "✨", title: "Wichtige Adjektive / Important adjectives",
        words: [["big", "groß"], ["small", "klein"], ["new", "neu"], ["old", "alt"], ["good", "gut"], ["bad", "schlecht"], ["fast", "schnell"], ["slow", "langsam"], ["happy", "glücklich"], ["sad", "traurig"], ["funny", "lustig"], ["boring", "langweilig"], ["easy", "einfach"], ["difficult", "schwierig"], ["beautiful", "schön"], ["ugly", "hässlich"], ["loud", "laut"], ["quiet", "leise"], ["tired", "müde"], ["angry", "wütend"]],
      },
    ],
  },
  {
    id: "89", emoji: "🔵", title: "Klasse 8/9",
    desc: "Aufbauwortschatz: Umwelt, Medien, Gesellschaft, unregelmäßige Verben & typische Stolperfallen.",
    sets: [
      {
        id: "umwelt", emoji: "🌍", title: "Umwelt & Klima / Environment",
        words: [["environment", "Umwelt"], ["climate change", "Klimawandel"], ["pollution", "Verschmutzung"], ["global warming", "Erderwärmung"], ["to recycle", "recyceln"], ["waste / rubbish", "Müll"], ["to protect", "schützen"], ["renewable energy", "erneuerbare Energie"], ["solar power", "Solarenergie"], ["greenhouse effect", "Treibhauseffekt"], ["to pollute", "verschmutzen"], ["endangered species", "bedrohte Tierarten"], ["drought", "Dürre"], ["flood", "Überschwemmung"], ["to waste", "verschwenden"], ["sustainable", "nachhaltig"], ["carbon dioxide", "Kohlendioxid"], ["to reduce", "verringern"], ["resources", "Rohstoffe, Ressourcen"], ["responsibility", "Verantwortung"]],
      },
      {
        id: "medien", emoji: "📱", title: "Medien & Technik / Media & technology",
        words: [["screen", "Bildschirm"], ["keyboard", "Tastatur"], ["to download", "herunterladen"], ["to upload", "hochladen"], ["password", "Passwort"], ["social media", "soziale Medien"], ["to post", "posten, veröffentlichen"], ["news", "Nachrichten"], ["advertisement", "Werbung"], ["to share", "teilen"], ["device", "Gerät"], ["data", "Daten"], ["privacy", "Privatsphäre"], ["cyberbullying", "Cybermobbing"], ["fake news", "Falschnachrichten"], ["to search", "suchen"], ["headline", "Schlagzeile"], ["audience", "Publikum"], ["channel", "Kanal, Sender"], ["to switch off", "ausschalten"]],
      },
      {
        id: "gesellschaft", emoji: "🏛️", title: "Gesellschaft & Politik / Society & politics",
        words: [["government", "Regierung"], ["law", "Gesetz"], ["right", "Recht (z. B. Menschenrecht)"], ["election", "Wahl"], ["to vote", "wählen, abstimmen"], ["citizen", "Bürger/in"], ["freedom", "Freiheit"], ["justice", "Gerechtigkeit"], ["equality", "Gleichberechtigung"], ["poverty", "Armut"], ["wealth", "Reichtum"], ["society", "Gesellschaft"], ["community", "Gemeinschaft"], ["minority", "Minderheit"], ["prejudice", "Vorurteil"], ["discrimination", "Diskriminierung"], ["refugee", "Flüchtling"], ["violence", "Gewalt"], ["peace", "Frieden"], ["demonstration", "Demonstration"]],
      },
      {
        id: "berufe", emoji: "💼", title: "Arbeit & Berufe / Work & jobs",
        words: [["job", "Beruf, Arbeitsstelle"], ["application", "Bewerbung"], ["to apply for", "sich bewerben um"], ["CV", "Lebenslauf"], ["interview", "Vorstellungsgespräch"], ["employer", "Arbeitgeber/in"], ["employee", "Angestellte/r"], ["salary / wages", "Gehalt / Lohn"], ["to earn", "verdienen"], ["experience", "Erfahrung"], ["skills", "Fähigkeiten"], ["training", "Ausbildung"], ["internship", "Praktikum"], ["unemployed", "arbeitslos"], ["full-time", "Vollzeit"], ["part-time", "Teilzeit"], ["colleague", "Kollege/Kollegin"], ["boss", "Chef/in"], ["to hire", "einstellen"], ["career", "Karriere, Laufbahn"]],
      },
      {
        id: "reisen", emoji: "✈️", title: "Reisen & Kultur / Travel & culture",
        words: [["journey", "Reise"], ["abroad", "im Ausland"], ["destination", "Reiseziel"], ["accommodation", "Unterkunft"], ["to book", "buchen"], ["luggage", "Gepäck"], ["customs", "Zoll / Bräuche"], ["sight", "Sehenswürdigkeit"], ["to explore", "erkunden"], ["culture", "Kultur"], ["tradition", "Tradition"], ["foreign", "fremd, ausländisch"], ["language barrier", "Sprachbarriere"], ["exchange", "Austausch"], ["host family", "Gastfamilie"], ["departure", "Abreise, Abflug"], ["arrival", "Ankunft"], ["delay", "Verspätung"], ["passport", "Reisepass"], ["souvenir", "Andenken"]],
      },
      {
        id: "gefuehle", emoji: "💭", title: "Gefühle & Charakter / Feelings & character",
        words: [["confident", "selbstbewusst"], ["shy", "schüchtern"], ["honest", "ehrlich"], ["reliable", "zuverlässig"], ["jealous", "eifersüchtig"], ["proud", "stolz"], ["embarrassed", "verlegen, beschämt"], ["disappointed", "enttäuscht"], ["anxious / worried", "besorgt, ängstlich"], ["excited", "aufgeregt, begeistert"], ["curious", "neugierig"], ["selfish", "egoistisch"], ["generous", "großzügig"], ["polite", "höflich"], ["rude", "unhöflich"], ["sensitive", "sensibel, einfühlsam"], ["stubborn", "stur"], ["lazy", "faul"], ["hard-working", "fleißig"], ["sense of humour", "Sinn für Humor"]],
      },
      {
        id: "gesundheit", emoji: "🏥", title: "Gesundheit & Sport / Health & sports",
        words: [["health", "Gesundheit"], ["healthy", "gesund"], ["illness / disease", "Krankheit"], ["injury", "Verletzung"], ["to hurt", "wehtun, verletzen"], ["pain", "Schmerz"], ["medicine", "Medikament, Medizin"], ["surgery", "Operation / Arztpraxis"], ["to exercise", "Sport treiben"], ["to train", "trainieren"], ["competition", "Wettkampf"], ["to breathe", "atmen"], ["blood", "Blut"], ["heart", "Herz"], ["brain", "Gehirn"], ["nutrition", "Ernährung"], ["addiction", "Sucht"], ["to recover", "sich erholen"], ["first aid", "Erste Hilfe"], ["emergency", "Notfall"]],
      },
      {
        id: "zukunft", emoji: "🎓", title: "Schule & Zukunft / School & future",
        words: [["to graduate", "einen Abschluss machen"], ["degree", "(Studien-)Abschluss"], ["university", "Universität"], ["to attend", "besuchen (Schule/Kurs)"], ["compulsory", "verpflichtend"], ["voluntary", "freiwillig"], ["to achieve", "erreichen"], ["goal / aim", "Ziel"], ["to decide", "entscheiden"], ["decision", "Entscheidung"], ["opportunity", "Gelegenheit, Chance"], ["to improve", "verbessern"], ["knowledge", "Wissen"], ["to fail", "durchfallen, scheitern"], ["to pass an exam", "eine Prüfung bestehen"], ["pressure", "Druck"], ["to expect", "erwarten"], ["future", "Zukunft"], ["abroad year", "Auslandsjahr"], ["scholarship", "Stipendium"]],
      },
      {
        id: "geld", emoji: "💶", title: "Geld & Konsum / Money & consumption",
        words: [["to afford", "sich leisten"], ["expensive", "teuer"], ["cheap", "billig"], ["to spend (money)", "(Geld) ausgeben"], ["to save (money)", "(Geld) sparen"], ["to borrow", "(sich) leihen"], ["to lend", "verleihen"], ["to owe", "schulden"], ["debt", "Schulden"], ["bill", "Rechnung"], ["receipt", "Kassenbon, Quittung"], ["discount", "Rabatt"], ["bargain", "Schnäppchen"], ["customer", "Kunde/Kundin"], ["to order", "bestellen"], ["to deliver", "liefern"], ["brand", "Marke"], ["quality", "Qualität"], ["to compare", "vergleichen"], ["value", "Wert"]],
      },
      {
        id: "irregular", emoji: "🔁", title: "Unregelmäßige Verben / Irregular verbs",
        words: [["go – went – gone", "gehen"], ["see – saw – seen", "sehen"], ["take – took – taken", "nehmen"], ["give – gave – given", "geben"], ["come – came – come", "kommen"], ["know – knew – known", "wissen, kennen"], ["think – thought – thought", "denken"], ["bring – brought – brought", "bringen"], ["buy – bought – bought", "kaufen"], ["catch – caught – caught", "fangen"], ["teach – taught – taught", "unterrichten"], ["fight – fought – fought", "kämpfen"], ["fly – flew – flown", "fliegen"], ["grow – grew – grown", "wachsen"], ["throw – threw – thrown", "werfen"], ["wear – wore – worn", "tragen (Kleidung)"], ["speak – spoke – spoken", "sprechen"], ["steal – stole – stolen", "stehlen"], ["choose – chose – chosen", "wählen, aussuchen"], ["forget – forgot – forgotten", "vergessen"]],
      },
      {
        id: "phrasal", emoji: "🧩", title: "Phrasal Verbs & Wendungen",
        words: [["to look for", "suchen nach"], ["to look after", "sich kümmern um"], ["to look forward to", "sich freuen auf"], ["to give up", "aufgeben"], ["to find out", "herausfinden"], ["to get along with", "auskommen mit"], ["to grow up", "aufwachsen"], ["to set up", "gründen, aufbauen"], ["to turn down", "ablehnen / leiser stellen"], ["to put off", "verschieben"], ["to carry on", "weitermachen"], ["to run out of", "etwas geht aus (z. B. Zeit)"], ["to come up with", "sich ausdenken"], ["to deal with", "umgehen mit, behandeln"], ["to take part in", "teilnehmen an"], ["to make up one's mind", "sich entscheiden"], ["to point out", "hinweisen auf"], ["to figure out", "herausfinden, kapieren"], ["to hand in", "abgeben (z. B. Test)"], ["to show up", "auftauchen, erscheinen"]],
      },
      {
        id: "falsefriends", emoji: "⚠️", title: "False Friends & Stolperfallen",
        words: [["actually", "tatsächlich, eigentlich (NICHT: aktuell)"], ["eventually", "schließlich, irgendwann (NICHT: eventuell)"], ["to become", "werden (NICHT: bekommen)"], ["sensible", "vernünftig (NICHT: sensibel)"], ["sympathetic", "mitfühlend (NICHT: sympathisch)"], ["chef", "Küchenchef (NICHT: Chef)"], ["gift", "Geschenk (NICHT: Gift)"], ["brave", "mutig (NICHT: brav)"], ["fabric", "Stoff (NICHT: Fabrik)"], ["billion", "Milliarde (NICHT: Billion)"], ["gymnasium", "Turnhalle (NICHT: Gymnasium)"], ["to control", "steuern, regeln (oft NICHT: kontrollieren)"], ["consequent", "daraus folgend (NICHT: konsequent)"], ["rent", "Miete (NICHT: Rente)"], ["meaning", "Bedeutung (NICHT: Meinung)"], ["note", "Notiz (NICHT: Schulnote)"], ["fast", "schnell (NICHT: fast)"], ["bald", "kahl, glatzköpfig (NICHT: bald)"], ["also", "auch (NICHT: also)"], ["handy", "praktisch (NICHT: Handy = mobile phone)"]],
      },
    ],
  },
];
