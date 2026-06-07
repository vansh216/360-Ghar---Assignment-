import { useRef } from "react";

const SUGGESTIONS = [
  { icon: "🏠", label: "2BHK under 80L near school" },
  { icon: "☀️", label: "South-facing 3BHK with pool" },
  { icon: "🐾", label: "Pet friendly with garden" },
  { icon: "🚇", label: "1BHK near metro under 45L" },
];

const SearchBar = ({ onSearch, loading }) => {
  const textareaRef = useRef(null);

  const handleSearch = () => {
    const query = textareaRef.current?.value?.trim();
    if (query && onSearch) onSearch(query);
  };

  const handleSuggestion = (label) => {
    if (textareaRef.current) {
      textareaRef.current.value = label;
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">

      {/* Search Box */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 flex items-end gap-3 mb-4 shadow-md transition-all duration-200 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10">

        {/* Sparkle icon */}
        <span className="text-green-600 text-xl mb-1 flex-shrink-0">✦</span>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={2}
          disabled={loading}
          placeholder='Try: "2BHK in Sector 50 Gurgaon under 80 lakhs, good sunlight, near a school"'
          className="flex-1 border-none outline-none resize-none font-bricolage text-[15px] text-gray-900 placeholder-gray-300 leading-snug bg-transparent min-h-[48px] max-h-[120px] disabled:opacity-50"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex-shrink-0 flex items-center gap-1.5 bg-green-600 hover:bg-green-700 active:scale-95 disabled:bg-green-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search
            </>
          )}
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => handleSuggestion(s.label)}
            disabled={loading}
            className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700 text-gray-500 text-[13px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;