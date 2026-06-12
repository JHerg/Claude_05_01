// Fall-Archiv: Detektiv-Fälle mit zufällig ausgelostem Täter.
// Ermittlungsebenen:
//  1. Orte untersuchen — wo welche Spur liegt, wird jede Runde neu gemischt
//     (plus 1 Bonus-Fund und Nieten-Orte)
//  2. Befragen (kostenlos) — Unschuldige sagen die Wahrheit über den Täter,
//     der Täter LÜGT. Widerspricht eine Aussage einer gefundenen Spur → ertappt!
//  3. Alibi prüfen (begrenzt) — beim Täter platzt das Alibi
//  4. Kombinationstafel — gleicht Spuren automatisch mit den Steckbriefen ab
// Anklage jederzeit möglich; Fehlanklage kostet ein Herz.

import { CASES, BONUS_TEXT, NIETEN } from "./cases.js";
import { SZENEN } from "./cases_szenen.js";
import { getModuleState, setModuleState } from "./storage.js";
import { el, escapeHtml, shuffle, sfx, confetti, typewriter, speak, canSpeak, stopSpeak } from "./ui.js";

const KEY = "fallarchiv";
const MAX_HERZEN = 3;
const BASIS_CHECKS = 2;

const load = () => getModuleState(KEY, { records: {}, active: null });
const save = (st) => setModuleState(KEY, st);

export function route(container) {
  document.body.classList.add("theme-adventure");
  const st = load();
  // Alte Spielstände (v1-Format ohne Aussagen) sauber verwerfen
  if (st.active && (!CASES.some((c) => c.id === st.active.caseId) || !st.active.aussagen)) st.active = null;
  if (st.active) renderPlay(container);
  else renderSelect(container);
}

function overlay(...children) {
  const node = el("div", { class: "overlay", onclick: (e) => { if (e.target === node) { stopSpeak(); node.remove(); } } },
    el("div", { class: "overlay-card" }, ...children),
  );
  document.body.append(node);
  return node;
}

/** Erzähl-Absatz mit Schreibmaschinen-Effekt und Vorlesen-Knopf. */
function prosa(html) {
  const wrap = el("div", { class: "prosa" });
  const text = el("div", { class: "prosa-text" });
  typewriter(text, html);
  wrap.append(text);
  if (canSpeak()) {
    const btn = el("button", { class: "tab tool-btn prosa-read" }, "🔊 Vorlesen");
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) { stopSpeak(); btn.classList.remove("active"); return; }
      btn.classList.add("active");
      speak(text.textContent, () => btn.classList.remove("active"));
    });
    wrap.append(btn);
  }
  return wrap;
}

/** Kino-Intro: Titelbild + Prolog-Szenen als Sequenz, dann startet die Ermittlung. */
function playIntro(c, onDone) {
  const sz = SZENEN[c.id];
  const steps = [];
  if (sz) {
    steps.push({ html: `<div class="fall-bild">${sz.titelbild}</div><p class="fall-untertitel">Ein Fall für das Detektivbüro Blitz</p><h3 class="fall-titel">${c.emoji} ${c.title}</h3>`, plain: true, label: "Weiter ▸" });
    for (const t of sz.prolog) steps.push({ html: t, label: "Weiter ▸" });
  }
  steps.push({ html: c.intro, label: "🔍 Ermittlung aufnehmen!" });

  const content = el("div", {});
  const nextBtn = el("button", { class: "btn btn-big" });
  let i = 0;
  const draw = () => {
    stopSpeak();
    const step = steps[i];
    if (step.plain) {
      content.innerHTML = step.html;
      content.append(el("p", { class: "muted center" }, `Verdächtige: ${c.verdaechtige.length} · Orte: ${c.orte.length} · Einer von ihnen lügt …`));
    } else {
      content.replaceChildren(prosa(step.html));
    }
    nextBtn.textContent = step.label;
  };
  nextBtn.addEventListener("click", () => {
    sfx("click");
    i++;
    if (i >= steps.length) { stopSpeak(); node.remove(); onDone?.(); return; }
    draw();
  });
  const node = overlay(content, el("div", { class: "center" }, nextBtn));
  draw();
}

// ---------- Fall-Auswahl ----------

