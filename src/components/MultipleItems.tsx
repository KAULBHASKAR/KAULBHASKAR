import { useEffect, useRef, useState, type FC } from "react";

interface ServicePost {
  heading: string;
  heading2: string;
  name: string;
  imgSrc: string;
  price: number;
  rating: number;
}

const POST_DATA: ServicePost[] = [
  {
    heading: "Triple-System Predictive Analytics",
    heading2: "Macro Timing & Path Optimization",
    name: "Moving far beyond generic horoscopes, this advisory uses a rigorous cross-verification method leveraging three distinct classical mathematical systems: Parasara, Jaimini, and Krishnamurthi. This analytical approach maps out exact macro-timelines, allowing you to accurately time market entries, mergers and acquisitions, leadership successions, and key personal pivots with zero speculative guesswork.",
    imgSrc: "/services/horoscope.webp",
    price: 5000,
    rating: 4.2,
  },
  {
    heading: "The Maha Viprita Pratyangira Protocol",
    heading2: "Advanced Threat Reversal & Asset Insulation",
    name: "Designed exclusively for high-profile figures, institutional leaders, or family offices navigating aggressive external hostility, targeted reputational attacks, or structural sabotage. Utilizing the advanced defensive mechanics of Viprita (reversal) protocols, this high-tier intervention actively neutralizes targeted malicious intent, absorbs toxic operational friction, and securely redirects systemic hostility back to its origin. It forms an unbreachable energetic fire-wall around your assets, ensuring complete stabilization when standard operational safeguards fail.",
    imgSrc: "/services/Pratyangira.webp",
    price: 70000,
    rating: 4.8,
  },
  {
    heading: "The Shulini Durga Framework of Sharda Tilakam",
    heading2: "Macro Environmental Shielding & Astrological Risk Mitigation",
    name: "Formulated according to the rigorous structural standards of the classical Sharda Tilaka text, this service functions as an institutional defense matrix against macro-level volatility, severe planetary transitions, and large-scale systemic downturns. It is engineered for leaders whose enterprises are highly sensitive to broader environmental shifts, shifting political tides, or long-term structural blockages. This framework insulates the executive’s personal and corporate path, converting macro adversity into calculated tactical advantages.",
    imgSrc: "/services/shulini.webp",
    price: 40000,
    rating: 4.4,
  },
  {
    heading: "The Batuk Bhairava Mandate",
    heading2: "Rapid Threat Containment & Operational Risk Insulation",
    name: "Engineered for high-exposure leaders facing sudden, acute operational shocks, unpredictable market disruptions, or immediate institutional crises. Utilizing the swift, obstacle-breaking dynamics of lineage-backed Apad-Uddharana (crisis-resolution) mechanics, this targeted intervention rapidly dissolves hidden institutional roadblocks, neutralizes imminent compliance or adversarial threats, and instills unshakeable executive clarity and decision-making confidence under severe duress.",
    imgSrc: "/services/bhairav.webp",
    price: 50000,
    rating: 4.8,
  },
  {
    heading: "The Mahamrityunjaya Architecture",
    heading2: "Executive Vitality Insulation",
    name: "A premium, comprehensive energetic shield designed to safeguard the vital life force, physical resilience, and professional longevity of key C-suite leaders and institutional figures. Moving beyond simple wellness, this framework acts as a foundational asset-protection mechanism—insulating the executive from catastrophic health anomalies, severe physical burnout, and severe energetic exhaustion, thereby securing uninterrupted leadership continuity for the entire enterprise.",
    imgSrc: "/services/mahamrityunjaya.webp",
    price: 90000,
    rating: 4.7,
  },
  {
    heading: "The Baglamukhi Mandate",
    heading2: "Adversarial Neutralization & Institutional Litigation Strategy!",
    name: "A highly specialized, high-ticket energetic intervention designed for leaders facing existential corporate battles, high-exposure litigation, or major public elections. Combining your legal background with precise metaphysical protocols, this service actively disrupts adversarial momentum, establishes structural dominance in legal disputes, and maximizes influence dynamics during critical voting cycles.",
    imgSrc: "/services/baglamukhi.webp",
    price: 120000,
    rating: 4.6,
  },
  {
    heading: "The Shat-Chandi Protocol",
    heading2: "Macro-Scale Turnaround & Enterprise Safeguarding",
    name: "Engineered as a comprehensive, multi-tiered spiritual intervention to address complex, systemic stagnation within large enterprises or family offices. This intensive protocol cleanses institutional friction, neutralizes macro-economic bottlenecks, and rebuilds defensive energetic barriers to ensure long-term wealth preservation and stable organizational scaling.",
    imgSrc: "/services/Shatchandi.webp",
    price: 250000,
    rating: 4.8,
  },
  {
    heading: "Advanced Mahavidya Insulation",
    heading2: "Competitor Malice & Threat Mitigation",
    name: "A highly targeted defensive framework derived from classical texts to insulate your personal and professional ecosystem from malicious intent, corporate espionage, and hostile competitor energy. This service establishes an unbreachable shield around your brand, preventing external hostility or hidden agendas from destabilising your operational focus.",
    imgSrc: "/services/mahavidya.webp",
    price: 40000,
    rating: 4.5,
  },
  {
    heading: "The Lalita Resonance Framework",
    heading2: "Executive Clarity & Sovereign Abundance",
    name: "A premium alignment service centered on cultivating absolute cognitive clarity, expansive resource attraction, and sustainable executive energy. By tapping into the foundational geometry of universal laws, this framework ensures that leaders maintain pristine decision-making capabilities, magnetic authority, and total internal calm while commanding massive material networks.",
    imgSrc: "/services/lalita_archanam.webp",
    price: 50000,
    rating: 4.8,
  },
];

