# Telugu Flood Copilot

Offline AI Decision Support for Rural Telangana — a hackathon project that helps citizens communicate faster with 112 and local responders using voice, text, and images, even in low-connectivity environments.

## Architecture

| Layer    | Stack                                                       | Port |
|----------|-------------------------------------------------------------|------|
| Frontend | React 19, TanStack Start (SSR), Tailwind CSS v4, shadcn/ui  | 5000 |
| Backend  | Express.js, Groq SDK (Llama 3), multer, helmet, morgan      | 8000 |

The frontend Vite dev server proxies `/api/*` requests to the backend on port 8000, so frontend code can call `/api/...` with no CORS issues in development.

## Workflows

- **Frontend** — `bun run dev` → http://localhost:5000 (webview)
- **Backend API** — `cd backend && PORT=8000 node server.js` (console)

## Running locally

```bash
# Frontend
bun install
bun run dev

# Backend (separate terminal)
cd backend
npm install
cp .env.example .env   # fill in GROQ_API_KEY
PORT=8000 node server.js
```

## Backend API Endpoints

| Method | Path              | Description                              |
|--------|-------------------|------------------------------------------|
| GET    | /api/health       | Service health check                     |
| GET    | /api/tips         | Flood safety tips (filter by category)   |
| GET    | /api/shelters     | Relief shelters (filter by district)     |
| GET    | /api/emergency    | Emergency contact numbers                |
| POST   | /api/chat         | Bilingual AI flood assistant (Te/En)     |
| POST   | /api/voice        | Voice transcript → AI response           |
| POST   | /api/image        | Flood photo → severity analysis          |
| POST   | /api/translate    | Telugu ↔ English ↔ Hindi translation     |
| POST   | /api/sos          | Generate bilingual SOS message           |

## Environment Variables

| Variable       | Where        | Required | Description              |
|----------------|--------------|----------|--------------------------|
| `GROQ_API_KEY` | Replit Secret | ✅      | Powers all AI endpoints  |
| `PORT`         | Workflow cmd  | No       | Backend port (default 5000, 8000 in dev) |

## Project Structure

```
/                        ← Frontend (TanStack Start + Vite)
  src/
    routes/              ← File-based routes (index, report, shelters, alerts…)
    components/          ← Shared UI components + shadcn/ui primitives
    hooks/
    lib/

backend/                 ← Express.js API
  server.js              ← Entry point
  config/                ← env validation, Groq client
  controllers/           ← Request handlers (chat, voice, image, translate, sos…)
  routes/                ← Express routers
  services/groqService.js← Groq chat + vision wrappers
  middleware/            ← error handler, rate limiter, file upload, validation
  data/                  ← Static seed data (shelters, tips, emergency contacts)
  utils/                 ← Logger, response helpers
```

## User Preferences

- Keep existing frontend structure exactly as-is; do not redesign UI
- Backend lives in `/backend` folder
- No artifacts, mockup-sandbox, or separate workspaces
- AI provider: Groq only (not Gemini)
- Frontend API base URL in development: `/api` (proxied to port 8000)
