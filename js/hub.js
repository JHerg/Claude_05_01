// Der Alltagshelfer (offline): Lern-Trainer, Koch-Pilot, Schreibwerkstatt,
// Planer und Taschengeld-Tracker — alles ohne Internet, ohne Kosten.

import { RECIPES, LETTERS, CHECKLISTS, VOCAB_SETS } from "./data.js";
import { getModuleState, setModuleState, newId } from "./storage.js";
import { el, escapeHtml, pick, shuffle } from "./ui.js";

const MODULES = [
  { id: "lernen", emoji: "🧠", title: "Lern-Trainer", desc: "Kopfrechnen, Einmaleins-Sprint und Englisch-Vokabeln — mit Bestenliste.", render: renderLernen },
  { id: "kochen", emoji: "🍳", title: "Koch-Pilot", desc: "Rezept finden oder Wochenplan würfeln — mit abhakbarer Einkaufsliste.", render: renderKochen },
  { id: "schreiben", emoji: "✍️", title: "Schreibwerkstatt", desc: "Entschuldigung, Kündigung, Reklamation, Einladung — ausfüllen, fertig.", render: renderSchreiben },
  { id: "planen", emoji: "🗓️", title: "Planer", desc: "Geburtstag, Urlaub, Packliste, Umzug — durchdachte Checklisten zum Abhaken.", render: renderPlanen },
  { id: "geld", emoji: "💰", title: "Taschengeld", desc: "Kontostand, Sparziel und Verlauf — für jedes Kind ein eigenes Konto.", render: renderGeld },
];

export function route(container, parts) {
  document.body.classList.add("theme-hub");
  if (parts.length === 0) return renderHome(container);
  const module = MODULES.find((m) => m.id === parts[0]);
  if (module) {
    container.replaceChildren(
      el("section", { class: "hero hero-small" },
        el("h2", {}, `${module.emoji} ${module.title}`),
      ),
    );
    return module.render(container);
  }
  location.hash = "#/hub";
}

