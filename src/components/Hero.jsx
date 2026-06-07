import SearchBar from "./SearchBar";

const STATS = [
  { num: "500", suffix: "+", label: "Verified properties" },
  { num: "360", suffix: "°", label: "Virtual tours"       },
  { num: "12",  suffix: "+", label: "Sectors covered"     },
  { num: "98",  suffix: "%", label: "Match accuracy"      },
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

      
          
      </section>
    </>
  );
};

export default Hero;