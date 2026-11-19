import React, { useEffect, useRef, useState } from "react";

interface MentorData {
  src: string;
  title: string;
  description: string;
}

const MENTOR_IMAGES: MentorData[] = [
  { src: "/mentor/Aradhya.webp", title: "VAJRA YOGINI", description: "Vajra Siddha." },
  { src: "/mentor/khunda.webp", title: "G. VYAS", description: "Bala Siddha Upasaka." },
  { src: "/mentor/S.Bakshi.webp", title: "S. BAKSHI", description: "Astro Guru." },
  { src: "/mentor/Siddharth.webp", title: "SIDDHARTH MAHARAJ", description: "Yagyan Expert." },
  { src: "/mentor/Subhas.webp", title: "SUBHAS KAUSHIK", description: "Vastu Expert & Palm Reader." },
  { src: "/mentor/YATAN.webp", title: "YATAN SHARMA", description: "NADI Astrologer." },
  { src: "/mentor/Kiran.webp", title: "KIRAN SHARMA", description: "Palmistry Researcher." },
];

const Mentor: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getMaxIndex = () => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide || firstSlide.offsetWidth === 0) {
      return MENTOR_IMAGES.length - 1;
    }
    const visibleSlides = Math.max(1, Math.round(track.clientWidth / firstSlide.offsetWidth));
    return Math.max(0, MENTOR_IMAGES.length - visibleSlides);
  };

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const maxIndex = getMaxIndex();
    const targetIndex = index > maxIndex ? 0 : index < 0 ? maxIndex : index;
    const slide = track.children[targetIndex] as HTMLElement | undefined;

    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
      setActiveIndex(targetIndex);
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
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide || firstSlide.offsetWidth === 0) return;

    const idx = Math.round(track.scrollLeft / firstSlide.offsetWidth);
    const maxIndex = getMaxIndex();
    const clampedIdx = Math.min(Math.max(0, idx), maxIndex);

    if (clampedIdx !== activeIndex) {
      setActiveIndex(clampedIdx);
    }
  };

  return (
    <section className="text-center my-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="special-font hero-heading bg-linear-to-r from-yellow-500 via-red-600 to-indigo-500 bg-clip-text text-transparent text-lg uppercase tracking-widest">
          our <b>experts</b>
        </h2>

        <div
          className="px-4 py-10 bg-black mt-6 w-full min-w-0 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Native Scroll-Snap Track: 7 items total, 0 cloned nodes */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MENTOR_IMAGES.map((item, idx) => (
              <div
                key={item.title}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 snap-start px-2 text-white flex flex-col items-center"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  width={288}
                  height={288}
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="mx-auto h-72 w-auto object-cover rounded-lg"
                />
                <h3 className="mt-4 text-lg font-bold uppercase tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-sm px-2 text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Accessible Pagination Dots (24x24px touch targets) */}
          <div className="mt-6 flex justify-center items-center flex-wrap">
            {MENTOR_IMAGES.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`View ${item.title}`}
                aria-current={activeIndex === i ? "true" : undefined}
                onClick={() => scrollToSlide(i)}
                className="h-6 min-w-6 px-1 flex items-center justify-center cursor-pointer group"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-6 bg-yellow-400"
                      : "w-2 bg-gray-600 group-hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentor;
