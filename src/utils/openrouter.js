const API_URL   = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY   = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL     = "openai/gpt-oss-20b:free";
const FALLBACK  = "mistralai/mistral-7b-instruct:free";

//  call the llm
const callLLM = async (messages, maxTokens = 500, model = MODEL) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      "HTTP-Referer":  window.location.origin,
      "X-Title":       "360 Ghar AI Property Search",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!res.ok) {
    // If primary model fails, retry once with fallback
    if (model === MODEL) {
      console.warn("Primary model failed, retrying with fallback...");
      return callLLM(messages, maxTokens, FALLBACK);
    }
    throw new Error(`OpenRouter error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
};


export const parseQuery = async (query) => {
  const messages = [
    {
      role: "system",
      content: `You are a real estate filter parser for Indian properties in Gurgaon, NCR.
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
Output: {"bhk":"3BHK","maxBudget":10000000,"minBudget":null,"location":"Sector 67","sunlight":"high","nearSchool":true,"petFriendly":null,"furnished":null,"keywords":[]}`,
    },
    {
      role: "user",
      content: `Parse this query: "${query}"`,
    },
  ];

  try {
    const raw  = await callLLM(messages, 300);
    // Strip any accidental markdown fences just in case
    let clean = raw.replace(/```json|```/gi, "").trim();

    const jsonMatch = clean.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("No JSON object found in response");
clean = jsonMatch[0];

    return JSON.parse(clean);
  } catch (err) {
    console.error("parseQuery failed:", err);
    // Return empty filters — app will show all properties rather than crash
    return {
      bhk: null, maxBudget: null, minBudget: null,
      location: null, sunlight: null, nearSchool: null,
      petFriendly: null, furnished: null, keywords: [],
    };
  }
};


// create the get summary
export const getAISummary = async (property, query) => {
  const propertyDetails = `
    Type: ${property.bhk} ${property.type}
    Area: ${property.area} sq ft
    Price: ₹${property.priceLabel}
    Location: ${property.location}
    Floor: ${property.floor}
    Facing: ${property.facing}
    Furnished: ${property.furnished}
    Sunlight: ${property.sunlight}
    Near School: ${property.nearSchool ? "Yes" : "No"}
    Pet Friendly: ${property.pet ? "Yes" : "No"}
    Amenities: ${property.amenities.join(", ")}
  `.trim();

  const messages = [
    {
      role: "system",
      content: `You are a helpful and warm real estate assistant for 360 Ghar, a premium property platform in Gurgaon.
Write a 2–3 sentence personalised explanation of why a specific property matches the user's search query.

Rules:
- Be specific — mention actual details like floor number, facing direction, amenity names
- Reference the user's original words or intent directly
- Do NOT use generic phrases like "great value", "perfect choice", "ideal home", "wonderful opportunity"
- Tone should be warm, helpful, and conversational — like a knowledgeable friend
- Maximum 3 sentences. No bullet points. Plain text only.`,
    },
    {
      role: "user",
      content: `User searched for: "${query}"

Property details:
${propertyDetails}

Write the personalised match explanation:`,
    },
  ];

  try {
    return await callLLM(messages, 150);
  } catch (err) {
    console.error("getAISummary failed:", err);
    return "This property closely matches your search — click to explore the 360° tour and get in touch with the owner.";
  }
};