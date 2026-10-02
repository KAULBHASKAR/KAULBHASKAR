import { useRef, useState, useEffect } from "react";
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
    const { current: el } = itemRef;
    const rect = el.getBoundingClientRect();

    // Map tilt relative to bounding box boundaries instead of the global window frame
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.3s ease-out",
        willChange: "transform", // Informs browser to optimize compositing layers
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title?: ReactNode;
  description?: string;
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isIntersected, setIsIntersected] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isImage = /\.(jpeg|jpg|png|gif|webp)\$/i.test(src);

  // Lazy load assets using Intersection Observer to eliminate rendering bloat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect(); // Disconnect once loaded
        }
      },
      { rootMargin: "200px" } // Start pulling assets 200px before arriving in viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getYouTubeEmbedUrl = (url: string): string => {
    let cleanUrl = url;
    if (url.includes("watch?v=")) {
      cleanUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      cleanUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    return `${cleanUrl}?autoplay=1`;
  };

  const getYouTubeThumbnail = (url: string): string => {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    }
    return `/img/${videoId}.webp`;
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black overflow-hidden">
      {/* Do not evaluate DOM nodes until parent container crosses root viewport range */}
      {isIntersected && (
        <>
          {isYouTube ? (
            isPlaying ? (
              <iframe
                src={getYouTubeEmbedUrl(src)}
                title={typeof title === "string" ? title : "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0 object-cover"
              />
            ) : (
              <img
                src={getYouTubeThumbnail(src)}
                alt={typeof title === "string" ? title : "YouTube thumbnail"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            )
          ) : isImage ? (
            <img
              src={src}
              alt={typeof title === "string" ? title : "Gallery image"}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <video
              src={src}
              loop
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </>
      )}

      {/* Overlay markup context */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 pointer-events-none">
        <div className="bento-title special-font text-red-500">
          {title}
          {description && (
            <p className="mt-3 max-w-64 wrap-break-word text-xs md:text-base text-yellow-400">
              {description}
            </p>
          )}
        </div>

        {isYouTube && isIntersected && (
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm transition-colors hover:bg-black/90 pointer-events-auto"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
        )}
      </div>
    </div>
  );
};

const Gallery: FC = () => {
  const mediaItems = [
    "https://youtu.be/KJn2Leu8yVo",
    "https://youtu.be/WhknjROROXM",
    "https://youtu.be/ht_cYcnxlSQ",
    "https://youtu.be/XJPMQzTKq0g",
    "/img/Vindhyachal1.webp",
    "/img/Vindhyachal2.webp",
    "/img/Vindhyachal3.webp",
    "/img/img-2.webp",
  ];

  return (
    <section className="bg-black min-h-screen">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="special-font hero-heading bg-gradient-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent text-lg">
            g<b>a</b>ll<b>er</b>y
          </p>
        </div>

        {/* Clear layout shifting warnings by fixing core structure spacing grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {mediaItems.map((src, i) => (
            <BentoTilt
              key={src} // Better practice than using array index keys
              className="relative w-full overflow-hidden rounded-md border border-white/10"
            >
              <BentoCard src={src} />
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
