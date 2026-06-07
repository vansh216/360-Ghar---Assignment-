import { useEffect, useState } from "react";
import { getAISummary } from "../utils/openrouter";



// Skeleton shimmer for AI summary loading
const SummarySkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-3.5 bg-green-100 rounded-lg w-full" />
    <div className="h-3.5 bg-green-100 rounded-lg w-5/6" />
    <div className="h-3.5 bg-green-100 rounded-lg w-4/6" />
  </div>
);

const PropertyModal = ({ property, query, onClose }) => {
  const [summary, setSummary]   = useState("");
  const [loading, setLoading]   = useState(true);

  // Fetch AI summary whenever a new property is opened
  useEffect(() => {
    if (!property) return;
    setSummary("");
    setLoading(true);

    getAISummary(property, query)
      .then((text) => setSummary(text))
      .finally(() => setLoading(false));
  }, [property?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!property) return null;

  const {
    bhk, area, priceLabel, location, type,
    floor, facing, furnished, amenities, reasons,
  } = property;

  return (
    
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        
       {property.img ? (
  <div className="relative w-full h-44 overflow-hidden">
    <img
      src={property.img}
      alt={`${bhk} in ${location}`}
      className="w-full h-44 object-cover"
    />
    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
      <span className="text-white text-[11px] font-semibold">360°</span>
    </div>
  </div>
) : (
  <ThumbnailPlaceholder type={type} bhk={bhk} location={location} />
)}

        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Content */}
        <div className="p-5">

          {/* Price + title */}
          <p className="font-clash font-bold text-green-700 text-2xl mb-0.5">₹{priceLabel}</p>
          <p className="font-clash font-bold text-gray-900 text-lg mb-1">{bhk} {type}</p>
          <p className="flex items-center gap-1 text-gray-400 text-[13px] mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {location}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { val: `${area.toLocaleString()} sq ft`, lbl: "Area" },
              { val: `Floor ${floor}`,                 lbl: "Level" },
              { val: facing,                           lbl: "Facing" },
            ].map((s) => (
              <div key={s.lbl} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="font-clash font-bold text-gray-900 text-[15px]">{s.val}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>

          {/* Furnished tag */}
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{furnished} furnished</span>
            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{type}</span>
          </div>

          {/* Amenities */}
          <div className="mb-5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {amenities.map((a) => (
                <span key={a} className="bg-gray-50 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-lg">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Match reasons */}
          {reasons?.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-5">
              <p className="text-[10.5px] font-semibold text-green-600 uppercase tracking-wide mb-2">Match reasons</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {reasons.map((r, i) => (
                  <span key={i} className="text-green-700 text-[12.5px] flex items-center gap-1">
                    <span className="text-green-400">✓</span> {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Summary — the live LLM call */}
          <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl px-4 py-3.5">
            <p className="text-[10.5px] font-semibold text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span>✦</span> Why this matches you — AI summary
            </p>
            {loading ? <SummarySkeleton /> : (
              <p className="text-green-900 text-[13.5px] leading-relaxed">{summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;