import { useState, useEffect, type FC } from "react";  
import SliderComponent from "react-slick";
import type { Settings } from "react-slick";
import { HiStar } from "react-icons/hi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ CLEAN FIX: Resolves the Slider runtime module scope safely for Vite 
const Slider = typeof SliderComponent === 'function' 
  ? SliderComponent 
  : (SliderComponent as any).default;

interface ServicePost {
  heading: string;
  heading2: string;
  name: string;
  imgSrc: string;
  price: number;
  rating: number;
}

const postData: ServicePost[] = [
  { 
    heading: "Triple-System Predictive Analytics", 
    heading2: "Macro Timing & Path Optimization", 
    name: "Moving far beyond generic horoscopes, this advisory uses a rigorous cross-verification method leveraging three distinct classical mathematical systems: Parasara, Jaimini, and Krishnamurthi. This analytical approach maps out exact macro-timelines, allowing you to accurately time market entries, mergers and acquisitions, leadership successions, and key personal pivots with zero speculative guesswork.", 
    imgSrc: "/services/horoscope.png", 
    price: 5000, 
    rating: 4.2, 
  }, 
  {
    heading: 'The Maha Viprita Pratyangira Protocol',
    heading2: 'Advanced Threat Reversal & Asset Insulation',
    name: "Designed exclusively for high-profile figures, institutional leaders, or family offices navigating aggressive external hostility, targeted reputational attacks, or structural sabotage. Utilizing the advanced defensive mechanics of Viprita (reversal) protocols, this high-tier intervention actively neutralizes targeted malicious intent, absorbs toxic operational friction, and securely redirects systemic hostility back to its origin. It forms an unbreachable energetic fire-wall around your assets, ensuring complete stabilization when standard operational safeguards fail.",
    imgSrc: '/services/Pratyangira.png',
    price: 70000, 
    rating: 4.8,
  }, 
  {
    heading: 'The Shulini Durga Framework of Sharda Tilakam',
    heading2: 'Macro Environmental Shielding & Astrological Risk Mitigation',
    name: " Formulated according to the rigorous structural standards of the classical Sharda Tilaka text, this service functions as an institutional defense matrix against macro-level volatility, severe planetary transitions, and large-scale systemic downturns. It is engineered for leaders whose enterprises are highly sensitive to broader environmental shifts, shifting political tides, or long-term structural blockages. This framework insulates the executive’s personal and corporate path, converting macro adversity into calculated tactical advantages.",
    imgSrc: '/services/shulini.webp',
    price: 40000, 
    rating: 4.4,
  }, 
  {
    heading: 'The Batuk Bhairava Mandate',
    heading2: 'Rapid Threat Containment & Operational Risk Insulation',
    name: "Engineered for high-exposure leaders facing sudden, acute operational shocks, unpredictable market disruptions, or immediate institutional crises. Utilizing the swift, obstacle-breaking dynamics of lineage-backed Apad-Uddharana (crisis-resolution) mechanics, this targeted intervention rapidly dissolves hidden institutional roadblocks, neutralizes imminent compliance or adversarial threats, and instills unshakeable executive clarity and decision-making confidence under severe duress.",
    imgSrc: '/services/bhairav.webp',
    price: 50000, 
    rating: 4.8,
  }, 
  { 
    heading: "The Mahamrityunjaya Architecture", 
    heading2: "Executive Vitality Insulation", 
    name: " A premium, comprehensive energetic shield designed to safeguard the vital life force, physical resilience, and professional longevity of key C-suite leaders and institutional figures. Moving beyond simple wellness, this framework acts as a foundational asset-protection mechanism—insulating the executive from catastrophic health anomalies, severe physical burnout, and severe energetic exhaustion, thereby securing uninterrupted leadership continuity for the entire enterprise.", 
    imgSrc: "/services/mahamrityunjaya.png", 
    price: 90000, 
    rating: 4.7, 
  },
  { 
    heading: "The Baglamukhi Mandate", 
    heading2: "Adversarial Neutralization & Institutional Litigation Strategy!", 
    name: "A highly specialized, high-ticket energetic intervention designed for leaders facing existential corporate battles, high-exposure litigation, or major public elections. Combining your legal background with precise metaphysical protocols, this service actively disrupts adversarial momentum, establishes structural dominance in legal disputes, and maximizes influence dynamics during critical voting cycles.", 
    imgSrc: "/services/baglamukhi.png", 
    price: 120000, 
    rating: 4.6, 
  }, 
  {
    heading: 'The Shat-Chandi Protocol',
    heading2: 'Macro-Scale Turnaround & Enterprise Safeguarding',
    name: "Engineered as a comprehensive, multi-tiered spiritual intervention to address complex, systemic stagnation within large enterprises or family offices. This intensive protocol cleanses institutional friction, neutralizes macro-economic bottlenecks, and rebuilds defensive energetic barriers to ensure long-term wealth preservation and stable organizational scaling.",
    imgSrc: '/services/Shatchandi.webp',
    price: 250000,
    rating: 4.8,
  },
  {
    heading: 'Advanced Mahavidya Insulation',
    heading2: 'Competitor Malice & Threat Mitigation',
    name: "A highly targeted defensive framework derived from classical texts to insulate your personal and professional ecosystem from malicious intent, corporate espionage, and hostile competitor energy. This service establishes an unbreachable shield around your brand, preventing external hostility or hidden agendas from destabilising your operational focus.",
    imgSrc: '/services/mahavidya.png',
    price: 40000,
    rating: 4.5,
  },
  {
    heading: 'The Lalita Resonance Framework',
    heading2: 'Executive Clarity & Sovereign Abundance',
    name: "A premium alignment service centered on cultivating absolute cognitive clarity, expansive resource attraction, and sustainable executive energy. By tapping into the foundational geometry of universal laws, this framework ensures that leaders maintain pristine decision-making capabilities, magnetic authority, and total internal calm while commanding massive material networks.",
    imgSrc: '/services/lalita_archanam.png',
    price: 50000,
    rating: 4.8,
  },
];

