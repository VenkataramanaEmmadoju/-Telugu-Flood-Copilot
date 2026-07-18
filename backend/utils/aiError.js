"use strict";

/**
 * Friendly user-facing messages for AI provider failures.
 * Never expose model names, HTTP codes, or provider details.
 */
const FRIENDLY = {
  chat: "AI assistant is temporarily unavailable. Please try again in a moment.",
  voice: "Voice analysis is temporarily unavailable. Please try again.",
  image: "Unable to analyse the uploaded image right now. Please try again in a few moments.",
  translate: "Translation service is temporarily unavailable. Please try again.",
  sos: null, // SOS uses a hardcoded fallback instead — handled in controller
};

/**
 * Returns true when the error originated from the AI provider (Groq SDK).
 * Groq SDK attaches a numeric `status` to every API error.
 * Network-level errors reaching the provider also qualify.
 */
function isAiProviderError(err) {
  if (!err) return false;
  if (typeof err.status === "number") return true;
  // Network errors when contacting Groq
  if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") return true;
  return false;
}

/**
 * Map an AI provider error to an appropriate HTTP status for the client.
 * Collapse most AI errors to 503 (Service Unavailable).
 * Preserve 429 so clients can surface a rate-limit hint if desired.
 */
function aiHttpStatus(err) {
  if (!err || typeof err.status !== "number") return 503;
  if (err.status === 429) return 429;
  return 503;
}

module.exports = { FRIENDLY, isAiProviderError, aiHttpStatus };
