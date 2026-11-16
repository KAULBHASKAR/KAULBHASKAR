import { useEffect, useRef, useState, type FC } from "react";

// Testimonial dataset containing customer reviews and details
interface TestimonialData {
  name: string;
  profession: string;
  comment: string;
}

const TESTIMONIAL_DATA: TestimonialData[] = [
  // ... dataset containing 10 entries ...
];

const TestimonialCard: FC<TestimonialData> = ({ name, profession, comment }) => (
  <article className="bg-white p-6 min-h-[350px] flex flex-col justify-between rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl h-full">
    <p className="text-base font-normal text-black my-2 leading-relaxed italic">
      "{comment}"
    </p>
    <footer className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center gap-2">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{name}</h3>
        <p className="text-sm font-normal text-gray-600">{profession}</p>
      </div>
      <span className="text-base tracking-wider select-none shrink-0" aria-label="5 out of 5 stars">
        <span className="text-orange-300">★★★★</span>
        <span className="text-amber-500">★</span>
      </span>
    </footer>
  </article>
);

const Testimonial: FC = () => {
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
    if (nextIndex >= TESTIMONIAL_DATA.length || nextIndex * slideWidth > maxScrollLeft + 10) {
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
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;

    const slideWidth = (track.firstElementChild as HTMLElement).offsetWidth;
    if (slideWidth > 0) {
      const idx = Math.round(track.scrollLeft / slideWidth);
      if (idx !== indexRef.current && idx >= 0 && idx < TESTIMONIAL_DATA.length) {
        indexRef.current = idx;
        setActiveIndex(idx);
      }
    }
  };

  return (
    <section className="bg-linear-to-r from-red-500 via-green-400 to-pink-500 py-20 overflow-hidden" id="testimonial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white mb-10 uppercase tracking-widest">
          Testimonials
        </h2>
        <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIAL_DATA.map((item, i) => (
              <div key={`${item.name}-${i}`} className="w-full sm:w-1/2 lg:w-1/3 shrink-0 snap-start px-3">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {TESTIMONIAL_DATA.map((item, i) => (
              <button
                key={`dot-${item.name}-${i}`}
                type="button"
                aria-label={`View testimonial from ${item.name}`}
                onClick={() => scrollToSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
