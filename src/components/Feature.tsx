import { useRef, useState } from "react";
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
  altText?: string;
  title: ReactNode;
  description?: string;
}

const BentoCard: FC<BentoCardProps> = ({ src, altText = "Bento Feature Image", title, description }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md bg-neutral-900">
      <img
        src={src}
        alt={altText}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Changed pb-20 to pb-6 and added flex-1 to let text flow safely without hitting box thresholds */}
      <div className="relative z-10 flex flex-col justify-between p-5 pb-6 text-red-500 h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <div className="bento-title special-font">
          {title}
          {description && (
            <p className="mt-3 wrap-break-word text-xs md:text-sm lg:text-base text-white font-robert-regular leading-relaxed max-w-xl">
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
            src="img/RESONANCE.webp"
            altText="Metaphysical resonance overview"
            title={
              <>
                <b>metaphysical</b> <b>resonance{" & "}</b> <b>energy alignment</b>
              </>
            }
            description="Advanced environmental and karmic clearing protocols for high-net-worth ecosystem."
          />
        </BentoTilt>

        {/* Change: Switched md:grid-rows-2 to dynamic md:grid-rows-[auto_auto] so heights adapt to the text load */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-[auto_auto]">
          
          {/* TRIAD Card: Extended height dynamically using min-h on desktop */}
          <BentoTilt className="bento-title_1 min-h-[28rem] w-full md:col-span-1 md:row-span-2 h-full">
            <BentoCard
              src="img/TRIAD.webp"
              altText="Metaphysics teaching and ordination"
              title={
                <>
                  {"metaphysics-"}<b>{"teaching, "}</b>
                  <b>{"initiation & "}</b> <b>{"ordination"}</b>
                </>
              }
              description="Mass Market Digital Program for breaking subconscious barriers and mastering mental focus."
            />
          </BentoTilt>

          {/* ROI Card */}
          <BentoTilt className="bento-title_1 min-h-[14rem] w-full md:col-span-1 h-full">
            <BentoCard
              src="img/ROI.webp"
              altText="Karmic lifepath map"
              title={
                <>
                  <b>karmic roi</b> <b>{" & "}</b>strategic <b>lifepath mapping</b>
                </>
              }
              description="Precision analytical timelines for critical executive decision-making"
            />
          </BentoTilt>

          {/* RITUAL Card: Expanded min-h and scaled font so the massive paragraph fits comfortably */}
          <BentoTilt className="bento-title_1 min-h-[18rem] w-full md:col-span-1 h-full">
            <BentoCard
              src="img/RITUAL.webp"
              altText="Metaphysical rituals setup"
              title={
                <>
                  <b>metaphysical rituals{" & "}</b> <b>deployments</b>
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
