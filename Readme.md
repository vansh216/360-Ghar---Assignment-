# 🏠 360 Ghar — AI Property Search Assistant

> Smart, natural language property search powered by AI — built for the 360 Ghar Software Developer Intern Assignment.

---

## 📌 Project Overview

This is a **React + Vite** frontend-only prototype that lets users describe their ideal property in plain English and get back **filtered, ranked property cards** — powered by an LLM via OpenRouter.

**Example query:**
> *"2BHK in Sector 50 Gurgaon under 80 lakhs, good sunlight, near a school"*

The app parses this into structured filters, matches them against mock property data, and returns ranked results with AI-generated match reasons and personalized property summaries.

---

## 🚀 Live Demo

🎥 **Loom Walkthrough:** [Insert Loom Link Here]  
🔗 **Deployed App:** [Insert Vercel/Netlify Link Here]

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| LLM API | OpenRouter (free tier) |
| LLM Model | `openai/gpt-oss-20b:free` |
| Data | Mock JSON (no backend) |
| Deployment | Vercel |

---

## 📁 Folder Structure

```
360-ghar-property-search/
│
├── public/
│    ├── Property1.jsx 
│    ├── Property2.jsx 
│    ├── Property3.jsx 
│    ├── Property4jsx 
│    ├── Property5.jsx 
│    ├── Property6.jsx 
│    ├── Property7.jsx 
│    ├── Property8.jsx 
│    ├── Property9.jsx 
│    ├── Property10.jsx 
│    └── favicon.png
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Natural language input + search button
│   │   ├── FilterBadges.jsx       # Displays parsed filters as visual badges
│   │   ├── PropertyGrid.jsx       # Responsive grid layout for property cards
│   │   ├── PropertyCard.jsx       # Individual property card with match reasons
│   │   ├── Features.jsx 
│   │   ├── Footer.jsx 
│   │   ├── Hero.jsx 
│   │   ├── HowItWork.jsx
│   │   ├── Navbar.jsx   
│   │   └── PropertyModal.jsx      # Click-to-expand modal with AI explanation
│   │
│   ├── data/
│   │   └── properties.js          # 10 mock properties with realistic Gurgaon data
│   │
│   ├── utils/
│   │   ├── openrouter.js          # All OpenRouter API call functions
│   │   ├── filterProperties.js    # Scoring + ranking logic against mock data
│   │   └── shareUrl.js            # Encode/decode search query in URL (bonus feature)
│   │
│   ├── App.jsx                    # Root component, state management
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Tailwind directives + global styles
│
├── .env.example                   # Template for environment variables
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18 or above
- An OpenRouter API key (free, no credit card needed)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/vansh216/360-Ghar---Assignment-.git
cd 360-GHAR---ASSIGNMENT-
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Open `.env` and add your OpenRouter API key:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx
```

