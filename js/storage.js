// Lokale Persistenz: Einstellungen, Spielstände, Hub-Sitzungen, Kostenzähler.
// Alles bleibt in localStorage auf dem Gerät.

const ROOT_KEY = "familienstudio_v1";

function loadRoot() {
  try {
    return JSON.parse(localStorage.getItem(ROOT_KEY)) || {};
  } catch {
    return {};
  }
}

function saveRoot(data) {
  localStorage.setItem(ROOT_KEY, JSON.stringify(data));
}

// ---------- Einstellungen ----------

const DEFAULT_SETTINGS = {
  apiKey: "",
  effort: "medium",        // low | medium | high
  dailyLimitUsd: 2.0,      // 0 = kein Limit
  parentPin: "",           // leer = kein PIN
  kidName: "",
};

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...(loadRoot().settings || {}) };
}

export function setSettings(patch) {
  const root = loadRoot();
  root.settings = { ...getSettings(), ...patch };
  saveRoot(root);
  return root.settings;
}

// ---------- Kostenzähler (pro Tag, USD, geschätzt) ----------

const PRICE = {
  inputPerM: 10,
  outputPerM: 50,
  cacheReadPerM: 1,
  cacheWritePerM: 12.5,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function addUsage(usage) {
  if (!usage) return;
  const cost =
    ((usage.input_tokens || 0) * PRICE.inputPerM +
      (usage.output_tokens || 0) * PRICE.outputPerM +
      (usage.cache_read_input_tokens || 0) * PRICE.cacheReadPerM +
      (usage.cache_creation_input_tokens || 0) * PRICE.cacheWritePerM) /
    1e6;
  const root = loadRoot();
  root.costs = root.costs || {};
  const key = todayKey();
  root.costs[key] = (root.costs[key] || 0) + cost;
  // Nur die letzten 60 Tage behalten
  for (const k of Object.keys(root.costs)) {
    if (k < new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10)) delete root.costs[k];
  }
  saveRoot(root);
  document.dispatchEvent(new CustomEvent("cost-changed"));
  return cost;
}

export function getTodayCost() {
  return (loadRoot().costs || {})[todayKey()] || 0;
}

export function getCostHistory() {
  return { ...(loadRoot().costs || {}) };
}

export function isOverDailyLimit() {
  const { dailyLimitUsd } = getSettings();
  return dailyLimitUsd > 0 && getTodayCost() >= dailyLimitUsd;
}

// ---------- Abenteuer-Spielstände ----------

export function listSaves() {
  return (loadRoot().saves || []).map((s) => ({
    id: s.id, title: s.title, scenarioId: s.scenarioId, heroName: s.heroName,
    updatedAt: s.updatedAt, turns: s.messages.length,
  }));
}

export function getSave(id) {
  return (loadRoot().saves || []).find((s) => s.id === id) || null;
}

export function putSave(save) {
  const root = loadRoot();
  root.saves = root.saves || [];
  save.updatedAt = Date.now();
  // Verlauf begrenzen, damit localStorage nicht überläuft:
  // die ersten 2 Nachrichten (Heldenerschaffung, ggf. mit Zeichnung) bleiben immer erhalten.
  if (save.messages.length > 80) {
    save.messages = [...save.messages.slice(0, 2), ...save.messages.slice(-60)];
  }
  const idx = root.saves.findIndex((s) => s.id === save.id);
  if (idx >= 0) root.saves[idx] = save;
  else root.saves.unshift(save);
  if (root.saves.length > 12) root.saves = root.saves.slice(0, 12);
  try {
    saveRoot(root);
  } catch {
    // localStorage voll → ältesten fremden Spielstand opfern und erneut versuchen
    root.saves = root.saves.filter((s) => s.id === save.id).concat(
      root.saves.filter((s) => s.id !== save.id).slice(0, 3)
    );
    saveRoot(root);
  }
  return save;
}

export function deleteSave(id) {
  const root = loadRoot();
  root.saves = (root.saves || []).filter((s) => s.id !== id);
  saveRoot(root);
}

// ---------- Hub-Sitzungen (eine pro Modul, damit man weitermachen kann) ----------

export function getHubSession(moduleId) {
  return (loadRoot().hub || {})[moduleId] || null;
}

export function setHubSession(moduleId, session) {
  const root = loadRoot();
  root.hub = root.hub || {};
  if (session && session.messages && session.messages.length > 40) {
    session.messages = session.messages.slice(-30);
  }
  root.hub[moduleId] = session;
  try { saveRoot(root); } catch { /* Sitzung ist verzichtbar */ }
}

export function clearHubSession(moduleId) {
  const root = loadRoot();
  if (root.hub) delete root.hub[moduleId];
  saveRoot(root);
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
