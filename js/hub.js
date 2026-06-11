// Der Alltagshelfer: fünf Module für den Familienalltag.
// Jedes Modul = geführtes Formular + Ergebnis + Nachfragen-Chat.

import { sendMessage, fileToImageBlock, friendlyError } from "./api.js";
import { getHubSession, setHubSession, clearHubSession } from "./storage.js";
import { el, md, spinner, makeChecklists, scrollToBottom } from "./ui.js";

const BASE_SYSTEM = `Du bist der freundliche Assistent einer Familie in Deutschland. Antworte auf Deutsch, klar, praktisch und ohne Fachjargon. Nutze Markdown (Überschriften, Listen, Tabellen, wo es hilft). Sei herzlich, aber komm schnell zum Punkt.`;

const MODULES = [
  {
    id: "brief",
    emoji: "📨",
    title: "Brief-Versteher",
    desc: "Amtspost, Versicherung oder Schulbrief fotografieren — verstehen, was zu tun ist.",
    images: { max: 3, maxEdge: 2048, label: "Foto(s) des Briefs (bis zu 3 Seiten)" },
    fields: [
      { id: "frage", type: "textarea", label: "Deine Frage dazu (optional)", placeholder: "z. B.: Muss ich darauf antworten? Was kostet mich das?" },
    ],
    system: `${BASE_SYSTEM}
Deine Aufgabe: Der Nutzer zeigt dir einen Brief (Behörde, Versicherung, Bank, Schule, Vermieter …). Erkläre ihn so, dass es jeder versteht.
Antworte immer in dieser Struktur:
## Worum geht es?
(2–3 Sätze Klartext: Wer schreibt, was wollen sie?)
## Das musst du tun
(Nummerierte Schritte. Fristen und Beträge **fett**. Wenn nichts zu tun ist, sag das deutlich.)
## Fristen & Kosten
(Tabelle oder kurze Liste; "keine" wenn keine.)
## Gut zu wissen
(Fallstricke, Rechte, Tipps.)
Biete am Ende an, ein Antwortschreiben zu entwerfen, falls eines nötig ist. Wenn der Nutzer das möchte, schreibe einen versandfertigen, höflichen Brief.
Wichtig: Du gibst Orientierung, keine Rechtsberatung — weise bei ernsten Themen (Mahnbescheid, Kündigung, Bußgeld mit hohem Betrag) freundlich darauf hin, im Zweifel eine Beratungsstelle oder einen Anwalt zu fragen. Wenn du etwas auf dem Foto nicht lesen kannst, sag ehrlich, was fehlt.`,
    buildPrompt: (f) =>
      `Bitte erkläre mir diesen Brief.${f.frage ? ` Meine Frage dazu: ${f.frage}` : ""}`,
    needsImagesOrText: "frage",
  },
  {
    id: "koch",
    emoji: "🍳",
    title: "Koch-Pilot",
    desc: "Kühlschrank fotografieren oder Zutaten eintippen — Rezepte oder gleich der ganze Wochenplan.",
    images: { max: 2, maxEdge: 1600, label: "Foto von Kühlschrank / Vorräten (optional)" },
    fields: [
      { id: "zutaten", type: "textarea", label: "Zutaten / Vorräte (optional, ergänzt das Foto)", placeholder: "z. B.: Hähnchen, Paprika, Reis, Sahne, TK-Erbsen …" },
      { id: "modus", type: "select", label: "Was brauchst du?", options: ["3 Rezeptideen für heute", "Wochenplan (5 Tage) + Einkaufsliste"] },
      { id: "wuensche", type: "text", label: "Wünsche (optional)", placeholder: "z. B.: vegetarisch, max. 30 Minuten, kinderfreundlich, 4 Personen" },
    ],
    system: `${BASE_SYSTEM}
Du bist ein pragmatischer Familienkoch. Regeln:
- Bei "3 Rezeptideen": Schlage 3 unterschiedliche Gerichte vor, die maximal aus den vorhandenen Zutaten plus üblichen Basics (Öl, Gewürze, Mehl …) bestehen. Pro Gericht: Name mit Emoji, Zeitangabe, Zutatenliste mit Mengen, knappe Schritt-für-Schritt-Anleitung. Markiere, was ggf. noch gekauft werden müsste.
- Bei "Wochenplan": Erstelle einen Plan Montag–Freitag (Tabelle: Tag, Gericht, Zeit), abwechslungsreich und alltagstauglich, dann eine nach Supermarkt-Abteilungen gruppierte Einkaufsliste als Aufzählung (- Punkt pro Artikel mit Menge). Berücksichtige vorhandene Zutaten — die müssen nicht auf die Liste.
- Realistische Mengen für Familien, deutsche Supermarkt-Produkte, keine exotischen Spezialzutaten ohne Alternative.`,
    buildPrompt: (f) =>
      `${f.modus}.${f.zutaten ? ` Vorhandene Zutaten: ${f.zutaten}.` : ""}${f.wuensche ? ` Wünsche: ${f.wuensche}.` : ""}${f._hasImages ? " Auf dem Foto siehst du meinen Kühlschrank/Vorrat." : ""}`,
    needsImagesOrText: "zutaten",
    checklist: true,
  },
  {
    id: "lern",
    emoji: "🧠",
    title: "Lern-Coach",
    desc: "Hausaufgabe fotografieren — verstehen statt abschreiben. Mit Karteikarten und Quiz.",
    images: { max: 2, maxEdge: 2048, label: "Foto der Aufgabe / des Hefts (optional)" },
    fields: [
      { id: "thema", type: "textarea", label: "Aufgabe oder Thema (optional, ergänzt das Foto)", placeholder: "z. B.: Brüche kürzen, Klasse 6 — oder die Aufgabe abtippen" },
      { id: "modus", type: "select", label: "Wie soll geholfen werden?", options: ["Schritt für Schritt erklären (ohne die Lösung zu verraten)", "Karteikarten zum Üben erstellen", "Quiz: Frag mich ab!"] },
    ],
    system: `${BASE_SYSTEM}
Du bist ein geduldiger Lern-Coach für Schulkinder. Sprich das Kind direkt an (du-Form), freundlich und ermutigend.
- Modus "Schritt für Schritt erklären": Verrate NIEMALS direkt das Endergebnis. Erkläre das Konzept an einem ähnlichen Beispiel, zerlege die eigentliche Aufgabe in kleine Schritte und stelle Leitfragen, damit das Kind selbst auf die Lösung kommt. Erst wenn das Kind sein eigenes Ergebnis nennt, bestätige oder korrigiere es.
- Modus "Karteikarten": Erstelle 8–12 Karteikarten zum Thema im Format "**Frage** → Antwort", von leicht nach schwer.
- Modus "Quiz": Stelle EINE Frage, warte auf die Antwort, gib dann freundliches Feedback und stelle die nächste. Zähle die Punkte mit (z. B. "3/5 richtig"). Nach 5 Fragen: kleines Fazit, was schon gut sitzt und was noch geübt werden sollte.
- Passe Sprache und Tiefe an die erkennbare Klassenstufe an.`,
    buildPrompt: (f) =>
      `${f.modus}.${f.thema ? ` Thema/Aufgabe: ${f.thema}` : ""}${f._hasImages ? " Die Aufgabe ist auf dem Foto zu sehen." : ""}`,
    needsImagesOrText: "thema",
  },
  {
    id: "schreib",
    emoji: "✍️",
    title: "Schreibwerkstatt",
    desc: "Entschuldigungen, Kündigungen, Reklamationen, Glückwünsche — fertig formuliert.",
    fields: [
      { id: "art", type: "select", label: "Was für ein Text?", options: ["Entschuldigung für die Schule", "Kündigung (Vertrag/Abo)", "Reklamation / Beschwerde", "Glückwunsch / Dankeskarte", "Einladung", "E-Mail an Behörde/Firma", "Etwas anderes"] },
      { id: "empfaenger", type: "text", label: "An wen?", placeholder: "z. B.: Klassenlehrerin Frau Müller / Fitnessstudio XY" },
      { id: "stichpunkte", type: "textarea", label: "Stichpunkte: Was soll drinstehen?", placeholder: "z. B.: Tom war Mo+Di krank (Erkältung), Versäumtes holt er nach" },
      { id: "ton", type: "select", label: "Tonfall", options: ["freundlich-neutral", "formell", "locker", "herzlich"] },
    ],
    system: `${BASE_SYSTEM}
Du bist eine Schreibwerkstatt für Alltagstexte. Regeln:
- Liefere einen versandfertigen Text: korrekte Anrede, klarer Hauptteil, passende Grußformel. Platzhalter in [eckigen Klammern] nur für Dinge, die du wirklich nicht wissen kannst (Datum, Unterschrift, Kundennummer).
- Bei Kündigungen: füge die üblichen Formalien ein (Vertragsnummer-Platzhalter, "fristgerecht zum nächstmöglichen Zeitpunkt", Bitte um schriftliche Bestätigung).
- Bei Reklamationen: sachlich und bestimmt, mit konkreter Forderung und Frist.
- Danach: 1–2 Sätze, was beim Versand zu beachten ist (z. B. Einschreiben bei Kündigung).
- Biete an, den Text kürzer, förmlicher oder lockerer zu machen.`,
    buildPrompt: (f) =>
      `Schreibe: ${f.art}. Empfänger: ${f.empfaenger || "[bitte sinnvoll annehmen]"}. Tonfall: ${f.ton}. Inhalt/Stichpunkte: ${f.stichpunkte}`,
    required: ["stichpunkte"],
  },
  {
    id: "planer",
    emoji: "🗓️",
    title: "Planer",
    desc: "Kindergeburtstag, Urlaub, Packliste — durchdachte Checklisten zum Abhaken.",
    fields: [
      { id: "anlass", type: "select", label: "Was steht an?", options: ["Kindergeburtstag", "Urlaub / Reise", "Packliste", "Ausflug", "Umzug", "Familienfest", "Etwas anderes"] },
      { id: "details", type: "textarea", label: "Details", placeholder: "z. B.: 11. Geburtstag, 8 Jungs, Thema Fußball, Budget 150 €, draußen wenn Wetter gut" },
    ],
    system: `${BASE_SYSTEM}
Du bist ein erfahrener Familien-Organisator. Erstelle einen praktischen Plan:
- Beginne mit einer Mini-Übersicht (2–3 Sätze: Konzept/Empfehlung).
- Dann Checklisten als Aufzählungen (- ein Punkt pro Aufgabe), sinnvoll gruppiert und chronologisch (z. B. "2 Wochen vorher", "Am Tag selbst") oder nach Kategorie (Kleidung, Hygiene, Dokumente …).
- Konkret statt vage: Mengen, Zeitpuffer, typische Vergesslichkeiten ("Powerbank!", "Ersatzkleidung").
- Bei Budgets: grobe Kostenschätzung als Tabelle.
- Maximal so lang wie nötig — lieber 25 treffende Punkte als 60 generische.`,
    buildPrompt: (f) => `Plane: ${f.anlass}. Details: ${f.details}`,
    required: ["details"],
    checklist: true,
  },
];

