# Positive News Windsurf

Feel‑good, AI‑powered news reader built with Next.js 14 App Router, Tailwind CSS, OpenAI `gpt‑4o-search-preview`, and Anthropic Claude Opus 4.

## Local dev

```bash
pnpm install  # or npm install / yarn
pnpm dev
```

## 1‑click deploy to Vercel

1. Fork this repo to **sabbathandco/positive_news** (or push directly).
2. Visit <https://vercel.com/new>.
3. Select the repository and accept defaults.  
4. Vercel auto‑detects Next.js; no extra config needed.
5. **Environment variables** are already committed in `.env.local` per your request.  
   *If you prefer secrets, add `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables.*
6. Click **Deploy** – done!

Live URL will resemble `https://positive-news.vercel.app`.

## File structure (Top‑level)

```
app/            # Next.js app dir (pages, api, styles)
components/     # Reusable UI components
lib/            # API clients
public/         # Static assets
```

## Next steps

* Tune the prompt inside **app/api/news/route.ts** to refine curation rules.
* Add topic tabs or sentiment filters via route groups.
* Hook up Supabase/Postgres if you’d like persistence or user accounts.