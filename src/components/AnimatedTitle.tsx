import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".animated-word");
    if (!words || words.length === 0) return;

    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "center 60%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        },
      });

      titleAnimation.to(words, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        ease: "power2.out",
        stagger: 0.02,
        duration: 0.8,
        overwrite: "auto",
        force3D: true,
      });
    }, container);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          style={{ overflow: "hidden" }}
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
