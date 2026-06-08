import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const handleNav = (e, id) => {
  e.preventDefault();
  setActive(id);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

   
        <div className="flex items-center gap-2">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
           <img className="rounded-sm" src="favicon.png" alt="logo.." />
          </div>
          <span className="font-clash font-bold text-lg text-gray-900">
            360<span className="text-green-600">Ghar</span>
          </span>
        </div>

     {/* for the Desktop */}
        <div className="hidden md:flex items-center gap-8">
         
          <a href="#features" className={`text-sm font-medium transition-colors ${
  active === "features" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>About</a>
          <a href="#ai-search" className={`text-sm font-medium transition-colors ${
  active === "ai-search" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>AI Search</a>
          <a href="#how-it-works" className={`text-sm font-medium transition-colors ${
  active === "how-it-works" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>how work</a>
        </div>


        <button className="hidden cursor-pointer md:block bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
          <a href="ai-search">Search Property</a>
        </button>


        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

       {/* dropdown for mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4">
          <a href="#features" className={`text-sm font-medium transition-colors ${
  active === "features" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>About</a>
          <a href="#ai-search" className={`text-sm font-medium transition-colors ${
  active === "ai-search" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>AI Search</a>
          <a href="#how-it-works" className={`text-sm font-medium transition-colors ${
  active === "how-it-works" ? "text-green-600 font-semibold" : "text-gray-500 hover:text-gray-900"
}`}>how work</a>
          <button  className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors w-full">
            <a href="ai-search">Search Property</a>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;