import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
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

  // Failsafe loader
  useEffect(() => {
    if (bgVideoRef.current && bgVideoRef.current.readyState >= 2) {
      setLoadedVideos((prev) => prev + 1);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // Sync loading state with ScrollTrigger
  useEffect(() => {
    if (loadedVideos >= 1) {
      setIsLoading(false);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    }
  }, [loadedVideos]);

  // Video Transition Animation Engine
  useGSAP(
    () => {
      if (hasClicked && nextVideoRef.current) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play().catch(() => {});
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

  // Main Intro + Scroll Animation (With Text-to-White Transform Engine)
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
      },
    });

    // 1. Morph the clip path layout geometry frame
    tl.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
    }, 0);

    // 2. Animate all text classes cleanly to pure white on page scroll
    tl.to(".scroll-text-target", {
      color: "#ffffff",
      backgroundImage: "none",
      webkitBackgroundClip: "unset",
      textFillColor: "#ffffff",
      ease: "power1.inOut",
    }, 0);
  }, []);

  const getVideoSrc = (index: number) => `videos/hero-bg-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-black select-none z-0">
      {isLoading && (
        <div className="flex items-center justify-center absolute z-100 h-screen w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* LAYER 1: Background Video Framework Only */}
      {/* FIXED: Changed from relative z-10 to absolute top-0 left-0 z-10 */}
      <div
        id="video-frame"
        className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="mask-clip-path absolute-center absolute z-20 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            onClick={handleMiniVideoClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={currentVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              playsInline
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
            />
          </div>
        </div>

        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          playsInline
          id="next-video"
          className="absolute-center invisible absolute z-15 size-64 object-cover"
        />

        {isClient && (
          <video
            ref={bgVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover"
            onLoadedData={handleVideoLoad}
            onCanPlay={() => {
              setIsLoading(false);
              bgVideoRef.current?.play();
            }}
          />
        )}

        {/* Foreground Tracking Headline inside the video context wrapper */}
        <h1 className=" special-font hero-heading absolute bottom-5 right-5 z-40 bg-linear-to-r from-green-400 via-red-500 to-indigo-500 bg-clip-text text-transparent pointer-events-none">
          BH<b>as</b>k<b>a</b>r
        </h1>
      </div>

      {/* LAYER 2: Master Floating Interactive Typography Overlay Overlay Context */}
      {/* FIXED: Placed COMPLETELY OUTSIDE the video container at z-30 stack layers */}
      <div className="absolute left-0 top-0 z-30 size-full overflow-y-auto md:overflow-hidden bg-transparent pointer-events-none flex flex-col justify-start">
        <div className="mt-20 sm:mt-24 px-5 sm:px-10 max-w-sm sm:max-w-xl pointer-events-auto pb-10">
          <h2 className="scroll-text-target special-font hero-heading text-5xl sm:text-8xl bg-linear-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent relative">
            Kaul
            <span className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
              K<b>a</b>u<b>l</b>
            </span>
          </h2>

          <p className="scroll-text-target mt-2 mb-6 font-robert-regular text-xs sm:text-sm text-white leading-relaxed select-text">
            त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा।<br />
            न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥<br />
            न च कौलात् परो योगी न विद्या त्रैपुरी समा।<br />
            न च शान्तेः परं ज्ञानं न च क्षान्तेः परं सुखम्॥<br />
            <br />
            <span className="block text-white antialiased font-medium opacity-95">
              I can help ultra-high-net-worth individuals, executives, and global leaders dismantle subconscious limitations, master absolute mental focus and build sustainable material empires through timeless metaphysical laws.
            </span>
          </p>
          
          <Button
            id="kaulbhaskar-guruji"
            title="Explore our research archive at Tantrasadhana.org"
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 hover:!bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-300 w-full sm:w-fit py-3 px-5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            onClick={() =>
              window.open("https://tantrasadhana.org", "_blank")
            }
          />
        </div>
      </div>

      {/* Root Layer Underlay Shadow Text Layer */}
      <h1 className="scroll-text-target special-font hero-heading absolute bottom-5 right-5 text-pink-400 z-20 pointer-events-none">
        BH<b>as</b>k<b>a</b>r
      </h1>
    </div>
  );
};

export default Hero;
