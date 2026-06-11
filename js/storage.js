// Lokale Persistenz — alles bleibt in localStorage auf dem Gerät.

const ROOT_KEY = "familienstudio_v2";

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

const DEFAULT_SETTINGS = { kidName: "" };

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...(loadRoot().settings || {}) };
}

export function setSettings(patch) {
  const root = loadRoot();
  root.settings = { ...getSettings(), ...patch };
  saveRoot(root);
  return root.settings;
}

// ---------- Abenteuer-Spielstände ----------

export function listSaves() {
  return (loadRoot().saves || []).map((s) => ({ ...s }));
}

export function getSave(id) {
  return (loadRoot().saves || []).find((s) => s.id === id) || null;
}

export function putSave(save) {
  const root = loadRoot();
  root.saves = root.saves || [];
  save.updatedAt = Date.now();
  const idx = root.saves.findIndex((s) => s.id === save.id);
  if (idx >= 0) root.saves[idx] = save;
  else root.saves.unshift(save);
  if (root.saves.length > 20) root.saves = root.saves.slice(0, 20);
  saveRoot(root);
  return save;
}

export function deleteSave(id) {
  const root = loadRoot();
  root.saves = (root.saves || []).filter((s) => s.id !== id);
  saveRoot(root);
}

// ---------- Modul-Zustände (Checklisten, Taschengeld, Bestenlisten, Wochenplan …) ----------

export function getModuleState(moduleId, fallback = null) {
  const v = (loadRoot().modules || {})[moduleId];
  return v === undefined ? fallback : v;
}

export function setModuleState(moduleId, state) {
  const root = loadRoot();
  root.modules = root.modules || {};
  root.modules[moduleId] = state;
  saveRoot(root);
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function wipeAll() {
  localStorage.removeItem(ROOT_KEY);
  localStorage.removeItem("familienstudio_v1"); // alte Version aufräumen
}