function renderHome(container) {
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🏠 Alltagshelfer"),
      el("p", {}, "Fünf Helfer für jeden Tag — komplett offline, ohne Anmeldung, ohne Kosten."),
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

/* ==================== 🧠 Lern-Trainer ==================== */

function renderLernen(container) {
  const menu = el("div", { class: "module-grid" },
    el("button", { class: "module-card", onclick: () => kopfrechnen(container) },
      el("span", { class: "module-emoji" }, "➕"), el("strong", {}, "Kopfrechnen"), el("small", {}, "10 Aufgaben, drei Schwierigkeiten, Bestenliste.")),
    el("button", { class: "module-card", onclick: () => sprint(container) },
      el("span", { class: "module-emoji" }, "⚡"), el("strong", {}, "Einmaleins-Sprint"), el("small", {}, "60 Sekunden — wie viele schaffst du?")),
    el("button", { class: "module-card", onclick: () => vokabeln(container) },
      el("span", { class: "module-emoji" }, "🇬🇧"), el("strong", {}, "Englisch-Vokabeln"), el("small", {}, "Lernkarten und Quiz, 4 Themen-Sets.")),
  );
  container.append(menu, bestenliste());
}

function bestenliste() {
  const best = getModuleState("lernen_best", {});
  const rows = Object.entries(best);
  if (!rows.length) return el("p", { class: "muted center" }, "Noch keine Bestleistungen — gleich ändern! 💪");
  return el("section", { class: "panel" },
    el("h3", {}, "🏆 Bestenliste"),
    ...rows.map(([k, v]) => el("div", { class: "cost-row" }, el("span", {}, k), el("strong", {}, String(v)))),
  );
}

function saveBest(key, value, higherIsBetter = true) {
  const best = getModuleState("lernen_best", {});
  if (best[key] === undefined || (higherIsBetter ? value > best[key] : value < best[key])) {
    best[key] = value;
    setModuleState("lernen_best", best);
    return true;
  }
  return false;
}

function mathTask(level) {
  const r = (n) => 1 + Math.floor(Math.random() * n);
  if (level === "leicht") {
    if (Math.random() < 0.5) { const a = r(50), b = r(50); return { q: `${a} + ${b}`, a: a + b }; }
    const a = r(80), b = r(Math.min(a, 40)); return { q: `${a} − ${b}`, a: a - b };
  }
  if (level === "mittel") {
    const t = Math.random();
    if (t < 0.4) { const a = 2 + r(8), b = 2 + r(8); return { q: `${a} × ${b}`, a: a * b }; }
    if (t < 0.7) { const b = 2 + r(8), c = 2 + r(8); return { q: `${b * c} ÷ ${b}`, a: c }; }
    const a = r(400), b = r(400); return { q: `${a} + ${b}`, a: a + b };
  }
  // schwer
  const t = Math.random();
  if (t < 0.4) { const a = 11 + r(14), b = 3 + r(9); return { q: `${a} × ${b}`, a: a * b }; }
  if (t < 0.7) { const a = r(900), b = r(900); return { q: `${a} + ${b}`, a: a + b }; }
  const a = 200 + r(700), b = r(199); return { q: `${a} − ${b}`, a: a - b };
}

function quizRunner(container, { title, total, nextTask, onDone, timed }) {
  let i = 0, score = 0, finished = false;
  let current = nextTask();
  const qEl = el("div", { class: "quiz-question" }, current.q);
  const input = el("input", { class: "input input-quiz", inputmode: "numeric", placeholder: "=", autocomplete: "off" });
  const feedback = el("p", { class: "quiz-feedback" });
  const progress = el("p", { class: "muted" });
  const timerEl = el("p", { class: "quiz-timer" });

  const update = () => { progress.textContent = timed ? `Richtig: ${score}` : `Aufgabe ${i + 1} von ${total} · Richtig: ${score}`; };
  update();

  let timeLeft = 60;
  let timer = null;
  if (timed) {
    timerEl.textContent = "⏱ 60 s";
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `⏱ ${timeLeft} s`;
      if (timeLeft <= 0) done();
    }, 1000);
  }

  function done() {
    if (finished) return;
    finished = true;
    if (timer) clearInterval(timer);
    onDone(score, container);
  }

  function check() {
    const v = input.value.trim();
    if (!v) return;
    if (parseInt(v, 10) === current.a) {
      score++;
      feedback.textContent = "✅ Richtig!";
      feedback.className = "quiz-feedback success";
    } else {
      feedback.textContent = `❌ Leider nein — richtig war ${current.a}.`;
      feedback.className = "quiz-feedback error";
    }
    i++;
    if (!timed && i >= total) { setTimeout(done, 800); return; }
    current = nextTask();
    qEl.textContent = current.q;
    input.value = "";
    input.focus();
    update();
  }

  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });

  container.replaceChildren(
    el("section", { class: "panel panel-narrow quiz" },
      el("h3", {}, title),
      timerEl, qEl,
      el("div", { class: "free-input" }, input, el("button", { class: "btn", onclick: check }, "➤")),
      feedback, progress,
      el("button", { class: "btn btn-ghost btn-small", onclick: () => (location.hash = "#/hub/lernen", route(container, ["lernen"])) }, "Abbrechen"),
    ),
  );
  input.focus();
}

function kopfrechnen(container) {
  const start = (level, label) => quizRunner(container, {
    title: `➕ Kopfrechnen — ${label}`,
    total: 10,
    nextTask: () => mathTask(level),
    onDone: (score) => {
      const isBest = saveBest(`Kopfrechnen (${label}), von 10`, score);
      result(container, "lernen", `${score} von 10 richtig!`, score >= 8 ? "🌟 Stark!" : score >= 5 ? "👍 Gut dabei — nochmal?" : "💪 Übung macht den Meister!", isBest);
    },
  });
  container.replaceChildren(
    el("section", { class: "panel panel-narrow" },
      el("h3", {}, "➕ Kopfrechnen — wähle die Stufe"),
      el("div", { class: "choices" },
        el("button", { class: "btn btn-choice", onclick: () => start("leicht", "leicht") }, "🟢 Leicht — Plus & Minus bis 100"),
        el("button", { class: "btn btn-choice", onclick: () => start("mittel", "mittel") }, "🟡 Mittel — Einmaleins & Plus bis 800"),
        el("button", { class: "btn btn-choice", onclick: () => start("schwer", "schwer") }, "🔴 Schwer — großes Einmaleins & bis 1800"),
      ),
    ),
  );
}

