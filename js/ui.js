// Kleine DOM-Helfer — keine externen Bibliotheken, alles offline.

export function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

/** createElement mit Klassen/Attributen/Events/Kindern. */
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

export function scrollToBottom(node) {
  node.scrollTop = node.scrollHeight;
}

/** Zufälliges Element / gemischte Kopie. */
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Soundeffekte (WebAudio, synthetisch — keine Dateien nötig) ---------- */

let audioCtx = null;
let soundOn = true;

export function setSoundOn(v) { soundOn = v; }
export function isSoundOn() { return soundOn; }

function beep(freq, dur, type = "sine", when = 0, gain = 0.12) {
  const t = audioCtx.currentTime + when;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

export function sfx(name) {
  if (!soundOn) return;
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch { return; }
  if (audioCtx.state === "suspended") audioCtx.resume();
  switch (name) {
    case "click": beep(660, 0.06, "square", 0, 0.05); break;
    case "item": beep(880, 0.1, "triangle"); beep(1318, 0.16, "triangle", 0.09); break;
    case "dice": for (let i = 0; i < 6; i++) beep(180 + Math.random() * 320, 0.04, "square", i * 0.06, 0.05); break;
    case "win": [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.2, "triangle", i * 0.13)); break;
    case "fanfare": [392, 523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 0.25, "triangle", i * 0.14, 0.14)); break;
    case "fail": [392, 311, 262].forEach((f, i) => beep(f, 0.2, "sawtooth", i * 0.16, 0.07)); break;
    case "ouch": beep(150, 0.25, "sawtooth", 0, 0.1); break;
  }
}

/* ---------- Vorlesen (speechSynthesis — offline im Browser) ---------- */

export function canSpeak() {
  return "speechSynthesis" in window;
}

export function speak(text, onend) {
  if (!canSpeak()) return false;
  stopSpeak();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.95;
  const voice = speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith("de"));
  if (voice) u.voice = voice;
  if (onend) u.onend = onend;
  speechSynthesis.speak(u);
  return true;
}

export function stopSpeak() {
  try { speechSynthesis.cancel(); } catch { /* egal */ }
}

/* ---------- Erzähl-Animation: Wörter blenden nacheinander ein ---------- */

export function typewriter(container, html) {
  container.innerHTML = html;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  const spans = [];
  for (const node of textNodes) {
    const parts = node.textContent.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(part); continue; }
      const s = document.createElement("span");
      s.className = "tw";
      s.textContent = part;
      frag.append(s);
      spans.push(s);
    }
    node.replaceWith(frag);
  }
  const delay = Math.min(30, spans.length ? 2400 / spans.length : 0);
  spans.forEach((s, i) => (s.style.animationDelay = `${i * delay}ms`));
  // Klick = Animation überspringen
  container.addEventListener("click", () => spans.forEach((s) => s.classList.add("tw-done")), { once: true });
}

/* ---------- Konfetti 🎉 ---------- */

export function confetti(host = document.body, count = 80) {
  const colors = ["#e2725b", "#f4a83c", "#53c06a", "#53a0e2", "#7a4ec9", "#e2c153", "#e2535b"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = Math.random() * 1.2 + "s";
    c.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
    c.style.width = 6 + Math.random() * 7 + "px";
    c.style.height = 10 + Math.random() * 8 + "px";
    host.append(c);
    setTimeout(() => c.remove(), 5000);
  }
}
