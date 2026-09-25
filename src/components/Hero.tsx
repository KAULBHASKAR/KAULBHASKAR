import React, { useEffect, useRef, useState } from "react";
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

  // Video Transition Animation
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

  // Main Intro + Scroll Animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  const getVideoSrc = (index: number) => `videos/hero-bg-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-black ">
      {isLoading && (
        <div className="flex-center absolute z-100 h-screen w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      
      {/* LAYER 1: Animated Background (Contains the clipPath elements) */}
      <div id="video-frame" className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75">
        <div className="mask-clip-path absolute-center absolute z-20 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
            <video ref={currentVideoRef} src={getVideoSrc(upcomingVideoIndex)} loop muted playsInline id="current-video" className="size-64 origin-center scale-150 object-cover object-center" />
          </div>
        </div>
        
        <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted playsInline id="next-video" className="absolute-center invisible absolute z-15 size-64 object-cover" />
        {isClient && (
          <video ref={bgVideoRef} src={getVideoSrc(currentIndex)} autoPlay loop muted playsInline className="absolute left-0 top-0 size-full object-cover" onLoadedData={handleVideoLoad} onCanPlay={() => { setIsLoading(false); bgVideoRef.current?.play(); }} />
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-20 bg-linear-to-r from-pink-500 via-green-400 to-red-500 bg-clip-text text-transparent">
          Bhaskar
          <span className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
            BH<b>as</b>k<b>a</b>r
          </span>
        </h1>
      </div>

      {/* LAYER 2: Completely independent Interactive Content Layer */}
      {/* Changing pointer-events configuration guarantees mobile taps hit the child link natively */}
      <div className="absolute left-0 top-0 z-30 size-full overflow-hidden rounded-lg bg-blue-75 ">
        <div className="mt-24 px-5 sm:px-10 max-w-xl pointer-events-auto">
          <h2 className="special-font hero-heading bg-linear-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent relative">
            Kaul
            <span className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
              K<b>a</b>u<b>l</b>
            </span>
          </h2>

          <p className="mb-5 max-w-72 font-robert-regular text-white">
            त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा।<br />
            न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥<br />
            न च कौलात् परो योगी न विद्या त्रैपुरी समा।<br />
            न च शान्तेः परं ज्ञानं न च क्षान्तेः परं सुखम्॥<br />
            <br />
            I can help ultra-high-net-worth individuals, executives, and global leaders dismantle subconscious limitations, master absolute mental focus and build sustainable material empires through timeless metaphysical laws.
          </p>
          
          {/* Native HTML Link component, freed from layout clipping contexts and JavaScript overrides */}
          <a 
            id="kaulbhaskar-guruji"
            href="https://tantrasadhana.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-yellow-300 hover:bg-white flex items-center justify-center gap-1 py-3 px-6 rounded-lg text-black font-semibold transition-all duration-300 w-fit cursor-pointer relative z-50"
          >
            <TiLocationArrow />
            <span>Explore our foundational research archieve in Tantrasadhana.org</span>
          </a>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-green-400 ">
        BH<b>as</b>k<b>a</b>r
      </h1>
    </div>
  );
};

export default Hero;
