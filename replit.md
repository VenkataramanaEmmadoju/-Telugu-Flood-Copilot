# Flood Copilot

AI-Powered Flood Emergency Assistant with Offline Support for Rural Telangana. Helps citizens communicate with 112 and local responders via voice, text, and photos — even in low-connectivity environments.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TanStack Start (SSR), Tailwind CSS v4, shadcn/ui |
| Backend | Node.js, Express.js, Groq SDK |
| AI models | `llama-3.1-8b-instant` (chat/voice/translate/SOS), `llama-3.2-11b-vision-preview` (image) |
| Package manager | Bun (frontend), npm (backend) |

## Running on Replit

Two workflows run in parallel:

- **Frontend** — `bun run dev` → serves on port 5000 (the preview pane)
- **Backend API** — `cd backend && PORT=8000 node server.js` → API on port 8000

## Required Secrets

| Secret | Description |
|--------|-------------|
| `GROQ_API_KEY` | Groq API key — get one free at https://console.groq.com |

The backend reads this from the environment via `dotenv`. No `.env` file needed on Replit — the secret is injected automatically.

## Key Features

- 🎙 Voice report — record in Telugu/English → AI emergency summary
- 📝 Text report — describe situation → structured summary for 112
- 📸 Photo analysis — upload flood photo → severity + rescue advice
- 🆘 SOS generator — bilingual SOS (English + Telugu) ready to relay
- 🏠 Shelter finder — live shelter list with district/village filters
- 🚨 Flood alerts — IMD, CWC, TSDMA bulletins sorted by severity
- 🌐 Translation — Telugu ↔ English ↔ Hindi via Groq
- 📴 Survival kit — offline emergency contacts, first aid, go-bag checklist

## Project Structure

```
/                   # Frontend (TanStack Start / Vite)
  src/
    routes/         # Page routes
    components/     # UI components
backend/            # Express.js API
  routes/           # API route handlers
  controllers/      # Business logic
  services/         # Groq AI integrations
  config/env.js     # Environment config & validation
```

## User Preferences

- Keep existing project structure and stack — do not restructure or migrate
