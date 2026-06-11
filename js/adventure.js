// Die Abenteuer-Maschine (offline) — Engine v2:
// Herzen, Inventar, Würfelproben, Rätsel, SVG-Szenen, Erzähl-Animation,
// Vorlesen (Sprachausgabe), Soundeffekte, Logbuch, Erfolge & Konfetti.

import { ADVENTURES, getAdventure } from "./adventures.js";
import { listSaves, getSave, putSave, deleteSave, newId, getSettings, setSettings } from "./storage.js";
import { el, escapeHtml, sfx, setSoundOn, isSoundOn, canSpeak, speak, stopSpeak, typewriter, confetti } from "./ui.js";
import * as detective from "./detective.js";
import { CASES } from "./cases.js";
import { getModuleState } from "./storage.js";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export function route(container, parts) {
  document.body.classList.add("theme-adventure");
  stopSpeak();
  setSoundOn(getSettings().sound !== false);
  if (parts[0] === "faelle") return detective.route(container);
  if (parts.length === 0) return renderHome(container);
  if (parts[0] === "play" && parts[1]) return renderPlay(container, parts[1]);
  location.hash = "#/adventure";
}

// ---------- Startseite ----------

function renderHome(container) {
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🐉 Abenteuer-Maschine"),
      el("p", {}, "Fünf Welten, deine Entscheidungen: Herzen, Rucksack, Würfelglück, Rätsel — und in jedem Abenteuer Erfolge zu entdecken. Alles offline, automatisch gespeichert."),
    ),
  );

  const grid = el("div", { class: "scenario-grid scenario-grid-big" });
  for (const adv of ADVENTURES) {
    const earned = bestAchievements(adv.id);
    grid.append(
      el("button", { class: "scenario-card", onclick: () => { sfx("click"); startNew(adv.id); } },
        el("span", { class: "scenario-emoji" }, adv.emoji),
        el("strong", {}, adv.title),
        el("small", {}, adv.tagline),
        el("small", { class: "ach-row" },
          ...(adv.achievements || []).map((a) =>
            el("span", { class: "ach-mini" + (earned.has(a.id) ? "" : " ach-locked"), title: a.label }, a.emoji)),
        ),
        el("span", { class: "world-cta" }, "Neu starten ➤"),
      ),
    );
  }
  // Fall-Archiv: Detektiv-Fälle mit zufälligem Täter (eigener Modus)
  const archiv = getModuleState("fallarchiv", { records: {}, active: null });
  const solvedCases = CASES.filter((c) => archiv.records[c.id]).length;
  const totalStars = CASES.reduce((n, c) => n + (archiv.records[c.id] || 0), 0);
  grid.append(
    el("button", { class: "scenario-card scenario-card-archiv", onclick: () => { sfx("click"); location.hash = "#/adventure/faelle"; } },
      el("span", { class: "scenario-emoji" }, "🗂️"),
      el("strong", {}, "Fall-Archiv (Detektivbüro Blitz)"),
      el("small", {}, `${CASES.length} Fälle — und der Täter wird jedes Mal neu ausgelost! Mit Alibi-Checks, Fehlanklage-Risiko und Sterne-Wertung.`),
      el("small", { class: "stars" }, solvedCases ? `★ ${totalStars}/${CASES.length * 3} Sterne · ${solvedCases}/${CASES.length} Fälle gelöst${archiv.active ? " · 🔍 Ermittlung läuft!" : ""}` : (archiv.active ? "🔍 Ermittlung läuft!" : "☆ Noch kein Fall gelöst")),
      el("span", { class: "world-cta" }, archiv.active ? "Weiterermitteln ➤" : "Zum Archiv ➤"),
    ),
  );
  container.append(el("h3", {}, "Abenteuer"), grid);

  const saves = listSaves();
  if (saves.length) {
    const list = el("div", { class: "save-list" });
    for (const s of saves) {
      const adv = getAdventure(s.adventureId);
      if (!adv) continue;
      list.append(
        el("div", { class: "save-card" },
          el("div", { class: "save-info" },
            el("strong", {}, `${adv.emoji} ${adv.title}`),
            el("small", {}, `❤️ ${s.hp}/${adv.maxHp} · ${s.steps || 0} Schritte · zuletzt ${new Date(s.updatedAt).toLocaleDateString("de-DE")}${s.finished ? " · 🏅 geschafft!" : ""}`),
          ),
          el("div", { class: "save-actions" },
            el("button", { class: "btn", onclick: () => (location.hash = `#/adventure/play/${s.id}`) }, s.finished ? "📖 Nochmal ansehen" : "▶ Weiterspielen"),
            el("button", {
              class: "btn btn-ghost", title: "Spielstand löschen",
              onclick: () => { if (confirm(`Spielstand „${adv.title}“ wirklich löschen?`)) { deleteSave(s.id); renderHome(container); } },
            }, "🗑"),
          ),
        ),
      );
    }
    container.append(el("h3", {}, "Deine Spielstände"), list);
  }
}

