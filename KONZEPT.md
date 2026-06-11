# Familien-Studio — Konzept

Eine familientaugliche Web-App für **GitHub Pages**: komplett statisch, **komplett
offline**, ohne Anmeldung, ohne API, ohne laufende Kosten. Eine gemeinsame Hülle
mit zwei Welten:

1. **🐉 Abenteuer-Maschine** — interaktive Text-Abenteuer für Kinder (ca. 10–12 Jahre)
2. **🏠 Alltagshelfer** — fünf praktische Module für den Familienalltag

## Der Grundgedanke: KI zur Bauzeit statt zur Laufzeit

Die erste Konzept-Version band die Anthropic-API zur Laufzeit an (Claude als
Spielleiter, Brief-Versteher per Foto). Das hätte aber ein API-Guthaben und
laufende Kosten bedeutet. Deshalb der Pivot:

> **Die KI (Claude) hat die Inhalte einmalig beim Entwickeln erzeugt** —
> verzweigte Abenteuer-Geschichten, Rezepte, Brief-Vorlagen, Checklisten,
> Vokabel-Sets und die SVG-Illustrationen. Sie sind fest in die App eingebaut.
> Zur Laufzeit wird **keinerlei Dienst** mehr aufgerufen.

Was dadurch wegfiel: freie Texteingaben ans „lebende" Modell (z. B. Fotos von
Behördenbriefen erklären lassen). Was dadurch gewonnen wurde: null Kosten,
null Datenschutzfragen, funktioniert im Flugmodus, beliebig viele Nutzer.

## Welt 1: Abenteuer-Maschine 🐉

Eine Entscheidungsbaum-Engine mit echter Spielmechanik:

- **Knoten-Typen**: Erzählung mit Auswahlmöglichkeiten, Würfelprobe (4–6 =
  Erfolg, sonst −1 Herz), Rätsel (Mathe/Logik, mit Hinweis bei Fehlversuch),
  Happy End.
- **Zustand**: Herzen (Start 5), Inventar, besuchte Knoten, Schrittzähler.
  Entscheidungen haben Folgen: Die Startausrüstung (Seil/Laterne/Honigbrot)
  öffnet später jeweils andere Wege; Gegenstände aus einem Handlungsstrang
  werden in einem anderen gebraucht (z. B. der Glitzerstein für die Krähe).
- **Kindgerecht by design**: Bei 0 Herzen greift eine freundliche
  Rettungs-Szene (kein Game Over), Konflikte werden durch Zuhören und
  Cleverness gelöst, jedes Abenteuer endet positiv.
- **Inhalte**: Zwei vollständige Abenteuer („Drachenfeuer“ ~30 Knoten mit
  Hub-Struktur und drei Handlungssträngen, „Sternenbasis 7“ ~18 Knoten mit
  zwei verschränkten Aufgaben), je 5–6 handgeschriebene SVG-Szenenbilder.
- **Spielstände** in localStorage, mehrere parallel, jederzeit fortsetzbar.

Neue Abenteuer = ein weiteres Datenobjekt in `js/adventures.js` — die Engine
(`js/adventure.js`) bleibt unverändert. Ideal, um später mit Claude (z. B. in
Claude Code) weitere Geschichten zu generieren und einzuchecken: KI-Kosten
fallen nur einmalig beim Autor an, nie beim Nutzer.

## Welt 2: Alltagshelfer 🏠

| Modul | Offline-Mechanik |
|---|---|
| 🧠 Lern-Trainer | Kopfrechnen-Aufgaben werden **algorithmisch generiert** (3 Stufen, unendlicher Vorrat), Einmaleins-Sprint mit 60-s-Timer, 4 Vokabel-Sets (je 16 Wörter) als Lernkarten + Multiple-Choice-Quiz; Bestenliste lokal |
| 🍳 Koch-Pilot | 18 kuratierte Familienrezepte mit Tags & Zutaten-Suche; Wochenplan-Generator zieht 5 abwechslungsreiche Gerichte und aggregiert die Zutaten zur abhakbaren Einkaufsliste |
| ✍️ Schreibwerkstatt | 6 sorgfältig formulierte Vorlagen-Generatoren (Entschuldigung, Kündigung inkl. Formalien, Reklamation mit Fristsetzung, Glückwunsch, Einladung, Nachbarschafts-Nachricht) — Felder ausfüllen, Text kopieren |
| 🗓️ Planer | 6 Checklisten-Vorlagen (Geburtstag, Urlaub, Packliste, Schulstart, Umzug, Notfall-Infos) werden zu persistenten, abhakbaren Listen mit Fortschrittsbalken und eigenen Zusatzpunkten |
| 💰 Taschengeld | Konto pro Kind: Buchungen mit Notiz, Verlauf, Sparziel mit Fortschrittsanzeige — reine Lokalrechnung |

## Technik

| Baustein | Entscheidung | Warum |
|---|---|---|
| Build | Keiner — pures HTML/CSS + ES-Module | GitHub Pages „Deploy from branch" genügt |
| Bibliotheken | **Keine** (auch keine CDN-Fonts) | Offline-Garantie, keine Abhängigkeiten |
| Offline | Service Worker (Cache-first) + Web-App-Manifest | Nach dem ersten Besuch voll offline; auf Handy/Tablet installierbar |
| Persistenz | localStorage | Spielstände, Listen, Konten, Bestenlisten |
| Routing | Hash-Router | Funktioniert auf Pages ohne Server-Konfiguration |
| Sicherheit | Keine Netzwerkanfragen, keine Nutzereingaben an Dritte | Es gibt schlicht nichts, das Daten abfließen lassen könnte |

### Dateien

```
index.html / manifest.json / sw.js / assets/icon.svg
css/style.css                  zwei Themes (Papier & Nachtblau)
js/main.js                     Router, Start, Info-Seite
js/adventure.js                Spiel-Engine
js/adventures.js               Abenteuer-Inhalte + SVG-Szenen
js/hub.js                      Alltagshelfer-Module
js/data.js                     Rezepte, Briefe, Checklisten, Vokabeln
js/storage.js / js/ui.js       Persistenz & DOM-Helfer
```

## Mögliche Ausbaustufen

- **Mehr Abenteuer** (mit Claude zur Bauzeit generieren, als Daten einchecken).
- **Vorlesen** per `speechSynthesis` (komplett offline im Browser).
- **Mehr Vokabel-Sets / Rezepte** — `js/data.js` ist bewusst leicht erweiterbar.
- **Profile** für mehrere Kinder (getrennte Bestenlisten/Spielstände).
- **Export/Import** aller Daten als JSON-Datei (Gerätewechsel).
