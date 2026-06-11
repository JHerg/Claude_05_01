// Die Abenteuer-Maschine: Claude als Spielleiter eines Text-Adventures
// mit HUD (Herzen, Inventar, Quest), SVG-Szenenbildern und Würfelproben.

import { sendMessage, fileToImageBlock, friendlyError } from "./api.js";
import { listSaves, getSave, putSave, deleteSave, newId, getSettings } from "./storage.js";
import { el, md, safeSvg, spinner, escapeHtml, scrollToBottom } from "./ui.js";

const SCENARIOS = [
  {
    id: "drache", emoji: "🐉", title: "Drachenfeuer",
    tagline: "Rette das Königreich Funkenfels vor dem erwachten Schattendrachen.",
    world: "Fantasy-Königreich Funkenfels: Burgen, Zauberwälder, sprechende Tiere. Der Held ist ein junger Drachenhüter-Lehrling. Der uralte Schattendrache ist erwacht und stiehlt alle Farben des Landes. Quest: die drei Farbkristalle finden und den Drachen nicht besiegen, sondern von seiner Einsamkeit heilen.",
  },
  {
    id: "raum", emoji: "🚀", title: "Sternenbasis 7",
    tagline: "Deine Raumstation treibt führerlos durchs All — übernimm das Kommando!",
    world: "Science-Fiction: Die Raumstation 'Sternenbasis 7' mit schrulligem Bord-Roboter B0B. Die Crew ist in Rettungskapseln evakuiert, der Held (Junior-Kadett) blieb versehentlich zurück. Quest: die Station durch einen Asteroidengürtel steuern, den Reaktor flicken und das Geheimnis des blinden Passagiers (ein harmloses, hungriges Glibberwesen) lüften.",
  },
  {
    id: "detektiv", emoji: "🕵️", title: "Detektivbüro Blitz",
    tagline: "Der Pokal der Schule ist verschwunden. Ein Fall für dich!",
    world: "Gegenwart, Kleinstadt: Der Held leitet das geheime 'Detektivbüro Blitz' im Baumhaus. Der Wanderpokal der Schule ist vor dem großen Fest verschwunden. Verdächtige: der mürrische Hausmeister, die neue Schülerin, eine diebische Elster. Quest: Hinweise sammeln, Alibis prüfen, den Fall mit Köpfchen lösen (die Auflösung ist harmlos und versöhnlich).",
  },
  {
    id: "insel", emoji: "🏝️", title: "Die vergessene Insel",
    tagline: "Schiffbruch! Überlebe, erforsche und finde den Piratenschatz.",
    world: "Abenteuer-Insel: Nach einem Sturm strandet der Held auf einer tropischen Insel mit Dschungel, Lagune, alten Piratenruinen und einem frechen Papagei als Begleiter. Quest: ein Lager bauen, die Rätselkarte des Piraten Knochenbein entschlüsseln, den Schatz finden und mit dem reparierten Boot heimkehren.",
  },
  {
    id: "fussball", emoji: "⚽", title: "Pokal der Legenden",
    tagline: "Führe den FC Wirbelwind zum magischen Turnier-Sieg.",
    world: "Fußball mit einer Prise Magie: Der Held ist Kapitän des Außenseiter-Teams FC Wirbelwind beim geheimnisvollen 'Pokal der Legenden'. Gegner-Teams haben verrückte Spezialkräfte. Quest: Training, Taktik und Teamgeist — zwischen den Spielen gibt es Rätsel und kleine Missionen, Spiele werden als spannende Szenen mit Entscheidungen erzählt.",
  },
  {
    id: "frei", emoji: "✨", title: "Eigene Idee",
    tagline: "Du bestimmst, worum es geht — Claude baut die Welt.",
    world: "",
  },
];

