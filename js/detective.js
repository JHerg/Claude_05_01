// Fall-Archiv: Detektiv-Fälle mit zufällig ausgelostem Täter.
// Spuren an den Orten werden passend zum Täter erzeugt — jeder Durchlauf
// ist anders, und es führen zwei Wege zum Ziel: Indizien kombinieren
// oder Alibis platzen lassen (max. 2 Checks pro Fall).

import { CASES } from "./cases.js";
import { getModuleState, setModuleState } from "./storage.js";
import { el, escapeHtml, shuffle, sfx, confetti } from "./ui.js";

const KEY = "fallarchiv";
const MAX_HERZEN = 3;
const MAX_ALIBI_CHECKS = 2;

const load = () => getModuleState(KEY, { records: {}, active: null });
const save = (st) => setModuleState(KEY, st);

export function route(container) {
  document.body.classList.add("theme-adventure");
  const st = load();
  if (st.active && CASES.some((c) => c.id === st.active.caseId)) renderPlay(container);
  else renderSelect(container);
}

function overlay(...children) {
  const node = el("div", { class: "overlay", onclick: (e) => { if (e.target === node) node.remove(); } },
    el("div", { class: "overlay-card" }, ...children),
  );
  document.body.append(node);
  return node;
}

// ---------- Fall-Auswahl ----------

function renderSelect(container) {
  const st = load();
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🗂️ Fall-Archiv"),
      el("p", {}, "Echte Ermittlungsarbeit: Der Täter wird bei jedem Start neu ausgelost — die Spuren passen sich an! Untersuche Orte, prüfe Alibis (nur 2 pro Fall!) und klage an, sobald du dir sicher bist. Du brauchst nicht alle Spuren — aber Fehlanklagen kosten ein Herz."),
    ),
  );

  const grid = el("div", { class: "scenario-grid scenario-grid-big" });
  for (const c of CASES) {
    const stars = st.records[c.id] || 0;
    grid.append(
      el("button", { class: "scenario-card", onclick: () => { sfx("click"); startCase(container, c); } },
        el("span", { class: "scenario-emoji" }, c.emoji),
        el("strong", {}, c.title),
        el("small", {}, c.tagline),
        el("small", { class: "stars" }, stars ? "★".repeat(stars) + "☆".repeat(3 - stars) + "  (Bestleistung)" : "☆☆☆  noch ungelöst"),
        el("span", { class: "world-cta" }, "Fall übernehmen ➤"),
      ),
    );
  }
  container.append(grid,
    el("p", { class: "muted center" },
      el("button", { class: "btn btn-ghost btn-small", onclick: () => (location.hash = "#/adventure") }, "← Zurück zur Abenteuer-Auswahl"),
    ),
  );
}

function startCase(container, c) {
  const culprit = c.verdaechtige[Math.floor(Math.random() * c.verdaechtige.length)].id;
  const merkmalOrder = shuffle(c.merkmale.map((m) => m.id));
  const ortMerkmal = {};
  c.orte.forEach((o, i) => (ortMerkmal[o.id] = merkmalOrder[i]));
  const st = load();
  st.active = { caseId: c.id, culprit, ortMerkmal, found: [], checked: [], entlastet: [], wrong: 0, herzen: MAX_HERZEN };
  save(st);
  renderPlay(container, true);
}

// ---------- Ermitteln ----------

