// App-Hülle: Hash-Router, Startseite, Info-/Daten-Seite, Offline-Registrierung.

import { getSettings, setSettings, wipeAll } from "./storage.js";
import { el } from "./ui.js";
import * as adventure from "./adventure.js";
import * as hub from "./hub.js";

const app = document.getElementById("app");
const topbarTitle = document.getElementById("topbar-title");

document.getElementById("btn-home").addEventListener("click", () => (location.hash = "#/"));
document.getElementById("btn-settings").addEventListener("click", () => (location.hash = "#/info"));

// Offline-Fähigkeit: Service Worker registrieren (https oder localhost nötig)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => { /* z. B. file:// — App läuft trotzdem */ });
}

// ---------- Router ----------

function router() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  document.body.classList.remove("theme-adventure", "theme-hub");
  window.scrollTo(0, 0);

  if (parts[0] === "adventure") {
    topbarTitle.textContent = "Abenteuer-Maschine";
    return adventure.route(app, parts.slice(1));
  }
  if (parts[0] === "hub") {
    topbarTitle.textContent = "Alltagshelfer";
    return hub.route(app, parts.slice(1));
  }
  if (parts[0] === "info") {
    topbarTitle.textContent = "Info & Daten";
    return renderInfo();
  }
  topbarTitle.textContent = "Familien-Studio";
  renderStart();
}

window.addEventListener("hashchange", router);

// ---------- Startseite ----------

function renderStart() {
  app.replaceChildren(
    el("section", { class: "hero hero-start" },
      el("h2", {}, "Willkommen im Familien-Studio!"),
      el("p", {}, "Zwei Welten, eine App: spannende Abenteuer für Kinder — und praktische Helfer für den Alltag. Komplett offline, ohne Anmeldung, ohne Kosten."),
    ),
    el("div", { class: "world-grid" },
      el("button", { class: "world-card world-adventure", onclick: () => (location.hash = "#/adventure") },
        el("span", { class: "world-emoji" }, "🐉"),
        el("h3", {}, "Abenteuer-Maschine"),
        el("p", {}, "Interaktive Geschichten mit Herzen, Rucksack, Würfelglück und Rätseln. Jede Entscheidung zählt — und es gibt mehr als einen Weg zum Happy End."),
        el("span", { class: "world-cta" }, "Spielen ➤"),
      ),
      el("button", { class: "world-card world-hub", onclick: () => (location.hash = "#/hub") },
        el("span", { class: "world-emoji" }, "🏠"),
        el("h3", {}, "Alltagshelfer"),
        el("p", {}, "Lern-Trainer, Koch-Pilot mit Wochenplan, Brief-Vorlagen, Checklisten-Planer und Taschengeld-Konto — fünf Helfer für jeden Tag."),
        el("span", { class: "world-cta" }, "Loslegen ➤"),
      ),
    ),
  );
}

// ---------- Info & Daten ----------

function renderInfo() {
  const settings = getSettings();
  const nameInput = el("input", { class: "input", value: settings.kidName, placeholder: "Name (optional)" });
  const saveMsg = el("p", { class: "success" });

  app.replaceChildren(
    el("section", { class: "panel panel-narrow" },
      el("h2", {}, "ℹ️ Info & Daten"),

      el("h3", {}, "100 % offline"),
      el("p", { class: "muted" },
        "Diese App braucht weder Konto noch Internet: Alle Abenteuer, Rezepte, Vorlagen und Übungen sind fest eingebaut. Nach dem ersten Besuch funktioniert sie dank Offline-Speicher sogar ganz ohne Verbindung — und es entstehen niemals Kosten."),

      el("h3", {}, "Deine Daten"),
      el("p", { class: "muted" },
        "Spielstände, Checklisten, Bestenlisten und Taschengeld-Konten liegen ausschließlich in diesem Browser auf diesem Gerät. Nichts wird irgendwohin übertragen."),

      el("h3", {}, "Name fürs Abenteuer (optional)"),
      nameInput,
      el("button", {
        class: "btn", style: "margin-top:8px",
        onclick: () => {
          setSettings({ kidName: nameInput.value.trim() });
          saveMsg.textContent = "✅ Gespeichert!";
          setTimeout(() => (saveMsg.textContent = ""), 2000);
        },
      }, "Speichern"),
      saveMsg,

      el("h3", {}, "Alles zurücksetzen"),
      el("p", { class: "muted" }, "Löscht Spielstände, Listen, Konten und Bestenlisten unwiderruflich."),
      el("button", {
        class: "btn btn-danger",
        onclick: () => {
          if (confirm("Wirklich ALLE Daten löschen? Spielstände, Listen und Taschengeld-Konten gehen verloren.")) {
            wipeAll();
            location.hash = "#/";
            location.reload();
          }
        },
      }, "🗑 Alle Daten löschen"),
    ),
  );
}

router();