// Structured Output: garantiert parsebares JSON für jeden Spielzug.
const GAME_FORMAT = {
  type: "json_schema",
  schema: {
    type: "object",
    properties: {
      story: { type: "string", description: "Nächster Erzählabschnitt in Markdown, 80–180 Wörter, Deutsch, du-Form." },
      scene_svg: { type: "string", description: "Inline-SVG der Szene (viewBox 0 0 400 240) oder leerer String, wenn die Szene gleich bleibt." },
      choices: { type: "array", items: { type: "string" }, description: "Genau 3 kurze Handlungsoptionen (max. 8 Wörter)." },
      state: {
        type: "object",
        properties: {
          hp: { type: "integer", description: "Aktuelle Herzen." },
          max_hp: { type: "integer", description: "Maximale Herzen." },
          location: { type: "string", description: "Aktueller Ort, kurz." },
          inventory: { type: "array", items: { type: "string" }, description: "Gegenstände, je mit Emoji vorne, max. 8." },
          quest: { type: "string", description: "Aktuelles Ziel in einem Satz." },
        },
        required: ["hp", "max_hp", "location", "inventory", "quest"],
        additionalProperties: false,
      },
      dice_check: { type: "string", description: "Beschreibung der anstehenden Würfelprobe oder leerer String." },
      game_over: { type: "boolean", description: "true nur beim Happy End der Quest." },
    },
    required: ["story", "scene_svg", "choices", "state", "dice_check", "game_over"],
    additionalProperties: false,
  },
};

function buildSystemPrompt(save) {
  const learning = save.learning
    ? "Baue etwa jede 3.–4. Runde ein kleines Lernrätsel in die Geschichte ein (Kopfrechnen, Logik oder einfache Englisch-Vokabeln) — z. B. ein Zahlenschloss, einen Geheimcode oder einen Zauberspruch. Die richtige Antwort bringt einen Vorteil, eine falsche ist nie schlimm."
    : "Baue keine Schul-Lernrätsel ein.";
  return `Du bist der Spielleiter eines interaktiven Text-Abenteuers für ein Kind (ca. 10–12 Jahre).

INHALTSREGELN
- Sprache: Deutsch, du-Form, lebendig, humorvoll, kurze Sätze.
- Spannend, aber altersgerecht: keine grausamen Details, kein Blut, kein echter Horror, nichts Verstörendes. Gegner werden überlistet, vertrieben oder versöhnt.
- Der Held kann scheitern, aber nie endgültig: Bei 0 Herzen wird er auf freundliche Weise gerettet, verliert etwas Zeit oder einen Gegenstand, und es geht weiter (game_over bleibt false, hp wird wieder aufgefüllt).
- game_over ist nur true bei einem richtigen, positiven Abschluss der Quest (Happy End mit kleiner Feier).
- Keine Markennamen, keine Links, keine Anspielungen auf echte Personen.
- Wenn der Spieler etwas Unpassendes eingibt, lenke charmant zurück zur Geschichte.

SPIELMECHANIK
- story: 80–180 Wörter, endet immer mit einer Situation, die eine Entscheidung verlangt.
- choices: genau 3 kurze, klar unterschiedliche Optionen.
- Der Spieler darf auch freie Aktionen tippen — reagiere fair und kreativ.
- state: Führe Herzen (Start 5/5), Ort, Inventar (mit Emoji, max. 8) und Quest konsequent und widerspruchsfrei weiter. Gegenstände, die benutzt werden, verschwinden; gefundene kommen dazu.
- dice_check: Wenn die gewählte Aktion riskant ist, fordere EINE Würfelprobe an. Beschreibe kurz, was bei 4–6 (Erfolg) und 1–3 (Misserfolg, z. B. -1 Herz) passiert. Der Spieler antwortet mit "🎲 Gewürfelt: N" — werte das Ergebnis dann genau so aus. Sonst leerer String. Höchstens jede zweite Runde eine Probe.
- ${learning}

SZENENBILD (scene_svg)
- Male zu neuen Schauplätzen oder dramatischen Momenten eine Illustration als Inline-SVG: viewBox="0 0 400 240", flaches, freundliches Comic-Design, kräftige Farben, große einfache Formen, weicher Himmel-/Hintergrundverlauf erlaubt.
- KEINE Script-Tags, keine externen Referenzen, keine Event-Handler, kein Text nötig.
- Wenn die Szene praktisch gleich bleibt: leerer String.

WELT
${save.world}

HELD
Name: ${save.heroName}${save.heroFromDrawing ? "\nDer Spieler hat seinen Helden selbst gezeichnet (siehe Bild in der ersten Nachricht). Beschreibe den Helden im Spiel genau so, wie er auf der Zeichnung aussieht, und erwähne liebevoll Details daraus." : ""}`;
}

