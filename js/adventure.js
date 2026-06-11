// Die Abenteuer-Maschine (offline): Engine für die handgeschriebenen,
// verzweigten Abenteuer aus adventures.js — mit Herzen, Inventar,
// Würfelproben, Rätseln und SVG-Szenen. Keine API, keine Kosten.

import { ADVENTURES, getAdventure } from "./adventures.js";
import { listSaves, getSave, putSave, deleteSave, newId } from "./storage.js";
import { el, escapeHtml, scrollToBottom } from "./ui.js";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export function route(container, parts) {
  document.body.classList.add("theme-adventure");
  if (parts.length === 0) return renderHome(container);
  if (parts[0] === "play" && parts[1]) return renderPlay(container, parts[1]);
  location.hash = "#/adventure";
}

// ---------- Startseite ----------

function renderHome(container) {
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🐉 Abenteuer-Maschine"),
      el("p", {}, "Wähle dein Abenteuer und triff deine Entscheidungen: Herzen, Rucksack, Würfelglück — und mehr als ein Weg zum Happy End. Alles offline, jederzeit speicherbar."),
    ),
  );

  const grid = el("div", { class: "scenario-grid scenario-grid-big" });
  for (const adv of ADVENTURES) {
    grid.append(
      el("button", { class: "scenario-card", onclick: () => startNew(adv.id) },
        el("span", { class: "scenario-emoji" }, adv.emoji),
        el("strong", {}, adv.title),
        el("small", {}, adv.tagline),
        el("span", { class: "world-cta" }, "Neu starten ➤"),
      ),
    );
  }
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
              onclick: () => { if (confirm(`Spielstand „${adv.title}" wirklich löschen?`)) { deleteSave(s.id); renderHome(container); } },
            }, "🗑"),
          ),
        ),
      );
    }
    container.append(el("h3", {}, "Deine Spielstände"), list);
  }
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
    steps: 0,
    finished: false,
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

  const nodeById = Object.fromEntries(adv.nodes.map((n) => [n.id, n]));

  const scene = el("div", { class: "scene" });
  const storyBox = el("div", { class: "story-log" });
  const actions = el("div", { class: "actions" });
  const hud = {
    hearts: el("div", { class: "hud-hearts" }),
    inventory: el("div", { class: "hud-inventory" }),
  };

  container.replaceChildren(
    el("div", { class: "game" },
      el("div", { class: "game-main" }, scene, storyBox, actions),
      el("aside", { class: "game-side" },
        el("h3", {}, adv.emoji + " " + adv.title),
        hud.hearts,
        el("h4", {}, "🎒 Rucksack"),
        hud.inventory,
        el("button", { class: "btn btn-ghost btn-small", style: "margin-top:14px", onclick: () => (location.hash = "#/adventure") }, "💾 Speichern & zurück"),
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

  function showStory(html, cls = "bubble-story") {
    const node = el("div", { class: "bubble " + cls });
    node.innerHTML = html;
    storyBox.replaceChildren(node);
    storyBox.scrollTop = 0;
  }

  function applyChoiceEffects(choice) {
    for (const item of choice.take || []) if (!has(item)) save.items.push(item);
    for (const item of choice.drop || []) save.items = save.items.filter((i) => i !== item);
    if (choice.hp) changeHp(choice.hp);
  }

  function changeHp(delta) {
    save.hp = Math.min(adv.maxHp, save.hp + delta);
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

    // Einmalige Knoten-Effekte (nur beim ersten Besuch)
    if (!save.visited.includes(nodeId)) {
      save.visited.push(nodeId);
      if (node.effect?.hp) changeHp(node.effect.hp);
      if (node.effectIf && has(node.effectIf.hat) && node.effectIf.hp) changeHp(node.effectIf.hp);
    }

    putSave(save);
    renderNode(node);
  }

  function renderNode(node) {
    updateHud();
    if (node.scene && adv.scenes[node.scene]) scene.innerHTML = adv.scenes[node.scene];

    if (checkRescue()) return;

    // --- Würfelprobe ---
    if (node.dice) {
      showStory(`<p>🎲 ${escapeHtml(node.dice.text)}</p>`);
      const die = el("button", { class: "btn btn-dice" }, "🎲 Würfeln!");
      die.addEventListener("click", () => {
        die.disabled = true;
        let ticks = 0;
        const interval = setInterval(() => {
          die.textContent = DICE_FACES[Math.floor(Math.random() * 6)];
          if (++ticks >= 12) {
            clearInterval(interval);
            const n = 1 + Math.floor(Math.random() * 6);
            const success = n >= 4;
            die.textContent = `${DICE_FACES[n - 1]}  Eine ${n}! ${success ? "Geschafft! 🎉" : "Oh nein …"}`;
            setTimeout(() => {
              if (success) {
                goto(node.dice.win);
              } else {
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
      actions.replaceChildren(die);
      return;
    }

    // --- Rätsel ---
    if (node.riddle) {
      const r = node.riddle;
      showStory(`<p>🧩 <strong>Rätsel:</strong> ${escapeHtml(r.question)}</p>`);
      const feedback = el("p", { class: "error", style: "min-height:1.5em" });

      const succeed = () => {
        feedback.className = "success";
        feedback.textContent = "✅ Richtig!";
        setTimeout(() => goto(r.win), 700);
      };
      const fail = () => {
        feedback.className = "error";
        feedback.textContent = "❌ Hmm, das stimmt nicht. Tipp: " + r.hint;
      };

      if (r.options) {
        const wrap = el("div", { class: "choices" });
        r.options.forEach((opt, i) => {
          wrap.append(el("button", { class: "btn btn-choice", onclick: () => (i === r.answer ? succeed() : fail()) }, opt));
        });
        actions.replaceChildren(wrap, feedback);
      } else {
        const input = el("input", { class: "input", inputmode: "numeric", placeholder: "Deine Antwort …", maxlength: "20" });
        const check = () => {
          const v = input.value.trim().toLowerCase().replace(",", ".");
          if (v === String(r.answer).toLowerCase()) succeed();
          else { fail(); input.value = ""; input.focus(); }
        };
        const btn = el("button", { class: "btn", onclick: check }, "➤");
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
        actions.replaceChildren(el("div", { class: "free-input" }, input, btn), feedback);
        input.focus();
      }
      return;
    }

    // --- Happy End ---
    if (node.end === "win") {
      save.finished = true;
      putSave(save);
      showStory(`<p>${renderText(node.text)}</p>`);
      actions.replaceChildren(
        el("div", { class: "game-over" },
          el("h3", {}, "🏅 Abenteuer geschafft! 🏅"),
          el("p", {}, `Du hast es in ${save.steps} Schritten geschafft — mit ${save.hp} von ${adv.maxHp} Herzen!`),
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
      const locked = (choice.require || []).some((item) => !has(item));
      if (locked) {
        wrap.append(el("button", { class: "btn btn-choice btn-locked", onclick: () => {
          const hint = el("small", { class: "lock-hint" }, " 🔒 " + (choice.lockHint || "Dafür fehlt dir noch etwas."));
          if (!wrap.querySelector(".lock-hint")) wrap.append(hint);
        } }, "🔒 " + choice.label));
      } else {
        wrap.append(el("button", { class: "btn btn-choice", onclick: () => {
          applyChoiceEffects(choice);
          goto(choice.to);
        } }, choice.label));
      }
    }
    actions.replaceChildren(wrap);
  }

  // Aktuellen Knoten anzeigen (ohne Effekte erneut anzuwenden)
  renderNode(nodeById[save.nodeId] || nodeById[adv.start]);
}
