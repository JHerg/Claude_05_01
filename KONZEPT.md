# Familien-Studio — Konzept

Eine „familientaugliche" Web-App für **GitHub Pages**: komplett statisch, ohne Server,
ohne Build-Schritt. Eine gemeinsame Hülle (Startseite, Eltern-Bereich, Kostenanzeige)
mit **zwei Welten**:

1. **🐉 Abenteuer-Maschine** — interaktives Text-Adventure für Kinder (ca. 10–12 Jahre)
2. **🏠 Alltagshelfer** — fünf praktische Module für den Familienalltag

Angetrieben von **Claude Fable 5** (`claude-fable-5`), direkt aus dem Browser
(„BYOK": der Nutzer hinterlegt seinen eigenen API-Key, der das Gerät nur Richtung
`api.anthropic.com` verlässt).

---

## 1. Was ist das Besondere an Claude 5 (Fable 5)?

Claude Fable 5 ist das erste Modell der neuen **Mythos-Klasse** oberhalb von Claude Opus:

| Eigenschaft | Wert / Verhalten |
|---|---|
| Modell-ID | `claude-fable-5` |
| Kontextfenster | 1 Million Token (Standard = Maximum) |
| Max. Output | 128K Token pro Request (Streaming nötig) |
| Preis | $10 / $50 pro 1M Token (Input/Output) |
| Thinking | Immer an (adaptiv) — `thinking`-Parameter weglassen; `disabled`/`budget_tokens` geben 400 |
| Reasoning-Tiefe | `output_config.effort`: `low` → `xhigh` → `max` |
| Protected Thinking | Roher Gedankengang wird nie ausgegeben; Zusammenfassungen via `display: "summarized"` |
| Tokenizer | Neu — gleicher Inhalt ≈ 30 % mehr Token als bei Opus |
| Sampling | `temperature`/`top_p`/`top_k` entfernt — Steuerung per Prompt |
| Prefill | Nicht unterstützt → Structured Outputs (`output_config.format`) |
| Safety | `stop_reason: "refusal"` möglich; server-seitige Fallbacks auf Opus 4.8 (Beta) |
| Datenhaltung | 30-Tage-Retention erforderlich (kein ZDR) |
| Stärken | Langzeit-Kohärenz, agentisches Arbeiten, Vision, kreatives Schreiben, Memory |

**Genau diese Stärken nutzt die App:** lange, konsistente Spiel-Kampagnen
(Langzeit-Kohärenz + 1M Kontext), garantiert parsebarer Spielzustand
(Structured Outputs), Brief-/Hausaufgaben-Fotos (Vision), kindgerechtes
kreatives Erzählen und kontrollierbare Kosten (Effort + Prompt Caching).

---

## 2. Welt 1: Die Abenteuer-Maschine 🐉

Claude ist Spielleiter eines Text-Adventures — als echtes Spiel, nicht als Chat:

- **6 Szenarien**: Drachenfeuer (Fantasy), Sternenbasis 7 (Sci-Fi), Detektivbüro
  Blitz (Krimi), Die vergessene Insel (Schatzsuche), Pokal der Legenden
  (Fußball + Magie) — und „Eigene Idee", bei der das Kind die Welt selbst bestimmt.
- **Spiel-HUD statt Chatfenster**: Jeder Spielzug kommt per Structured Output als
  JSON (Erzähltext, 3 Auswahlmöglichkeiten, Herzen, Inventar, Quest, Ort) —
  die App rendert daraus Herzen ❤️, Inventar-Chips 🎒 und das Quest-Ziel 🎯.
- **Claude malt die Szenen selbst**: Zu neuen Schauplätzen liefert das Modell
  eine Inline-SVG-Illustration (Comic-Stil, 400×240), die sanitisiert
  (DOMPurify, SVG-Profil) angezeigt wird. Kein Bildgenerator nötig.
- **Würfelproben**: Bei riskanten Aktionen fordert Claude eine Probe an; die App
  zeigt einen animierten Würfel, das Ergebnis fließt zurück in die Geschichte.
- **Eigene Zeichnung als Held** (Vision): Foto der selbst gemalten Figur hochladen —
  Claude beschreibt den Helden im Spiel genau so, wie er auf dem Bild aussieht.
- **Versteckte Lernrätsel** (optional): ca. jede 3.–4. Runde ein Zahlenschloss,
  ein Geheimcode oder ein Englisch-Zauberspruch.
- **Kindersicherheit per System-Prompt**: altersgerecht, gewaltarm, kein Horror,
  Scheitern ohne endgültiges Game Over, Happy-End-Pflicht für den Questabschluss.
- **Spielstände** in localStorage (bis 12 Slots), wochenlange Kampagnen möglich;
  der Nachrichtenverlauf wird bei Bedarf gekürzt (erste Nachrichten + letzte 60 Züge).