function sprint(container) {
  quizRunner(container, {
    title: "⚡ Einmaleins-Sprint",
    timed: true,
    nextTask: () => { const a = 2 + Math.floor(Math.random() * 8), b = 2 + Math.floor(Math.random() * 8); return { q: `${a} × ${b}`, a: a * b }; },
    onDone: (score) => {
      const isBest = saveBest("Einmaleins-Sprint (60 s)", score);
      result(container, "lernen", `${score} Aufgaben in 60 Sekunden!`, score >= 20 ? "🚀 Raketen-Tempo!" : score >= 12 ? "⚡ Flott unterwegs!" : "🐢 Beim nächsten Mal klappt mehr!", isBest);
    },
  });
}

function result(container, backTo, big, sub, isBest) {
  container.replaceChildren(
    el("section", { class: "panel panel-narrow center" },
      el("h3", {}, isBest ? "🏆 Neuer Rekord!" : "Geschafft!"),
      el("p", { class: "quiz-big" }, big),
      el("p", {}, sub),
      el("button", { class: "btn btn-big", onclick: () => route(container, [backTo]) }, "Weiter"),
    ),
  );
}

function vokabeln(container) {
  const setButtons = VOCAB_SETS.map((set) =>
    el("button", { class: "btn btn-choice", onclick: () => vokabelSet(container, set) }, `${set.emoji} ${set.title} (${set.words.length} Wörter)`),
  );
  container.replaceChildren(
    el("section", { class: "panel panel-narrow" },
      el("h3", {}, "🇬🇧 Vokabeln — wähle ein Set"),
      el("div", { class: "choices" }, ...setButtons),
    ),
  );
}

function vokabelSet(container, set) {
  container.replaceChildren(
    el("section", { class: "panel panel-narrow" },
      el("h3", {}, `${set.emoji} ${set.title}`),
      el("div", { class: "choices" },
        el("button", { class: "btn btn-choice", onclick: () => flashcards(container, set) }, "🃏 Lernkarten (tippen zum Umdrehen)"),
        el("button", { class: "btn btn-choice", onclick: () => vocabQuiz(container, set) }, "❓ Quiz (10 Fragen)"),
        el("button", { class: "btn btn-ghost", onclick: () => vokabeln(container) }, "Zurück"),
      ),
    ),
  );
}

function flashcards(container, set) {
  const cards = shuffle(set.words);
  let i = 0, flipped = false;
  const card = el("button", { class: "flashcard" });
  const progress = el("p", { class: "muted center" });

  const draw = () => {
    const [en, de] = cards[i];
    card.innerHTML = flipped
      ? `<small>🇩🇪</small><strong>${escapeHtml(de)}</strong><small>tippen für nächste Karte</small>`
      : `<small>🇬🇧</small><strong>${escapeHtml(en)}</strong><small>tippen zum Umdrehen</small>`;
    progress.textContent = `Karte ${i + 1} von ${cards.length}`;
  };
  card.addEventListener("click", () => {
    if (!flipped) { flipped = true; draw(); return; }
    flipped = false;
    i++;
    if (i >= cards.length) { result(container, "lernen", "Alle Karten durch! 🎉", "Wie wär's jetzt mit dem Quiz?", false); return; }
    draw();
  });
  draw();
  container.replaceChildren(
    el("section", { class: "panel panel-narrow center" },
      el("h3", {}, `🃏 ${set.title}`),
      card, progress,
      el("button", { class: "btn btn-ghost btn-small", onclick: () => vokabelSet(container, set) }, "Zurück"),
    ),
  );
}

