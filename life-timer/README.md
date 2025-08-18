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

Random facts
- Sourced from Wikipedia API (free). The app rotates the selected fact daily for your birth year.

PWA notes
- Service worker is generated to public/ during build by next-pwa (GenerateSW).
- Offline fallback page is at /_offline per next-pwa docs.

Scaling note
- The /api/fact route uses Wikipedia and requires no secrets. Consider adding server-side caching (e.g., Redis) if traffic grows.

## Docker

Development (hot reload):

```
docker compose up
```

Production (optimized image, next start):

```
docker compose -f docker-compose.prod.yml up -d --build
```

No environment variables are required for facts.

Stop:

```
docker compose -f docker-compose.prod.yml down
```

## Persistent chat/decision history

To resume context on any device, keep an up-to-date log at `life-timer/COPILOT_NOTES.md`.

In a new chat, say: “Please read life-timer/COPILOT_NOTES.md and continue from the Open tasks section.”

Automation:
- Commits automatically append a dated entry (subject + changed files) to the notes.
- To add a manual entry:
	- npm run notes:append -- --summary "Short change" --files "path/a, path/b" --notes "optional extra context"

## New pages
- Age selection: /age
- Device selection: /device