function parseTurn(text) {
  try { return JSON.parse(text); } catch { /* weiter unten */ }
  const m = text.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch { /* gibt null */ } }
  return null;
}

function userTextOf(content) {
  if (typeof content === "string") return content;
  const t = content.find((b) => b.type === "text");
  return t ? t.text : "";
}

// ---------- Routing ----------

export async function route(container, parts) {
  document.body.classList.add("theme-adventure");
  if (parts.length === 0) return renderHome(container);
  if (parts[0] === "new") return renderNewGame(container);
  if (parts[0] === "play" && parts[1]) return renderPlay(container, parts[1]);
  location.hash = "#/adventure";
}

// ---------- Startseite ----------

function renderHome(container) {
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🐉 Abenteuer-Maschine"),
      el("p", {}, "Claude ist dein Spielleiter. Wähle eine Welt, erschaffe deinen Helden — und erlebe eine Geschichte, die auf alles reagiert, was du tust."),
      el("button", { class: "btn btn-big", onclick: () => (location.hash = "#/adventure/new") }, "✨ Neues Abenteuer starten"),
    ),
  );

  const saves = listSaves();
  if (saves.length) {
    const list = el("div", { class: "save-list" });
    for (const s of saves) {
      const scen = SCENARIOS.find((x) => x.id === s.scenarioId);
      list.append(
        el("div", { class: "save-card" },
          el("div", { class: "save-info" },
            el("strong", {}, `${scen?.emoji || "✨"} ${s.title}`),
            el("small", {}, `${s.turns} Züge · zuletzt ${new Date(s.updatedAt).toLocaleDateString("de-DE")}`),
          ),
          el("div", { class: "save-actions" },
            el("button", { class: "btn", onclick: () => (location.hash = `#/adventure/play/${s.id}`) }, "▶ Weiterspielen"),
            el("button", {
              class: "btn btn-ghost", title: "Spielstand löschen",
              onclick: () => { if (confirm(`„${s.title}" wirklich löschen?`)) { deleteSave(s.id); renderHome(container); } },
            }, "🗑"),
          ),
        ),
      );
    }
    container.append(el("h3", {}, "Deine Spielstände"), list);
  }
}

// ---------- Neues Spiel ----------