function vocabQuiz(container, set) {
  const questions = shuffle(set.words).slice(0, 10);
  let i = 0, score = 0;
  const qEl = el("div", { class: "quiz-question" });
  const optWrap = el("div", { class: "choices" });
  const feedback = el("p", { class: "quiz-feedback" });
  const progress = el("p", { class: "muted" });

  const draw = () => {
    const [en, de] = questions[i];
    qEl.textContent = `Was heißt „${en}“?`;
    const wrong = shuffle(set.words.filter(([e]) => e !== en)).slice(0, 3).map(([, d]) => d);
    const options = shuffle([de, ...wrong]);
    optWrap.replaceChildren(...options.map((opt) =>
      el("button", { class: "btn btn-choice", onclick: () => {
        if (opt === de) { score++; feedback.textContent = "✅ Richtig!"; feedback.className = "quiz-feedback success"; }
        else { feedback.textContent = `❌ „${en}“ heißt „${de}“.`; feedback.className = "quiz-feedback error"; }
        i++;
        if (i >= questions.length) {
          const isBest = saveBest(`Vokabeln ${set.title}, von 10`, score);
          setTimeout(() => result(container, "lernen", `${score} von 10 richtig!`, score >= 8 ? "🌟 Vocabulary champion!" : "💪 Keep practising!", isBest), 800);
          return;
        }
        setTimeout(draw, 800);
      } }, opt),
    ));
    progress.textContent = `Frage ${i + 1} von ${questions.length} · Richtig: ${score}`;
  };
  draw();
  container.replaceChildren(
    el("section", { class: "panel panel-narrow" }, el("h3", {}, `❓ ${set.title}`), qEl, optWrap, feedback, progress),
  );
}

/* ==================== 🍳 Koch-Pilot ==================== */

function renderKochen(container) {
  const tabs = el("div", { class: "tab-bar" });
  const body = el("div", {});
  const tabDefs = [
    { id: "finden", label: "🔍 Rezept finden", render: rezeptFinden },
    { id: "woche", label: "📅 Wochenplan", render: wochenplan },
  ];
  let active = getModuleState("kochen_tab", "finden");

  const draw = () => {
    tabs.replaceChildren(...tabDefs.map((t) =>
      el("button", { class: "tab" + (t.id === active ? " active" : ""), onclick: () => { active = t.id; setModuleState("kochen_tab", active); draw(); } }, t.label),
    ));
    body.replaceChildren();
    tabDefs.find((t) => t.id === active).render(body);
  };
  draw();
  container.append(tabs, body);
}

function rezeptFinden(body) {
  const state = { veg: false, schnell: false, suess: false, text: "" };
  const list = el("div", { class: "module-grid" });

  const draw = () => {
    const hits = RECIPES.filter((r) =>
      (!state.veg || r.tags.includes("vegetarisch")) &&
      (!state.schnell || r.zeit <= 25) &&
      (!state.suess || r.tags.includes("süß")) &&
      (!state.text || r.name.toLowerCase().includes(state.text) || r.zutaten.some(([n]) => n.toLowerCase().includes(state.text))),
    );
    list.replaceChildren(
      ...(hits.length ? hits.map((r) => rezeptCard(r, body)) : [el("p", { class: "muted" }, "Nichts gefunden — Filter lockern?")]),
    );
  };

  const filterChip = (label, key) => {
    const b = el("button", { class: "tab", onclick: () => { state[key] = !state[key]; b.classList.toggle("active", state[key]); draw(); } }, label);
    return b;
  };
  const search = el("input", { class: "input", placeholder: "Suche nach Gericht oder Zutat … (z. B. „Kartoffel“)" });
  search.addEventListener("input", () => { state.text = search.value.trim().toLowerCase(); draw(); });

  body.append(
    el("div", { class: "tab-bar" }, filterChip("🥦 vegetarisch", "veg"), filterChip("⏱ unter 25 Min.", "schnell"), filterChip("🍮 süß", "suess")),
    search, list,
  );
  draw();
}

