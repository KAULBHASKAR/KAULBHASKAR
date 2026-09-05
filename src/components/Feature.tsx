import { useRef, useState } from "react";
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
    <div className="relative w-full h-full overflow-hidden rounded-md group bg-neutral-950">
      {/* Background Graphic Asset */}
      <img
        src={src}
        alt={altText}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dynamic bottom gradient shield to protect text readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

      {/* Text Content Overlay Layer */}
      <div className="relative z-20 flex flex-col justify-end h-full p-5 pb-12 md:pb-20">
        <div className="bento-title special-font text-neutral-100 [&_b]:text-[#FF9933] [&_b]:font-bold">
          {title}
          {description && (
            <p className="mt-3 wrap-break-word text-xs md:text-sm text-neutral-300 font-robert-regular max-w-xl leading-relaxed">
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

          <p className="max-w-md font-circular-web text-lg text-yellow-500">
            Immerse yourself in a rich metaphysical tradition where you will
            experience endless bliss, and your self will merge with the supreme
            consciousness.
          </p>
        </div>

        {/* Feature Hero Bento Row */}
        <BentoTilt className="border-hsl relative mb-7 h-[45vh] w-full max-w-full overflow-hidden rounded-md md:h-[90vh]">
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

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-min">
          <BentoTilt className="bento-title_1 md:col-span-1 md:row-span-2">
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

          <BentoTilt className="bento-title_1 md:col-span-1">
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

          <BentoTilt className="bento-title_1 md:col-span-1">
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
