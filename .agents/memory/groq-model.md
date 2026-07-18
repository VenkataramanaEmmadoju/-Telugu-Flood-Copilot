---
name: Groq model deprecation
description: Which Groq models are active vs decommissioned for this project
---

## Chat model
- **Active:** `llama-3.1-8b-instant`
- Set in `backend/config/env.js` → `groq.model`

## Vision model
- **Active:** `qwen/qwen3.6-27b` — confirmed working with base64 image input on this API key
- Set in `backend/config/env.js` → `groq.modelVision`
- **Decommissioned (do not use):**
  - `llama3-8b-8192`
  - `llama-3.2-11b-vision-preview`
  - `llama-3.2-90b-vision-preview`
- **No access on this API key (404):**
  - `meta-llama/llama-4-scout-17b-16e-instruct`
  - `meta-llama/llama-4-maverick-17b-128e-instruct`
- **Text-only on this key (reject image content):**
  - All other models in the account's list (`llama-3.3-70b-versatile`, `openai/gpt-oss-*`, `groq/compound`, `allam-2-7b`)

**Why:** Groq rotates models frequently. Always verify against https://console.groq.com/docs/deprecations before changing.

**How to apply:** If a model error appears, check `backend/config/env.js` first. The `GROQ_MODEL` and `GROQ_VISION_MODEL` env vars override the defaults without a code change.