function rezeptCard(r, body) {
  return el("button", { class: "module-card", onclick: () => rezeptDetail(r, body) },
    el("span", { class: "module-emoji" }, r.emoji),
    el("strong", {}, r.name),
    el("small", {}, `⏱ ${r.zeit} Min.${r.tags.includes("vegetarisch") ? " · 🥦 vegetarisch" : ""}`),
  );
}

function rezeptDetail(r, body) {
  body.replaceChildren(
    el("section", { class: "panel" },
      el("h3", {}, `${r.emoji} ${r.name}`),
      el("p", { class: "muted" }, `⏱ ca. ${r.zeit} Minuten · für 4 Personen`),
      el("h4", {}, "Zutaten"),
      el("ul", {}, ...r.zutaten.map(([n, m]) => el("li", {}, m ? `${m} ${n}` : n))),
      el("h4", {}, "Zubereitung"),
      el("ol", {}, ...r.schritte.map((s) => el("li", {}, s))),
      el("button", { class: "btn btn-ghost", onclick: () => { body.replaceChildren(); rezeptFinden(body); } }, "← Zurück zur Suche"),
    ),
  );
}

function wochenplan(body) {
  const state = getModuleState("kochen_woche", null);
  const tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

  const generate = (vegOnly) => {
    const pool = shuffle(RECIPES.filter((r) => !r.tags.includes("süß") && (!vegOnly || r.tags.includes("vegetarisch"))));
    const woche = pool.slice(0, 5).map((r) => r.name);
    setModuleState("kochen_woche", { woche, checked: [] });
    body.replaceChildren();
    wochenplan(body);
  };

  const controls = el("div", { class: "tab-bar" },
    el("button", { class: "btn btn-small", onclick: () => generate(false) }, "🎲 Neuen Plan würfeln"),
    el("button", { class: "btn btn-small btn-ghost", onclick: () => generate(true) }, "🥦 Nur vegetarisch"),
  );

  if (!state) {
    body.append(el("p", { class: "muted" }, "Noch kein Plan — würfle dir einen!"), controls);
    return;
  }

  const recipes = state.woche.map((name) => RECIPES.find((r) => r.name === name)).filter(Boolean);

  // Einkaufsliste aggregieren
  const merged = new Map();
  for (const r of recipes) for (const [n, m] of r.zutaten) {
    if (!merged.has(n)) merged.set(n, []);
    if (m) merged.get(n).push(m);
  }
  const items = [...merged.entries()].sort((a, b) => a[0].localeCompare(b[0], "de"));

  const checked = new Set(state.checked || []);
  const toggle = (name, node) => {
    checked.has(name) ? checked.delete(name) : checked.add(name);
    node.classList.toggle("checked", checked.has(name));
    setModuleState("kochen_woche", { ...state, checked: [...checked] });
  };

  body.append(
    el("section", { class: "panel" },
      el("h3", {}, "📅 Dein Wochenplan"),
      el("table", { class: "plan-table" },
        ...recipes.map((r, i) => el("tr", {},
          el("td", {}, el("strong", {}, tage[i])),
          el("td", {}, `${r.emoji} ${r.name}`),
          el("td", {}, `⏱ ${r.zeit} Min.`),
        )),
      ),
      controls,
    ),
    el("section", { class: "panel" },
      el("h3", {}, "🛒 Einkaufsliste"),
      el("p", { class: "muted" }, "Antippen zum Abhaken — bleibt gespeichert, bis du neu würfelst."),
      el("ul", { class: "shoplist" }, ...items.map(([n, ms]) => {
        const li = el("li", { class: "checkable" + (checked.has(n) ? " checked" : "") }, `${n}${ms.length ? " — " + ms.join(" + ") : ""}`);
        li.addEventListener("click", () => toggle(n, li));
        return li;
      })),
    ),
  );
}

/* ==================== ✍️ Schreibwerkstatt ==================== */

function renderSchreiben(container) {
  const body = el("div", {});
  container.append(body);
  schreibMenu(body);
}