function renderNewGame(container) {
  let selectedScenario = SCENARIOS[0].id;
  let drawingFile = null;

  const scenarioGrid = el("div", { class: "scenario-grid" });
  const customIdea = el("textarea", {
    class: "input", rows: "3", style: "display:none",
    placeholder: "Worum soll es gehen? Z. B.: Ich bin ein Ninja-Hamster, der den Käsemond retten muss …",
  });

  const refreshCards = () => {
    scenarioGrid.replaceChildren(...SCENARIOS.map((s) =>
      el("button", {
        class: "scenario-card" + (s.id === selectedScenario ? " selected" : ""),
        type: "button",
        onclick: () => { selectedScenario = s.id; customIdea.style.display = s.id === "frei" ? "" : "none"; refreshCards(); },
      },
        el("span", { class: "scenario-emoji" }, s.emoji),
        el("strong", {}, s.title),
        el("small", {}, s.tagline),
      ),
    ));
  };
  refreshCards();

  const nameInput = el("input", { class: "input", placeholder: "Wie heißt dein Held?", maxlength: "30", value: getSettings().kidName || "" });
  const learningToggle = el("input", { type: "checkbox" });
  const drawingPreview = el("div", { class: "drawing-preview" });
  const drawingInput = el("input", {
    type: "file", accept: "image/*", class: "file-input",
    onchange: (e) => {
      drawingFile = e.target.files[0] || null;
      drawingPreview.replaceChildren();
      if (drawingFile) {
        const img = el("img", { alt: "Deine Helden-Zeichnung" });
        img.src = URL.createObjectURL(drawingFile);
        drawingPreview.append(img, el("small", {}, "Claude baut deine Zeichnung in die Geschichte ein! 🎨"));
      }
    },
  });

  const status = el("div", { class: "status-area" });
  const startBtn = el("button", { class: "btn btn-big" }, "🎲 Los geht's!");

  startBtn.addEventListener("click", async () => {
    const heroName = nameInput.value.trim() || "Alex";
    const scen = SCENARIOS.find((s) => s.id === selectedScenario);
    let world = scen.world;
    if (scen.id === "frei") {
      const idea = customIdea.value.trim();
      if (!idea) { status.replaceChildren(el("p", { class: "error" }, "Schreib kurz auf, worum dein Abenteuer gehen soll!")); return; }
      world = `Vom Spieler gewünschte Welt (baue daraus ein rundes Abenteuer mit klarer Quest): ${idea}`;
    }

    startBtn.disabled = true;
    status.replaceChildren(spinner("Die Welt wird erschaffen …"));

    try {
      const firstContent = [];
      if (drawingFile) {
        firstContent.push(await fileToImageBlock(drawingFile, 1024));
      }
      firstContent.push({
        type: "text",
        text: "Starte das Abenteuer: Stelle den Schauplatz und meinen Helden vor, gib mir die Start-Quest und die erste Entscheidung.",
      });

      const save = {
        id: newId(),
        scenarioId: scen.id,
        title: `${scen.id === "frei" ? "Eigenes Abenteuer" : scen.title} – ${heroName}`,
        heroName,
        heroFromDrawing: !!drawingFile,
        world,
        learning: learningToggle.checked,
        createdAt: Date.now(),
        messages: [{ role: "user", content: firstContent }],
        last: null,
      };
      putSave(save);
      location.hash = `#/adventure/play/${save.id}`;
    } catch (err) {
      startBtn.disabled = false;
      status.replaceChildren(el("p", { class: "error" }, friendlyError(err)));
    }
  });

  container.replaceChildren(
    el("section", { class: "panel" },
      el("h2", {}, "✨ Neues Abenteuer"),
      el("h3", {}, "1. Wähle deine Welt"),
      scenarioGrid,
      customIdea,
      el("h3", {}, "2. Dein Held"),
      nameInput,
      el("label", { class: "upload-label" },
        "Optional: Male deinen Helden auf Papier, mach ein Foto und lade es hoch —",
        drawingInput,
      ),
      drawingPreview,
      el("label", { class: "toggle-label" }, learningToggle, " Geheime Lernrätsel einbauen (Mathe, Logik, Englisch)"),
      startBtn,
      status,
    ),
  );
}

// ---------- Spielen ----------

