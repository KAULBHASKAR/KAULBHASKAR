import React, { useState, useEffect } from "react";
import SliderComponent from "react-slick";
import type { Settings } from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore - Critical for Vite Production builds to avoid Error #130
const Slider = (SliderComponent as any).default || SliderComponent;

interface MudraImage {
  src: string;
  title: string;
  description: string;
}

const Mudra: React.FC = () => {
  // 1. Dynamic slides state to force correct mobile view
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

    // Initialize on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use our dynamic state
    slidesToScroll: 1,
    autoplay: true,
    arrows: false, // Often helps mobile stability
  };

  const images: MudraImage[] = [
    { src: "/mudra/abagunthan.png", title: "Abagunthan Mudra", description: "Symbol of concealment and protection." },
    { src: "/mudra/abhay.png", title: "Abhay Mudra", description: "Gesture of fearlessness and reassurance." },
    { src: "/mudra/ankush.png", title: "Ankush Mudra", description: "Represents control and guidance." },
    { src: "/mudra/chakra.png", title: "Chakra Mudra", description: "Symbol of energy and cosmic power." },
    { src: "/mudra/dhenu.png", title: "Dhenu Mudra", description: "Gesture symbolizing nourishment and abundance." },
    { src: "/mudra/galini.png", title: "Galini Mudra", description: "Represents surrender and devotion." },
    { src: "/mudra/jwalini.png", title: "Jwalini Mudra", description: "Gesture of fire and transformation." },
    { src: "/mudra/kharga.png", title: "Kharga Mudra", description: "Symbol of strength and destruction of evil." },
    { src: "/mudra/kurma.png", title: "Kurma Mudra", description: "Represents stability and endurance." },
    { src: "/mudra/lelihan.png", title: "Lelihan Mudra", description: "Gesture of flowing energy and grace." },
    { src: "/mudra/linga.png", title: "Linga Mudra", description: "Symbol of creation and divine union." },
    { src: "/mudra/matsya.png", title: "Matsya Mudra", description: "Gesture representing fish and water element." },
    { src: "/mudra/munda.png", title: "Munda Mudra", description: "Symbol of detachment and transcendence." },
    { src: "/mudra/parmikaran.png", title: "Parmikaran Mudra", description: "Gesture of purification and clarity." },
    { src: "/mudra/samhar.png", title: "Samhar Mudra", description: "Represents dissolution and transformation." },
    { src: "/mudra/sannirodhini.png", title: "Sannirodhini Mudra", description: "Gesture of restraint and discipline." },
    { src: "/mudra/tatva.png", title: "Tatva Mudra", description: "Symbol of elemental balance and harmony." },
    { src: "/mudra/yoni.png", title: "Yoni Mudra", description: "Gesture of feminine energy and creation." }
  ];

  return (
    <div className="text-center my-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="special-font hero-heading bg-linear-to-r from-yellow-500 via-red-600 to-indigo-500 bg-clip-text text-transparent text-lg">
          m<b>ud</b>r<b>a</b>s
        </h2>
        
        {/* Container with min-w-0 helps prevent 'exponential width' bugs */}
        <div className="px-4 py-10 bg-black mt-6 w-full max-w-full overflow-hidden min-w-0">
          <Slider {...settings} key={slidesToShow}> 
            {/* Added 'key' to force re-render when slides change */}
            {images.map((item, i) => (
              <div key={i} className="text-white outline-none w-full px-2">
                <div className="flex flex-col items-center">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="h-72 w-auto object-contain" 
                  />
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm px-2 text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Mudra;
