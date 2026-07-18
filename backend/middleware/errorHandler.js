"use strict";
const { isDev } = require("../config/env");
const { isAiProviderError } = require("../utils/aiError");

/**
 * Centralised error-handling middleware.
 * Must be registered last (after all routes).
 *
 * - Always logs the real error server-side.
 * - Never exposes raw AI provider details (model names, Groq HTTP codes,
 *   stack traces) to the client in production.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;

  // Full detail stays on the server
  console.error(`[error] ${req.method} ${req.path} → ${status}: ${err.message}`);
  if (isDev && err.stack) console.error(err.stack);

  // AI provider errors: never leak model names, HTTP codes, or provider details
  if (!isDev && isAiProviderError(err)) {
    return res.status(503).json({
      success: false,
      error: { message: "AI service is temporarily unavailable. Please try again." },
    });
  }

  // Generic errors: expose message only in dev
  const message = isDev
    ? (err.message || "Internal Server Error")
    : "Something went wrong. Please try again.";

  res.status(status >= 400 && status < 600 ? status : 500).json({
    success: false,
    error: { message },
  });
}

module.exports = errorHandler;
