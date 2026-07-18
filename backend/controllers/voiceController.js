"use strict";
const { chatCompletion } = require("../services/groqService");
const { ok, fail } = require("../utils/respond");
const { FRIENDLY, isAiProviderError, aiHttpStatus } = require("../utils/aiError");
const logger = require("../utils/logger");

const SYSTEM_PROMPT = `You are Flood Copilot, an AI voice assistant for flood emergencies in Telangana.

First, identify the language used by the user.
Respond ONLY in that same language.
Do not translate unless explicitly requested.
If the user mixes languages, determine the dominant language and respond entirely in that language.
If the language cannot be confidently determined, default to English.
Never mix multiple languages in the same response.

Supported languages: Telugu, English, Hindi.

The user has spoken their message (transcribed to text). Respond clearly and concisely.
Focus on immediate safety: evacuation, shelter locations, emergency contacts (112, 1077, 108).
Preserve all emergency details exactly: location, number of people, water level, urgency, and hazards.
Preserve proper nouns exactly as the user spoke them.
Maximum 3 sentences. Be calm and clear.`;

async function postVoice(req, res, next) {
  try {
    const { transcript, language = "auto" } = req.body;

    logger.info("[voice] Processing transcript", { length: transcript.length, language });

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: transcript },
    ];

    const reply = await chatCompletion(messages, { maxTokens: 256, temperature: 0.5 });

    ok(res, { reply, detectedLanguage: language, timestamp: new Date().toISOString() });
  } catch (err) {
    if (isAiProviderError(err)) {
      logger.error(`[voice] AI provider error: ${err.status ?? ""} ${err.message}`);
      return fail(res, FRIENDLY.voice, aiHttpStatus(err));
    }
    next(err);
  }
}

module.exports = { postVoice };
