"use strict";
const { chatCompletion } = require("../services/groqService");
const { ok, fail } = require("../utils/respond");
const { FRIENDLY, isAiProviderError, aiHttpStatus } = require("../utils/aiError");
const logger = require("../utils/logger");

/**
 * Detect language from the transcript using Unicode script ranges.
 * This is deterministic — no LLM guesswork.
 *
 * - Devanagari (U+0900–U+097F) → Hindi
 * - Telugu    (U+0C00–U+0C7F) → Telugu
 * - Everything else (Latin/ASCII) → English
 * - Single word regardless of script → English (safe default)
 */
function detectLanguage(transcript) {
  const words = transcript.trim().split(/\s+/);
  if (words.length <= 1) return "en"; // single word → English default

  let devanagari = 0;
  let telugu = 0;
  let total = 0;

  for (const ch of transcript) {
    if (ch.trim() === "") continue;
    total++;
    const cp = ch.codePointAt(0);
    if (cp >= 0x0900 && cp <= 0x097f) devanagari++;
    else if (cp >= 0x0c00 && cp <= 0x0c7f) telugu++;
  }

  // Require at least 15% of characters in a script to count as that language
  const threshold = total * 0.15;
  if (devanagari >= threshold) return "hi";
  if (telugu >= threshold) return "te";
  return "en";
}

const REPLY_RULES = {
  en: "Reply entirely in English.",
  hi: "Reply entirely in Hindi. Use Devanagari script only (e.g. मैं, पानी, खतरा). Never use romanized Hindi.",
  te: "Reply entirely in Telugu. Use Telugu script only (e.g. నేను, వరదలు, ప్రమాదం). Never use romanized Telugu.",
};

function buildSystemPrompt(detectedLang) {
  return `You are Flood Copilot, an AI voice assistant for flood emergencies.

LANGUAGE RULE — this is mandatory, follow it before anything else:
- ${REPLY_RULES[detectedLang]}
- Never mix languages in the same reply.

Focus on immediate safety: evacuation, shelter locations, emergency contacts (112, 1077, 108).
Preserve all emergency details exactly: location, number of people, water level, urgency, and hazards.
Preserve proper nouns exactly as the user spoke them.
Maximum 3 sentences. Be calm and clear.`;
}

async function postVoice(req, res, next) {
  try {
    const { transcript, language = "auto" } = req.body;

    // If the caller provides an explicit language (not "auto"), trust it.
    // Otherwise detect deterministically from the transcript's Unicode script.
    const detectedLang =
      language && language !== "auto" ? language : detectLanguage(transcript);

    logger.info("[voice] Processing transcript", {
      length: transcript.length,
      clientLang: language,
      detectedLang,
    });

    const systemPrompt = buildSystemPrompt(detectedLang);

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: transcript },
    ];

    const reply = await chatCompletion(messages, { maxTokens: 256, temperature: 0.5 });

    ok(res, { reply, detectedLanguage: detectedLang, timestamp: new Date().toISOString() });
  } catch (err) {
    if (isAiProviderError(err)) {
      logger.error(`[voice] AI provider error: ${err.status ?? ""} ${err.message}`);
      return fail(res, FRIENDLY.voice, aiHttpStatus(err));
    }
    next(err);
  }
}

module.exports = { postVoice };
