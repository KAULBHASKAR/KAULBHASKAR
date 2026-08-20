import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../components/AnimatedTitle";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Intro: React.FC = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
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

    // Cleanup is handled automatically by useGSAP
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm text-center uppercase md:text-[30px]">
          Under Mentorship Of KAULBHASKAR Guru Ji
        </h2>
        
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> <b>genuine</b> <b>metaphysical<br /><b>adventure<br />"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>
            We want to be on each of your journeys seeking the satisfaction of 
            meeting with hidden master of Universe.
          </p>
        </div>
      </div>

      <div className="h-screen w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img 
            alt="bgImage" 
            className="absolute left-0 top-0 size-full object-cover" 
            src="/img/intro.webp" 
            width="1400"
            height="1800"
            fetchPriority="high" 
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
