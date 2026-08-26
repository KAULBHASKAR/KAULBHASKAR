import { useEffect, useRef, useState } from "react";
// Use type imports for anything used only as a TypeScript definition
import type { ReactNode, MouseEvent, FC } from "react";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const relativeX = (clientX / innerWidth) * -20;
    const relativeY = (clientY / innerHeight) * 20;

    setTransformStyle(`rotateX(${relativeY}deg) rotateY(${relativeX}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transformStyle,
        // transition: ensures it glides back smoothly
        transition: "transform 0.5s ease-out" 
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // 1. Force layout execution to safely run purely Client-Side
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Playback Failsafe Recovery Hook for Hard Refreshes
  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const targetVideo = videoRef.current;

    const forcePlayback = () => {
      targetVideo.play().catch((err) => {
        console.log("Autoplay bound block tracking state: ", err);
      });
    };

    // If media stream has already buffered frames natively, kickstart play
    if (targetVideo.readyState >= 2) {
      forcePlayback();
    }

    targetVideo.addEventListener("canplay", forcePlayback);
    return () => {
      targetVideo.removeEventListener("canplay", forcePlayback);
    };
  }, [mounted, src]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-md bg-zinc-900">
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      <div className="relative z-10 flex flex-col justify-between p-5 pb-20 text-red-500">
        <div className="bento-title special-font">
          {title}
          {description && (
            <p className="mt-3 wrap-break-word text-xs md:text-base text-white font-robert-regular">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Feature: FC = () => {
  return (
    <section className="bg-black pb-10">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-2xl text-white">
            Into Very mysterious metaphysical world
          </p>

          <p className="max-w-md font-circular-web text-lg text-yellow-500 ">
            Immerse yourself in a rich metaphysical tradition where you will
            experience endless bliss, and your self will merge with the supreme
            consciousness.
          </p>
        </div>

        <BentoTilt className="border-hsl relative mb-7 min-h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                <b>metaphysical</b> <b>resonance &</b> <b>energy alignment</b>
              </>
            }
            description="Advanced environmental and karmic clearing protocols for high-net-worth ecosystem."
          />
        </BentoTilt>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-min">
          <BentoTilt className="bento-title_1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  metaphysics-<b>teaching ,</b>
                  <b> initiation &</b> <b>ordination</b>
                </>
              }
              description="Mass Market Digital Program for breaking subconscious barriers and mastering mental focus."
            />
          </BentoTilt>

          <BentoTilt className="bento-title_1 md:col-span-1">
            <BentoCard
              src="videos/YANTRA.mp4"
              title={
                <>
                  <b>karmic roi</b> <b>& </b>strategic <b>lifepath maping</b>
                </>
              }
              description={`Precision analytical timelines for critical executive decision-making`}
            />
          </BentoTilt>

          <BentoTilt className="bento-title_1 md:col-span-1">
            <BentoCard
              src="videos/3d.mp4"
              title={
                <>
                  <b>metaphysical rituals &</b> <b>deployments</b>
                </>
              }
              description="We engineer and execute specialized metaphysical remedial protocols, managing high-complexity deployments such as Pratyangira Homa, Mahavidya Homa, Baglamukhi systems, and advanced planetary alignment Homas. Our technical team oversees the complete operational schedule, delivering meticulously audited, ritual-compliant solutions tailored to client-specific environmental constraints."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Feature;
