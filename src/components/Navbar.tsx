// src/components/Navbar.tsx
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { NavLink, useLocation } from "react-router";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi";
// Optimization: Sub-components that aren't needed for the initial render
const AudioPlayer = lazy(() => import("./AudioPlayer"));

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [hasInteractedWithAudio, setHasInteractedWithAudio] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const location = useLocation();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events using requestAnimationFrame
      if (rafId.current) return;

      rafId.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Optimization: Only update state if the value actually changes
        const shouldBeScrolled = currentY > 20 || location.pathname !== "/";
        setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

        const shouldBeVisible = currentY <= lastScrollY || currentY <= 100;
        setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));

        setLastScrollY(currentY);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [lastScrollY, location.pathname]);

  const toggleAudio = () => {
    if (!hasInteractedWithAudio) setHasInteractedWithAudio(true);
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-x-0 top-6 z-50 transition-all duration-700 sm:inset-x-6 
        ${isScrolled ? "bg-black/40 backdrop-blur-lg border border-white/10 p-4 rounded-2xl w-[95%] md:w-[85%] mx-auto shadow-2xl" : "bg-transparent p-6"} 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"}`}
    >
      <nav className="flex items-center justify-between w-full px-4" aria-label="Main Navigation">
        <div className="flex items-center gap-6">
          <NavLink to="/" aria-label="Go to Home">
            <img src="/img/color-logo.svg" alt="Company Logo" width="40" height="40" className="w-40 h-14" loading="eager" />
          </NavLink>
          <button 
            onClick={() => window.location.href='tel:+919934418459'}
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold transition-transform active:scale-95"
          >
            CALL US <TiLocationArrow className="text-lg" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `text-lg font-medium transition-colors hover:text-blue-600 ${isActive ? "text-blue-600" : "text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          <button 
            className="ml-4 flex items-center gap-1 min-w-10" 
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? "Pause music" : "Play music"}
          >
            {/* Optimization: Audio element only loads after first click */}
            {hasInteractedWithAudio && (
              <Suspense fallback={null}>
                <AudioPlayer isPlaying={isAudioPlaying} />
              </Suspense>
            )}
            
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`w-0.75 h-4 bg-blue-400 transition-all duration-300 ${isAudioPlaying ? "animate-bounce" : "h-1"}`}
                style={{ animationDelay: `${bar * 0.1}s` }}
                aria-hidden="true" 
              />
            ))}
          </button>
        </div>

        <button 
          className="md:hidden text-white text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}
        inert={!isMobileMenuOpen ? true : undefined} // Changed "" to true
      >
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 m-2 p-6 rounded-2xl flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-lg font-semibold"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
