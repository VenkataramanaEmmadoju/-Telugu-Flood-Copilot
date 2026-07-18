"use strict";
const fs = require("fs");
const path = require("path");
const { visionCompletion } = require("../services/groqService");
const { ok, fail } = require("../utils/respond");
const { FRIENDLY, isAiProviderError, aiHttpStatus } = require("../utils/aiError");
const logger = require("../utils/logger");

const VISION_PROMPT = `You are a flood emergency image analysis system.

Analyze the uploaded flood image.

Return ONLY valid JSON.

Do NOT explain your reasoning.

Do NOT include markdown.

Do NOT include code fences.

Do NOT include <think> tags.

Do NOT include any text outside the JSON object.

The JSON must follow this exact structure:
{
  "severity": "Minor|Moderate|Severe|Critical",
  "waterLevel": "Ankle deep|Knee deep|Waist deep|Chest deep|Above chest|Vehicle level|Unknown",
  "immediateRisks": ["risk 1", "risk 2", "risk 3"],
  "recommendedActions": ["action 1", "action 2", "action 3", "action 4"]
}

Rules:
- severity must be exactly one of: Minor, Moderate, Severe, Critical — never Unknown
- waterLevel must use the human-readable values above; use Unknown only if truly impossible to estimate
- immediateRisks must contain 3 to 5 short bullet points describing specific visible dangers
- recommendedActions must contain 4 to 6 short actionable instructions for people in the flood
- Do not add any fields beyond the four listed above`;

async function postImage(req, res, next) {
  let filePath;
  try {
    if (!req.file) return fail(res, "No image file uploaded.", 400);

    filePath = req.file.path;
    const mimeType = req.file.mimetype;

    logger.info("[image] Analysing uploaded image", { filename: req.file.filename, mimeType });

    const imageBase64 = fs.readFileSync(filePath).toString("base64");

    const rawResponse = await visionCompletion(imageBase64, mimeType, VISION_PROMPT);

    const FALLBACK_ANALYSIS = {
      severity: "Moderate",
      waterLevel: "Unknown",
      immediateRisks: ["Flood hazard detected"],
      recommendedActions: ["Move to higher ground.", "Contact emergency services."],
    };

    // Strip any <think>...</think> blocks the model may have emitted
    const cleaned = rawResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // Parse JSON from the model response
    let analysis;
    try {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON object found");
      const parsed = JSON.parse(jsonMatch[0]);
      // Validate required fields; fall back if any are missing or malformed
      const validSeverities = ["minor", "moderate", "severe", "critical"];
      if (
        !parsed.severity ||
        !validSeverities.includes(parsed.severity.toLowerCase()) ||
        !Array.isArray(parsed.immediateRisks) ||
        !Array.isArray(parsed.recommendedActions)
      ) {
        throw new Error("Response missing required fields");
      }
      // Normalise severity capitalisation
      parsed.severity =
        parsed.severity.charAt(0).toUpperCase() + parsed.severity.slice(1).toLowerCase();
      analysis = parsed;
    } catch {
      logger.warn("[image] JSON parse failed or schema invalid — using fallback analysis");
      analysis = FALLBACK_ANALYSIS;
    }

    ok(res, { analysis, imageId: path.basename(filePath), timestamp: new Date().toISOString() });
  } catch (err) {
    if (isAiProviderError(err)) {
      logger.error(`[image] AI provider error: ${err.status ?? ""} ${err.message}`);
      return fail(res, FRIENDLY.image, aiHttpStatus(err));
    }
    next(err);
  } finally {
    // Always clean up the uploaded file
    if (filePath && fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch { /* ignore cleanup errors */ }
    }
  }
}

module.exports = { postImage };