> **How to get a free API key:**
> 1. Go to [openrouter.ai](https://openrouter.ai)
> 2. Sign up (no credit card needed)
> 3. Go to Keys → Create Key
> 4. Copy and paste into your `.env` file

### Step 4 — Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 5 — Build for Production

```bash
npm run build
```

---

## 🤖 LLM Model Choice

**Model used:** `openai/gpt-oss-20b:free`

**Why this model:**
- Free tier on OpenRouter with no rate limit issues for a prototype
- Strong instruction-following ability — essential for structured JSON output
- Better at understanding Indian real estate terminology (BHK, lakhs, crores, sector names) compared to smaller models tested
- Gemma 3 27B showed significantly more consistent JSON formatting than `mistral-7b-instruct:free` in my testing

**Fallback model:** `mistralai/mistral-7b-instruct:free` — used if Gemma hits rate limits

---

## 🧠 Prompt Design Notes

### Query Parsing Prompt (Natural Language → JSON Filters)

**Goal:** Convert a free-form user query into a strict JSON object with defined keys.

**What I tried first (didn't work well):**
- Asking the model to "extract filters" with no output format specified → got prose responses mixed with JSON, inconsistent key names, sometimes returned markdown code blocks
- Using a single-sentence prompt → model added explanations before the JSON, breaking `JSON.parse()`

**What worked:**
- Explicitly stating `"Return ONLY a JSON object. No explanation. No markdown. No backticks."` at the top of the prompt
- Providing the exact JSON schema with field names, types, and `null` as the default
- Adding a concrete example input/output pair so the model has a reference
- Instructing the model to convert Indian currency mentions ("80 lakhs" → `8000000`) so filter math works correctly

**Final prompt structure:**
```
You are a real estate filter parser for Indian properties in Gurgaon, NCR.
Your ONLY job is to output a raw JSON object. Nothing else.
Do NOT write any explanation, heading, markdown, asterisks, backticks, or text of any kind.
Do NOT start with words like "Parsed", "Here", "Output" or any label.
Your entire response must start with { and end with }.

Schema (use null for any field not mentioned):
{
  "bhk":         "1BHK" | "2BHK" | "3BHK" | "4BHK" | null,
  "maxBudget":   number in rupees (convert lakhs × 100000, crores × 10000000) | null,
  "minBudget":   number in rupees | null,
  "location":    "sector name or area name as string" | null,
  "sunlight":    "high" | "medium" | null,
  "nearSchool":  true | false | null,
  "petFriendly": true | false | null,
  "furnished":   "fully" | "semi" | "unfurnished" | null,
  "keywords":    ["array", "of", "any", "other", "preference", "words"]
}

Rules:
- "80 lakhs" → 8000000, "1.2 crore" → 12000000, "45L" → 4500000
- "good sunlight", "bright", "sunny", "south facing" → sunlight: "high"
- "near school", "school nearby", "DPS", "close to school" → nearSchool: true
- "pet friendly", "pets allowed", "have a dog/cat" → petFriendly: true
- "fully furnished", "furnished" → furnished: "fully"
- "semi furnished" → furnished: "semi"
- "unfurnished", "bare" → furnished: "unfurnished"

Example:
Input:  "3BHK in Sector 67 under 1 crore near school good sunlight"
Output: {"bhk":"3BHK","maxBudget":10000000,"minBudget":null,"location":"Sector 67","sunlight":"high","nearSchool":true,"petFriendly":null,"furnished":null,"keywords":[]}
```

### Property Summary Prompt (Click → Personalized Explanation)

**Goal:** You are a helpful and warm real estate assistant for 360 Ghar, a premium property platform in Gurgaon.
Write a 2–3 sentence personalised explanation of why a specific property matches the user's search query.

Rules:
- Be specific — mention actual details like floor number, facing direction, amenity names
- Reference the user's original words or intent directly
- Do NOT use generic phrases like "great value", "perfect choice", "ideal home", "wonderful opportunity"
- Tone should be warm, helpful, and conversational — like a knowledgeable friend
- Maximum 3 sentences. No bullet points. Plain text only.

**Key prompt decisions:**
- Pass both the user's original query AND the full property object as context
- Instruct the model to be specific — mention actual features like floor number, facing direction, amenity names
- Banned generic phrases like "great value" or "perfect choice" to force concrete reasoning
- Kept `max_tokens` at 150 to enforce brevity (2–3 lines, not a paragraph)

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 🔍 Natural language search | Type anything — the AI understands it |
| 🎯 Structured filter parsing | LLM converts query to JSON filters |
| 🏷️ Filter badges | Shows what the AI understood from your query |
| 🃏 Property cards | Ranked by match score with match reason badges |
| 🤖 AI property summary | Live LLM explanation on card click |

### Bonus Feature — Shareable Search URLs
Clicking **"Share Search"** encodes your query into the URL using `encodeURIComponent`. Anyone opening that link will automatically see the same search results. Built using the browser's `URLSearchParams` API — no backend needed.

**Example shareable URL:**
```
https://yourapp.com/?q=2BHK%20in%20Sector%2050%20under%2080%20lakhs%20near%20school
```

---

## 🎯 Scoring & Ranking Logic

Properties are ranked by a weighted match score:

| Filter Match | Points |
|--------------|--------|
| BHK type match | 30 pts |
| Within budget | 25 pts |
| Location match | 20 pts |
| Good sunlight | 10 pts |
| Near school | 10 pts |
| Pet friendly | 8 pts |
| Furnished type | 7 pts |

Properties with score > 0 are shown, sorted highest score first. The top result gets a **"Best Match"** badge.

---

## 🏗️ Architecture Notes

- **All LLM calls are made client-side** from React — no backend, no server
- **API key** is stored in `.env` and accessed via `import.meta.env.VITE_OPENROUTER_API_KEY`
- **State management** is handled with React's `useState` and `useEffect` — no Redux or Zustand needed for this scale
- **No external UI library** — all components are built with Tailwind CSS for full control
- **Error handling** on all API calls — if the LLM fails or returns malformed JSON, the app gracefully falls back without crashing
- **Skeleton loading states** on both the property grid (while parsing query) and the modal (while fetching summary)

---

## 🧪 Example Queries to Try

```
2BHK in Sector 50 Gurgaon under 80 lakhs near schools with sunlight
3BHK with swimming pool and gym under 1.2 crore
pet friendly apartment with garden below 60 lakhs
fully furnished 1BHK near metro under 45 lakhs
4BHK villa with parking and servant quarter
```

---

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "vite": "^5.x",
  "tailwindcss": "^3.x",
}
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key | ✅ Yes |

---

## 👨‍💻 Author

**vANSH KUMAR PATEL**  
Software Developer Intern Applicant  
[vanshkumarp5@gmail.com] | [github.com/vansh216] | [linkedin.com/in/vansh-kumar-patel-bb7752313]

---

## 📄 License

This project was built as part of the 360 Ghar Software Developer Intern technical assignment.