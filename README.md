# 🏠 Familien-Studio

Zwei Welten, eine App — **komplett offline, ohne Anmeldung, ohne Kosten**.
Läuft als statische Seite direkt auf **GitHub Pages** und funktioniert nach dem
ersten Besuch dank Service Worker sogar ganz ohne Internet.

## 🐉 Abenteuer-Maschine

Interaktive Text-Abenteuer für Kinder (ca. 10–12 Jahre) mit allem, was dazugehört:

- **Fünf komplette Abenteuer** (124 Story-Knoten, 27 Szenenbilder, viele alternative Routen und Geheimpfade):
  *Drachenfeuer* (heile den einsamen Schattendrachen), *Sternenbasis 7*
  (allein auf der Raumstation, mit Roboter B0B und Glibberwesen), *Detektivbüro
  Blitz* (Spuren sichern, falsche Fährten erkennen, Alibis prüfen, Anklage erheben),
  *Die vergessene Insel* (Schatzkarte, Papagei Coco, Piratengeheimnis) und
  *Pokal der Legenden* (magisches Fußballturnier, bei dem das Herz zählt).
- **Echte Spielmechanik**: Herzen ❤️, Rucksack 🎒, animierte Würfelproben 🎲,
  Mathe- und Logikrätsel 🧩, geheime Pfade ✨ — und Entscheidungen mit Folgen
  über Handlungsstränge hinweg.
- **Erfolge & Abzeichen** 🏅 pro Abenteuer (z. B. „Fairplay-Legende“,
  „Perlentaucher“) mit Endstatistik und Konfettiregen — hoher Wiederspielwert.
- **Vorlesen** 🔊 per Browser-Sprachausgabe (offline), **Soundeffekte** 🔔
  (synthetisch per WebAudio, abschaltbar), **Erzähl-Animation** und **Logbuch** 📖
  mit der bisherigen Geschichte.
- **Stufenweise Hilfe** 💡: In jeder Szene gibt der „Tipp?“-Knopf erst einen
  vagen Hinweis, auf Wunsch konkretere — und verrät zur Not den richtigen
  Schritt bzw. die Rätsel-Lösung. Nach Fehlversuchen pulsiert er sanft; der
  Tipp-Fortschritt wird pro Szene gespeichert.
- **Handgemalte SVG-Szenenbilder** zu jedem Schauplatz.
- **Kindgerecht**: Scheitern ist nie endgültig (bei 0 Herzen wirst du gerettet),
  Konflikte werden mit Köpfchen und Freundlichkeit gelöst, jedes Abenteuer hat
  ein Happy End.
- **Spielstände** werden automatisch lokal gespeichert — mehrfach parallel spielbar.
- **🗂️ Fall-Archiv**: 3 Detektiv-Fälle, bei denen der **Täter jedes Mal neu
  ausgelost** wird — die Spuren (Haar, Schuhabdruck, Händigkeit, verräterische
  Spur) passen sich an. Zwei Lösungswege: Indizien mit den Steckbriefen
  kombinieren oder Alibis platzen lassen (max. 2 Checks). Fehlanklagen kosten
  Herzen, bei drei Fehlern mischt der Fall sich neu. Sterne-Wertung für
  besonders effiziente Ermittler.

## 🏠 Alltagshelfer

Fünf Helfer für jeden Tag:

| Modul | Was es kann |
|---|---|
| 🧠 **Lern-Trainer** | Kopfrechnen in 3 Stufen (endlos generierte Aufgaben), 60-Sekunden-Einmaleins-Sprint, Englisch-Vokabeln in 25 Themen-Sets mit 500 Wörtern (wählbar: Klasse 5/6 oder 8/9) als Lernkarten & Quiz, Wissens-Quiz mit 36 Fragen und Aha-Fakten — mit lokaler Bestenliste |
| 🍳 **Koch-Pilot** | 24 alltagstaugliche Familienrezepte mit Filter (vegetarisch, schnell, süß) und Zutaten-Suche; Wochenplan-Würfel (Mo–Fr) mit zusammengefasster, abhakbarer Einkaufsliste |
| ✍️ **Schreibwerkstatt** | 8 Ausfüll-Vorlagen: Schul-Entschuldigung, Kündigung, Reklamation, Krankmeldung, Widerruf, Glückwunsch, Einladung, Nachbarschafts-Nachricht — mit Kopieren-Knopf |
| 🗓️ **Planer** | 9 Checklisten-Vorlagen (Kindergeburtstag, Urlaub, Packliste, Klassenfahrt, Camping, Schulstart, Umzug, Weihnachten, Notfall-Infos) zum Abhaken, mit Fortschrittsbalken und eigenen Punkten |
| 💰 **Taschengeld** | Ein Konto pro Kind: Einzahlen/Ausgeben mit Notiz, Verlauf, Sparziel mit Fortschrittsbalken |

## 🚀 Veröffentlichen auf GitHub Pages

1. Repository auf GitHub öffnen → **Settings → Pages**.
2. „Build and deployment“: **Source = Deploy from a branch**, Branch wählen
   (z. B. `main`), Ordner `/ (root)`, speichern.
3. Nach ~1 Minute läuft die App unter `https://<benutzername>.github.io/<repo>/`.

Kein Build-Schritt, keine Abhängigkeiten, keine API-Keys — die Dateien werden
direkt ausgeliefert.

## 🔒 Datenschutz

Die App stellt **keinerlei Netzwerkanfragen** an irgendeinen Dienst. Spielstände,
Checklisten, Bestenlisten und Taschengeld-Konten liegen ausschließlich im
localStorage des Browsers. „Alle Daten löschen“ (ℹ️-Seite) entfernt alles.

## 📱 Als App installieren

Dank Web-App-Manifest lässt sich die Seite auf Handy/Tablet „zum Startbildschirm
hinzufügen“ und verhält sich dann wie eine richtige App — auch im Flugmodus.

## 🛠 Lokal ausprobieren

```bash
# beliebiger statischer Server, z. B.:
python3 -m http.server 8080
# dann http://localhost:8080 öffnen
```

## 📁 Struktur

```
index.html        App-Hülle
manifest.json     PWA-Manifest (installierbar)
sw.js             Service Worker (offline-fähig)
css/style.css     Styles (zwei Themes: Papier & Nachtblau)
assets/icon.svg   App-Icon
js/main.js        Router, Startseite, Info-Seite
js/ui.js          DOM-Helfer
js/storage.js     localStorage: Spielstände, Listen, Konten
js/adventure.js   Spiel-Engine (Knoten, Würfel, Rätsel, HUD)
js/adventures.js  Die Abenteuer-Inhalte inkl. SVG-Szenen
js/hub.js         Alltagshelfer-Module
js/data.js        Rezepte, Brief-Vorlagen, Checklisten, Vokabeln
KONZEPT.md        Ausführliches Konzept
```

## ✏️ Eigene Inhalte ergänzen

- **Neue Rezepte / Vokabel-Sets / Checklisten**: einfach in `js/data.js` ergänzen —
  das Format ist selbsterklärend.
- **Neue Abenteuer**: in `js/adventures.js` ein weiteres Objekt nach dem Muster
  der vorhandenen anlegen (Knoten mit `choices`, `dice`, `riddle`, `end`) und in
  das `ADVENTURES`-Array eintragen. Die Engine übernimmt den Rest.
