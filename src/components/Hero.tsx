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
  const [isClient, setIsClient] = useState<boolean>(false);

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

  // Client-only hydration gate
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Force autoplay on mount once client is ready
  useEffect(() => {
    if (isClient && bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
    }
  }, [isClient]);

  // Failsafe loader & initial ready check
  useEffect(() => {
    if (isClient && bgVideoRef.current && bgVideoRef.current.readyState >= 2) {
      setLoadedVideos((prev) => prev + 1);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isClient]);

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
      if (!isClient) return;

      if (hasClicked && nextVideoRef.current) {
        // Target your upcoming video frame (e.g., '#next-video')
        gsap.set("#next-video", { visibility: "visible" });
        
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            setHasClicked(false);
          }
        });
      }
    },
    { dependencies: [currentIndex, isClient], revertOnUpdate: true }
  );

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Your JSX video layout elements go here */}
    </div>
  );
};

export default Hero;
