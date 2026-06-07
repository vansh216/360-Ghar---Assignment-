// Badge color variants
const VARIANTS = {
  green: "bg-green-50 border-green-200 text-green-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  blue:  "bg-blue-50  border-blue-200  text-blue-700",
  gray:  "bg-gray-100 border-gray-200  text-gray-600",
};

const Badge = ({ label, variant = "green", icon }) => (
  <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium ${VARIANTS[variant]}`}>
    {icon && <span>{icon}</span>}
    {label}
  </span>
);

const FilterBadges = ({ filters }) => {
  if (!filters) return null;

  // Build badge list from filters object
  const badges = [
    filters.bhk        && { label: filters.bhk,                             icon: "🏠", variant: "green" },
    filters.maxBudget  && { label: `Under ₹${(filters.maxBudget / 100000).toFixed(0)} L`, icon: "💰", variant: "green" },
    filters.location   && { label: filters.location,                         icon: "📍", variant: "amber" },
    filters.sunlight === "high" && { label: "Good sunlight",                 icon: "☀️", variant: "amber" },
    filters.nearSchool && { label: "Near school",                            icon: "🏫", variant: "blue"  },
    filters.petFriendly && { label: "Pet friendly",                          icon: "🐾", variant: "blue"  },
    filters.furnished  && { label: `${filters.furnished} furnished`,         icon: "🛋️", variant: "gray"  },
  ].filter(Boolean);

  if (badges.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-5">

      {/* Label */}
      <p className="text-xs text-gray-400 font-medium mb-2.5 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
        </svg>
        AI understood your query as:
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2">
        {badges.map((b, i) => (
          <Badge key={i} label={b.label} icon={b.icon} variant={b.variant} />
        ))}
      </div>
    </div>
  );
};

export default FilterBadges;