// App-Hülle: Hash-Router, Startseite, Eltern-Bereich/Einstellungen, Kostenanzeige.

import { getSettings, setSettings, getTodayCost, getCostHistory } from "./storage.js";
import { el } from "./ui.js";
import * as adventure from "./adventure.js";
import * as hub from "./hub.js";

const app = document.getElementById("app");
const topbarTitle = document.getElementById("topbar-title");
const costBadge = document.getElementById("cost-badge");

document.getElementById("btn-home").addEventListener("click", () => (location.hash = "#/"));
document.getElementById("btn-settings").addEventListener("click", () => (location.hash = "#/settings"));
document.addEventListener("cost-changed", updateCostBadge);

function updateCostBadge() {
  const cost = getTodayCost();
  const { dailyLimitUsd } = getSettings();
  costBadge.textContent = cost > 0 ? `≈ $${cost.toFixed(2)} heute` : "";
  costBadge.classList.toggle("warn", dailyLimitUsd > 0 && cost >= dailyLimitUsd * 0.8);
}
setInterval(updateCostBadge, 5000);

// ---------- Router ----------

function router() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  document.body.classList.remove("theme-adventure", "theme-hub");
  window.scrollTo(0, 0);
  updateCostBadge();

  if (parts[0] === "adventure") {
    topbarTitle.textContent = "Abenteuer-Maschine";
    return adventure.route(app, parts.slice(1));
  }
  if (parts[0] === "hub") {
    topbarTitle.textContent = "Alltagshelfer";
    return hub.route(app, parts.slice(1));
  }
  if (parts[0] === "settings") {
    topbarTitle.textContent = "Eltern-Bereich";
    return renderSettings();
  }
  topbarTitle.textContent = "Familien-Studio";
  renderStart();
}

window.addEventListener("hashchange", router);

// ---------- Startseite ----------

function renderStart() {
  const settings = getSettings();
  const keyHint = !settings.apiKey
    ? el("div", { class: "banner" },
        el("strong", {}, "Fast fertig! "),
        "Damit die App funktioniert, muss einmalig ein Anthropic-API-Key hinterlegt werden. ",
        el("button", { class: "btn btn-small", onclick: () => (location.hash = "#/settings") }, "⚙️ Zum Eltern-Bereich"),
      )
    : null;

  app.replaceChildren(
    el("section", { class: "hero hero-start" },
      el("h2", {}, "Willkommen im Familien-Studio!"),
      el("p", {}, "Zwei Welten, eine App: spannende Abenteuer für Kinder — und praktische Helfer für den Alltag."),
    ),
    keyHint,
    el("div", { class: "world-grid" },
      el("button", { class: "world-card world-adventure", onclick: () => (location.hash = "#/adventure") },
        el("span", { class: "world-emoji" }, "🐉"),
        el("h3", {}, "Abenteuer-Maschine"),
        el("p", {}, "Interaktive Geschichten mit Helden, Herzen, Würfeln und Schatzkarten. Claude ist dein Spielleiter — und malt die Szenen sogar selbst."),
        el("span", { class: "world-cta" }, "Spielen ➤"),
      ),
      el("button", { class: "world-card world-hub", onclick: () => (location.hash = "#/hub") },
        el("span", { class: "world-emoji" }, "🏠"),
        el("h3", {}, "Alltagshelfer"),
        el("p", {}, "Briefe verstehen, Essen planen, Hausaufgaben begleiten, Texte schreiben, Feste organisieren — fünf Helfer für jeden Tag."),
        el("span", { class: "world-cta" }, "Loslegen ➤"),
      ),
    ),
  );
}

// ---------- Eltern-Bereich ----------

