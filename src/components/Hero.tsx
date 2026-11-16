import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [bgIndex, setBgIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [shouldPreloadNext, setShouldPreloadNext] = useState<boolean>(false);

  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  const totalVideo = 4;
  const upcomingVideoIndex = (currentIndex % totalVideo) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setShouldPreloadNext(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {
        // Autoplay blocked by browser policy; poster remains visible
      });
    }
  }, [bgIndex]);

  // Video Transition Animation Engine
  useGSAP(
    () => {
      if (hasClicked && nextVideoRef.current) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play().catch(() => {});
          },
          onComplete: () => {
            setBgIndex(currentIndex);
            gsap.set("#next-video", {
              visibility: "hidden",
              width: "16rem",
              height: "16rem",
            });
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // Scroll-triggered clip-path animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.from(
      "#video-frame",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power1.inOut",
      },
      0
    );
  }, []);

  const getPosterSrc = (index: number) => `/videos/hero-poster-${index}.webp`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-black select-none z-0">
      {/* LAYER 1: Background Video Framework Only */}
      <div
        id="video-frame"
        className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-blue-75 will-change-transform"
      >
        {/* Mini Preview Trigger: Loads video only on hover/click */}
        <div
          onMouseEnter={() => setShouldPreloadNext(true)}
          className="mask-clip-path absolute-center absolute z-20 size-64 cursor-pointer overflow-hidden rounded-lg"
        >
          <div
            onClick={handleMiniVideoClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={currentVideoRef}
              poster={getPosterSrc(upcomingVideoIndex)}
              preload={shouldPreloadNext ? "metadata" : "none"}
              loop
              muted
              playsInline
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
            >
              {shouldPreloadNext && (
                <>
                  <source
                    src={`/videos/hero-bg-${upcomingVideoIndex}.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`/videos/hero-bg-${upcomingVideoIndex}.mp4`}
                    type="video/mp4"
                  />
                </>
              )}
            </video>
          </div>
        </div>

        {/* Transition Video: Loads only after user triggers a switch */}
        <video
          ref={nextVideoRef}
          poster={getPosterSrc(currentIndex)}
          preload={hasClicked ? "auto" : "none"}
          loop
          muted
          playsInline
          id="next-video"
          className="absolute-center invisible absolute z-15 size-64 object-cover"
        >
          {hasClicked && (
            <>
              <source
                src={`/videos/hero-bg-${currentIndex}.webm`}
                type="video/webm"
              />
              <source
                src={`/videos/hero-bg-${currentIndex}.mp4`}
                type="video/mp4"
              />
            </>
          )}
        </video>

        {/* Active Background Video */}
        <video
          key={bgIndex}
          ref={bgVideoRef}
          poster={getPosterSrc(bgIndex)}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover"
          onCanPlay={() => {
            bgVideoRef.current?.play().catch(() => {});
          }}
        >
          <source src={`/videos/hero-bg-${bgIndex}.webm`} type="video/webm" />
          <source src={`/videos/hero-bg-${bgIndex}.mp4`} type="video/mp4" />
        </video>

        <h1 className="special-font hero-heading absolute bottom-5 right-10 z-40 bg-linear-to-r from-green-400 via-red-500 to-indigo-500 bg-clip-text text-transparent pointer-events-none">
          BH<b>as</b>k<b>a</b>r
        </h1>
      </div>

      {/* LAYER 2: Master Floating Interactive Typography Overlay Context */}
      <div className="absolute left-0 top-0 z-30 size-full overflow-y-auto md:overflow-hidden bg-transparent pointer-events-none flex flex-col justify-start">
        <div className="mt-20 sm:mt-24 px-5 sm:px-10 max-w-sm sm:max-w-xl pointer-events-auto pb-10">
          <h2 className="special-font hero-heading text-5xl sm:text-8xl bg-linear-to-r from-green-500 via-red-500 to-indigo-600 bg-clip-text text-transparent relative">
            Kaul
            <span
              className="absolute inset-0 select-none pointer-events-none"
              aria-hidden="true"
            >
              K<b>a</b>u<b>l</b>
            </span>
          </h2>

          <p className="mt-2 mb-6 font-robert-regular text-md sm:text-lg text-white leading-relaxed select-text">
            त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा।
            <br />
            न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥
            <br />
            न च कौलात् परो योगी न विद्या त्रैपुरी समा।
            <br />
            न च शान्तेः परं ज्ञानं न च क्षान्तेः परं सुखम्॥
            <br />
            <br />
            <span className="block text-white antialiased font-large opacity-95">
              I can help ultra-high-net-worth individuals, executives, and
              global leaders dismantle subconscious limitations, master absolute
              mental focus and build sustainable material empires through
              timeless metaphysical laws.
            </span>
          </p>

          <Button
            id="kaulbhaskar-guruji"
            title="Explore our research archive at Tantrasadhana.org"
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 hover:!bg-white text-black font-semibold text-md sm:text-lg transition-all duration-300 w-full sm:w-fit py-3 px-5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            onClick={() => window.open("https://tantrasadhana.org", "_blank")}
          />
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-10 bg-linear-to-r from-green-400 via-red-500 to-indigo-500 bg-clip-text text-transparent z-20 pointer-events-none">
        BH<b>as</b>k<b>a</b>r
      </h1>
    </div>
  );
};

export default Hero;
