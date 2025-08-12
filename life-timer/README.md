## Life Timer – Next.js PWA

A Progressive Web App that shows how long you've been alive and surfaces a random fact from your birth year.

Tech stack
- Next.js App Router (v15), JavaScript
- Tailwind CSS
- Zustand for state
- PWA via next-pwa (Workbox) + manifest + offline page
- IndexedDB caching via idb-keyval

Dev commands
- npm install
- npm run dev (localhost:3000)
- npm run build && npm start (offline test)

Environment variables (server-only)
- GOOGLE_CSE_ID – Programmable Search Engine ID
- GOOGLE_API_KEY – Google API key for Custom Search JSON API
- GEMINI_API_KEY – Gemini API key

Create .env.local:
GOOGLE_CSE_ID=your_cx
GOOGLE_API_KEY=your_key
GEMINI_API_KEY=your_gemini_key

PWA notes
- Service worker is generated to public/ during build by next-pwa (GenerateSW).
- Offline fallback page is at /_offline per next-pwa docs.

Scaling note
- The /api/fact route proxies Google APIs and summarizes with Gemini. For production scale, move this to a small FastAPI backend with caching (Redis/SQLite) as described in the prompt.