function schreibMenu(body) {
  body.replaceChildren(
    el("div", { class: "module-grid" },
      ...LETTERS.map((t) =>
        el("button", { class: "module-card", onclick: () => schreibForm(body, t) },
          el("span", { class: "module-emoji" }, t.emoji),
          el("strong", {}, t.title),
        ),
      ),
    ),
  );
}

function schreibForm(body, template) {
  const inputs = {};
  const form = el("form", { class: "panel" }, el("h3", {}, `${template.emoji} ${template.title}`));

  for (const f of template.fields) {
    let input;
    if (f.select) input = el("select", { class: "input" }, ...f.select.map((o) => el("option", { value: o }, o)));
    else input = el("input", { class: "input", placeholder: f.ph || "" });
    inputs[f.id] = input;
    form.append(el("label", { class: "field-label" }, f.label, input));
  }

  const ton = el("select", { class: "input" },
    el("option", { value: "freundlich" }, "freundlich"),
    el("option", { value: "formell" }, "formell"),
  );
  form.append(el("label", { class: "field-label" }, "Tonfall", ton));

  const output = el("textarea", { class: "input output-text", rows: "14", readonly: "" });
  const copyBtn = el("button", { class: "btn", type: "button", style: "display:none" }, "📋 Text kopieren");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyBtn.textContent = "✅ Kopiert!";
    } catch {
      output.select();
      copyBtn.textContent = "Markiert — jetzt Strg+C drücken";
    }
    setTimeout(() => (copyBtn.textContent = "📋 Text kopieren"), 2000);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = Object.fromEntries(Object.entries(inputs).map(([id, node]) => [id, node.value.trim()]));
    output.value = template.build(values, ton.value);
    output.style.display = "";
    copyBtn.style.display = "";
    output.rows = Math.min(22, output.value.split("\n").length + 2);
  });

  output.style.display = "none";
  form.append(
    el("div", { class: "tab-bar" },
      el("button", { class: "btn", type: "submit" }, "✨ Text erstellen"),
      el("button", { class: "btn btn-ghost", type: "button", onclick: () => schreibMenu(body) }, "← Andere Vorlage"),
    ),
    output, copyBtn,
    el("p", { class: "muted" }, "💡 Platzhalter in [eckigen Klammern] vor dem Versenden ersetzen. Vorlagen sind Orientierung, keine Rechtsberatung."),
  );
  body.replaceChildren(form);
}

/* ==================== 🗓️ Planer ==================== */

function renderPlanen(container) {
  const body = el("div", {});
  container.append(body);
  planerHome(body);
}

function planerHome(body) {
  const myLists = getModuleState("planer_listen", []);

  body.replaceChildren(
    el("h3", {}, "Neue Liste anlegen"),
    el("div", { class: "module-grid" },
      ...CHECKLISTS.map((t) =>
        el("button", { class: "module-card", onclick: () => {
          const lists = getModuleState("planer_listen", []);
          lists.unshift({
            id: newId(), templateId: t.id, title: t.title, emoji: t.emoji, createdAt: Date.now(),
            groups: t.groups.map((g) => ({ title: g.title, items: g.items.map((text) => ({ text, done: false })) })),
          });
          setModuleState("planer_listen", lists);
          planerListe(body, lists[0].id);
        } },
          el("span", { class: "module-emoji" }, t.emoji),
          el("strong", {}, t.title),
          el("small", {}, t.groups.reduce((n, g) => n + g.items.length, 0) + " Punkte"),
        ),
      ),
    ),
  );

  if (myLists.length) {
    body.append(
      el("h3", {}, "Meine Listen"),
      el("div", { class: "save-list" },
        ...myLists.map((l) => {
          const total = l.groups.reduce((n, g) => n + g.items.length, 0);
          const done = l.groups.reduce((n, g) => n + g.items.filter((i) => i.done).length, 0);
          return el("div", { class: "save-card" },
            el("div", { class: "save-info" },
              el("strong", {}, `${l.emoji} ${l.title}`),
              el("small", {}, `${done} von ${total} erledigt · ${new Date(l.createdAt).toLocaleDateString("de-DE")}`),
            ),
            el("div", { class: "save-actions" },
              el("button", { class: "btn", onclick: () => planerListe(body, l.id) }, "Öffnen"),
              el("button", { class: "btn btn-ghost", onclick: () => {
                if (!confirm(`Liste „${l.title}" löschen?`)) return;
                setModuleState("planer_listen", getModuleState("planer_listen", []).filter((x) => x.id !== l.id));
                planerHome(body);
              } }, "🗑"),
            ),
          );
        }),
      ),
    );
  }
}

