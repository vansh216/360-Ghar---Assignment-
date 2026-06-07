const STEPS = [
  {
    num: "01", icon: "⌨️",
    title: "Describe what you want",
    desc: "Type naturally — mention BHK, budget, location, sunlight, schools, or anything else that matters to you.",
  },
  {
    num: "02", icon: "🤖",
    title: "AI parses your intent",
    desc: "Our LLM extracts structured filters from your query and ranks matching properties by relevance score.",
  },
  {
    num: "03", icon: "🏡",
    title: "Explore your matches",
    desc: "Browse ranked cards with match reasons, then click any property for a personalised AI summary and 360° tour.",
  },
];

const HowItWorks = () => (
  <section className="bg-[#0D1117] py-20 px-5">
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-[2px] uppercase text-green-400 mb-3">
        How it works
      </p>
      <h2 className="font-clash font-bold text-center text-white tracking-tight mb-3"
        style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>
        Three steps to your home
      </h2>
      <p className="text-center text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-12">
        From plain-English query to personalised results in under 5 seconds.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((s) => (
          <div key={s.num} className="p-6">
            <div className="font-clash font-bold text-5xl text-green-900/60 mb-4 leading-none">{s.num}</div>
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
);

export default HowItWorks;