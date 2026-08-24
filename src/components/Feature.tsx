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
  title: ReactNode;
  description?: string;
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="relative z-10 flex flex-col justify-between p-5 pb-20 text-red-500">
        <div className="bento-title special-font">
          {title}
          {description && (
            // Swapped break-words for wrap-break-word as requested
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
            description=" Advanced environmental and karmic clearing protocols for high-net-worth ecosystem."
        </BentoTilt>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-min">
          <BentoTilt className="bento-title_1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  tantra-<b>teaching ,</b>
                  <b> initiation &</b> <b>ordination</b>
                </>
              }
              description="We teach Tantra, specially Sri Vidya and Kaul Marg to real knowledge seekers. We help in INITIATION and ORDINATION SACRAMENTS for deserving devotees."
            />
          </BentoTilt>

          <BentoTilt className="bento-title_1 md:col-span-1">
            <BentoCard
              src="videos/YANTRA.mp4"
              title={
                <>
                  <b>astrology</b> <b>services</b>
                </>
              }
              description={`Horoscope and Palm reading, Kerala Jyotish,
Ashta Mangala Prashnam, Deva Prashnam, Tamboola Prashnam.
We provide remedial solutions for Manglika Dosha, delayed marriage and progeny etc.`}
            />
          </BentoTilt>

          <BentoTilt className="bento-title_1 md:col-span-1">
            <BentoCard
              src="videos/3d.mp4"
              title={
                <>
                  <b>gems,</b> <b>talisman &</b> <b>yantras</b>
                </>
              }
              description="We can provide consecrated Gems, Talisman and Rosary. For Sadhakas we can also arrange authentic and precise Meru/Kurma puja yantras, specially designed and consecrated by Sri Kaulbhaskar Guru Ji."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Feature;
