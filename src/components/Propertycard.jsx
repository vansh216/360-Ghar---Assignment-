const PROPERTY_EMOJIS = {
  "Apartment":        "🏢",
  "Builder Floor":    "🏡",
  "Independent Villa":"🏘️",
};

const PropertyCard = ({ property, onClick, isTopMatch }) => {
  const { bhk, area, price, priceLabel, location, type, floor, facing, furnished, amenities, reasons, score } = property;

  return (
    <div
      onClick={() => onClick(property)}
      className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer
                 hover:-translate-y-1 hover:shadow-xl hover:border-green-300
                 transition-all duration-200 group"
    >

      {/* Thumbnail placeholder with emoji */}
      <div className="w-full h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-5xl select-none">
        {PROPERTY_EMOJIS[type] || "🏠"}
      </div>

      {/* Best Match badge */}
      {isTopMatch && (
        <div className="absolute top-3 left-3 bg-green-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          ⭐ Best Match
        </div>
      )}

      {/* Score pill */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
        {score} pts
      </div>

      {/* Card body */}
      <div className="p-4">

        {/* Price */}
        <p className="font-clash font-bold text-green-700 text-xl mb-0.5">₹{priceLabel}</p>

        {/* BHK + area */}
        <p className="font-medium text-gray-900 text-[15px] mb-1">
          {bhk} &bull; {area.toLocaleString()} sq ft &bull; Floor {floor}
        </p>

        {/* Location */}
        <p className="flex items-center gap-1 text-gray-400 text-[13px] mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 flex-shrink-0" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {location}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="bg-gray-100 text-gray-500 text-[11.5px] font-medium px-2.5 py-0.5 rounded-lg">{type}</span>
          <span className="bg-gray-100 text-gray-500 text-[11.5px] font-medium px-2.5 py-0.5 rounded-lg">{facing} facing</span>
          <span className="bg-gray-100 text-gray-500 text-[11.5px] font-medium px-2.5 py-0.5 rounded-lg">{furnished}</span>
        </div>

        {/* Match reasons — the most important part */}
        {reasons && reasons.length > 0 && (
          <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
            <p className="text-[10.5px] font-semibold text-green-600 uppercase tracking-wide mb-1.5">
              Why it matches
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {reasons.map((r, i) => (
                <span key={i} className="text-green-700 text-[12px] flex items-center gap-1">
                  <span className="text-green-400">✓</span> {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Click hint */}
        <p className="text-[11.5px] text-gray-300 mt-2.5 text-right group-hover:text-green-400 transition-colors">
          Click for AI summary →
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;