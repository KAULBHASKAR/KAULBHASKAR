import React, { useEffect, useRef, useState } from "react";
import AnimatedTitle from "../components/AnimatedTitle";

const Intro: React.FC = () => {
  const [isIntersected, setIsIntersected] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Lazy render the heavy scroll animation to eliminate FCP layout blockage
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Start parsing libraries 300px before arriving
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Execute GSAP lazily only when the element is near the viewport
  useEffect(() => {
    if (!isIntersected) return;

    let ctx: any;

    // Dynamically import GSAP modules at run-time to prevent bundling into the initial page shell
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        });

        clipAnimation.to(".mask-clip-path", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
      }, containerRef);
    });

    // Explicit manual cleanup handles component unmounting seamlessly
    return () => {
      if (ctx) ctx.revert();
    };
  }, [isIntersected]);

  return (
    <div ref={containerRef} id="about" className="min-h-screen w-screen overflow-x-hidden">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        <h2 className="font-general text-sm text-center uppercase md:text-[30px]">
          Under Mentorship Of KAULBHASKAR Guru Ji
        </h2>
        
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> <b>genuine</b> <b>metaphysical<br /><b>adventure<br />"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext text-center">
          <p className="max-w-xl mx-auto text-sm md:text-base">
            We want to be on each of your journeys seeking the satisfaction of 
            meeting with hidden master of Universe.
          </p>
        </div>
      </div>

      {/* Frame ratios fixed to prevent content layout shifts during dynamic mounts */}
      <div ref={triggerRef} className="h-screen w-screen relative bg-black" id="clip">
        <div className="mask-clip-path about-image w-full h-full">
          <img 
            alt="bgImage" 
            className="absolute left-0 top-0 w-full h-full object-cover" 
            src="/img/INTRO.webp" 
            width="1400"
            height="1800"
            fetchPriority="high" 
            loading="eager" // Forces image loading priority as above-the-fold canvas
            decoding="async" // Defer decoding processing away from rendering thread
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
