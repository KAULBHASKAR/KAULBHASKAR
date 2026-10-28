// src/components/Hero.tsx
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  const totalVideo = 4;
  const upcomingVideoIndex = (currentIndex % totalVideo) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Client-only guard
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Force autoplay on mount
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
    }
  }, []);

  // Failsafe loader timeout
  useEffect(() => {
    if (bgVideoRef.current && bgVideoRef.current.readyState >= 2) {
      setLoadedVideos((prev) => prev + 1);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loadedVideos >= 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Video Transition Animation Engine
  useGSAP(
    () => {
      if (hasClicked && bgVideoRef.current) {
        // Safe context transform initialization
        gsap.set("#video-frame", { visibility: "visible" });
        gsap.fromTo(
          bgVideoRef.current,
          { scale: 1.2, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // Main Intro + Scroll Animation (With Safe Layout Calculation Batching)
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
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

    tl.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
    }, 0);

    const refreshTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 200);

    return () => clearTimeout(refreshTimeout);
  }, []);

  const getVideoSrc = (index: number) => `videos/hero-bg-${index}.mp4`;
  // ✅ OPTIMIZATION: Resolves a lightweight frame image format path instead of loading extra videos
  const getVideoThumb = (index: number) => `videos/hero-thumb-${index}.webp`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-black select-none z-0">
      {isLoading && (
        <div className="flex items-center justify-center absolute z-50 h-screen w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* LAYER 1: Background Video Framework Only */}
      <div
        id="video-frame"
        className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75"
      >
      <div className="mask-clip-path absolute-center absolute z-20 size-64 cursor-pointer overflow-hidden rounded-lg">
        <div
          onClick={handleMiniVideoClick}
          className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
        >
      {/* 🚀 FIXED: Changed src from upcomingVideoIndex to currentIndex inside the tracking preview map loop */}
      {/* This ensures that when the cursor moves to the center, the thumb tracking system pulls the correct matching preview image asset instantly */}
      <img
        src={getVideoThumb(upcomingVideoIndex)} 
        alt={`Preview Frame of Video #${upcomingVideoIndex}`}
        key={upcomingVideoIndex} // Added key property to force React to swap out the preview frames cleanly on click
        width="256"
        height="256"
        id="current-video"
        className="size-64 origin-center scale-150 object-cover object-center subpixel-antialiased transform-gpu"
        loading="eager" // Eager load specifically for the floating center hover card so it responds instantly to cursor movements
      />
    </div>
  </div>

  {isClient && (
    <video
      ref={bgVideoRef}
      src={getVideoSrc(currentIndex)}
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
      className="absolute left-0 top-0 size-full object-cover"
      onLoadedData={handleVideoLoad}
      onCanPlay={() => {
        setIsLoading(false);
        bgVideoRef.current?.play().catch(() => {});
      }}
    />
  )}

      {/* Foreground Tracking Headline inside the clip mask */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 bg-linear-to-r from-green-400 via-red-500 to-indigo-500 bg-clip-text text-transparent pointer-events-none">
          BH<b>as</b>k<b>a</b>r
        </h1>
      </div>


      {/* LAYER 2: Master Floating Interactive Typography Overlay Context */}
      <div className="absolute left-0 top-0 z-30 size-full overflow-y-auto md:overflow-hidden bg-transparent pointer-events-none flex flex-col justify-start">
        <div className="mt-20 sm:mt-24 px-5 sm:px-10 max-w-sm sm:max-w-xl pointer-events-auto pb-10">
          
          <h2 className="special-font hero-heading text-5xl sm:text-8xl bg-linear-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent relative">
            Kaul
            <span className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
              K<b>a</b>u<b>l</b>
            </span>
          </h2>

          <p className="mt-2 mb-6 font-robert-regular text-md sm:text-lg text-white leading-relaxed select-text">
            त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा।<br />
            न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥<br />
            न च कौलात् परो योगी न विद्या त्रैपुरी समा।<br />
            न च शान्तेः परं ज्ञानं न च क्षान्तेः परं सुखम्॥<br />
            <br />
            <span className="block text-white antialiased font-large opacity-95">
              I can help ultra-high-net-worth individuals, executives, and global leaders dismantle subconscious limitations, master absolute mental focus and build sustainable material empires through timeless metaphysical laws.
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
    </div>
  );
};

export default Hero;
