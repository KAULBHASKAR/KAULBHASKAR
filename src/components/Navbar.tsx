// src/components/Navbar.tsx
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { NavLink, useLocation } from "react-router";

// Optimization: Audio player chunk stays decoupled
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [hasInteractedWithAudio, setHasInteractedWithAudio] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const location = useLocation();
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reset positions and clear menu states on route changes
    lastScrollY.current = window.scrollY;
    setIsMobileMenuOpen(false);
    setIsVisible(true);

    const threshold = 15; // Minimum distance pixel check to filter mobile viewport jitter noise

    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // 1. Manage layout wrapper background states
        const shouldBeScrolled = currentY > 20 || location.pathname !== "/";
        setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

        // 2. Keep header pinned wide open if the viewport is near the top edge
        if (currentY <= 100) {
          setIsVisible(true);
          lastScrollY.current = currentY;
          rafId.current = null;
          return;
        }

        // 3. Prevent layout shifting updates from misinterpreting small scroll movements
        const scrollDifference = Math.abs(currentY - lastScrollY.current);
        if (scrollDifference < threshold) {
          rafId.current = null;
          return; 
        }

        // 4. Toggle visibility: Hide on downward scroll.
        // 🚀 ONLY reappear if scrolling up AND the user has scrolled near the top (e.g., within 300px)
        const isScrollingUp = currentY < lastScrollY.current;
        const isNearTop = currentY < 300; 
        const shouldBeVisible = isScrollingUp && isNearTop;
        
        setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));

        // 5. Automatically shut mobile drawer container when scrolling down
        if (currentY > lastScrollY.current) {
          setIsMobileMenuOpen(false);
        }

        lastScrollY.current = currentY;
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [location.pathname]);

  const toggleAudio = () => {
    if (!hasInteractedWithAudio) setHasInteractedWithAudio(true);
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-x-0 top-2 z-50 transition-all duration-700 sm:inset-x-6 
        ${isScrolled ? "bg-black/40 backdrop-blur-lg border border-white/10 p-4 rounded-2xl w-[95%] md:w-[85%] mx-auto shadow-2xl" : "bg-transparent p-6"} 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"}`}
    >
      <nav className="flex items-center justify-between w-full px-4" aria-label="Main Navigation">
        <div className="flex items-center gap-6">
          <NavLink to="/" aria-label="Go to Home">
            <img src="/img/logo.webp" alt="Company Logo" width="40" height="40" className="w-12 h-12" loading="eager" />
          </NavLink>
          <button 
            onClick={() => window.location.href='tel:+919934418459'}
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold transition-transform active:scale-95"
          >
            CALL US 
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-lg" height="1em" width="1em" xmlns="http://w3.org" aria-hidden="true">
              <path d="M21 3L3 10.53v.96l6.84 2.83L12.67 21h.96L21 3z"></path>
            </svg>
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
            className="ml-4 flex items-center justify-center text-white hover:text-blue-600 transition-colors duration-200" 
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? "Pause music" : "Play music"}
          >
            {hasInteractedWithAudio && (
              <Suspense fallback={null}>
                <AudioPlayer isPlaying={isAudioPlaying} />
              </Suspense>
            )}
            
            {isAudioPlaying ? (
              /* Speaker Playing Icon */
              <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              /* Speaker Muted Icon */
              <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="22" y1="9" x2="16" y2="15"></line>
                <line x1="16" y1="9" x2="22" y2="15"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Toggle Trigger Button */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://w3.org">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://w3.org">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}
        inert={!isMobileMenuOpen ? true : undefined}
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