## 3. Welt 2: Der Alltagshelfer 🏠

Fünf geführte Module (Formular → Ergebnis → Nachfragen-Chat), Sitzung pro Modul
wird lokal gemerkt:

| Modul | Was es tut |
|---|---|
| 📨 **Brief-Versteher** | Amtspost/Versicherung/Schulbrief fotografieren → feste Struktur: „Worum geht es / Das musst du tun / Fristen & Kosten / Gut zu wissen" + Antwortentwurf auf Wunsch. Mit Hinweis: keine Rechtsberatung. |
| 🍳 **Koch-Pilot** | Kühlschrankfoto oder Zutatenliste → 3 Rezepte oder Wochenplan (Mo–Fr) mit nach Abteilungen gruppierter, **abhakbarer** Einkaufsliste. |
| 🧠 **Lern-Coach** | Hausaufgabe fotografieren → erklärt Schritt für Schritt, **ohne die Lösung zu verraten** (Leitfragen-Didaktik); alternativ Karteikarten oder Quiz-Modus mit Punktezählung. |
| ✍️ **Schreibwerkstatt** | Entschuldigung, Kündigung, Reklamation, Glückwunsch, Einladung — versandfertig, mit Formalien (Fristen, Einschreiben-Hinweis) und Tonfall-Wahl. |
| 🗓️ **Planer** | Kindergeburtstag, Urlaub, Packliste, Umzug → chronologische, abhakbare Checklisten mit Kostenschätzung. |

## 4. Gemeinsame Hülle

- **Eltern-Bereich** (optional PIN-geschützt): API-Key, Effort-Stufe
  (Tempo/Kosten ↔ Gründlichkeit), **Tageslimit in $** (App pausiert bei
  Erreichen), Kostenhistorie der letzten 7 Tage, „Alle Daten löschen".
- **Live-Kostenschätzung** aus den `usage`-Feldern jeder Antwort
  (inkl. Cache-Read/Write) als Badge in der Kopfzeile.
- **Prompt Caching** über top-level `cache_control` — wachsende Spielverläufe
  werden größtenteils aus dem Cache gelesen (~0,1× Preis).
- **Fehler-UX**: verständliche deutsche Meldungen für 401/429/529,
  Tageslimit und `refusal`; fehlgeschlagene Züge werden zurückgerollt
  und sind per Knopf wiederholbar.

---

## 5. Technik

| Baustein | Entscheidung | Warum |
|---|---|---|
| Build | **Keiner** — pures HTML + ES-Module | GitHub Pages „Deploy from branch" genügt; kein Tooling für die Familie |
| API | `fetch` + SSE-Parser direkt gegen `/v1/messages` | Kein SDK-Download nötig; Header `anthropic-dangerous-direct-browser-access: true` erlaubt Browser-Calls |
| Modell | `claude-fable-5`, Streaming, `max_tokens: 16000` | Fable-5-Regeln beachtet: kein `thinking`-Param, kein Sampling, Effort via `output_config` |
| Spielzustand | Structured Outputs (`output_config.format`, JSON-Schema) | Garantiert parsebares JSON für das HUD |
| Markdown/SVG | marked + DOMPurify (CDN, mit Fallback) | XSS-sicheres Rendering, SVG-Profil für Szenenbilder |
| Persistenz | localStorage | Key, Spielstände, Hub-Sitzungen, Kosten — alles lokal |
| Deployment | GitHub Pages, `.nojekyll` | Statisch, relative Pfade, Hash-Routing |

### Dateien

```
index.html        App-Hülle
css/style.css     Zwei Themes (Papier / Nachtblau)
js/main.js        Router, Startseite, Eltern-Bereich
js/api.js         Anthropic-API: SSE-Streaming, Bild-Blöcke, Fehler, Kosten
js/storage.js     Einstellungen, Spielstände, Sitzungen, Tageskosten
js/ui.js          md()/safeSvg() sanitisiert, DOM-Helfer
js/adventure.js   Abenteuer-Maschine (Szenarien, System-Prompt, HUD, Würfel)
js/hub.js         Alltagshelfer (5 Module, generischer Runner)
```

## 6. Mögliche Ausbaustufen

- **Vorlesen**: `speechSynthesis` für die Abenteuer-Texte (komplett offline im Browser).
- **Mehrere Kinder-Profile** mit eigenen Spielständen.
- **Teilen ohne Key**: Abenteuer-Protokoll als schön formatierte HTML-Seite exportieren.
- **PWA**: Manifest + Service Worker, damit die App wie eine echte App installierbar ist.
- **Server-seitiger Fallback** auf `claude-opus-4-8` bei `refusal` (Beta-Header).
