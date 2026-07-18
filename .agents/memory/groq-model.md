---
name: Groq model deprecation
description: Which Groq models are active vs decommissioned for this project
---

## Chat model
- **Active:** `llama-3.1-8b-instant`
- Set in `backend/config/env.js` → `groq.model`

## Vision model
- **Active:** `meta-llama/llama-4-maverick-17b-128e-instruct`
- Set in `backend/config/env.js` → `groq.modelVision`
- **Decommissioned (do not use):**
  - `llama3-8b-8192`
  - `llama-3.2-11b-vision-preview`
  - `llama-3.2-90b-vision-preview`
- **No access (404 for this API key):**
  - `meta-llama/llama-4-scout-17b-16e-instruct`

**Why:** Groq rotates models frequently. Always verify against https://console.groq.com/docs/deprecations before changing.

**How to apply:** If a model error appears, check `backend/config/env.js` first. The `GROQ_MODEL` and `GROQ_VISION_MODEL` env vars override the defaults without a code change.
