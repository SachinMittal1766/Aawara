# Aawara

Weather-aware local discovery for better-timed outings. This MVP uses Next.js App Router, TypeScript, Tailwind, Open-Meteo, and an OpenStreetMap/Nominatim fallback provider. It is intentionally usable without a paid LLM or Google credentials.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The browser will ask for location permission when “Your location” is selected; manual city selection keeps the app usable without permission. Search failures are shown as errors; the search path does not substitute sample attractions.

## Optional providers

Copy `.env.example` to `.env.local`. A Google Places (New) adapter can be added server-side by setting `GOOGLE_MAPS_API_KEY`; keys must never be exposed to the browser. The current fallback uses Nominatim and labels opening hours as unavailable when the provider does not return them.

## Architecture

- `lib/intent.ts`: deterministic English/Hinglish-friendly intent extraction
- `lib/date.ts`: relative-date resolution in a supplied timezone
- `lib/weather.ts`: validated Open-Meteo retrieval
- `lib/places.ts`: OpenStreetMap discovery fallback
- `lib/scoring.ts`: deterministic, explainable recommendation scoring
- `app/api/*`: server-side integration boundary
- Development builds expose a collapsible “Development diagnostics · request provenance” panel after each search. It shows the raw query, request URL, backend destination, provider query/status, raw candidates, geographic rejects, final cards, and source classification. It is removed from production builds.

The UI never claims a venue is open when opening-hours data is missing. Forecast windows are limited to Open-Meteo’s seven-day response, and recommendations explicitly expose source/uncertainty text.