/** Alle in irgendeinem Spielstand dieses Abenteuers freigespielten Erfolge. */
function bestAchievements(adventureId) {
  const ids = new Set();
  for (const s of listSaves()) {
    if (s.adventureId !== adventureId) continue;
    for (const a of s.achievements || []) ids.add(a);
  }
  return ids;
}

function startNew(adventureId) {
  const adv = getAdventure(adventureId);
  const save = {
    id: newId(),
    adventureId,
    nodeId: adv.start,
    hp: adv.maxHp,
    items: [],
    visited: [],
    path: [],
    steps: 0,
    diceLost: 0,
    finished: false,
    achievements: [],
    createdAt: Date.now(),
  };
  putSave(save);
  location.hash = `#/adventure/play/${save.id}`;
}

// ---------- Spielen ----------

function renderPlay(container, saveId) {
  const save = getSave(saveId);
  if (!save) { location.hash = "#/adventure"; return; }
  const adv = getAdventure(save.adventureId);
  if (!adv) { location.hash = "#/adventure"; return; }
  save.path = save.path || [];
  save.diceLost = save.diceLost || 0;
  save.achievements = save.achievements || [];

  const nodeById = Object.fromEntries(adv.nodes.map((n) => [n.id, n]));

  const scene = el("div", { class: "scene" });
  const storyBox = el("div", { class: "story-log" });
  const actions = el("div", { class: "actions" });
  const hud = {
    hearts: el("div", { class: "hud-hearts" }),
    inventory: el("div", { class: "hud-inventory" }),
  };

  // --- Werkzeugleiste: Vorlesen, Sound, Logbuch ---
  let currentPlainText = "";
  const readBtn = el("button", { class: "tab tool-btn", title: "Geschichte vorlesen" }, "🔊 Vorlesen");
  readBtn.addEventListener("click", () => {
    if (readBtn.classList.contains("active")) { stopSpeak(); readBtn.classList.remove("active"); return; }
    readBtn.classList.add("active");
    if (!speak(currentPlainText, () => readBtn.classList.remove("active"))) {
      readBtn.textContent = "🔇 nicht verfügbar";
    }
  });
  if (!canSpeak()) readBtn.style.display = "none";

  const soundBtn = el("button", { class: "tab tool-btn", title: "Soundeffekte an/aus" }, isSoundOn() ? "🔔 Sound an" : "🔕 Sound aus");
  soundBtn.addEventListener("click", () => {
    const on = !isSoundOn();
    setSoundOn(on);
    setSettings({ sound: on });
    soundBtn.textContent = on ? "🔔 Sound an" : "🔕 Sound aus";
    if (on) sfx("click");
  });

  const logBtn = el("button", { class: "tab tool-btn", title: "Bisherige Geschichte" }, "📖 Logbuch");
  logBtn.addEventListener("click", () => showLog());

  const helpBtn = el("button", { class: "tab tool-btn", title: "Stufenweise Hilfe für diese Szene" }, "💡 Hilfe");
  helpBtn.addEventListener("click", () => showHints());

  const toolbar = el("div", { class: "tab-bar game-toolbar" }, readBtn, soundBtn, logBtn, helpBtn);
  let currentNode = null;

  container.replaceChildren(
    el("div", { class: "game" },
      el("div", { class: "game-main" }, scene, storyBox, actions),
      el("aside", { class: "game-side" },
        el("h3", {}, adv.emoji + " " + adv.title),
        hud.hearts,
        el("h4", {}, "🎒 Rucksack"),
        hud.inventory,
        toolbar,
        el("button", { class: "btn btn-ghost btn-small", style: "margin-top:10px", onclick: () => { stopSpeak(); location.hash = "#/adventure"; } }, "💾 Speichern & zurück"),
      ),
    ),
  );

  const has = (item) => save.items.includes(item);

  function updateHud() {
    const hp = Math.max(0, save.hp);
    hud.hearts.textContent = "❤️".repeat(hp) + "🤍".repeat(Math.max(0, adv.maxHp - hp));
    const visible = save.items.filter((i) => adv.items[i]);
    hud.inventory.replaceChildren(
      ...(visible.length ? visible.map((i) => el("span", { class: "chip" }, adv.items[i])) : [el("small", {}, "noch leer")]),
    );
  }

  // {hat:item?dann:sonst} im Text auflösen
  function renderText(text) {
    return text.replace(/\{hat:(\w+)\?([^:}]*)(?::([^}]*))?\}/g, (_, item, then, otherwise) =>
      has(item) ? then : (otherwise || ""),
    );
  }

  function showStory(html, cls = "bubble-story", animate = true) {
    const node = el("div", { class: "bubble " + cls });
    if (animate) typewriter(node, html);
    else node.innerHTML = html;
    storyBox.replaceChildren(node);
    storyBox.scrollTop = 0;
    currentPlainText = node.textContent;
    stopSpeak();
    readBtn.classList.remove("active");
  }

  function showLog() {
    const entries = save.path
      .map((id) => nodeById[id])
      .filter((n) => n && (n.text || n.dice || n.riddle));
    const overlay = el("div", { class: "overlay", onclick: (e) => { if (e.target === overlay) overlay.remove(); } },
      el("div", { class: "overlay-card" },
        el("h3", {}, "📖 Dein Logbuch"),
        entries.length
          ? el("div", { class: "logbook" }, ...entries.map((n, i) => {
              const div = el("div", { class: "log-entry" });
              const txt = n.text ? renderText(n.text) : (n.dice ? "🎲 " + escapeHtml(n.dice.text) : "🧩 " + escapeHtml(n.riddle.question));
              div.innerHTML = `<small>${i + 1}.</small> ${txt}`;
              return div;
            }))
          : el("p", { class: "muted" }, "Noch nichts erlebt — gleich ändern!"),
        el("button", { class: "btn", onclick: () => overlay.remove() }, "Weiter geht's"),
      ),
    );
    document.body.append(overlay);
  }

  // ----- Stufenweise Hilfe -----

  /** Tipps für den aktuellen Knoten, von vage bis „der richtige Schritt“. */
  function nodeHints(node) {
    const hints = [];
    if (node.hints) {
      for (const h of node.hints) hints.push(renderText(h));
    }
    if (node.riddle) {
      hints.push(escapeHtml(node.riddle.hint));
      if (node.riddle.hint2) hints.push(escapeHtml(node.riddle.hint2));
      const answer = node.riddle.options ? node.riddle.options[node.riddle.answer] : String(node.riddle.answer);
      hints.push(`Die Lösung ist: <strong>${escapeHtml(answer)}</strong>`);
    } else if (!node.hints) {
      if (node.dice) {
        const t = node.dice.threshold || 4;
        hints.push(`Hier entscheidet das Würfelglück — ab einer ${t} klappt es. Und selbst wenn nicht: Es geht immer weiter, höchstens ein Herz ärmer.`);
      } else {
        const lockedChoices = (node.choices || []).filter(
          (c) => (c.require || []).some((i) => !has(i)) && !(c.hideIf || []).some(has),
        );
        if (lockedChoices.length) {
          hints.push("Eine Tür ist hier noch zu (🔒). Irgendwo auf deinem Weg findest du, was dafür fehlt — schau dich an Orten um, an denen du noch nicht warst.");
          hints.push(lockedChoices.map((c) => "🔒 " + escapeHtml(c.lockHint || c.label)).join("<br>"));
        } else if (node.choices?.length) {
          hints.push("Hier gibt es keinen falschen Weg — folge deinem Bauchgefühl. Du kannst nichts kaputt machen, und Wiederholen ist jederzeit erlaubt.");
        }
      }
    }
    return hints;
  }

  function showHints() {
    const node = currentNode;
    if (!node) return;
    const hints = nodeHints(node);
    if (!hints.length) return;
    save.hintLevels = save.hintLevels || {};
    let level = Math.max(1, Math.min(save.hintLevels[node.id] || 1, hints.length));

    const body = el("div", { class: "logbook" });
    const moreBtn = el("button", { class: "btn" });
    const note = el("p", { class: "muted center" });

    const draw = () => {
      save.hintLevels[node.id] = level;
      putSave(save);
      body.replaceChildren(...hints.slice(0, level).map((h, i) => {
        const box = el("div", { class: "hint-box" + (i === hints.length - 1 ? " hint-final" : "") });
        box.innerHTML = `<strong>${i === hints.length - 1 ? "🎯 Der richtige Schritt" : "💡 Tipp " + (i + 1)}:</strong> ${h}`;
        return box;
      }));
      if (level < hints.length) {
        moreBtn.textContent = level + 1 === hints.length ? "🎯 Verrat mir den richtigen Schritt" : "💡 Noch ein Tipp";
        moreBtn.style.display = "";
        note.textContent = "";
      } else {
        moreBtn.style.display = "none";
        note.textContent = hints.length > 1 ? "Mehr Tipps gibt es hier nicht — du schaffst das!" : "";
      }
    };
    moreBtn.addEventListener("click", () => { level++; sfx("click"); draw(); });

    const overlay = el("div", { class: "overlay", onclick: (e) => { if (e.target === overlay) overlay.remove(); } },
      el("div", { class: "overlay-card" },
        el("h3", {}, "💡 Hilfe"),
        body, moreBtn, note,
        el("button", { class: "btn btn-ghost", style: "margin-left:8px", onclick: () => overlay.remove() }, "Alleine weiterprobieren"),
      ),
    );
    document.body.append(overlay);
    draw();
  }

  function hintButton() {
    if (!currentNode || !nodeHints(currentNode).length) return null;
    return el("button", { class: "btn btn-ghost btn-small btn-hint", onclick: showHints }, "💡 Tipp?");
  }

  function applyChoiceEffects(choice) {
    let gotItem = false;
    for (const item of choice.take || []) if (!has(item)) { save.items.push(item); if (adv.items[item]) gotItem = true; }
    for (const item of choice.drop || []) save.items = save.items.filter((i) => i !== item);
    if (choice.hp) changeHp(choice.hp);
    if (gotItem) sfx("item");
  }

  function changeHp(delta) {
    save.hp = Math.min(adv.maxHp, save.hp + delta);
    if (delta < 0) sfx("ouch");
  }

  function checkRescue() {
    if (save.hp > 0) return false;
    save.hp = adv.maxHp;
    save.nodeId = adv.rescue.to;
    putSave(save);
    showStory(`<p>💫 ${renderText(adv.rescue.text)}</p>`, "bubble-story bubble-rescue");
    actions.replaceChildren(
      el("button", { class: "btn btn-big", onclick: () => goto(adv.rescue.to, false) }, "Weiter geht's!"),
    );
    updateHud();
    return true;
  }

  function goto(nodeId, viaChoice = true) {
    const node = nodeById[nodeId];
    if (!node) { console.warn("Unbekannter Knoten:", nodeId); return; }
    save.nodeId = nodeId;
    if (viaChoice) save.steps = (save.steps || 0) + 1;
    if (save.path[save.path.length - 1] !== nodeId) save.path.push(nodeId);
    if (save.path.length > 200) save.path = save.path.slice(-150);

    // Einmalige Knoten-Effekte (nur beim ersten Besuch)
    if (!save.visited.includes(nodeId)) {
      save.visited.push(nodeId);
      if (node.effect?.hp) changeHp(node.effect.hp);
      if (node.effectIf && has(node.effectIf.hat) && node.effectIf.hp) changeHp(node.effectIf.hp);
    }
    // Effekte, die bei JEDEM Besuch wirken (z. B. wiederholte falsche Anschuldigung)
    if (viaChoice && node.effectAlways?.hp) changeHp(node.effectAlways.hp);

    putSave(save);
    renderNode(node);
  }

  function renderNode(node) {
    currentNode = node;
    updateHud();
    if (node.scene && adv.scenes[node.scene]) scene.innerHTML = adv.scenes[node.scene];

    if (checkRescue()) return;

    // --- Würfelprobe ---
    if (node.dice) {
      showStory(`<p>🎲 ${escapeHtml(node.dice.text)}</p>`);
      const die = el("button", { class: "btn btn-dice" }, "🎲 Würfeln!");
      die.addEventListener("click", () => {
        die.disabled = true;
        sfx("dice");
        let ticks = 0;
        const interval = setInterval(() => {
          die.textContent = DICE_FACES[Math.floor(Math.random() * 6)];
          if (++ticks >= 12) {
            clearInterval(interval);
            const n = 1 + Math.floor(Math.random() * 6);
            const success = n >= (node.dice.threshold || 4);
            die.textContent = `${DICE_FACES[n - 1]}  Eine ${n}! ${success ? "Geschafft! 🎉" : "Oh nein …"}`;
            sfx(success ? "win" : "fail");
            setTimeout(() => {
              if (success) {
                for (const item of node.dice.winTake || []) if (!has(item)) save.items.push(item);
                goto(node.dice.win);
              } else {
                save.diceLost++;
                changeHp(-(node.dice.loseHp || 1));
                putSave(save);
                if (save.hp <= 0) { checkRescue(); return; }
                showStory(`<p>${escapeHtml(node.dice.loseText || "Das ging schief!")}</p>`, "bubble-story bubble-ouch");
                actions.replaceChildren(
                  el("button", { class: "btn btn-big", onclick: () => goto(node.dice.lose) }, "Weiter"),
                );
                updateHud();
              }
            }, 1100);
          }
        }, 90);
      });
      actions.replaceChildren(...[die, hintButton()].filter(Boolean));
      return;
    }

    // --- Rätsel ---
    if (node.riddle) {
      const r = node.riddle;
      const intro = node.text ? `<p>${renderText(node.text)}</p>` : "";
      showStory(`${intro}<p>🧩 <strong>Rätsel:</strong> ${escapeHtml(r.question)}</p>`);
      const feedback = el("p", { class: "error", style: "min-height:1.5em" });

      const succeed = () => {
        feedback.className = "success";
        feedback.textContent = "✅ Richtig!";
        sfx("win");
        setTimeout(() => goto(r.win), 700);
      };
      const fail = () => {
        feedback.className = "error";
        feedback.textContent = "❌ Hmm, das stimmt nicht — probier es nochmal!";
        sfx("fail");
        // Nach einem Fehlversuch auf die Hilfe aufmerksam machen
        actions.querySelector(".btn-hint")?.classList.add("pulse");
      };

      if (r.options) {
        const wrap = el("div", { class: "choices" });
        r.options.forEach((opt, i) => {
          wrap.append(el("button", { class: "btn btn-choice", onclick: () => (i === r.answer ? succeed() : fail()) }, opt));
        });
        actions.replaceChildren(...[wrap, feedback, hintButton()].filter(Boolean));
      } else {
        const input = el("input", { class: "input", inputmode: "numeric", placeholder: "Deine Antwort …", maxlength: "20" });
        const check = () => {
          const v = input.value.trim().toLowerCase().replace(",", ".");
          if (v === String(r.answer).toLowerCase()) succeed();
          else { fail(); input.value = ""; input.focus(); }
        };
        const btn = el("button", { class: "btn", onclick: check }, "➤");
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
        actions.replaceChildren(...[el("div", { class: "free-input" }, input, btn), feedback, hintButton()].filter(Boolean));
        input.focus();
      }
      return;
    }

    // --- Happy End ---
    if (node.end === "win") {
      const firstWin = !save.finished;
      save.finished = true;
      const earned = (adv.achievements || []).filter((a) => {
        try { return a.test(save); } catch { return false; }
      });
      save.achievements = [...new Set([...(save.achievements || []), ...earned.map((a) => a.id)])];
      putSave(save);
      showStory(`<p>${renderText(node.text)}</p>`);
      if (firstWin) { sfx("fanfare"); confetti(); }

      const earnedIds = new Set(save.achievements);
      actions.replaceChildren(
        el("div", { class: "game-over" },
          el("h3", {}, "🏅 Abenteuer geschafft! 🏅"),
          el("div", { class: "end-stats" },
            el("span", { class: "chip" }, `👣 ${save.steps} Schritte`),
            el("span", { class: "chip" }, `❤️ ${save.hp}/${adv.maxHp} Herzen`),
            el("span", { class: "chip" }, `🎲 ${save.diceLost === 0 ? "kein Pechwurf!" : save.diceLost + "× Würfelpech"}`),
          ),
          (adv.achievements || []).length
            ? el("div", { class: "ach-list" },
                el("h4", {}, "Erfolge"),
                ...(adv.achievements || []).map((a) =>
                  el("div", { class: "ach-badge" + (earnedIds.has(a.id) ? "" : " ach-locked") },
                    el("span", { class: "ach-emoji" }, earnedIds.has(a.id) ? a.emoji : "🔒"),
                    el("span", {}, a.label),
                  )),
              )
            : null,
          el("button", { class: "btn btn-big", onclick: () => startNew(adv.id) }, "🔁 Nochmal anders spielen"),
          el("button", { class: "btn btn-ghost", onclick: () => (location.hash = "#/adventure") }, "Zur Abenteuer-Auswahl"),
        ),
      );
      return;
    }

    // --- Normaler Erzählknoten ---
    showStory(`<p>${renderText(node.text)}</p>`);
    const wrap = el("div", { class: "choices" });
    for (const choice of node.choices || []) {
      if ((choice.hideIf || []).some(has)) continue;
      if ((choice.showIf || []).some((item) => !has(item))) continue;
      const locked = (choice.require || []).some((item) => !has(item));
      if (locked) {
        wrap.append(el("button", { class: "btn btn-choice btn-locked", onclick: () => {
          sfx("fail");
          const hint = el("small", { class: "lock-hint" }, " 🔒 " + (choice.lockHint || "Dafür fehlt dir noch etwas."));
          if (!wrap.querySelector(".lock-hint")) wrap.append(hint);
          actions.querySelector(".btn-hint")?.classList.add("pulse");
        } }, "🔒 " + choice.label));
      } else {
        wrap.append(el("button", { class: "btn btn-choice" + (choice.secret ? " btn-secret" : ""), onclick: () => {
          sfx("click");
          applyChoiceEffects(choice);
          goto(choice.to);
        } }, (choice.secret ? "✨ " : "") + choice.label));
      }
    }
    actions.replaceChildren(...[wrap, hintButton()].filter(Boolean));
  }

  // Aktuellen Knoten anzeigen (ohne Effekte erneut anzuwenden)
  renderNode(nodeById[save.nodeId] || nodeById[adv.start]);
}
