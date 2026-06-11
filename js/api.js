// Direkter Zugriff auf die Anthropic Messages API aus dem Browser (SSE-Streaming).
// Der API-Key kommt aus den lokalen Einstellungen und verlässt das Gerät nur
// in Richtung api.anthropic.com.

import { getSettings, addUsage, isOverDailyLimit } from "./storage.js";

export const MODEL = "claude-fable-5";
const API_URL = "https://api.anthropic.com/v1/messages";

export class ApiError extends Error {
  constructor(status, message, type) {
    super(message);
    this.status = status;
    this.type = type;
  }
}

export class RefusalError extends Error {
  constructor(category) {
    super("Anfrage wurde abgelehnt");
    this.category = category;
  }
}

export function friendlyError(err) {
  if (err instanceof RefusalError) {
    return "Claude möchte zu dieser Anfrage nichts schreiben. Versuch es bitte mit einer anderen Formulierung. 🙂";
  }
  if (err instanceof ApiError) {
    if (err.status === 401) return "Der API-Key scheint nicht zu stimmen. Bitte im Eltern-Bereich (⚙️) prüfen.";
    if (err.status === 429) return "Gerade zu viele Anfragen — bitte einen Moment warten und nochmal versuchen.";
    if (err.status === 529 || err.status >= 500) return "Der Claude-Dienst ist gerade überlastet. Gleich nochmal versuchen!";
    return `Fehler von der API (${err.status}): ${err.message}`;
  }
  if (err && err.message === "DAILY_LIMIT") {
    return "Das Tageslimit ist erreicht. 💰 Ein Erwachsener kann es im Eltern-Bereich (⚙️) anpassen.";
  }
  if (err && (err.name === "TypeError" || err.message?.includes("fetch"))) {
    return "Keine Verbindung zur API. Ist das Internet an?";
  }
  return "Ups, da ist etwas schiefgegangen: " + (err?.message || err);
}

/**
 * Sendet eine Anfrage an claude-fable-5 (Streaming) und liefert
 * { text, usage, stopReason, stopDetails } zurück.
 *
 * params: { system, messages, maxTokens?, outputFormat?, effortOverride? }
 * handlers: { onText?(delta, fullText), signal? }
 */
export async function sendMessage(params, handlers = {}) {
  const settings = getSettings();
  if (!settings.apiKey) throw new ApiError(401, "Kein API-Key hinterlegt.");
  if (isOverDailyLimit()) throw new Error("DAILY_LIMIT");

  const outputConfig = { effort: params.effortOverride || settings.effort };
  if (params.outputFormat) outputConfig.format = params.outputFormat;

  const body = {
    model: MODEL,
    max_tokens: params.maxTokens || 16000,
    stream: true,
    // Bewährter Standard: letzten cachebaren Block automatisch cachen —
    // bei wachsenden Spiel-Verläufen spart das spürbar Kosten.
    cache_control: { type: "ephemeral" },
    system: params.system,
    messages: params.messages,
    output_config: outputConfig,
    // Hinweis: Auf claude-fable-5 ist Thinking immer aktiv (adaptiv).
    // Der "thinking"-Parameter wird deshalb bewusst weggelassen.
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": settings.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
    signal: handlers.signal,
  });

  if (!res.ok) {
    let msg = res.statusText, type = null;
    try {
      const errBody = await res.json();
      msg = errBody?.error?.message || msg;
      type = errBody?.error?.type || null;
    } catch { /* Body war kein JSON */ }
    throw new ApiError(res.status, msg, type);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let text = "";
  const usage = {};
  let stopReason = null;
  let stopDetails = null;

  const handleEvent = (data) => {
    switch (data.type) {
      case "message_start": {
        const u = data.message?.usage || {};
        usage.input_tokens = u.input_tokens || 0;
        usage.cache_read_input_tokens = u.cache_read_input_tokens || 0;
        usage.cache_creation_input_tokens = u.cache_creation_input_tokens || 0;
        break;
      }
      case "content_block_delta":
        if (data.delta?.type === "text_delta") {
          text += data.delta.text;
          handlers.onText?.(data.delta.text, text);
        }
        break;
      case "message_delta":
        if (data.delta?.stop_reason) stopReason = data.delta.stop_reason;
        if (data.delta?.stop_details) stopDetails = data.delta.stop_details;
        if (data.usage?.output_tokens != null) usage.output_tokens = data.usage.output_tokens;
        break;
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const chunk = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      for (const line of chunk.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload) continue;
        try { handleEvent(JSON.parse(payload)); } catch { /* unvollständige Zeile */ }
      }
    }
  }

  addUsage(usage);

  if (stopReason === "refusal") {
    throw new RefusalError(stopDetails?.category || null);
  }

  return { text, usage, stopReason, stopDetails };
}

/**
 * Bild-Datei → verkleinertes JPEG als Base64-Content-Block.
 * maxEdge klein halten spart Token (Briefe brauchen ~2000px, Zeichnungen ~1024px).
 */
export async function fileToImageBlock(file, maxEdge = 1600) {
  const dataUrl = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  const jpeg = canvas.toDataURL("image/jpeg", 0.85);
  return {
    type: "image",
    source: {
      type: "base64",
      media_type: "image/jpeg",
      data: jpeg.split(",")[1],
    },
  };
}
