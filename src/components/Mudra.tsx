import React, { useEffect, useRef, useState } from "react";

interface MudraImage {
  src: string;
  title: string;
  description: string;
}

const MUDRA_IMAGES: MudraImage[] = [
  { src: "/mudra/abagunthan.webp", title: "Abagunthan Mudra", description: "Symbol of concealment and protection." },
  { src: "/mudra/abhay.webp", title: "Abhay Mudra", description: "Gesture of fearlessness and reassurance." },
  { src: "/mudra/ankush.webp", title: "Ankush Mudra", description: "Represents control and guidance." },
  { src: "/mudra/chakra.webp", title: "Chakra Mudra", description: "Symbol of energy and cosmic power." },
  { src: "/mudra/dhenu.webp", title: "Dhenu Mudra", description: "Gesture symbolizing nourishment and abundance." },
  { src: "/mudra/galini.webp", title: "Galini Mudra", description: "Represents surrender and devotion." },
  { src: "/mudra/jwalini.webp", title: "Jwalini Mudra", description: "Gesture of fire and transformation." },
  { src: "/mudra/kharga.webp", title: "Kharga Mudra", description: "Symbol of strength and destruction of evil." },
  { src: "/mudra/kurma.webp", title: "Kurma Mudra", description: "Represents stability and endurance." },
  { src: "/mudra/lelihan.webp", title: "Lelihan Mudra", description: "Gesture of flowing energy and grace." },
  { src: "/mudra/linga.webp", title: "Linga Mudra", description: "Symbol of creation and divine union." },
  { src: "/mudra/matsya.webp", title: "Matsya Mudra", description: "Gesture representing fish and water element." },
  { src: "/mudra/munda.webp", title: "Munda Mudra", description: "Symbol of detachment and transcendence." },
  { src: "/mudra/parmikaran.webp", title: "Parmikaran Mudra", description: "Gesture of purification and clarity." },
  { src: "/mudra/samhar.webp", title: "Samhar Mudra", description: "Represents dissolution and transformation." },
  { src: "/mudra/sannirodhini.webp", title: "Sannirodhini Mudra", description: "Gesture of restraint and discipline." },
  { src: "/mudra/tatva.webp", title: "Tatva Mudra", description: "Symbol of elemental balance and harmony." },
  { src: "/mudra/yoni.webp", title: "Yoni Mudra", description: "Gesture of feminine energy and creation." },
];

const Mudra: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clampedIndex = ((index % MUDRA_IMAGES.length) + MUDRA_IMAGES.length) % MUDRA_IMAGES.length;
    const slide = track.children[clampedIndex] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
      setActiveIndex(clampedIndex);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollToSlide(activeIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const slideWidth = (track.firstElementChild as HTMLElement).offsetWidth;
    if (slideWidth > 0) {
      const idx = Math.round(track.scrollLeft / slideWidth);
      if (idx !== activeIndex && idx >= 0 && idx < MUDRA_IMAGES.length) {
        setActiveIndex(idx);
      }
    }
  };

  return (
    <section className="text-center my-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="special-font hero-heading bg-linear-to-r from-yellow-500 via-red-600 to-indigo-500 bg-clip-text text-transparent text-lg">
          m<b>ud</b>r<b>a</b>s
        </h2>

        <div
          className="px-4 py-10 bg-black mt-6 w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Native Scroll-Snap Track: 18 items total, 0 cloned nodes */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MUDRA_IMAGES.map((item) => (
              <div
                key={item.title}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 snap-start px-2 text-white flex flex-col items-center"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  width={288}
                  height={288}
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-auto object-contain"
                />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="text-sm px-2 text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Lightweight Pagination Dots */}
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {MUDRA_IMAGES.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`View ${item.title}`}
                onClick={() => scrollToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? "w-6 bg-yellow-400" : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mudra;