function renderPlay(container, showIntro = false) {
  const st = load();
  const a = st.active;
  const c = CASES.find((x) => x.id === a.caseId);
  const culprit = c.verdaechtige.find((v) => v.id === a.culprit);
  const merkmalById = Object.fromEntries(c.merkmale.map((m) => [m.id, m]));

  const persist = () => { st.active = a; save(st); };

  // ----- Kopf -----
  const header = el("section", { class: "panel" },
    el("h2", {}, `${c.emoji} ${c.title}`),
    el("div", { class: "tab-bar" },
      el("span", { class: "hud-hearts" }, "❤️".repeat(Math.max(0, a.herzen)) + "🤍".repeat(MAX_HERZEN - Math.max(0, a.herzen))),
      el("button", { class: "tab tool-btn", onclick: () => overlay(el("h3", {}, "📋 Der Auftrag"), el("p", { html: c.intro }), el("button", { class: "btn", onclick: (e) => e.target.closest(".overlay").remove() }, "An die Arbeit!")) }, "📋 Auftrag"),
      el("button", { class: "tab tool-btn", onclick: () => {
        if (!confirm("Fall wirklich abbrechen? Beim nächsten Mal wird ein neuer Täter ausgelost.")) return;
        st.active = null; save(st); renderSelect(container);
      } }, "🗂 Fall abgeben"),
    ),
  );

  // ----- Spurentafel -----
  const spuren = el("section", { class: "panel" }, el("h3", {}, "🧷 Deine Spurentafel"));
  if (!a.found.length && !a.checked.length) {
    spuren.append(el("p", { class: "muted" }, "Noch leer. Untersuche Orte und prüfe Alibis — jede Spur beschreibt den Täter."));
  }
  for (const mid of a.found) {
    const m = merkmalById[mid];
    const line = el("div", { class: "hint-box" });
    line.innerHTML = `${m.emoji} <strong>${m.label}:</strong> ${m.clue(escapeHtml(culprit.werte[mid]))}`;
    spuren.append(line);
  }
  for (const sid of a.checked) {
    const v = c.verdaechtige.find((x) => x.id === sid);
    const line = el("div", { class: "hint-box" + (sid === a.culprit ? " hint-final" : "") });
    line.innerHTML = sid === a.culprit
      ? `💥 <strong>Alibi von ${escapeHtml(v.name)} GEPLATZT:</strong> ${escapeHtml(v.alibiLuege)}`
      : `✅ <strong>Alibi von ${escapeHtml(v.name)} bestätigt</strong> — von der Liste gestrichen.`;
    spuren.append(line);
  }

  // ----- Orte -----
  const orteGrid = el("div", { class: "module-grid" });
  for (const o of c.orte) {
    const visited = a.found.includes(a.ortMerkmal[o.id]);
    const card = el("button", { class: "module-card" + (visited ? " ort-done" : "") },
      el("span", { class: "module-emoji" }, o.emoji),
      el("strong", {}, o.name),
      el("small", {}, visited ? `✅ Spur gesichert: ${merkmalById[a.ortMerkmal[o.id]].label}` : o.flavor),
    );
    if (!visited) {
      card.addEventListener("click", () => {
        const mid = a.ortMerkmal[o.id];
        a.found.push(mid);
        persist();
        sfx("item");
        const m = merkmalById[mid];
        const box = el("p", { class: "hint-box" });
        box.innerHTML = `${m.emoji} ${m.clue(escapeHtml(culprit.werte[mid]))}`;
        overlay(
          el("h3", {}, `${o.emoji} ${o.name}`),
          el("p", { class: "muted" }, o.flavor),
          box,
          el("button", { class: "btn", onclick: (e) => { e.target.closest(".overlay").remove(); renderPlay(container); } }, "📓 Notiert!"),
        );
      });
    }
    orteGrid.append(card);
  }

  // ----- Verdächtige -----
  const suspGrid = el("div", { class: "module-grid" });
  for (const v of c.verdaechtige) {
    const cleared = a.entlastet.includes(v.id);
    suspGrid.append(
      el("button", { class: "module-card" + (cleared ? " ort-done" : ""), onclick: () => showSteckbrief(v) },
        el("span", { class: "module-emoji" }, v.emoji),
        el("strong", {}, v.name + (cleared ? " ✅" : "")),
        el("small", {}, cleared ? "Entlastet — Alibi hält." : v.rolle),
      ),
    );
  }

  function showSteckbrief(v) {
    const cleared = a.entlastet.includes(v.id);
    const checksLeft = MAX_ALIBI_CHECKS - a.checked.length;
    const body = el("div", {});

    body.append(
      el("table", { class: "plan-table" },
        ...c.merkmale.map((m) => el("tr", {}, el("td", {}, `${m.emoji} ${m.label}`), el("td", {}, el("strong", {}, v.werte[m.id])))),
      ),
      el("p", {}, el("strong", {}, "Mögliches Motiv: "), v.motiv),
      el("p", {}, el("strong", {}, "Alibi: "), v.alibi),
    );
    if (a.checked.includes(v.id)) {
      const res = el("p", { class: v.id === a.culprit ? "error" : "success" });
      res.textContent = v.id === a.culprit ? "💥 Geprüft: Das Alibi ist eine LÜGE! " + v.alibiLuege : "✅ Geprüft: Das Alibi stimmt.";
      body.append(res);
    }

    const buttons = el("div", { class: "tab-bar" });
    if (!cleared && !a.checked.includes(v.id) && checksLeft > 0) {
      buttons.append(el("button", { class: "btn btn-ghost", onclick: (e) => {
        a.checked.push(v.id);
        if (v.id !== a.culprit && !a.entlastet.includes(v.id)) a.entlastet.push(v.id);
        persist();
        sfx(v.id === a.culprit ? "win" : "click");
        e.target.closest(".overlay").remove();
        renderPlay(container);
      } }, `🗂️ Alibi überprüfen (noch ${checksLeft})`));
    } else if (!cleared && checksLeft <= 0 && !a.checked.includes(v.id)) {
      buttons.append(el("small", { class: "muted" }, "Keine Alibi-Prüfungen mehr übrig — Frau Specht hat Feierabend."));
    }
    if (!cleared) {
      buttons.append(el("button", { class: "btn btn-danger", onclick: (e) => { e.target.closest(".overlay").remove(); anklagen(v); } }, "⚖️ Anklagen!"));
    }
    overlay(
      el("h3", {}, `${v.emoji} ${v.name}`),
      el("p", { class: "muted" }, v.rolle),
      body, buttons,
      el("button", { class: "btn btn-ghost btn-small", onclick: (e) => e.target.closest(".overlay").remove() }, "Schließen"),
    );
  }

  function anklagen(v) {
    if (!confirm(`Wirklich ${v.name} anklagen? Eine Fehlanklage kostet ein Herz!`)) return;
    if (v.id === a.culprit) {
      const effort = a.found.length + a.checked.length;
      const stars = a.wrong === 0 ? (effort <= 2 ? 3 : 2) : 1;
      st.records[c.id] = Math.max(st.records[c.id] || 0, stars);
      st.active = null;
      save(st);
      sfx("fanfare");
      confetti();
      const text = el("p", {});
      text.innerHTML = escapeHtml(v.gestaendnis).replace(/\n/g, "<br>");
      overlay(
        el("h3", {}, "🏅 Fall gelöst!"),
        el("p", {}, `${v.emoji} ${v.name} gesteht alles:`),
        text,
        el("div", { class: "end-stats" },
          el("span", { class: "chip" }, `🧷 ${a.found.length} Spuren`),
          el("span", { class: "chip" }, `🗂️ ${a.checked.length} Alibi-Checks`),
          el("span", { class: "chip" }, a.wrong === 0 ? "⚖️ keine Fehlanklage!" : `⚖️ ${a.wrong} Fehlanklage(n)`),
        ),
        el("p", { class: "stars center" }, "★".repeat(stars) + "☆".repeat(3 - stars) + (stars === 3 ? " — Meisterleistung: kaum Spuren gebraucht!" : stars === 2 ? " — sauber ermittelt!" : " — gelöst, aber mit Umwegen.")),
        el("button", { class: "btn btn-big", onclick: (e) => { e.target.closest(".overlay").remove(); renderSelect(container); } }, "Zurück zum Fall-Archiv"),
      );
    } else {
      a.wrong++;
      a.herzen--;
      if (!a.entlastet.includes(v.id)) a.entlastet.push(v.id);
      sfx("fail");
      if (a.herzen <= 0) {
        // Fall wird neu aufgerollt: neuer Täter, neue Spuren
        const neu = c.verdaechtige[Math.floor(Math.random() * c.verdaechtige.length)].id;
        const order = shuffle(c.merkmale.map((m) => m.id));
        const om = {};
        c.orte.forEach((o, i) => (om[o.id] = order[i]));
        st.active = { caseId: c.id, culprit: neu, ortMerkmal: om, found: [], checked: [], entlastet: [], wrong: 0, herzen: MAX_HERZEN };
        save(st);
        overlay(
          el("h3", {}, "🚨 Der Fall wird neu aufgerollt!"),
          el("p", {}, `Drei Fehlanklagen — ${escapeHtml(v.name)} war es schon wieder nicht! Der wahre Täter hat Lunte gerochen, alles zurückgeräumt und NEUE Spuren hinterlassen. Frau Sommer gibt dir eine zweite Chance: Der Fall beginnt von vorn — mit frisch gemischten Karten.`),
          el("button", { class: "btn btn-big", onclick: (e) => { e.target.closest(".overlay").remove(); renderPlay(container); } }, "🔍 Neue Ermittlung starten"),
        );
        return;
      }
      persist();
      overlay(
        el("h3", {}, "❌ Fehlanklage!"),
        el("p", {}, `${v.emoji} ${escapeHtml(v.name)} schaut dich empört an — und das Alibi hält der Prüfung stand. Wie peinlich! (−1 Herz) Immerhin: ${escapeHtml(v.name)} ist damit sicher entlastet.`),
        el("button", { class: "btn", onclick: (e) => { e.target.closest(".overlay").remove(); renderPlay(container); } }, "Weiter ermitteln"),
      );
    }
  }

  container.replaceChildren(
    header,
    spuren,
    el("h3", {}, "📍 Orte untersuchen"),
    orteGrid,
    el("h3", {}, "🧑‍🤝‍🧑 Verdächtige (antippen für Steckbrief, Alibi-Check & Anklage)"),
    suspGrid,
    el("p", { class: "muted center" }, "💡 Vergleiche die Spuren mit den Steckbriefen. Du musst nicht alles finden — klage an, sobald nur noch eine Person passt!"),
  );

  if (showIntro) {
    overlay(
      el("h3", {}, `${c.emoji} ${c.title}`),
      el("p", { html: c.intro }),
      el("p", { class: "muted" }, `Verdächtige: ${c.verdaechtige.length} · Orte: ${c.orte.length} · Alibi-Checks: ${MAX_ALIBI_CHECKS} · Herzen: ${MAX_HERZEN}`),
      el("button", { class: "btn btn-big", onclick: (e) => e.target.closest(".overlay").remove() }, "🔍 Ermittlung aufnehmen!"),
    );
  }
}
