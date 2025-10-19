# YouTube Hot Clip (KR / US / EU)

A modern **trending & hot-issue video dashboard** built with **Next.js (App Router)** and **Material UI**.  
Browse **rapidly-rising YouTube clips** across **Korea, the US, and Europe**, filter by **topic tabs** (General / Politics / Economy / Society / Entertainment / Variety / ICT / Coding), and switch between **Light / Dark / Night** themes.

> Header includes a **YouTube icon** + **“YouTube Hot Clip”** title.  
> Inline loading shows a **spinner** next to **“Loading…”** with a **wait cursor** (no blocking modal).

---

## ✨ Features

- **Region selector**: Korea (**KR**), United States (**US**), and a representative **EU bundle** (GB, DE, FR, IT, ES, NL, SE)
- **Topic tabs**: General · Politics (YouTube *News & Politics*) · Economy (keyword filter) · Society (keyword filter) · Entertainment · Variety · **ICT** (keyword filter) · **Coding** (keyword filter)
- **Keyword filter** (e.g., *rates, election, strike, AI, Python* …) applied on video titles
- **3 Themes**: Light / Dark / Night (Night uses cool, softer dark tones)
- **Responsive grid**: thumbnail, channel, upload date, and view count chips
- **Inline loading** UX: circular spinner + text + `cursor: wait`

---

## 🧰 Tech Stack

## 🛠️ Stacks
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![App Router](https://img.shields.io/badge/App%20Router-enabled-blue?style=flat-square)
![Material%20UI](https://img.shields.io/badge/MUI-6.x-007FFF?logo=mui&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-data--fetching-000000?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![YouTube%20Data%20API](https://img.shields.io/badge/YouTube-Data%20API%20v3-FF0000?logo=youtube&logoColor=white)

- **Next.js 15 (App Router)**
- **React 18**
- **Material UI v6** (`@mui/material`, `@mui/icons-material`, `@emotion/*`)
- **TypeScript**
- **SWR** for client-side fetching and cache

---

## 🔑 Environment

Create `.env.local` at the repo root and add a **YouTube Data API v3** key:
```env
YT_API_KEY=YOUR_YOUTUBE_API_KEY
```

- The key is **only used on the server route** (`app/api/trending/route.ts`) and is **not exposed to the browser**.
- For production, consider **API restrictions** (restrict to *YouTube Data API v3*) and, if applicable, server IP restrictions.

---

## 🚀 Getting Started

```bash
npm install   # or: pnpm i / yarn
npm run dev
# http://localhost:3000
```

Production:
```bash
npm run build && npm start
```

---

## 📁 Project Structure

```
app/
  layout.tsx                 # Root layout + ThemeRegistry (MUI Provider, mode persistence)
  page.tsx                   # Main dashboard: toolbar, tabs, filters, grid, inline loader
  api/trending/route.ts      # Server API route (YouTube mostPopular + filters + EU bundle)
  globals.css                # Global styles (grid, toolbar, etc.)
components/
  CategoryTabs.tsx           # Topic tabs (General/Politics/Economy/Society/Entertainment/Variety/ICT/Coding)
  RegionPicker.tsx           # KR / US / EU selector
  ModeSwitcher.tsx           # Light / Dark / Night toggle
  ThemeRegistry.tsx          # MUI theme factory (incl. "night" palette)
  VideoCard.tsx              # Card layout for each video
lib/
  youtube.ts                 # Category mapping, keyword dictionaries, EU region list
next.config.ts               # Remote image patterns for YouTube thumbnails
package.json
tsconfig.json                # includes "@/..." path alias
```

---

## 🧠 Core Components & Logic

### `app/api/trending/route.ts`
- Calls **YouTube Data API v3** `videos?chart=mostPopular&part=snippet,statistics&regionCode=...`.
- **Category mapping**:
  - *Politics* → `videoCategoryId=25 (News & Politics)`
  - *Entertainment/Variety* → `videoCategoryId=24`
  - *Economy / Society / ICT / Coding* → **keyword filters** over the **title**
- **EU bundle** is a union of several countries (GB, DE, FR, IT, ES, NL, SE); results are merged and **de‑duplicated**, with a simple **priority** favoring KR > US > EU for duplicates.
- Returns normalized items:
  ```ts
  {
    items: [{ id, title, channelTitle, publishedAt, thumbnail, viewCount?, region }]
  }
  ```
- Uses **revalidate** on fetch to keep a light cache (tunable).

### `app/page.tsx`
- **Toolbar**: YouTube icon + **YouTube Hot Clip** title, **RegionPicker**, **ModeSwitcher**
- **CategoryTabs** + **keyword filter** field + **Refresh** button
- **SWR** drives data; while loading, shows **CircularProgress + “Loading…”** with a **wait cursor**
- Responsive **grid** of `VideoCard` components

### `components/ThemeRegistry.tsx`
- Provides a shared **MUI theme** with **Light/Dark/Night** modes
- Persists the mode in **localStorage**
- *Night* mode uses a cooler dark background with tuned primary/secondary hues

### `lib/youtube.ts`
- **CATEGORY_MAP**: maps tabs to YouTube category IDs or keyword mode
- **KEYWORDS**: dictionaries for Economy/Society/ICT/Coding
- **pickEuropeRegions()**: returns country list for the EU bundle

---

## 🔧 Customization

- **Keywords**: refine dictionaries in `lib/youtube.ts` (e.g., add industry or language-specific terms)
- **EU bundle**: adjust returned countries in `pickEuropeRegions()`
- **Theme defaults**: change initial mode in `ThemeRegistry.tsx`
- **Card fields**: include more statistics (likes/comments) by expanding `part` + quota budget

---

## 🧩 Changelog (this build)

1. **Branding**
   - Project renamed to **YouTube Hot Clip**; header now shows the **YouTube icon** before the title.
2. **Loading UX**
   - Inline spinner + `"Loading..."` text, with `cursor: wait` while fetching.
3. **New tabs**
   - Added **ICT** and **Coding** topic tabs (keyword-driven filters).
4. **EU results**
   - Aggregates GB/DE/FR/IT/ES/NL/SE and de-duplicates videos with region priority.

---

## ❓ Troubleshooting

- **No results & console shows `Missing YT_API_KEY`**  
  Add `.env.local` and restart the dev server.
- **Quota exhausted**  
  YouTube Data API v3 has daily quota. Introduce server-side caching or store snapshots.
- **`Images not allowed` for thumbnails**  
  Ensure `next.config.ts` includes `i.ytimg.com`/`img.youtube.com` in `images.remotePatterns`.
- **`Module not found: @/...`**  
  Check `tsconfig.json` includes:  
  ```json
  { "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
  ```

---

## 🔗 Data Source

- **YouTube Data API v3** — public developer API with daily quota (API key required)

---

## 📜 License

Demo / sample use. Replace with your project’s license as needed.
