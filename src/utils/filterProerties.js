// ─── Filter & Ranking Utility ─────────────────────────────────────────────────
// Takes the parsed filters from OpenRouter and scores every property.
// Returns only matched properties sorted by score (highest first).
//
// Scoring weights (must add reasoning for each in README prompt notes):
//   BHK match      → 30 pts  (most explicit user requirement)
//   Budget match   → 25 pts  (hard constraint for most buyers)
//   Location match → 20 pts  (second most important filter)
//   Sunlight       → 10 pts  (lifestyle preference)
//   Near school    → 10 pts  (family requirement)
//   Pet friendly   →  8 pts  (specific need)
//   Furnished type →  7 pts  (nice to have)
// ─────────────────────────────────────────────────────────────────────────────

const scoreProperty = (property, filters) => {
  let score   = 0;
  let reasons = [];

  // ── BHK type ──────────────────────────────────────────────────────────────
  if (filters.bhk) {
    if (property.bhk === filters.bhk) {
      score += 30;
      reasons.push("BHK type matches");
    }
  }

  // ── Budget ────────────────────────────────────────────────────────────────
  if (filters.maxBudget) {
    if (property.price <= filters.maxBudget) {
      score += 25;
      reasons.push("Within your budget");
    }
  }

  if (filters.minBudget) {
    if (property.price >= filters.minBudget) {
      score += 5;
    }
  }

  // ── Location ─────────────────────────────────────────────────────────────
  if (filters.location) {
    const filterLoc   = filters.location.toLowerCase();
    const propertyLoc = property.location.toLowerCase();

    if (propertyLoc.includes(filterLoc)) {
      // Exact sector match
      score += 20;
      reasons.push("Exact location match");
    } else if (
      filterLoc.includes("gurgaon") ||
      filterLoc.includes("gurugram") ||
      filterLoc.includes("ncr")
    ) {
      // Broad city match — partial credit
      score += 8;
    }
  }

  // ── Sunlight ──────────────────────────────────────────────────────────────
  if (filters.sunlight === "high") {
    if (property.sunlight === "high") {
      score += 10;
      reasons.push("Good natural sunlight");
    }
  }

  // ── Near school ───────────────────────────────────────────────────────────
  if (filters.nearSchool === true) {
    if (property.nearSchool) {
      score += 10;
      reasons.push("Near a school");
    }
  }

  // ── Pet friendly ──────────────────────────────────────────────────────────
  if (filters.petFriendly === true) {
    if (property.pet) {
      score += 8;
      reasons.push("Pet friendly");
    }
  }

  // ── Furnished type ────────────────────────────────────────────────────────
  if (filters.furnished) {
    if (property.furnished === filters.furnished) {
      score += 7;
      reasons.push(`${capitalize(filters.furnished)} furnished`);
    }
  }

  // ── Keyword matching ──────────────────────────────────────────────────────
  // Extra bonus points for amenity/keyword matches from the keywords[] array
  if (filters.keywords && filters.keywords.length > 0) {
    const amenityStr = property.amenities.join(" ").toLowerCase();
    const typeStr    = property.type.toLowerCase();

    filters.keywords.forEach((kw) => {
      const keyword = kw.toLowerCase();
      if (amenityStr.includes(keyword) || typeStr.includes(keyword)) {
        score += 3;
        reasons.push(`Has ${kw}`);
      }
    });
  }

  return { score, reasons };
};

// ─── Main filter function ─────────────────────────────────────────────────────
export const filterProperties = (properties, filters) => {
  // If no meaningful filters parsed, return all properties unscored
  const hasFilters = Object.values(filters).some(
    (v) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
  );

  if (!hasFilters) return properties.map((p) => ({ ...p, score: 0, reasons: [] }));

  return properties
    .map((property) => {
      const { score, reasons } = scoreProperty(property, filters);
      return { ...property, score, reasons };
    })
    .filter((p) => p.score > 0)          // remove zero-score properties
    .sort((a, b) => b.score - a.score);  // highest score first
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);