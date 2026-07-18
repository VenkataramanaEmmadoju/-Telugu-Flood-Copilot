"use strict";
const { chatCompletion } = require("../services/groqService");
const { ok } = require("../utils/respond");
const { isAiProviderError } = require("../utils/aiError");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

/**
 * Build a complete hardcoded SOS when the AI provider is unavailable.
 * Uses the submitted form data directly — no AI needed.
 */
function buildFallbackSos({ name, location, emergency, peopleAffected, urgency, contactNumber }) {
  const contact = contactNumber || "N/A";
  const englishMessage =
    `🆘 SOS — FLOOD EMERGENCY\n` +
    `Name: ${name}\n` +
    `Location: ${location}\n` +
    `Situation: ${emergency}\n` +
    `People affected: ${peopleAffected}\n` +
    `Urgency: ${urgency.toUpperCase()}\n` +
    `Contact: ${contact}\n` +
    `Please send rescue immediately. Call 112.`;

  const teluguMessage =
    `🆘 అత్యవసర సహాయం కావాలి — వరద అత్యవసరం\n` +
    `పేరు: ${name}\n` +
    `స్థానం: ${location}\n` +
    `పరిస్థితి: ${emergency}\n` +
    `ప్రభావితులు: ${peopleAffected}\n` +
    `అత్యవసరత: ${urgency.toUpperCase()}\n` +
    `సంప్రదింపు: ${contact}\n` +
    `వెంటనే సహాయం పంపండి. 112 కి కాల్ చేయండి.`;

  const smsText =
    `SOS FLOOD: ${name} at ${location}. ${peopleAffected} affected. ${urgency.toUpperCase()}. Call 112. Contact: ${contact}`.slice(0, 160);

  const broadcastMessage =
    `Attention all rescue teams. SOS received from ${name} at ${location}. ` +
    `Flood emergency. ${peopleAffected} people affected. Urgency: ${urgency}. ` +
    `Contact number: ${contact}. Immediate rescue required. Please respond.`;

  return { englishMessage, teluguMessage, smsText, broadcastMessage };
}

async function postSos(req, res, next) {
  const {
    name,
    location,
    emergency,
    peopleAffected = 1,
    urgency = "high",
    contactNumber = "",
  } = req.body;

  logger.info("[sos] Generating SOS message", { name, location, urgency, peopleAffected });

  const prompt = `Generate a bilingual SOS distress message for a flood emergency.

Details:
- Name: ${name}
- Location: ${location}
- Emergency: ${emergency}
- People affected: ${peopleAffected}
- Urgency level: ${urgency}
- Contact number: ${contactNumber || "not provided"}

Create a structured SOS in this JSON format:
{
  "englishMessage": "...",
  "teluguMessage": "...",
  "smsText": "Short SMS under 160 chars for relay to 112",
  "broadcastMessage": "Radio/announcement version"
}

The English and Telugu messages should be clear, professional, and include all details.
The SOS should ask for immediate rescue and include the location prominently.`;

  const messages = [
    {
      role: "system",
      content:
        "You are an emergency communications specialist. Generate accurate, urgent SOS messages for flood victims in Telangana. Always include location, people count, and urgency. Return valid JSON only.",
    },
    { role: "user", content: prompt },
  ];

  try {
    const raw = await chatCompletion(messages, { maxTokens: 768, temperature: 0.3 });

    let sosContent;
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      sosContent = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      sosContent = {};
    }

    // Fallback if model doesn't return proper JSON fields
    const fallback = buildFallbackSos({ name, location, emergency, peopleAffected, urgency, contactNumber });
    if (!sosContent.englishMessage) sosContent.englishMessage = fallback.englishMessage;
    if (!sosContent.teluguMessage)  sosContent.teluguMessage  = fallback.teluguMessage;
    if (!sosContent.smsText)        sosContent.smsText        = fallback.smsText;
    if (!sosContent.broadcastMessage) sosContent.broadcastMessage = fallback.broadcastMessage;

    ok(res, {
      sosId: uuidv4(),
      ...sosContent,
      metadata: {
        name, location, emergency, peopleAffected, urgency, contactNumber,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    if (isAiProviderError(err)) {
      // AI is down — generate a complete hardcoded SOS so the user is never left stranded
      logger.error(`[sos] AI provider error: ${err.status ?? ""} ${err.message}. Using hardcoded fallback.`);
      const sosContent = buildFallbackSos({ name, location, emergency, peopleAffected, urgency, contactNumber });
      return ok(res, {
        sosId: uuidv4(),
        ...sosContent,
        metadata: {
          name, location, emergency, peopleAffected, urgency, contactNumber,
          generatedAt: new Date().toISOString(),
        },
      });
    }
    next(err);
  }
}

module.exports = { postSos };