function planerListe(body, listId) {
  const lists = getModuleState("planer_listen", []);
  const list = lists.find((l) => l.id === listId);
  if (!list) { planerHome(body); return; }

  const save = () => setModuleState("planer_listen", lists);

  const progressBar = el("div", { class: "progress" }, el("div", { class: "progress-fill" }));
  const updateProgress = () => {
    const total = list.groups.reduce((n, g) => n + g.items.length, 0);
    const done = list.groups.reduce((n, g) => n + g.items.filter((i) => i.done).length, 0);
    progressBar.firstChild.style.width = total ? `${(done / total) * 100}%` : "0%";
    progressBar.firstChild.textContent = total ? `${done}/${total}` : "";
  };

  const sections = list.groups.map((g, gi) => {
    const ul = el("ul", { class: "shoplist" },
      ...g.items.map((item, ii) => {
        const li = el("li", { class: "checkable" + (item.done ? " checked" : "") }, item.text);
        li.addEventListener("click", () => {
          item.done = !item.done;
          li.classList.toggle("checked", item.done);
          save(); updateProgress();
        });
        return li;
      }),
    );
    const addInput = el("input", { class: "input", placeholder: "+ Eigenen Punkt hinzufügen …" });
    addInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      const text = addInput.value.trim();
      if (!text) return;
      list.groups[gi].items.push({ text, done: false });
      save();
      planerListe(body, listId);
    });
    return el("section", { class: "panel" }, el("h4", {}, g.title), ul, addInput);
  });

  body.replaceChildren(
    el("div", { class: "tab-bar" },
      el("button", { class: "btn btn-ghost btn-small", onclick: () => planerHome(body) }, "← Alle Listen"),
    ),
    el("h3", {}, `${list.emoji} ${list.title}`),
    progressBar,
    ...sections,
  );
  updateProgress();
}

/* ==================== 💰 Taschengeld ==================== */

function renderGeld(container) {
  const body = el("div", {});
  container.append(body);
  geldHome(body);
}

function balance(kid) {
  return kid.entries.reduce((sum, e) => sum + e.amount, 0);
}

const euro = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

function geldHome(body) {
  const state = getModuleState("geld", { kids: [] });

  const nameInput = el("input", { class: "input", placeholder: "Name des Kindes", maxlength: "20" });
  const addKid = () => {
    const name = nameInput.value.trim();
    if (!name) return;
    state.kids.push({ id: newId(), name, goal: null, entries: [] });
    setModuleState("geld", state);
    geldHome(body);
  };
  nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addKid(); } });

  body.replaceChildren(
    ...state.kids.map((kid) =>
      el("button", { class: "module-card money-card", onclick: () => geldKonto(body, kid.id) },
        el("span", { class: "module-emoji" }, "🐷"),
        el("strong", {}, kid.name),
        el("small", {}, `Kontostand: ${euro(balance(kid))}${kid.goal ? ` · Sparziel: ${kid.goal.label}` : ""}`),
      ),
    ),
    el("section", { class: "panel panel-narrow" },
      el("h3", {}, state.kids.length ? "Weiteres Konto anlegen" : "Erstes Konto anlegen"),
      el("div", { class: "free-input" }, nameInput, el("button", { class: "btn", onclick: addKid }, "＋")),
    ),
  );
}

