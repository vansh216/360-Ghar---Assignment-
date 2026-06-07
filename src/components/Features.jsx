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
    desc: "Describe your ideal home the way you'd tell a friend — our AI understands context, preferences, and nuance.",
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
    desc: "Walk through every room before you visit. All listings feature verified immersive 360° walkthroughs.",
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
    desc: "Every property is verified by our team. No ghost listings, no outdated prices, no surprises.",
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
    desc: "Every result comes with an AI-generated explanation of why it fits your specific query — not generic tags.",
  },
];

const Features = () => (
  <section className="bg-white border-t border-gray-100 py-20 px-5">
    <div className="max-w-5xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-[2px] uppercase text-green-600 mb-3">
        Why 360 Ghar
      </p>
      <h2 className="font-clash font-bold text-center text-gray-900 tracking-tight mb-3"
        style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>
        Search like you think
      </h2>
      <p className="text-center text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-12">
        No more clicking through endless filters. Just describe your ideal home and let the AI do the work.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f) => (
          <div key={f.title}
            className="bg-[#FAFAF7] border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:-translate-y-0.5 transition-all duration-200">
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
);

export default Features;