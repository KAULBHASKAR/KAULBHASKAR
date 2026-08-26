import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);

  const totalVideo = 4;
  const upcomingVideoIndex = (currentIndex % totalVideo) + 1;

  const handleMiniVideoClick = () => {
    setCurrentIndex(upcomingVideoIndex);
  };

  // Safe client-side hydration switch
  useEffect(() => {
    setIsClient(true);
    
    // Safety loader timeout fallback
    const timeout = setTimeout(() => {
      setIsLoading(false);
      ScrollTrigger.refresh(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

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

  // Explicitly inject raw DOM nodes to bypass the React SSR muted attribute hydration mismatch bug
  const renderNativeVideo = (id: string, src: string, extraClass: string) => {
    return {
      __html: `<video id="${id}" src="${src}" loop muted playsinline autoplay preload="auto" class="${extraClass}"></video>`
    };
  };

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-screen w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            onClick={handleMiniVideoClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            {isClient && (
              <div 
                dangerouslySetInnerHTML={renderNativeVideo("current-video", getVideoSrc(upcomingVideoIndex), "size-64 origin-center scale-150 object-cover object-center")}
              />
            )}
          </div>
        </div>

        {isClient && (
          <div 
            dangerouslySetInnerHTML={renderNativeVideo("next-video", getVideoSrc(currentIndex), "absolute-center invisible absolute z-20 size-64 object-cover")}
          />
        )}

        {isClient && (
          <div 
            className="absolute left-0 top-0 size-full"
            dangerouslySetInnerHTML={renderNativeVideo("bg-video", getVideoSrc(currentIndex), "absolute left-0 top-0 size-full object-cover")}
          />
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 bg-linear-to-r from-green-400 via-red-500 to-indigo-500 bg-clip-text text-transparent">
          BH<b>as</b>k<b>a</b>r
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading bg-linear-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent">
              K<b>a</b>u<b>l</b>
            </h1>
            <p className="mb-5 max-w-72 font-robert-regular text-white">
              त्रिपुरास्या महादेवी भुक्ति-मुक्ति-फल-प्रदा।<br />
              न गुरोः सदृशं वस्तु न देवः शङ्करोपमः॥<br />
              न च कौलात् परो योगी न विद्या त्रैपुरी समा।<br />
              न च शान्तेः परं ज्ञानं न च क्षान्तेः परं सुखम्॥<br />
              <br />
              I can help ultra-high-net-worth individuals, executives, and global leaders dismantle subconscious limitations, master absolute mental focus and build sustainable material empires through timeless metaphysical laws.
            </p>
            <Button
              id="kaulbhaskar-guru ji"
              title="Explore our foundational research archieve in Tantrasadhana.org"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 hover:!bg-white flex-center gap-1"
              onClick={() => window.open("https://tantrasadhana.org", "_blank")}
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        BH<b>as</b>k<b>a</b>r
      </h1>
    </div>
  );
};

export default Hero;
