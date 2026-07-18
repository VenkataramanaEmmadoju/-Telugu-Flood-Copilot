"use strict";
const { chatCompletion } = require("../services/groqService");
const { ok, fail } = require("../utils/respond");
const { FRIENDLY, isAiProviderError, aiHttpStatus } = require("../utils/aiError");
const logger = require("../utils/logger");

const SYSTEM_PROMPT = `You are Flood Copilot, an AI emergency assistant for flood situations in Telangana, India.

First, identify the language used by the user.
Respond ONLY in that same language.
Do not translate unless explicitly requested.
If the user mixes languages, determine the dominant language and respond entirely in that language.
If the language cannot be confidently determined, default to English.
Never mix multiple languages in the same response.

Supported languages: Telugu, English, Hindi.

Your role: help people stay safe during floods, find shelters, understand alerts, and contact emergency services.
Keep responses concise (3-5 sentences max) and actionable. Always prioritise safety.
Preserve all emergency details exactly: location, number of people, water level, urgency, hazards, and rescue advice.
Preserve proper nouns exactly as the user wrote them.
Emergency numbers: 112 (emergency), 1077 (flood helpline), 108 (ambulance).
If the situation is life-threatening, always tell the user to call 112 immediately.`;

async function postChat(req, res, next) {
  try {
    const { message, history = [] } = req.body;

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    logger.info("[chat] Processing request", { messageLength: message.length });

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
