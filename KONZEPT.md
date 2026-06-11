# Claude 5 Studio — Konzept

Ein browserbasiertes „Capability-Cockpit" für **Claude Fable 5**, das als rein statische
Single-Page-App über **GitHub Pages** veröffentlicht wird. Kein Backend, kein Server —
die App spricht die Anthropic-API direkt aus dem Browser an (der Nutzer bringt seinen
eigenen API-Key mit, „BYOK").

---

## 1. Was ist das Besondere an Claude 5 (Fable 5)?

Claude Fable 5 (`claude-fable-5`) ist das erste Modell der neuen **Mythos-Klasse**,
die oberhalb von Claude Opus angesiedelt ist. Die wichtigsten Eigenschaften:

| Eigenschaft | Wert / Verhalten |
|---|---|
| Modell-ID | `claude-fable-5` |
| Kontextfenster | **1 Million Token** (Standard = Maximum) |
| Max. Output | **128K Token** pro Request (Streaming nötig) |
| Preis | $10 / $50 pro 1M Token (Input/Output) |
| Thinking | **Immer an** (adaptiv) — `thinking`-Parameter weglassen; `disabled` oder `budget_tokens` geben 400 |
| Reasoning-Tiefe | Über `output_config.effort`: `low` → `xhigh` → `max` |
| Protected Thinking | Roher Gedankengang wird nie ausgegeben; `display: "summarized"` liefert lesbare Zusammenfassungen |
| Tokenizer | **Neu** — gleicher Inhalt ≈ 30 % mehr Token als bei Opus-Modellen |
| Sampling | `temperature`/`top_p`/`top_k` entfernt (400) — Steuerung per Prompt |
| Prefill | Assistant-Prefill nicht mehr unterstützt → Structured Outputs (`output_config.format`) |
| Safety | Klassifikatoren können mit `stop_reason: "refusal"` ablehnen; server-seitige **Fallbacks** auf `claude-opus-4-8` möglich (Beta) |
| Datenhaltung | Erfordert 30-Tage-Retention (kein Zero-Data-Retention) |
| Stärken | Langzeit-agentisches Arbeiten (Einzelturns von mehreren Minuten), parallele Sub-Agents, Memory, hochauflösende Vision, Code-Review/Debugging, Enterprise-Deliverables |

**Kurz:** Fable 5 ist auf lange, autonome, mehrstufige Arbeit optimiert — nicht nur auf
schnelle Einzelantworten. Genau das soll das Tool sichtbar machen.

---

## 2. Das Tool: „Claude 5 Studio"

Eine SPA mit mehreren Modulen (Tabs), die jeweils eine Fable-5-Fähigkeit erlebbar machen:

### Modul A — Chat & Thinking-Viewer
- Streaming-Chat (SSE) mit Markdown-Rendering.
- **Thinking-Panel**: zeigt die zusammengefassten Reasoning-Blöcke
  (`thinking: {type: "adaptive", display: "summarized"}`) live neben der Antwort.
- **Effort-Regler** (`low`/`medium`/`high`/`xhigh`/`max`) mit Live-Vergleich:
  gleiche Frage, unterschiedliche Effort-Stufen nebeneinander (Latenz, Token, Qualität).

### Modul B — Agent-Arena (Tool Use im Browser)
- Client-seitige Tools, die **direkt im Browser** laufen und im Agentic Loop
  visualisiert werden (Timeline: Tool-Call → Ergebnis → nächster Schritt):
  - `run_javascript` — sandboxed eval in einem Web Worker
  - `render_html` — Live-Preview in einem sandboxed iframe (Claude baut UI-Prototypen)
  - `fetch_url` — Abruf über öffentliche CORS-Proxies (optional)
  - `local_storage_memory` — Memory-Tool-Backend auf localStorage (persistente
    Notizen über Sessions hinweg → zeigt Fable 5s Memory-Stärke)
- Human-in-the-loop: jeder Tool-Call kann zur Bestätigung angehalten werden.

### Modul C — Vision Lab
- Drag & Drop für Bilder und PDFs (Base64-Blöcke).
- Demo der hochauflösenden Vision (bis 2576 px Langkante): Diagramm-Transkription,
  Screenshot-Analyse, Dokumentenverständnis mit Zitaten.

### Modul D — Structured-Output-Designer
- Visueller JSON-Schema-Builder (oder Zod-Definition) → `output_config.format`.
- Validiertes, garantiert parsebares JSON als Ergebnis, mit Schema-Diff-Ansicht.
- Strict Tool Use Demo (`strict: true`).

### Modul E — Token- & Kosten-Inspektor
- `count_tokens`-Endpoint live: zählt Prompt-Token **unter beiden Tokenizern**
  (`input_tokens` vs. `input_tokens_prior_tokenizer`) — macht den ~30-%-Effekt
  des neuen Tokenizers sichtbar.
- Live-Kostenmeter pro Konversation (inkl. Cache-Read/Write aus `usage`).
- Prompt-Caching-Visualisierung: zeigt `cache_creation_input_tokens` /
  `cache_read_input_tokens` pro Turn als Balkendiagramm.

### Modul F — Refusal- & Fallback-Demo
- Sauberes Handling von `stop_reason: "refusal"` inkl. `stop_details.category`.
- Optional: server-seitiger Fallback auf `claude-opus-4-8`
  (Beta-Header `server-side-fallback-2026-06-01`) mit Anzeige der
  `fallback`-Blöcke und `usage.iterations`.

### Modul G — Langzeit-Session
- Lange Konversationen mit **Compaction** (Beta `compact-2026-01-12`):
  Compaction-Blöcke werden korrekt zurückgereicht und im UI markiert
  („Hier wurde Kontext zusammengefasst").
- Fortschritts-UX für minutenlange Turns (Fable-5-typisch): Streaming,
  Heartbeat-Anzeige, abbrechbar.

### Architektur & Sicherheit (wichtig für GitHub Pages)
- **BYOK**: API-Key wird nur in `localStorage` gehalten, nie ins Repo committet,
  nie an Dritte gesendet. Deutlicher Hinweis: nur für persönliche Nutzung.
- Direkter Browser-Zugriff auf die Anthropic-API via CORS-Opt-in
  (SDK-Option `dangerouslyAllowBrowser: true` bzw. Header
  `anthropic-dangerous-direct-browser-access: true`).
- Alles Übrige (Konversationen, Memory, Einstellungen) ebenfalls in
  `localStorage`/`IndexedDB` — die App ist komplett offline-host-bar.

---

## 3. Empfohlener Implementierungs-Stack

| Baustein | Empfehlung | Warum |
|---|---|---|
| Build | **Vite + TypeScript** | Schnell, trivialer GitHub-Pages-Export (`base`-Option); alternativ: reines HTML + ES-Module ohne Build |
| API-Zugriff | **`@anthropic-ai/sdk`** mit `dangerouslyAllowBrowser: true` | Offizielles SDK, Streaming-Helper (`messages.stream()`, `finalMessage()`), typisierte Fehler, Tool Runner |
| Structured Outputs | **Zod** + `zodOutputFormat` aus dem SDK | Schema-Definition und Client-Validierung in einem |
| Markdown | **marked** + **DOMPurify** | Rendering der Antworten, XSS-sicher |
| Code-Highlighting | **highlight.js** oder **Shiki** | Codeblöcke im Chat |
| Charts | **Chart.js** | Token-/Kosten-/Cache-Visualisierung |
| JS-Sandbox | **Web Worker** + `iframe sandbox` | sichere Ausführung der Browser-Tools |
| Persistenz | `localStorage` / **IndexedDB** (z. B. via `idb`) | Key, Sessions, Memory-Dateien |
| Deployment | **GitHub Actions → GitHub Pages** (`actions/deploy-pages`) | Build & Deploy bei jedem Push auf `main` |
| Entwicklung | **Claude Code** | Das Tool kann sich quasi selbst bauen |

### Wichtige API-Parameter (Fable 5)

```ts
const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

const stream = client.messages.stream({
  model: "claude-fable-5",
  max_tokens: 64000,                                  // Streaming → großzügig
  thinking: { type: "adaptive", display: "summarized" }, // sonst leere Thinking-Blöcke
  output_config: { effort: "high" },                  // low | medium | high | xhigh | max
  messages,
  tools,                                              // Browser-Tools (Modul B)
});
```

Zu beachten:
- `thinking: {type: "disabled"}` und `budget_tokens` → 400. Entweder weglassen oder `adaptive`.
- `temperature`/`top_p`/`top_k` → 400.
- Vor dem Lesen von `content` immer `stop_reason === "refusal"` prüfen.
- Thinking-Blöcke beim Fortsetzen der Konversation **unverändert** zurückgeben.

---

## 4. Ausbaustufen

1. **MVP**: Modul A (Chat + Thinking + Effort) + Key-Management + Pages-Deploy.
2. **V2**: Module B (Agent-Arena) und E (Token-Inspektor).
3. **V3**: Vision Lab, Structured-Output-Designer, Refusal/Fallback, Compaction.
4. **Optional**: PWA (offline UI), Share-Links (Konversation als URL-Fragment,
   ohne Key), i18n (DE/EN).