function geldKonto(body, kidId) {
  const state = getModuleState("geld", { kids: [] });
  const kid = state.kids.find((k) => k.id === kidId);
  if (!kid) { geldHome(body); return; }
  const save = () => setModuleState("geld", state);
  const bal = balance(kid);

  // Buchung
  const amountInput = el("input", { class: "input", type: "number", step: "0.50", placeholder: "Betrag in €" });
  const noteInput = el("input", { class: "input", placeholder: "Wofür? (z. B. Taschengeld Juni / Comic gekauft)" });
  const book = (sign) => {
    const amount = Math.round(parseFloat(amountInput.value.replace?.(",", ".") ?? amountInput.value) * 100) / 100;
    if (!amount || amount <= 0) return;
    kid.entries.unshift({ ts: Date.now(), amount: sign * amount, note: noteInput.value.trim() || (sign > 0 ? "Einzahlung" : "Ausgabe") });
    save();
    geldKonto(body, kidId);
  };

  // Sparziel
  const goalLabel = el("input", { class: "input", placeholder: "Sparziel (z. B. Lego-Set)", value: kid.goal?.label || "" });
  const goalAmount = el("input", { class: "input", type: "number", step: "1", placeholder: "€", value: kid.goal?.amount || "" });
  const goalSave = () => {
    const label = goalLabel.value.trim();
    const amount = parseFloat(goalAmount.value);
    kid.goal = label && amount > 0 ? { label, amount } : null;
    save();
    geldKonto(body, kidId);
  };

  const goalSection = el("section", { class: "panel" }, el("h4", {}, "🎯 Sparziel"));
  if (kid.goal) {
    const pct = Math.min(100, (bal / kid.goal.amount) * 100);
    goalSection.append(
      el("p", {}, `${kid.goal.label}: ${euro(Math.max(0, bal))} von ${euro(kid.goal.amount)}` + (pct >= 100 ? " — 🎉 GESCHAFFT!" : "")),
      el("div", { class: "progress" }, el("div", { class: "progress-fill", style: `width:${Math.max(0, pct)}%` }, `${Math.floor(pct)} %`)),
    );
  }
  goalSection.append(
    el("div", { class: "free-input" }, goalLabel, goalAmount, el("button", { class: "btn btn-small", onclick: goalSave }, "💾")),
  );

  body.replaceChildren(
    el("div", { class: "tab-bar" },
      el("button", { class: "btn btn-ghost btn-small", onclick: () => geldHome(body) }, "← Alle Konten"),
      el("button", { class: "btn btn-ghost btn-small", onclick: () => {
        if (!confirm(`Konto von ${kid.name} wirklich löschen?`)) return;
        state.kids = state.kids.filter((k) => k.id !== kidId);
        save();
        geldHome(body);
      } }, "🗑 Konto löschen"),
    ),
    el("section", { class: "panel center" },
      el("h3", {}, `🐷 ${kid.name}s Konto`),
      el("p", { class: "money-balance" + (bal < 0 ? " error" : "") }, euro(bal)),
    ),
    el("section", { class: "panel" },
      el("h4", {}, "Neue Buchung"),
      amountInput, noteInput,
      el("div", { class: "tab-bar" },
        el("button", { class: "btn", onclick: () => book(1) }, "＋ Einzahlen"),
        el("button", { class: "btn btn-ghost", onclick: () => book(-1) }, "− Ausgeben"),
      ),
    ),
    goalSection,
    el("section", { class: "panel" },
      el("h4", {}, "📜 Verlauf"),
      kid.entries.length
        ? el("div", {}, ...kid.entries.slice(0, 30).map((e, i) =>
            el("div", { class: "cost-row" },
              el("span", {}, `${new Date(e.ts).toLocaleDateString("de-DE")} · ${escapeHtml(e.note)}`),
              el("span", { class: e.amount < 0 ? "error" : "success" }, (e.amount > 0 ? "+" : "") + euro(e.amount)),
            ),
          ))
        : el("p", { class: "muted" }, "Noch keine Buchungen."),
    ),
  );
}