const MultipleItems: FC = () => {
  // 1. Dynamic slides state (Same as Mudra component)
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3); // Desktop
      } else if (width >= 640) {
        setSlidesToShow(2); // Tablet
      } else {
        setSlidesToShow(1); // Mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use our dynamic state
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="w-screen h-auto overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex w-full h-screen">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/SERVICE.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Strategic Metaphysical Interventions</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Metaphysical Strategy for High-Performers
          </h2>
          <p className="text-lg md:text-xl font-medium max-w-4xl leading-relaxed">
             For Mastering Modern Power Structures we provide Authentic Spiritual Systems for Elite Leaders
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center md:text-left">
            Popular Services
          </h2>

          <div className="w-full min-w-0">
            <Slider {...settings} key={slidesToShow}>
              {postData.map((item, i) => (
                <div key={i} className="outline-none">
                  <div className="bg-white mx-3 p-4 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl mb-10">
                    <div className="relative overflow-hidden rounded-xl group">
                      <img
                        src={item.imgSrc}
                        alt={item.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute right-4 -bottom-2 bg-blue-900 rounded-full p-4 shadow-lg">
                        <h3 className="text-white uppercase text-center text-[10px] font-bold leading-tight">
                          best <br /> wanted
                        </h3>
                      </div>
                    </div>

                    <div className="pt-8">
                      <h4 className="text-xl font-bold text-gray-900 line-clamp-1">{item.heading}</h4>
                      <h4 className="text-sm font-semibold text-gray-600 mt-1">{item.heading2}</h4>
                      <h3 className="text-base font-normal text-gray-500 mt-4 min-h-12">{item.name}</h3>

                      <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 text-xl font-bold">{item.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <HiStar key={idx} className="h-4 w-4 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <div className="text-2xl font-black text-gray-900">
                          ₹{item.price.toLocaleString()}/=
                        </div>
                      </div>
                      <hr className="border-gray-100" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleItems;
