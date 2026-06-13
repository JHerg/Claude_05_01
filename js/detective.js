// Fall-Archiv: Detektiv-Fälle mit zufällig ausgelostem Täter.
// Ermittlungsebenen (alle MANUELL — nichts wird automatisch verraten):
//  1. Orte untersuchen — erst die Szene, dann aktiv Suchstellen antippen;
//     nur an EINER liegt die Spur. Wo, ist jede Runde neu gemischt.
//  2. Befragen (kostenlos) — Unschuldige sagen die Wahrheit über ein
//     Tätermerkmal, der Täter LÜGT. Der Spieler muss die Aussage selbst
//     mit seinen Spuren vergleichen.
//  3. Notizblock pro Person — selbst abhaken, ob Merkmale/Aussage passen.
//  4. Alibi prüfen (begrenzt) — beim Täter platzt das Alibi.
// Anklage jederzeit; Fehlanklage kostet ein Herz.

import { CASES, BONUS_TEXT } from "./cases.js";
import { SZENEN, SUCHPUNKTE } from "./cases_szenen.js";
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
  // Alte Spielstände ohne das neue Notizblock-Format sauber verwerfen
  if (st.active && (!CASES.some((c) => c.id === st.active.caseId) || !st.active.aussagen || !st.active.notes)) st.active = null;
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

/** Kino-Intro: Titelbild + Prolog-Szenen als Sequenz. */
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
      el("p", {}, "Der Täter wird jedes Mal neu ausgelost — und auch die Verstecke der Spuren! Durchsuche die Orte selbst, befrage die Verdächtigen (einer lügt …) und führe deinen eigenen Notizblock. Niemand sagt dir, wer es war — du kombinierst es selbst. Klage erst an, wenn du sicher bist."),
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
        el("small", {}, `${c.verdaechtige.length} Verdächtige · ${c.orte.length} Orte · Suchen, Befragen & Kombinieren`),
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

