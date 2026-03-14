# 🌿 GreenLife — مستشارك الزراعي الذكي

> **AI-powered agricultural decision support for Moroccan farmers**
> Built in 48 hours at the Ramadan'IA Hackathon · Morocco 2025

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4-orange?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## What is GreenLife?

GreenLife is a full-stack web platform that helps Moroccan small farmers make smarter decisions about what to grow, where, and how. It combines:

- **Scientific crop scoring** based on the FAO GAEZ v4 methodology
- **Real-time environmental data** from weather and soil APIs
- **An AI agricultural advisor** that speaks Moroccan Darija (العامية المغربية)
- **Voice interaction** — speak your question, hear the answer
- **Document analysis** — upload photos or PDFs for AI-powered crop diagnosis

---

## Live Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User (Browser)                             │
│                                                                     │
│   Landing Page → Login/Signup → Dashboard (Interactive Map)         │
│                                      │                             │
│                          ┌───────────┴────────────┐                │
│                          │                        │                │
│                   ┌──────▼──────┐        ┌────────▼──────┐        │
│                   │  Scoring    │        │   AI Chat     │        │
│                   │  Dashboard  │        │   (Darija)    │        │
│                   └──────┬──────┘        └────────┬──────┘        │
└──────────────────────────┼─────────────────────────┼──────────────┘
                           │                         │
          ┌────────────────┼─────────┐   ┌───────────┼──────────────┐
          │                │         │   │           │              │
          ▼                ▼         ▼   ▼           ▼              ▼
    Open-Meteo        SoilGrids   FAO  Claude    ElevenLabs    Supabase
    (Weather)          (Soil pH)  GAEZ Sonnet 4   (TTS/Voice)  (Auth+DB)
    open-meteo.com   isric.org   v4   (AI)       (Omar voice)  (PG)
```

---

## Feature Overview

| Feature | Description |
|---|---|
| 🌾 **Crop Suitability Scoring** | FAO GAEZ v4 model for 9 Moroccan crops, scored in real-time from GPS coordinates |
| 🤖 **AI Advisor in Darija** | Claude Sonnet 4 answers agricultural questions in Moroccan Arabic |
| 🗺️ **Interactive Map** | Leaflet.js map — tap any location in Morocco to get its crop scores |
| 🎙️ **Voice I/O** | Speak questions (ar-MA), hear answers read aloud by an Arabic voice |
| 📷 **Image Analysis** | Upload a photo of your soil or crop for AI diagnosis |
| 📄 **PDF Analysis** | Upload agricultural reports, labels, or documents for AI interpretation |
| ☁️ **Live Weather Data** | Temperature and rainfall from Open-Meteo (no account needed) |
| 🧪 **Live Soil Data** | Soil pH from SoilGrids v2.0 (ISRIC World Soil Database) |
| ⬇️ **Report Export** | Download a .txt crop suitability report for any location |
| 🔐 **Authentication** | Supabase-powered signup/login |

---

## The FAO GAEZ v4 Scoring Model

The scientific core of GreenLife. Each crop's suitability is scored from 0–100% using the **trapezoidal membership function** from FAO's Global Agro-Ecological Zones methodology.

### How it works

For each environmental variable (temperature, pH, rainfall), we compute a partial score using a 4-point trapezoid:

```
Score
  1.0 │         ┌───────────┐
      │        /             \
      │       /               \
  0.0 │──────/                 \──────
      │     a    b         c    d
      │         [Optimal Zone]
```

| Parameter | Meaning |
|-----------|---------|
| `a` | Lower survival threshold (below → score = 0) |
| `b` | Lower optimum threshold (score ramps up from a→b) |
| `c` | Upper optimum threshold (score ramps down from c→d) |
| `d` | Upper survival threshold (above → score = 0) |

### Final crop score

```
Score(crop) = S_temperature × S_pH × S_rainfall × 100%
```

This multiplicative formula means **a single bad factor kills the score** — just like in real agriculture.

### FAO Suitability Classes

```
Score Range    Class      Arabic Label        Color
──────────────────────────────────────────────────────
 80% – 100%    S1         ممتاز  (Excellent)   🟢
 60% –  79%    S2         جيد    (Good)         🟡
 40% –  59%    S3         متوسط  (Moderate)    🟠
  0% –  39%    N          غير مناسب (Unfit)    🔴
