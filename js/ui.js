// UI-Helfer: sicheres Markdown- und SVG-Rendering, kleine DOM-Werkzeuge.

let marked = null;
let DOMPurify = null;

const libsReady = (async () => {
  try {
    const [m, d] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js"),
      import("https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs"),
    ]);
    marked = m.marked;
    DOMPurify = d.default;
  } catch (e) {
    console.warn("CDN-Bibliotheken nicht erreichbar — Fallback-Renderer aktiv.", e);
  }
})();

export function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

/** Markdown → sicheres HTML (Fallback: escaped Text mit Zeilenumbrüchen). */
export async function md(text) {
  await libsReady;
  if (marked && DOMPurify) {
    return DOMPurify.sanitize(marked.parse(text ?? ""));
  }
  return escapeHtml(text ?? "").replace(/\n/g, "<br>");
}

/** SVG-String → sicheres SVG-HTML. Ohne Sanitizer wird nichts gerendert. */
export async function safeSvg(svgText) {
  await libsReady;
  if (!svgText || !svgText.trim().startsWith("<svg")) return "";
  if (!DOMPurify) return "";
  return DOMPurify.sanitize(svgText, { USE_PROFILES: { svg: true, svgFilters: true } });
}

/** Kleines createElement mit Klassen/Attributen/Kindern. */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(c.nodeType ? c : document.createTextNode(c));
  }
  return node;
}

/** Lade-Animation („Der Erzähler schreibt…“ / „Claude denkt nach…“). */
export function spinner(label) {
  return el("div", { class: "spinner" },
    el("span", { class: "spinner-dots" }, el("i"), el("i"), el("i")),
    el("span", {}, label || "Claude denkt nach …"),
  );
}

/** Listenpunkte in einem Container abhakbar machen (für Einkaufslisten etc.). */
export function makeChecklists(container) {
  container.querySelectorAll("li").forEach((li) => {
    li.classList.add("checkable");
    li.addEventListener("click", (e) => {
      if (e.target.closest("a, button, input")) return;
      li.classList.toggle("checked");
    });
  });
}

export function scrollToBottom(node) {
  node.scrollTop = node.scrollHeight;
}