function renderSelect(container) {
  const st = load();
  container.replaceChildren(
    el("section", { class: "hero" },
      el("h2", {}, "🗂️ Fall-Archiv"),
      el("p", {}, "Der Täter wird bei jedem Start neu ausgelost — und sogar die Verstecke der Spuren werden neu gemischt! Untersuche Orte, befrage Verdächtige (einer lügt …), prüfe Alibis und nutze die Kombinationstafel. Klage an, sobald du sicher bist — Fehlanklagen kosten ein Herz."),
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
        el("small", {}, `${c.verdaechtige.length} Verdächtige · ${c.orte.length} Orte · Befragungen, Alibis & Spuren`),
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

/** Lost Täter aus, verteilt Spuren/Bonus/Nieten auf die Orte, erzeugt Zeugenaussagen. */
function mischeFall(c) {
  const culpritObj = c.verdaechtige[Math.floor(Math.random() * c.verdaechtige.length)];
  const culprit = culpritObj.id;

  // Orte mischen: erst die Merkmal-Spuren, dann 1 Bonus, Rest Nieten
  const ortIds = shuffle(c.orte.map((o) => o.id));
  const merkmalIds = shuffle(c.merkmale.map((m) => m.id));
  const ortInhalt = {};
  ortIds.forEach((oid, i) => {
    if (i < merkmalIds.length) ortInhalt[oid] = { art: "merkmal", mid: merkmalIds[i] };
    else if (i === merkmalIds.length) ortInhalt[oid] = { art: "bonus" };
    else ortInhalt[oid] = { art: "niete", text: NIETEN[Math.floor(Math.random() * NIETEN.length)] };
  });

  // Zeugenaussagen: Unschuldige sagen die Wahrheit über ein zufälliges Täter-Merkmal,
  // der Täter nennt einen FALSCHEN Wert (von einem anderen Verdächtigen geliehen).
  const aussagen = {};
  for (const v of c.verdaechtige) {
    const m = c.merkmale[Math.floor(Math.random() * c.merkmale.length)];
    if (v.id === culprit) {
      const falsche = c.verdaechtige.filter((x) => x.werte[m.id] !== culpritObj.werte[m.id]);
      const fake = falsche[Math.floor(Math.random() * falsche.length)];
      aussagen[v.id] = { mid: m.id, wert: fake.werte[m.id] };
    } else {
      aussagen[v.id] = { mid: m.id, wert: culpritObj.werte[m.id] };
    }
  }

  return { caseId: c.id, culprit, ortInhalt, aussagen, found: [], besucht: [], befragt: [], checked: [], entlastet: [], bonus: 0, wrong: 0, herzen: MAX_HERZEN };
}

function startCase(container, c) {
  const st = load();
  st.active = mischeFall(c);
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
  const maxChecks = BASIS_CHECKS + (a.bonus || 0);

  const persist = () => { st.active = a; save(st); };

  /** Widerspricht die Aussage eines Verdächtigen einer gefundenen Spur? */
  const istErtappt = (sid) => {
    const aus = a.aussagen[sid];
    return aus && a.found.includes(aus.mid) && aus.wert !== culprit.werte[aus.mid];
  };

  /** Passt ein Verdächtiger noch zu allen gefundenen Spuren? */
  const passtNoch = (v) => a.found.every((mid) => v.werte[mid] === culprit.werte[mid]);

  // ----- Kopf -----
  const verbleibend = c.verdaechtige.filter((v) => passtNoch(v) && !a.entlastet.includes(v.id)).length;
  const header = el("section", { class: "panel" },
    el("h2", {}, `${c.emoji} ${c.title}`),
    el("div", { class: "tab-bar" },
      el("span", { class: "hud-hearts" }, "❤️".repeat(Math.max(0, a.herzen)) + "🤍".repeat(MAX_HERZEN - Math.max(0, a.herzen))),
      el("span", { class: "chip" }, `🕵️ Noch im Visier: ${verbleibend} von ${c.verdaechtige.length}`),
      el("span", { class: "chip" }, `🗂️ Alibi-Checks übrig: ${maxChecks - a.checked.length}`),
      el("button", { class: "tab tool-btn", onclick: () => playIntro(c) }, "🎬 Der Fall"),
      el("button", { class: "tab tool-btn", onclick: () => {
        if (!confirm("Fall wirklich abbrechen? Beim nächsten Mal wird alles neu gemischt.")) return;
        st.active = null; save(st); renderSelect(container);
      } }, "🗂 Fall abgeben"),
    ),
  );

  // ----- Spurentafel -----
  const spuren = el("section", { class: "panel" }, el("h3", {}, "🧷 Deine Spurentafel"));
  if (!a.found.length && !a.checked.length && !a.befragt.length) {
    spuren.append(el("p", { class: "muted" }, "Noch leer. Untersuche Orte, befrage Verdächtige und prüfe Alibis — jede Information bringt dich näher an den Täter."));
  }
  for (const mid of a.found) {
    const m = merkmalById[mid];
    const line = el("div", { class: "hint-box" });
    line.innerHTML = `${m.emoji} <strong>${m.label}:</strong> ${m.clue(escapeHtml(culprit.werte[mid]))}`;
    spuren.append(line);
  }
  for (const sid of a.befragt) {
    const v = c.verdaechtige.find((x) => x.id === sid);
    const aus = a.aussagen[sid];
    const m = merkmalById[aus.mid];
    const ertappt = istErtappt(sid);
    const line = el("div", { class: "hint-box" + (ertappt ? " hint-lie" : "") });
    line.innerHTML = `🗣️ <strong>${escapeHtml(v.name)} sagt aus:</strong> „Der Täter? ${m.label}: <strong>${escapeHtml(aus.wert)}</strong> — da bin ich mir sicher!“` +
      (ertappt ? `<br>⚠️ <strong>WIDERSPRUCH!</strong> Deine Spur zeigt eindeutig „${escapeHtml(culprit.werte[aus.mid])}“ — hier lügt jemand …` : "");
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

  // ----- Kombinationstafel -----
  const kombi = el("section", { class: "panel" });
  const kombiBtn = el("button", { class: "btn btn-ghost btn-small" }, "🧮 Kombinationstafel öffnen");
  const kombiBody = el("div", { style: "display:none" });
  kombiBtn.addEventListener("click", () => {
    const open = kombiBody.style.display === "none";
    kombiBody.style.display = open ? "" : "none";
    kombiBtn.textContent = open ? "🧮 Kombinationstafel schließen" : "🧮 Kombinationstafel öffnen";
    sfx("click");
  });
  const tbl = el("table", { class: "plan-table kombi-table" });
  const head = el("tr", {}, el("td", {}, el("strong", {}, "Verdächtige")));
  for (const m of c.merkmale) head.append(el("td", { title: m.label }, m.emoji));
  tbl.append(head);
  for (const v of c.verdaechtige) {
    const raus = a.entlastet.includes(v.id) || !passtNoch(v);
    const row = el("tr", { class: raus ? "kombi-raus" : "" }, el("td", {}, `${v.emoji} ${v.name}` + (raus ? " ✖" : "")));
    for (const m of c.merkmale) {
      const cell = el("td", {}, v.werte[m.id]);
      if (a.found.includes(m.id)) cell.className = v.werte[m.id] === culprit.werte[m.id] ? "kombi-match" : "kombi-clash";
      row.append(cell);
    }
    tbl.append(row);
  }
  kombiBody.append(
    el("p", { class: "muted" }, "Grün = passt zu deiner Spur, Rot = passt nicht, ✖ = ausgeschlossen. Spalten ohne Farbe: Spur noch nicht gefunden."),
    el("div", { class: "kombi-scroll" }, tbl),
  );
  kombi.append(kombiBtn, kombiBody);

  // ----- Orte -----
  const orteGrid = el("div", { class: "module-grid" });
  for (const o of c.orte) {
    const inhalt = a.ortInhalt[o.id];
    const visited = a.besucht.includes(o.id);
    let status = o.flavor;
    if (visited) {
      status = inhalt.art === "merkmal" ? `✅ Spur gesichert: ${merkmalById[inhalt.mid].label}`
        : inhalt.art === "bonus" ? "✅ Bonus-Fund: +1 Alibi-Check!"
        : "✅ Durchsucht — nichts Brauchbares.";
    }
    const card = el("button", { class: "module-card" + (visited ? " ort-done" : "") },
      el("span", { class: "module-emoji" }, o.emoji),
      el("strong", {}, o.name),
      el("small", {}, status),
    );
    if (!visited) {
      card.addEventListener("click", () => {
        const sz = SZENEN[c.id]?.orte?.[o.id];
        const content = el("div", {});
        const footer = el("div", { class: "center" });
        const node = overlay(content, footer);

        // ----- Akt 1: Ankommen — Bild und Szene wirken lassen -----
        const akt1 = () => {
          content.replaceChildren();
          if (sz?.bild) { const b = el("div", { class: "fall-bild" }); b.innerHTML = sz.bild; content.append(b); }
          content.append(el("h3", {}, `${o.emoji} ${o.name}`));
          content.append(prosa(sz?.szene || o.flavor));
          const weiter = el("button", { class: "btn btn-big" }, "🔍 Genauer untersuchen …");
          weiter.addEventListener("click", () => { sfx("click"); akt2(); });
          footer.replaceChildren(weiter);
        };

        // ----- Akt 2: Der Fund -----
        const akt2 = () => {
          stopSpeak();
          a.besucht.push(o.id);
          const box = el("p", { class: "hint-box" });
          const intros = SZENEN[c.id]?.fundIntro || ["Und dann siehst du es:"];
          const lead = intros[Math.floor(Math.random() * intros.length)];
          if (inhalt.art === "merkmal") {
            a.found.push(inhalt.mid);
            sfx("item");
            const m = merkmalById[inhalt.mid];
            box.innerHTML = `${m.emoji} ${m.clue(escapeHtml(culprit.werte[inhalt.mid]))}`;
          } else if (inhalt.art === "bonus") {
            a.bonus = (a.bonus || 0) + 1;
            sfx("win");
            box.innerHTML = BONUS_TEXT;
          } else {
            sfx("fail");
            box.innerHTML = `🕸️ ${escapeHtml(inhalt.text)}`;
          }
          persist();
          content.replaceChildren();
          if (sz?.bild) { const b = el("div", { class: "fall-bild fall-bild-dim" }); b.innerHTML = sz.bild; content.append(b); }
          content.append(
            el("h3", {}, `${o.emoji} ${o.name}`),
            el("p", { class: "fund-lead" }, inhalt.art === "niete" ? "Du suchst gründlich, hebst alles an, leuchtest in jede Ritze …" : lead),
            box,
          );
          const done = el("button", { class: "btn btn-big" }, "📓 Notiert!");
          done.addEventListener("click", () => { stopSpeak(); node.remove(); renderPlay(container); });
          footer.replaceChildren(done);
        };

        akt1();
      });
    }
    orteGrid.append(card);
  }

  // ----- Verdächtige -----
  const suspGrid = el("div", { class: "module-grid" });
  for (const v of c.verdaechtige) {
    const cleared = a.entlastet.includes(v.id);
    const ertappt = istErtappt(v.id);
    suspGrid.append(
      el("button", { class: "module-card" + (cleared ? " ort-done" : "") + (ertappt ? " susp-lie" : ""), onclick: () => showSteckbrief(v) },
        el("span", { class: "module-emoji" }, v.emoji),
        el("strong", {}, v.name + (cleared ? " ✅" : ertappt ? " ⚠️" : "")),
        el("small", {}, cleared ? "Entlastet — Alibi hält." : ertappt ? "Hat nachweislich GELOGEN …" : v.rolle),
      ),
    );
  }

  function showSteckbrief(v) {
    const cleared = a.entlastet.includes(v.id);
    const checksLeft = maxChecks - a.checked.length;
    const body = el("div", {});

    body.append(
      el("table", { class: "plan-table" },
        ...c.merkmale.map((m) => el("tr", {}, el("td", {}, `${m.emoji} ${m.label}`), el("td", {}, el("strong", {}, v.werte[m.id])))),
      ),
      el("p", {}, el("strong", {}, "Mögliches Motiv: "), v.motiv),
      el("p", {}, el("strong", {}, "Alibi: "), v.alibi),
    );
    if (a.befragt.includes(v.id)) {
      const aus = a.aussagen[v.id];
      const m = merkmalById[aus.mid];
      const p = el("p", { class: istErtappt(v.id) ? "error" : "" });
      p.textContent = `🗣️ Aussage: „Der Täter? ${m.label}: ${aus.wert}!“` + (istErtappt(v.id) ? " — nachweislich GELOGEN!" : "");
      body.append(p);
    }
    if (a.checked.includes(v.id)) {
      const res = el("p", { class: v.id === a.culprit ? "error" : "success" });
      res.textContent = v.id === a.culprit ? "💥 Geprüft: Das Alibi ist eine LÜGE! " + v.alibiLuege : "✅ Geprüft: Das Alibi stimmt.";
      body.append(res);
    }

    const buttons = el("div", { class: "tab-bar" });
    if (!cleared && !a.befragt.includes(v.id)) {
      buttons.append(el("button", { class: "btn", onclick: (e) => {
        a.befragt.push(v.id);
        persist();
        sfx("click");
        e.target.closest(".overlay").remove();
        const aus = a.aussagen[v.id];
        const m = merkmalById[aus.mid];
        overlay(
          el("h3", {}, `🗣️ Befragung: ${v.name}`),
          el("p", { class: "muted" }, v.smalltalk),
          el("p", {}, `„Den Täter habe ich kurz gesehen! ${m.label}: ${aus.wert} — da bin ich mir ganz sicher.“`),
          el("p", { class: "muted" }, "Stimmt das? Vergleiche die Aussage mit deinen Spuren — Unschuldige sagen die Wahrheit, nur der Täter lügt."),
          el("button", { class: "btn", onclick: (ev) => { ev.target.closest(".overlay").remove(); renderPlay(container); } }, "📓 Notiert!"),
        );
      } }, "🗣️ Befragen (kostenlos)"));
    }
    if (!cleared && !a.checked.includes(v.id) && checksLeft > 0) {
      buttons.append(el("button", { class: "btn btn-ghost", onclick: (e) => {
        a.checked.push(v.id);
        if (v.id !== a.culprit && !a.entlastet.includes(v.id)) a.entlastet.push(v.id);
        persist();
        sfx(v.id === a.culprit ? "win" : "click");
        e.target.closest(".overlay").remove();
        renderPlay(container);
      } }, `🗂️ Alibi prüfen (noch ${checksLeft})`));
    } else if (!cleared && checksLeft <= 0 && !a.checked.includes(v.id)) {
      buttons.append(el("small", { class: "muted" }, "Keine Alibi-Prüfungen mehr übrig. (Tipp: Irgendwo liegt ein Bonus-Fund …)"));
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
      const stars = a.wrong === 0 ? (effort <= 3 ? 3 : 2) : 1;
      st.records[c.id] = Math.max(st.records[c.id] || 0, stars);
      st.active = null;
      save(st);
      sfx("fanfare");
      confetti();
      const text = el("p", {});
      text.innerHTML = escapeHtml(v.gestaendnis);
      overlay(
        el("h3", {}, "🏅 Fall gelöst!"),
        el("p", {}, `${v.emoji} ${v.name} gesteht alles:`),
        text,
        el("div", { class: "end-stats" },
          el("span", { class: "chip" }, `🧷 ${a.found.length} Spuren`),
          el("span", { class: "chip" }, `🗣️ ${a.befragt.length} Befragungen`),
          el("span", { class: "chip" }, `🗂️ ${a.checked.length} Alibi-Checks`),
          el("span", { class: "chip" }, a.wrong === 0 ? "⚖️ keine Fehlanklage!" : `⚖️ ${a.wrong} Fehlanklage(n)`),
        ),
        el("p", { class: "stars center" }, "★".repeat(stars) + "☆".repeat(3 - stars) + (stars === 3 ? " — Meisterleistung: messerscharf kombiniert!" : stars === 2 ? " — sauber ermittelt!" : " — gelöst, aber mit Umwegen.")),
        el("button", { class: "btn btn-big", onclick: (e) => { e.target.closest(".overlay").remove(); renderSelect(container); } }, "Zurück zum Fall-Archiv"),
      );
    } else {
      a.wrong++;
      a.herzen--;
      if (!a.entlastet.includes(v.id)) a.entlastet.push(v.id);
      sfx("fail");
      if (a.herzen <= 0) {
        st.active = mischeFall(c);
        save(st);
        overlay(
          el("h3", {}, "🚨 Der Fall wird neu aufgerollt!"),
          el("p", {}, `Drei Fehlanklagen — ${escapeHtml(v.name)} war es schon wieder nicht! Der wahre Täter hat Lunte gerochen, alles zurückgeräumt und NEUE Spuren an NEUEN Orten hinterlassen. Frau Sommer gibt dir eine zweite Chance: Der Fall beginnt von vorn — mit komplett frisch gemischten Karten.`),
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
    kombi,
    el("h3", {}, "📍 Orte untersuchen"),
    orteGrid,
    el("h3", {}, "🧑‍🤝‍🧑 Verdächtige (Steckbrief, Befragung, Alibi & Anklage)"),
    suspGrid,
    el("p", { class: "muted center" }, "💡 Drei Wege zum Täter: Spuren mit Steckbriefen abgleichen, Lügner bei der Befragung ertappen — oder das richtige Alibi platzen lassen. Du musst nicht alles finden!"),
  );

  if (showIntro) playIntro(c);
}