const MultipleItems: FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef<number>(0);
  const isAutoScrollingRef = useRef<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const scrollToSlide = (targetIndex: number) => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;

    const slideWidth = (track.firstElementChild as HTMLElement).offsetWidth;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    let nextIndex = targetIndex;
    if (nextIndex >= POST_DATA.length || nextIndex * slideWidth > maxScrollLeft + 10) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = Math.max(0, Math.round(maxScrollLeft / slideWidth));
    }

    indexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    isAutoScrollingRef.current = true;

    track.scrollTo({
      left: nextIndex * slideWidth,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      scrollToSlide(indexRef.current + 1);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;

    const slideWidth = (track.firstElementChild as HTMLElement).offsetWidth;
    if (slideWidth > 0) {
      const idx = Math.round(track.scrollLeft / slideWidth);
      if (idx !== indexRef.current && idx >= 0 && idx < POST_DATA.length) {
        indexRef.current = idx;
        setActiveIndex(idx);
      }
    }
  };

   return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex w-full h-screen bg-black">
        <video
          poster="/videos/SERVICE-poster.webp"
          preload="metadata"
          loop
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/SERVICE.webm" type="video/webm" />
          <source src="/videos/SERVICE.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Strategic Metaphysical Interventions
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Metaphysical Risk Mitigation &amp; Sovereign Alignment
          </h2>
        </div>
      </div>

      {/* Services Carousel Section */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POST_DATA.map((item) => (
            <div
              key={item.heading}
              className="w-full sm:w-1/2 lg:w-1/3 shrink-0 snap-start px-3"
            >
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between h-full border border-gray-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div>
                  <img
                    src={item.imgSrc}
                    alt={item.heading}
                    width={400}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">{item.heading}</h3>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">{item.heading2}</p>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.name}</p>
                  </div>
                </div>

                <footer className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <span>★★★★★</span>
                    <span className="text-gray-700 ml-1">{item.rating.toFixed(1)}</span>
                  </span>
                </footer>
              </article>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {POST_DATA.map((item, i) => (
            <button
              key={`dot-${item.heading}`}
              type="button"
              aria-label={`View ${item.heading}`}
              onClick={() => scrollToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? "w-6 bg-indigo-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MultipleItems;

