import SearchBar from "./SearchBar";

const STATS = [
  { num: "500", suffix: "+", label: "Verified properties" },
  { num: "360", suffix: "°", label: "Virtual tours"       },
  { num: "12",  suffix: "+", label: "Sectors covered"     },
  { num: "98",  suffix: "%", label: "Match accuracy"      },
];

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: "Natural language AI",
    desc:  "Describe your ideal home the way you'd tell a friend — our AI understands context, preferences, and nuance.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
      </svg>
    ),
    title: "360° virtual tours",
    desc:  "Walk through every room before you visit. All listings feature verified immersive 360° walkthroughs.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "Verified listings only",
    desc:  "Every property is verified by our team. No ghost listings, no outdated prices, no surprises.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    ),
    title: "Personalised match reasons",
    desc:  "Every result comes with an AI-generated explanation of why it fits your specific query — not generic tags.",
  },
];

const STEPS = [
  {
    num: "01", icon: "⌨️",
    title: "Describe what you want",
    desc:  "Type naturally — mention BHK, budget, location, sunlight, schools, or anything else that matters to you.",
  },
  {
    num: "02", icon: "🤖",
    title: "AI parses your intent",
    desc:  "Our LLM extracts structured filters from your query and ranks matching properties by relevance score.",
  },
  {
    num: "03", icon: "🏡",
    title: "Explore your matches",
    desc:  "Browse ranked cards with match reasons, then click any property for a personalised AI summary and 360° tour.",
  },
];


const Hero = ({ onSearch, loading }) => {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-5 py-16 overflow-hidden text-center bg-[#FAFAF7]">

        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(29,158,117,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(29,158,117,.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(29,158,117,.12) 0%,transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(93,202,165,.1) 0%,transparent 70%)" }} />

        {/* Live badge */}
        <div className="relative inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-500 mb-7 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          India's first AI + VR real estate platform
        </div>

        {/* Headline */}
        <h1
          className="relative font-clash font-bold text-gray-900 leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.5rem,6vw,4.25rem)", maxWidth: 820 }}
        >
          Find your dream home<br />
          just by{" "}
          <span className="relative inline-block text-green-600">
            describing
            <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-green-500 rounded-full" />
          </span>{" "}it
        </h1>

        {/* Subtitle */}
        <p
          className="relative text-gray-500 leading-relaxed mb-10"
          style={{ fontSize: "clamp(.95rem,2vw,1.1rem)", maxWidth: 500 }}
        >
          No filters, no dropdowns — just type what you want in plain language
          and let our AI find the perfect match in Gurgaon & NCR.
        </p>

        {/* ✅ SearchBar component — fully separated */}
        <div className="relative w-full mb-14">
          <SearchBar onSearch={onSearch} loading={loading} />
        </div>

        {/* Stats row */}
        <div className="relative w-full max-w-2xl border-t border-gray-200 pt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              <div className="text-center">
                <p className="font-clash font-bold text-gray-900 text-2xl">
                  {s.num}<span className="text-green-600">{s.suffix}</span>
                </p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-white border-t border-gray-100 py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-[2px] uppercase text-green-600 mb-3">
            Why 360 Ghar
          </p>
          <h2
            className="font-clash font-bold text-center text-gray-900 tracking-tight mb-3"
            style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}
          >
            Search like you think
          </h2>
          <p className="text-center text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-12">
            No more clicking through endless filters. Just describe your ideal home and let the AI do the work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-[#FAFAF7] border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-clash font-semibold text-gray-900 text-[15px] mb-1.5">{f.title}</h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="bg-[#0D1117] py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-[2px] uppercase text-green-400 mb-3">
            How it works
          </p>
          <h2
            className="font-clash font-bold text-center text-white tracking-tight mb-3"
            style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}
          >
            Three steps to your home
          </h2>
          <p className="text-center text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-12">
            From plain-English query to personalised results in under 5 seconds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="p-6">
                <div className="font-clash font-bold text-5xl text-green-900/60 mb-4 leading-none">
                  {s.num}
                </div>
                <div className="w-10 h-10 bg-green-900/30 rounded-xl flex items-center justify-center mb-4 text-xl">
                  {s.icon}
                </div>
                <h3 className="font-clash font-semibold text-white text-[15px] mb-2">{s.title}</h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;