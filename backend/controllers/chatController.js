"use strict";
const { chatCompletion } = require("../services/groqService");
const { ok, fail } = require("../utils/respond");
const { FRIENDLY, isAiProviderError, aiHttpStatus } = require("../utils/aiError");
const logger = require("../utils/logger");

/**
 * Detect language from typed text using Unicode script ranges.
 * Typed text is always in the actual script the user used, so this is
 * 100% reliable — no romanization ambiguity like with voice input.
 *
 * Devanagari: U+0900–U+097F → Hindi
 * Telugu:     U+0C00–U+0C7F → Telugu
 * Anything else (Latin/ASCII) → English
 */
function detectLanguage(text) {
  let devanagari = 0;
  let telugu = 0;
  let total = 0;

  for (const ch of text) {
    if (ch.trim() === "") continue;
    total++;
    const cp = ch.codePointAt(0);
    if (cp >= 0x0900 && cp <= 0x097f) devanagari++;
    else if (cp >= 0x0c00 && cp <= 0x0c7f) telugu++;
  }

  const threshold = total * 0.15;
  if (devanagari >= threshold) return "hi";
  if (telugu >= threshold) return "te";
  return "en";
}

const REPLY_RULE = {
  en: "The user typed in English. Reply entirely in English. Do not use any other language.",
  hi: "The user typed in Hindi (Devanagari script). Reply entirely in Hindi using Devanagari script only (e.g. मैं, पानी, खतरा, मदद). Never use romanized Hindi or any other language.",
  te: "The user typed in Telugu script. Reply entirely in Telugu using Telugu script only (e.g. నేను, వరదలు, ప్రమాదం, సహాయం). Never use romanized Telugu or any other language.",
};

function buildSystemPrompt(lang) {
  return `You are Flood Copilot, an AI emergency assistant for flood situations.

LANGUAGE RULE (mandatory — no exceptions):
${REPLY_RULE[lang]}
Never mix languages in the same reply.

Your role: help people stay safe during floods, find shelters, understand alerts, and contact emergency services.
Keep responses concise (3-5 sentences max) and actionable. Always prioritise safety.
Preserve all emergency details exactly: location, number of people, water level, urgency, hazards, and rescue advice.
Preserve proper nouns exactly as the user wrote them.
Emergency numbers: 112 (emergency), 1077 (flood helpline), 108 (ambulance).
If the situation is life-threatening, always tell the user to call 112 immediately.`;
}

async function postChat(req, res, next) {
  try {
    const { message, history = [] } = req.body;

    const lang = detectLanguage(message);

    logger.info("[chat] Processing request", { messageLength: message.length, lang });

    const messages = [
      { role: "system", content: buildSystemPrompt(lang) },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const reply = await chatCompletion(messages, { maxTokens: 512, temperature: 0.7 });

    ok(res, { reply, timestamp: new Date().toISOString() });
  } catch (err) {
    if (isAiProviderError(err)) {
      logger.error(`[chat] AI provider error: ${err.status ?? ""} ${err.message}`);
      return fail(res, FRIENDLY.chat, aiHttpStatus(err));
    }
    next(err);
  }
}

module.exports = { postChat };
