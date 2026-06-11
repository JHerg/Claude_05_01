# 🏠 Familien-Studio

Zwei Welten, eine App — komplett statisch, läuft direkt auf **GitHub Pages**:

- **🐉 Abenteuer-Maschine** — ein interaktives Text-Adventure für Kinder (ca. 10–12 Jahre).
  Claude ist der Spielleiter: Herzen, Inventar, Quests, Würfelproben, selbst gemalte
  SVG-Szenenbilder — und wer mag, lädt ein Foto seiner eigenen Helden-Zeichnung hoch,
  die Claude in die Geschichte einbaut. Optional mit versteckten Lernrätseln
  (Mathe, Logik, Englisch). Spielstände werden lokal gespeichert.
- **🏠 Alltagshelfer** — fünf praktische Module:
  **Brief-Versteher** (Amtspost fotografieren → Klartext + Antwortentwurf),
  **Koch-Pilot** (Kühlschrankfoto → Rezepte oder Wochenplan + Einkaufsliste),
  **Lern-Coach** (erklärt Hausaufgaben, statt sie zu lösen; Karteikarten & Quiz),
  **Schreibwerkstatt** (Entschuldigungen, Kündigungen, Glückwünsche …),
  **Planer** (Geburtstag, Urlaub, Packlisten — als abhakbare Checklisten).

Angetrieben von **Claude (claude-fable-5)** über die Anthropic-API — direkt aus dem
Browser, ohne eigenen Server.

## 🚀 Veröffentlichen auf GitHub Pages

1. Dieses Repository auf GitHub öffnen → **Settings → Pages**.
2. Unter „Build and deployment“: **Source = Deploy from a branch**,
   Branch auswählen (z. B. `main`), Ordner `/ (root)`, speichern.
3. Nach ~1 Minute ist die App unter `https://<benutzername>.github.io/<repo>/` erreichbar.

Es gibt keinen Build-Schritt — die Dateien werden direkt ausgeliefert.

## 🔑 Einrichtung (einmalig, im Eltern-Bereich ⚙️)

1. API-Key bei [console.anthropic.com](https://console.anthropic.com) erstellen
   (Account mit Guthaben nötig).
2. In der App oben rechts **⚙️ Eltern-Bereich** öffnen und den Key eintragen.
3. Optional: Tageslimit (Standard: 2 $/Tag), Antwort-Qualität (Effort) und eine
   Eltern-PIN festlegen.

## 💰 Kosten

Die App ruft `claude-fable-5` direkt auf (10 $ / 50 $ pro Million Input-/Output-Token).
Ein typischer Abenteuer-Spielzug oder eine Brief-Erklärung kostet wenige Cent.
Die App schätzt die Tageskosten mit, zeigt sie oben rechts an und stoppt beim
eingestellten Tageslimit. Prompt-Caching ist aktiviert und reduziert die Kosten
längerer Abenteuer deutlich.

## 🔒 Datenschutz & Sicherheit

- **Der API-Key bleibt auf dem Gerät** (localStorage) und wird ausschließlich an
  `api.anthropic.com` gesendet. Er liegt nie im Repository und auf keinem Server.
- Spielstände, Verläufe und Einstellungen liegen nur im Browser. „Alle Daten löschen“
  im Eltern-Bereich entfernt alles.
- Eingaben und Fotos werden zur Verarbeitung an die Anthropic-API übertragen
  (Anthropic speichert API-Daten gemäß seiner Richtlinien, derzeit 30 Tage für
  dieses Modell). Keine sensiblen Dokumente hochladen, bei denen das nicht passt.
- Die Abenteuer-Maschine erzwingt per System-Prompt altersgerechte Inhalte
  (gewaltarm, freundlich, deutsch). Wie bei jedem KI-System gilt trotzdem:
  am besten gemeinsam ausprobieren.
- Hinweis Brief-Versteher: Orientierungshilfe, **keine Rechtsberatung**.

⚠️ Die App ist für die **private Nutzung der eigenen Familie** gedacht. Wer die
veröffentlichte Seite besucht, nutzt seinen *eigenen* Key — es gibt keinen geteilten
Key. Trotzdem: Wer die URL nicht teilen will, kann das Repository privat lassen und
die App lokal nutzen.

## 🛠 Lokal ausprobieren

```bash
# im Repo-Verzeichnis (ein beliebiger statischer Server tut es):
python3 -m http.server 8080
# dann http://localhost:8080 öffnen
```

## 📁 Struktur

```
index.html        App-Hülle
css/style.css     Styles (zwei Themes: Papier & Nachtblau)
js/main.js        Router, Startseite, Eltern-Bereich
js/api.js         Anthropic-API (SSE-Streaming, Bilder, Fehler)
js/storage.js     localStorage: Einstellungen, Spielstände, Kosten
js/ui.js          Markdown-/SVG-Rendering (sanitisiert), UI-Helfer
js/adventure.js   Abenteuer-Maschine
js/hub.js         Alltagshelfer-Module
KONZEPT.md        Ausführliches Konzept
```