function renderSettings() {
  const settings = getSettings();
  const unlocked = !settings.parentPin || sessionStorage.getItem("fs_parent_ok") === "1";

  if (!unlocked) {
    const pinInput = el("input", { class: "input input-pin", type: "password", inputmode: "numeric", maxlength: "6", placeholder: "PIN" });
    const msg = el("p", { class: "error" });
    const check = () => {
      if (pinInput.value === settings.parentPin) {
        sessionStorage.setItem("fs_parent_ok", "1");
        renderSettings();
      } else {
        msg.textContent = "Falsche PIN.";
        pinInput.value = "";
      }
    };
    pinInput.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    app.replaceChildren(
      el("section", { class: "panel panel-narrow" },
        el("h2", {}, "🔒 Eltern-Bereich"),
        el("p", {}, "Dieser Bereich ist mit einer PIN geschützt."),
        pinInput,
        el("button", { class: "btn", onclick: check }, "Öffnen"),
        msg,
      ),
    );
    pinInput.focus();
    return;
  }

  const keyInput = el("input", { class: "input", type: "password", value: settings.apiKey, placeholder: "sk-ant-…", autocomplete: "off" });
  const showKey = el("button", { class: "btn btn-small", type: "button", onclick: () => { keyInput.type = keyInput.type === "password" ? "text" : "password"; } }, "👁");
  const effortSelect = el("select", { class: "input" },
    el("option", { value: "low" }, "Schnell & günstig (low)"),
    el("option", { value: "medium" }, "Ausgewogen (medium) — empfohlen"),
    el("option", { value: "high" }, "Maximal gründlich (high)"),
  );
  effortSelect.value = settings.effort;
  const limitInput = el("input", { class: "input", type: "number", min: "0", step: "0.5", value: settings.dailyLimitUsd });
  const kidNameInput = el("input", { class: "input", value: settings.kidName, placeholder: "Wird im Abenteuer als Heldenname vorgeschlagen" });
  const pinInput = el("input", { class: "input", type: "password", inputmode: "numeric", maxlength: "6", value: settings.parentPin, placeholder: "leer = kein Schutz" });
  const saveMsg = el("p", { class: "success" });

  const history = getCostHistory();
  const days = Object.keys(history).sort().slice(-7);
  const costRows = days.length
    ? days.map((d) => el("div", { class: "cost-row" },
        el("span", {}, new Date(d).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" })),
        el("span", {}, `$${history[d].toFixed(2)}`)))
    : [el("p", { class: "muted" }, "Noch keine Anfragen gestellt.")];

  app.replaceChildren(
    el("section", { class: "panel panel-narrow" },
      el("h2", {}, "⚙️ Eltern-Bereich"),

      el("h3", {}, "Anthropic API-Key"),
      el("p", { class: "muted" }, "Den Key bekommst du unter console.anthropic.com → API Keys. Er wird nur auf diesem Gerät gespeichert und ausschließlich an api.anthropic.com gesendet."),
      el("div", { class: "free-input" }, keyInput, showKey),

      el("h3", {}, "Antwort-Qualität (Effort)"),
      el("p", { class: "muted" }, "Steuert, wie gründlich Claude nachdenkt — und damit Tempo und Kosten."),
      effortSelect,

      el("h3", {}, "Tageslimit (US-Dollar)"),
      el("p", { class: "muted" }, "Bei Erreichen des Limits pausiert die App bis zum nächsten Tag. 0 = kein Limit. Zur Einordnung: Ein Abenteuer-Spielzug kostet meist nur wenige Cent."),
      limitInput,

      el("h3", {}, "Name des Kindes (optional)"),
      kidNameInput,

      el("h3", {}, "Eltern-PIN (optional)"),
      el("p", { class: "muted" }, "Schützt diesen Bereich vor neugierigen Abenteurern. Kein echter Passwortschutz — nur eine Kindersicherung."),
      pinInput,

      el("button", {
        class: "btn btn-big",
        onclick: () => {
          setSettings({
            apiKey: keyInput.value.trim(),
            effort: effortSelect.value,
            dailyLimitUsd: Math.max(0, parseFloat(limitInput.value) || 0),
            kidName: kidNameInput.value.trim(),
            parentPin: pinInput.value.trim(),
          });
          saveMsg.textContent = "✅ Gespeichert!";
          setTimeout(() => (saveMsg.textContent = ""), 2500);
          updateCostBadge();
        },
      }, "Speichern"),
      saveMsg,

      el("h3", {}, "Kosten (geschätzt)"),
      el("p", { class: "muted" }, `Heute: $${getTodayCost().toFixed(2)}`),
      el("div", { class: "cost-history" }, ...costRows),

      el("h3", {}, "Daten"),
      el("p", { class: "muted" }, "Alle Daten (Key, Spielstände, Verläufe, Kosten) liegen nur in diesem Browser."),
      el("button", {
        class: "btn btn-danger",
        onclick: () => {
          if (confirm("Wirklich ALLE Daten löschen? Spielstände, Verläufe und der API-Key gehen verloren.")) {
            localStorage.clear();
            sessionStorage.clear();
            location.hash = "#/";
            location.reload();
          }
        },
      }, "🗑 Alle Daten löschen"),
    ),
  );
}

router();