/** Lost Täter aus, verteilt Spuren/Bonus/Nieten, erzeugt Zeugenaussagen. */
function mischeFall(c) {
  const culpritObj = c.verdaechtige[Math.floor(Math.random() * c.verdaechtige.length)];
  const culprit = culpritObj.id;

  const ortIds = shuffle(c.orte.map((o) => o.id));
  const merkmalIds = shuffle(c.merkmale.map((m) => m.id));
  const ortInhalt = {};
  ortIds.forEach((oid, i) => {
    if (i < merkmalIds.length) ortInhalt[oid] = { art: "merkmal", mid: merkmalIds[i] };
    else if (i === merkmalIds.length) ortInhalt[oid] = { art: "bonus" };
    else ortInhalt[oid] = { art: "niete" };
  });

  // Aussagen: Unschuldige nennen den WAHREN Täterwert, der Täter einen falschen.
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

  return {
    caseId: c.id, culprit, ortInhalt, aussagen,
    found: [], besucht: [], befragt: [], checked: [], entlastet: [],
    notes: {}, bonus: 0, wrong: 0, herzen: MAX_HERZEN,
  };
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
  const note = (sid) => (a.notes[sid] ||= { merkmale: {}, aussage: null, ausgeschlossen: false });
  const istRaus = (v) => a.entlastet.includes(v.id) || note(v.id).ausgeschlossen;

  // ----- Kopf -----
  const rausCount = c.verdaechtige.filter(istRaus).length;
  const header = el("section", { class: "panel" },
    el("h2", {}, `${c.emoji} ${c.title}`),
    el("div", { class: "tab-bar" },
      el("span", { class: "hud-hearts" }, "❤️".repeat(Math.max(0, a.herzen)) + "🤍".repeat(MAX_HERZEN - Math.max(0, a.herzen))),
      el("span", { class: "chip" }, `🧑‍🤝‍🧑 Verdächtige: ${c.verdaechtige.length}`),
      el("span", { class: "chip" }, `✖ Ausgeschlossen: ${rausCount}`),
      el("span", { class: "chip" }, `🗂️ Alibi-Checks übrig: ${maxChecks - a.checked.length}`),
      el("button", { class: "tab tool-btn", onclick: () => playIntro(c) }, "🎬 Der Fall"),
      el("button", { class: "tab tool-btn", onclick: () => {
        if (!confirm("Fall wirklich abbrechen? Beim nächsten Mal wird alles neu gemischt.")) return;
        st.active = null; save(st); renderSelect(container);
      } }, "🗂 Fall abgeben"),
    ),
  );

  // ----- Spurentafel (zeigt nur Fakten, keine Wertung) -----
  const spuren = el("section", { class: "panel" }, el("h3", {}, "🧷 Deine Spurentafel"));
  if (!a.found.length && !a.befragt.length && !a.checked.length) {
    spuren.append(el("p", { class: "muted" }, "Noch leer. Durchsuche Orte, befrage Verdächtige und prüfe Alibis — und halte im Notizblock jeder Person fest, was passt."));
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
    const line = el("div", { class: "hint-box" });
    line.innerHTML = `🗣️ <strong>${escapeHtml(v.name)} sagt aus:</strong> „Der Täter? ${m.label}: <strong>${escapeHtml(aus.wert)}</strong> — da bin ich mir sicher!“`;
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
  if (a.befragt.length) {
    spuren.append(el("p", { class: "muted" }, "💡 Vergleiche die Aussagen mit deinen Spuren: Wer etwas behauptet, das deiner Spur <em>widerspricht</em>, hat gelogen — und nur der Täter lügt."));
  }

  // ----- Orte -----
  const orteGrid = el("div", { class: "module-grid" });
  for (const o of c.orte) {
    const inhalt = a.ortInhalt[o.id];
    const visited = a.besucht.includes(o.id);
    let status = o.flavor;
    if (visited) {
      status = inhalt.art === "merkmal" ? `✅ Spur gesichert: ${merkmalById[inhalt.mid].label}`
        : inhalt.art === "bonus" ? "✅ Bonus-Fund: +1 Alibi-Check!"
        : "✅ Komplett durchsucht — nichts Brauchbares.";
    }
    const card = el("button", { class: "module-card" + (visited ? " ort-done" : "") },
      el("span", { class: "module-emoji" }, o.emoji),
      el("strong", {}, o.name),
      el("small", {}, status),
    );
    if (!visited) card.addEventListener("click", () => untersucheOrt(o, inhalt));
    orteGrid.append(card);
  }

  function untersucheOrt(o, inhalt) {
    const sz = SZENEN[c.id]?.orte?.[o.id];
    const content = el("div", {});
    const footer = el("div", { class: "center" });
    const node = overlay(content, footer);

    // --- Akt 1: Ankommen ---
    const akt1 = () => {
      content.replaceChildren();
      if (sz?.bild) { const b = el("div", { class: "fall-bild" }); b.innerHTML = sz.bild; content.append(b); }
      content.append(el("h3", {}, `${o.emoji} ${o.name}`), prosa(sz?.szene || o.flavor));
      const weiter = el("button", { class: "btn btn-big" }, "🔍 Spurensuche beginnen");
      weiter.addEventListener("click", () => { sfx("click"); akt2(); });
      footer.replaceChildren(weiter);
    };

    // --- Akt 2: Suchstellen antippen ---
    const akt2 = () => {
      stopSpeak();
      const spots = (SUCHPUNKTE[c.id]?.[o.id] || [["🔍", "Vordergrund", "Nichts zu sehen."], ["📦", "Hinten", "Nur Staub."], ["🚪", "Seite", "Fehlanzeige."], ["🔦", "Schatten", "Nichts."]]).map((s) => [...s]);
      const treffer = Math.floor(Math.random() * spots.length);
      const durchsucht = new Set();
      let gefunden = false;

      content.replaceChildren();
      if (sz?.bild) { const b = el("div", { class: "fall-bild fall-bild-dim" }); b.innerHTML = sz.bild; content.append(b); }
      content.append(
        el("h3", {}, `${o.emoji} ${o.name}`),
        el("p", { class: "muted" }, "Wo schaust du nach? Tippe die Stellen an — gründliche Detektive durchsuchen alles."),
      );
      const grid = el("div", { class: "such-grid" });
      const ausgabe = el("div", { class: "such-ausgabe" });
      content.append(grid, ausgabe);
      footer.replaceChildren();

      const fund = () => {
        gefunden = true;
        [...grid.children].forEach((b) => (b.disabled = true));
        const intros = SZENEN[c.id]?.fundIntro || ["Und dann siehst du es:"];
        const lead = intros[Math.floor(Math.random() * intros.length)];
        a.besucht.push(o.id);
        const box = el("p", { class: "hint-box" });
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
          box.innerHTML = "🕸️ Du drehst wirklich jeden Stein um — aber hier gibt es keine brauchbare Spur. Auch das ist ein Ergebnis: ein Ort weniger zum Grübeln.";
        }
        persist();
        ausgabe.replaceChildren(
          el("p", { class: "fund-lead" }, inhalt.art === "niete" ? "Du suchst gründlich, hebst alles an, leuchtest in jede Ritze …" : lead),
          box,
        );
        const done = el("button", { class: "btn btn-big" }, "📓 Notiert!");
        done.addEventListener("click", () => { stopSpeak(); node.remove(); renderPlay(container); });
        footer.replaceChildren(done);
      };

      spots.forEach(([emoji, name, leer], idx) => {
        const b = el("button", { class: "such-spot" }, el("span", { class: "such-emoji" }, emoji), name);
        b.addEventListener("click", () => {
          if (gefunden || durchsucht.has(idx)) return;
          if (idx === treffer) { fund(); return; }
          durchsucht.add(idx);
          b.classList.add("leer");
          b.disabled = true;
          sfx("click");
          ausgabe.replaceChildren(el("p", { class: "such-leer" }, `${emoji} ${leer}`));
        });
        grid.append(b);
      });
    };

    akt1();
  }

  // ----- Verdächtige -----
  const suspGrid = el("div", { class: "module-grid" });
  for (const v of c.verdaechtige) {
    const n = note(v.id);
    const raus = istRaus(v);
    const markiert = Object.keys(n.merkmale).length || n.aussage;
    let zusatz = v.rolle;
    if (a.entlastet.includes(v.id)) zusatz = "Entlastet — Alibi hält.";
    else if (n.ausgeschlossen) zusatz = "Von dir ausgeschlossen.";
    else if (markiert) zusatz = "📓 Du hast Notizen gemacht.";
    suspGrid.append(
      el("button", { class: "module-card" + (raus ? " ort-done" : ""), onclick: () => showSteckbrief(v) },
        el("span", { class: "module-emoji" }, v.emoji),
        el("strong", {}, v.name + (raus ? " ✖" : markiert ? " 📓" : "")),
        el("small", {}, zusatz),
      ),
    );
  }

  function showSteckbrief(v) {
    const n = note(v.id);
    const raus = istRaus(v);
    const checksLeft = maxChecks - a.checked.length;
    const body = el("div", {});

    body.append(el("p", { class: "muted" }, v.rolle));

    // Notizblock: pro Merkmal selbst abhaken
    body.append(el("h4", {}, "📓 Dein Notizblock"));
    const liste = el("div", { class: "notiz-liste" });
    for (const m of c.merkmale) {
      const gefunden = a.found.includes(m.id);
      const row = el("div", { class: "notiz-row" });
      const info = el("div", { class: "notiz-info" },
        el("strong", {}, `${m.emoji} ${m.label}: `),
        el("span", {}, v.werte[m.id]),
        gefunden ? el("small", { class: "notiz-spur" }, ` · deine Spur: „${culprit.werte[m.id]}“`) : el("small", { class: "muted" }, " · Spur noch nicht gefunden"),
      );
      const state = n.merkmale[m.id] || "?";
      const chip = el("button", { class: "notiz-chip notiz-" + (state === "ja" ? "ja" : state === "nein" ? "nein" : "neutral") },
        state === "ja" ? "✅ passt" : state === "nein" ? "❌ passt nicht" : "❔ offen");
      chip.addEventListener("click", () => {
        const next = state === "?" || !n.merkmale[m.id] ? "ja" : n.merkmale[m.id] === "ja" ? "nein" : null;
        if (next) n.merkmale[m.id] = next; else delete n.merkmale[m.id];
        persist();
        showSteckbrief(v); // neu zeichnen
      });
      row.append(info, chip);
      liste.append(row);
    }
    body.append(liste);

    // Aussage (nur wenn befragt) — Spieler bewertet selbst
    body.append(el("h4", {}, "🗣️ Aussage"));
    if (a.befragt.includes(v.id)) {
      const aus = a.aussagen[v.id];
      const m = merkmalById[aus.mid];
      body.append(el("p", {}, `„Der Täter? ${m.label}: ${aus.wert} — ganz sicher!“`));
      const aState = n.aussage;
      const aChip = el("button", { class: "notiz-chip notiz-" + (aState === "glaube" ? "ja" : aState === "luege" ? "nein" : "neutral") },
        aState === "glaube" ? "✅ glaube ich" : aState === "luege" ? "❌ das ist gelogen!" : "❔ noch unklar");
      aChip.addEventListener("click", () => {
        n.aussage = !n.aussage ? "glaube" : n.aussage === "glaube" ? "luege" : null;
        persist();
        showSteckbrief(v);
      });
      body.append(aChip);
      if (a.found.includes(aus.mid)) {
        body.append(el("small", { class: "muted" }, ` Tipp: Du hast die Spur „${m.label}“ — passt die Aussage dazu?`));
      }
    } else {
      body.append(el("p", { class: "muted" }, "Noch nicht befragt. Befrage die Person, um ihre Aussage zu hören."));
    }

    // Aktionen
    const buttons = el("div", { class: "tab-bar" });
    if (!a.befragt.includes(v.id)) {
      buttons.append(el("button", { class: "btn", onclick: (e) => {
        a.befragt.push(v.id); persist(); sfx("click");
        e.target.closest(".overlay").remove();
        const aus = a.aussagen[v.id]; const m = merkmalById[aus.mid];
        overlay(
          el("h3", {}, `🗣️ Befragung: ${v.name}`),
          el("p", { class: "muted" }, v.smalltalk),
          el("p", {}, `„Den Täter habe ich kurz gesehen! ${m.label}: ${aus.wert} — da bin ich mir ganz sicher.“`),
          el("p", { class: "muted" }, "Schreib es dir auf — und vergleiche es selbst mit deinen Spuren. Nur der Täter lügt."),
          el("button", { class: "btn", onclick: (ev) => { ev.target.closest(".overlay").remove(); showSteckbrief(v); } }, "📓 Notiert!"),
        );
      } }, "🗣️ Befragen (kostenlos)"));
    }
    if (!a.entlastet.includes(v.id) && !a.checked.includes(v.id) && checksLeft > 0) {
      buttons.append(el("button", { class: "btn btn-ghost", onclick: (e) => {
        a.checked.push(v.id);
        if (v.id !== a.culprit && !a.entlastet.includes(v.id)) a.entlastet.push(v.id);
        persist(); sfx(v.id === a.culprit ? "win" : "click");
        e.target.closest(".overlay").remove(); renderPlay(container);
      } }, `🗂️ Alibi prüfen (noch ${checksLeft})`));
    } else if (!a.entlastet.includes(v.id) && checksLeft <= 0 && !a.checked.includes(v.id)) {
      buttons.append(el("small", { class: "muted" }, "Keine Alibi-Prüfungen mehr übrig. (Irgendwo liegt ein Bonus-Fund …)"));
    }
    // Manuell aus dem Visier nehmen / wieder verdächtigen
    if (!a.entlastet.includes(v.id)) {
      buttons.append(el("button", { class: "btn btn-ghost", onclick: () => {
        n.ausgeschlossen = !n.ausgeschlossen; persist(); showSteckbrief(v);
      } }, n.ausgeschlossen ? "↩️ Wieder verdächtigen" : "✖ Ausschließen"));
    }
    buttons.append(el("button", { class: "btn btn-danger", onclick: (e) => { e.target.closest(".overlay").remove(); anklagen(v); } }, "⚖️ Anklagen!"));

    overlay(
      el("h3", {}, `${v.emoji} ${v.name}` + (raus ? " ✖" : "")),
      body, buttons,
      el("button", { class: "btn btn-ghost btn-small", onclick: (e) => { e.target.closest(".overlay").remove(); renderPlay(container); } }, "Schließen"),
    );
  }

  function anklagen(v) {
    if (!confirm(`Wirklich ${v.name} anklagen? Eine Fehlanklage kostet ein Herz!`)) return;
    if (v.id === a.culprit) {
      const effort = a.found.length + a.checked.length;
      const stars = a.wrong === 0 ? (effort <= 3 ? 3 : 2) : 1;
      st.records[c.id] = Math.max(st.records[c.id] || 0, stars);
      st.active = null; save(st);
      sfx("fanfare"); confetti();
      const text = el("p", {}); text.innerHTML = escapeHtml(v.gestaendnis);
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
      a.wrong++; a.herzen--;
      if (!a.entlastet.includes(v.id)) a.entlastet.push(v.id);
      sfx("fail");
      if (a.herzen <= 0) {
        st.active = mischeFall(c); save(st);
        overlay(
          el("h3", {}, "🚨 Der Fall wird neu aufgerollt!"),
          el("p", {}, `Drei Fehlanklagen — ${escapeHtml(v.name)} war es schon wieder nicht! Der wahre Täter hat Lunte gerochen, alles zurückgeräumt und NEUE Spuren an NEUEN Orten hinterlassen. Frau Sommer gibt dir eine zweite Chance: komplett frisch gemischt.`),
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
    el("h3", {}, "📍 Orte durchsuchen"),
    orteGrid,
    el("h3", {}, "🧑‍🤝‍🧑 Verdächtige (Steckbrief, Notizblock, Befragung, Alibi & Anklage)"),
    suspGrid,
    el("p", { class: "muted center" }, "💡 Niemand verrät dir den Täter. Sichere Spuren, hör dir die Aussagen an, hake im Notizblock jeder Person ab, was passt — und klage den an, auf den alles zeigt."),
  );

  if (showIntro) playIntro(c);
}
