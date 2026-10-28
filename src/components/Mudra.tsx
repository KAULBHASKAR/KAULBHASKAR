// src/components/Mudra.tsx
import React, { useState } from "react";

interface MudraImage {
  src: string;
  title: string;
  description: string;
}

const Mudra: React.FC = () => {
  // 1. Completely kept your existing mudra items dataset pool intact
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

  // 2. Local progressive slicing pagination state to keep initial viewport element count light
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  };

  return (
    <div className="text-center my-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="special-font hero-heading bg-linear-to-r from-yellow-500 via-red-600 to-indigo-500 bg-clip-text text-transparent text-lg">
          m<b>ud</b>r<b>a</b>s
        </h2>
        
        {/* 3. Replaced the wrapper trail with a native grid layout to eliminate slick track overhead */}
        <div className="px-4 py-10 bg-black mt-6 w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6">
            {images.slice(0, visibleCount).map((item, i) => (
              <div key={i} className="text-white outline-none w-full px-2 flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    width="100"
                    height="100"
                    className="h-72 w-auto object-contain" 
                    loading="lazy" // Native performance rendering deferment
                  />
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm px-2 text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Smooth user pagination trigger interface */}
          {visibleCount < images.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 px-6 py-3 rounded-full text-sm font-semibold transition-transform active:scale-95 cursor-pointer"
              >
                View More Mudras
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mudra;
