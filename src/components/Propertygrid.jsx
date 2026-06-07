import PropertyCard from "./PropertyCard";

// Skeleton card shown while AI is parsing the query
const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-100 rounded-lg w-1/3" />
      <div className="h-4 bg-gray-100 rounded-lg w-2/3" />
      <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-100 rounded-lg w-20" />
        <div className="h-6 bg-gray-100 rounded-lg w-24" />
      </div>
      <div className="h-14 bg-gray-50 rounded-xl" />
    </div>
  </div>
);

const PropertyGrid = ({ properties, loading, hasSearched, onCardClick }) => {

  // Loading state — show 6 skeleton cards
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  // No search done yet — show nothing
  if (!hasSearched) return null;

  // Search done but no results
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">🏚️</div>
        <h3 className="font-clash font-bold text-gray-900 text-lg mb-2">No properties found</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Try a broader search — remove some filters, adjust your budget, or change the location.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">

      {/* Results header */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-clash font-bold text-gray-900 text-base">
          {properties.length} propert{properties.length === 1 ? "y" : "ies"} found
        </p>
        <p className="text-gray-400 text-xs">Ranked by match score</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={onCardClick}
            isTopMatch={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;