```

### Supported Crops & Data Sources

| # | Crop (AR) | Crop (EN) | Source | Calibrated for Morocco |
|---|-----------|-----------|--------|:---:|
| 1 | القمح | Wheat | INRA Maroc + Fellah-Trade | ✅ |
| 2 | الزيتون | Olive | Fellah-Trade + ARDNA | ✅ |
| 3 | الطماطم | Tomato | INRA Maroc + Fellah-Trade | ✅ |
| 4 | البطاطا | Potato | Agrimaroc.ma | ✅ |
| 5 | الخيار | Cucumber | FAO General | ⚠️ |
| 6 | الذرة | Corn | FAO General | ⚠️ |
| 7 | دوار الشمس | Sunflower | FAO General | ⚠️ |
| 8 | النعناع | Mint | FAO General | ⚠️ |
| 9 | البصل | Onion | FAO General | ⚠️ |

> ⚠️ The 5 generic crops use global FAO parameters not yet calibrated for Moroccan microclimates. See the Roadmap.

### Scoring Parameters (Example: Wheat)

```
Variable        a      b      c      d      Unit
─────────────────────────────────────────────────
Temperature     0      5     25     35     °C
pH              5.0    5.5    7.5    8.5   pH units
Rainfall       200    300    800   1000   mm/year
```

---

## Data Sources

| Layer | Provider | Details |
|-------|----------|---------|
| **Weather** | Open-Meteo | 12-month daily temperature mean + precipitation sum |
| **Soil pH** | SoilGrids v2.0 (ISRIC) | phh2o at 0–5cm depth; fallback: 6.5 |
| **AI Advisor** | Anthropic | `claude-sonnet-4-20250514`, max 1024 tokens |
| **Text-to-Speech** | ElevenLabs | Voice: Omar · Model: `eleven_multilingual_v2` |
| **Auth & Database** | Supabase | PostgreSQL with Row-Level Security |
| **Maps** | Leaflet.js + OpenStreetMap | No API key required |

Open-Meteo and SoilGrids are **free and open** — no API key needed.

---

## Project Structure

```
filaha-ma/
├── app/
│   ├── page.tsx                  # Landing page (hero, features, CTA)
│   ├── layout.tsx                # Root layout (RTL, Arabic fonts, metadata)
│   ├── about/page.tsx            # About the solution
│   ├── approach/page.tsx         # Technical methodology & roadmap
│   ├── pricing/page.tsx          # 3-tier pricing
│   ├── team/page.tsx             # Team members
│   ├── contact/page.tsx          # Contact form + research CTA
│   ├── login/page.tsx            # Supabase authentication
│   ├── signup/page.tsx           # Supabase registration
│   ├── dashboard/
│   │   ├── page.tsx              # Map dashboard (select location)
│   │   ├── scoring/page.tsx      # Crop suitability results
│   │   └── chat/page.tsx         # AI advisor chat interface
│   ├── api/
│   │   ├── chat/route.ts         # POST /api/chat — Claude AI endpoint
│   │   └── tts/route.ts          # POST /api/tts — ElevenLabs endpoint
│   └── components/
│       └── Navbar.tsx            # Shared navigation bar
├── lib/
│   ├── scoring.ts                # FAO GAEZ v4 crop scoring model
│   └── supabase.tsx              # Supabase client factory
├── public/
│   └── team/                     # Team member photos
└── package.json
```

---

## API Reference

### `POST /api/chat`

The main AI advisor endpoint. Sends a message to Claude Sonnet 4 and receives a response in Moroccan Darija.

**Request body:**
```json
{
  "message": "شنو أحسن محصول ليا فهاد الوقت؟",
  "context": "الموقع: 33.897°N, -5.554°E",
  "history": [
    { "role": "user", "text": "...", "image": null, "pdf": null },
    { "role": "assistant", "text": "..." }
  ],
  "image": "<base64-encoded-image>",
  "imageType": "image/jpeg",
  "pdf": "<base64-encoded-pdf>"
}
```

**Response:**
```json
{
  "reply": "واش عندك ماء كافي للسقي؟ ..."
}
```

**Behavior:**
- Responds exclusively in Moroccan Darija
- Maintains up to 10 messages of conversation history
- Analyzes uploaded images as soil/crop photos
- Analyzes uploaded PDFs as agricultural documents
- Collects farmer context: land size, irrigation source, soil color, budget

---

### `POST /api/tts`

Converts text to speech using ElevenLabs (Arabic male voice).

**Request body:**
```json
{
  "text": "واش عندك ماء كافي للسقي؟"
}
```

**Response:** Audio stream (`audio/mpeg`) — played directly in the browser.

**Voice config:**
```
Voice:             Omar (IKne3meq5aSn9XLyUdCD)
Model:             eleven_multilingual_v2
Stability:         0.5
Similarity boost:  0.75
Style:             0.3
Speaker boost:     true
```

---

## Scoring Page — URL Parameters

```
/dashboard/scoring?lat=33.897&lon=-5.554
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `lat` | float | `33.897` | Latitude (Morocco: ~27–36°N) |
| `lon` | float | `-5.554` | Longitude (Morocco: ~-13–-1°W) |