async function renderPlay(container, saveId) {
  const save = getSave(saveId);
  if (!save) { location.hash = "#/adventure"; return; }

  const scene = el("div", { class: "scene" });
  const log = el("div", { class: "story-log" });
  const actions = el("div", { class: "actions" });
  const hud = {
    hearts: el("div", { class: "hud-hearts" }),
    location: el("div", { class: "hud-row" }),
    quest: el("div", { class: "hud-quest" }),
    inventory: el("div", { class: "hud-inventory" }),
  };

  container.replaceChildren(
    el("div", { class: "game" },
      el("div", { class: "game-main" }, scene, log, actions),
      el("aside", { class: "game-side" },
        el("h3", {}, save.heroName),
        hud.hearts, hud.location,
        el("h4", {}, "🎯 Quest"), hud.quest,
        el("h4", {}, "🎒 Rucksack"), hud.inventory,
      ),
    ),
  );

  async function appendStory(storyMd) {
    const node = el("div", { class: "bubble bubble-story" });
    node.innerHTML = await md(storyMd);
    log.append(node);
    scrollToBottom(log);
  }

  function appendAction(text) {
    log.append(el("div", { class: "bubble bubble-action" }, text));
    scrollToBottom(log);
  }

  async function updateScene(svgText) {
    if (!svgText) return;
    const safe = await safeSvg(svgText);
    if (safe) scene.innerHTML = safe;
  }

  function updateHud(state) {
    if (!state) return;
    const hp = Math.max(0, Math.min(state.hp ?? 5, 10));
    const max = Math.max(hp, Math.min(state.max_hp ?? 5, 10));
    hud.hearts.textContent = "❤️".repeat(hp) + "🤍".repeat(max - hp);
    hud.location.textContent = "📍 " + (state.location || "Unbekannt");
    hud.quest.textContent = state.quest || "—";
    hud.inventory.replaceChildren(
      ...(state.inventory?.length
        ? state.inventory.map((item) => el("span", { class: "chip" }, item))
        : [el("small", {}, "noch leer")]),
    );
  }

  function showError(message, retry) {
    actions.replaceChildren(
      el("p", { class: "error" }, message),
      el("button", { class: "btn", onclick: retry }, "🔄 Nochmal versuchen"),
    );
  }

  function showGameOver() {
    actions.replaceChildren(
      el("div", { class: "game-over" },
        el("h3", {}, "🎉 Quest geschafft! 🎉"),
        el("p", {}, "Was für ein Abenteuer! Dein Spielstand bleibt gespeichert — oder du startest gleich das nächste."),
        el("button", { class: "btn btn-big", onclick: () => (location.hash = "#/adventure/new") }, "✨ Neues Abenteuer"),
      ),
    );
  }

  function showChoices(turn) {
    actions.replaceChildren();

    if (turn.game_over) { showGameOver(); return; }

    if (turn.dice_check) {
      const desc = el("p", { class: "dice-desc" }, "🎲 " + turn.dice_check);
      const die = el("button", { class: "btn btn-dice" }, "🎲 Würfeln!");
      die.addEventListener("click", () => {
        die.disabled = true;
        let ticks = 0;
        const interval = setInterval(() => {
          die.textContent = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][Math.floor(Math.random() * 6)];
          if (++ticks >= 10) {
            clearInterval(interval);
            const n = 1 + Math.floor(Math.random() * 6);
            die.textContent = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][n - 1] + ` Du hast eine ${n} gewürfelt!`;
            setTimeout(() => runTurn(`🎲 Gewürfelt: ${n}`), 900);
          }
        }, 90);
      });
      actions.append(desc, die);
      return;
    }

    const choiceWrap = el("div", { class: "choices" });
    for (const c of turn.choices?.slice(0, 3) || []) {
      choiceWrap.append(el("button", { class: "btn btn-choice", onclick: () => runTurn(c) }, c));
    }
    const input = el("input", { class: "input", placeholder: "… oder schreib selbst, was du tust!" , maxlength: "200"});
    const send = el("button", { class: "btn", onclick: () => { const v = input.value.trim(); if (v) runTurn(v); } }, "➤");
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") send.click(); });
    actions.append(choiceWrap, el("div", { class: "free-input" }, input, send));
    input.focus();
  }

  async function runTurn(userText) {
    if (userText) {
      save.messages.push({ role: "user", content: userText });
      appendAction(userText);
    }
    actions.replaceChildren(spinner("Der Erzähler schreibt …"));

    try {
      const { text } = await sendMessage({
        system: buildSystemPrompt(save),
        messages: save.messages,
        outputFormat: GAME_FORMAT,
        maxTokens: 16000,
      });

      save.messages.push({ role: "assistant", content: text });
      const turn = parseTurn(text);

      if (!turn) {
        // Sollte mit Structured Outputs praktisch nie passieren — Text trotzdem zeigen.
        await appendStory(text);
        save.last = null;
        putSave(save);
        showChoices({ choices: [], dice_check: "", game_over: false });
        return;
      }

      save.last = turn;
      putSave(save);
      await updateScene(turn.scene_svg);
      updateHud(turn.state);
      await appendStory(turn.story);
      showChoices(turn);
    } catch (err) {
      // Fehlgeschlagenen Zug zurücknehmen, damit der Verlauf konsistent bleibt
      if (userText) save.messages.pop();
      showError(friendlyError(err), () => runTurn(userText));
    }
  }

  // ----- Verlauf wiederherstellen -----
  let firstMessage = true;
  for (const msg of save.messages) {
    if (msg.role === "user") {
      if (firstMessage) { appendAction("🚀 Das Abenteuer beginnt …"); firstMessage = false; }
      else appendAction(userTextOf(msg.content));
    } else {
      const turn = parseTurn(msg.content);
      if (turn) await appendStory(turn.story);
      else await appendStory(String(msg.content));
    }
  }

  const lastMsg = save.messages[save.messages.length - 1];
  if (lastMsg?.role === "user") {
    // Frischer Spielstand (oder abgebrochener Zug): Antwort jetzt holen
    runTurn(null);
  } else if (save.last) {
    await updateScene(save.last.scene_svg);
    updateHud(save.last.state);
    showChoices(save.last);
  } else {
    showChoices({ choices: [], dice_check: "", game_over: false });
  }
}
