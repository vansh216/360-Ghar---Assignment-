const LINKS = [
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
  { label: "Contact",  href: "#" },
  { label: "GitHub",   href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#1A2230] border-t border-white/5 px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Logo + tagline */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span className="font-clash font-bold text-white text-sm">
          360<span className="text-green-500">Ghar</span>
        </span>
        <span className="text-gray-500 text-xs hidden sm:inline">
          — India's AI & VR Real Estate Platform
        </span>
      </div>

      {/* Nav links */}
      <div className="flex gap-5">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-gray-500 hover:text-green-400 text-xs transition-colors duration-150"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-gray-600 text-xs sm:hidden">
        © {new Date().getFullYear()} 360Ghar. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;