The page then:
1. Fetches 12-month weather averages from Open-Meteo
2. Fetches surface soil pH from SoilGrids (fallback: 6.5)
3. Runs the FAO GAEZ v4 model for all 9 crops
4. Ranks results and renders progress bars with factor breakdown
5. Offers a one-click `.txt` report download

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [Anthropic](https://console.anthropic.com) API key
- An [ElevenLabs](https://elevenlabs.io) API key

### Installation

```bash
git clone https://github.com/your-org/greenlife-ma.git
cd greenlife-ma
npm install
```

### Environment Variables

A template is provided at `.env.example`. Copy it and fill in your own values:

```bash
cp .env.example .env.local
```

> **Never commit `.env.local`** — it's already in `.gitignore`.

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | [supabase.com](https://supabase.com) → your project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page, "anon public" key |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `ELEVENLABS_API_KEY` | [elevenlabs.io](https://elevenlabs.io) → Profile → API Keys |

### Run locally

```bash
npm run dev
# → http://localhost:3000
```

### Deploy to Vercel

```bash
vercel --prod
```

Set all four environment variables in **Vercel → Project → Settings → Environment Variables**.

---

## Tech Stack

```
Frontend
├── Next.js 16.1.6     App Router, server components, API routes
├── React 19.2.3
├── TypeScript 5
├── Tailwind CSS 4
└── Leaflet.js 1.9.4   Interactive map + GPS

AI & Voice
├── Anthropic SDK      claude-sonnet-4-20250514 (vision + document)
└── ElevenLabs API     Arabic TTS (eleven_multilingual_v2)

External Data (free, no key)
├── Open-Meteo         Weather (ERA5 reanalysis)
└── SoilGrids v2.0     Soil pH (ISRIC)

Auth & Database
└── Supabase           PostgreSQL, RLS, SSR auth helpers

Browser APIs
├── navigator.geolocation     GPS detection
├── SpeechRecognition (ar-MA) Voice input
├── Web Audio API             TTS playback
└── FileReader API            Image + PDF upload

Deployment
└── Vercel             Auto-deploy from GitHub
```

---

## Pricing Tiers

| Feature | Fellah (Free) | Coopérative | Entreprise |
|---------|:---:|:---:|:---:|
| 9-crop FAO scoring | ✅ | ✅ | ✅ |
| GPS + interactive map | ✅ | ✅ | ✅ |
| AI questions | 10/day | Unlimited | Unlimited |
| Saved locations | 1 | 20 | Unlimited |
| Photo upload analysis | ✅ | ✅ | ✅ |
| PDF report download | ❌ | ✅ | ✅ |
| Crop history | ❌ | ✅ | ✅ |
| Developer API access | ❌ | ❌ | ✅ |
| Custom ML model | ❌ | ❌ | ✅ |
| ERP integration | ❌ | ❌ | ✅ |
| Support | — | Email | 24/7 |

---

## Roadmap

```
Phase 1 — MVP                                              ✅ Done
  └── FAO scoring · AI advisor · voice · map · auth

Phase 2 — Data Enrichment
  └── Moroccan weather station data
      Official soil databases (ONSS)
      Expanded crop library

Phase 3 — Predictive Modeling
  └── Morocco-specific LLM trained on local agricultural data
      LSTM-based seasonal yield prediction
      Field calibration for 5 remaining generic crops

Phase 4 — Institutional Partnerships
  └── Ministry and research institution data connections
      University collaborations
      IoT sensor integration (in-field pH, moisture, temperature)
```

---

## The Team

A multidisciplinary team of Moroccan students, built during the Ramadan'IA Hackathon 2025.

| Name | Contribution |
|------|------|
| **Farah El Ghemary** | Full-stack development · System architecture · Communication |
| **Sohayb Ahrich** | Full-stack development |
| **Mohamed Amine Jaghouti** | Documentation & Demo |
| **Hajar Ech-chebany** | Data research & statistics |
| **Ayoub** | Business model |

---

## Important Notes on Data Accuracy

**FAO model:** The scoring model uses FAO GAEZ v4 parameters — an internationally validated scientific baseline. 5 of 9 crops still use generic global thresholds not calibrated for Moroccan microclimates or local cultivar varieties. Results are a decision-support tool, not a substitute for agronomist advice.

**Weather:** 12-month averages from Open-Meteo ERA5 reanalysis. These are climate norms, not this year's conditions.

**Soil pH:** SoilGrids values are modeled from remote sensing and survey data. Field measurements may differ.

---

## License

Private — Ramadan'IA Hackathon 2025 · GreenLife Morocco

---

*Built with ❤️ in Morocco — لأجل الفلاح المغربي*
