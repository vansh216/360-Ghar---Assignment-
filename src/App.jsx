import { useState, useEffect ,useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import FilterBadges   from "./components/FilterBadges";
import PropertyGrid   from "./components/PropertyGrid";
import PropertyModal  from "./components/Propertymodel";
import Footer from './components/Footer'


import { parseQuery }         from "./utils/openrouter";
import { filterProperties }   from "./utils/filterProerties";
import { encodeQueryToUrl, decodeQueryFromUrl, copyShareableUrl } from "./utils/shareUrl";

import properties from './data/properties';
function App() {
  const [query,            setQuery]            = useState("");
  const [filters,          setFilters]          = useState(null);
  const [results,          setResults]          = useState([]);
  const [loading,          setLoading]          = useState(false);
  const [hasSearched,      setHasSearched]      = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toast,            setToast]            = useState("");
  const resultsRef = useRef(null);


  


  // main search function
   const handleSearch = async (q) => {
    if (!q?.trim()) return;
 
    setQuery(q);
    setLoading(true);
    setHasSearched(true);
    setFilters(null);
    setResults([]);
 
    // Update URL silently 
    encodeQueryToUrl(q);
 
    try {
      // Send query to OpenRouter to get structured back
      const parsedFilters = await parseQuery(q);
      setFilters(parsedFilters);
 
      //  Score and rank properties against parsed filters
      const matched = filterProperties(properties, parsedFilters);
      setResults(matched);

      setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
         }, 100);
    } catch (err) {
      console.error("Search failed:", err);
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // shere search url
   const handleShare = async () => {
    if (!query) return;
    const success = await copyShareableUrl(query);
    if (success) showToast("🔗 Link copied! Share it with anyone.");
  }; 

// toast notification for the copy url
const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };
  
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
    <Navbar/>
    <Hero id="ai-search"  onSearch={handleSearch} loading={loading} />


     {hasSearched && (
        <main  ref={resultsRef} className="max-w-6xl mx-auto px-5 pb-20">
 
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-2">
            
            <FilterBadges filters={filters} />
 
            {results.length > 0 && !loading && (
              <button
                onClick={handleShare}
                className="flex items-center gap-2 self-start sm:self-auto border border-gray-200 hover:border-green-400 hover:text-green-600 text-gray-500 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150 bg-white whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                Share search
              </button>
            )}
          </div>
 
          <PropertyGrid
            properties={results}
            loading={loading}
            hasSearched={hasSearched}
            onCardClick={setSelectedProperty}
          />
        </main>
      )}
       
        <>
         <div id="features"><Features /></div>
    <div id="how-it-works"><HowItWorks /></div>
        </>
      
 
      {/* Always visible */}
      <Footer />
 
      {/* Property modal — mounts only when a card is clicked */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          query={query}
          onClose={() => setSelectedProperty(null)}
        />
      )}
 
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
