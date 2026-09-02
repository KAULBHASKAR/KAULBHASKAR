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
    // Changed h-full to min-h-full to prevent layout compression on long text blocks
    <div className="relative w-full h-full min-h-full overflow-hidden rounded-md flex flex-col justify-end">
      {/* Replaced video with an img element */}
      <img
        src={src}
        alt={altText}
        loading="lazy"
        // Changed object-center to object-top to protect the top/middle visual data from cropping
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Added a subtle dark gradient overlay behind text to maintain readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

      {/* Reduced pb-20 to pb-6 so the text alignment sits perfectly without pushing up artificially */}
      <div className="relative z-10 flex flex-col justify-end p-5 pb-6 text-white h-full mt-auto">
        <div className="bento-title special-font">
          {title}
          {description && (
            <p className="mt-3 wrap-break-word text-xs md:text-base text-white/90 font-robert-regular max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Feature() {
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

        {/* Kept your dimensions intact but ensured height consistency */}
        <BentoTilt className="border-hsl relative mb-7 min-h-96 w-full overflow-hidden rounded-md h-[50vh] md:h-[65vh]">
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

        {/* Adjusted grid system behavior to auto-expand tiles based on content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
          <BentoTilt className="bento-title_1 md:col-span-1 md:row-span-2 min-h-96">
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

          <BentoTilt className="bento-title_1 md:col-span-1 min-h-64">
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

          {/* This block contains massive text. min-h-96 gives it vertical space so the text doesn't squeeze out your image */}
          <BentoTilt className="bento-title_1 md:col-span-1 min-h-96">
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
}



export default Feature;