// ---------- Routing ----------

export function route(container, parts) {
  document.body.classList.add("theme-hub");
  if (parts.length === 0) return renderHome(container);
  const module = MODULES.find((m) => m.id === parts[0]);
  if (module) return renderModule(container, module);
  location.hash = "#/hub";
}

// ---------- Übersicht ----------

function renderHome(container) {
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🏠 Alltagshelfer"),
      el("p", {}, "Fünf Helfer für den Familienalltag. Fotos und Eingaben werden direkt an die Claude-API geschickt und nirgendwo sonst gespeichert."),
    ),
    el("div", { class: "module-grid" },
      ...MODULES.map((m) =>
        el("button", { class: "module-card", onclick: () => (location.hash = `#/hub/${m.id}`) },
          el("span", { class: "module-emoji" }, m.emoji),
          el("strong", {}, m.title),
          el("small", {}, m.desc),
        ),
      ),
    ),
  );
}

// ---------- Modul-Ansicht ----------

function renderModule(container, module) {
  const convo = el("div", { class: "convo" });
  const followupArea = el("div", { class: "followup" });
  let session = getHubSession(module.id) || { messages: [] };
  let imageFiles = [];

  // ----- Formular bauen -----
  const fieldEls = {};
  const form = el("form", { class: "panel module-form" });
  form.append(el("h2", {}, `${module.emoji} ${module.title}`), el("p", { class: "muted" }, module.desc));

  if (module.images) {
    const preview = el("div", { class: "drawing-preview" });
    const input = el("input", {
      type: "file", accept: "image/*", multiple: module.images.max > 1 ? "" : null, class: "file-input",
      onchange: (e) => {
        imageFiles = [...e.target.files].slice(0, module.images.max);
        preview.replaceChildren(...imageFiles.map((f) => {
          const img = el("img", { alt: f.name });
          img.src = URL.createObjectURL(f);
          return img;
        }));
      },
    });
    form.append(el("label", { class: "upload-label" }, `📷 ${module.images.label}`, input), preview);
  }

  for (const field of module.fields || []) {
    let input;
    if (field.type === "textarea") input = el("textarea", { class: "input", rows: "3", placeholder: field.placeholder || "" });
    else if (field.type === "select") input = el("select", { class: "input" }, ...field.options.map((o) => el("option", { value: o }, o)));
    else input = el("input", { class: "input", placeholder: field.placeholder || "" });
    fieldEls[field.id] = input;
    form.append(el("label", { class: "field-label" }, field.label, input));
  }

  const submitBtn = el("button", { class: "btn btn-big", type: "submit" }, "✨ Los!");
  const formStatus = el("div", { class: "status-area" });
  form.append(submitBtn, formStatus);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(Object.entries(fieldEls).map(([id, node]) => [id, node.value.trim()]));
    values._hasImages = imageFiles.length > 0;

    for (const req of module.required || []) {
      if (!values[req]) { formStatus.replaceChildren(el("p", { class: "error" }, "Bitte fülle das Feld aus — sonst weiß Claude nicht, worum es geht.")); return; }
    }
    if (module.needsImagesOrText && !values._hasImages && !values[module.needsImagesOrText]) {
      formStatus.replaceChildren(el("p", { class: "error" }, "Bitte lade ein Foto hoch oder beschreibe es im Textfeld.")); return;
    }

    submitBtn.disabled = true;
    formStatus.replaceChildren();
    try {
      const blocks = [];
      for (const f of imageFiles) blocks.push(await fileToImageBlock(f, module.images?.maxEdge || 1600));
      blocks.push({ type: "text", text: module.buildPrompt(values) });

      session = { messages: [{ role: "user", content: blocks }] };
      await runAssistant();
      form.classList.add("collapsed");
    } catch (err) {
      formStatus.replaceChildren(el("p", { class: "error" }, friendlyError(err)));
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ----- Konversation -----

  async function renderConvo() {
    convo.replaceChildren();
    for (const msg of session.messages) {
      if (msg.role === "user") {
        const text = typeof msg.content === "string" ? msg.content : (msg.content.find((b) => b.type === "text")?.text || "📷 (Foto)");
        const hasImg = Array.isArray(msg.content) && msg.content.some((b) => b.type === "image");
        convo.append(el("div", { class: "bubble bubble-action" }, (hasImg ? "📷 " : "") + text));
      } else {
        const node = el("div", { class: "bubble bubble-story" });
        node.innerHTML = await md(typeof msg.content === "string" ? msg.content : "");
        if (module.checklist) makeChecklists(node);
        convo.append(node);
      }
    }
    scrollToBottom(document.documentElement);
  }

  async function runAssistant(retryOf = null) {
    const bubble = el("div", { class: "bubble bubble-story" });
    convo.append(bubble);
    const spin = spinner("Claude liest und denkt nach …");
    convo.append(spin);

    let renderPending = false;
    try {
      const { text } = await sendMessage(
        {
          system: module.system,
          messages: session.messages,
          maxTokens: 16000,
        },
        {
          onText: (_, full) => {
            if (renderPending) return;
            renderPending = true;
            setTimeout(async () => {
              renderPending = false;
              bubble.innerHTML = await md(full);
            }, 150);
          },
        },
      );
      spin.remove();
      bubble.innerHTML = await md(text);
      if (module.checklist) makeChecklists(bubble);
      session.messages.push({ role: "assistant", content: text });
      setHubSession(module.id, session);
      renderFollowup();
    } catch (err) {
      spin.remove();
      bubble.remove();
      // Bei Fehlern letzte User-Nachricht zurücknehmen, damit der Verlauf stimmt
      const lastUser = session.messages[session.messages.length - 1];
      followupArea.replaceChildren(
        el("p", { class: "error" }, friendlyError(err)),
        el("button", {
          class: "btn",
          onclick: () => { followupArea.replaceChildren(); runAssistant(); },
        }, "🔄 Nochmal versuchen"),
      );
      if (lastUser?.role === "user" && retryOf === null) {
        // Nachricht bleibt im Verlauf — der Retry-Button sendet sie erneut.
      }
    }
  }

  function renderFollowup() {
    const input = el("input", { class: "input", placeholder: "Nachfrage stellen … (z. B. „Mach den Brief kürzer“ / „nächste Frage“)", maxlength: "500" });
    const send = el("button", { class: "btn" }, "➤");
    const reset = el("button", { class: "btn btn-ghost", title: "Neu starten" }, "🗑 Neu starten");
    send.addEventListener("click", async () => {
      const v = input.value.trim();
      if (!v) return;
      session.messages.push({ role: "user", content: v });
      await renderConvo();
      followupArea.replaceChildren();
      await runAssistant();
    });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") send.click(); });
    reset.addEventListener("click", () => {
      if (!confirm("Verlauf in diesem Modul löschen?")) return;
      clearHubSession(module.id);
      location.reload();
    });
    followupArea.replaceChildren(el("div", { class: "free-input" }, input, send), reset);
  }

  container.replaceChildren(form, convo, followupArea);

  // Frühere Sitzung wiederherstellen
  if (session.messages.length) {
    form.classList.add("collapsed");
    renderConvo().then(() => {
      if (session.messages[session.messages.length - 1]?.role === "assistant") renderFollowup();
      else runAssistant();
    });
  }

  // Eingeklapptes Formular wieder öffnen können
  form.addEventListener("click", () => {
    if (form.classList.contains("collapsed")) form.classList.remove("collapsed");
  });
}
